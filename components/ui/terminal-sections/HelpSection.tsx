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

export function HelpSection() {
  return (
    <div className="space-y-1">
      <p className="text-green-400 font-bold mb-2">[AVAILABLE_COMMANDS]</p>
      {helpCommands.map(({ cmd, desc }) => (
        <div key={cmd} className="flex gap-4">
          <span className="text-cyan-400 w-24 shrink-0">{cmd}</span>
          <span className="text-gray-300">{desc}</span>
        </div>
      ))}
    </div>
  )
}
