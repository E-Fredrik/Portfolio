const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export interface ProjectMeta {
  slug: string;
  featured: boolean;
  year: string;
  role: string;
  tags: string[];
  browserUrl: string;
  url?: string;
  repoUrl?: string;
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
}

/**
 * Non-translatable project metadata.
 * The array order must match `projects.items[]` in en.json / id.json.
 */
export const projects: ProjectMeta[] = [
  {
    slug: "ciputra-color-run",
    featured: true,
    year: "2026",
    role: "PDD Website Coordinator",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    browserUrl: "ciputrarun.com",
    images: [
      {
        src: `${BASE}/assets/images/cirun.jpg`,
        alt: "Color Run ticketing queue interface",
        width: 520,
        height: 340,
      },
    ],
  },
  {
    slug: "imperial-f7",
    featured: true,
    year: "2025",
    role: "Full Stack Developer",
    tags: ["Laravel Blade", "MySQL", "PHP", "Bootstrap JS & CSS"],
    browserUrl: "imperialf7.com",
    images: [
      {
        src: `${BASE}/assets/images/imperial1.png`,
        alt: "Imperial F7 Kost Management System interface",
        width: 520,
        height: 340,
      },
      {
        src: `${BASE}/assets/images/imperial2.png`,
        alt: "Imperial F7 Kost Management System dashboard",
        width: 520,
        height: 340,
      },
    ],
  },
  {
    slug: "nudge",
    featured: false,
    year: "2025",
    role: "Android Developer",
    tags: ["Kotlin", "PostgreSQL", "REST API"],
    browserUrl: "nudgeapp.com",
    images: [
      {
        src: `${BASE}/assets/images/nudge.png`,
        alt: "Nudge app interface",
        width: 520,
        height: 550,
      },
    ],
  },
  {
    slug: "navi-digital-guestbook",
    featured: true,
    year: "2025",
    role: "Full Stack Developer",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    browserUrl: "naviguestbook.com",
    images: [
      {
        src: `${BASE}/assets/images/navi.png`,
        alt: "NAVI Digital Guestbook dashboard interface",
        width: 520,
        height: 340,
      },
    ],
  },
  {
    slug: "larva",
    featured: true,
    year: "2026",
    role: "iOS Developer",
    tags: ["SwiftUI", "Firebase"],
    browserUrl: "larvaapp.com",
    images: [
      {
        src: `${BASE}/assets/images/Larva.jpeg`,
        alt: "Larva app interface",
        width: 250,
        height: 500,
      },
    ],
  },
  {
    slug: "shutterspace",
    featured: false,
    year: "2026",
    role: "iOS Developer",
    tags: ["SwiftUI", "Firebase"],
    browserUrl: "shutterspace.com",
    images: [
      {
        src: `${BASE}/assets/images/ShutterSpace1.jpeg`,
        alt: "ShutterSpace app interface",
        width: 250,
        height: 500,
      },
      {
        src: `${BASE}/assets/images/ShutterSpace2.jpeg`,
        alt: "ShutterSpace app interface",
        width: 250,
        height: 500,
      },
    ],
  },
];

/** All project slugs (used by generateStaticParams) */
export const allSlugs = projects.map((p) => p.slug);
