const fields = [
  { label: 'Name',     value: 'Moemen Ali' },
  { label: 'Role',     value: 'Senior Frontend Engineer' },
  { label: 'Location', value: 'Egypt' },
  { label: 'Status',   value: 'Open to new opportunities' },
]

export function AboutSection() {
  return (
    <div className="space-y-3">
      <p className="text-green-400 font-bold">[ABOUT]</p>
      <div className="space-y-1">
        {fields.map(({ label, value }) => (
          <div key={label} className="flex gap-2">
            <span className="text-cyan-400 w-20 shrink-0">{label}:</span>
            <span className="text-gray-300">{value}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1 pt-1">
        <p className="text-cyan-400">Bio:</p>
        <p className="text-gray-300 leading-relaxed">
          Frontend Engineer with 4+ years of experience building large-scale Angular applications
          in production SaaS environments. Strong focus on frontend architecture, performance
          optimization, and reusable systems across multiple products. Actively involved in
          technical decision-making and delivery ownership.
        </p>
      </div>
    </div>
  )
}
