import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles — the single source of truth. Icons are
 * bound separately in `social-link-icons.tsx` (keyed by the same `SocialName`),
 * so adding a profile here forces the icon map to stay in sync at compile time.
 */
export const SOCIAL = {
  x: {
    title: "X",
    handle: "@yourhandle",
    href: "https://x.com/yourhandle",
    sameAs: true,
  },
  github: {
    title: "GitHub",
    handle: "yourhandle",
    href: "https://github.com/yourhandle",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "yourhandle",
    href: "https://linkedin.com/in/yourhandle",
    sameAs: true,
  },
  dailydotdev: {
    title: "daily.dev",
    handle: "@yourhandle",
    href: "https://app.daily.dev/yourhandle",
    sameAs: true,
  },
  discord: {
    title: "Discord",
    handle: "yourhandle",
    href: "https://discord.com",
  },
  youtube: {
    title: "YouTube",
    handle: "@yourhandle",
    href: "https://www.youtube.com/@yourhandle",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
