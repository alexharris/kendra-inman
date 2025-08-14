import './Project.scss';

export default function Page() {
  return (
    <div className="project-container bg-red flex flex-col text-white px-4">
      <div id="project-overview" className="flex flex-col">
        <div id="project-slideshow" className="w-full flex-1 bg-gray-200"></div>
        <div id="project-intro" className="bg-red z-20 flex flex-row items-center justify-between h-32 py-6 flex-shrink-0">
          <h1 id="project-title" className="serif-header">ByHeart</h1>
          <div id="project-tagline-1" className="uppercase flex flex-row items-center gap-2">Meet the Mother of All Formulas <span className="font-mono text-xs">12</span></div>
          <div id="project-information-below" className="font-mono uppercase text-xs">Project Information Below</div>
        </div>
      </div>

      <div className="bg-red flex flex-col gap-10 pb-16">
        <div id="project-tagline-2" className="uppercase flex flex-row items-center gap-2">Meet the Mother of All Formulas <span className="font-mono text-xs">12</span></div>
        <p className="big-paragraph font-serif w-2/3">Branding, illustration, art direction and website for the 2016 launch of Billie — the first progressive body care company of its kind lorem ipsum etc.</p>
        <div className="h-96"></div>
      </div>

    </div>
  )

}