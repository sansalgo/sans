"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Modeled after the Claude Code CLI binary (@anthropic-ai/claude-code).
// Glyph set for non-Ghostty terminals — Ghostty gets "✳" instead of "*".
const GLYPHS = ["·", "✢", "*", "✶", "✻", "✽"]
const CYCLE_MS = 2000 // one full ease-in/ease-out sweep across the glyph set
const TICK_MS = 100 // real CLI ticks state at 100ms (50ms while "requesting")

function ease(phase: number) {
  return (1 - Math.cos(2 * Math.PI * phase)) / 2
}

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
}

function formatTokenCount(count: number) {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = () => setReduced(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return reduced
}

export type ClaudeSpinnerProps = Omit<
  React.ComponentProps<"div">,
  "children" | "color"
> & {
  /**
   * Status text shown next to the glyph, e.g. "Reading files".
   * @defaultValue "Thinking" */
  label?: string
  /**
   * Glyph and label color. Any CSS color, e.g. "#d97757" or "var(--primary)".
   * @defaultValue "#d97757" */
  color?: string
  /**
   * Color of the elapsed/tokens/sub-status text.
   * @defaultValue "var(--muted-foreground)" */
  mutedColor?: string
  /**
   * Hides the elapsed-time counter.
   * @defaultValue false */
  hideElapsed?: boolean
  /** Shows a "↓ Nk tokens" counter when provided. */
  tokens?: number
  /** Shows extra status text when provided, e.g. "still thinking". */
  subStatus?: string
  /** Forces reduced-motion behavior regardless of the OS setting. */
  reducedMotion?: boolean
}

export function ClaudeSpinner({
  label = "Thinking",
  color,
  mutedColor,
  hideElapsed = false,
  tokens,
  subStatus,
  reducedMotion,
  className,
  style,
  ...props
}: ClaudeSpinnerProps) {
  const osReducedMotion = usePrefersReducedMotion()
  const isReducedMotion = reducedMotion ?? osReducedMotion

  const [elapsedMs, setElapsedMs] = React.useState(0)
  const elapsedSec = Math.floor(elapsedMs / 1000)

  React.useEffect(() => {
    const start = Date.now()
    const timer = setInterval(() => {
      setElapsedMs(Date.now() - start)
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [])

  const phase = (elapsedMs % CYCLE_MS) / CYCLE_MS
  const glyph = isReducedMotion
    ? "●"
    : GLYPHS[Math.round(ease(phase) * (GLYPHS.length - 1))]

  const metaParts: string[] = []
  if (!hideElapsed) metaParts.push(formatElapsed(elapsedSec))
  if (tokens !== undefined) {
    metaParts.push(`↓ ${formatTokenCount(tokens)} tokens`)
  }
  if (subStatus) metaParts.push(subStatus)

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex max-w-full items-start gap-2 font-mono text-sm tabular-nums",
        "[--color:#d97757] [--muted-color:var(--muted-foreground)]",
        className
      )}
      style={
        {
          ...(color && { "--color": color }),
          ...(mutedColor && { "--muted-color": mutedColor }),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <span
        className={cn(
          "w-[1em] shrink-0 text-center font-semibold text-(--color)",
          isReducedMotion && "animate-pulse"
        )}
      >
        {glyph}
      </span>

      {/* Label and meta flow as one line of text so narrow screens wrap
          naturally, keeping each meta part (e.g. "↓ 1.2k tokens") intact. */}
      <span className="min-w-0 wrap-break-word">
        <span className="font-medium text-(--color)">{label}…</span>

        {metaParts.length > 0 && (
          <span className="text-(--muted-color)">
            {" "}
            {metaParts.map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && " · "}
                <span className="whitespace-nowrap">
                  {i === 0 && "("}
                  {part}
                  {i === metaParts.length - 1 && ")"}
                </span>
              </React.Fragment>
            ))}
          </span>
        )}
      </span>
    </div>
  )
}

export default ClaudeSpinner
