'use client';

import { useEffect, useState } from 'react';
import Slideshow from '../../../components/Slideshow';
import { urlFor, getAssetUrl } from '../../../../sanity/lib/image';

export default function ProjectContent({ project }) {
  const [isBackgroundReady, setIsBackgroundReady] = useState(false);

  // Helper function to get gallery images (filter out videos for now)
  const getGalleryImages = () => {
    if (!project.gallery) return [];
    return project.gallery.filter(item => item._type === 'image');
  };

  // Helper function to get gallery videos
  const getGalleryVideos = () => {
    if (!project.gallery) return [];
    return project.gallery.filter(item => item._type === 'file' && item.asset);
  };

  const galleryImages = getGalleryImages();
  const galleryVideos = getGalleryVideos();
  const allGalleryItems = project.gallery || [];

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
        {allGalleryItems.length > 0 ? (
          allGalleryItems[0]._type === 'image' ? (
            <img 
              src={urlFor(allGalleryItems[0]).auto('format').url()} 
              alt="Project featured image" 
            />
          ) : allGalleryItems[0]._type === 'file' && allGalleryItems[0].asset ? (
            <video 
              controls
              preload="metadata"
              src={`${allGalleryItems[0].asset.url}#t=0.1`}
            >
              <source src={allGalleryItems[0].asset.url} type={allGalleryItems[0].asset.mimeType} />
              Your browser does not support the video tag.
            </video>
          ) : null
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
        {allGalleryItems.slice(1).map((item, index) => {
          if (item._type === 'image') {
            return (
              <img 
                key={index}
                src={urlFor(item).auto('format').url()} 
                alt={`Gallery image ${index + 2}`} 
              />
            );
          } else if (item._type === 'file' && item.asset) {
            return (
              <video 
                key={index}
                controls
                preload="metadata"
                src={`${item.asset.url}#t=0.1`}
              >
                <source src={item.asset.url} type={item.asset.mimeType} />
                Your browser does not support the video tag.
              </video>
            );
          }
          return null;
        })}
        {allGalleryItems.length === 0 && (
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
