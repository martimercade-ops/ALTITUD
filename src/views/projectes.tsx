import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { ProjectsList } from "@/views/projects-page";
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
          <h1 id="projectes-title" aria-label="Marques que hem ajudat a créixer." className="pj-titol text-[2.4rem] font-light leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              <span aria-hidden="true" className="n1-paraula inline-block" style={{ ["--d" as string]: "120ms" }}>
                Marques{' '}
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block" style={{ ["--d" as string]: "210ms" }}>
                que{' '}
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block" style={{ ["--d" as string]: "300ms" }}>
                hem{' '}
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block" style={{ ["--d" as string]: "390ms" }}>
                ajudat{' '}
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block pj-muted" style={{ ["--d" as string]: "480ms" }}>
                a{' '}
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block pj-muted" style={{ ["--d" as string]: "570ms" }}>
                créixer.
              </span>
          </h1>
        </div>
      </section>

      <section aria-label="Llistat de projectes" className="mx-auto max-w-[88rem] px-5 pb-24 pt-8 md:px-8 md:pt-10">
        <ProjectsList projects={projects} />
      </section>

      <SiteFooter content={footerContent} />
    </main>
  </>
);
