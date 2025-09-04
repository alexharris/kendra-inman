
'use client'

import { useEffect, useState, useRef } from 'react'
import BigText from "../components/big-text"

export default function Page() {
  const [scrollY, setScrollY] = useState(0)
  const bigTextRef = useRef(null)
  const aboutImageRef = useRef(null)
  const bigParagraphRef = useRef(null)
  const mainContent = useRef(null)
  const bigParagraphMarginTop = 400
  const imageMarginTop = 400



  useEffect(() => {




    const handleScroll = () => {
      setScrollY(window.scrollY)
      const paragraphRect = bigParagraphRef.current.getBoundingClientRect()
      const bigTextRect = bigTextRef.current.getBoundingClientRect()

    // bigParagraphRef.current.style.top = `${bigTextRect.bottom}px`
    // bigParagraphRef.current.style.position = 'absolute'






      // Check if bigParagraph has reached bigText

      if (paragraphRect.y + bigParagraphMarginTop <= bigTextRect.bottom) {
        console.log('bigParagraph is above bigText')
          // bigParagraphRef.current.style.paddingTop = 0
          bigTextRef.current.style.backgroundColor = 'red'
          bigParagraphRef.current.style.paddingTop = '0px'
          bigParagraphRef.current.style.position = 'sticky'
          bigParagraphRef.current.style.top = `${bigTextRect.bottom}px`
      }

      // Check if about-image has scrolled off the top
      // if (aboutImageRef.current) {
      //   const imageRect = aboutImageRef.current.getBoundingClientRect()

      //   if (imageRect.bottom <= 0) {
      //     bigTextRef.current.style.backgroundColor = 'yellow'
      //     bigTextRef.current.style.position = 'static'
      //     bigParagraphRef.current.style.position = 'static'
      //   } else {
      //     bigTextRef.current.style.position = 'fixed'
      //     bigParagraphRef.current.style.position = 'fixed'
      //   }
      // }

    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
    <div ref={mainContent} className="min-h-[300vh] flex flex-col basic-padding bg-beige pt-48">
      <div ref={bigTextRef} className="sticky top-24">
        <BigText>Kendra is a Creative Director based in NYC</BigText>
      </div>
      <div ref={aboutImageRef} id="about-image" style={{ marginTop: `${imageMarginTop}px` }} className={`bg-gray-400 w-48 h-48 z-30 absolute`}></div>
      <div ref={bigParagraphRef} style={{ paddingTop: `${bigParagraphMarginTop}px` }} className="big-paragraph w-full md:w-2/3 lg:w-1/2">
        Kendra Inman is a leading creative director known for building some of the most emotionally resonant and category-defining brands of today, from start-ups to global icons. She helped scale Dollar Shave Club from disruptive startup to $1B acquisition and led the rebrand for a nationwide retail launch. She built ByHeart’s in-house creative organization and brand ecosystem from the ground up to be named to 2025’s insurgent brand list by Bain & Co. The formative years of her career were spent shaping the beloved surf brand, Roxy, and developing sustainable design practices as the first employee at the green design studio, Celery Design Collaborative. She also had success as an entrepreneur, co-founding One Love Organics, a pioneer in clean beauty. She’s been an advisor and fractional CCO to founders of innovative CPG brands in skincare, wellness, food & beverage, and the disruptive non-alcohol markets. Her work blends brand storytelling with business performance, driving rapid growth across DTC, retail, and omnichannel platforms.
      </div>
    </div>
    </>
  )

}