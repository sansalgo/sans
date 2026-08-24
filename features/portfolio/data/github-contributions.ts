import "server-only"

import type { Activity } from "@/registry/components/contribution-graph"

/**
 * Placeholder contribution history. The upstream project fetches this from a
 * companion API tied to its own GitHub account/credentials, which this fork
 * doesn't have — swap this for a real data source (or your own API) when
 * ready.
 */
function generatePlaceholderContributions(): Activity[] {
  const activities: Activity[] = []
  const today = new Date()
  const start = new Date(today)
  start.setDate(start.getDate() - 364)

  // Deterministic pseudo-random sequence so the graph looks the same on
  // every render instead of shifting on each request.
  let seed = 42
  const next = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }

  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const roll = next()
    const count = roll > 0.55 ? Math.round(roll * 10) : 0
    const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4

    activities.push({
      date: d.toISOString().slice(0, 10),
      count,
      level,
    })
  }

  return activities
}

export async function getGitHubContributions(): Promise<Activity[]> {
  return generatePlaceholderContributions()
}
