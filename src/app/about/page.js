'use client';

import BigText from "../components/big-text";
import AboutTextSection from "../components/AboutTextSection";
import ParenthesesText from "../components/ParenthesesText";
import { useEffect, useState } from "react";
import { PortableText } from '@portabletext/react';
import { getAboutContent } from '../../utils/sanity-queries';
import { urlFor } from '../../sanity/lib/image';
import { setPageColors, resetPageColors } from '../../utils/pageColors';


export default function About() {
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

        {/* BigText is sticky from the start. Image is in flow below it,
            pushed down so it starts half-visible at the bottom of the viewport.
            When the wrapper ends, BigText releases and the text meets it. */}
        <div className="min-h-screen">
          <div className="sticky top-40 z-10">
            <BigText className="w-full">
              {bigText ? <PortableText value={bigText} components={components} /> : 'Kendra is a Creative Director based in NYC'}
            </BigText>
          </div>

          <div className="h-[45vh]"></div>

          <div id="about-image" className="ml-auto w-fit pr-4 sm:pr-12 lg:pr-72 xl:pr-[33%]">
            <div className="font-mono text-xs text-right pr-8 mb-3">01</div>
            <img className="w-56 md:w-96" src={aboutContent?.image ? urlFor(aboutContent.image).url() : "/images/kendra.jpg"} alt={aboutContent?.image?.caption || "About"} />
            {aboutContent?.image?.caption && (
              <ParenthesesText className="text-right mt-4">{aboutContent.image.caption}</ParenthesesText>
            )}
          </div>

          {/* Extra scroll distance so the image fully exits the viewport
              before the wrapper ends and the about text appears */}
          <div className="h-screen"></div>
        </div>

        <div className="about-text text-2xl pt-8 md:text-4xl w-full md:w-9/12 lg:w-9/12 pb-[20vh] md:pb-[60vh]">
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
