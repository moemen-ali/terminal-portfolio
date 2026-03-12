// components/ui/CommandDropdown.tsx
type Props = {
  commands: string[]
  activeIndex: number
  onSelect: (cmd: string) => void
  onHover: (index: number) => void
}

export function CommandDropdown({ commands, activeIndex, onSelect, onHover }: Props) {
  if (commands.length === 0) return null

  return (
    <div
      className="absolute bottom-full left-0 right-0 mb-1 bg-gray-900 border border-green-400/40 rounded overflow-hidden z-10"
      role="listbox"
      aria-label="Command suggestions"
    >
      {commands.map((cmd, i) => (
        <div
          key={cmd}
          role="option"
          aria-selected={i === activeIndex}
          className={`px-4 py-1 cursor-pointer text-sm transition-colors ${
            i === activeIndex
              ? 'bg-green-400/20 text-green-300'
              : 'text-gray-300 hover:bg-green-400/10'
          }`}
          onClick={() => onSelect(cmd)}
          onMouseEnter={() => onHover(i)}
        >
          <span className="text-cyan-400">{cmd}</span>
        </div>
      ))}
    </div>
  )
}
