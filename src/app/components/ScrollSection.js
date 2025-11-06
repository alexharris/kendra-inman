'use client';

import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import ParenthesesText from './ParenthesesText';

// Slideshow timing - matches main page configuration
const SLIDESHOW_AUTO_ADVANCE_INTERVAL = 3000; // milliseconds

export default function ScrollSection({ index, sectionRefs, section, children, className = "" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);
  // Auto-advance slides using centralized timing
  useEffect(() => {
    if (!emblaApi) return;

    const autoAdvance = setInterval(() => {
      emblaApi.scrollNext();
    }, SLIDESHOW_AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(autoAdvance);
  }, [emblaApi]);

  const renderMedia = () => {
    if (!section?.media?.length) {
      return (
        <div className="section-image aspect-720/400 w-3/4 md:w-1/2 bg-gray-200 absolute top-24 right-24 z-20">
          {section?.title && (
            <div className="p-4 text-black">
              <h3 className="text-lg font-semibold">
                {section.title}
                {section.categoryReference?.projectCount !== undefined && (
                  <span className="text-sm font-normal ml-2">
                    • {section.categoryReference.projectCount} {section.categoryReference.projectCount === 1 ? 'project' : 'projects'}
                  </span>
                )}
              </h3>
            </div>
          )}
        </div>
      );
    }

    // Multiple media items - use slideshow
    return (
      <>
      <div className="section-image aspect-720/400 w-3/4 md:w-1/2 absolute top-24 right-12 md:right-24 z-20">
        <div className="founders-grotesk relative text-right font-thin pt-2 uppercase text-sm mb-2 mr-12">
          {section.categoryReference?.projectCount !== undefined && `${section.categoryReference.projectCount}`}
        </div>
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
                } else if ((mediaItem._type === 'file' || mediaItem._type === 'video') && mediaItem.asset?.url) {
                  return (
                    <div key={mediaIndex} className="embla__slide flex-[0_0_100%] min-w-0 h-full relative flex items-center justify-center">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        src={`${mediaItem.asset.url}#t=0.1`}
                        className="max-w-full max-h-full object-cover"
                        aria-label={mediaItem.alt || `Section ${index + 1} video ${mediaIndex + 1}`}
                      >
                        <source src={mediaItem.asset.url} type={mediaItem.asset.mimeType || 'video/mp4'} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
        <div className="text-right">
          <ParenthesesText>
            {section.title}
          </ParenthesesText>
        </div>

        </div>
   
      
      </>
    );
  };

  return (
    <div 
      ref={el => sectionRefs.current[index] = el}
      className={`w-full relative ${className} max-w-[1600px]`}
      style={{ height: 'calc(100vh + 50vh)' }}
    >
      {children || renderMedia()}
    </div>
  );
}
