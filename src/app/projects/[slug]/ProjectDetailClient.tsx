"use client";

import { useTranslation } from "@/app/i18n/I18nContext";
import { useProjects } from "@/app/i18n/useProjects";
import Image from "next/image";
import { motion } from "motion/react";
import Footer from "@/app/components/Footer";
import { ArrowButton } from "@/components/ui/ArrowButton";

function BrowserFrame({
  url,
  width,
  children,
}: {
  url: string;
  width?: number;
  children: React.ReactNode;
}) {
  const frameWidth = width ? `${width}px` : "100%";

  return (
    <div
      className="inline-block max-w-full align-top self-start"
      style={{ border: "1px solid rgba(255, 255, 255, 0.08)", width: frameWidth }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-[6px] h-[6px] rounded-full"
            style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
          />
        ))}
        <span
          className="text-[#A1A1A6] ml-4 truncate"
          style={{ fontSize: "10px", fontFamily: "monospace" }}
        >
          {url}
        </span>
      </div>
      <div className="p-6" style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
}

export default function ProjectDetailClient({
  slug,
  prevSlug,
  nextSlug,
}: {
  slug: string;
  prevSlug: string | null;
  nextSlug: string | null;
}) {
  const { t } = useTranslation();
  const { getBySlug } = useProjects();
  const project = getBySlug(slug);

  if (!project) return null;

  const titleLines = project.title.split("\n").join(" ");

  return (
    <main className="min-h-screen bg-black" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="pt-32 pb-16 px-6 lg:px-16 max-w-[1000px] mx-auto">
        {/* Navigation */}
        <div className="mb-16">
          <ArrowButton href="/projects" direction="left" variant="secondary" className="px-0 py-0">
            {t("projects.backToProjects")}
          </ArrowButton>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24"
        >
          <div className="flex gap-2 flex-wrap mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[#A1A1A6]"
                style={{ border: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "10px", letterSpacing: "0.1em" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="text-white mb-6"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {titleLines}
          </h1>
          
          <p
            className="text-[#A70947]"
            style={{
              fontSize: "14px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            {project.tagline}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 py-8 border-y border-white/[0.08]">
            <div>
              <p className="text-[#A1A1A6] mb-2" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Year</p>
              <p className="text-white" style={{ fontSize: "14px", fontFamily: "monospace" }}>{project.year}</p>
            </div>
            <div>
              <p className="text-[#A1A1A6] mb-2" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Role</p>
              <p className="text-white" style={{ fontSize: "14px" }}>{project.role}</p>
            </div>
            {(project.url || project.repoUrl) && (
              <div className="col-span-2 flex items-center justify-end">
                {project.url && (
                  <ArrowButton href={project.url} variant="primary">Visit Site</ArrowButton>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-24 mb-32">
          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-white text-2xl font-bold mb-6">{t("projects.overviewLabel")}</h2>
            <p className="text-[#A1A1A6] text-lg leading-relaxed">{project.overview}</p>
          </motion.section>

          {/* Challenge & Approach & Results */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <motion.div
              className="md:col-span-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="pl-6 border-l border-[#A70947]">
                <h3 className="text-white text-xl font-bold mb-4">{t("projects.challengeLabel")}</h3>
                <p className="text-[#A1A1A6] leading-relaxed">{project.challenge}</p>
              </div>
            </motion.div>
            
            <motion.div
              className="md:col-span-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="pl-6 border-l border-white/[0.08]">
                <h3 className="text-white text-xl font-bold mb-4">{t("projects.approachLabel")}</h3>
                <p className="text-[#A1A1A6] leading-relaxed">{project.approach}</p>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="pl-6 border-l border-[#A70947]">
                <h3 className="text-white text-xl font-bold mb-4">{t("projects.resultsLabel")}</h3>
                <p className="text-[#A1A1A6] leading-relaxed">{project.results}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32"
        >
          <h2 className="text-white text-2xl font-bold mb-12 text-center">{t("projects.galleryLabel")}</h2>
          <div className="flex flex-col items-center gap-16">
            {project.images.map((img, idx) => (
              <BrowserFrame key={idx} url={project.browserUrl} width={img.width}>
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
                    sizes="(max-width: 1024px) 100vw, 800px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </BrowserFrame>
            ))}
          </div>
        </motion.section>

        {/* Next / Prev Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-16 border-t border-white/[0.08] gap-8">
          <div>
            {prevSlug && (
              <ArrowButton href={`/projects/${prevSlug}`} direction="left" variant="secondary">
                {t("projects.prevProject")}
              </ArrowButton>
            )}
          </div>
          <div>
            {nextSlug && (
              <ArrowButton href={`/projects/${nextSlug}`} direction="right" variant="secondary">
                {t("projects.nextProject")}
              </ArrowButton>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
