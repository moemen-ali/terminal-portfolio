import { skillCategories } from '@/lib/data'

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
      {skillCategories.map(({ label, items }) => (
        <div key={label} className="space-y-1">
          <p className="text-cyan-400">{label}:</p>
          {items.map((skill) => {
            const bars = Math.round(skill.level / 5)
            const pct = `${skill.level}%`
            return <SkillBar key={skill.name} name={skill.name} bars={bars} pct={pct} />
          })}
        </div>
      ))}
    </div>
  )
}
