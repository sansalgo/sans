"use client"

import { copyText } from "@/utils/copy"
import { Type } from "lucide-react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/base/ui/context-menu"
import { toast } from "@/components/base/ui/toast"

import { getMarkSVG, SiteMark } from "./site-mark"
import { getWordmarkSVG } from "./site-wordmark"

export function SiteContextMenu({ children }: { children: React.ReactNode }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-fit">
        <ContextMenuItem
          onClick={() => {
            copyText(getMarkSVG())
            toast.add({ type: "success", title: "Mark as SVG copied" })
          }}
        >
          <SiteMark />
          Copy Mark as SVG
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => {
            copyText(getWordmarkSVG())
            toast.add({ type: "success", title: "Logotype as SVG copied" })
          }}
        >
          <Type />
          Copy Logotype as SVG
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default SiteContextMenu
