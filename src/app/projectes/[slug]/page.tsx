import { notFound } from "next/navigation";
import { ProjectView } from "@/views/project";
import { findProject, projectHref, projectNeighbours, projects } from "@/data/mocks/projects";
import { generateMetadata as pageMetadata } from "@/utils/seo/generate-page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name}: cas d'èxit | Altitud Digital`,
    description: `${project.about} ${project.services.join(", ")}.`,
    url: projectHref(project.slug),
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const { prev, next } = projectNeighbours(slug);
  return <ProjectView project={project} prev={prev} next={next} />;
}
