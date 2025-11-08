'use client';

import Image from "next/image";
import BigText from "./components/big-text";
import ScrollSection from "./components/ScrollSection";
import HeroSlideshow from "./components/HeroSlideshow";
import { useEffect, useState, useRef } from "react";
import { PortableText } from '@portabletext/react';
import { getHomepageContent } from '../utils/sanity-queries';
import { setPageColors, resetPageColors } from '../utils/pageColors';

// ============================================================================
// ANIMATION TIMING CONFIGURATION
// ============================================================================
// This controls the page load animation sequence. All times are in milliseconds.
//
// TIMELINE VISUALIZATION:
// 0ms -----> 100ms -----> 600ms -----> 1100ms -----> 1600ms -----> 2000ms
//  |          |            |            |             |              |
//  |          |            |            |             |              └─ Complete (hide loader, enable scrolling)
//  |          |            |            |             └─ Overlay slide finishes
//  |          |            |            └─ Overlay starts sliding up
//  |          |            └─ Logo shrinking finishes
//  |          └─ Logo starts shrinking
//  └─ Page loads
//
// HOW THE TIMES WORK TOGETHER:
// 1. startShrinking: Initial delay before anything happens (100ms)
// 2. shrinkingDuration: How long the logo takes to shrink (500ms = 0.5 seconds)
// 3. startMoving: Must be >= (startShrinking + shrinkingDuration) to avoid overlap
//    Current: 100 + 500 = 600ms, but set to 1100ms for a 500ms pause
// 4. movingDuration: How long the overlay takes to slide up (500ms = 0.5 seconds)
// 5. endAnimation: Total time from page load to completion (2000ms = 2 seconds)
//    Note: Overlay finishes at 1600ms (1100 + 500), with 400ms buffer before loader hides
//
// QUICK ADJUSTMENTS:
// - Want faster logo shrink? Decrease shrinkingDuration AND startMoving by same amount
// - Want pause between shrink/move? Increase startMoving (keep it > startShrinking + shrinkingDuration)
// - Want faster overlay slide? Decrease movingDuration only
// - Want shorter total animation? Decrease endAnimation (must be > startMoving + movingDuration)
//
const ANIMATION_TIMINGS = {
  // Initial Page Load Animation
  pageLoad: {
    startShrinking: 100,        // [Step 1] Delay before shrinking starts (ms)
    shrinkingDuration: 500,     // [Step 2] Logo shrinking duration (ms)
    startMoving: 1100,          // [Step 3] When overlay slide begins (ms from page load)
                                //         Note: Set to 1100 instead of 600 for 500ms pause after shrinking
    movingDuration: 2000,       // [Step 4] Overlay slide duration (ms)
    endAnimation: 5000,         // [Step 5] Total animation time from page load (ms)
                                //         At this point: loader hidden, scrolling enabled
  },
  
  // Slideshow Animation (plays during the load animation)
  slideshow: {
    autoAdvanceInterval: 3000,  // Time between automatic slide changes (ms)
  },
  
  // Background Color Transitions (for scroll sections)
  background: {
    colorTransition: 500,       // Background color fade duration (ms)
    detectionDelay: 100,        // Initial background color detection delay (ms)
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
  const [bigText, setBigText] = useState(null);
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
        'bg-black', 'bg-red', 'bg-beige', 'bg-purple', 'bg-blue', 'bg-yellow',
        'bg-taupe', 'bg-green', 'bg-black', 'bg-red', 'bg-black'
      ];
    }
    
    const sectionColors = homepageSections.map(section => {
      // Map category reference to CSS class via the category's color
      const colorValue = section.categoryReference?.color?.value || section.categoryReference?.color?.name;
      if (colorValue) {
        return `bg-${colorValue.toLowerCase()}`;
      }
      return 'bg-gray-500'; // fallback
    });
    
    // Add manual first section color (beige) at the beginning
    sectionColors.unshift('bg-beige');
    
    // Add manual last section color (black) before footer
    sectionColors.push('bg-black');
    
    // Add footer color
    sectionColors.push('bg-black');
    
    return sectionColors;
  };



  // Page load animation effect
  useEffect(() => {
    // Start the animation sequence after component mounts
    const timer1 = setTimeout(() => {
      setAnimationPhase('shrinking');
      // console.log('Animation phase set to shrinking');
    }, ANIMATION_TIMINGS.pageLoad.startShrinking);

    const timer2 = setTimeout(() => {
      setAnimationPhase('moving');
      // console.log('Animation phase set to moving');
    }, ANIMATION_TIMINGS.pageLoad.startMoving);

    const timer3 = setTimeout(() => {
      setAnimationPhase('complete');
      setShowLoader(false);
      // console.log('Animation phase set to complete, loader hidden');
    }, ANIMATION_TIMINGS.pageLoad.endAnimation);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Scroll event listener to detect current section

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const manualLastSectionIndex = homepageSections.length + 1; // +1 for manual first section, then the last manual section
      const footerSectionIndex = homepageSections.length + 2; // +2 for both manual sections
      
        // Check if we're still at the top (before first section image)
      const firstSection = sectionRefs.current[0];
      if (firstSection) {
        const firstImage = firstSection.querySelector('.section-image');
        if (firstImage && firstImage.getBoundingClientRect().top > windowHeight) {
          setCurrentSection(0);
          return;
        }
      }
      

      // Check if we're in the manual last section
      const manualLastSection = document.querySelector('#manual-last-section');
      if (manualLastSection) {
        const manualLastRect = manualLastSection.getBoundingClientRect();
        
        // Switch as soon as the top of the section enters the viewport
        if (manualLastRect.top <= windowHeight) {
          setCurrentSection(manualLastSectionIndex);
          return;
        }
      }

      
      // Check if we're in the footer
      const footer = document.querySelector('#footer-extension');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const footerTop = scrollY + footerRect.top;
        
        if (scrollY >= footerTop - windowHeight * 0.3) {
          setCurrentSection(footerSectionIndex);
          return;
        }
      }

      // Check each section's image position
      
      sectionRefs.current.forEach((section, index) => {
        // console.log(`Checking section ${index} at scrollY: ${scrollY}`);
        if (section) {
          const imageElement = section.querySelector('.section-image');
          
          if (imageElement) {
            const imageRect = imageElement.getBoundingClientRect();
            
            // Check if image is entering the viewport (top of image crosses bottom of viewport)
            // Switch color as soon as any part of the image becomes visible
            if (imageRect.top <= windowHeight) {
              console.log(`Section ${index} image is visible in viewport`);
              setCurrentSection(index + 1); // +1 to account for manual first section
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      resetPageColors(); // Clean up page colors on unmount
    };
  }, [homepageSections.length]); // Add dependency on sections length

  useEffect(() => {
    getHomepageContent()
      .then((data) => {
        setHomepageData(data);
        setHomepageContent(data?.content);
        setBigText(data?.bigText);
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

  // Update page colors when current section changes
  useEffect(() => {
    const currentBgColor = brandColors[currentSection];
    
    // Determine text and fill colors based on background
    const text = (currentBgColor === 'bg-black' || currentBgColor === 'bg-beige') 
      ? 'text-beige' 
      : 'text-black';
    const fill = (currentBgColor === 'bg-black' || currentBgColor === 'bg-beige') 
      ? 'fill-beige' 
      : 'fill-black';
    
    setPageColors({
      background: currentBgColor,
      text,
      fill,
      applyToFooter: false, // Don't override footer colors
    });
  }, [currentSection, brandColors]);   

  return (
    <>
      {/* Page Load Animation Overlay */}
      {showLoader && (
        // Background fades out
        <div 
          className={`fixed inset-0 bg-black z-50 transition-opacity ease-out ${
            animationPhase === 'moving' ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ 
            transitionDuration: `${ANIMATION_TIMINGS.pageLoad.movingDuration}ms` 
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            {/* Shrinking and moving up */}
            <svg 
              className={`transition-all ease-out ${
                animationPhase === 'initial' ? 'w-[100vw] px-8' : 
                animationPhase === 'shrinking' ? 'w-48' : 
                'w-48'
              }`}
              style={{ 
                fill: '#F5F5DC',
                transform: animationPhase === 'moving' ? 'translateY(calc(-70vh + 37.5px))' : 'translateY(0)',
                transitionDuration: animationPhase === 'moving' 
                  ? `${ANIMATION_TIMINGS.pageLoad.movingDuration}ms`
                  : `${ANIMATION_TIMINGS.pageLoad.shrinkingDuration}ms` 
              }} 
              viewBox="0 0 1330 124" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32.5462 51.348L71.7422 0.343999H111.43L62.3942 58.892L116.022 124H74.3662L32.5462 70.372V124H0.402168V0.343999H32.5462V51.348ZM190.805 27.568H152.593V48.232H188.673V75.456H152.593V96.776H190.805V124H120.449V0.343999H190.805V27.568ZM204.14 124V0.343999H236.284L295.652 75.948V0.343999H327.632V124H295.652L236.284 48.396V124H204.14ZM375.87 96.776H383.25C388.826 96.776 393.801 95.9013 398.174 94.152C402.547 92.4027 406.21 89.9973 409.162 86.936C412.223 83.8747 414.519 80.2667 416.05 76.112C417.69 71.848 418.51 67.2013 418.51 62.172C418.51 57.252 417.69 52.66 416.05 48.396C414.41 44.132 412.059 40.4693 408.998 37.408C406.046 34.3467 402.383 31.9413 398.01 30.192C393.637 28.4427 388.717 27.568 383.25 27.568H375.87V96.776ZM343.726 0.343999H391.286C399.705 0.343999 407.577 2.03866 414.902 5.42799C422.337 8.81733 428.787 13.3547 434.254 19.04C439.83 24.616 444.203 31.176 447.374 38.720C450.545 46.1547 452.13 53.972 452.13 62.172C452.13 70.2627 450.545 78.08 447.374 85.624C444.313 93.0587 439.994 99.6187 434.418 105.304C428.951 110.989 422.501 115.527 415.066 118.916C407.741 122.305 399.814 124 391.286 124H343.726V0.343999ZM494.956 55.612H501.024C507.365 55.612 512.23 54.3 515.62 51.676C519.009 49.052 520.704 45.28 520.704 40.36C520.704 35.44 519.009 31.668 515.62 29.044C512.23 26.42 507.365 25.108 501.024 25.108H494.956V55.612ZM565.64 124H525.624L494.956 76.44V124H462.812V0.343999H512.832C519.72 0.343999 525.733 1.38266 530.872 3.46C536.01 5.428 540.22 8.16133 543.5 11.66C546.889 15.1587 549.404 19.204 551.044 23.796C552.793 28.388 553.668 33.308 553.668 38.556C553.668 47.9587 551.372 55.612 546.78 61.516C542.297 67.3107 535.628 71.2467 526.772 73.324L565.64 124ZM636.485 78.08L622.053 36.916L607.621 78.08H636.485ZM645.013 102.516H599.093L591.713 124H557.437L604.505 0.343999H639.601L686.669 124H652.393L645.013 102.516ZM768.932 0.343999V124H736.788V0.343999H768.932ZM784.924 124V0.343999H817.068L876.436 75.948V0.343999H908.416V124H876.436L817.068 48.396V124H784.924ZM918.934 124L939.926 0.343999H971.742L996.506 66.272L1021.11 0.343999H1052.92L1073.91 124H1041.93L1031.27 52.824L1002.08 124H989.29L961.574 52.824L950.914 124H918.934ZM1151.68 78.08L1137.24 36.916L1122.81 78.08H1151.68ZM1160.2 102.516H1114.28L1106.9 124H1072.63L1119.7 0.343999H1154.79L1201.86 124H1167.58L1160.2 102.516ZM1206.08 124V0.343999H1238.23L1297.6 75.948V0.343999H1329.58V124H1297.6L1238.23 48.396V124H1206.08Z" />
            </svg>
          </div>
        </div>
      )}
      <div id="main-scroll">
        {/* Hero Slideshow */}
        <HeroSlideshow heroSlideshow={heroSlideshow} />
        
        {/* Sections  */}

        <div id="scroll-sections" className="p-4 md:p-12 relative">
          <div id="big-sticky" className="z-10 max-w-[1400px] mx-auto sticky top-0 flex items-start md:items-center pointer-events-none pt-80 pb-30 mb-32 md:mb-12">
            <BigText 
              className={`transition-colors ${brandColors[currentSection] === 'bg-black' ? 'text-beige' : 'text-black'}`}
              style={{ transitionDuration: `${ANIMATION_TIMINGS.background.colorTransition}ms` }}
            >
              {bigText ? <PortableText value={bigText} /> : ''}
            </BigText>
          </div>
          <div id="manual-first-section" className="h-150 w-full relative">
            {/* manual first section */}
          </div>
          {homepageSections.map((section, index) => (
            <ScrollSection 
              key={index}
              index={index} 
              sectionRefs={sectionRefs}
              section={section}
            />
          ))}
          <div id="manual-last-section" className="h-24 md:h-48 flex flex-row items-center pl-2 w-full relative max-w-[1400px] mx-auto">
            {homepageContent ? (
              <PortableText value={homepageContent} />

            ) : (
              "Loading..."
            )}
          </div>
        </div>      
        <div id="footer-extension" className="min-h-[20vh] w-full  p-4 md:p-12 relative bg-black text-beige">

        </div>      
      </div>
    </>
  );
}
