import { SITE_INFO } from "@/config/site"

export function SiteWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 128"
      fill="none"
      {...props}
    >
      <text
        x="0"
        y="92"
        fill="currentColor"
        fontFamily="var(--font-sans, sans-serif)"
        fontSize="96"
        fontWeight="600"
      >
        {SITE_INFO.name}
      </text>
    </svg>
  )
}

export function getWordmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 128" fill="none"><text x="0" y="92" fill="currentColor" font-family="sans-serif" font-size="96" font-weight="600">${SITE_INFO.name}</text></svg>`
}
