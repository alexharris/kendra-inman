// https://www.sanity.io/docs/structure-builder-cheat-sheet
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {DocumentIcon} from '@sanity/icons'

export const structure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            // Sets a title for our new list
            .title('Settings Documents')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title('Global Settings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Site Colors')
                .child(S.documentTypeList('siteColors').title('Colors').filter('_type == "siteColors"')),
              S.listItem()
                .title('Site Categories')
                .child(S.documentTypeList('siteCategories').title('Categories').filter('_type == "siteCategories"')),
              S.listItem()
                .title('Site Expertise')
                .child(S.documentTypeList('siteExpertise').title('Expertise').filter('_type == "siteExpertise"')),
            ]),          
        ),
      S.listItem()
        .title('Homepage')
        .icon(DocumentIcon)
        .child(
          S.document().schemaType('homepage').documentId('homepage')
        ),
      S.listItem()
        .title('About')
        .icon(DocumentIcon)
        .child(
          S.document().schemaType('about').documentId('about')
        ),
      // Add orderable project list
      orderableDocumentListDeskItem({
        type: 'project',
        S,
        context,
        title: 'Projects',
      }),
      ...S.documentTypeListItems().filter(listItem => !['siteSettings', 'siteColors', 'siteCategories', 'siteExpertise', 'homepage', 'about', 'project'].includes(listItem.getId()))
    ])
