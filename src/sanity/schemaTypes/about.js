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
      name: 'bigText',
      title: 'Big Text Section',
      type: 'array',
      of: [{type: 'block'}],
      description: 'The large text that appears at the top of the about page'
    },    
    {
      title: 'Content', 
      name: 'content',
      type: 'array', 
      of: [{type: 'block'}]
    },

  ]
}
