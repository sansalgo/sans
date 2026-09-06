import { BotIcon, FilmIcon, Gamepad2Icon, WalletIcon } from "lucide-react"

import type { Project } from "@/features/portfolio/types/projects"

export const PROJECTS: Project[] = [
  {
    id: "bee",
    title: "Bee",
    period: {
      start: "07.2026",
    },
    link: "https://github.com/sansalgo/bee",
    skills: ["Next.js", "NestJS", "Socket.io", "PostgreSQL", "Prisma"],
    description:
      "Real-time, turn-based multiplayer word game with drag-and-drop tile placement and a pluggable category system.",
    icon: <Gamepad2Icon />,
    isExpanded: true,
  },
  {
    id: "spot",
    title: "Spot",
    period: {
      start: "04.2026",
    },
    link: "https://spot-ivory-psi.vercel.app",
    skills: ["Next.js", "TypeScript", "Canvas", "Zustand"],
    description:
      "Browser-based pixel animation editor for drawing, sequencing, and exporting frame-by-frame animations.",
    icon: <FilmIcon />,
  },
  {
    id: "figure",
    title: "Figure",
    period: {
      start: "05.2026",
    },
    link: "https://figure-rust.vercel.app",
    skills: ["Next.js", "TypeScript", "Zustand"],
    description:
      "Local-first expense tracker with offline storage and optional Google Drive backup for cross-device sync.",
    icon: <WalletIcon />,
  },
  {
    id: "ditto",
    title: "Ditto",
    period: {
      start: "03.2026",
    },
    link: "https://github.com/sansalgo/ditto",
    skills: ["Python", "Next.js", "Ollama", "ChromaDB", "RAG"],
    description:
      "Digital twin studio generating persona simulations from WhatsApp chat exports using local LLMs and RAG.",
    icon: <BotIcon />,
  },
]
