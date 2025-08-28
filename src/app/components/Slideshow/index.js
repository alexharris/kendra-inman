'use client';

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { urlFor, getAssetUrl } from '../../../sanity/lib/image'
import './Slideshow.scss'

export default function Slideshow({ gallery = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container text-black">
          {gallery.length > 0 ? (
            gallery.map((item, index) => {
              if (item._type === 'image') {
                return (
                  <div key={index} className="embla__slide">
                    <img 
                      src={urlFor(item).auto('format').url()} 
                      alt={`Gallery image ${index + 1}`} 
                    />
                  </div>
                );
              } else if (item._type === 'file' && item.asset) {
                // Handle video files
                console.log('Video item:', item);
                return (
                  <div key={index} className="embla__slide">
                    <video 
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      src={`${item.asset.url}#t=0.1`}
                    >
                      <source src={item.asset.url} type={item.asset.mimeType} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              }
              return null;
            })
          ) : (
            // Fallback to dummy image if no gallery items
            <div className="embla__slide">
              <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
            </div>
          )}
        </div>
      </div>
      <div 
        className={`embla__nav-area embla__nav-area--prev ${prevBtnDisabled ? 'embla__nav-area--disabled' : ''}`} 
        onClick={scrollPrev}
      ></div>
      <div 
        className={`embla__nav-area embla__nav-area--next ${nextBtnDisabled ? 'embla__nav-area--disabled' : ''}`} 
        onClick={scrollNext}
      ></div>
    </div>
  )
}
