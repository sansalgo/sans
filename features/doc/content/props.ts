import type { ComponentProps } from "react"

import type { ClaudeSpinner } from "@/registry/components/claude-spinner"

export type ClaudeSpinnerProps = Omit<
  ComponentProps<typeof ClaudeSpinner>,
  keyof Omit<ComponentProps<"div">, "color">
>
