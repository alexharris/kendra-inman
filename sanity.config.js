'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.jsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    // Media plugin for enhanced media browsing and search
    media(),
  ],
  document: {
    // Filter out singleton types from the global "New document" menu
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !['homepage', 'global'].includes(templateItem.templateId)
        )
      }
      return prev
    },
    // Restrict actions for singleton documents
    actions: (prev, {schemaType}) => {
      const singletonTypes = ['homepage', 'global']
      
      if (singletonTypes.includes(schemaType)) {
        // For singletons, only allow publish and discard changes
        return prev.filter(({action}) => 
          ['publish', 'discardChanges'].includes(action)
        )
      }
      
      return prev
    },
  },
})
