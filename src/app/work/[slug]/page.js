import './Project.scss';
import { getProjectBySlug, getProjectSlugs } from '../../../utils/sanity-queries';
import ProjectContent from './ProjectContent';

// Generate static params for all project slugs
export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function Page({ params }) {
  // Fetch the project data using the slug from params

  const projectParams = await params
  const project = await getProjectBySlug(projectParams.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Project not found</h1>
      </div>
    );
  }

  return <ProjectContent project={project} />;
}