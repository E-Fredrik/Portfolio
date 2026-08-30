import { useTranslation } from "./I18nContext";
import { projects as staticProjects, ProjectMeta } from "../../lib/projects-data";

export interface Project extends ProjectMeta {
  label: string;
  title: string;
  description: string;
  tagline: string;
  overview: string;
  challenge: string;
  approach: string;
  results: string;
}

export function useProjects() {
  const { tArray } = useTranslation();
  const translatedItems = tArray<any>("projects.items");

  const allProjects: Project[] = staticProjects.map((staticData, i) => ({
    ...staticData,
    label: translatedItems[i]?.label ?? `Case Study ${String(i + 1).padStart(2, "0")}`,
    title: translatedItems[i]?.title ?? "",
    description: translatedItems[i]?.description ?? "",
    tagline: translatedItems[i]?.tagline ?? "",
    overview: translatedItems[i]?.overview ?? "",
    challenge: translatedItems[i]?.challenge ?? "",
    approach: translatedItems[i]?.approach ?? "",
    results: translatedItems[i]?.results ?? "",
  }));

  return {
    getAll: () => allProjects,
    getFeatured: () => allProjects.filter((p) => p.featured),
    getBySlug: (slug: string) => allProjects.find((p) => p.slug === slug),
  };
}
