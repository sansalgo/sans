import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles — the single source of truth. Icons are
 * bound separately in `social-link-icons.tsx` (keyed by the same `SocialName`),
 * so adding a profile here forces the icon map to stay in sync at compile time.
 */
export const SOCIAL = {
  x: {
    title: "X",
    handle: "@sansovert",
    href: "https://x.com/sansovert",
    sameAs: true,
  },
  github: {
    title: "GitHub",
    handle: "sansalgo",
    href: "https://github.com/sansalgo",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "sansovert",
    href: "https://linkedin.com/in/sansovert",
    sameAs: true,
  },
  dailydotdev: {
    title: "daily.dev",
    handle: "@yourhandle",
    href: "https://app.daily.dev/yourhandle",
    sameAs: true,
    hidden: true,
  },
  discord: {
    title: "Discord",
    handle: "sansovert",
    href: "https://discord.com/users/1541459461908992072",
  },
  youtube: {
    title: "YouTube",
    handle: "@yourhandle",
    href: "https://www.youtube.com/@yourhandle",
    sameAs: true,
    hidden: true,
  },
  instagram: {
    title: "Instagram",
    handle: "@sansovert",
    href: "https://instagram.com/sansovert",
    sameAs: true,
  },
  reddit: {
    title: "Reddit",
    handle: "u/sansovert",
    href: "https://reddit.com/user/sansovert",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
)
  .map(([name, profile]) => ({ name, ...profile }))
  .filter((link) => !link.hidden)
