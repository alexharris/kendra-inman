'use client';

import { useEffect, useState } from 'react';
import Slideshow from '../../../components/Slideshow';
import { urlFor, getAssetUrl } from '../../../../sanity/lib/image';

export default function ProjectContent({ project }) {
  const [isBackgroundReady, setIsBackgroundReady] = useState(false);
  const [taglineOpacity, setTaglineOpacity] = useState(1);
  const [tagline2Opacity, setTagline2Opacity] = useState(0);

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

  // Handle scroll effect for tagline fade
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStartPoint = 0; // Start fading after 0px of scroll
      const fadeEndPoint = 30; // Completely fade by 30px of scroll

      if (scrollY <= fadeStartPoint) {
        setTaglineOpacity(1);
        setTagline2Opacity(0);
      } else if (scrollY >= fadeEndPoint) {
        setTaglineOpacity(0);
        setTagline2Opacity(1);
      } else {
        // Calculate opacity between fade points
        const fadeProgress = (scrollY - fadeStartPoint) / (fadeEndPoint - fadeStartPoint);
        setTaglineOpacity(1 - fadeProgress);
        setTagline2Opacity(fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      <div className="project-container flex flex-col px-4">
        <div id="project-slideshow" className="hidden md:block w-full z-10">
          {allGalleryItems.length > 0 ? (
            <Slideshow gallery={project.gallery} />
          ) : (
            <div className="w-full h-96 flex items-center justify-center">
              <img src="/images/project-dummy.jpg" alt="Project placeholder" className="max-w-full max-h-full object-contain" />
            </div>
          )}
        </div>
        <div className="md:hidden">
          {project.gallery && project.gallery.length > 0 ? (
            project.gallery[0]._type === 'image' ? (
              <img
                src={urlFor(project.gallery[0]).url()}
                alt={project.gallery[0].alt || 'Project image'}
                className="w-full h-auto object-contain"
              />
            ) : project.gallery[0]._type === 'file' && project.gallery[0].asset ? (
              <video
                src={getAssetUrl(project.gallery[0].asset)}
                controls
                className="w-full h-auto object-contain"
              />
            ) : null
          ) : (
            <div className="w-full h-64 flex items-center justify-center">
              <img src="/images/project-dummy.jpg" alt="Project placeholder" className="max-w-full max-h-full object-contain" />
            </div>
          )}

        </div>
        <div className={` pb-16 z-20 md:px-4`} style={{ backgroundColor: project.color?.hex || '#fff' }}>
          <div id="project-intro" className="z-20 flex flex-col md:flex-row md:items-center justify-between md:h-36 py-6 flex-shrink-0">
            <h1 id="project-title" className="serif-header">{project.title}</h1>
            <div 
              id="project-tagline-1" 
              className="uppercase hidden md:flex flex-row items-center gap-2 transition-opacity duration-300"
              style={{ opacity: taglineOpacity }}
            >
              {project.tagline} 
            </div>
            <div id="project-information-below" className="hidden md:block font-mono uppercase text-xs transition-opacity duration-300" style={{ opacity: taglineOpacity }}>Project Information Below</div>
          </div>    
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="w-full md:w-2/3 flex flex-col gap-6 md:gap-10">
              <div 
                id="project-tagline-2" 
                className="uppercase hidden md:flex flex-row items-center gap-2 transition-opacity duration-300"
                style={{ opacity: tagline2Opacity }}
              >
                {project.tagline} 
              </div>
              <div className="uppercase md:hidden flex flex-row items-center gap-2">
                {project.tagline} 
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
              {project.projectResults && (
      
                  
                  <div>
                    <h3 className="sr-only">( Project Results )</h3>
                    {project.projectResults.map((block, index) => {
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

    </div>
  );
}
