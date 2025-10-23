import {DocumentIcon} from '@sanity/icons'

export default {
  name: 'about',
  title: 'About',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this about document',
      initialValue: 'About',
      hidden: true,
    },
    {
      title: 'Content', 
      name: 'content',
      type: 'array', 
      of: [{type: 'block'}]
    },
  ]
}
