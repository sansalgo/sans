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
  username: "sansalgo",
  gender: "male",
  pronouns: "he/him",
  bio: "Curious by nature — building things for the web.",
  flipSentences: shuffledSpinnerVerbs,
  address: "Tiruppur, Tamil Nadu",
  // Base64-encoded values — encode/decode via
  // https://t.io.vn/base64-string-converter
  phoneNumberB64: "KzkxOTM2MTc0NjU2Ng==",
  emailB64: "c2Fuc0BzYW5zb3JpZ2luLmNvbQ", // hello@example.com — replace with yours
  website: "http://sans.sansorigin.com",
  jobTitle: "Software Developer",
  jobs: [
    {
      title: "Senior Developer",
      company: "Webchirpy",
      website: "https://webchirpy.com",
      experienceId: "webchirpy",
    },
  ],
  about: `- I'm Santhoshkumar Sakthivel (SanS) — a Software Developer with 4+ years of experience building clean, fast, and interactive web applications.
- Curious by nature, I enjoy exploring new technologies and turning that curiosity into practical, real-world solutions.
`,
  avatar: "/s-profile-light-off.png",
  avatarVariants: {
    lightOff: "/s-profile-light-off.png",
    lightOn: "/s-profile-light-on.png",
    darkOff: "/s-profile-dark-off.png",
    darkOn: "/s-profile-dark-on.png",
  },
  ogImage: "/s-profile-light-off.png",
  timeZone: "Asia/Calcutta",
  keywords: ["sans", "sansalgo", "software developer", "portfolio"],
  dateCreated: "2026-01-01",
}
