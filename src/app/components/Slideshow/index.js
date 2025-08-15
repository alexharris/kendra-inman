'use client';

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './Slideshow.scss'

export default function Slideshow() {
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
          <div className="embla__slide">
            <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
          </div>
          <div className="embla__slide">
            <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
          </div>
          <div className="embla__slide">
            <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
          </div>
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
