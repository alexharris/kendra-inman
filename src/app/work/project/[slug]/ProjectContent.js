'use client';

import { useEffect, useState } from 'react';
import Slideshow from '../../../components/Slideshow';
import MobileProjectGallery from '../../../components/MobileProjectGallery';
import RelatedProjects from '../../../components/RelatedProjects';
import Expertise from '../../../components/Expertise';
import ParenthesesText from '../../../components/ParenthesesText';
import FullscreenVideoPlayer from '../../../components/FullscreenVideoPlayer';
import { urlFor, getAssetUrl } from '../../../../sanity/lib/image';
import { setPageColorsFromProject, resetPageColors } from '../../../../utils/pageColors';

export default function ProjectContent({ project }) {
  const [taglineOpacity, setTaglineOpacity] = useState(1);
  const [tagline2Opacity, setTagline2Opacity] = useState(0);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);

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
        <div id="project-slideshow" className="hidden lg:block w-full">
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
            ) : project.gallery[0]._type === 'bigVideo' && (project.gallery[0].video || project.gallery[0].vimeoUrl) && project.gallery[0].thumbnail ? (
              <div
                className="relative cursor-pointer"
                onClick={() => setFullscreenVideo({ url: project.gallery[0].video?.asset?.url, vimeoUrl: project.gallery[0].vimeoUrl, alt: project.gallery[0].alt })}
              >
                {project.gallery[0].thumbnail._type === 'file' ? (
                  <video
                    src={project.gallery[0].thumbnail.asset.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <img
                    src={urlFor(project.gallery[0].thumbnail).url()}
                    alt={project.gallery[0].alt || 'Project image'}
                    className="w-full h-auto object-contain"
                  />
                )}
                <div className="absolute bottom-4 right-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#000', width: '89px', height: '25px', opacity: 0.85 }}>
                  <span style={{ color: '#EFEADB', fontFamily: "'futura-pt', Futura, sans-serif", fontWeight: 500, fontSize: '11px', lineHeight: 1, letterSpacing: 0, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Full Video</span>
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3106 5.2812L1.44716 0.128989C1.14636 -0.045257 0.778726 -0.0418409 0.481273 0.132405C0.183819 0.306651 0 0.634643 0 0.986552V11.9846C0 12.3467 0.193846 12.6815 0.504668 12.8524C0.648381 12.9344 0.808805 12.9719 0.969229 12.9719C1.15305 12.9719 1.33353 12.9173 1.49395 12.8148L10.3574 6.96558C10.6415 6.77767 10.8086 6.45309 10.7985 6.1046C10.7885 5.75953 10.6047 5.44178 10.3106 5.27437V5.2812Z" fill="#EFEADB"/>
                  </svg>
                </div>
              </div>
            ) : null
          ) : (
            <div className="w-full h-64 flex items-center justify-center">
              <img src="/images/project-dummy.jpg" alt="Project placeholder" className="max-w-full max-h-full object-contain" />
            </div>
          )}
        </div>
        <div className="z-20" style={{ backgroundColor: project.color?.hex || '#1f1d1d' }}>
          <div id="project-intro" className="z-20 flex flex-col lg:flex-row lg:items-center justify-between pt-8 pb-0 lg:pb-2 flex-shrink-0">
            <h1 id="project-title" className="serif-header">{project.title}</h1>
            <div 
              id="project-tagline-1" 
              className="uppercase hidden lg:flex flex-row items-center gap-2 transition-opacity duration-300"
              style={{ opacity: taglineOpacity }}
            >
              {project.tagline} <span className="mono-tag">{galleryCount}</span>
            </div>
            <div id="project-information-below" className="hidden lg:block transition-opacity duration-300" style={{ opacity: taglineOpacity }}>
              <ParenthesesText>scroll down for case study</ParenthesesText>
            </div>
          </div>
          <div id="bottomText" className="transition-opacity duration-300" style={{ opacity: tagline2Opacity }}>
            <div className="flex flex-col lg:flex-row gap-4 mt-0 lg:mt-3 justify-between ">
              <div className="w-full lg:w-2/3 flex flex-col gap-6 lg:gap-8">
                <div
                  id="project-tagline-2"
                  className="uppercase hidden lg:flex flex-row items-center gap-2"
                >
                  {project.tagline} <span className="mono-tag">{galleryCount}</span>
                </div>
                <div className="uppercase lg:hidden flex flex-row items-center gap-2">
                  {project.tagline} <span className="mono-tag">{galleryCount}</span>
                </div>
                {/* gallery[1] + gallery[2] — mobile only, just above description */}
                <div className="lg:hidden flex flex-col gap-4">
                  {allGalleryItems.slice(1, 3).map((item, index) => (
                    <div key={index} className="overflow-hidden">
                      {item._type === 'image' ? (
                        <img
                          src={urlFor(item).url()}
                          alt={item.alt || `Gallery image ${index + 2}`}
                          className="w-full h-auto object-cover"
                        />
                      ) : item._type === 'file' && item.asset ? (
                        <video
                          src={item.asset.url}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-auto object-cover"
                        />
                      ) : item._type === 'bigVideo' && (item.video || item.vimeoUrl) && item.thumbnail ? (
                        <div
                          className="relative cursor-pointer"
                          onClick={() => setFullscreenVideo({ url: item.video?.asset?.url, vimeoUrl: item.vimeoUrl, alt: item.alt })}
                        >
                          {item.thumbnail._type === 'file' ? (
                            <video
                              src={item.thumbnail.asset.url}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="w-full h-auto object-cover"
                            />
                          ) : (
                            <img
                              src={urlFor(item.thumbnail).url()}
                              alt={item.alt || `Gallery image ${index + 2}`}
                              className="w-full h-auto object-cover"
                            />
                          )}
                          <div className="absolute bottom-4 right-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#000', width: '89px', height: '25px', opacity: 0.85 }}>
                            <span style={{ color: '#EFEADB', fontFamily: "'futura-pt', Futura, sans-serif", fontWeight: 500, fontSize: '11px', lineHeight: 1, letterSpacing: 0, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Full Video</span>
                            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.3106 5.2812L1.44716 0.128989C1.14636 -0.045257 0.778726 -0.0418409 0.481273 0.132405C0.183819 0.306651 0 0.634643 0 0.986552V11.9846C0 12.3467 0.193846 12.6815 0.504668 12.8524C0.648381 12.9344 0.808805 12.9719 0.969229 12.9719C1.15305 12.9719 1.33353 12.9173 1.49395 12.8148L10.3574 6.96558C10.6415 6.77767 10.8086 6.45309 10.7985 6.1046C10.7885 5.75953 10.6047 5.44178 10.3106 5.27437V5.2812Z" fill="#EFEADB"/>
                            </svg>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="big-paragraph font-serif max-w-[1200px]">
                  {project.description && (
                    <div>
                      {/* This would need proper rich text rendering for the description array */}
                      {project.description.map((block, index) => {
                        if (block._type === 'block') {
                          return (
                            <p key={index} className="">
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
              <div className="hidden lg:block lg:w-1/4 lg:mt-16">
                <Expertise expertise={project.expertise} />
              </div>   
            </div>  
            <div className="hidden lg:block">
              {/* Related Projects Section */}
              {project.relatedProjects && project.relatedProjects.length > 0 && (
                <RelatedProjects 
                  relatedProjects={project.relatedProjects} 
                />
              )}  
            </div>                 
          </div>
          <MobileProjectGallery gallery={allGalleryItems.slice(3)} />
          <div className="lg:hidden mb-8">
            <Expertise expertise={project.expertise} />
          </div>
          <div className="lg:hidden">
            {/* Related Projects Section */}
            {project.relatedProjects && project.relatedProjects.length > 0 && (
              <RelatedProjects
                relatedProjects={project.relatedProjects}
              />
            )}
          </div>                  
        </div>
      </div>

      {fullscreenVideo && (
        <FullscreenVideoPlayer
          videoUrl={fullscreenVideo.url}
          vimeoUrl={fullscreenVideo.vimeoUrl}
          alt={fullscreenVideo.alt}
          onClose={() => setFullscreenVideo(null)}
        />
      )}

    </div>
  );
}
