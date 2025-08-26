import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source) => {
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
