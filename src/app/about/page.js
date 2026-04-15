'use client';

import BigText from "../components/big-text";
import AboutTextSection from "../components/AboutTextSection";
import ParenthesesText from "../components/ParenthesesText";
import { useEffect, useState, useRef } from "react";
import { PortableText } from '@portabletext/react';
import { getAboutContent } from '../../utils/sanity-queries';
import { urlFor } from '../../sanity/lib/image';
import { setPageColors, resetPageColors } from '../../utils/pageColors';


export default function About() {
  const [aboutContent, setAboutContent] = useState(null);
  const [bigText, setBigText] = useState(null);
  const [aboutTextVisible, setAboutTextVisible] = useState(false);
  const bigTextRef = useRef(null);
  const imageRef = useRef(null);

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

  // Show about text when image scrolls past the big text
  useEffect(() => {
    const handleScroll = () => {
      if (!bigTextRef.current || !imageRef.current) return;
      const imageBottom = imageRef.current.getBoundingClientRect().bottom;
      const bigTextBottom = bigTextRef.current.getBoundingClientRect().bottom;
      if (imageBottom <= bigTextBottom) {
        setAboutTextVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom components to add p tags for paragraph breaks
  const components = {
    block: {
      normal: ({children}) => <p className="mb-4">{children}</p>,
    },
  };

  // Store the content in a variable to avoid duplication
  const bioContent = aboutContent?.content ? (
    <PortableText value={aboutContent.content} components={components} />
  ) : null;

  return (
    <>
      <div id="main-scroll" className="bg-beige text-black p-4 md:p-8 max-w-[1400px] mx-auto mb-18">

        {/* BigText is sticky. Image scrolls through. About text fades in
            once the image clears the bottom edge of the big text. */}
        <div className="min-h-[100dvh]">
          <div ref={bigTextRef} className="sticky top-40 z-10">
            <BigText className="w-full">
              {bigText ? <PortableText value={bigText} components={components} /> : 'Kendra is a Creative Director based in NYC'}
            </BigText>
          </div>

          <div className="h-[30dvh]"></div>

          <div ref={imageRef} id="about-image" className="relative z-20 ml-auto w-fit pr-4 sm:pr-12 lg:pr-72 xl:pr-[33%]">
            <div className="font-mono text-xs text-right pr-8 mb-3">01</div>
            <img className="w-56 md:w-96" src={aboutContent?.image ? urlFor(aboutContent.image).url() : "/images/kendra.jpg"} alt={aboutContent?.image?.caption || "About"} />
            {aboutContent?.image?.caption && (
              <ParenthesesText className="text-right mt-4">{aboutContent.image.caption}</ParenthesesText>
            )}
          </div>

          <div className="h-[60dvh]"></div>
        </div>

        <div className={`about-text text-2xl pt-8 md:text-4xl w-full md:w-9/12 lg:w-9/12 pb-8 md:pb-16 transition-all duration-700 ease-out ${aboutTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
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
