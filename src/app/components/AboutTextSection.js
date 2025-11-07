import { PortableText } from '@portabletext/react';
import ParenthesesText from "./ParenthesesText";

export default function AboutTextSection({ bioContent, column1Title, column1Text, column2Title, column2Text, column3Title, column3Text }) {
  // Check if each column has content
  const hasColumn1 = column1Title || column1Text;
  const hasColumn2 = column2Title || column2Text;
  const hasColumn3 = column3Title || column3Text;

  return (
    <>
      <div className="">
        <div className="mb-4">
        <ParenthesesText>bio</ParenthesesText>
        </div>
        {bioContent}
      </div>
      <div className="flex flex-col md:flex-row gap-12 md:gap-8 text-sm mt-12 founders-grotesk uppercase w-full">
        {hasColumn1 && (
          <div className="w-full md:w-1/4">
            {column1Title && <h3 className="text-xs mb-4">( {column1Title} )</h3>}
            {column1Text && (
              <div className="column-text">
                <PortableText value={column1Text} />
              </div>
            )}
          </div>
        )}
        {hasColumn2 && (
          <div className="w-full md:w-1/3">
            {column2Title && <h3 className="text-xs mb-4">( {column2Title} )</h3>}
            {column2Text && (
              <div className="column-text">
                <PortableText value={column2Text} />
              </div>
            )}
          </div>
        )}
        <div className="flex-grow hidden md:block"></div>
        {hasColumn3 && (
          <div className="w-full md:w-1/4 mb-4">
            {column3Title && <h3 className="text-xs mb-4">( {column3Title} )</h3>}
            {column3Text && (
              <div className="column-text">
                <PortableText value={column3Text} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
