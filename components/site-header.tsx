import dynamic from "next/dynamic"
import Link from "next/link"

import { SiteMark } from "@/components/site-mark"
import { ThemeToggle } from "@/components/theme-toggle"

const SiteContextMenu = dynamic(() => import("@/components/site-context-menu"))

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 max-w-screen overflow-x-clip bg-background px-2">
      <div className="screen-line-top screen-line-bottom mx-auto flex h-(--header-height) items-center gap-2 border-r border-line pr-2 group-has-data-[slot=layout-wide]/layout:container after:z-1 after:bg-border sm:gap-4 md:max-w-3xl">
        <SiteContextMenu>
          <Link href="/" aria-label="Home">
            <SiteMark className="h-8 shrink-0" />
          </Link>
        </SiteContextMenu>

        <div className="flex-1" />

        <ThemeToggle />
      </div>
    </header>
  )
}
