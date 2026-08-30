import type { Education } from "@/features/portfolio/types/education"

export const EDUCATION: Education[] = [
  {
    id: "bharathiar-university-masters",
    school: "Bharathiar University",
    degree: "Master's degree",
    fieldOfStudy: "Computer Science",
    period: {
      start: "02.2024",
      end: "Present",
    },
    description:
      "- Built Ditto, a local-first digital twin studio that creates persona simulations from WhatsApp chat exports using local LLMs (Ollama) and vector embeddings (ChromaDB).",
    skills: ["Next.js", "TypeScript", "Ollama", "ChromaDB", "RAG"],
  },
  {
    id: "bharathiar-university-bachelors",
    school: "Bharathiar University",
    degree: "Bachelor's degree",
    fieldOfStudy: "Computer Science",
    period: {
      start: "06.2019",
      end: "06.2022",
    },
    description:
      "- Built Radius, a movie streaming (OTT) platform with Django and MySQL, featuring HLS video streaming, Stripe payment integration, and a collaborative-filtering recommendation system.\n- Built a Python CLI tool that walks through classic lab exercises, using a class-inheritance chain to auto-print the Aim, Algorithm, Program, Output, and Result for each from an interactive menu.",
    skills: ["Django", "MySQL", "Python"],
  },
]
