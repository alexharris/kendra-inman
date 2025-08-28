'use client';

import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

// Slideshow timing - matches main page configuration
const SLIDESHOW_AUTO_ADVANCE_INTERVAL = 3000; // milliseconds

export default function HeroSlideshow({ heroSlideshow }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Auto-advance slides using centralized timing
  useEffect(() => {
    if (!emblaApi) return;

    const autoAdvance = setInterval(() => {
      emblaApi.scrollNext();
    }, SLIDESHOW_AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(autoAdvance);
  }, [emblaApi]);

  // If no media items, show placeholder
  if (!heroSlideshow?.media?.length) {
    return (
      <div className="h-screen w-full bg-beige flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-600">Hero Slideshow</h1>
          <p className="text-gray-500 mt-4">No media items to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <div className="embla h-full w-full">
        <div className="embla__viewport h-full w-full overflow-hidden" ref={emblaRef}>
          <div className="embla__container h-full flex">
            {heroSlideshow.media.map((mediaItem, mediaIndex) => {
              if (mediaItem._type === 'image' && mediaItem.asset?.url) {
                return (
                  <div key={mediaIndex} className="embla__slide flex-[0_0_100%] min-w-0 h-full relative">
                    <Image
                      src={mediaItem.asset.url}
                      alt={mediaItem.alt || `Hero slideshow image ${mediaIndex + 1}`}
                      fill
                      className="object-cover"
                      priority={mediaIndex === 0} // Prioritize first image
                    />
                  </div>
                );
              } else if ((mediaItem._type === 'file' || mediaItem._type === 'video') && mediaItem.asset?.url) {
                return (
                  <div key={mediaIndex} className="embla__slide flex-[0_0_100%] min-w-0 h-full relative flex items-center justify-center bg-black">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      src={`${mediaItem.asset.url}#t=0.1`}
                      className="w-full h-full object-cover"
                      aria-label={mediaItem.alt || `Hero slideshow video ${mediaIndex + 1}`}
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
      
    </div>
  );
}
