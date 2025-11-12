/**
 * Video Cache Utility
 * 
 * Provides helper functions to manage the video cache.
 * Useful for debugging and cache management in the browser console.
 */

const CACHE_NAME = 'video-cache-v1';

/**
 * Get the size of all cached videos
 * @returns {Promise<Object>} Object with total size and individual video sizes
 */
export async function getCacheSize() {
  if (!('caches' in window)) {
    return { error: 'Cache API not available' };
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    
    let totalSize = 0;
    const videos = [];

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        const size = blob.size;
        totalSize += size;
        
        videos.push({
          url: request.url,
          size: size,
          sizeFormatted: formatBytes(size),
          type: blob.type
        });
      }
    }

    return {
      totalSize,
      totalSizeFormatted: formatBytes(totalSize),
      videoCount: videos.length,
      videos
    };
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * Clear all cached videos
 * @returns {Promise<boolean>} Success status
 */
export async function clearVideoCache() {
  if (!('caches' in window)) {
    return false;
  }

  try {
    const deleted = await caches.delete(CACHE_NAME);
    console.log(`Video cache ${deleted ? 'cleared' : 'not found'}`);
    return deleted;
  } catch (error) {
    console.error('Error clearing video cache:', error);
    return false;
  }
}

/**
 * Get list of all cached video URLs
 * @returns {Promise<Array<string>>} Array of cached video URLs
 */
export async function listCachedVideos() {
  if (!('caches' in window)) {
    return [];
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    return requests.map(req => req.url);
  } catch (error) {
    console.error('Error listing cached videos:', error);
    return [];
  }
}

/**
 * Remove a specific video from cache
 * @param {string} url - Video URL to remove from cache
 * @returns {Promise<boolean>} Success status
 */
export async function removeVideoFromCache(url) {
  if (!('caches' in window)) {
    return false;
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    const deleted = await cache.delete(url);
    console.log(`Video ${deleted ? 'removed from' : 'not found in'} cache: ${url}`);
    return deleted;
  } catch (error) {
    console.error('Error removing video from cache:', error);
    return false;
  }
}

/**
 * Format bytes to human-readable size
 * @param {number} bytes - Number of bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted string
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Export for console debugging
if (typeof window !== 'undefined') {
  window.videoCacheUtils = {
    getCacheSize,
    clearVideoCache,
    listCachedVideos,
    removeVideoFromCache
  };
}
