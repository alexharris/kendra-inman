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
    {
      name: 'column1Title',
      title: 'Column 1 Title',
      type: 'string',
      description: 'Title for the first column section'
    },
    {
      name: 'column1Text',
      title: 'Column 1 Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Content for the first column'
    },
    {
      name: 'column2Title',
      title: 'Column 2 Title',
      type: 'string',
      description: 'Title for the second column section'
    },
    {
      name: 'column2Text',
      title: 'Column 2 Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Content for the second column'
    },
    {
      name: 'column3Title',
      title: 'Column 3 Title',
      type: 'string',
      description: 'Title for the third column section'
    },
    {
      name: 'column3Text',
      title: 'Column 3 Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Content for the third column'
    },

  ]
}
