import { BookmarkCategory } from "@/features/portfolio/types/bookmarks"
import type { Bookmark } from "@/features/portfolio/types/bookmarks"

export const BOOKMARKS: Bookmark[] = [
  {
    title: "A Clock That Doesn't Snap",
    url: "https://ethanniser.com/blog/a-clock-that-doesnt-snap",
    author: "Ethan Niser",
    category: BookmarkCategory.ARTICLE,
    bookmarkedAt: "2026-09-06",
  },
]
