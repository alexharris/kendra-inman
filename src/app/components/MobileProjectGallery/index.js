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
              ) : item._type === 'bigVideo' && (item.video || item.vimeoUrl) && item.thumbnail ? (
                <div
                  className="relative cursor-pointer"
                  onClick={() => setFullscreenVideo({ url: item.video?.asset?.url, vimeoUrl: item.vimeoUrl, alt: item.alt })}
                >
                  {item.thumbnail._type === 'file' ? (
                    <video
                      src={item.thumbnail.asset.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img 
                      src={urlFor(item.thumbnail).url()} 
                      alt={item.alt || `Gallery image ${index + 1}`} 
                      className="w-full h-auto object-cover"
                    />
                  )}
                  <div className="absolute bottom-4 right-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#000', width: '89px', height: '25px', opacity: 0.85 }}>
                    <span style={{ color: '#EFEADB', fontFamily: "'futura-pt', Futura, sans-serif", fontWeight: 500, fontSize: '11px', lineHeight: 1, letterSpacing: 0, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Full Video</span>
                    <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.3106 5.2812L1.44716 0.128989C1.14636 -0.045257 0.778726 -0.0418409 0.481273 0.132405C0.183819 0.306651 0 0.634643 0 0.986552V11.9846C0 12.3467 0.193846 12.6815 0.504668 12.8524C0.648381 12.9344 0.808805 12.9719 0.969229 12.9719C1.15305 12.9719 1.33353 12.9173 1.49395 12.8148L10.3574 6.96558C10.6415 6.77767 10.8086 6.45309 10.7985 6.1046C10.7885 5.75953 10.6047 5.44178 10.3106 5.27437V5.2812Z" fill="#EFEADB"/>
                    </svg>
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
          vimeoUrl={fullscreenVideo.vimeoUrl}
          alt={fullscreenVideo.alt}
          onClose={() => setFullscreenVideo(null)}
        />
      )}
    </>
  );
}
