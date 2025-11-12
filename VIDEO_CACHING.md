# Video Caching System

This project implements client-side video caching to reduce bandwidth consumption and improve performance.

## Overview

The `CachedVideo` component uses the browser's Cache API to store video files locally after the first download. This prevents repeated downloads of the same video files, significantly reducing bandwidth usage during development and for end users.

## Components

### CachedVideo Component

Located: `src/app/components/CachedVideo.js`

A drop-in replacement for the standard `<video>` element that automatically handles caching.

**Features:**
- Automatically caches videos in the browser after first load
- Transparent to parent components (accepts same props as `<video>`)
- Shows loading spinner while fetching/loading from cache
- Graceful fallback if Cache API is unavailable
- Automatic cleanup of object URLs to prevent memory leaks

**Usage:**
```jsx
import CachedVideo from '@/app/components/CachedVideo';

<CachedVideo
  src="https://cdn.sanity.io/files/..."
  alt="Video description"
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-cover"
/>
```

### Components Using CachedVideo

The following components have been updated to use `CachedVideo`:
- `HeroSlideshow` - Hero section slideshow on homepage
- `Slideshow` - Project gallery slideshows
- `ScrollSection` - Homepage scroll sections with media

## Cache Management

### Utility Functions

Located: `src/utils/videoCache.js`

Provides helper functions for cache inspection and management. These functions are automatically exposed to the browser console as `window.videoCacheUtils`.

**Available functions:**

```javascript
// Get cache size and list of cached videos
await window.videoCacheUtils.getCacheSize()
// Returns: { totalSize, totalSizeFormatted, videoCount, videos }

// List all cached video URLs
await window.videoCacheUtils.listCachedVideos()
// Returns: ['url1', 'url2', ...]

// Clear all cached videos
await window.videoCacheUtils.clearVideoCache()
// Returns: true/false

// Remove specific video from cache
await window.videoCacheUtils.removeVideoFromCache('https://...')
// Returns: true/false
```

### Browser DevTools

You can also inspect the cache using Chrome DevTools:
1. Open DevTools (F12)
2. Go to Application tab
3. Expand "Cache Storage" in the left sidebar
4. Look for "video-cache-v1"

## Server-Side Caching

The Sanity query functions also implement server-side caching using Next.js's revalidation strategy:

- **Default revalidation**: 1 hour (3600 seconds)
- **Homepage content**: 24 hours (86400 seconds) - increased due to heavy media content

This is configured in `src/utils/sanity-queries.js`.

## How It Works

1. **First Load**: When a video is requested, `CachedVideo` checks the Cache API
2. **Cache Miss**: If not found, it fetches the video from Sanity CDN and stores it in the cache
3. **Cache Hit**: If found, it loads the video from local cache (no network request)
4. **Subsequent Loads**: All future requests use the cached version

## Benefits

- **Reduced Bandwidth**: Videos download only once per browser
- **Faster Loading**: Cached videos load instantly from local storage
- **Better Development Experience**: No repeated large downloads while working
- **Improved User Experience**: Faster page loads for returning visitors
- **Persistent**: Cache survives page refreshes and browser restarts

## Cache Persistence

- Caches persist across:
  - Page refreshes
  - Browser tab closes/opens
  - Browser restarts (until cache is manually cleared)
  
- Caches are cleared when:
  - User manually clears browser data
  - Cache quota is exceeded (browser manages this automatically)
  - You call `clearVideoCache()` programmatically

## Troubleshooting

### Video not loading
1. Check browser console for errors
2. Verify video URL is accessible
3. Check if Cache API is supported (modern browsers only)
4. Try clearing the cache: `await window.videoCacheUtils.clearVideoCache()`

### Videos still downloading repeatedly
1. Verify `CachedVideo` component is being used (not standard `<video>`)
2. Check Network tab in DevTools - should see "(from cache)" or size as "0 B"
3. Ensure Cache API is enabled in browser

### Cache taking up too much space
1. Check cache size: `await window.videoCacheUtils.getCacheSize()`
2. Clear cache: `await window.videoCacheUtils.clearVideoCache()`
3. Browser will automatically manage cache if quota is exceeded

## Browser Support

The Cache API is supported in all modern browsers:
- Chrome 40+
- Firefox 41+
- Safari 11.1+
- Edge 17+

If Cache API is not available, the component gracefully falls back to standard video loading.
