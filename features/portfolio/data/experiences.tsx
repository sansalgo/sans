import { CodeXmlIcon } from "lucide-react"

import { DilazIcon, WebchirpyIcon } from "@/components/icons"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "webchirpy",
    companyName: "Webchirpy",
    companyIcon: <WebchirpyIcon />,
    companyWebsite: "https://webchirpy.com",
    positions: [
      {
        id: "1",
        title: "Senior Developer",
        employmentPeriod: {
          start: "10.2023",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: `- Deliver full-stack web development across 7–8 concurrent client projects, working independently on some and leading a 3-person team on others.
- Introduced Next.js and React to the company's stack, moving primary development off Django/HTML and cutting project setup time by roughly 40%.
- Own core order-management features on a B2B e-commerce platform: a multi-level (L1–L4) approval workflow, GRN tracking across the order lifecycle, and a cXML punchout integration for enterprise procurement.
- Architected an ordering platform end-to-end — Django REST Framework/MySQL on AWS (EC2, S3, Nginx) with a React/Vite frontend spanning web, iOS, and Android.
- Established Git branching workflows and CI/CD pipelines adopted across client engagements, reducing deployment issues by around 30%.`,
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Django",
          "PostgreSQL",
          "AWS",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "dilaz-fashion",
    companyName: "Dilaz Fashion",
    companyIcon: <DilazIcon />,
    companyWebsite: "https://www.dilazfashion.com/",
    positions: [
      {
        id: "1",
        title: "Developer",
        employmentPeriod: {
          start: "08.2022",
          end: "10.2023",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: `- Built Myunde, a men's essentials e-commerce platform, from the ground up using Django and React, shipping the MVP in 3–4 months with a 4-member team.
- Led the frontend migration from React to Next.js in 1 month to improve SEO and organic discoverability.`,
        skills: ["Django", "React", "Next.js"],
      },
    ],
  },
]
