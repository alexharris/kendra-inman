// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
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
            ]),          
        ),
      ...S.documentTypeListItems().filter(listItem => !['siteSettings', 'siteColors', 'siteCategories'].includes(listItem.getId()))
    ])
