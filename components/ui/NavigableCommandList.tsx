// components/ui/NavigableCommandList.tsx
type CommandEntry = { cmd: string; desc: string }

type Props = {
  commands: CommandEntry[]
  onSelect: (cmd: string) => void
  disabled?: boolean
}

export function NavigableCommandList({ commands, onSelect, disabled = false }: Props) {
  return (
    <div className="space-y-1">
      {commands.map(({ cmd, desc }) => (
        <div
          key={cmd}
          className={`flex gap-4 rounded px-1 transition-colors ${
            disabled
              ? 'cursor-default'
              : 'cursor-pointer hover:bg-green-400/10'
          }`}
          onClick={() => !disabled && onSelect(cmd)}
        >
          <span className="text-cyan-400 w-24 shrink-0">{cmd}</span>
          <span className="text-gray-300">{desc}</span>
        </div>
      ))}
    </div>
  )
}
