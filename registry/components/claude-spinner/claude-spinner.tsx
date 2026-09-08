import { useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

import "./claude-spinner.css"

// Modeled after the Claude Code CLI binary (@anthropic-ai/claude-code).
// Glyph set for non-Ghostty terminals — Ghostty gets "✳" instead of "*".
const GLYPHS = ["·", "✢", "*", "✶", "✻", "✽"]
const CYCLE_MS = 2000 // one full ease-in/ease-out sweep across the glyph set
const TICK_MS = 100 // real CLI ticks state at 100ms (50ms while "requesting")

// Colors pulled from the binary's blend targets.
const COLOR_BASE = { r: 217, g: 119, b: 87 } // Claude coral accent
const COLOR_WARNING = { r: 214, g: 158, b: 46 } // amber — long-running turn
const COLOR_ERROR = { r: 171, g: 43, b: 63 } // red — stalled/network issue

// Full verb list extracted from the binary's spinnerVerbs array.
export const VERBS = [
  "Accomplishing", "Actioning", "Actualizing", "Architecting", "Baking", "Beaming", "Beboppin'",
  "Befuddling", "Billowing", "Blanching", "Bloviating", "Boogieing", "Boondoggling", "Booping",
  "Bootstrapping", "Brewing", "Bunning", "Burrowing", "Calculating", "Canoodling", "Caramelizing",
  "Cascading", "Catapulting", "Cerebrating", "Channeling", "Channelling", "Choreographing", "Churning",
  "Clauding", "Coalescing", "Cogitating", "Combobulating", "Composing", "Computing", "Concocting",
  "Considering", "Contemplating", "Cooking", "Crafting", "Creating", "Crunching", "Crystallizing",
  "Cultivating", "Deciphering", "Deliberating", "Determining", "Dilly-dallying", "Discombobulating",
  "Doing", "Doodling", "Drizzling", "Ebbing", "Effecting", "Elucidating", "Embellishing", "Enchanting",
  "Envisioning", "Fermenting", "Fiddle-faddling", "Finagling", "Flambéing", "Flibbertigibbeting",
  "Flowing", "Flummoxing", "Fluttering", "Forging", "Forming", "Frolicking", "Frosting", "Gallivanting",
  "Galloping", "Garnishing", "Generating", "Gesticulating", "Germinating", "Gitifying", "Grooving",
  "Gusting", "Harmonizing", "Hashing", "Hatching", "Herding", "Honking", "Hullaballooing",
  "Hyperspacing", "Ideating", "Imagining", "Improvising", "Incubating", "Inferring", "Infusing",
  "Ionizing", "Jitterbugging", "Julienning", "Kneading", "Leavening", "Levitating", "Lollygagging",
  "Manifesting", "Marinating", "Meandering", "Metamorphosing", "Misting", "Moonwalking", "Moseying",
  "Mulling", "Mustering", "Musing", "Nebulizing", "Nesting", "Newspapering", "Noodling", "Nucleating",
  "Orbiting", "Orchestrating", "Osmosing", "Perambulating", "Percolating", "Perusing", "Philosophising",
  "Photosynthesizing", "Pollinating", "Pondering", "Pontificating", "Pouncing", "Precipitating",
  "Prestidigitating", "Processing", "Proofing", "Propagating", "Puttering", "Puzzling", "Quantumizing",
  "Razzle-dazzling", "Razzmatazzing", "Recombobulating", "Reticulating", "Roosting", "Ruminating",
  "Sautéing", "Scampering", "Schlepping", "Scurrying", "Seasoning", "Shenaniganing", "Shimmying",
  "Simmering", "Skedaddling", "Sketching", "Slithering", "Smooshing", "Sock-hopping", "Spelunking",
  "Spinning", "Sprouting", "Stewing", "Sublimating", "Swirling", "Swooping", "Symbioting",
  "Synthesizing", "Tempering", "Thinking", "Thundering", "Tinkering", "Tomfoolering", "Topsy-turvying",
  "Transfiguring", "Transmuting", "Twisting", "Undulating", "Unfurling", "Unravelling", "Vibing",
  "Waddling", "Wandering", "Warping", "Whatchamacalliting", "Whirlpooling", "Whirring", "Whisking",
  "Wibbling", "Working", "Wrangling", "Zesting", "Zigzagging",
]

// Progressive sub-status once a turn drags on, independent of the random verb.
const SUB_STATUS_THRESHOLDS: [number, string][] = [
  [45000, "almost done thinking"],
  [30000, "thinking some more"],
  [20000, "thinking more"],
  [10000, "still thinking"],
]

function subStatusFor(ms: number) {
  for (const [threshold, text] of SUB_STATUS_THRESHOLDS) {
    if (ms >= threshold) return text
  }
  return "thinking"
}

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
}

// Approximates the CLI's observed output token rate, used to auto-advance the
// token counter when `tokens` isn't controlled by the caller.
const TOKENS_PER_SEC = 16.7

function formatTokenCount(count: number) {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`
}

function ease(phase: number) {
  return (1 - Math.cos(2 * Math.PI * phase)) / 2
}

function lerpColor(a: typeof COLOR_BASE, b: typeof COLOR_BASE, t: number) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  }
}

function rgb(c: { r: number; g: number; b: number }) {
  return `rgb(${c.r},${c.g},${c.b})`
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = () => setReduced(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return reduced
}

export interface ClaudeSpinnerProps {
  /** Overrides the randomly chosen status verb, e.g. "Reading files". */
  label?: string
  /** Blends the glyph color toward red, as the CLI does on a network stall. */
  stalled?: boolean
  /** Hides the elapsed-time counter. */
  hideElapsed?: boolean
  /** Overrides the auto-incrementing "↓ Nk tokens" counter. */
  tokens?: number
  /** Hides the "↓ Nk tokens" counter. */
  hideTokens?: boolean
  /** Hides the progressive "still thinking" sub-status. */
  hideSubStatus?: boolean
  /** Force reduced-motion behavior regardless of the OS setting. */
  reducedMotion?: boolean
  className?: string
}

export function ClaudeSpinner({
  label,
  stalled = false,
  hideElapsed = false,
  tokens,
  hideTokens = false,
  hideSubStatus = false,
  reducedMotion,
  className,
}: ClaudeSpinnerProps) {
  const verb = useMemo(() => label ?? VERBS[Math.floor(Math.random() * VERBS.length)], [label])
  const startRef = useRef(Date.now())
  const osReducedMotion = usePrefersReducedMotion()
  const isReducedMotion = reducedMotion ?? osReducedMotion

  const [elapsedMs, setElapsedMs] = useState(0)
  const [elapsedSec, setElapsedSec] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedMs(Date.now() - startRef.current)
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setElapsedSec(Math.floor(elapsedMs / 1000))
  }, [elapsedMs])

  const thinkingIntensity = Math.min(Math.max((elapsedMs - 10000) / 10000, 0), 1)
  const target = stalled ? COLOR_ERROR : thinkingIntensity > 0 ? COLOR_WARNING : COLOR_BASE
  const intensity = stalled ? 1 : thinkingIntensity
  const color = rgb(lerpColor(COLOR_BASE, target, intensity))

  const phase = (elapsedMs % CYCLE_MS) / CYCLE_MS
  const frameIndex = isReducedMotion ? 0 : Math.round(ease(phase) * (GLYPHS.length - 1))
  const glyph = isReducedMotion ? "●" : GLYPHS[frameIndex]

  const subStatus = subStatusFor(elapsedMs)
  const tokenCount = tokens ?? Math.round(elapsedSec * TOKENS_PER_SEC)

  const metaParts: string[] = []
  if (!hideElapsed) metaParts.push(formatElapsed(elapsedSec))
  if (!hideTokens) metaParts.push(`↓ ${formatTokenCount(tokenCount)} tokens`)
  if (!hideSubStatus) metaParts.push(subStatus)

  return (
    <div className={cn("cc-spinner", className)} role="status" aria-live="polite">
      <span
        className={cn("cc-spinner__glyph", isReducedMotion && "cc-spinner__glyph--pulse")}
        style={{ color }}
      >
        {glyph}
      </span>
      <span className="cc-spinner__label" style={{ color }}>
        {verb}…
      </span>
      {metaParts.length > 0 && (
        <span className="cc-spinner__meta">({metaParts.join(" · ")})</span>
      )}
    </div>
  )
}

export default ClaudeSpinner
