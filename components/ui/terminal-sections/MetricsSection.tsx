import { metrics } from '@/lib/data'

const categoryColors: Record<string, string> = {
  Performance:  'text-green-400',
  Scale:        'text-cyan-400',
  Reuse:        'text-yellow-400',
  Architecture: 'text-purple-400',
  Reach:        'text-blue-400',
  Adoption:     'text-orange-400',
  AI:           'text-pink-400',
}

export function MetricsSection() {
  return (
    <div className="space-y-4">
      <p className="text-green-400 font-bold">[ENGINEERING METRICS]</p>
      <p className="text-gray-500 text-sm">Real numbers from production work.</p>
      {metrics.map((metric) => (
        <div key={metric.label} className="space-y-0.5">
          <div className="flex items-baseline gap-3">
            <span
              className={`text-xs font-semibold uppercase tracking-widest w-28 shrink-0 ${categoryColors[metric.category] ?? 'text-gray-400'}`}
            >
              [{metric.category}]
            </span>
            <span className="text-white font-semibold">{metric.value}</span>
          </div>
          <p className="text-gray-500 pl-32 text-sm">
            <span className="text-gray-400">{metric.label}</span> — {metric.context}
          </p>
        </div>
      ))}
    </div>
  )
}
