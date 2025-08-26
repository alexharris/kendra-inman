import project from './project'
import siteSettings from './siteSettings/siteSettings'
import siteColors from './siteSettings/siteColors'
import siteCategories from './siteSettings/siteCategories'
import homepage from './homepage'

export const schema = {
  types: [project, siteSettings, siteColors, siteCategories, homepage],
}