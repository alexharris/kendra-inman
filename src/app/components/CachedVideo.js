'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CachedVideo Component
 * 
 * This component implements client-side caching for video files using the Cache API.
 * Videos are cached in the browser after first load, preventing repeated downloads
 * and significantly reducing bandwidth usage.
 * 
 * Benefits:
 * - Reduces bandwidth consumption by caching videos locally
 * - Faster playback on subsequent loads
 * - Works across page refreshes (persistent cache)
 * - Transparent to parent components (drop-in replacement for <video>)
 */
export default function CachedVideo({ src, alt, className, style, ...props }) {
  const videoRef = useRef(null);
  const [cachedSrc, setCachedSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    let objectUrl = null;

    const loadVideo = async () => {
      try {
        // Check if Cache API is available
        if (!('caches' in window)) {
          console.warn('Cache API not available, using direct video source');
          setCachedSrc(src);
          setLoading(false);
          return;
        }

        const cacheName = 'video-cache-v1';
        const cache = await caches.open(cacheName);
        
        // Try to get video from cache
        let cachedResponse = await cache.match(src);

        if (cachedResponse) {
          // Video found in cache
          const blob = await cachedResponse.blob();
          if (isMounted) {
            objectUrl = URL.createObjectURL(blob);
            setCachedSrc(objectUrl);
            setLoading(false);
          }
        } else {
          // Video not in cache, fetch it
          const response = await fetch(src, {
            mode: 'cors',
            credentials: 'omit'
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch video: ${response.status}`);
          }

          const blob = await response.blob();
          
          // Cache the video for future use
          const responseToCache = new Response(blob, {
            headers: {
              'Content-Type': blob.type || 'video/mp4',
              'Cache-Control': 'public, max-age=31536000, immutable'
            }
          });
          
          await cache.put(src, responseToCache);
          
          if (isMounted) {
            objectUrl = URL.createObjectURL(blob);
            setCachedSrc(objectUrl);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Error loading cached video:', err);
        if (isMounted) {
          // Fallback to direct src on error
          setCachedSrc(src);
          setError(true);
          setLoading(false);
        }
      }
    };

    loadVideo();

    // Cleanup
    return () => {
      isMounted = false;
      if (objectUrl && objectUrl.startsWith('blob:')) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  if (loading) {
    return (
      <div 
        className={className} 
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000'
        }}
      >
        <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!cachedSrc) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      src={cachedSrc}
      className={className}
      style={style}
      aria-label={alt}
      {...props}
    >
      {error && <source src={src} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
}
