const jobs = [
  {
    period: 'Sep 2023 – Present',
    title: 'Senior Frontend Engineer',
    company: 'TrianglZ LLC',
    bullets: [
      'Owned end-to-end delivery of Daycare (YNMO) — used by 700+ centers in KSA, UAE & Qatar',
      'Led delivery, planning & execution for a cross-functional team (FE, BE, Mobile, QC, PM)',
      'Architected a website builder platform using Angular Signals, Firebase & service-based state',
      'Built a messaging & live chat module with Matrix server as a reusable production library',
      'Migrated reactive state from RxJS Observables to Angular Signals (incl. NGXS store)',
      'Refactored reactive calendar form: load time reduced from 5–6s → 1.2s',
      'Co-built NestJS backend for a live premium AI assistant feature',
      'Enhanced shared UI component library for reuse across multiple YNMO products',
      'Active in AI tech talks; hands-on with n8n, BMAD, and Claude Code',
    ],
  },
  {
    period: 'Jul 2021 – Aug 2023',
    title: 'Frontend Developer',
    company: 'Enozom Software',
    bullets: [
      'Led frontend development across multiple client projects',
      'Handled production issues, Angular version upgrades & legacy refactoring',
      'Improved maintainability and performance of large Angular codebases',
      'Collaborated with PMs and designers on UI/UX and technical decisions',
    ],
  },
]

export function ExperienceSection() {
  return (
    <div className="space-y-5">
      <p className="text-green-400 font-bold">[WORK EXPERIENCE]</p>
      {jobs.map((job) => (
        <div key={job.company} className="space-y-1">
          <p>
            <span className="text-gray-500">{job.period}</span>
            <span className="text-gray-500"> | </span>
            <span className="text-cyan-400 font-semibold">{job.title}</span>
          </p>
          <p className="text-white font-semibold">{job.company}</p>
          {job.bullets.map((bullet) => (
            <p key={bullet} className="text-gray-300 pl-2">• {bullet}</p>
          ))}
        </div>
      ))}
    </div>
  )
}
