'use client';

import Image from "next/image";
import BigText from "./components/big-text";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef([]);
  
  // Brand colors corresponding to each section
  const brandColors = [
    'bg-red',     // Section 0
    'bg-beige',   // Section 1  
    'bg-purple',  // Section 2
    'bg-blue',    // Section 3
    'bg-yellow',  // Section 4
    'bg-taupe',   // Section 5
    'bg-green',   // Section 6
    'bg-black',   // Section 7
    'bg-red',      // Section 8 (back to red)
    'bg-black'     // Section 9 (footer extension)
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const lastSectionIndex = brandColors.length - 1;
      
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
  }, []);

  return (
    <>
    <div className="h-screen w-full relative bg-gray-200 flex flex-col items-center justify-center">Intro screen</div>
    <div className={`p-8 transition-colors duration-500 relative ${brandColors[currentSection]}`}>
      <BigText className="text-beige sticky top-24 z-10">Creative Direction that breaks through.</BigText>
      <div 
        ref={el => sectionRefs.current[0] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-1/2 h-1/4 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[1] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-1/2 h-1/4 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[2] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-1/2 h-1/4 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[3] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-1/2 h-1/4 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[4] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-1/2 h-1/4 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[5] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-1/2 h-1/4 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[6] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-1/2 h-1/4 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[7] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-1/2 h-1/4 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[8] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-1/2 h-1/4 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div id="footer-extension" ref={el => sectionRefs.current[9] = el} className="h-[50vh] w-full relative"></div>      
    </div>
    
    </>
  );
}
