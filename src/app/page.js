'use client';

import Image from "next/image";
import BigText from "./components/big-text";
import ScrollSection from "./components/ScrollSection";
import { useEffect, useState, useRef } from "react";
import { PortableText } from '@portabletext/react';
import { getHomepageContent } from '../utils/sanity-queries';

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
    // Hide the header during animation
    const header = document.getElementById('site-header');
    if (header) {
      header.style.opacity = '0';
      header.style.pointerEvents = 'none';
      header.style.transition = 'opacity 0.5s ease-in-out';
    }

    // Start the animation sequence after component mounts
    const timer1 = setTimeout(() => {
      setAnimationPhase('shrinking');
    }, 800); // Wait 800ms before starting shrink

    const timer2 = setTimeout(() => {
      setAnimationPhase('moving');
    }, 2800); // Start moving after 1.8s

    const timer3 = setTimeout(() => {
      setAnimationPhase('complete');
      setShowLoader(false);
      
      // Show the header after animation completes
      setTimeout(() => {
        if (header) {
          header.style.opacity = '1';
          header.style.pointerEvents = 'auto';
        }
      }, 100); // Small delay to ensure smooth transition
    }, 6000); // Complete animation after 3s

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
      {/* Page Load Animation Overlay */}
      {showLoader && (
        <div 
          className={`fixed inset-0 bg-black z-50 transition-all duration-3200 ease-out ${
            animationPhase === 'moving' ? 'translate-y-[-100vh]' : ''
          }`}
        >
          <div className={`w-full h-full flex items-center justify-center ${
            animationPhase === 'moving' ? 'fixed top-0 left-0' : ''
          }`}>
            <svg 
              className={`transition-all duration-2000 ease-out ${
                animationPhase === 'initial' ? 'w-[100vw] px-8' : 
                animationPhase === 'shrinking' ? 'w-48' : 
                'w-48'
              }`}
              style={{ fill: '#F5F5DC' }} 
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
        {/* Intro Screen  */}
        <div className="h-screen w-full bg-gray-200 flex flex-col items-center justify-center">
intro screen
        </div>
        {/* Sections  */}
        <div className={`p-4 md:p-12 transition-colors duration-500 relative ${brandColors[currentSection]}`}>
          <BigText className="text-beige z-10 sticky top-24">Creative Direction that breaks through.</BigText>                
          {homepageSections.map((section, index) => (
            <ScrollSection 
              key={index}
              index={index} 
              sectionRefs={sectionRefs}
              section={section}
            />
          ))}
        </div>      
        <div id="footer-extension" className="min-h-[60vh] w-full relative bg-black text-white p-8 md:p-16">
          {console.log('Rendering footer extension with homepageContent:', homepageContent)}
          {homepageContent ? (
            <PortableText value={homepageContent} />
          ) : (
            "Loading..."
          )}
        </div>      
      </div>
    </>
  );
}
