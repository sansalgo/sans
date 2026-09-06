"use client"

import { useLayoutEffect, useRef, useState } from "react"

import { InlineScript } from "@/components/inline-script"

/**
 * Renders the widest of `variants` (ordered longest to shortest) that fits
 * without wrapping in the space left over from the row it shares with its
 * siblings (e.g. a verified badge icon). Measures actual rendered pixel
 * widths via hidden probes, so it stays correct across fonts/zoom levels
 * without hand-tuned breakpoints.
 *
 * `id` must be unique on the page: it addresses the root/probe/visible nodes
 * from the pre-hydration script (see `getResponsiveNameInlineScript`), which
 * has to run after every DOM sibling this component shares a row with, so
 * the caller renders that script itself once the whole row exists.
 */
export function ResponsiveName({
  id,
  variants,
  className,
}: {
  id: string
  variants: readonly string[]
  className?: string
}) {
  const rootRef = useRef<HTMLHeadingElement>(null)
  const probeRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [index, setIndex] = useState(variants.length - 1)

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

      const fitIndex = pickFitIndex(
        variants.length,
        available,
        (i) => probeRefs.current[i]?.scrollWidth ?? 0
      )

      setIndex(fitIndex)
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
    <h1 id={id} ref={rootRef} className={className}>
      {variants.map((text, i) => (
        <span
          key={text}
          id={`${id}-probe-${i}`}
          ref={(el) => {
            probeRefs.current[i] = el
          }}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap"
        >
          {text}
        </span>
      ))}
      <span
        id={`${id}-visible`}
        suppressHydrationWarning
        className="whitespace-nowrap"
      >
        {variants[index]}
      </span>
    </h1>
  )
}

/**
 * Given the number of variants and the space available for them, returns
 * the index of the widest variant whose probe width fits — or the last
 * (shortest) variant if none do. Pure and self-contained (globals only) so
 * it can be called directly during client-side measurement as well as
 * serialized via `.toString()` into the pre-hydration script below.
 */
function pickFitIndex(
  variantsLength: number,
  available: number,
  getProbeWidth: (index: number) => number
) {
  for (let i = 0; i < variantsLength; i++) {
    if (getProbeWidth(i) <= available) return i
  }
  return variantsLength - 1
}

function runResponsiveNameScript(
  rootId: string,
  variants: readonly string[],
  pickFitIndex: (
    variantsLength: number,
    available: number,
    getProbeWidth: (index: number) => number
  ) => number
) {
  try {
    const root = document.getElementById(rootId)
    const parent = root?.parentElement
    if (!root || !parent) return

    const gap = parseFloat(getComputedStyle(parent).columnGap || "0")
    const siblings = Array.from(parent.children).filter(
      (child) => child !== root
    )
    const siblingsWidth = siblings.reduce(
      (sum, child) => sum + child.getBoundingClientRect().width,
      0
    )
    const available = parent.clientWidth - siblingsWidth - gap * siblings.length

    const fitIndex = pickFitIndex(variants.length, available, (i) => {
      const probe = document.getElementById(`${rootId}-probe-${i}`)
      return probe ? probe.scrollWidth : 0
    })

    const visible = document.getElementById(`${rootId}-visible`)
    if (visible) visible.textContent = variants[fitIndex]
  } catch {}
}

function getResponsiveNameInlineScript(
  rootId: string,
  variants: readonly string[]
) {
  return `(${runResponsiveNameScript.toString()})(${JSON.stringify(rootId)},${JSON.stringify(variants)},${pickFitIndex.toString()})`
}

/**
 * Blocking inline script that paints the correctly-fitted name before
 * hydration on the initial document load, so the shortest-variant fallback
 * text is never visible even briefly. Must be rendered after every sibling
 * `id`'s row shares its available width with (e.g. a badge icon rendered
 * after `ResponsiveName`) has already been parsed, so the caller places it
 * at the end of that row rather than inside `ResponsiveName` itself.
 *
 * A component (not the plain `getResponsiveNameInlineScript` function)
 * because this module is client-only: a Server Component may render this
 * as JSX, but can't call a plain function exported from a "use client" file.
 */
export function ResponsiveNameInlineScript({
  id,
  variants,
}: {
  id: string
  variants: readonly string[]
}) {
  return <InlineScript html={getResponsiveNameInlineScript(id, variants)} />
}
