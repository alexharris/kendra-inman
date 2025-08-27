'use client';

import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function ScrollSection({ index, sectionRefs, section, children, className = "" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  // Auto-advance slides every 2 seconds
  useEffect(() => {
    if (!emblaApi) return;

    const autoAdvance = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(autoAdvance);
  }, [emblaApi]);

  const renderMedia = () => {
    if (!section?.media?.length) {
      return (
        <div className="section-image w-3/5 h-2/5 bg-gray-200 absolute top-24 right-24 z-20">
          {section?.title && (
            <div className="p-4 text-black">
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
          )}
        </div>
      );
    }

    // If there's only one media item, render it without slideshow
    if (section.media.length === 1) {
      const mediaItem = section.media[0];
      if (mediaItem._type === 'image' && mediaItem.asset?.url) {
        return (
          <div className="section-image w-3/5 h-2/5 absolute top-24 right-24 z-20 overflow-hidden">
            <Image
              src={mediaItem.asset.url}
              alt={mediaItem.alt || `Section ${index + 1} image`}
              fill
              className="object-cover"
            />
          </div>
        );
      } else if (mediaItem._type === 'file' && mediaItem.asset?.url && mediaItem.asset?.mimeType?.startsWith('video/')) {
        return (
          <div className="section-image w-3/5 h-2/5 absolute top-24 right-24 z-20 overflow-hidden">
            <video
              src={mediaItem.asset.url}
              controls
              className="w-full h-full object-cover"
              aria-label={mediaItem.alt || `Section ${index + 1} video`}
            />
          </div>
        );
      }
    }

    // Multiple media items - use slideshow
    return (
      <div className="section-image w-3/5 h-2/5 absolute top-24 right-24 z-20 overflow-hidden">
        <div className="embla h-full w-full">
          <div className="embla__viewport h-full w-full overflow-hidden" ref={emblaRef}>
            <div className="embla__container h-full flex">
              {section.media.map((mediaItem, mediaIndex) => {
                if (mediaItem._type === 'image' && mediaItem.asset?.url) {
                  return (
                    <div key={mediaIndex} className="embla__slide flex-[0_0_100%] min-w-0 h-full relative">
                      <Image
                        src={mediaItem.asset.url}
                        alt={mediaItem.alt || `Section ${index + 1} image ${mediaIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                } else if (mediaItem._type === 'file' && mediaItem.asset?.url && mediaItem.asset?.mimeType?.startsWith('video/')) {
                  return (
                    <div key={mediaIndex} className="embla__slide flex-[0_0_100%] min-w-0 h-full relative flex items-center justify-center">
                      <video
                        src={mediaItem.asset.url}
                        controls
                        className="max-w-full max-h-full object-cover"
                        aria-label={mediaItem.alt || `Section ${index + 1} video ${mediaIndex + 1}`}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={el => sectionRefs.current[index] = el}
      className={`h-screen w-full relative ${className}`}
    >
      {children || renderMedia()}
    </div>
  );
}
