"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/app/i18n/useProjects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

interface ProjectTileProps {
  project: Project;
}

// Calculate clamped aspect ratio to prevent extreme values
function getClampedAspectRatio(width: number, height: number): number {
  const ratio = width / height;
  const MIN_RATIO = 3 / 4; // floor at 3:4 (portrait)
  const MAX_RATIO = 16 / 10; // ceiling at 16:10 (landscape)
  return Math.max(MIN_RATIO, Math.min(ratio, MAX_RATIO));
}

// Determine if image should use object-contain (portrait) or object-cover
function getObjectFit(width: number, height: number): string {
  return height > width ? "contain" : "cover";
}

export function ProjectTile({ project }: ProjectTileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      const clip = clipRef.current;
      if (!container || !clip) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const radius = Math.min(rect.width, rect.height) * 0.4;

      clip.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
      clip.style.opacity = "1";
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const clip = clipRef.current;
    if (!clip) return;
    clip.style.opacity = "0";
  }, []);

  const titleLines = project.title.split("\n").join(" ");
  const mainImage = project.images[0];
  const clampedAspectRatio = getClampedAspectRatio(mainImage.width, mainImage.height);
  const objectFit = getObjectFit(mainImage.width, mainImage.height);

  return (
    <Link href={`/projects/${project.slug}`} className="block outline-none group">
      <motion.div
        className="overflow-hidden"
        style={{
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          background: "#0a0a0a",
        }}
        whileHover={{ scale: 1.01, borderColor: "rgba(255, 255, 255, 0.12)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Image container with BrowserFrame */}
        <div
          ref={containerRef}
          className="relative w-full cursor-none flex items-center justify-center"
          style={{
            aspectRatio: clampedAspectRatio.toString(),
            background: "#0a0a0a",
            padding: objectFit === "contain" ? "24px 0" : "0",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <BrowserFrame url={project.browserUrl} width={Math.min(mainImage.width, 520)}>
            <div
              className="relative w-full overflow-hidden flex items-center justify-center"
              style={{
                width: "100%",
                aspectRatio: `${mainImage.width} / ${mainImage.height}`,
              }}
            >
              {/* Base image (Grayscale) */}
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="transition-transform duration-700 group-hover:scale-105"
                style={{
                  objectFit: objectFit as React.CSSProperties['objectFit'],
                  filter: "grayscale(100%) contrast(1.1) brightness(0.6)"
                }}
              />

              {/* Color reveal overlay */}
              <div
                ref={clipRef}
                className="absolute inset-0 transition-opacity duration-300 z-10"
                style={{ clipPath: "circle(0px at 50% 50%)", opacity: 0 }}
              >
                <Image
                  src={mainImage.src}
                  alt={mainImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                  style={{
                    objectFit: objectFit as React.CSSProperties['objectFit'],
                    filter: "contrast(1.1)"
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle, rgba(167,9,71,0.1) 0%, transparent 60%)",
                  }}
                />
              </div>

              {/* Corner cursor hint */}
              <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div
                  className="w-8 h-8 flex items-center justify-center backdrop-blur-sm bg-black/40 transition-all duration-300"
                  style={{ borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.2)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="19" x2="19" y2="5"></line>
                    <polyline points="10 5 19 5 19 14"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </BrowserFrame>
        </div>

        {/* Content block below image */}
        <div className="p-6 md:p-8">
          <p
            className="text-[#A1A1A6]"
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            {project.label}
          </p>
          <h3
            className="text-white mt-3"
            style={{
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {titleLines}
          </h3>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mt-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-[#A1A1A6]"
                style={{
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
