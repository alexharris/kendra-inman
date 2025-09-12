# Sanity Queries Utility

This utility provides a set of pre-built functions for querying your Sanity dataset. All functions are optimized for Next.js App Router with built-in caching.

## Usage

Import the functions you need from the utility:

```javascript
import { 
  getAllProjects, 
  getProjectBySlug, 
  getFeaturedProjects 
} from '../../utils/sanity-queries';
```

## Available Functions

### Core Project Queries

- `getAllProjects(options)` - Fetch all projects, ordered by publishedAt
- `getProjectBySlug(slug, options)` - Fetch a single project by slug
- `getProjectById(id, options)` - Fetch a single project by ID
- `getProjectsPaginated(start, end, options)` - Fetch projects with pagination
- `getProjectsCount(options)` - Get total count of projects
- `getProjectSlugs(options)` - Get all project slugs (useful for static generation)

### Specialized Queries

- `getFeaturedProjects(options)` - Fetch only featured projects
- `searchProjects(searchTerm, options)` - Search projects by title or tagline

### Generic Query Function

- `fetchSanityData(query, params, options)` - Execute any custom GROQ query

## Options

All functions accept an optional `options` parameter with the following properties:

- `revalidate` - Cache revalidation time in seconds (default: 3600)
- Any other Next.js fetch options

## Examples

### Basic Usage in Server Components

```javascript
// app/work/page.js
import { getAllProjects } from '../../utils/sanity-queries';

export default async function WorkPage() {
  const projects = await getAllProjects();
  
  return (
    <div>
      {projects.map(project => (
        <div key={project._id}>
          <h2>{project.title}</h2>
          <p>{project.tagline}</p>
        </div>
      ))}
    </div>
  );
}
```

### With Custom Cache Settings

```javascript
// Revalidate every 30 minutes
const projects = await getAllProjects({ revalidate: 1800 });
```

### Dynamic Routes

```javascript
// app/work/[slug]/page.js
import { getProjectBySlug, getProjectSlugs } from '../../../utils/sanity-queries';

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    return <div>Project not found</div>;
  }
  
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.tagline}</p>
      {/* Render project details */}
    </div>
  );
}
```

### Custom Queries

```javascript
import { fetchSanityData } from '../../utils/sanity-queries';

// Custom query example
const customQuery = `*[_type == "project" && defined(projectUrl)] {
  title,
  projectUrl,
  slug
}`;

const projectsWithUrls = await fetchSanityData(customQuery);
```

## Project Schema Fields

The project schema includes the following fields:

- `title` - Project title (required)
- `slug` - URL slug (required, auto-generated from title)
- `tagline` - Short project description
- `description` - Rich text description
- `featuredImage` - Main project image
- `gallery` - Array of project images
- `expertise` - Array of expertise strings
- `projectUrl` - Live project URL
- `repositoryUrl` - Repository URL
- `featured` - Boolean flag for featured projects
- `publishedAt` - Publication date

## Error Handling

All functions include built-in error handling. Errors are logged to the console and re-thrown for your application to handle as needed.

## Performance

- All queries use Next.js built-in caching with 1-hour default revalidation
- Queries are optimized to fetch only necessary fields
- Pagination is available for large datasets
