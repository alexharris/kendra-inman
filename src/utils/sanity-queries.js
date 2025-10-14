import { client } from '../sanity/lib/client';

/**
 * Generic function to fetch data from Sanity
 * @param {string} query - GROQ query string
 * @param {Object} params - Parameters for the query
 * @param {Object} options - Additional options (revalidate, etc.)
 * @returns {Promise} - Promise resolving to query results
 */
export async function fetchSanityData(query, params = {}, options = {}) {
  try {
    const result = await client.fetch(query, params, {
      next: { revalidate: options.revalidate || 3600 }, // Default 1 hour cache
      ...options
    });
    return result;
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw error;
  }
}

/**
 * Fetch all projects
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Array of project documents
 */
export async function getAllProjects(options = {}) {
  const query = `*[_type == "project" && !(_id in path("drafts.**"))] | order(orderRank asc, publishedAt desc, _createdAt desc) {
    _id,
    title,
    tagline,
    description,
    projectResults,
    workBlurb,
    slug,
    orderRank,
    featuredImage[0]{
      _type,
      _type == "image" => {
        asset->
      },
      _type == "file" => {
        asset->
      }
    },
    gallery[0]{
      _type,
      _type == "image" => {
        asset->
      },
      _type == "file" => {
        asset->{
          _id,
          url,
          mimeType,
          originalFilename
        }
      }
    },
    expertise[]->{
      _id,
      name
    },
    projectUrl,
    repositoryUrl,
    featured,
    publishedAt,
    category[]->{
      _id,
      name,
      slug
    },
    color->{
      _id,
      name,
      hex
    },
    _createdAt,
    _updatedAt
  }`;
  
  return fetchSanityData(query, {}, options);
}

/**
 * Fetch a single project by slug
 * @param {string} slug - Project slug
 * @param {Object} options - Query options
 * @returns {Promise<Object|null>} - Project document or null
 */
export async function getProjectBySlug(slug, options = {}) {
  const query = `*[_type == "project" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    _id,
    title,
    tagline,
    description,
    projectResults,
    workBlurb,
    slug,
    featuredImage[0]{
      _type,
      _type == "image" => {
        asset->
      },
      _type == "file" => {
        asset->
      }
    },
    gallery[]{
      _type,
      _type == "image" => {
        asset->
      },
      _type == "file" => {
        asset->{
          _id,
          url,
          mimeType,
          originalFilename
        }
      }
    },
    expertise[]->{
      _id,
      title
    },
    projectUrl,
    repositoryUrl,
    featured,
    category[]->{
      _id,
      name,
      slug
    },
    color->{
      _id,
      name,
      hex
    },
    relatedProjects[]->{
      _id,
      title,
      slug,
      featuredImage[0]{
        _type,
        _type == "image" => {
          asset->
        },
        _type == "file" => {
          asset->
        }
      },
      workBlurb,
      color->{
        _id,
        name,
        hex
      }
    },
    publishedAt,
    _createdAt,
    _updatedAt
  }`;
  
  return fetchSanityData(query, { slug }, options);
}

/**
 * Fetch homepage content
 * @param {Object} options - Query options
 * @returns {Promise<Object|null>} - Homepage document or null
 */
export async function getHomepageContent(options = {}) {
  const query = `*[_type == "homepage"][0] {
    _id,
    title,
    content,
    heroSlideshow{
      media[]{
        _type,
        _type == "image" => {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        _type == "file" => {
          asset->{
            _id,
            url,
            mimeType
          },
          alt,
          caption
        },
        _type == "video" => {
          asset->{
            _id,
            url,
            mimeType
          },
          alt,
          caption
        }        
      }
    },
    sections[]{
      title,
      colorReference->{
        _id,
        name,
        value
      },
      media[]{
        _type,
        _type == "image" => {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        _type == "file" => {
          asset->{
            _id,
            url,
            mimeType
          },
          alt,
          caption
        },
        _type == "video" => {
          asset->{
            _id,
            url,
            mimeType
          },
          alt,
          caption
        }        
      }
    },
    _createdAt,
    _updatedAt
  }`;
  
  return fetchSanityData(query, {}, options);
}

/**
 * Fetch a single project by ID
 * @param {string} id - Project ID
 * @param {Object} options - Query options
 * @returns {Promise<Object|null>} - Project document or null
 */
export async function getProjectById(id, options = {}) {
  const query = `*[_type == "project" && !(_id in path("drafts.**")) && _id == $id][0] {
    _id,
    title,
    tagline,
    description,
    projectResults,
    workBlurb,
    slug,
    featuredImage[0]{
      _type,
      _type == "image" => {
        asset->
      },
      _type == "file" => {
        asset->
      }
    },
    gallery,
    projectUrl,
    repositoryUrl,
    featured,
    category[]->{
      _id,
      name,
      slug
    },
    expertise[]->{
      _id,
      name
    },
    color->{
      _id,
      name,
      hex
    },
    publishedAt,
    _createdAt,
    _updatedAt
  }`;
  
  return fetchSanityData(query, { id }, options);
}

/**
 * Fetch projects with pagination
 * @param {number} start - Starting index
 * @param {number} end - Ending index
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Array of project documents
 */
export async function getProjectsPaginated(start = 0, end = 10, options = {}) {
  const query = `*[_type == "project" && !(_id in path("drafts.**"))] | order(orderRank asc, publishedAt desc, _createdAt desc) [$start...$end] {
    _id,
    title,
    tagline,
    description,
    projectResults,
    workBlurb,
    slug,
    orderRank,
    featuredImage[0]{
      _type,
      _type == "image" => {
        asset->
      },
      _type == "file" => {
        asset->
      }
    },
    expertise[]->{
      _id,
      name
    },
    projectUrl,
    repositoryUrl,
    featured,
    category[]->{
      _id,
      name,
      slug
    },
    color->{
      _id,
      name,
      hex
    },
    publishedAt,
    _createdAt,
    _updatedAt
  }`;
  
  return fetchSanityData(query, { start, end }, options);
}

/**
 * Search projects by title or tagline
 * @param {string} searchTerm - Search term
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Array of matching project documents
 */
export async function searchProjects(searchTerm, options = {}) {
  const query = `*[_type == "project" && !(_id in path("drafts.**")) && (title match $searchTerm || tagline match $searchTerm)] | order(orderRank asc, publishedAt desc, _createdAt desc) {
    _id,
    title,
    tagline,
    description,
    projectResults,
    workBlurb,
    slug,
    orderRank,
    featuredImage[0]{
      _type,
      _type == "image" => {
        asset->
      },
      _type == "file" => {
        asset->
      }
    },
    projectUrl,
    repositoryUrl,
    featured,
    category[]->{
      _id,
      name,
      slug
    },
    color->{
      _id,
      name,
      hex
    },
    expertise[]->{
      _id,
      name
    },    
    publishedAt,
    _createdAt,
    _updatedAt
  }`;
  
  return fetchSanityData(query, { searchTerm: `*${searchTerm}*` }, options);
}

/**
 * Get total count of projects
 * @param {Object} options - Query options
 * @returns {Promise<number>} - Total count of projects
 */
export async function getProjectsCount(options = {}) {
  const query = `count(*[_type == "project" && !(_id in path("drafts.**"))])`;
  return fetchSanityData(query, {}, options);
}

/**
 * Fetch project slugs (useful for static generation)
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Array of slug objects
 */
export async function getProjectSlugs(options = {}) {
  const query = `*[_type == "project" && !(_id in path("drafts.**")) && defined(slug.current)] {
    "slug": slug.current
  }`;
  
  return fetchSanityData(query, {}, options);
}

/**
 * Fetch featured projects only
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Array of featured project documents
 */
export async function getFeaturedProjects(options = {}) {
  const query = `*[_type == "project" && !(_id in path("drafts.**")) && featured == true] | order(orderRank asc, publishedAt desc, _createdAt desc) {
    _id,
    title,
    tagline,
    description,
    projectResults,
    workBlurb,
    slug,
    orderRank,
    featuredImage[0]{
      _type,
      _type == "image" => {
        asset->
      },
      _type == "file" => {
        asset->
      }
    },
    expertise[]->{
      _id,
      name
    },
    projectUrl,
    repositoryUrl,
    featured,
    category[]->{
      _id,
      name,
      slug
    },
    color->{
      _id,
      name,
      hex
    },
    publishedAt,
    _createdAt,
    _updatedAt
  }`;
  
  return fetchSanityData(query, {}, options);
}

/**
 * Fetch all categories
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Array of category documents
 */
export async function getAllCategories(options = {}) {
  const query = `*[_type == "siteCategories"] | order(_createdAt desc) {
    _id,
    name,
    header,
    slug,
    color->{
      _id,
      name,
      hex
    },
    "projectCount": count(*[_type == "project" && ^._id in category[]._ref])
  }`;

  return fetchSanityData(query, {}, options);
}

export async function getProjectsByCategory(categorySlug, options = {}) {
  const query = `*[_type == "project" && !(_id in path("drafts.**")) && $categorySlug in category[]->slug.current] | order(orderRank asc, publishedAt desc, _createdAt desc) {
    _id,
    title,
    tagline,
    description,
    projectResults,
    workBlurb,
    slug,
    orderRank,
    featuredImage[0]{
      _type,
      _type == "image" => {
        asset->
      },
      _type == "file" => {
        asset->
      }
    },
    gallery[0]{
      _type,
      _type == "image" => {
        asset->
      },
      _type == "file" => {
        asset->{
          _id,
          url,
          mimeType,
          originalFilename
        }
      }
    },
    expertise[]->{
      _id,
      name
    },
    projectUrl,
    repositoryUrl,
    featured,
    publishedAt,
    category[]->{
      _id,
      name,
      slug
    },
    color->{
      _id,
      name,
      hex
    },
    _createdAt,
    _updatedAt
  }`;
  
  return fetchSanityData(query, { categorySlug }, options);
}

/**
 * Get category by slug
 * @param {string} slug - Category slug
 * @param {Object} options - Query options
 * @returns {Promise<Object|null>} - Category document or null
 */
export async function getCategoryBySlug(slug, options = {}) {
  
  const query = `*[_type == "siteCategories" && slug.current == $slug][0] {
    _id,
    name,
    header,
    slug,
    color->{
      _id,
      name,
      hex
    }
  }`;
  console.log('Query:', query);
  return fetchSanityData(query, { slug }, options);
}

/**
 * Fetch category slugs (useful for static generation)
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Array of slug objects
 */
export async function getCategorySlugs(options = {}) {
  const query = `*[_type == "siteCategories" && defined(slug.current)] {
    "slug": slug.current
  }`;
  
  return fetchSanityData(query, {}, options);
}
