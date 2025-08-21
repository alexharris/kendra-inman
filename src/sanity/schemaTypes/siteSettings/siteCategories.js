export default {
  name: 'siteCategories',
  title: 'Categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'header',
      title: 'Header Text',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },    
    {
      name: 'color',
      title: 'Color',
      type: 'reference',
      to: [{ type: 'siteColors' }],
    }      
  ],
}
