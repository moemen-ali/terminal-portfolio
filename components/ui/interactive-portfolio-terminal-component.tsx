'use client'

import { useState, useRef, useEffect, useMemo, type ReactNode } from 'react'
import { WelcomeSection } from './terminal-sections/WelcomeSection'
import { HelpSection } from './terminal-sections/HelpSection'
import { AboutSection } from './terminal-sections/AboutSection'
import { ProjectsSection } from './terminal-sections/ProjectsSection'
import { SkillsSection } from './terminal-sections/SkillsSection'
import { ExperienceSection } from './terminal-sections/ExperienceSection'
import { EducationSection } from './terminal-sections/EducationSection'
import { ContactSection } from './terminal-sections/ContactSection'
import { MetricsSection }      from '@/components/ui/terminal-sections/MetricsSection'
import { BlogSection }         from '@/components/ui/terminal-sections/BlogSection'
import { ArchitectureSection } from '@/components/ui/terminal-sections/ArchitectureSection'
import { CommandDropdown } from './CommandDropdown'
import { findClosestCommand } from '../../lib/fuzzy-match'

type HistoryEntry = {
  command: string
  output: ReactNode
  isSystem?: boolean
}

type Mode = 'normal' | 'awaiting-confirmation'

// Static command names — source of truth for autocomplete and fuzzy matching.
// 'help' and 'clear' are handled as special cases in runCommand.
const ALL_COMMAND_NAMES = [
  'help', 'about', 'projects', 'skills', 'experience', 'education', 'contact', 'clear',
  'metrics', 'blog', 'architecture',
]

// Static component factories — defined outside component to avoid re-creation on render.
// Does not include 'help' (needs runCommand callback) or 'clear' (resets state directly).
const STATIC_COMMANDS: Record<string, () => ReactNode> = {
  'about':      () => <AboutSection />,
  'projects':   () => <ProjectsSection />,
  'skills':     () => <SkillsSection />,
  'experience': () => <ExperienceSection />,
  'education':     () => <EducationSection />,
  'contact':       () => <ContactSection />,
  'metrics':       () => <MetricsSection />,
  'blog':          () => <BlogSection />,
  'architecture':  () => <ArchitectureSection />,
}

export default function PortfolioTerminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '/welcome', output: <WelcomeSection />, isSystem: true },
  ])
  const [currentCommand, setCurrentCommand] = useState('')
  const [, setHistoryIndex] = useState(-1)
  const [mode, setMode] = useState<Mode>('normal')
  const [dropdownIndex, setDropdownIndex] = useState(-1)
  const [pendingTypo, setPendingTypo] = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Derived: prefix-filtered commands for autocomplete dropdown.
  const filteredCommands = useMemo(() =>
    currentCommand.length > 0
      ? ALL_COMMAND_NAMES.filter(cmd =>
          cmd.startsWith(currentCommand.toLowerCase())
        )
      : [],
    [currentCommand]
  )

  const dropdownOpen = mode === 'normal' && filteredCommands.length > 0 && currentCommand.length > 0

  // runCommand — 'help' and 'clear' are handled inline; all other commands delegate to STATIC_COMMANDS.
  const runCommand = (cmd: string) => {
    if (cmd === 'clear') {
      // clear resets history directly — no history entry added.
      setHistory([{ command: '/welcome', output: <WelcomeSection />, isSystem: true }])
      setCurrentCommand('')
      setDropdownIndex(-1)
      setHistoryIndex(-1)
      return
    }

    let output: ReactNode

    if (cmd === 'help') {
      // help needs the runCommand callback for clickable items.
      // runCommand is stable (useCallback []), so passing it here is safe.
      output = <HelpSection onCommandSelect={runCommand} />
    } else {
      const commandFn = STATIC_COMMANDS[cmd]
      output = commandFn
        ? commandFn()
        : (
          <span className="text-red-400">
            Command not found: <span className="text-white">{cmd}</span>
            {'\n'}Type <span className="text-cyan-400">help</span> to see available commands.
          </span>
        )
    }

    setHistory(prev => [...prev, { command: cmd, output }])
    setCurrentCommand('')
    setDropdownIndex(-1)
    setHistoryIndex(-1)
  }

  const handleCommand = () => {
    const cmd = currentCommand.trim().toLowerCase()
    if (!cmd) return

    // Dropdown item highlighted — run it directly.
    if (dropdownOpen && dropdownIndex >= 0) {
      const selected = filteredCommands[dropdownIndex]
      if (selected) {
        runCommand(selected)
        return
      }
    }

    // Known command.
    if (ALL_COMMAND_NAMES.includes(cmd)) {
      runCommand(cmd)
      return
    }

    // Unknown — try fuzzy match.
    const suggestion = findClosestCommand(cmd, ALL_COMMAND_NAMES)
    if (suggestion) {
      setHistory(prev => [
        ...prev,
        {
          command: cmd,
          output: (
            <span className="text-yellow-400">
              Did you mean <span className="text-cyan-400 font-bold">{suggestion}</span>? (y/n)
            </span>
          ),
          isSystem: true,
        },
      ])
      setPendingTypo(suggestion)
      setMode('awaiting-confirmation')
      setCurrentCommand('')
      setDropdownIndex(-1)
      return
    }

    // No match at all.
    setHistory(prev => [
      ...prev,
      {
        command: cmd,
        output: (
          <span className="text-red-400">
            Command not found: <span className="text-white">{cmd}</span>
            {'\n'}Type <span className="text-cyan-400">help</span> to see available commands.
          </span>
        ),
      },
    ])
    setCurrentCommand('')
    setDropdownIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // --- AWAITING-CONFIRMATION MODE ---
    if (mode === 'awaiting-confirmation') {
      if (e.key === 'y' || e.key === 'Y' || e.key === 'Enter') {
        e.preventDefault()
        const cmd = pendingTypo!
        setPendingTypo(null)
        setMode('normal')
        runCommand(cmd)
      } else if (e.key === 'n' || e.key === 'N' || e.key === 'Escape') {
        e.preventDefault()
        setPendingTypo(null)
        setMode('normal')
        runCommand('help')
      }
      return
    }

    // --- NORMAL MODE ---
    if (e.key === 'Enter') {
      handleCommand()
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      if (filteredCommands.length > 0) {
        setCurrentCommand(filteredCommands[0])
        setDropdownIndex(-1)
      }
      return
    }

    if (e.key === 'Escape') {
      setDropdownIndex(-1)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (dropdownOpen) {
        // Navigate dropdown down (clamp at last item).
        setDropdownIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
      } else {
        // Dropdown closed — navigate command history down.
        setHistoryIndex(prev => {
          const userHistory = history.filter(h => !h.isSystem)
          const newIndex = Math.max(prev - 1, -1)
          setCurrentCommand(
            newIndex === -1
              ? ''
              : userHistory[userHistory.length - 1 - newIndex]?.command || ''
          )
          return newIndex
        })
      }
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (dropdownOpen) {
        if (dropdownIndex > 0) {
          // Navigate dropdown up.
          setDropdownIndex(prev => prev - 1)
        } else {
          // At the top of dropdown — close it, re-enable history nav.
          setDropdownIndex(-1)
        }
      } else {
        // Dropdown closed — navigate command history up.
        setHistoryIndex(prev => {
          const userHistory = history.filter(h => !h.isSystem)
          const newIndex = Math.min(prev + 1, userHistory.length - 1)
          if (userHistory.length > 0) {
            setCurrentCommand(userHistory[userHistory.length - 1 - newIndex]?.command || '')
          }
          return newIndex
        })
      }
      return
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
          <div className="flex gap-2 items-center relative">
            <CommandDropdown
              commands={filteredCommands}
              activeIndex={dropdownIndex}
              onSelect={cmd => runCommand(cmd)}
              onHover={i => setDropdownIndex(i)}
            />
            <span className="text-cyan-400 font-semibold">moemen@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={e => {
                setCurrentCommand(e.target.value)
                setDropdownIndex(-1)
              }}
              onKeyDown={handleKeyDown}
              readOnly={mode === 'awaiting-confirmation'}
              placeholder={mode === 'awaiting-confirmation' ? 'Press y to confirm, n to cancel...' : ''}
              className={`flex-1 bg-transparent outline-none caret-green-400 ${
                mode === 'awaiting-confirmation'
                  ? 'text-yellow-400 placeholder-yellow-600'
                  : 'text-white'
              }`}
              autoFocus
              spellCheck="false"
              aria-autocomplete="list"
            />
            <span className="text-green-400 animate-pulse">█</span>
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Terminal Footer */}
        <div className="bg-gray-800 px-4 py-2 text-xs text-gray-500 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span>Type help for available commands • Use ↑/↓ arrows for command history • Tab to autocomplete</span>
            <span>Press Ctrl+C to interrupt • clear to reset terminal</span>
          </div>
        </div>

      </div>
    </div>
  )
}
