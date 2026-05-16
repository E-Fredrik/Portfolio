import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface ProjectImage {
  /** Path to the image (relative to /public, e.g. "/assets/images/navi-dashboard.png") */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Width of the image in pixels */
  width: number;
  /** Height of the image in pixels */
  height: number;
}

interface Project {
  /** Case study label, e.g. "Case Study 01" */
  label: string;
  /** Project title (supports line breaks via \n) */
  title: string;
  /** Short description paragraph */
  description: string;
  /** Tech stack tags displayed as badges */
  tags: string[];
  /** Images stacked vertically on the left side */
  images: ProjectImage[];
}

/* ------------------------------------------------------------------ */
/*  ✏️  EDIT YOUR PROJECTS HERE                                        */
/*  - Add, remove, or reorder entries in this array                   */
/*  - Each project follows the same template automatically            */
/*  - Images are stacked vertically on the left; adjust width/height  */
/*    per image to control sizing                                     */
/* ------------------------------------------------------------------ */
const PROJECTS: Project[] = [
  {
    label: "Case Study 01",
    title: "Navi",
    description:
      "Event check-in SaaS with token-based consumption pricing. Multi-tenant data isolation via RLS policies. Real-time WebSocket attendance feeds.",
    tags: ["NEXT.JS", "PRISMA", "WEBSOCKET", "SUPABASE"],
    images: [
      {
        src: "/assets/images/Hero.JPG",
        alt: "Navi dashboard showing token consumption",
        width: 520,
        height: 340,
      },
    ],
  },
  {
    label: "Case Study 02",
    title: "Color Run\n2026",
    description:
      "Ciputra University's flagship event portal. Queue-based registration handling 5,000+ concurrent users with Redis pub/sub and optimistic locking to prevent overselling.",
    tags: ["NEXT.JS", "REDIS", "BULL MQ", "POSTGRESQL"],
    images: [
      {
        src: "/assets/images/Hero.JPG",
        alt: "Color Run ticketing queue interface",
        width: 520,
        height: 340,
      },
    ],
  },
  {
    label: "Case Study 03",
    title: "Vault",
    description:
      "Custom OAuth 2.0 identity provider with PKCE flow, refresh token rotation, and RBAC policies. Handles 40k+ monthly active sessions across 6 client applications with sub-100ms token introspection.",
    tags: ["NODE.JS", "REDIS", "POSTGRESQL", "JWT"],
    images: [
      {
        src: "/assets/images/Hero.JPG",
        alt: "Vault session monitor dashboard",
        width: 520,
        height: 340,
      },
    ],
  },
  {
    label: "Case Study 04",
    title: "Pulse",
    description:
      "Real-time analytics pipeline ingesting 8,400 events/sec from client SDKs. Kafka consumers partition data into ClickHouse for sub-second OLAP queries. Custom session stitching algorithm with 99.2% attribution accuracy.",
    tags: ["KAFKA", "CLICKHOUSE", "NEXT.JS", "WEBSOCKET"],
    images: [
      {
        src: "/assets/images/Hero.JPG",
        alt: "Pulse event stream dashboard",
        width: 520,
        height: 340,
      },
    ],
  },
  {
    label: "Case Study 05",
    title: "Forge",
    description:
      "Internal CI/CD orchestration platform. DAG-based pipeline execution with parallel stage scheduling, artifact caching via S3-compatible storage, and Slack/Discord webhook notifications on failure states.",
    tags: ["GO", "DOCKER", "POSTGRESQL", "REDIS"],
    images: [
      {
        src: "/assets/images/Hero.JPG",
        alt: "Forge pipeline execution view",
        width: 520,
        height: 340,
      },
    ],
  },
  {
    label: "Case Study 06",
    title: "Relay",
    description:
      "Centralized webhook ingestion gateway. Signature verification (HMAC-SHA256), exponential backoff retry with dead-letter queues, and fan-out routing to internal consumers. Processes 142k webhooks daily with idempotency guarantees.",
    tags: ["NODE.JS", "BULL MQ", "REDIS", "POSTGRESQL"],
    images: [
      {
        src: "/assets/images/Hero.JPG",
        alt: "Relay webhook endpoints dashboard",
        width: 520,
        height: 340,
      },
    ],
  },
  {
    label: "Case Study 07",
    title: "Atlas",
    description:
      "Monorepo-hosted design system powering 4 production apps. Compound component architecture with composable slots, CSS-variable-driven theming, and automated visual regression testing via Chromatic.",
    tags: ["REACT", "STORYBOOK", "CHROMATIC", "NPM"],
    images: [
      {
        src: "/assets/images/Hero.JPG",
        alt: "Atlas component registry",
        width: 520,
        height: 340,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Project Card (shared between mobile & desktop)                     */
/* ------------------------------------------------------------------ */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  // Render title with \n support
  const titleLines = project.title.split("\n");

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Images Column — on left for even, on right for odd (desktop) */}
      <div
        className={`flex flex-col gap-4 p-8 lg:p-12 justify-center ${
          !isEven ? "lg:order-2" : ""
        }`}
      >
        {project.images.map((img, imgIdx) => (
          <div
            key={imgIdx}
            className="relative w-full overflow-hidden"
            style={{
              maxWidth: `${img.width}px`,
              aspectRatio: `${img.width} / ${img.height}`,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Description Column */}
      <div
        className={`p-8 lg:p-12 flex flex-col justify-center ${
          !isEven ? "lg:order-1" : ""
        }`}
        style={{ borderLeft: isEven ? "1px solid #333333" : "none", borderRight: !isEven ? "1px solid #333333" : "none" }}
      >
        <div>
          <p
            className="text-[#A1A1A6]"
            style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {project.label}
          </p>
          <h3
            className="text-white mt-4"
            style={{
              fontSize: "36px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h3>
          <p
            className="text-[#A1A1A6] mt-4"
            style={{ fontSize: "13px", lineHeight: 1.7 }}
          >
            {project.description}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-4 py-2 text-[#A1A1A6]"
              style={{
                border: "1px solid #333333",
                fontSize: "9px",
                letterSpacing: "0.15em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1 intro + N projects
  const totalPanels = 1 + PROJECTS.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip horizontal scroll on mobile

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const scrollDistance = ((totalPanels - 1) / totalPanels) * 100;

      gsap.to(track, {
        xPercent: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalPanels * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, totalPanels]);

  /* ---------------------------------------------------------------- */
  /*  Mobile: vertical stacked layout                                  */
  /* ---------------------------------------------------------------- */
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="py-24 px-6"
        style={{ background: "#000000", fontFamily: "Inter, sans-serif" }}
      >
        {/* INTRO */}
        <div className="mb-16 max-w-[560px]">
          <p
            className="text-[#A1A1A6]"
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            003 / Project Showcase
          </p>
          <h2
            className="text-white mt-4"
            style={{
              fontSize: "clamp(32px, 8vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Systems I&apos;ve
            <br />
            Shipped.
          </h2>
          <p
            className="text-[#A1A1A6] mt-6"
            style={{ fontSize: "13px", lineHeight: 1.7 }}
          >
            Production-grade architectures handling real traffic, real payments,
            and real edge cases.
          </p>
        </div>

        {/* PROJECT CARDS */}
        {PROJECTS.map((project, index) => (
          <div
            key={project.label}
            className="mb-16 pt-8"
            style={{ borderTop: "1px solid #333333" }}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </section>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Desktop: horizontal scroll layout                                */
  /* ---------------------------------------------------------------- */
  return (
    <section
      ref={sectionRef}
      className="h-screen overflow-hidden"
      style={{ background: "#000000", fontFamily: "Inter, sans-serif" }}
    >
      <div
        ref={trackRef}
        className="h-full flex"
        style={{ width: `${totalPanels * 100}vw` }}
      >
        {/* INTRO PANEL */}
        <div className="w-screen h-full flex items-end px-16 pb-24 shrink-0">
          <div className="max-w-[560px]">
            <p
              className="text-[#A1A1A6]"
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              003 / Project Showcase
            </p>
            <h2
              className="text-white mt-4"
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Systems I&apos;ve
              <br />
              Shipped.
            </h2>
            <p
              className="text-[#A1A1A6] mt-6"
              style={{ fontSize: "13px", lineHeight: 1.7 }}
            >
              Production-grade architectures handling real traffic, real
              payments, and real edge cases. Scroll horizontally.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-12 h-px" style={{ background: "#333333" }} />
              <span
                className="text-[#A1A1A6]"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Drag / Scroll →
              </span>
            </div>
          </div>
        </div>

        {/* PROJECT PANELS */}
        {PROJECTS.map((project, index) => (
          <div
            key={project.label}
            className="w-screen h-full flex items-center shrink-0 px-16"
          >
            <div className="w-full max-w-[1200px]">
              <ProjectCard project={project} index={index} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
