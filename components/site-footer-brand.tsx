"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { SITE_INFO } from "@/config/site"

export function SiteFooterInteractiveLogotype() {
  const shouldReduceMotion = useReducedMotion()

  const gradientXRaw = useMotionValue(0.5)
  const gradientX = useSpring(useTransform(gradientXRaw, [0, 1], [0, 1000]), {
    stiffness: 150,
    damping: 25,
  })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return

    const containerRect = event.currentTarget.getBoundingClientRect()
    gradientXRaw.set(
      (event.clientX - containerRect.left) / containerRect.width
    )
  }

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return
    gradientXRaw.set(0.5)
  }

  return (
    <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
      <div
        className="overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full items-center justify-center py-8">
          <svg
            className="container h-auto w-full max-w-[80%]"
            viewBox="0 0 1000 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="100"
              textAnchor="middle"
              fontFamily="var(--font-sans, sans-serif)"
              fontSize="96"
              fontWeight="600"
              fill="url(#site-footer-logotype-gradient)"
            >
              {SITE_INFO.name}
            </text>

            <defs>
              <motion.linearGradient
                id="site-footer-logotype-gradient"
                x1={gradientX}
                y1="0"
                x2="1000"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.625"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-px w-[50%] max-w-full -translate-x-1/2 dark:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0) 0%, rgba(228, 228, 231, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
        aria-hidden
      />
    </div>
  )
}
