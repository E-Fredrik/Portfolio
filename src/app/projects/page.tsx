"use client";

import { useTranslation } from "@/app/i18n/I18nContext";
import { useProjects } from "@/app/i18n/useProjects";
import { ProjectTile } from "@/components/ui/ProjectTile";
import { motion } from "motion/react";
import Footer from "@/app/components/Footer";

export default function ProjectsPage() {
  const { t } = useTranslation();
  const { getAll } = useProjects();
  const allProjects = getAll();

  return (
    <main className="min-h-screen bg-black" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="pt-32 pb-24 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="max-w-2xl mb-32">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
            style={{
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {t("projects.pageTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
            className="text-[#A1A1A6] mt-6"
            style={{ fontSize: "16px", lineHeight: 1.6, maxWidth: "520px" }}
          >
            {t("projects.pageSubtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ 
                duration: 0.7, 
                ease: "easeOut", 
                delay: (index % 2) * 0.08 
              }}
              style={{
                perspective: "1000px",
              }}
            >
              <ProjectTile project={project} />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
