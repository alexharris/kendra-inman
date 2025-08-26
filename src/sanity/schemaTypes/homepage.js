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
      name: 'images',
      title: 'Homepage Images',
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
        }
      ],
      options: {
        layout: 'grid'
      }
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
