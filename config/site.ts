import type { Route } from "next"

import type { NavItem } from "@/types/nav"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const LICENSE = {
  name: "MIT License",
  url: "https://github.com/ncdai/chanhdai.com/blob/main/LICENSE",
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

// Components, Blocks, Blog, and Sponsors panels have been removed/hidden
// from the homepage, so there are no top-level nav links right now.
export const MAIN_NAV: NavItem<Route>[] = []

export const MOBILE_NAV: NavItem<Route>[] = [
  {
    title: "Home",
    href: "/",
  },
  ...MAIN_NAV,
]

export const X_HANDLE = SOCIAL.x.handle
export const GITHUB_USERNAME = SOCIAL.github.handle
// Placeholders — point these at your own repo once you publish this fork.
export const SOURCE_CODE_GITHUB_REPO = "your-username/your-repo"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/your-username/your-repo"

export const UTM_PARAMS = {
  utm_source: SITE_INFO.url,
}
