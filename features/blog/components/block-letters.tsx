import { Fragment } from "react"

import { cn } from "@/lib/utils"

/**
 * Block-letter diagrams for the SANS logo case study.
 *
 * Glyphs are drawn as rows of cells on a module grid:
 *   "#" filled block · "*" highlighted block · "." empty module
 * Every color comes from theme tokens, so diagrams follow light/dark mode.
 */

export const GLYPHS = {
  S: ["#####", "#....", "#####", "....#", "#####"],
  A: ["#####", "#...#", "#####", "#...#", "#...#"],
  N: ["###.#", "#.#.#", "#.#.#", "#.#.#", "#.###"],
  "N-v0": ["##..#", "#.#.#", "#..##", "#...#", "#...#"],
  "N-v1": ["#...#", "##..#", "#.#.#", "#..##", "#...#"],
  "N-v2": ["#####", "#...#", "#...#", "#...#", "#...#"],
  "S-rotated": ["#.###", "#.#.#", "#.#.#", "#.#.#", "###.#"],
  "S-flipped": ["###.#", "#.#.#", "#.#.#", "#.#.#", "#.###"],
  "N-joins": ["#*#.#", "#.#.#", "#.#.#", "#.#.#", "#.#*#"],
  "S-rotated-joins": ["#.#*#", "#.#.#", "#.#.#", "#.#.#", "#*#.#"],
  empty: [".....", ".....", ".....", ".....", "....."],
  block: ["#"],
  row: ["#####"],
} satisfies Record<string, string[]>

export type GlyphName = keyof typeof GLYPHS

type EmptyTone = "none" | "grid" | "fill"

/** One square subpath per matching cell, all wound the same way. */
function cellsPath(rows: string[], char: string, unit: number) {
  return rows
    .flatMap((row, y) =>
      row
        .split("")
        .map((cell, x) =>
          cell === char ? `M${x * unit} ${y * unit}h${unit}v${unit}h-${unit}Z` : ""
        )
    )
    .join("")
}

type FigureItem = {
  glyph?: GlyphName | string[]
  word?: GlyphName[]
  label?: string
  /** Renders a "?" in place of a glyph. */
  unknown?: boolean
}

type FigurePreset = {
  items: FigureItem[]
  empty?: EmptyTone
  arrows?: boolean
}

const SANS: GlyphName[] = ["S", "A", "N", "S"]

/**
 * Figures for the SANS case study. MDX content can't pass JS expressions as
 * props (next-mdx-remote blocks them), so posts reference these by name.
 */
const FIGURES = {
  wordmark: { items: [{ word: SANS }], empty: "none" },
  "wordmark-grid": { items: [{ word: SANS }], empty: "grid" },
  "wordmark-negative": { items: [{ word: SANS }], empty: "fill" },
  "block-to-word": {
    arrows: true,
    empty: "none",
    items: [
      { glyph: "block", label: "Block" },
      { glyph: "row", label: "Combine" },
      { glyph: "S", label: "Build" },
      { word: SANS, label: "SANS" },
    ],
  },
  "missing-n": {
    arrows: true,
    items: [
      { glyph: "S", label: "S" },
      { glyph: "A", label: "A" },
      { unknown: true, label: "N" },
      { glyph: "S", label: "S" },
    ],
  },
  "n-attempts": {
    items: [
      { glyph: "N-v0", label: "Attempt 01" },
      { glyph: "N-v1", label: "Attempt 02" },
      { glyph: "N-v2", label: "Attempt 03" },
    ],
  },
  "s-to-n": {
    arrows: true,
    items: [
      { glyph: "S", label: "S" },
      { glyph: "S-rotated-joins", label: "Rotated 90°" },
      { glyph: "N-joins", label: "Flipped" },
    ],
  },
} satisfies Record<string, FigurePreset>

export type FigureName = keyof typeof FIGURES

/** Joins letters with a one-module gap, the spacing used by the wordmark. */
function composeWord(letters: GlyphName[], gap = 1) {
  const glyphs = letters.map((name) => GLYPHS[name])
  const height = Math.max(...glyphs.map((g) => g.length))
  const spacer = ".".repeat(gap)

  return Array.from({ length: height }, (_, y) =>
    glyphs.map((g) => g[y] ?? ".".repeat(g[0].length)).join(spacer)
  )
}

export function BlockGlyph({
  glyph,
  word,
  empty = "none",
  className,
  title,
}: {
  /** A named glyph, or raw rows of cells. */
  glyph?: GlyphName | string[]
  /** Letters composed into a word with one-module spacing. */
  word?: GlyphName[]
  /** How empty modules render: hidden, as grid lines, or as tinted blocks. */
  empty?: EmptyTone
  className?: string
  title?: string
}) {
  const rows = word
    ? composeWord(word)
    : typeof glyph === "string"
      ? GLYPHS[glyph]
      : (glyph ?? GLYPHS.empty)

  const unit = 10
  const cols = Math.max(...rows.map((r) => r.length))
  const width = cols * unit
  const height = rows.length * unit

  return (
    <svg
      viewBox={`-0.5 -0.5 ${width + 1} ${height + 1}`}
      className={cn("h-auto w-full overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {empty === "fill" &&
        rows.map((row, y) =>
          row.split("").map((cell, x) =>
            cell === "." ? (
              <rect
                key={`${x}-${y}`}
                x={x * unit}
                y={y * unit}
                width={unit}
                height={unit}
                className="fill-muted stroke-muted-foreground/40"
                strokeWidth={0.5}
              />
            ) : null
          )
        )}

      {/* Blocks of one color share a single path, so the browser fills them as
          one shape and no anti-aliasing seams appear between neighbours. */}
      <path d={cellsPath(rows, "#", unit)} className="fill-foreground" />
      <path d={cellsPath(rows, "*", unit)} className="fill-info" />

      {empty === "grid" && (
        <g className="stroke-muted-foreground/40" strokeWidth={0.5}>
          {Array.from({ length: cols + 1 }, (_, i) => (
            <line key={`v${i}`} x1={i * unit} y1={0} x2={i * unit} y2={height} />
          ))}
          {Array.from({ length: rows.length + 1 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={i * unit} x2={width} y2={i * unit} />
          ))}
        </g>
      )}
    </svg>
  )
}

export function BlockFigure({
  name,
  caption,
  className,
}: {
  name: FigureName
  caption?: React.ReactNode
  className?: string
}) {
  const figure: FigurePreset = FIGURES[name]
  const { items, empty = "grid", arrows = false } = figure

  return (
    <figure
      className={cn(
        "not-prose my-6 overflow-hidden rounded-xl inset-ring-1 inset-ring-border/64",
        className
      )}
    >
      <div className="flex items-end justify-center gap-3 bg-surface px-4 py-8 sm:gap-6 sm:px-8">
        {items.map((item, i) => (
          <Fragment key={i}>
            {arrows && i > 0 && (
              <span
                className="self-center pb-5 font-mono text-sm text-muted-foreground"
                aria-hidden
              >
                →
              </span>
            )}

            <div
              className={cn(
                "flex min-w-0 flex-col items-center gap-3",
                !item.word
                  ? "max-w-24 flex-1"
                  : items.length === 1
                    ? // A lone wordmark keeps roughly the block size of the
                      // single-letter figures instead of filling the width.
                      "max-w-sm flex-1"
                    : "flex-4"
              )}
            >
              <div className="flex w-full flex-1 items-center justify-center">
                {item.unknown ? (
                  <div className="relative w-full">
                    <BlockGlyph glyph="empty" empty="grid" />
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-2xl text-muted-foreground">
                      ?
                    </span>
                  </div>
                ) : (
                  <BlockGlyph
                    glyph={item.glyph}
                    word={item.word}
                    empty={empty}
                    title={item.label}
                  />
                )}
              </div>

              {item.label && (
                <span className="font-mono text-xs text-muted-foreground">
                  {item.label}
                </span>
              )}
            </div>
          </Fragment>
        ))}
      </div>

      {caption && (
        <figcaption className="border-t border-border/64 px-4 py-2.5 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function NameSplit() {
  const parts = [
    { keep: "San", rest: "thoshkumar" },
    { keep: "S", rest: "akthivel" },
  ]

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl inset-ring-1 inset-ring-border/64">
      <p className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2 bg-surface px-4 py-10 text-center font-mono text-lg sm:text-xl">
        {parts.map((part, i) => (
          <Fragment key={part.rest}>
            {i > 0 && <span className="text-muted-foreground">+</span>}
            <span>
              <span className="font-semibold text-foreground">{part.keep}</span>
              <span className="text-muted-foreground/60">{part.rest}</span>
            </span>
          </Fragment>
        ))}

        <span className="text-muted-foreground" aria-hidden>
          →
        </span>

        <span className="font-semibold text-foreground">
          {parts.map((part) => part.keep).join("")}
        </span>
      </p>
    </figure>
  )
}

const SPECS = [
  { label: "Module", value: "1 × 1" },
  { label: "Letter", value: "5 × 5" },
  { label: "Letter spacing", value: "1 module" },
  { label: "Wordmark", value: "23 × 5" },
]

export function BlockSpecs() {
  return (
    <dl className="not-prose my-6 grid grid-cols-2 overflow-hidden rounded-xl inset-ring-1 inset-ring-border/64 sm:grid-cols-4">
      {SPECS.map((spec) => (
        <div
          key={spec.label}
          className="flex flex-col gap-1 border-border/64 p-4 not-last:border-r max-sm:nth-2:border-r-0 max-sm:nth-[n+3]:border-t"
        >
          <dt className="font-mono text-xs text-muted-foreground">
            {spec.label}
          </dt>
          <dd className="text-lg font-medium">{spec.value}</dd>
        </div>
      ))}
    </dl>
  )
}
