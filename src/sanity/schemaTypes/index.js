import project from './project'
import siteSettings from './siteSettings/siteSettings'
import siteColors from './siteSettings/siteColors'
import siteCategories from './siteSettings/siteCategories'
import siteExpertise from './siteSettings/siteExpertise'  
import homepage from './homepage'
import about from './about'

export const schema = {
  types: [project, siteSettings, siteColors, siteCategories, siteExpertise, homepage, about],
}