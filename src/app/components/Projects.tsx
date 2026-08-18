import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTranslation } from "../i18n/I18nContext";

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
  browserUrl: string; // Optional URL to display in the browser frame
}

/** Translation shape for a single project item from the JSON dictionary */
interface ProjectTranslation {
  label: string;
  title: string;
  description: string;
}

function BrowserFrame({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[520px]" style={{ border: "1px solid #333333" }}>
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: "1px solid #333333" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-[6px] h-[6px] rounded-full"
            style={{ border: "1px solid #333333" }}
          />
        ))}
        <span
          className="text-[#A1A1A6] ml-4"
          style={{ fontSize: "10px", fontFamily: "monospace" }}
        >
          {url}
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ✏️  STATIC PROJECT DATA (language-independent fields)              */
/*  - tags, images, and browserUrl don't need translation              */
/* ------------------------------------------------------------------ */
const PROJECT_STATIC = [
  {
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    images: [
      {
        src: "./assets/images/cirun.jpg",
        alt: "Color Run ticketing queue interface",
        width: 520,
        height: 340,
      },
    ],
    browserUrl: "ciputrarun.com",
  },
  {
    tags: ["Laravel Blade", "MySQL", "PHP", "Bootstrap JS & CSS"],
    images: [
      {
        src: "./assets/images/imperial1.png",
        alt: "Imperial F7 Kost Management System interface",
        width: 520,
        height: 340,
      },
      {
        src: "./assets/images/imperial2.png",
        alt: "Imperial F7 Kost Management System dashboard",
        width: 520,
        height: 340,
      },
    ],
    browserUrl: "imperialf7.com",
  },
  {
    tags: ["Kotlin", "PostgreSQL", "REST API"],
    images: [
      {
        src: "./assets/images/nudge.png",
        alt: "Nudge app interface",
        width: 520,
        height: 550,
      },
    ],
    browserUrl: "nudgeapp.com",
  },
  {
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    images: [
      {
        src: "./assets/images/navi.png",
        alt: "NAVI Digital Guestbook dashboard interface",
        width: 520,
        height: 340,
      },
    ],
    browserUrl: "naviguestbook.com",
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
          <BrowserFrame key={imgIdx} url={project.browserUrl}>
          <div
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
          </BrowserFrame>
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
  const { t, tArray, locale } = useTranslation();

  // Merge translated text with static project data
  const translatedItems = tArray<ProjectTranslation>("projects.items");
  const PROJECTS: Project[] = PROJECT_STATIC.map((staticData, i) => ({
    ...staticData,
    label: translatedItems[i]?.label ?? `Case Study ${String(i + 1).padStart(2, "0")}`,
    title: translatedItems[i]?.title ?? "",
    description: translatedItems[i]?.description ?? "",
  }));

  // 1 intro + N projects
  const totalPanels = 1 + PROJECTS.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Rebuild the horizontal-scroll pin when locale changes so GSAP's
  // reparented DOM stays in sync with React's virtual DOM.
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
  }, [isMobile, totalPanels, locale]);

  // Parse heading with \n support
  const headingLines = t("projects.heading").split("\n");

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
            {t("projects.sectionLabel")}
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
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p
            className="text-[#A1A1A6] mt-6"
            style={{ fontSize: "13px", lineHeight: 1.7 }}
          >
            {t("projects.subheading")}
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
              {t("projects.sectionLabel")}
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
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p
              className="text-[#A1A1A6] mt-6"
              style={{ fontSize: "13px", lineHeight: 1.7 }}
            >
              {t("projects.subheadingDesktop")}
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
                {t("projects.scrollHint")}
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
