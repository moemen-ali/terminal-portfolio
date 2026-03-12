// components/ui/terminal-sections/HelpSection.tsx
import { NavigableCommandList } from '../NavigableCommandList'

const helpCommands = [
  { cmd: 'about',      desc: 'Display personal information' },
  { cmd: 'projects',   desc: 'View project portfolio' },
  { cmd: 'skills',     desc: 'Show technical skills' },
  { cmd: 'experience', desc: 'Display work history' },
  { cmd: 'education',  desc: 'View educational background' },
  { cmd: 'contact',    desc: 'Show contact information' },
  { cmd: 'clear',      desc: 'Clear terminal screen' },
  { cmd: 'help',       desc: 'Display this help message' },
]

type Props = {
  onCommandSelect?: (cmd: string) => void
}

export function HelpSection({ onCommandSelect }: Props) {
  return (
    <div className="space-y-1">
      <p className="text-green-400 font-bold mb-2">[AVAILABLE_COMMANDS]</p>
      <NavigableCommandList
        commands={helpCommands}
        onSelect={cmd => onCommandSelect?.(cmd)}
        disabled={!onCommandSelect}
      />
    </div>
  )
}
