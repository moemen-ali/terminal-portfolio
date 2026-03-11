const degrees = [
  {
    degree: 'B.Sc. Mechanical Engineering',
    institution: 'Faculty of Engineering, Alexandria University',
    period: 'Sep 2016 – May 2021',
  },
  {
    degree: 'DOTNET Full Stack Development',
    institution: 'Digital Egypt Pioneers Initiative',
    period: 'Apr 2024 – Oct 2024',
  },
]

const continuousLearning = [
  'Hands-on exploration of AI-assisted development tools (Claude Code, BMAD, n8n)',
  'Active participant in AI-focused tech talks at TrianglZ',
  'Self-directed growth in React, NestJS, and system architecture',
]

export function EducationSection() {
  return (
    <div className="space-y-4">
      <p className="text-green-400 font-bold">[EDUCATION & CERTIFICATIONS]</p>
      {degrees.map(({ degree, institution, period }) => (
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
