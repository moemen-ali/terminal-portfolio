import { jobs } from '@/lib/data'

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
          {job.bullets.map((bullet, index) => (
            <p key={index} className="text-gray-300 pl-2">• {bullet}</p>
          ))}
        </div>
      ))}
    </div>
  )
}
