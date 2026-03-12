# Terminal Autocomplete & Typo Detection Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an autocomplete dropdown, typo detection with y/n confirmation, and a clickable help list to the portfolio terminal.

**Architecture:** A mode state machine (`normal | awaiting-confirmation`) controls keyboard routing. A `filteredCommands` derived value drives an autocomplete dropdown overlay. Fuzzy matching via `fastest-levenshtein` detects typos on submit. Static command factories are defined outside the component to eliminate circular dependency between `runCommand` and the commands map. Three new focused files handle the fuzzy matcher, dropdown, and reusable navigable list.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, fastest-levenshtein

**Spec:** `docs/superpowers/specs/2026-03-12-terminal-autocomplete-typo-detection-design.md`

---

## Chunk 1: Foundation — dependency + fuzzy matcher

### Task 1: Install fastest-levenshtein

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
npm install fastest-levenshtein
```

Expected: `package.json` now lists `"fastest-levenshtein"` under `dependencies`.

- [ ] **Step 2: Verify TypeScript can see it**

```bash
npx tsc --noEmit
```

Expected: No errors related to `fastest-levenshtein`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add fastest-levenshtein for typo detection"
```

---

### Task 2: Create fuzzy-match utility

**Files:**
- Create: `lib/fuzzy-match.ts`

- [ ] **Step 1: Create the file**

```ts
// lib/fuzzy-match.ts
import { distance } from 'fastest-levenshtein'

const MAX_DISTANCE = 3
const EXCLUDED = new Set(['clear'])

export function findClosestCommand(
  input: string,
  commands: string[]
): string | null {
  if (!input) return null

  const lower = input.toLowerCase()
  const candidates = commands.filter(cmd => !EXCLUDED.has(cmd))

  let best: string | null = null
  let bestDist = Infinity

  for (const cmd of candidates) {
    const d = distance(lower, cmd.toLowerCase())
    if (d < bestDist) {
      bestDist = d
      best = cmd
    }
  }

  return bestDist <= MAX_DISTANCE ? best : null
}
```

> Both `input` and `cmd` are lowercased before comparison so the matcher is case-insensitive.

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add lib/fuzzy-match.ts
git commit -m "feat: add fuzzy command matcher using fastest-levenshtein"
```

---

## Chunk 2: Shared UI components

### Task 3: Create NavigableCommandList

**Files:**
- Create: `components/ui/NavigableCommandList.tsx`

This component renders command rows as clickable items. It accepts `{ cmd, desc }[]` so descriptions can be shown in the help list. It is stateless — all interaction is via callbacks.

> Note: The spec defines `commands: string[]` for this component, but the implementation uses `{ cmd: string; desc: string }[]` to preserve descriptions in the help list. This is an intentional divergence from the spec for UX reasons.

- [ ] **Step 1: Create the component**

```tsx
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
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/NavigableCommandList.tsx
git commit -m "feat: add NavigableCommandList for clickable command rows"
```

---

### Task 4: Create CommandDropdown

**Files:**
- Create: `components/ui/CommandDropdown.tsx`

Floating overlay above the input. Stateless. Renders the filtered command list with keyboard highlight and mouse hover support.

- [ ] **Step 1: Create the component**

```tsx
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
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/CommandDropdown.tsx
git commit -m "feat: add CommandDropdown autocomplete overlay"
```

---

## Chunk 3: Terminal integration

### Task 5: Update HelpSection to use NavigableCommandList

**Files:**
- Modify: `components/ui/terminal-sections/HelpSection.tsx`

`HelpSection` keeps its own `helpCommands` array with descriptions. It accepts an optional `onCommandSelect` prop and passes it to `NavigableCommandList`. When not provided, clicks are disabled.

- [ ] **Step 1: Replace the full file with this**

```tsx
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
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: No errors. (The existing call `<HelpSection />` in the terminal component passes no props — this is fine since `onCommandSelect` is optional. It will be updated in Task 6.)

- [ ] **Step 3: Commit**

```bash
git add components/ui/terminal-sections/HelpSection.tsx
git commit -m "feat: make HelpSection commands clickable via NavigableCommandList"
```

---

### Task 6: Integrate all features into the terminal component

**Files:**
- Modify: `components/ui/interactive-portfolio-terminal-component.tsx`

**Key design decision — eliminating circular deps:**

The original `commands` map was a plain object inside the component body. The `help` command needs to call `runCommand` (to handle clicks), but `runCommand` needs `commands`. To break this cycle cleanly:

- All command factories except `help` and `clear` are defined as a **static constant outside the component**. They never change.
- `help` and `clear` are handled as special cases inside `runCommand`.
- `runCommand` is wrapped in `useCallback` with `[]` deps, giving it a stable reference after mount.
- There is no `useMemo` for the commands map — just a static object.

This approach requires **deleting the existing `const commands` block entirely** before adding the new code.

- [ ] **Step 1: Replace the full file**

Replace `components/ui/interactive-portfolio-terminal-component.tsx` entirely with the following:

```tsx
'use client'

import { useState, useRef, useEffect, useMemo, useCallback, type ReactNode } from 'react'
import { WelcomeSection } from './terminal-sections/WelcomeSection'
import { HelpSection } from './terminal-sections/HelpSection'
import { AboutSection } from './terminal-sections/AboutSection'
import { ProjectsSection } from './terminal-sections/ProjectsSection'
import { SkillsSection } from './terminal-sections/SkillsSection'
import { ExperienceSection } from './terminal-sections/ExperienceSection'
import { EducationSection } from './terminal-sections/EducationSection'
import { ContactSection } from './terminal-sections/ContactSection'
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
]

// Static component factories — defined outside component to avoid re-creation on render.
// Does not include 'help' (needs runCommand callback) or 'clear' (resets state directly).
const STATIC_COMMANDS: Record<string, () => ReactNode> = {
  'about':      () => <AboutSection />,
  'projects':   () => <ProjectsSection />,
  'skills':     () => <SkillsSection />,
  'experience': () => <ExperienceSection />,
  'education':  () => <EducationSection />,
  'contact':    () => <ContactSection />,
}

export default function PortfolioTerminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '/welcome', output: <WelcomeSection />, isSystem: true },
  ])
  const [currentCommand, setCurrentCommand] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1)
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

  // runCommand — stable reference (useCallback with [] deps).
  // Uses a ref to access setHistory/setCurrentCommand/etc without listing them as deps.
  // 'help' and 'clear' are handled inline; all other commands delegate to STATIC_COMMANDS.
  const runCommand = useCallback((cmd: string) => {
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
              aria-expanded={dropdownOpen}
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
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 3: Run dev server and manually test all interactions**

```bash
npm run dev
```

Test checklist:
- [ ] Type `ex` → dropdown shows `experience`, `education` (both start with `e` → `ex`)
- [ ] Press `Tab` → input fills with the first match
- [ ] Press `Enter` → that section renders
- [ ] Arrow down through dropdown → items highlight one at a time
- [ ] Arrow up from top of dropdown (index 0) → dropdown closes
- [ ] After dropdown closes, ArrowUp navigates command history (skipping system entries)
- [ ] ArrowDown with dropdown closed navigates history forward
- [ ] Type `expierecnce`, press `Enter` → yellow prompt "Did you mean `experience`? (y/n)" appears; input turns yellow with placeholder
- [ ] Press `y` → experience section renders, mode resets to normal
- [ ] Repeat typo, press `Enter` then `n` → help list renders with clickable commands
- [ ] Press `Escape` during confirmation → same as `n`
- [ ] Click a command in the help list → that section renders
- [ ] Type `zzzzz`, press `Enter` → "Command not found" (no suggestion because distance > 3)
- [ ] Type `clear`, press `Enter` → terminal resets to welcome
- [ ] ArrowUp after several commands → replays user commands only (not system entries)

- [ ] **Step 4: Commit**

```bash
git add components/ui/interactive-portfolio-terminal-component.tsx
git commit -m "feat: integrate autocomplete, typo detection, and mode state machine"
```

---

### Task 7: Final build verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No errors (the `eslint-disable-line react-hooks/exhaustive-deps` comment on `useCallback` is intentional and acceptable — `runCommand` is designed to be stable).

- [ ] **Step 3: Commit any lint fixes if needed**

```bash
git add -A
git commit -m "chore: fix lint issues from autocomplete integration"
```
