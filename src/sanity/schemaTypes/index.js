import project from './project'
import siteColors from './siteSettings/siteColors'
import siteCategories from './siteSettings/siteCategories'
import siteExpertise from './siteSettings/siteExpertise'
import global from './siteSettings/global'
import homepage from './homepage'
import about from './about'

export const schema = {
  types: [project, siteColors, siteCategories, siteExpertise, global, homepage, about],
}