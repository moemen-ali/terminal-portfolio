import { education, continuousLearning } from '@/lib/data'

export function EducationSection() {
  return (
    <div className="space-y-4">
      <p className="text-green-400 font-bold">[EDUCATION & CERTIFICATIONS]</p>
      {education.map(({ degree, institution, period }) => (
        <div key={degree} className="space-y-0.5">
          <p className="text-cyan-400 font-semibold">{degree}</p>
          <p className="text-gray-300">{institution}</p>
          <p className="text-gray-500">{period}</p>
        </div>
      ))}
      <div className="space-y-1">
        <p className="text-cyan-400">Continuous Learning:</p>
        {continuousLearning.map((item) => (
          <p key={item} className="text-gray-300 pl-2">• {item}</p>
        ))}
      </div>
    </div>
  )
}
