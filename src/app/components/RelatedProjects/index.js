'use client';

import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../../../sanity/lib/image';
import './RelatedProjects.scss';
import ParenthesesText from '../ParenthesesText';

export default function RelatedProjects({ relatedProjects, currentProjectColor }) {
  if (!relatedProjects || relatedProjects.length === 0) {
    return null;
  }

  return (
    <section className="related-projects" style={{ backgroundColor: currentProjectColor }}>
      <div className="related-projects__container">
        <h2 className="related-projects__title font-mono mb-8">
          <ParenthesesText>
            Related Work
          </ParenthesesText>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedProjects.slice(0, 3).map((project) => {
            let backgroundImageUrl = null;
            let backgroundVideoUrl = null;
            let isVideo = false;
            
            if (project.featuredImage) {
              // Check if featuredImage is a video
              if (project.featuredImage._type === 'file' && project.featuredImage.asset?.mimeType?.startsWith('video/')) {
                backgroundVideoUrl = project.featuredImage.asset.url;
                isVideo = true;
              } else if (project.featuredImage._type === 'image') {
                // It's an image
                backgroundImageUrl = urlFor(project.featuredImage).width(720).height(400).url();
              }
            }
              
            return (
              <Link 
                key={project._id} 
                href={`/work/project/${project.slug.current}`}
                className="relative aspect-720/400 text-white flex flex-col justify-center items-center p-4 overflow-hidden group"
              >
                {/* Video background */}
                {isVideo && backgroundVideoUrl && (
                  <video
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={backgroundVideoUrl} type="video/mp4" />
                  </video>
                )}

                {/* Image background */}
                {!isVideo && backgroundImageUrl && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300 group-hover:blur-sm"
                    style={{ 
                      backgroundImage: `url(${backgroundImageUrl})`,
                    }}
                  />
                )}
                
                {/* Hover overlay with gradient and blurb */}
                <div className="absolute inset-0 bg-gradient-to-t from-beige via-beige to-beige opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-20" />
                
                {/* Content that appears on hover */}
                <div className="relative z-30 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4">
                  {project.workBlurb && (
                    <div className="text-sm text-black mb-2 px-2">
                      <PortableText value={project.workBlurb} />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
