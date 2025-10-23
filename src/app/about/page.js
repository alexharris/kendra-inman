'use client';

import BigText from "../components/big-text";
import { useScrollVisibilityToggle } from "../../hooks/useScrollVisibilityToggle";
import { useEffect, useState } from "react";
import { PortableText } from '@portabletext/react';
import { getAboutContent } from '../../utils/sanity-queries';




export default function Home() {
  const { showReference, showTarget } = useScrollVisibilityToggle('top-about-text', 'footer-extension');
  const [aboutContent, setAboutContent] = useState(null);

  useEffect(() => {
    getAboutContent()
      .then(data => {
        setAboutContent(data);
      })
      .catch(err => console.error('Error loading about content:', err));
  }, []);

  return (
    <>

      <div id="main-scroll" className="bg-beige text-black p-4 md:p-8">

        {/* Sections  */}
        
        <div className="sticky top-12 relative">
          <BigText className="z-10">Kendra is a Creative Director based in NYC</BigText>                
          <div className={`about-text transition-opacity duration-0 ${showReference ? 'opacity-0' : 'opacity-100'}`}>
            <div id="top-about-text"></div>
            {aboutContent && aboutContent.content && (
              <PortableText value={aboutContent.content} />
            )}
          </div>
        </div>      
        <div id="about-image" className="z-30 absolute right-24 -bottom-24">
          <img src="/images/kendra.jpg" />
        </div>
        <div id="footer-extension" className={`pb-[100vh] about-text transition-opacity duration-0 ${showTarget ? 'opacity-0' : 'opacity-100'}`}>
          {aboutContent && aboutContent.content && (
            <PortableText value={aboutContent.content} />
          )}
        </div>      
      </div>
    </>
  );
}
