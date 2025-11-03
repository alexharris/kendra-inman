import '../Work.scss';
import HeaderWithTag from '../../components/HeaderWithTag';
import { PortableText } from '@portabletext/react';
import { getAllProjects, getProjectsByCategory, getCategoryBySlug } from '../../../utils/sanity-queries';
import { urlFor } from '../../../sanity/lib/image';
import CategoryColorManager from '../components/CategoryColorManager';

export default async function Page({ params }) {
  const slug = params?.slug?.[0]; // Get the first slug segment
  // console.log('Slug:', slug);
  let projects;
  let title;
  let categoryInfo = null;
  let isCategory = false;

  if (slug) {
    // This is a category page
    projects = await getProjectsByCategory(slug);
    categoryInfo = await getCategoryBySlug(slug);
    title = categoryInfo ? `${categoryInfo.header}` : `${slug.charAt(0).toUpperCase() + slug.slice(1)} Work`;
    isCategory = true;
  } else {
    // This is the main work page - show all projects
    projects = await getAllProjects();
    title = "Work that works";
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CategoryColorManager categoryInfo={categoryInfo} isCategory={isCategory} />
      <div className={`my-24 text-center serif-header px-8`}>
        <HeaderWithTag
          title={title}
          tag={projects.length.toString()}
          size=""
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {projects.length > 0 ? (
          projects.map((project) => {

            // Use featured image/video if available, otherwise use first gallery image
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
            } else if (project.gallery) {
              // Use first gallery item as fallback
              if (project.gallery._type === 'file' && project.gallery.asset?.mimeType?.startsWith('video/')) {
                backgroundVideoUrl = project.gallery.asset.url;
                isVideo = true;
              } else if (project.gallery._type === 'image' && project.gallery.asset) {
                backgroundImageUrl = urlFor(project.gallery).width(720).height(400).url();
              }
            }



            return (
              <a
                href={`/work/project/${project.slug.current}`}
                key={project._id}
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
                    <div className="gridBlurb text-sm text-black mb-2 px-2">
                      <PortableText value={project.workBlurb} />
                    </div>
                  )}
                </div>
              </a>
            );
          })
        ) : (
          // Fallback grid items when no projects are available
          Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className="bg-gray-200 h-64 text-black flex flex-col justify-center items-center"
            >
              Grid item {index + 1}
            </div>
          ))
        )}
      </div>
    </div>
  );
}