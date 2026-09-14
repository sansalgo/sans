/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
// Hand-maintained equivalent of what chanhdai.com's `scripts/build-registry.mts`
// would generate. That script scans registry.json + registry/examples for
// dozens of items; with a single registered component it isn't worth porting
// the generator itself — this file mirrors its exact output shape by hand.
// Add an entry here whenever a new component (and its demo) is registered.

import * as React from "react"

export const Index: Record<string, any> = {
  "claude-spinner": {
    name: "claude-spinner",
    description:
      "A reverse-engineered recreation of the Claude Code CLI's terminal spinner — animated glyph, status verb, elapsed time, and token counter.",
    type: "registry:ui",
    files: [
      {
        path: "registry/components/claude-spinner/claude-spinner.tsx",
        type: "registry:ui",
        target: "",
      },
      {
        path: "registry/components/claude-spinner/claude-spinner.css",
        type: "registry:file",
        target: "components/ui/claude-spinner.css",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import(
        "@/registry/components/claude-spinner/claude-spinner.tsx"
      )
      const exportName =
        Object.keys(mod).find(
          (key) => typeof mod[key] === "function" || typeof mod[key] === "object"
        ) || "claude-spinner"
      return { default: mod.default || mod[exportName] }
    }),
    categories: ["effects"],
    meta: undefined,
  },
  "claude-spinner-demo": {
    name: "claude-spinner-demo",
    description: "",
    type: "registry:example",
    files: [
      {
        path: "registry/examples/claude-spinner-demo.tsx",
        type: "registry:example",
        target: "",
      },
    ],
    component: React.lazy(async () => {
      const mod = await import("@/registry/examples/claude-spinner-demo.tsx")
      const exportName =
        Object.keys(mod).find(
          (key) => typeof mod[key] === "function" || typeof mod[key] === "object"
        ) || "claude-spinner-demo"
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
}
