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
