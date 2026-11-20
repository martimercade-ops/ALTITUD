import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/views/site-nav";
import { ContactForm } from "@/views/contact-form";
import { SiteFooter } from "@/views/site-footer";
import { contactContent, footerContent } from "@/data/mocks/contact";
import { homeNav } from "@/data/mocks/home";
import { projectHref, projects, type Project } from "@/data/mocks/projects";

export interface ProjectViewProps {
  project: Project;
  prev: Project;
  next: Project;
}

const pad = (n: number) => String(n).padStart(2, "0");

const PILL_LIGHT =
  "inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-medium text-plum shadow-sm hover:bg-white/90";
const PILL_OUTLINE =
  "inline-flex h-11 items-center rounded-full border border-white/30 px-6 text-sm font-medium text-white/90 hover:border-white/70 hover:text-white";

const Neighbour = ({ project, label, align }: { project: Project; label: string; align: "start" | "end" }) => (
  <Link
    href={projectHref(project.slug)}
    className={`group flex flex-col gap-4 ${align === "end" ? "md:items-end md:text-right" : ""}`}
  >
    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-small">{label}</span>
    <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-card-gray">
      <Image
        src={project.image}
        alt={project.name}
        fill
        sizes="(max-width: 768px) 92vw, 44vw"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
      />
    </span>
    <span>
      <span className="block text-xs uppercase tracking-[0.2em] text-muted-small">{project.sector}</span>
      <span className="mt-1 block text-2xl font-light tracking-tight text-foreground group-hover:underline group-hover:underline-offset-4">
        {project.name}
      </span>
    </span>
  </Link>
);

export const ProjectView = ({ project, prev, next }: ProjectViewProps) => {
  const index = projects.findIndex((p) => p.slug === project.slug) + 1;
  const main = project.links[0];

  return (
    <>
      <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
      <main id="top" className="w-full bg-hero-page text-[#171717]">
        <section
          aria-labelledby="project-title"
          className="relative overflow-hidden bg-footer px-6 pb-40 pt-36 text-white md:px-10 md:pb-56 md:pt-44 lg:px-12"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_10%,rgb(43_114_226/0.35),transparent_70%)]" />
          <div aria-hidden="true" className="logo-vidre logo-vidre--dreta" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Projecte {pad(index)} / {pad(projects.length)} · {project.sector}
            </p>
            <h1
              id="project-title"
              className="mt-6 max-w-[16ch] text-[2.5rem] font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.5rem]"
            >
              {project.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{project.about}</p>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Serveis">
              {project.services.map((s) => (
                <li key={s} className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/90">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {main && (
                <a href={main.url} target="_blank" rel="noopener noreferrer" className={PILL_LIGHT}>
                  Visitar el web ↗
                </a>
              )}
              <a href="#contact" className={PILL_OUTLINE}>
                Parlem del teu projecte
              </a>
            </div>
          </div>
        </section>

        <div className="relative z-10 mx-auto -mt-28 max-w-6xl px-4 md:-mt-40 md:px-10">
          {project.foto || !main ? (
            <figure className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl">
              <Image src={project.image} alt={`${project.name}: ${project.summary}`} fill priority sizes="(max-width: 1152px) 92vw, 1088px" className="object-cover" />
            </figure>
          ) : (
          <figure className="overflow-hidden rounded-3xl border border-black/5 bg-card-dark shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="size-2.5 rounded-full bg-white/25" />
                <span className="size-2.5 rounded-full bg-white/25" />
                <span className="size-2.5 rounded-full bg-white/25" />
                <span className="mx-auto truncate rounded-full bg-white/10 px-4 py-1 text-xs text-white/70">{main.label}</span>
              </div>
              <a href={main.url} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/10]">
                <Image
                  src={project.image}
                  alt={`Pàgina d'inici del web de ${project.name}`}
                  fill
                  priority
                  sizes="(max-width: 1152px) 92vw, 1088px"
                  className="object-cover object-top"
                />
              </a>
            </figure>
          )}
        </div>

        <section aria-label="Fitxa del projecte" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <dl className="grid gap-10 border-t border-black/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-small">Client</dt>
              <dd className="mt-3 text-lg font-light">{project.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-small">Sector</dt>
              <dd className="mt-3 text-lg font-light">{project.sector}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-small">Què hem fet</dt>
              <dd className="mt-3 text-lg font-light">{project.services.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-small">Web</dt>
              <dd className="mt-3 flex flex-col gap-1 text-lg font-light">
                {project.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    {l.label} ↗
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        <nav aria-label="Altres projectes" className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-[1.75rem] font-light leading-[1.05] tracking-tight sm:text-[2.25rem]">Més projectes</h2>
            <Link href="/projectes" className="whitespace-nowrap rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium hover:border-black/50">
              Tots els projectes
            </Link>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <Neighbour project={prev} label="← Anterior" align="start" />
            <Neighbour project={next} label="Següent →" align="end" />
          </div>
        </nav>

        <div className="relative">
          <ContactForm content={contactContent} />
          <SiteFooter content={footerContent} />
        </div>
      </main>
    </>
  );
};
