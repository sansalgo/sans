import "server-only"

import { unstable_cache } from "next/cache"

import { GITHUB_USERNAME } from "@/config/site"
import type { Activity } from "@/registry/components/contribution-graph"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

const getCachedContributions = unstable_cache(
  async (username: string): Promise<Activity[]> => {
    const apiUrl = process.env.NEXT_PUBLIC_GITHUB_CONTRIBUTIONS_API_URL
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_GITHUB_CONTRIBUTIONS_API_URL is not set")
    }

    const res = await fetch(`${apiUrl}/${username}?y=last`)
    if (!res.ok) {
      return []
    }
    const data = (await res.json()) as GitHubContributionsResponse
    return data.contributions ?? []
  },
  ["github-contributions"],
  { revalidate: 86400 } // Cache for 1 day (86400 seconds)
)

export async function getGitHubContributions(): Promise<Activity[]> {
  return getCachedContributions(GITHUB_USERNAME)
}
