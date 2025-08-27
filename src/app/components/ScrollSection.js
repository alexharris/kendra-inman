import Image from 'next/image';

export default function ScrollSection({ index, sectionRefs, section, children, className = "" }) {
  const renderMedia = () => {
    if (!section?.media?.length) {
      return (
        <div className="section-image w-3/5 h-2/5 bg-gray-200 absolute top-24 right-24 z-20">
          {section?.title && (
            <div className="p-4 text-black">
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
          )}
        </div>
      );
    }

    return section.media.map((mediaItem, mediaIndex) => {
      if (mediaItem._type === 'image' && mediaItem.asset?.url) {
        return (
          <div key={mediaIndex} className="section-image w-3/5 h-2/5 absolute top-24 right-24 z-20 overflow-hidden">
            <Image
              src={mediaItem.asset.url}
              alt={mediaItem.alt || `Section ${index + 1} image ${mediaIndex + 1}`}
              fill
              className="object-cover"
            />
          </div>
        );
      } else if (mediaItem._type === 'file' && mediaItem.asset?.url && mediaItem.asset?.mimeType?.startsWith('video/')) {
        return (
          <div key={mediaIndex} className="section-image w-3/5 h-2/5 absolute top-24 right-24 z-20 overflow-hidden">
            <video
              src={mediaItem.asset.url}
              controls
              className="w-full h-full object-cover"
              aria-label={mediaItem.alt || `Section ${index + 1} video ${mediaIndex + 1}`}
            />
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div 
      ref={el => sectionRefs.current[index] = el}
      className={`h-screen w-full relative ${className}`}
    >
      {children || renderMedia()}
    </div>
  );
}
