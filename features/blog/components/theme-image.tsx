import type { ImageProps } from "next/image"
import Image from "next/image"

import { cn } from "@/lib/utils"

/** Renders `src` in light mode and `srcDark` in dark mode. */
export function ThemeImage({
  src,
  srcDark,
  alt,
  width = 1200,
  height = 630,
  className,
  ...props
}: Omit<ImageProps, "src"> & { src: string; srcDark?: string }) {
  const shared = { width, height, unoptimized: true, ...props }

  if (!srcDark) {
    return <Image src={src} alt={alt} className={className} {...shared} />
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        className={cn(className, "dark:hidden")}
        {...shared}
      />
      <Image
        src={srcDark}
        alt={alt}
        className={cn(className, "hidden dark:block")}
        {...shared}
      />
    </>
  )
}
