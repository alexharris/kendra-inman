export default {
  name: 'siteExpertise',
  title: 'Expertise',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }
  ],
};
