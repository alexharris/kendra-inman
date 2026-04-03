'use client';

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { urlFor, getAssetUrl } from '../../../sanity/lib/image'
import CachedVideo from '../CachedVideo'
import FullscreenVideoPlayer from '../FullscreenVideoPlayer'
import './Slideshow.scss'

export default function Slideshow({ gallery = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false)
  const [fullscreenVideo, setFullscreenVideo] = useState(null)

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
              console.log('Gallery item:', item); // Debug log to check item structure
              if (!item) return null; // Skip if item is null/undefined
              
              if (item._type === 'image') {
                return (
                  <div key={index} className="embla__slide">
                    <img 
                      src={urlFor(item).auto('format').url()} 
                      alt={`Gallery image ${index + 1}`}
                      style={{ 
                        height: '100%',
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
                    <CachedVideo
                      src={item.asset.url}
                      alt={`Gallery video ${index + 1}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ 
                        height: '100%',
                        objectFit: 'cover',
                        width: '100%'
                      }}
                    />
                  </div>
                );
              } else if (item._type === 'bigVideo' && (item.video || item.vimeoUrl) && item.thumbnail) {
                const thumbnail = item.thumbnail;
                const isThumbnailVideo = thumbnail._type === 'file';
                
                return (
                  <div 
                    key={index} 
                    className="embla__slide embla__slide--clickable"
                    onClick={() => setFullscreenVideo({ url: item.video?.asset?.url, vimeoUrl: item.vimeoUrl, alt: item.alt })}
                    style={{ cursor: 'pointer' }}
                  >
                    {isThumbnailVideo ? (
                      <CachedVideo
                        src={thumbnail.asset.url}
                        alt={item.alt || `Gallery video ${index + 1}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ 
                          height: '100%',
                          objectFit: 'cover',
                          width: '100%'
                        }}
                      />
                    ) : (
                      <img 
                        src={urlFor(thumbnail).url()} 
                        alt={item.alt || `Gallery image ${index + 1}`}
                        style={{ 
                          height: '100%',
                          objectFit: 'cover',
                          width: '100%'
                        }}
                      />
                    )}
                    <div className="embla__slide-play-icon">
                      <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.35689 5.45802H12.1825C12.5861 5.45802 12.9136 5.12579 12.9136 4.71643C12.9136 4.30708 12.5861 3.97485 12.1825 3.97485H3.85938V12.417C3.85938 12.8264 4.18692 13.1586 4.5905 13.1586C4.99408 13.1586 5.32162 12.8264 5.32162 12.417V6.50809L12.9546 14.2502C13.0949 14.3926 13.2821 14.4697 13.4693 14.4697C13.6564 14.4697 13.8436 14.3985 13.984 14.2502C14.2706 13.9595 14.2706 13.4908 13.984 13.2001L6.35104 5.45802H6.35689Z" fill="#E8E7D1"/>
                        <path d="M21.3367 3.97485C20.9332 3.97485 20.6056 4.30708 20.6056 4.71643C20.6056 5.12579 20.9332 5.45802 21.3367 5.45802H27.1623L19.5294 13.2001C19.2428 13.4908 19.2428 13.9595 19.5294 14.2502C19.6698 14.3926 19.8569 14.4697 20.0441 14.4697C20.2313 14.4697 20.4185 14.3985 20.5588 14.2502L28.1918 6.50809V12.417C28.1918 12.8264 28.5193 13.1586 28.9229 13.1586C29.3265 13.1586 29.654 12.8264 29.654 12.417V3.97485H21.3309H21.3367Z" fill="#E8E7D1"/>
                        <path d="M28.9287 21.0787C28.5252 21.0787 28.1976 21.4109 28.1976 21.8203V27.7292L20.5647 19.9871C20.2781 19.6964 19.816 19.6964 19.5294 19.9871C19.2428 20.2778 19.2428 20.7464 19.5294 21.0371L27.1623 28.7793H21.3367C20.9332 28.7793 20.6056 29.1115 20.6056 29.5208C20.6056 29.9302 20.9332 30.2624 21.3367 30.2624H29.6599V21.8203C29.6599 21.4109 29.3323 21.0787 28.9287 21.0787Z" fill="#E8E7D1"/>
                        <path d="M12.9546 19.9871L5.32162 27.7292V21.8203C5.32162 21.4109 4.99408 21.0787 4.5905 21.0787C4.18692 21.0787 3.85938 21.4109 3.85938 21.8203V30.2624H12.1825C12.5861 30.2624 12.9136 29.9302 12.9136 29.5208C12.9136 29.1115 12.5861 28.7793 12.1825 28.7793H6.35689L13.9898 21.0371C14.2764 20.7464 14.2764 20.2778 13.9898 19.9871C13.7032 19.6964 13.2412 19.6964 12.9546 19.9871Z" fill="#E8E7D1"/>
                      </svg>
                    </div>
                  </div>
                );
              }
              return null;
            })
          ) : (
            // Fallback to dummy image if no gallery items
            <div className="embla__slide">
              <img 
                src="/images/project-dummy.jpg" 
                alt="Project Slideshow"
                style={{ 
                  height: '100%',
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
      
      {fullscreenVideo && (
        <FullscreenVideoPlayer
          videoUrl={fullscreenVideo.url}
          vimeoUrl={fullscreenVideo.vimeoUrl}
          alt={fullscreenVideo.alt}
          onClose={() => setFullscreenVideo(null)}
        />
      )}
    </div>
  )
}
