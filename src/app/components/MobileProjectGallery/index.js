'use client';

import { urlFor, getAssetUrl } from '../../../sanity/lib/image';

export default function MobileProjectGallery({ gallery }) {
  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <div className="py-16 md:hidden">
      <div className="flex flex-col gap-4 ">
        {gallery.map((item, index) => (
          <div key={index} className="overflow-hidden">
            {console.log(item.asset)}
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
            ) : (
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Unsupported media type
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
