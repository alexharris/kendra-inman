// schemas/siteSettings.js
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'emailAddress',
      title: 'Email Address',
      type: 'email'
    },
  ]
}