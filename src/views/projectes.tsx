import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { ProjectsList } from "@/views/projects-page";
import { Reveal } from "@/components/common/reveal";
import { footerContent } from "@/data/mocks/contact";
import { homeNav } from "@/data/mocks/home";
import { projects } from "@/data/mocks/projects";

export const ProjectesView = () => (
  <>
    <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
    <main id="top" className="w-full bg-hero-page text-[#171717]">
      <section aria-labelledby="projectes-title" className="relative overflow-hidden bg-[#0b1424] px-5 pb-10 pt-32 text-white md:px-8 md:pb-12 md:pt-36">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_90%_at_85%_0%,rgb(47_91_255/0.3),transparent_70%)]" />
        <div className="relative z-10 mx-auto flex max-w-[88rem] flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <Reveal className="reveal-up">
            <h1 id="projectes-title" className="text-[2.1rem] font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              Marques que hem ajudat a créixer.
            </h1>
          </Reveal>
          <p className="flex items-center gap-2 pb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
            {projects.length} projectes
          </p>
        </div>
      </section>

      <section aria-label="Llistat de projectes" className="mx-auto max-w-[88rem] px-5 pb-24 pt-8 md:px-8 md:pt-10">
        <ProjectsList projects={projects} />
      </section>

      <SiteFooter content={footerContent} />
    </main>
  </>
);
