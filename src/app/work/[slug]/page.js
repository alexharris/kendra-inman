export default function Page() {
  return (
    <div className="bg-red flex flex-col text-white px-4">
      <div className="h-screen flex flex-col">
        <div className="w-full h-screen bg-gray-200"></div>
        <div className="flex flex-row items-center justify-between h-32 py-6">
          <h1 id="project-title" className="serif-header">ByHeart</h1>
          <div id="project-tagline-1" className="uppercase flex flex-row items-center gap-2">Meet the Mother of All Formulas <span className="font-mono text-xs">12</span></div>
          <div id="project-information-below" className="font-mono uppercase text-xs">Project Information Below</div>
        </div>
      </div>

      <div> 
        <div id="project-tagline-2" className="uppercase flex flex-row items-center gap-2">Meet the Mother of All Formulas <span className="font-mono text-xs">12</span></div>
        <p className="big-paragraph">Branding, illustration, art direction and website for the 2016 launch of Billie — the first progressive body care company of its kind lorem ipsum etc.</p>
      </div>

    </div>
  )

}