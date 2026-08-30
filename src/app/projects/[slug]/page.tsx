import { notFound } from "next/navigation";
import { projects, allSlugs } from "@/lib/projects-data";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return allSlugs.map((slug) => ({
    slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  
  if (projectIndex === -1) {
    notFound();
  }

  const prevSlug = projectIndex > 0 ? projects[projectIndex - 1].slug : null;
  const nextSlug = projectIndex < projects.length - 1 ? projects[projectIndex + 1].slug : null;

  return <ProjectDetailClient slug={slug} prevSlug={prevSlug} nextSlug={nextSlug} />;
}
