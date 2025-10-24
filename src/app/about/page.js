'use client';

import BigText from "../components/big-text";
import { useScrollVisibilityToggle } from "../../hooks/useScrollVisibilityToggle";
import { useEffect, useState } from "react";
import { PortableText } from '@portabletext/react';
import { getAboutContent } from '../../utils/sanity-queries';




export default function Home() {
  const { showTop, showBottom } = useScrollVisibilityToggle('top-about-text', 'footer-extension');
  const [aboutContent, setAboutContent] = useState(null);

  useEffect(() => {
    getAboutContent()
      .then(data => {
        setAboutContent(data);
      })
      .catch(err => console.error('Error loading about content:', err));
  }, []);

  // Custom components to strip p tags
  const components = {
    block: {
      normal: ({children}) => <>{children}</>,
    },
  };

  // Store the content in a variable to avoid duplication
  const bioContent = aboutContent?.content ? (
    <PortableText value={aboutContent.content} components={components} />
  ) : null;

  return (
    <>

      <div id="main-scroll" className="bg-beige text-black p-4 md:p-8">

        {/* Sections  */}
        
        <div className="sticky top-12">
          <BigText className="z-10">Kendra is a Creative Director based in NYC</BigText>                
          <div className={`about-text transition-opacity duration-0 ${showTop ? 'opacity-0' : 'opacity-100'}`}>
            <div id="top-about-text"></div>
            {bioContent}
            <div className="flex text-sm mt-16 founders-grotesk uppercase">
              <div className="w-full md:w-1/5">
                <h3 className="text-xs mb-4">( Expertise )</h3>
                <ul>
                  <li>BRAND STRATEGY</li>
                  <li>BRAND CAMPAIGNS</li>
                  <li>DIGITAL DESIGN</li>
                  <li>PACKAGE DESIGN</li>
                  <li>RETAIL DESIGN</li>
                  <li>AI DESIGN</li>
                  <li>BRAND SYSTEMS</li>
                  <li>ART DIRECTION</li>
                  <li>COPY DIRECTION</li>
                </ul>

              </div>
              <div className="w-full md:w-2/5">
                <h3 className="text-xs mb-4">( Speaking Engagements )</h3>
                <ul>
                  <li>2013 Fuse Brand & Package Design</li>
                  <li>2019 AMERICAPACK SUMMIT</li>
                  <li>2024 AMERICAPACK SUMMIT</li>
                </ul>
              </div>
              <div className="w-full md:w-3/5">
                <h3 className="text-xs mb-4">( Connect With Me )</h3>
                <a href="mailto:kendrainman@gmail.com">KENDRAINMAN@GMAIL.COM</a>
              </div>
            </div>            
          </div>
        </div>      
        <div id="about-image" className="z-30 absolute right-24 -bottom-24">
          <img src="/images/kendra.jpg" />
        </div>
        <div id="footer-extension" className={`pb-[60vh] about-text transition-opacity duration-0 ${showBottom ? 'opacity-0' : 'opacity-100'}`}>
          {bioContent}

        </div>      
      </div>
    </>
  );
}
