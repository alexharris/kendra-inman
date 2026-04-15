'use client';

import { useCallback, useEffect, useRef, useState } from 'react'
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
  const [prevNavWidth, setPrevNavWidth] = useState(0)
  const [nextNavWidth, setNextNavWidth] = useState(0)
  const rootRef = useRef(null)

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

  useEffect(() => {
    if (!emblaApi) return

    const updateNavWidth = () => {
      if (!rootRef.current) return
      const slides = emblaApi.slideNodes()
      if (!slides.length) return
      const slide = slides[emblaApi.selectedScrollSnap()]
      const viewportWidth = rootRef.current.offsetWidth
      const slideWidth = slide.offsetWidth
      const paddingLeft = parseFloat(window.getComputedStyle(slide).paddingLeft) || 0
      const base = (viewportWidth - slideWidth) / 2
      const isFirst = !emblaApi.canScrollPrev()
      const isLast = !emblaApi.canScrollNext()
      setPrevNavWidth(Math.max(0, isFirst ? 0 : isLast ? (base + paddingLeft) * 2 : base + paddingLeft))
      setNextNavWidth(Math.max(0, isLast ? 0 : isFirst ? base * 2 : base))
    }

    updateNavWidth()
    emblaApi.on('resize', updateNavWidth)
    emblaApi.on('select', updateNavWidth)
    emblaApi.on('reInit', updateNavWidth)

    return () => {
      emblaApi.off('resize', updateNavWidth)
      emblaApi.off('select', updateNavWidth)
      emblaApi.off('reInit', updateNavWidth)
    }
  }, [emblaApi])

  return (
    <div className="embla" ref={rootRef}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container text-black">
          {gallery.length > 0 ? (
            gallery.map((item, index) => {
              if (!item) return null;
              
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
                    <div
                      className="embla__slide-play-icon"
                      onClick={(e) => { e.stopPropagation(); setFullscreenVideo({ url: item.video?.asset?.url, vimeoUrl: item.vimeoUrl, alt: item.alt }) }}
                    >
                      <span className="embla__slide-play-label">Full Video</span>
                      <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.3106 5.2812L1.44716 0.128989C1.14636 -0.045257 0.778726 -0.0418409 0.481273 0.132405C0.183819 0.306651 0 0.634643 0 0.986552V11.9846C0 12.3467 0.193846 12.6815 0.504668 12.8524C0.648381 12.9344 0.808805 12.9719 0.969229 12.9719C1.15305 12.9719 1.33353 12.9173 1.49395 12.8148L10.3574 6.96558C10.6415 6.77767 10.8086 6.45309 10.7985 6.1046C10.7885 5.75953 10.6047 5.44178 10.3106 5.27437V5.2812Z" fill="#EFEADB"/>
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
        style={{ width: prevBtnDisabled ? 0 : (prevNavWidth || undefined) }}
      ></div>
      <div
        className={`embla__nav-area embla__nav-area--next ${nextBtnDisabled ? 'embla__nav-area--disabled' : ''}`}
        onClick={scrollNext}
        style={{ width: nextBtnDisabled ? 0 : (nextNavWidth || undefined) }}
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
