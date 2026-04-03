import { PlayIcon } from '@sanity/icons'

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
          icon: PlayIcon,
          fields: [
            {
              name: 'blockTitle',
              title: 'Title',
              type: 'string',
              description: 'Label for this block in the Studio (not shown on site)'
            },
            {
              name: 'thumbnail',
              title: 'Thumbnail (Image or Video)',
              type: 'array',
              of: [
                {
                  type: 'image',
                  title: 'Image'
                },
                {
                  type: 'file',
                  title: 'Video',
                  options: {
                    accept: 'video/*'
                  }
                }
              ],
              validation: Rule => Rule.required().max(1),
              description: 'Image or video shown in gallery slideshow'
            },
            {
              name: 'vimeoUrl',
              title: 'Fullscreen Video (Vimeo URL)',
              type: 'url',
              description: 'Paste a Vimeo URL (e.g. https://vimeo.com/123456789). If provided, this takes priority over the uploaded video.',
              validation: Rule => Rule.uri({ scheme: ['https', 'http'] })
            },
            {
              name: 'video',
              title: 'Fullscreen Video (Upload)',
              type: 'file',
              options: {
                accept: 'video/*'
              },
              description: 'Video file that plays fullscreen when thumbnail is clicked'
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
              title: 'blockTitle',
              subtitle: 'caption',
              media: 'thumbnail.0'
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