import Link from "next/link";
import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { footerContent } from "@/data/mocks/contact";
import { homeNav } from "@/data/mocks/home";
import { legalPages } from "@/data/mocks/legal";

export interface LegalSection {
  heading: string;
  body: readonly string[];
}

export interface LegalDocumentProps {
  slug?: string;
  title: string;
  updated: string;
  intro: string;
  sections: readonly LegalSection[];
}

const anchor = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const LegalDocument = ({ slug, title, updated, intro, sections }: LegalDocumentProps) => (
  <>
    <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
    <main id="top" className="w-full bg-hero-page text-[#171717]">
      <header className="relative overflow-hidden bg-[#0b1424] px-6 pb-16 pt-36 text-white md:px-10 md:pb-20 md:pt-44 lg:px-12">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_70%_at_85%_0%,rgb(47_91_255/0.28),transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
            Legal
          </p>
          <h1 className="mt-6 text-[2.5rem] font-light leading-[1.02] tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>
          <p className="mt-4 text-sm text-white/45">{updated}</p>

          <nav aria-label="Documents legals" className="mt-10 flex flex-wrap gap-2">
            {legalPages.map((p) => {
              const current = p.slug === slug;
              return (
                <Link
                  key={p.slug}
                  href={p.href}
                  aria-current={current ? "page" : undefined}
                  className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                    current ? "border-white bg-white text-[#0b1424]" : "border-white/20 text-white/80 hover:border-white/50 hover:text-white"
                  }`}
                >
                  {p.short}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[14rem_1fr] lg:gap-16">
        {/* Índex */}
        <aside className="hidden lg:block">
          <nav aria-label="Índex" className="sticky top-32">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">Índex</p>
            <ol className="mt-4 flex flex-col gap-2.5 border-l border-black/10">
              {sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${anchor(section.heading)}`}
                    className="-ml-px block border-l border-transparent pl-4 text-sm leading-snug text-black/55 transition-colors hover:border-[#2f5bff] hover:text-black"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="max-w-2xl">
          {sections.map((section, i) => (
            <section
              key={section.heading}
              id={anchor(section.heading)}
              className="scroll-mt-32 border-t border-black/10 py-10 first:border-t-0 first:pt-0"
            >
              <h2 className="flex items-baseline gap-4 text-2xl font-light tracking-tight md:text-[1.75rem]">
                <span className="text-sm font-medium text-[#2f5bff]">{String(i + 1).padStart(2, "0")}</span>
                {section.heading}
              </h2>
              <div className="mt-5 flex flex-col gap-3 text-[16px] leading-relaxed text-black/70">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <SiteFooter content={footerContent} />
    </main>
  </>
);
