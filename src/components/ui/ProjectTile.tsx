"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/app/i18n/useProjects";

interface ProjectTileProps {
  project: Project;
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
      // Size the circle relative to the container width
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

  return (
    <Link href={`/projects/${project.slug}`} className="block outline-none group">
      <motion.div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-none"
        style={{
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          aspectRatio: "4 / 3",
          background: "#0a0a0a",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.01, borderColor: "rgba(255, 255, 255, 0.12)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Base image (Grayscale) */}
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.6)" }}
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
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ filter: "contrast(1.1)" }}
          />
          {/* Spotlight tint */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle, rgba(167,9,71,0.1) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
          {/* Top tags */}
          <div className="flex gap-2 flex-wrap">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 backdrop-blur-md text-[#A1A1A6] transition-all duration-300"
                style={{ 
                  borderRadius: "6px",
                  border: "1px solid rgba(255, 255, 255, 0.1)", 
                  fontSize: "10px", 
                  letterSpacing: "0.1em",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom title */}
          <div>
            <p
              className="text-[#A1A1A6] mb-3"
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
              className="text-white"
              style={{
                fontSize: "clamp(24px, 4vw, 32px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              {titleLines}
            </h3>
          </div>
        </div>

        {/* Corner cursor hint */}
        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-8 h-8 rounded-lg border border-white/20 backdrop-blur-sm flex items-center justify-center bg-black/40 transition-all duration-300"
            style={{ borderRadius: "8px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="19" x2="19" y2="5"></line>
              <polyline points="10 5 19 5 19 14"></polyline>
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
