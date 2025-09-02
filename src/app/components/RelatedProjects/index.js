'use client';

import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../../../sanity/lib/image';
import './RelatedProjects.scss';

export default function RelatedProjects({ relatedProjects, currentProjectColor }) {
  if (!relatedProjects || relatedProjects.length === 0) {
    return null;
  }

  return (
    <section className="related-projects" style={{ backgroundColor: currentProjectColor }}>
      <div className="related-projects__container">
        <h2 className="related-projects__title font-mono uppercase text-xs mb-8">
          ( Related Work )
        </h2>
        
        <div className="related-projects__grid">
          {relatedProjects.slice(0, 3).map((project) => {
            const backgroundImageUrl = project.featuredImage 
              ? urlFor(project.featuredImage).width(400).height(300).fit('crop').url()
              : null;
              
            return (
              <Link 
                key={project._id} 
                href={`/work/project/${project.slug.current}`}
                className="related-projects__item group"
              >
                <div 
                  className="related-projects__image-container"
                  style={{ backgroundColor: project.color?.hex || '#f5f5f5' }}
                >
                  {backgroundImageUrl ? (
                    <div
                      className="related-projects__image"
                      style={{ 
                        backgroundImage: `url(${backgroundImageUrl})`,
                      }}
                    />
                  ) : (
                    <div className="related-projects__placeholder">
                      <img 
                        src="/images/project-dummy.jpg" 
                        alt={project.title}
                        className="related-projects__image"
                      />
                    </div>
                  )}
                  
                  {/* Hover overlay with gradient */}
                  <div className="related-projects__overlay" />
                  
                  {/* Content that appears on hover */}
                  <div className="related-projects__hover-content">
                    {project.workBlurb && (
                      <div className="related-projects__blurb">
                        <PortableText value={project.workBlurb} />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="related-projects__content">
                  <h3 className="related-projects__project-title font-serif">
                    {project.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
