import type { BlogPost } from "@/features/portfolio/types/blog"

/**
 * Placeholder posts. Swap for real content (an MDX/CMS-backed data source,
 * for example) when you're ready to write.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "getting-started",
    metadata: {
      title: "Getting started",
      createdAt: "2026-06-01",
      new: true,
    },
  },
  {
    slug: "building-in-public",
    metadata: {
      title: "Building in public",
      createdAt: "2026-04-18",
    },
  },
  {
    slug: "design-notes",
    metadata: {
      title: "Design notes",
      createdAt: "2026-02-10",
    },
  },
  {
    slug: "on-craft",
    metadata: {
      title: "On craft",
      createdAt: "2025-11-22",
    },
  },
]

export function getBlogPosts(): BlogPost[] {
  return BLOG_POSTS
}
