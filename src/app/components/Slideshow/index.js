'use client';

import { useCallback, useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { urlFor, getAssetUrl } from '../../../sanity/lib/image'
import './Slideshow.scss'

export default function Slideshow({ gallery = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false)
  const [minHeight, setMinHeight] = useState(null)
  const mediaRefs = useRef([])

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

  // Calculate minimum height of all media elements
  useEffect(() => {
    if (gallery.length === 0 || mediaRefs.current.length === 0) return

    const calculateMinHeight = () => {
      const heights = mediaRefs.current
        .filter(ref => ref && ref.offsetHeight > 0)
        .map(ref => ref.offsetHeight)
      
      if (heights.length > 0) {
        const minimum = Math.min(...heights)
        setMinHeight(minimum)
      }
    }

    // Wait for all media to load before calculating
    const loadPromises = mediaRefs.current.map(ref => {
      if (!ref) return Promise.resolve()
      
      if (ref.tagName === 'IMG') {
        return new Promise(resolve => {
          if (ref.complete) {
            resolve()
          } else {
            ref.onload = resolve
            ref.onerror = resolve
          }
        })
      } else if (ref.tagName === 'VIDEO') {
        return new Promise(resolve => {
          if (ref.readyState >= 1) {
            resolve()
          } else {
            ref.onloadedmetadata = resolve
            ref.onerror = resolve
          }
        })
      }
      return Promise.resolve()
    })

    Promise.all(loadPromises).then(calculateMinHeight)

    // Also recalculate on window resize
    window.addEventListener('resize', calculateMinHeight)
    return () => window.removeEventListener('resize', calculateMinHeight)
  }, [gallery])

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
                      ref={el => mediaRefs.current[index] = el}
                      src={urlFor(item).auto('format').url()} 
                      alt={`Gallery image ${index + 1}`}
                      style={{ 
                        height: minHeight ? `${minHeight}px` : 'auto',
                        objectFit: 'cover',
                        width: '100%'
                      }}
                    />
                  </div>
                );
              } else if (item._type === 'file' && item.asset) {
                // Handle video files
                return (
                  <div key={index} className="embla__slide">
                    <video 
                      ref={el => mediaRefs.current[index] = el}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      src={`${item.asset.url}#t=0.1`}
                      style={{ 
                        height: minHeight ? `${minHeight}px` : 'auto',
                        objectFit: 'cover',
                        width: '100%'
                      }}
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
              <img 
                ref={el => mediaRefs.current[0] = el}
                src="/images/project-dummy.jpg" 
                alt="Project Slideshow"
                style={{ 
                  height: minHeight ? `${minHeight}px` : 'auto',
                  objectFit: 'cover',
                  width: '100%'
                }}
              />
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
