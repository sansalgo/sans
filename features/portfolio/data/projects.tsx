import { BoxIcon } from "lucide-react"

import type { Project } from "@/features/portfolio/types/projects"

/** Placeholder projects — replace with your own. */
export const PROJECTS: Project[] = [
  {
    id: "example-project",
    title: "Example Project",
    period: {
      start: "01.2026",
    },
    link: "https://example.com",
    skills: ["TypeScript", "Next.js", "Tailwind CSS"],
    description: "A short description of what this project does and why it matters.",
    icon: <BoxIcon />,
    isExpanded: true,
  },
]
