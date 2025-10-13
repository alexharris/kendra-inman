'use client';

import Image from "next/image";
import BigText from "../components/big-text";
import ScrollSection from "../components/ScrollSection";
import HeroSlideshow from "../components/HeroSlideshow";
import { useEffect, useState, useRef } from "react";
import { PortableText } from '@portabletext/react';
import { getHomepageContent } from '../../utils/sanity-queries';

// Animation Timing Configuration - Easy to modify animation speeds
const ANIMATION_TIMINGS = {
  // Initial Page Load Animation
  pageLoad: {
    startShrinking: 50,          // Delay before shrinking starts
    shrinkingDuration: 800,     // Logo shrinking duration (ms)
    startMoving: 700,     // When shrinking completes and moving begins  
    movingDuration: 1200, // Overlay slide duration (ms)
    endAnimation: 3000,    // When entire animation completes    
  },
  
  // Slideshow Animation
  slideshow: {
    autoAdvanceInterval: 3000, // Time between slide changes (ms)
  },
  
  // Background Color Transitions
  background: {
    colorTransition: 500,     // Background color change duration (ms)
    detectionDelay: 100,      // Delay for initial background detection
  },
};



export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('initial'); // 'initial', 'shrinking', 'moving', 'complete'
  const [isBigTextSticky, setIsBigTextSticky] = useState(true);
  const sectionRefs = useRef([]);
  
  // Fetch homepage content from Sanity (Portable Text and Sections)
  const [homepageData, setHomepageData] = useState(null);
  const [homepageContent, setHomepageContent] = useState(null);
  const [homepageSections, setHomepageSections] = useState([]);
  const [heroSlideshow, setHeroSlideshow] = useState(null);
  const [brandColors, setBrandColors] = useState([
    'bg-red', 'bg-beige', 'bg-purple', 'bg-blue', 'bg-yellow',
    'bg-taupe', 'bg-green', 'bg-black', 'bg-red', 'bg-black'
  ]);

  // Dynamic brand colors from Sanity sections
  const getBrandColors = () => {
    if (!homepageSections.length) {
      // Fallback colors while loading
      return [
        'bg-red', 'bg-beige', 'bg-purple', 'bg-blue', 'bg-yellow',
        'bg-taupe', 'bg-green', 'bg-black', 'bg-red', 'bg-black'
      ];
    }
    
    const sectionColors = homepageSections.map(section => {
      // Map color reference to CSS class
      const colorValue = section.colorReference?.value || section.colorReference?.name;
      if (colorValue) {
        return `bg-${colorValue.toLowerCase()}`;
      }
      return 'bg-gray-500'; // fallback
    });
    
    // Add footer color
    sectionColors.push('bg-black');
    
    return sectionColors;
  };



  // Page load animation effect
  useEffect(() => {
    // Start the animation sequence after component mounts
    const timer1 = setTimeout(() => {
      setAnimationPhase('shrinking');
    }, ANIMATION_TIMINGS.pageLoad.startShrinking);

    const timer2 = setTimeout(() => {
      setAnimationPhase('moving');
    }, ANIMATION_TIMINGS.pageLoad.startMoving);

    const timer3 = setTimeout(() => {
      setAnimationPhase('complete');
      setShowLoader(false);
      

    }, ANIMATION_TIMINGS.pageLoad.endAnimation);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const lastSectionIndex = Math.max(homepageSections.length - 1, 0);
      
      sectionRefs.current.forEach((section, index) => {
        console.log(`Checking section ${index} at scrollY: ${scrollY}`);
        if (section) {
          const imageElement = section.querySelector('.section-image');
          
          if (imageElement) {
            const imageRect = imageElement.getBoundingClientRect();
            const imageTop = scrollY + imageRect.top;
            const imageBottom = imageTop + imageRect.height;
            
            // Check if image is fully visible in viewport
            const viewportTop = scrollY;
            const viewportBottom = scrollY + windowHeight;
            
            if (imageTop >= viewportTop && imageBottom <= viewportBottom) {
              console.log(`Section ${index} image is fully visible`);
              setCurrentSection(index);
            } 
          } else if (index === lastSectionIndex) {
            // For the last section (footer), check if it's in view
            const sectionRect = section.getBoundingClientRect();
            const sectionTop = scrollY + sectionRect.top;
            
            if (sectionTop <= scrollY + windowHeight * 0.5) {
              console.log(`Last section ${index} is in view`);
              setCurrentSection(lastSectionIndex);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [homepageSections.length]); // Add dependency on sections length

  useEffect(() => {
    getHomepageContent()
      .then((data) => {
        setHomepageData(data);
        setHomepageContent(data?.content);
        setHomepageSections(data?.sections || []);
        setHeroSlideshow(data?.heroSlideshow);
      })
      .catch(console.error);
  }, []);

  // Update brand colors when sections change
  useEffect(() => {
    if (homepageSections.length > 0) {
      setBrandColors(getBrandColors());
    }
  }, [homepageSections]);

  return (
    <>

      <div id="main-scroll bg-beige text-black">

        {/* Sections  */}
        
        <div className="sticky top-12 relative">
          <BigText className="z-10">Kendra is a Creative Director based in NYC</BigText>                
          <div className="">
          Kendra Inman is a leading creative director known for building some of the most emotionally resonant and category-defining brands of today, from start-ups to global icons. She helped scale Dollar Shave Club from disruptive startup to $1B acquisition and led the rebrand for a nationwide retail launch. She built ByHeart's in-house creative organization and brand ecosystem from the ground up to be named to 2025's insurgent brand list by Bain & Co. The formative years of her career were spent shaping the beloved surf brand, Roxy, and developing sustainable design practices as the first employee at the green design studio, Celery Design Collaborative. She also had success as an entrepreneur, co-founding One Love Organics, a pioneer in clean beauty. She's been an advisor and fractional CCO to founders of innovative CPG brands in skincare, wellness, food & beverage, and the disruptive non-alcohol markets. Her work blends brand storytelling with business performance, driving rapid growth across DTC, retail, and omnichannel platforms.
          </div>

        </div>      
        <div id="about-image" className="z-30 absolute right-24 bottom-12"><img src="/images/kendra.jpg" /></div>

        <div id="footer-extension" className="pb-[100vh]">
          Kendra Inman is a leading creative director known for building some of the most emotionally resonant and category-defining brands of today, from start-ups to global icons. She helped scale Dollar Shave Club from disruptive startup to $1B acquisition and led the rebrand for a nationwide retail launch. She built ByHeart's in-house creative organization and brand ecosystem from the ground up to be named to 2025's insurgent brand list by Bain & Co. The formative years of her career were spent shaping the beloved surf brand, Roxy, and developing sustainable design practices as the first employee at the green design studio, Celery Design Collaborative. She also had success as an entrepreneur, co-founding One Love Organics, a pioneer in clean beauty. She's been an advisor and fractional CCO to founders of innovative CPG brands in skincare, wellness, food & beverage, and the disruptive non-alcohol markets. Her work blends brand storytelling with business performance, driving rapid growth across DTC, retail, and omnichannel platforms.
        </div>      
      </div>
    </>
  );
}
