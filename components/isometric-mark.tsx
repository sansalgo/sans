"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

/** A simple isometric cube with mouse-tracked lighting. */
export function IsometricMark() {
  const id = useId()
  const ids = {
    facePattern: `isometric-face-pattern-${id}`,
    stroke: `isometric-stroke-${id}`,
    radialGradient: `isometric-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, 300]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 260]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox="0 0 300 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="160"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-200 400L500 -140" />
        <path d="M550 420L-150 -120" />
      </g>

      <motion.g
        variants={{
          normal: { transform: "translate(0px, 0px)" },
          pressed: { transform: "translate(0px, 10px)" },
        }}
        transition={transition}
      >
        {/* Top face */}
        <path
          className="fill-background"
          d="M150 20 L270 90 L150 160 L30 90 Z"
        />
        <path d="M150 20 L270 90 L150 160 L30 90 Z" fill={`url(#${ids.facePattern})`} />

        {/* Left face */}
        <path className="fill-background" d="M30 90 L150 160 L150 240 L30 170 Z" />
        {/* Right face */}
        <path
          className="fill-background"
          d="M270 90 L150 160 L150 240 L270 170 Z"
        />
      </motion.g>

      <motion.path
        id={ids.stroke}
        variants={{
          normal: {
            d: "M150 20 L270 90 L270 170 L150 240 L30 170 L30 90 Z M150 20 L150 160 M30 90 L150 160 L270 90",
          },
          pressed: {
            d: "M150 30 L270 100 L270 170 L150 240 L30 170 L30 100 Z M150 30 L150 160 M30 100 L150 160 L270 100",
          },
        }}
        transition={transition}
      />

      <use href={`#${ids.stroke}`} stroke="var(--stroke)" />
      <use href={`#${ids.stroke}`} stroke={`url(#${ids.radialGradient})`} />
    </motion.svg>
  )
}
