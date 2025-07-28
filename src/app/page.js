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
    'bg-red'      // Section 8 (back to red)
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      sectionRefs.current.forEach((section, index) => {
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
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`p-8 transition-colors duration-500 ${brandColors[currentSection]}`}>
      <BigText className="text-white fixed z-10">Creative Direction that breaks through.</BigText>
      <div 
        ref={el => sectionRefs.current[0] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-64 h-48 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[1] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-64 h-48 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[2] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-64 h-48 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[3] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-64 h-48 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[4] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-64 h-48 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[5] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-64 h-48 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[6] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-64 h-48 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[7] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-64 h-48 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
      <div 
        ref={el => sectionRefs.current[8] = el}
        className="h-screen w-full relative"
      >
        <div className="section-image w-64 h-48 bg-gray-200 absolute top-24 right-24">
        </div>
      </div>
    </div>
  );
}
