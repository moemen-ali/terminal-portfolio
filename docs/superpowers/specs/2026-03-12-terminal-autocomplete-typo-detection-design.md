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

## Dependencies

`fast-levenshtein` is already in `node_modules` but ships no TypeScript types and has no `@types` package. **Replace it with `fastest-levenshtein`**, which ships its own type declarations. This requires running `npm install fastest-levenshtein`.

---

## State

Added to `PortfolioTerminal`:

| Field | Type | Purpose |
|---|---|---|
| `mode` | `'normal' \| 'awaiting-confirmation'` | Controls keyboard interpretation |
| `dropdownIndex` | `number` | Highlighted index in the dropdown (-1 = none) |
| `pendingTypo` | `string \| null` | The suggested correction when in `awaiting-confirmation` mode |

**`dropdownOpen` is not stored as state.** It is derived: the dropdown is open when `mode === 'normal'` AND `filteredCommands.length > 0` AND `currentCommand.length > 0`. This avoids sync bugs between an explicit flag and the derived list.

Derived (not stored):
- `filteredCommands` — `Object.keys(commands)` filtered by **prefix match** against `currentCommand` (i.e., `cmd.startsWith(currentCommand.toLowerCase())`). Prefix match is more natural for a terminal — `"ex"` matches `"experience"` but not `"clear"`.

### History entries

The `HistoryEntry` type gains an optional `isSystem: boolean` field to tag entries added by the terminal itself (welcome message, typo prompts) as distinct from user-submitted commands. History navigation (ArrowUp/ArrowDown) skips entries where `isSystem === true`.

---

## New Files

### `lib/fuzzy-match.ts`

Single exported function:

```ts
findClosestCommand(input: string, commands: string[]): string | null
```

- Uses `fastest-levenshtein`
- Excludes `"clear"` from candidates — `clear` wipes all history and would be a destructive surprise if triggered by typo correction
- Returns the command with the lowest edit distance if that distance is ≤ 3
- Returns `null` if no command is close enough or if input is empty

### `components/ui/CommandDropdown.tsx`

Floating overlay rendered above the terminal input line. Stateless — all state lives in the parent.

Props:
- `commands: string[]` — filtered list to display
- `activeIndex: number` — currently highlighted item
- `onSelect: (cmd: string) => void` — called on click or Enter
- `onHover: (index: number) => void` — called on mouse enter per item

ARIA: `role="listbox"` on the container, `role="option"` and `aria-selected` on each item. The input receives `aria-expanded` and `aria-activedescendant` when the dropdown is open. (Full ARIA compliance for screen readers is out of scope but these baseline attributes are included.)

### `components/ui/NavigableCommandList.tsx`

Reusable interactive command list. Used inside `HelpSection` output.

Props:
- `commands: string[]` — list of command names to display
- `onSelect: (cmd: string) => void` — called on click
- `disabled?: boolean` — when `true`, click handlers are no-ops (used when terminal is in `awaiting-confirmation` mode)

Each item renders as a clickable row. No keyboard navigation (arrow keys in history would conflict with command history navigation — keyboard nav is only in the live input area).

---

## Component Changes

| File | Change |
|---|---|
| `interactive-portfolio-terminal-component.tsx` | Add `mode`, `dropdownIndex`, `pendingTypo` state; derive dropdown open from `filteredCommands`; update `handleKeyDown`; render `CommandDropdown` above input; expose `runCommand` callback; pass `commands` list and `onCommandSelect` to `HelpSection`; tag system history entries with `isSystem: true` |
| `terminal-sections/HelpSection.tsx` | Accept `commands: string[]` and `onCommandSelect: (cmd: string) => void` props; render `NavigableCommandList` instead of static hardcoded list |
| `lib/fuzzy-match.ts` | New file |
| `components/ui/CommandDropdown.tsx` | New file |
| `components/ui/NavigableCommandList.tsx` | New file |

---

## Keyboard & Interaction Logic

### Normal mode — while typing

| Key | Behavior |
|---|---|
| Any character | Updates input, re-computes `filteredCommands`, dropdown opens if ≥1 prefix match |
| `ArrowDown` | If dropdown open: move `dropdownIndex` down (clamp at last item, no wrap). If dropdown closed: no-op (ArrowDown in history is only activated when input is empty — existing behavior unchanged) |
| `ArrowUp` | If dropdown open AND `dropdownIndex > 0`: move up. If dropdown open AND `dropdownIndex === 0`: close dropdown (reset `dropdownIndex` to -1), re-enable history navigation. If dropdown closed: existing history navigation behavior |
| `Tab` | If `filteredCommands.length > 0`: fill input with `filteredCommands[0]`, reset `dropdownIndex` to -1 (dropdown closes because input now fully matches). If `filteredCommands` is empty: no-op |
| `Enter` | If `dropdownIndex ≥ 0`: run `filteredCommands[dropdownIndex]`. Else: run `currentCommand` normally (may trigger typo detection) |
| `Escape` | If dropdown open: close dropdown, reset `dropdownIndex` to -1. If dropdown closed: no-op |

### On Enter with unknown command (no dropdown selection)

1. Call `findClosestCommand(input, knownCommands)` (excludes `clear`)
2. **Match found:** append a system history entry `"Did you mean \`X\`? (y/n)"` (tagged `isSystem: true`), set `mode = 'awaiting-confirmation'`, set `pendingTypo = match`
3. **No match:** show existing "Command not found" error, stay in normal mode

### Awaiting-confirmation mode

The input field remains mounted and focused. It is set to `readOnly` with `placeholder="[y/n]"` and styled to communicate it is in a special state (e.g., dim the text cursor, show a yellow border). This keeps focus management simple — no DOM swapping required.

| Key | Behavior |
|---|---|
| `y` or `Enter` | Run `pendingTypo` command, return to `normal` mode, clear `pendingTypo`, clear `currentCommand` |
| `n` or `Escape` | Append `help` output to history (tagged `isSystem: true`), return to `normal` mode, clear `pendingTypo` |
| Any other key | Ignored |

### Help list — click interaction

- Each command name in `HelpSection` output uses `NavigableCommandList`
- Clicking fires `onSelect(cmd)` which calls `runCommand(cmd)` in the parent
- When `mode === 'awaiting-confirmation'`, `NavigableCommandList` receives `disabled={true}` — clicks are ignored
- Arrow keys do **not** navigate the help list in history (would conflict with existing arrow-key command history behavior)

---

## Error Handling

- `findClosestCommand` returns `null` for empty input — no suggestion shown
- `clear` is excluded from typo suggestions — it is destructive and should never be triggered accidentally
- If `pendingTypo` somehow resolves to an unknown command (defensive), fall back to "Command not found" output and reset mode
- Dropdown does not open if `currentCommand` is empty

---

## Out of Scope

- Fuzzy matching inside the dropdown (dropdown uses prefix filter only; fuzzy is only for post-submit typo detection)
- Full screen-reader ARIA compliance for `CommandDropdown` (baseline attributes included)
- Keyboard navigation of help list in history output
- Persisting autocomplete preferences
