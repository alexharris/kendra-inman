'use client';

import BigText from "../components/big-text";
import AboutTextSection from "../components/AboutTextSection";
import ParenthesesText from "../components/ParenthesesText";
import { useScrollVisibilityToggle } from "../../hooks/useScrollVisibilityToggle";
import { useEffect, useState } from "react";
import { PortableText } from '@portabletext/react';
import { getAboutContent } from '../../utils/sanity-queries';
import { urlFor } from '../../sanity/lib/image';
import { setPageColors, resetPageColors } from '../../utils/pageColors';


export default function About() {
  const { showTop, showBottom } = useScrollVisibilityToggle('top-about-text', 'footer-extension');
  const [aboutContent, setAboutContent] = useState(null);
  const [bigText, setBigText] = useState(null);

  useEffect(() => {
    getAboutContent()
      .then(data => {
        setAboutContent(data);
        setBigText(data?.bigText);
      })
      .catch(err => console.error('Error loading about content:', err));
  }, []);

  // Set page colors on mount
  useEffect(() => {
    setPageColors({
      background: 'bg-beige',
      text: 'text-black',
      fill: 'fill-black',
    });

    return () => {
      resetPageColors();
    };
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
      <div id="main-scroll" className="bg-beige text-black p-4 md:p-8 max-w-[1400px] mx-auto mb-18">

        {/* Sections  */}
        
        <div className="sticky top-32">
          <BigText className="z-10 w-full">
            {bigText ? <PortableText value={bigText} components={components} /> : 'Kendra is a Creative Director based in NYC'}
          </BigText>                
          <div className={`about-text text-2xl pt-8 md:text-4xl w-full md:w-2/3 lg:w-7/12 transition-opacity duration-0 ${showTop ? 'opacity-0 h-[130vh] sm:h-auto' : 'opacity-100'}`}>
            <div id="top-about-text"></div>
            <AboutTextSection 
              bioContent={bioContent}
              column1Title={aboutContent?.column1Title}
              column1Text={aboutContent?.column1Text}
              column2Title={aboutContent?.column2Title}
              column2Text={aboutContent?.column2Text}
              column3Title={aboutContent?.column3Title}
              column3Text={aboutContent?.column3Text}
            />
          </div>
        </div>      
        <div id="about-image" className="z-30 absolute right-4 sm:right-12 lg:right-72 xl:right-1/3 -bottom-48 md:-bottom-88">
          <div className="font-mono text-xs text-right pr-8 mb-3">01</div>
          <img className="w-56 md:w-96" src={aboutContent?.image ? urlFor(aboutContent.image).url() : "/images/kendra.jpg"} alt={aboutContent?.image?.caption || "About"} />
          {aboutContent?.image?.caption && (
            <ParenthesesText className="text-right mt-4">{aboutContent.image.caption}</ParenthesesText>
          )}
        </div>
        <div id="footer-extension" className={`pb-[20vh] md:pb-[60vh] about-text text-2xl md:text-4xl w-full md:w-2/3 lg:w-7/12 transition-opacity duration-0 ${showBottom ? 'opacity-0' : 'opacity-100'}`}>
          <AboutTextSection 
            bioContent={bioContent}
            column1Title={aboutContent?.column1Title}
            column1Text={aboutContent?.column1Text}
            column2Title={aboutContent?.column2Title}
            column2Text={aboutContent?.column2Text}
            column3Title={aboutContent?.column3Title}
            column3Text={aboutContent?.column3Text}
          />
        </div>      
      </div>
    </>
  );
}
