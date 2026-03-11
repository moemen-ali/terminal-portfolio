'use client'

import { useState, useRef, useEffect, type ReactNode } from 'react'
import { WelcomeSection } from './terminal-sections/WelcomeSection'
import { HelpSection } from './terminal-sections/HelpSection'
import { AboutSection } from './terminal-sections/AboutSection'
import { ProjectsSection } from './terminal-sections/ProjectsSection'
import { SkillsSection } from './terminal-sections/SkillsSection'
import { ExperienceSection } from './terminal-sections/ExperienceSection'
import { EducationSection } from './terminal-sections/EducationSection'
import { ContactSection } from './terminal-sections/ContactSection'

type HistoryEntry = { command: string; output: ReactNode }

export default function PortfolioTerminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '/welcome', output: <WelcomeSection /> },
  ])
  const [currentCommand, setCurrentCommand] = useState('')
  const [, setHistoryIndex] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: Record<string, () => ReactNode> = {
    'help':       () => <HelpSection />,
    'about':      () => <AboutSection />,
    'projects':   () => <ProjectsSection />,
    'skills':     () => <SkillsSection />,
    'experience': () => <ExperienceSection />,
    'education':  () => <EducationSection />,
    'contact':    () => <ContactSection />,
    'clear': () => {
      setHistory([{ command: '/welcome', output: <WelcomeSection /> }])
      return null
    },
  }

  const handleCommand = () => {
    const cmd = currentCommand.trim().toLowerCase()
    const commandFn = commands[cmd]
    const output: ReactNode = commandFn
      ? commandFn()
      : (
        <span className="text-red-400">
          Command not found: <span className="text-white">{cmd}</span>
          {'\n'}Type <span className="text-cyan-400">help</span> to see available commands.
        </span>
      )

    if (cmd !== 'clear') {
      setHistory(prev => [...prev, { command: currentCommand, output }])
    }

    setCurrentCommand('')
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistoryIndex(prev => {
        const newIndex = Math.min(prev + 1, history.length - 1)
        if (history.length > 0) {
          setCurrentCommand(history[history.length - 1 - newIndex]?.command || '')
        }
        return newIndex
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistoryIndex(prev => {
        const newIndex = Math.max(prev - 1, -1)
        setCurrentCommand(newIndex === -1 ? '' : history[history.length - 1 - newIndex]?.command || '')
        return newIndex
      })
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus()
    const terminal = terminalRef.current
    terminal?.addEventListener('click', handleClick)
    return () => terminal?.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-green-400 p-4 font-mono">
      <div className="w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl border border-green-400">

        {/* Terminal Header */}
        <div className="flex items-center gap-2 p-3 bg-gray-800 text-xs text-gray-400">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
          </div>
          <div className="flex-1 text-center font-semibold">
            moemen@portfolio-terminal:~$ | Interactive Portfolio v1.0
          </div>
          <div className="text-xs">
            <span className="text-green-400">●</span> ONLINE
          </div>
        </div>

        {/* Terminal Output */}
        <div
          ref={terminalRef}
          className="h-[75vh] overflow-y-auto p-4 space-y-3 bg-black cursor-text"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b981 #1f2937' }}
        >
          {history.map((entry, i) => (
            <div key={i} className="space-y-2">
              <div className="flex gap-2">
                <span className="text-cyan-400 font-semibold">moemen@portfolio:~$</span>
                <span className="text-white">{entry.command}</span>
              </div>
              <div className="pl-6">
                {entry.output}
              </div>
            </div>
          ))}

          {/* Current Command Input */}
          <div className="flex gap-2 items-center">
            <span className="text-cyan-400 font-semibold">moemen@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={e => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white caret-green-400"
              autoFocus
              spellCheck="false"
            />
            <span className="text-green-400 animate-pulse">█</span>
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Terminal Footer */}
        <div className="bg-gray-800 px-4 py-2 text-xs text-gray-500 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span>Type help for available commands • Use ↑/↓ arrows for command history</span>
            <span>Press Ctrl+C to interrupt • clear to reset terminal</span>
          </div>
        </div>

      </div>
    </div>
  )
}
