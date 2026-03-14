import { architectureNotes } from '@/lib/data'

export function ArchitectureSection() {
  return (
    <div className="space-y-6">
      <p className="text-green-400 font-bold">[ARCHITECTURE NOTES]</p>
      <p className="text-gray-500 text-sm">
        Patterns and diagrams from real production systems.
      </p>
      {architectureNotes.map((note) => (
        <div key={note.title} className="space-y-2">
          <p className="text-cyan-400 font-semibold">▶ {note.title}</p>
          <p className="text-gray-400 text-sm pl-4">{note.description}</p>
          <pre className="text-green-300 text-xs leading-tight pl-4 overflow-x-auto">
            {note.diagram}
          </pre>
        </div>
      ))}
    </div>
  )
}
