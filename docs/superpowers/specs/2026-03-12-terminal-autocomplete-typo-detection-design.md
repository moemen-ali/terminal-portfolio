# Terminal Autocomplete & Typo Detection — Design Spec
**Date:** 2026-03-12
**Status:** Approved

---

## Overview

Add two interactive features to the portfolio terminal:

1. **Autocomplete dropdown** — appears as the user types, shows filtered matching commands, supports keyboard navigation (arrows, Tab, Enter) and mouse interaction (hover, click).
2. **Typo detection** — when an unknown command is submitted, fuzzy-match it against known commands and prompt `Did you mean X? (y/n)`. Y runs the command, N shows the help list.

Additionally, the existing static help list rendered by the `help` command becomes **clickable** — clicking any command name in the output runs that command.

---

## Architecture

### Approach: Unified mode state machine

The terminal manages an explicit `mode` field that controls how keyboard input is interpreted. The autocomplete dropdown is a derived UI overlay (not a separate mode) that renders based on typing state.

---

## State

Added to `PortfolioTerminal`:

| Field | Type | Purpose |
|---|---|---|
| `mode` | `'normal' \| 'awaiting-confirmation'` | Controls keyboard interpretation |
| `dropdownOpen` | `boolean` | Whether the autocomplete dropdown is visible |
| `dropdownIndex` | `number` | Highlighted index in the dropdown (-1 = none) |
| `pendingTypo` | `string \| null` | The suggested correction when in `awaiting-confirmation` mode |

Derived (not stored):
- `filteredCommands` — `Object.keys(commands)` filtered by `currentCommand` prefix/substring

---

## New Files

### `lib/fuzzy-match.ts`

Single exported function:

```ts
findClosestCommand(input: string, commands: string[]): string | null
```

- Uses `fast-levenshtein` (already in `node_modules`)
- Returns the command with the lowest edit distance if that distance is ≤ 3
- Returns `null` if no command is close enough

### `components/ui/CommandDropdown.tsx`

Floating overlay rendered above the terminal input line. Stateless — all state lives in the parent.

Props:
- `commands: string[]` — filtered list to display
- `activeIndex: number` — currently highlighted item
- `onSelect: (cmd: string) => void` — called on click or Enter
- `onHover: (index: number) => void` — called on mouse enter per item

### `components/ui/NavigableCommandList.tsx`

Reusable interactive command list. Used inside `HelpSection` output.

Props:
- `commands: string[]` — list of command names to display
- `onSelect: (cmd: string) => void` — called on click

Each item renders as a clickable row. No keyboard navigation (arrow keys in history would conflict with command history navigation — keyboard nav is only in the live input area).

---

## Keyboard & Interaction Logic

### Normal mode — while typing

| Key | Behavior |
|---|---|
| Any character | Updates input, re-filters dropdown, opens dropdown if ≥1 match |
| `ArrowDown` | Moves `dropdownIndex` down through filtered list |
| `ArrowUp` | Moves `dropdownIndex` up through filtered list (or into command history if dropdown closed) |
| `Tab` | Fills input with `filteredCommands[0]`, closes dropdown |
| `Enter` | If `dropdownIndex ≥ 0` → run highlighted command. Else → run `currentCommand` normally |
| `Escape` | Closes dropdown, resets `dropdownIndex` to -1 |

### On Enter with unknown command (no dropdown selection)

1. Call `findClosestCommand(input, knownCommands)`
2. **Match found:** append `"Did you mean X? (y/n)"` to history, set `mode = 'awaiting-confirmation'`, set `pendingTypo = match`
3. **No match:** show existing "Command not found" error, stay in normal mode

### Awaiting-confirmation mode

Input is visually replaced by a `[y/n]` indicator. The input field remains mounted but its `onKeyDown` routes all keys through confirmation logic.

| Key | Behavior |
|---|---|
| `y` or `Enter` | Run `pendingTypo` command, return to normal mode, clear `pendingTypo` |
| `n` or `Escape` | Run `help` command (append its output to history), return to normal mode |
| Any other key | Ignored |

### Help list — click interaction

- Each command name in `HelpSection` output is wrapped in `NavigableCommandList`
- Clicking fires `onSelect(cmd)` which calls the parent's `runCommand(cmd)` function
- Arrow keys do **not** navigate the help list in history (would conflict with existing arrow-key command history behavior)

---

## Component Changes

| File | Change |
|---|---|
| `interactive-portfolio-terminal-component.tsx` | Add `mode`, `dropdownOpen`, `dropdownIndex`, `pendingTypo` state; update `handleKeyDown`; render `CommandDropdown` above input; expose `runCommand` callback |
| `terminal-sections/HelpSection.tsx` | Accept `onCommandSelect` prop; render `NavigableCommandList` instead of static list |
| `lib/fuzzy-match.ts` | New file |
| `components/ui/CommandDropdown.tsx` | New file |
| `components/ui/NavigableCommandList.tsx` | New file |

---

## Error Handling

- `findClosestCommand` returns `null` for empty input — no suggestion shown
- If `pendingTypo` somehow resolves to an unknown command (defensive), fall back to "Command not found" output
- Dropdown does not open if `currentCommand` is empty

---

## Out of Scope

- Fuzzy matching inside the dropdown (dropdown uses prefix/substring filter only; fuzzy is only for post-submit typo detection)
- Keyboard navigation of help list in history output
- Persisting autocomplete preferences
