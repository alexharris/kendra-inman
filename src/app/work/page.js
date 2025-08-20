
import './Work.scss';
import HeaderWithTag from '../components/HeaderWithTag';
import { getAllProjects } from '../../utils/sanity-queries';

export default async function Page() {
  // Fetch projects from Sanity
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen flex flex-col ">
      <HeaderWithTag
        title="Work that works"
        tag={projects.length.toString()}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <a
              href={`/work/${project.slug.current}`}
              key={project._id}
              className="bg-gray-200 h-64 text-black flex flex-col justify-center items-center p-4 hover:bg-gray-300 transition-colors"
              style={{ textDecoration: 'none' }}
            >
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              {project.tagline && (
                <p className="text-sm text-gray-600 mb-2">{project.tagline}</p>
              )}
              {project.expertise && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.expertise.slice(0, 3).map((exp, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-300 px-2 py-1 rounded"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))
        ) : (
          // Fallback grid items when no projects are available
          Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className="bg-gray-200 h-64 text-black flex flex-col justify-center items-center"
            >
              Grid item {index + 1}
            </div>
          ))
        )}
      </div>
    </div>
  )
}