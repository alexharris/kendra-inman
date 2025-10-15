export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this homepage document',
      initialValue: 'Homepage',
      hidden: true,
    },
    {
      title: 'Content', 
      name: 'content',
      type: 'array', 
      of: [{type: 'block'}]
    },

    {
      name: 'heroSlideshow',
      title: 'Hero Slideshow',
      type: 'object',
      fields: [
        {
          name: 'media',
          title: 'Media',
          type: 'array',
          of: [
            {
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Alternative text for screen readers and SEO'
                },
                {
                  name: 'caption',
                  title: 'Caption',
                  type: 'string',
                  description: 'Optional caption for the image'
                }
              ]
            },
            {
              type: 'file',
              name: 'video',
              title: 'Video',
              options: {
                accept: 'video/*'
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Alternative text for screen readers and accessibility'
                },
                {
                  name: 'caption',
                  title: 'Caption',
                  type: 'string',
                  description: 'Optional caption for the video'
                }
              ]
            }
          ],
          options: {
            layout: 'grid'
          }
        }
      ],
      preview: {
        select: {
          mediaCount: 'media'
        },
        prepare(selection) {
          const {mediaCount} = selection
          const count = mediaCount ? mediaCount.length : 0
          return {
            title: 'Hero Slideshow',
            subtitle: `${count} media item${count !== 1 ? 's' : ''}`
          }
        }
      }
    },

    {
      name: 'sections',
      title: 'Homepage Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'homepageSection',
          title: 'Homepage Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'Title for this homepage section'
            },
            {
              name: 'categoryReference',
              title: 'Category Reference',
              type: 'reference',
              to: [{type: 'siteCategories'}],
              description: 'Choose a category for this section'
            },
            {
              name: 'media',
              title: 'Media',
              type: 'array',
              of: [
                {
                  type: 'image',
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      description: 'Alternative text for screen readers and SEO'
                    },
                    {
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                      description: 'Optional caption for the image'
                    }
                  ]
                },
                {
                  type: 'file',
                  name: 'video',
                  title: 'Video',
                  options: {
                    accept: 'video/*'
                  },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      description: 'Alternative text for screen readers and accessibility'
                    },
                    {
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                      description: 'Optional caption for the video'
                    }
                  ]
                }
              ],
              options: {
                layout: 'grid'
              }
            }
          ],
          preview: {
            select: {
              title: 'title',
              categoryName: 'categoryReference.name',
              mediaCount: 'media'
            },
            prepare(selection) {
              const {title, categoryName, mediaCount} = selection
              const count = mediaCount ? mediaCount.length : 0
              return {
                title: title || 'Untitled Section',
                subtitle: `${categoryName ? `Category: ${categoryName} • ` : ''}${count} media item${count !== 1 ? 's' : ''}`
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
