'use client';

import { useEffect, useState } from 'react';
import Slideshow from '../../../components/Slideshow';
import MobileProjectGallery from '../../../components/MobileProjectGallery';
import RelatedProjects from '../../../components/RelatedProjects';
import Expertise from '../../../components/Expertise';
import { urlFor, getAssetUrl } from '../../../../sanity/lib/image';
import { setPageColorsFromProject, resetPageColors } from '../../../../utils/pageColors';

export default function ProjectContent({ project }) {
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
  
  // Format gallery count with leading zero for single digits
  const galleryCount = project.gallery?.length 
    ? project.gallery.length < 10 
      ? `0${project.gallery.length}` 
      : project.gallery.length.toString()
    : '00';


  // Set the background color from the project page
  useEffect(() => {
    setPageColorsFromProject(project);

    // Cleanup: reset colors when component unmounts
    return () => {
      resetPageColors();
    };
  }, [project]);


  

  // Handle scroll effect for tagline fade
  useEffect(() => {
    const handleScroll = () => {
      // Only apply opacity effects above lg breakpoint (1024px)
      if (window.innerWidth < 1024) {
        setTaglineOpacity(1);
        setTagline2Opacity(1);
        return;
      }

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

    // Handle resize to reset opacity when crossing the lg breakpoint
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setTaglineOpacity(1);
        setTagline2Opacity(1);
      } else {
        handleScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initialize on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div>
      <div className="project-container flex flex-col px-4">
        <div id="project-slideshow" className="hidden lg:block w-full z-10">
          {allGalleryItems.length > 0 ? (
            <Slideshow gallery={project.gallery} />
          ) : (
            <div className="w-full h-96 flex items-center justify-center">
              <img src="/images/project-dummy.jpg" alt="Project placeholder" className="max-w-full max-h-full object-contain" />
            </div>
          )}
        </div>
        <div className="lg:hidden">
          {project.gallery && project.gallery.length > 0 ? (
            project.gallery[0]._type === 'image' ? (
              <img
                src={urlFor(project.gallery[0]).url()}
                alt={project.gallery[0].alt || 'Project image'}
                className="w-full h-auto object-contain"
              />
            ) : project.gallery[0]._type === 'file' && project.gallery[0].asset ? (
              <video
                src={project.gallery[0].asset.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-contain"
              />
            ) : null
          ) : (
            <div className="w-full h-64 flex items-center justify-center">
              <img src="/images/project-dummy.jpg" alt="Project placeholder" className="max-w-full max-h-full object-contain" />
            </div>
          )}
        </div>
        <div className="z-20" style={{ backgroundColor: project.color?.hex || '#1f1d1d' }}>
          <div id="project-intro" className="z-20 flex flex-col lg:flex-row lg:items-center justify-between pt-2 pb-2 flex-shrink-0">
            <h1 id="project-title" className="serif-header">{project.title}</h1>
            <div 
              id="project-tagline-1" 
              className="uppercase hidden lg:flex flex-row items-center gap-2 transition-opacity duration-300"
              style={{ opacity: taglineOpacity }}
            >
              {project.tagline} <span className="mono-tag">{galleryCount}</span>
            </div>
            <div id="project-information-below" className="hidden lg:block font-mono uppercase text-xs transition-opacity duration-300" style={{ opacity: taglineOpacity }}>scroll for project information</div>
          </div>    
          <div id="bottomText" className="flex flex-col lg:flex-row gap-4 justify-between transition-opacity duration-300" style={{ opacity: tagline2Opacity }}>
            <div className="w-full lg:w-2/3 flex flex-col gap-3 lg:gap-6">
              <div 
                id="project-tagline-2" 
                className="uppercase hidden lg:flex flex-row items-center gap-2"
              >
                {project.tagline} <span className="mono-tag">{galleryCount}</span>
              </div>
              <div className="uppercase lg:hidden flex flex-row items-center gap-2">
                {project.tagline} <span className="mono-tag">{galleryCount}</span>
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

            <div className="lg:w-1/4">  
              <Expertise expertise={project.expertise} />
            </div>            
          </div>
          <MobileProjectGallery gallery={project.gallery} />         
        </div>
      </div>

      {/* Related Projects Section */}
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <RelatedProjects 
          relatedProjects={project.relatedProjects} 
        />
      )}

    </div>
  );
}
