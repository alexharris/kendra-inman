export default function AboutTextSection({ bioContent }) {
  return (
    <>
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
    </>
  );
}
