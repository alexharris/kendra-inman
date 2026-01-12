'use client';

import { useState } from 'react';
import { urlFor, getAssetUrl } from '../../../sanity/lib/image';
import FullscreenVideoPlayer from '../FullscreenVideoPlayer';

export default function MobileProjectGallery({ gallery }) {
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  
  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <>
      <div className="py-12 lg:hidden">
        <div className="flex flex-col gap-4 ">
          {gallery.map((item, index) => (
            <div key={index} className="overflow-hidden">
              {/* {console.log(item.asset)} */}
              {item._type === 'image' ? (
                <img 
                  src={urlFor(item).url()} 
                  alt={item.alt || `Gallery image ${index + 1}`} 
                  className="w-full h-auto object-cover"
                />
              ) : item._type === 'file' && item.asset ? (
                <video
                  src={item.asset.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto object-cover"
                  poster={item.poster ? urlFor(item.poster).url() : undefined}
                >
                  Your browser does not support the video tag.
                </video>
              ) : item._type === 'bigVideo' && item.video && item.image ? (
                <div 
                  className="relative cursor-pointer"
                  onClick={() => setFullscreenVideo({ url: item.video.asset.url, alt: item.alt })}
                >
                  <img 
                    src={urlFor(item.image).url()} 
                    alt={item.alt || `Gallery image ${index + 1}`} 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-6xl opacity-70">▶</div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  Unsupported media type
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {fullscreenVideo && (
        <FullscreenVideoPlayer
          videoUrl={fullscreenVideo.url}
          alt={fullscreenVideo.alt}
          onClose={() => setFullscreenVideo(null)}
        />
      )}
    </>
  );
}
