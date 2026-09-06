// Shared isometric geometry for the profile header's box-breakdown mark. Coordinates
// are the mark's own path data, split into 4 independent glyphs, each extruded as a
// single clean isometric slab - not a grid of unit cubes - so there are no internal
// seams to hide. Every edge here is a genuine silhouette edge; "wall" says which of
// those get a vertical face. The camera azimuth (see iso() below) makes moving right
// through the glyphs sweep up and to the right on screen, so the walls facing the
// camera are the west- and south-facing ones.

export const CELL_W = 24
export const CELL_H = CELL_W / 2
export const EXTRUDE = CELL_W * 0.5

interface GlyphEdge {
  readonly a: readonly [number, number]
  readonly b: readonly [number, number]
  readonly wall: "west" | "south" | null
}

interface GlyphRing {
  readonly points: ReadonlyArray<readonly [number, number]>
  readonly edges: readonly GlyphEdge[]
}

type Glyph = readonly GlyphRing[]

export const GLYPHS: readonly Glyph[] = [
  [
    {
      points: [
        [6, 0],
        [11, 0],
        [11, 5],
        [10, 5],
        [10, 3],
        [7, 3],
        [7, 5],
        [6, 5],
      ],
      edges: [
        { a: [6, 0], b: [11, 0], wall: null },
        { a: [11, 0], b: [11, 5], wall: null },
        { a: [11, 5], b: [10, 5], wall: "south" },
        { a: [10, 5], b: [10, 3], wall: "west" },
        { a: [10, 3], b: [7, 3], wall: "south" },
        { a: [7, 3], b: [7, 5], wall: null },
        { a: [7, 5], b: [6, 5], wall: "south" },
        { a: [6, 5], b: [6, 0], wall: "west" },
      ],
    },
    {
      points: [
        [7, 2],
        [10, 2],
        [10, 1],
        [7, 1],
      ],
      edges: [
        { a: [7, 2], b: [10, 2], wall: null },
        { a: [10, 2], b: [10, 1], wall: "west" },
        { a: [10, 1], b: [7, 1], wall: "south" },
        { a: [7, 1], b: [7, 2], wall: null },
      ],
    },
  ],
  [
    {
      points: [
        [5, 1],
        [1, 1],
        [1, 2],
        [5, 2],
        [5, 5],
        [0, 5],
        [0, 4],
        [4, 4],
        [4, 3],
        [0, 3],
        [0, 0],
        [5, 0],
      ],
      edges: [
        { a: [5, 1], b: [1, 1], wall: "south" },
        { a: [1, 1], b: [1, 2], wall: null },
        { a: [1, 2], b: [5, 2], wall: null },
        { a: [5, 2], b: [5, 5], wall: null },
        { a: [5, 5], b: [0, 5], wall: "south" },
        { a: [0, 5], b: [0, 4], wall: "west" },
        { a: [0, 4], b: [4, 4], wall: null },
        { a: [4, 4], b: [4, 3], wall: "west" },
        { a: [4, 3], b: [0, 3], wall: "south" },
        { a: [0, 3], b: [0, 0], wall: "west" },
        { a: [0, 0], b: [5, 0], wall: null },
        { a: [5, 0], b: [5, 1], wall: null },
      ],
    },
  ],
  [
    {
      points: [
        [12, 0],
        [15, 0],
        [15, 4],
        [16, 4],
        [16, 0],
        [17, 0],
        [17, 5],
        [14, 5],
        [14, 1],
        [13, 1],
        [13, 5],
        [12, 5],
      ],
      edges: [
        { a: [12, 0], b: [15, 0], wall: null },
        { a: [15, 0], b: [15, 4], wall: null },
        { a: [15, 4], b: [16, 4], wall: null },
        { a: [16, 4], b: [16, 0], wall: "west" },
        { a: [16, 0], b: [17, 0], wall: null },
        { a: [17, 0], b: [17, 5], wall: null },
        { a: [17, 5], b: [14, 5], wall: "south" },
        { a: [14, 5], b: [14, 1], wall: "west" },
        { a: [14, 1], b: [13, 1], wall: "south" },
        { a: [13, 1], b: [13, 5], wall: null },
        { a: [13, 5], b: [12, 5], wall: "south" },
        { a: [12, 5], b: [12, 0], wall: "west" },
      ],
    },
  ],
  [
    {
      points: [
        [23, 0],
        [23, 1],
        [19, 1],
        [19, 2],
        [23, 2],
        [23, 5],
        [18, 5],
        [18, 4],
        [22, 4],
        [22, 3],
        [18, 3],
        [18, 0],
      ],
      edges: [
        { a: [23, 0], b: [23, 1], wall: null },
        { a: [23, 1], b: [19, 1], wall: "south" },
        { a: [19, 1], b: [19, 2], wall: null },
        { a: [19, 2], b: [23, 2], wall: null },
        { a: [23, 2], b: [23, 5], wall: null },
        { a: [23, 5], b: [18, 5], wall: "south" },
        { a: [18, 5], b: [18, 4], wall: "west" },
        { a: [18, 4], b: [22, 4], wall: null },
        { a: [22, 4], b: [22, 3], wall: "west" },
        { a: [22, 3], b: [18, 3], wall: "south" },
        { a: [18, 3], b: [18, 0], wall: "west" },
        { a: [18, 0], b: [23, 0], wall: null },
      ],
    },
  ],
]

// Camera azimuth: moving through the glyphs (+gx) sweeps up and to the right on
// screen, matching a left-bottom-to-right-top reading of the mark.
export function iso(gx: number, gy: number, z: number): readonly [number, number] {
  return [(gx + gy) * (CELL_W / 2), (gy - gx) * (CELL_H / 2) - z]
}

export function toPath(points: ReadonlyArray<readonly [number, number]>): string {
  return (
    points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ") +
    " Z"
  )
}

export interface RenderGlyph {
  readonly key: string
  readonly topPath: string
  readonly wallFaces: readonly { readonly key: string; readonly d: string }[]
}

export const RENDER_GLYPHS: readonly RenderGlyph[] = GLYPHS.map((glyph, gi) => {
  const topPath = glyph
    .map((ring) => toPath(ring.points.map(([x, y]) => iso(x, y, EXTRUDE))))
    .join(" ")

  const wallFaces: { key: string; d: string }[] = []

  glyph.forEach((ring, ri) => {
    ring.edges.forEach((edge, ei) => {
      if (!edge.wall) return
      const aTop = iso(edge.a[0], edge.a[1], EXTRUDE)
      const bTop = iso(edge.b[0], edge.b[1], EXTRUDE)
      const aBot = iso(edge.a[0], edge.a[1], 0)
      const bBot = iso(edge.b[0], edge.b[1], 0)
      wallFaces.push({ key: `${gi}-${ri}-${ei}`, d: toPath([aTop, bTop, bBot, aBot]) })
    })
  })

  return { key: `glyph-${gi}`, topPath, wallFaces }
})

export const BOUNDS = (() => {
  const xs: number[] = []
  const ys: number[] = []
  for (const glyph of GLYPHS) {
    for (const ring of glyph) {
      for (const [gx, gy] of ring.points) {
        for (const z of [0, EXTRUDE]) {
          const [x, y] = iso(gx, gy, z)
          xs.push(x)
          ys.push(y)
        }
      }
    }
  }
  const pad = 12
  const minX = Math.min(...xs) - pad
  const minY = Math.min(...ys) - pad
  const width = Math.max(...xs) - minX + pad
  const height = Math.max(...ys) - minY + pad
  return { minX, minY, width, height }
})()

export const GLOW_RADIUS = Math.max(BOUNDS.width, BOUNDS.height) * 0.35

// The individual 13px cells (public/logo.svg's own rects) that make up the mark,
// grouped into the edges shared between two adjacent filled cells - the seams the
// clean slab rendering above normally hides. Revealed on hover.
const INTERIOR_UNIT_EDGES: ReadonlyArray<
  readonly [readonly [number, number], readonly [number, number]]
> = [
  [[1, 0], [1, 1]], [[1, 1], [0, 1]], [[1, 2], [0, 2]], [[2, 0], [2, 1]],
  [[1, 2], [1, 3]], [[3, 0], [3, 1]], [[2, 2], [2, 3]], [[4, 0], [4, 1]],
  [[1, 4], [1, 5]], [[3, 2], [3, 3]], [[2, 4], [2, 5]], [[4, 2], [4, 3]],
  [[3, 4], [3, 5]], [[5, 3], [4, 3]], [[7, 0], [7, 1]], [[7, 1], [6, 1]],
  [[4, 4], [4, 5]], [[5, 4], [4, 4]], [[7, 2], [6, 2]], [[8, 0], [8, 1]],
  [[7, 2], [7, 3]], [[7, 3], [6, 3]], [[9, 0], [9, 1]], [[7, 4], [6, 4]],
  [[8, 2], [8, 3]], [[10, 0], [10, 1]], [[9, 2], [9, 3]], [[11, 1], [10, 1]],
  [[10, 2], [10, 3]], [[11, 2], [10, 2]], [[11, 3], [10, 3]], [[13, 0], [13, 1]],
  [[13, 1], [12, 1]], [[11, 4], [10, 4]], [[13, 2], [12, 2]], [[14, 0], [14, 1]],
  [[13, 3], [12, 3]], [[15, 1], [14, 1]], [[13, 4], [12, 4]], [[15, 2], [14, 2]],
  [[15, 3], [14, 3]], [[17, 1], [16, 1]], [[15, 4], [14, 4]], [[17, 2], [16, 2]],
  [[15, 4], [15, 5]], [[17, 3], [16, 3]], [[19, 0], [19, 1]], [[19, 1], [18, 1]],
  [[16, 4], [16, 5]], [[17, 4], [16, 4]], [[19, 2], [18, 2]], [[20, 0], [20, 1]],
  [[19, 2], [19, 3]], [[21, 0], [21, 1]], [[20, 2], [20, 3]], [[22, 0], [22, 1]],
  [[19, 4], [19, 5]], [[21, 2], [21, 3]], [[20, 4], [20, 5]], [[22, 2], [22, 3]],
  [[21, 4], [21, 5]], [[23, 3], [22, 3]], [[22, 4], [22, 5]], [[23, 4], [22, 4]],
]

export const INTERIOR_EDGES: readonly { readonly key: string; readonly d: string }[] =
  INTERIOR_UNIT_EDGES.map(([a, b], i) => ({
    key: `interior-${i}`,
    d: `M${iso(a[0], a[1], EXTRUDE)
      .map((n) => n.toFixed(2))
      .join(",")} L${iso(b[0], b[1], EXTRUDE)
      .map((n) => n.toFixed(2))
      .join(",")}`,
  }))
