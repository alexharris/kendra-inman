export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true,
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'workBlurb',
      title: 'Work Grid Blurb',
      type: 'array',
      of: [{ type: 'block' }]
    },    
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'projectResults',
      title: 'Project Results',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'featuredImage',
      title: 'Featured Media (Image or Video)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
      ],
      validation: (Rule) => Rule.max(1),
    },
    {
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
        },
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
        {
          type: 'object',
          name: 'bigVideo',
          title: 'Image with Video',
          fields: [
            {
              name: 'image',
              title: 'Thumbnail Image',
              type: 'image',
              validation: Rule => Rule.required(),
              description: 'Image shown in gallery slideshow'
            },
            {
              name: 'video',
              title: 'Fullscreen Video',
              type: 'file',
              options: {
                accept: 'video/*'
              },
              validation: Rule => Rule.required(),
              description: 'Video that plays fullscreen when image is clicked'
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility'
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption'
            }
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'alt',
              media: 'image'
            }
          }
        }        
      ],
    },
    {
      name: 'expertise',
      title: 'Expertise',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'siteExpertise' }] }],
    },

    {
      name: 'color',
      title: 'Color',
      type: 'reference',
      to: [{ type: 'siteColors' }],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'siteCategories' }],
        },
      ],
    },
    {
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'featuredImage',
    },
  },
}