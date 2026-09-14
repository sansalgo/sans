import type { Metadata } from "next"
import Link from "next/link"
import { Grip, LayoutDashboard } from "lucide-react"

import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { Button } from "@/components/base/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { Index } from "@/registry/__index__"

import { GridItem } from "./grid-item"

const title = "Component Showcase"
const description = "Pixel-perfect, uniquely crafted."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/components/showcase",
  },
  openGraph: {
    url: "/components/showcase",
    type: "website",
    images: {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [ogImage],
  },
}

// Upstream hand-imports one named demo per showcased component (~25 of
// them) and hand-lays-out the masonry grid to match each demo's shape. With
// a single registered component so far, that's not worth hardcoding — this
// walks the registry index for every "registry:example" entry instead, so
// the grid grows on its own as more demos are registered.
const demoEntries = Object.values(Index)
  .filter((item): item is (typeof Index)[string] => item.type === "registry:example")
  .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }))

export default function ComponentsShowcasePage() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Components",
            href: "/components",
          },
          {
            name: "Component Showcase",
            href: "/components/showcase",
          },
        ])}
      />

      <PageHeading>
        <PageHeadingTagline>Component Showcase</PageHeadingTagline>
        <PageHeadingTitle>Pixel-perfect, uniquely crafted.</PageHeadingTitle>
      </PageHeading>

      <div className="flex items-center justify-end gap-1 p-1">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                className="size-7 border-none text-muted-foreground"
                variant="ghost"
                size="icon-sm"
                nativeButton={false}
                render={<Link href="/components" />}
                aria-label="List"
              >
                <Grip />
              </Button>
            }
          />
          <TooltipContent>
            <p>List</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                className="size-7"
                variant="outline"
                size="icon-sm"
                aria-label="Showcase"
              >
                <LayoutDashboard />
              </Button>
            }
          />
          <TooltipContent>
            <p>Showcase</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="screen-line-bottom h-px" />

      <div className="grid auto-rows-[minmax(--spacing(42),auto)] grid-cols-1 gap-1 p-1 md:grid-cols-3">
        {demoEntries.map((item) => {
          const Component = item.component

          return (
            <GridItem key={item.name}>
              <Component />
            </GridItem>
          )
        })}
      </div>
    </>
  )
}
