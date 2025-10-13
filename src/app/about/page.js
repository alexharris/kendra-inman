'use client';

import BigText from "../components/big-text";
import { useScrollVisibilityToggle } from "../../hooks/useScrollVisibilityToggle";



export default function Home() {
  const { showReference, showTarget } = useScrollVisibilityToggle('top-about-text', 'footer-extension');

  return (
    <>

      <div id="main-scroll" className="bg-beige text-black p-4 md:p-8">

        {/* Sections  */}
        
        <div className="sticky top-12 relative">
          <BigText className="z-10">Kendra is a Creative Director based in NYC</BigText>                
          <div className={`transition-opacity duration-0 ${showReference ? 'opacity-0' : 'opacity-100'}`}>
          <div id="top-about-text"></div>
          Kendra Inman is a leading creative director known for building some of the most emotionally resonant and category-defining brands of today, from start-ups to global icons. She helped scale Dollar Shave Club from disruptive startup to $1B acquisition and led the rebrand for a nationwide retail launch. She built ByHeart's in-house creative organization and brand ecosystem from the ground up to be named to 2025's insurgent brand list by Bain & Co. The formative years of her career were spent shaping the beloved surf brand, Roxy, and developing sustainable design practices as the first employee at the green design studio, Celery Design Collaborative. She also had success as an entrepreneur, co-founding One Love Organics, a pioneer in clean beauty. She's been an advisor and fractional CCO to founders of innovative CPG brands in skincare, wellness, food & beverage, and the disruptive non-alcohol markets. Her work blends brand storytelling with business performance, driving rapid growth across DTC, retail, and omnichannel platforms.
          </div>
        </div>      
        <div id="about-image" className="z-30 absolute right-24 -bottom-24">
          <img src="/images/kendra.jpg" />
        </div>
        <div id="footer-extension" className={`pb-[100vh] transition-opacity duration-0 ${showTarget ? 'opacity-0' : 'opacity-100'}`}>
          Kendra Inman is a leading creative director known for building some of the most emotionally resonant and category-defining brands of today, from start-ups to global icons. She helped scale Dollar Shave Club from disruptive startup to $1B acquisition and led the rebrand for a nationwide retail launch. She built ByHeart's in-house creative organization and brand ecosystem from the ground up to be named to 2025's insurgent brand list by Bain & Co. The formative years of her career were spent shaping the beloved surf brand, Roxy, and developing sustainable design practices as the first employee at the green design studio, Celery Design Collaborative. She also had success as an entrepreneur, co-founding One Love Organics, a pioneer in clean beauty. She's been an advisor and fractional CCO to founders of innovative CPG brands in skincare, wellness, food & beverage, and the disruptive non-alcohol markets. Her work blends brand storytelling with business performance, driving rapid growth across DTC, retail, and omnichannel platforms.
        </div>      
      </div>
    </>
  );
}
