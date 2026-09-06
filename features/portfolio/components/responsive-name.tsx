"use client"

import { useLayoutEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Renders the widest of `variants` (ordered longest to shortest) that fits
 * without wrapping in the space left over from the row it shares with its
 * siblings (e.g. a verified badge icon). Measures actual rendered pixel
 * widths via hidden probes, so it stays correct across fonts/zoom levels
 * without hand-tuned breakpoints.
 */
export function ResponsiveName({
  variants,
  className,
}: {
  variants: readonly string[]
  className?: string
}) {
  const rootRef = useRef<HTMLHeadingElement>(null)
  const probeRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [index, setIndex] = useState(variants.length - 1)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    const parent = root?.parentElement
    if (!root || !parent) return

    let cancelled = false

    const measure = () => {
      if (cancelled) return

      const gap = parseFloat(getComputedStyle(parent).columnGap || "0")
      const siblings = Array.from(parent.children).filter(
        (child) => child !== root
      )
      const siblingsWidth = siblings.reduce(
        (sum, child) => sum + child.getBoundingClientRect().width,
        0
      )
      const available =
        parent.clientWidth - siblingsWidth - gap * siblings.length

      const fitIndex = variants.findIndex((_, i) => {
        const width = probeRefs.current[i]?.scrollWidth ?? 0
        return width <= available
      })

      setIndex(fitIndex === -1 ? variants.length - 1 : fitIndex)
      setReady(true)
    }

    measure()

    // Custom fonts (e.g. Geist) often finish loading after this first
    // measurement, rendering text wider and overlapping the sibling badge —
    // re-measure once the swap settles.
    document.fonts?.ready.then(measure)

    const observer = new ResizeObserver(measure)
    observer.observe(parent)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [variants])

  return (
    <h1 ref={rootRef} className={className}>
      {variants.map((text, i) => (
        <span
          key={text}
          ref={(el) => {
            probeRefs.current[i] = el
          }}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap"
        >
          {text}
        </span>
      ))}
      <span className={cn("whitespace-nowrap", !ready && "text-muted-foreground")}>
        {ready ? variants[index] : "Measuring…"}
      </span>
    </h1>
  )
}
