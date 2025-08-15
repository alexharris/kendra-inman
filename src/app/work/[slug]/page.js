import './Project.scss';
import Slideshow from '../../components/Slideshow';

export default function Page() {
  return (
    <>
      <div className="project-container bg-red hidden md:flex flex-col text-white px-4">
        <div id="project-slideshow" className="w-full z-10">
          <Slideshow />
        </div>
        <div className="bg-red flex flex-col gap-10 pb-16 z-20">
          <div id="project-intro" className="z-20 flex flex-row items-center justify-between h-32 py-6 flex-shrink-0">
            <h1 id="project-title" className="serif-header">ByHeart</h1>
            <div id="project-tagline-1" className="uppercase flex flex-row items-center gap-2">Meet the Mother of All Formulas <span className="font-mono text-xs">12</span></div>
            <div id="project-information-below" className="font-mono uppercase text-xs">Project Information Below</div>
          </div>        
          <div id="project-tagline-2" className="uppercase flex flex-row items-center gap-2">Meet the Mother of All Formulas <span className="font-mono text-xs">12</span></div>
          <p className="big-paragraph font-serif w-2/3">Branding, illustration, art direction and website for the 2016 launch of Billie — the first progressive body care company of its kind lorem ipsum etc.</p>
          <div className="h-96">RESULTS: The brand is now available in over 30,000 US stores, nation-wide.</div>
        </div>
      </div>
      <div className="md:hidden bg-red min-h-screen flex flex-col text-white px-4 gap-8 pb-16">
        <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
        <h1 id="project-title" className="serif-header">ByHeart</h1>
        <div id="project-tagline-1" className="uppercase flex flex-row items-center gap-2">Meet the Mother of All Formulas <span className="font-mono text-xs">12</span></div>
        <p className="big-paragraph font-serif">Branding, illustration, art direction and website for the 2016 launch of Billie — the first progressive body care company of its kind lorem ipsum etc.</p>
        <p>RESULTS: The brand is now available in over 30,000 US stores, nation-wide.</p>
        <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
        <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
        <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
        <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
      </div>
    </>
  )

}