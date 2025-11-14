'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { setPageColors } from '../utils/pageColors';
import BigText from "./components/big-text";


export default function NotFound() {
  // Set page colors to match the brand aesthetic
  useEffect(() => {
    setPageColors({
      background: 'bg-black',
      text: 'text-beige',
      fill: 'fill-beige',
      applyToFooter: true,
    });
  }, []);

  return (
    <div className="min-h-[66vh] flex flex-col items-center justify-center p-4 md:p-12 bg-black text-beige">
      <div className="max-w-[1400px] mx-auto text-center mt-6">
        {/* Large 404 */}
            <BigText 
              className=""
            >
              God is in the details.
            </BigText>        
        
        {/* Error message */}
        <h1 className="uppercase text-sm mt-8 mb-8">
          MIES VAN DER WOHE
        </h1>
        
        {/* Description */}
        <p className="text-2xl md:text-4xl max-w-2xl mx-auto">
          Even the 404. But you came for <a className="underline" href="/">this</a>.
        </p>
        
    
      </div>
    </div>
  );
}