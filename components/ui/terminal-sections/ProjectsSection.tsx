const projects = [
  {
    title: 'Daycare — YNMO Core Product',
    company: 'TrianglZ LLC',
    stack: 'Angular, Angular Signals, NGXS, SCSS',
    bullets: [
      'Owned end-to-end delivery for 700+ daycare centers across KSA, UAE & Qatar',
      'Led cross-functional team (Frontend, Backend, Mobile, QC, PM)',
      'Reduced calendar page load time from 5–6s to 1.2s via reactive form refactor',
    ],
  },
  {
    title: 'Website Builder Platform',
    company: 'TrianglZ LLC',
    stack: 'Angular Signals, Firebase, service-based state management',
    bullets: [
      'Participated in architecture & design phase for multi-product rollout',
      'Contributed to frontend decisions enabling feature reuse across white-label products',
    ],
  },
  {
    title: 'Messaging & Live Chat Module',
    company: 'TrianglZ LLC',
    stack: 'Angular, Matrix server, TypeScript',
    bullets: [
      'Designed and implemented as a reusable, production-ready library',
      'Structured for integration across multiple YNMO products',
    ],
  },
  {
    title: 'AI Assistant Backend Service',
    company: 'TrianglZ LLC',
    stack: 'NestJS, TypeScript',
    bullets: [
      'Co-built backend powering a premium AI feature for report & assessment summaries',
      'Currently live in production',
    ],
  },
  {
    title: 'Shared UI Component Library',
    company: 'TrianglZ LLC',
    stack: 'Angular, Storybook, SCSS',
    bullets: [
      'Enhanced and extended library with new components',
      'Improved reusability across multiple YNMO product lines',
    ],
  },
]

export function ProjectsSection() {
  return (
    <div className="space-y-4">
      <p className="text-green-400 font-bold">[PROJECT PORTFOLIO]</p>
      {projects.map((project, index) => (
        <div key={project.title} className="space-y-1">
          <p className="text-white">
            <span className="text-gray-500">{index + 1}.</span>{' '}
            <span className="text-cyan-400 font-semibold">{project.title}</span>
            <span className="text-gray-500"> — {project.company}</span>
          </p>
          <p className="text-gray-500 pl-4">Stack: <span className="text-gray-400">{project.stack}</span></p>
          {project.bullets.map((bullet) => (
            <p key={bullet} className="text-gray-300 pl-4">• {bullet}</p>
          ))}
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
