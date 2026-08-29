/** A profile's identity is its key in the `SOCIAL` registry, not a field here. */
export type SocialProfile = {
  title: string
  handle: string
  href: string
  /** Opt-in: include this profile in JSON-LD `sameAs` (public profile page). */
  sameAs?: boolean
  /** Keep the profile in the registry but leave it out of the rendered list. */
  hidden?: boolean
}
