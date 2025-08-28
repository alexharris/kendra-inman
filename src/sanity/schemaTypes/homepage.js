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
          title: 'title',
          colorTitle: 'colorReference.title',
          mediaCount: 'media'
        },
        prepare(selection) {
          const {title, colorTitle, mediaCount} = selection
          const count = mediaCount ? mediaCount.length : 0
          return {
            title: title || 'Hero Slideshow',
            subtitle: `${colorTitle ? `Color: ${colorTitle} • ` : ''}${count} media item${count !== 1 ? 's' : ''}`
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
              name: 'colorReference',
              title: 'Color Reference',
              type: 'reference',
              to: [{type: 'siteColors'}],
              description: 'Choose a color theme for this section'
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
              colorTitle: 'colorReference.title',
              mediaCount: 'media'
            },
            prepare(selection) {
              const {title, colorTitle, mediaCount} = selection
              const count = mediaCount ? mediaCount.length : 0
              return {
                title: title || 'Untitled Section',
                subtitle: `${colorTitle ? `Color: ${colorTitle} • ` : ''}${count} media item${count !== 1 ? 's' : ''}`
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
