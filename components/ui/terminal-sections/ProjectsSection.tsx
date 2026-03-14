import { projects } from '@/lib/data'

export function ProjectsSection() {
  return (
    <div className="space-y-5">
      <p className="text-green-400 font-bold">[PROJECT PORTFOLIO]</p>
      {projects.map((project, index) => (
        <div key={project.title} className="space-y-1">
          <p className="text-white">
            <span className="text-gray-500">{index + 1}.</span>{' '}
            <span className="text-cyan-400 font-semibold">{project.title}</span>
            <span className="text-gray-500"> — {project.company}</span>
          </p>
          <p className="text-gray-500 pl-4">
            Stack: <span className="text-gray-400">{project.stack}</span>
          </p>
          {project.bullets.map((bullet) => (
            <p key={bullet} className="text-gray-300 pl-4">• {bullet}</p>
          ))}
          {project.challenge && (
            <p className="text-yellow-400 pl-4 pt-1">
              ⚡ Challenge: <span className="text-gray-300">{project.challenge}</span>
            </p>
          )}
          <div className="flex gap-4 pl-4 pt-0.5">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 hover:underline transition-colors text-sm"
              >
                [live demo]
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors text-sm"
              >
                [github]
              </a>
            )}
          </div>
        </div>
      ))}
      <p className="text-gray-500 pt-1">
        GitHub:{' '}
        <a
          href="https://github.com/moemen-ali"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
        >
          https://github.com/moemen-ali
        </a>
      </p>
    </div>
  )
}
