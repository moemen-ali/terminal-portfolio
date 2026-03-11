const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'TypeScript',   bars: 20, pct: '100%' },
      { name: 'JavaScript',   bars: 20, pct: '100%' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'Angular',               bars: 20, pct: '100%' },
      { name: 'Angular Signals',        bars: 20, pct: '100%' },
      { name: 'RxJS',                  bars: 18, pct: '90%'  },
      { name: 'NGXS',                  bars: 18, pct: '90%'  },
      { name: 'React / Redux Toolkit', bars: 16, pct: '80%'  },
    ],
  },
  {
    category: 'Styling',
    skills: [
      { name: 'SCSS / CSS',   bars: 20, pct: '100%' },
      { name: 'Tailwind CSS', bars: 20, pct: '100%' },
      { name: 'Bootstrap',    bars: 16, pct: '80%'  },
    ],
  },
  {
    category: 'Backend & Services',
    skills: [
      { name: 'NestJS',        bars: 14, pct: '70%' },
      { name: 'Firebase',      bars: 14, pct: '70%' },
      { name: 'Matrix Server', bars: 12, pct: '60%' },
    ],
  },
  {
    category: 'Tools & Platforms',
    skills: [
      { name: 'Git / GitHub',        bars: 20, pct: '100%' },
      { name: 'Storybook',           bars: 16, pct: '80%'  },
      { name: 'Cursor / Claude Code', bars: 16, pct: '80%'  },
      { name: 'n8n / BMAD',          bars: 12, pct: '60%'  },
    ],
  },
]

function SkillBar({ name, bars, pct }: { name: string; bars: number; pct: string }) {
  const filled = '█'.repeat(bars)
  const empty = ' '.repeat(20 - bars)
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-300 w-44 shrink-0">{name}</span>
      <span className="text-green-400">{filled}</span>
      <span className="text-gray-700">{empty}</span>
      <span className="text-gray-500 text-xs">{pct}</span>
    </div>
  )
}

export function SkillsSection() {
  return (
    <div className="space-y-4">
      <p className="text-green-400 font-bold">[TECHNICAL SKILLS MATRIX]</p>
      {skillGroups.map(({ category, skills }) => (
        <div key={category} className="space-y-1">
          <p className="text-cyan-400">{category}:</p>
          {skills.map((skill) => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>
      ))}
    </div>
  )
}
