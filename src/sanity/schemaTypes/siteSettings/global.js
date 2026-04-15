export default {
  name: 'global',
  title: 'Global Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this settings document',
      initialValue: 'Global Settings',
      hidden: true,
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Contact email address',
      validation: Rule => Rule.email().error('Please enter a valid email address'),
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Full LinkedIn profile URL',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      }),
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      description: 'Full Instagram profile URL',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      }),
    },
    {
      name: 'pinterest',
      title: 'Pinterest URL',
      type: 'url',
      description: 'Full Pinterest profile URL',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      }),
    },
    {
      name: 'showWorkButton',
      title: 'Show "See The Work" Button',
      type: 'boolean',
      description: 'Toggle the "See The Work" button on the homepage hero section',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
