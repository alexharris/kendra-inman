'use client';

import { useEffect, useState } from 'react';
import Slideshow from '../../../components/Slideshow';
import { urlFor } from '../../../../sanity/lib/image';

export default function ProjectContent({ project }) {
  const [isBackgroundReady, setIsBackgroundReady] = useState(false);

  // Helper function to get gallery images (filter out videos for now)
  const getGalleryImages = () => {
    if (!project.gallery) return [];
    return project.gallery.filter(item => item._type === 'image');
  };

  const galleryImages = getGalleryImages();

  useEffect(() => {
    // Store the original body background color
    const originalBodyBg = document.body.style.backgroundColor;
    
    // Apply the project color to the body
    if (project.color?.hex) {
      document.body.style.backgroundColor = project.color.hex;
    }

    if (project.color?.name == 'Black') {
      document.body.classList.add('text-beige');
      document.body.classList.remove('text-black');
    } else {
      document.body.classList.remove('text-beige');
      document.body.classList.add('text-black');
    }

    // Mark background as ready after applying the color
    setIsBackgroundReady(true);

    // Cleanup function to restore original background when component unmounts
    return () => {
      document.body.style.backgroundColor = originalBodyBg;
    };
  }, [project.color?.hex]);

  // Don't render content until background is ready
  if (!isBackgroundReady) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-100 border-t-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Desktop */}
      <div className="project-container hidden md:flex flex-col px-4">
        <div id="project-slideshow" className="w-full z-10">
          <Slideshow gallery={project.gallery} />
        </div>
        <div className={` pb-16 z-20 px-4`} style={{ backgroundColor: project.color?.hex || '#fff' }}>
          <div id="project-intro" className="z-20 flex flex-row items-center justify-between h-36 py-6 flex-shrink-0">
            <h1 id="project-title" className="serif-header">{project.title}</h1>
            <div id="project-tagline-1" className="uppercase flex flex-row items-center gap-2">
              {project.tagline} 
              {project.expertise && <span className="font-mono text-xs">{project.expertise.length}</span>}
            </div>
            <div id="project-information-below" className="font-mono uppercase text-xs">Project Information Below</div>
          </div>    
          <div className="flex flex-row gap-4 justify-between">
            <div className="w-2/3 flex flex-col gap-10">
              <div id="project-tagline-2" className="uppercase flex flex-row items-center gap-2">
                {project.tagline} 
                {project.expertise && <span className="font-mono text-xs">{project.expertise.length}</span>}
              </div>
              <div className="big-paragraph font-serif ">
                {project.description && (
                  <div>
                    {/* This would need proper rich text rendering for the description array */}
                    {project.description.map((block, index) => {
                      if (block._type === 'block') {
                        return (
                          <p key={index} className="mb-4">
                            {block.children?.map(child => child.text).join('')}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="w-1/4">  
              {project.expertise && (
                <div>
                  <h3 className="font-mono uppercase text-xs mb-4">( Expertise )</h3>
                  <ul className="flex flex-col gap-2 uppercase">
                    {project.expertise.map((exp, index) => (
                      <li key={index} className="">
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>            
          </div>         
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden min-h-screen flex flex-col px-4 gap-8 pb-16">
        {galleryImages.length > 0 ? (
          <img 
            src={urlFor(galleryImages[0]).auto('format').url()} 
            alt="Project featured image" 
          />
        ) : (
          <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
        )}
        <h1 id="project-title" className="serif-header">{project.title}</h1>
        <div id="project-tagline-1" className="uppercase flex flex-row items-center gap-2">
          {project.tagline} 
          {project.expertise && <span className="font-mono text-xs">{project.expertise.length}</span>}
        </div>
        <div className="big-paragraph font-serif">
          {project.description && (
            <div>
              {project.description.map((block, index) => {
                if (block._type === 'block') {
                  return (
                    <p key={index} className="mb-4">
                      {block.children?.map(child => child.text).join('')}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
            {project.expertise && (
              <div>
                <h3 className="font-mono uppercase text-xs mb-4">( Expertise )</h3>
                <ul className="flex flex-col gap-2 uppercase">
                  {project.expertise.map((exp, index) => (
                    <li key={index} className="">
                      {exp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        {galleryImages.slice(1).map((image, index) => (
          <img 
            key={index}
            src={urlFor(image).auto('format').url()} 
            alt={`Gallery image ${index + 2}`} 
          />
        ))}
        {galleryImages.length === 0 && (
          <>
            <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
            <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
            <img src="/images/project-dummy.jpg" alt="Project Slideshow" />
          </>
        )}
      </div>
    </div>
  );
}
