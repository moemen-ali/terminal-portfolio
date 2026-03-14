export function WelcomeSection() {
  return (
    <div className="space-y-2">
      <pre className="text-green-400 text-xs leading-tight overflow-x-auto">{`
 ███╗   ███╗ ██████╗ ███████╗███╗   ███╗███████╗███╗   ██╗
 ████╗ ████║██╔═══██╗██╔════╝████╗ ████║██╔════╝████╗  ██║
 ██╔████╔██║██║   ██║█████╗  ██╔████╔██║█████╗  ██╔██╗ ██║
 ██║╚██╔╝██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║
 ██║ ╚═╝ ██║╚██████╔╝███████╗██║ ╚═╝ ██║███████╗██║ ╚████║
 ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝`}</pre>
      <p className="text-green-400">[SYSTEM INITIALIZED] — Terminal Portfolio v2.0</p>
      <div className="space-y-0.5 pl-2 border-l-2 border-green-800">
        <p className="text-gray-300">
          <span className="text-cyan-400">Specialist:</span>{' '}
          Angular Architecture · Microfrontends · Performance Engineering
        </p>
        <p className="text-gray-300">
          <span className="text-cyan-400">Stack:    </span>{' '}
          Angular · React · TypeScript · NestJS
        </p>
        <p className="text-gray-300">
          <span className="text-cyan-400">Reach:    </span>{' '}
          Products live in KSA, UAE & Qatar — 200+ daycare centers
        </p>
        <p className="text-gray-300">
          <span className="text-cyan-400">Status:   </span>{' '}
          <span className="text-green-400 animate-pulse">●</span> Open to Senior / Lead roles
        </p>
      </div>
      <p className="text-gray-500 pt-1">
        Type <span className="text-cyan-400">help</span> to see available commands
        or <span className="text-cyan-400">about</span> to learn more.
      </p>
    </div>
  )
}
