import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source) => {
  if (!source || !source.asset) {
    console.warn('urlFor called with invalid source:', source);
    // Return a builder with a placeholder to prevent crashes
    return {
      auto: () => ({ url: () => '/images/project-dummy.jpg' }),
      url: () => '/images/project-dummy.jpg'
    };
  }
  return builder.image(source)
}

// Helper function to get asset URL for both images and files
export const getAssetUrl = (asset) => {
  if (!asset) return null;
  
  if (asset._type === 'image') {
    return urlFor(asset).auto('format').url();
  } else if (asset._type === 'file' && asset.asset?.url) {
    return asset.asset.url;
  }
  
  return null;
}
