import { CircleCheckBigIcon } from "lucide-react"

/**
 * Per-component icons, keyed by doc slug. Upstream hand-draws a bespoke icon
 * for each of its 40+ components; with one registered component so far, this
 * is a single entry — add more as components are registered.
 */
const COMPONENT_ICONS: Record<string, React.ReactNode> = {
  "claude-spinner": <CircleCheckBigIcon />,
}

export function ComponentIcon({ slug }: { slug: string }) {
  return COMPONENT_ICONS[slug] ?? <CircleCheckBigIcon />
}
