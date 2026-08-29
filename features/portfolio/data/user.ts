import type { User } from "@/features/portfolio/types/user"

import { shuffledSpinnerVerbs } from "./spinner-verbs"

/**
 * Placeholder profile data. This is a fresh fork of chanhdai.com's layout —
 * swap every field below for your own details before publishing.
 */
export const USER: User = {
  firstName: "Santhoshkumar",
  lastName: "Sakthivel",
  displayName: "Santhoshkumar Sakthivel",
  username: "jordan",
  gender: "male",
  pronouns: "he/him",
  bio: "Building things for the web. Small details matter.",
  flipSentences: shuffledSpinnerVerbs,
  address: "Tiruppur, Tamil Nadu",
  // Base64-encoded values — encode/decode via
  // https://t.io.vn/base64-string-converter
  phoneNumberB64: "KzkxOTM2MTc0NjU2Ng==",
  emailB64: "c2Fuc0BzYW5zb3JpZ2luLmNvbQ", // hello@example.com — replace with yours
  website: "http://sans.sansorigin.com",
  jobTitle: "Software Engineer",
  jobs: [
    {
      title: "Software Engineer",
      company: "Webchirpy",
      website: "https://example.com",
      experienceId: "your-company",
    },
  ],
  about: `- I'm Santhoshkumar Sakthivel (SanS) — a Software Engineer with 4+ years of experience building clean, fast, and interactive web applications.
- Curious by nature, I enjoy exploring new technologies and turning that curiosity into practical, real-world solutions.
`,
  avatar: "https://avatar.vercel.sh/jordan",
  avatarVariants: {
    lightOff: "https://avatar.vercel.sh/jordan",
    lightOn: "https://avatar.vercel.sh/jordan",
    darkOff: "https://avatar.vercel.sh/jordan",
    darkOn: "https://avatar.vercel.sh/jordan",
  },
  ogImage: "https://avatar.vercel.sh/jordan",
  timeZone: "Asia/Calcutta",
  keywords: ["jordan rivera", "software engineer", "portfolio"],
  dateCreated: "2026-01-01",
}
