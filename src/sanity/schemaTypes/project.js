export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
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
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      ],
    },
    {
      name: 'expertise',
      title: 'Expertise Used',
      type: 'array',
      of: [{ type: 'string' }],
    }
    ,
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'featuredImage',
    },
  },
}