import { BriefcaseBusinessIcon, CodeXmlIcon } from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

/** Placeholder work history — replace with your own. */
export const EXPERIENCES: Experience[] = [
  {
    id: "your-company",
    companyName: "Your Company",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    companyWebsite: "https://example.com",
    location: "Remote",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "Software Engineer",
        employmentPeriod: {
          start: "01.2024",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: `- Describe your responsibilities and impact here.
- Add another bullet for a key project or achievement.`,
        skills: ["TypeScript", "React", "Next.js"],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "previous-company",
    companyName: "Previous Company",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    location: "Remote",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "Junior Developer",
        employmentPeriod: {
          start: "01.2022",
          end: "12.2023",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: "- Describe your role and accomplishments here.",
        skills: ["JavaScript", "CSS"],
      },
    ],
  },
]
