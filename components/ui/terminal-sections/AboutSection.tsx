import { aboutFields, bio, credibilityStats } from '@/lib/data'

export function AboutSection() {
  return (
    <div className="space-y-3">
      <p className="text-green-400 font-bold">[ABOUT]</p>
      <div className="space-y-1">
        {aboutFields.map(({ label, value }) => (
          <div key={label} className="flex gap-2">
            <span className="text-cyan-400 w-24 shrink-0">{label}:</span>
            <span className="text-gray-300">{value}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1 pt-1">
        <p className="text-cyan-400">Bio:</p>
        <p className="text-gray-300 leading-relaxed">{bio}</p>
      </div>
      <div className="space-y-1 pt-1 border-t border-gray-800">
        <p className="text-cyan-400 pt-1">Credibility:</p>
        {credibilityStats.map(({ label, value }) => (
          <div key={label} className="flex gap-2">
            <span className="text-gray-500 w-24 shrink-0">{label}:</span>
            <span className="text-gray-300">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
