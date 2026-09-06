"use client"

import { useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"

import { BOUNDS, GLOW_RADIUS, INTERIOR_EDGES, RENDER_GLYPHS } from "@/lib/iso-mark"

/**
 * The isometric mark, rendered as its underlying slabs with a hover x-ray: moving the
 * pointer over it reveals the seams between the mark's original unit cells and traces
 * a light that follows the cursor along the mark's edges.
 */
export function IsometricMark() {
  const svgRef = useRef<SVGSVGElement>(null)
  const hatchId = useId()
  const glowId = useId()
  const [glow, setGlow] = useState({ x: 0, y: 0, active: false })

  const toLocalPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current
    const ctm = svg?.getScreenCTM()
    if (!svg || !ctm) return null
    const point = svg.createSVGPoint()
    point.x = clientX
    point.y = clientY
    const local = point.matrixTransform(ctm.inverse())
    return { x: local.x, y: local.y }
  }

  const handlePointerEnter = (event: ReactPointerEvent<SVGSVGElement>) => {
    const local = toLocalPoint(event.clientX, event.clientY)
    setGlow((current) => ({ x: local?.x ?? current.x, y: local?.y ?? current.y, active: true }))
  }

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const local = toLocalPoint(event.clientX, event.clientY)
    if (!local) return
    setGlow({ x: local.x, y: local.y, active: true })
  }

  const handlePointerLeave = () => {
    setGlow((current) => ({ ...current, active: false }))
  }

  return (
    <svg
      ref={svgRef}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_22%,var(--background))]"
      viewBox={`${BOUNDS.minX} ${BOUNDS.minY} ${BOUNDS.width} ${BOUNDS.height}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden
    >
      <defs>
        <pattern id={hatchId} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="5" height="5" fill="var(--background)" />
          <line x1="0" y1="0" x2="0" y2="5" stroke="var(--pattern)" strokeWidth="1" />
        </pattern>
        <radialGradient
          id={glowId}
          gradientUnits="userSpaceOnUse"
          cx={glow.x}
          cy={glow.y}
          r={GLOW_RADIUS}
        >
          <stop offset="0%" className="dark:[stop-color:#fff]" stopColor="var(--color-zinc-700)" />
          <stop
            offset="100%"
            className="dark:[stop-color:var(--color-zinc-600)]"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      <rect
        x={BOUNDS.minX}
        y={BOUNDS.minY}
        width={BOUNDS.width}
        height={BOUNDS.height}
        fill="var(--background)"
      />

      {RENDER_GLYPHS.map((glyph) => (
        <g key={glyph.key}>
          {glyph.wallFaces.map((face) => (
            <path
              key={face.key}
              d={face.d}
              fill="var(--background)"
              stroke="var(--stroke)"
              strokeWidth="1"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path
            d={glyph.topPath}
            fillRule="evenodd"
            fill={`url(#${hatchId})`}
            stroke="var(--stroke)"
            strokeWidth="1"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}

      <g className="transition-opacity duration-400" style={{ opacity: glow.active ? 1 : 0 }}>
        {INTERIOR_EDGES.map((edge) => (
          <path
            key={edge.key}
            d={edge.d}
            fill="none"
            stroke="var(--stroke)"
            strokeWidth="0.75"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      <g className="transition-opacity duration-350" style={{ opacity: glow.active ? 1 : 0 }}>
        {RENDER_GLYPHS.map((glyph) => (
          <g key={`${glyph.key}-glow`}>
            {glyph.wallFaces.map((face) => (
              <path
                key={`${face.key}-glow`}
                d={face.d}
                fill="none"
                stroke={`url(#${glowId})`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path
              d={glyph.topPath}
              fill="none"
              stroke={`url(#${glowId})`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </g>
    </svg>
  )
}
