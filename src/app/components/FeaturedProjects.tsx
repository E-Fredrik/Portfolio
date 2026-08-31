"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslation } from "../i18n/I18nContext";
import { useProjects } from "../i18n/useProjects";
import type { Project } from "../i18n/useProjects";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { slideUp, slideUpStagger, scrollSlideUp, containerStagger, itemVariants } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;
  const isPortraitSet = project.images.length > 1 && project.images.every((img) => img.height > img.width);

  const titleLines = project.title.split("\n");

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0">
      <div
        className={`flex ${isPortraitSet ? "flex-row flex-wrap items-end" : "flex-col items-start"} gap-4 p-8 lg:py-12 lg:pl-8 lg:pr-4 justify-center ${
          !isEven ? "lg:order-2" : ""
        }`}
      >
        {project.images.map((img, imgIdx) => (
          <BrowserFrame key={imgIdx} url={project.browserUrl} width={img.width}>
            <div
              className="relative w-full overflow-hidden"
              style={{
                width: "100%",
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

      <div
        className={`p-8 lg:p-12 flex flex-col justify-center ${
          !isEven ? "lg:order-1" : ""
        }`}
        style={{ borderLeft: isEven ? "1px solid rgba(255, 255, 255, 0.08)" : "none", borderRight: !isEven ? "1px solid rgba(255, 255, 255, 0.08)" : "none" }}
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
                border: "1px solid rgba(255, 255, 255, 0.08)",
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

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { t, locale } = useTranslation();
  const { getFeatured } = useProjects();
  const featuredProjects = getFeatured();

  // 1 intro + N projects + 1 CTA panel
  const totalPanels = 1 + featuredProjects.length + 1;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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

  const headingLines = t("projects.heading").split("\n");

  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="py-24 px-6"
        style={{ background: "#000000", fontFamily: "Inter, sans-serif" }}
      >
        {/* INTRO */}
        <motion.div 
          className="mb-24 max-w-[560px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="text-[#A1A1A6]"
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            {t("projects.sectionLabel")}
          </motion.p>
          <motion.h2
            className="text-white mt-6"
            style={{
              fontSize: "clamp(32px, 8vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </motion.h2>
          <motion.p
            className="text-[#A1A1A6] mt-6"
            style={{ fontSize: "13px", lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            {t("projects.subheading")}
          </motion.p>
        </motion.div>

        {/* PROJECT CARDS */}
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.label}
            className="mb-16 pt-8"
            style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
          >
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
        
        {/* MOBILE CTA */}
        <div className="pt-8" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <ArrowButton href="/projects">{t("projects.viewAll")}</ArrowButton>
        </div>
      </section>
    );
  }

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
        <motion.div 
          className="w-screen h-full flex items-end px-16 pb-24 shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="max-w-[560px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.p
              className="text-[#A1A1A6]"
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              {t("projects.sectionLabel")}
            </motion.p>
            <motion.h2
              className="text-white mt-6"
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </motion.h2>
            <motion.p
              className="text-[#A1A1A6] mt-6"
              style={{ fontSize: "13px", lineHeight: 1.7 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              {t("projects.subheadingDesktop")}
            </motion.p>
            <motion.div 
              className="mt-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
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
            </motion.div>
          </motion.div>
        </motion.div>

        {/* PROJECT PANELS */}
        {featuredProjects.map((project, index) => (
          <div
            key={project.label}
            className="w-screen h-full flex items-center shrink-0 px-16"
          >
            <div className="w-full max-w-[1200px]">
              <ProjectCard project={project} index={index} />
            </div>
          </div>
        ))}
        
        {/* CTA PANEL */}
        <div className="w-screen h-full flex items-center justify-center shrink-0 px-16">
          <div className="flex flex-col items-center">
            <h2
              className="text-white mb-8"
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {t("projects.viewAll")}
            </h2>
            <ArrowButton href="/projects">{t("projects.viewAllShort")}</ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
