import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { PdeForm } from "@/views/pde-form";
import { Reveal } from "@/components/common/reveal";
import { footerContent } from "@/data/mocks/contact";
import { homeContent, homeNav } from "@/data/mocks/home";
import { HeroMountain, PdePeaks, ReviewToasts } from "@/views/pde-extres";
import { formatEuros, pdeSolutions } from "@/data/mocks/pde";

const STEPS = [
  { title: "Tria les solucions", text: "Marca ara què vols fer: web, IA, SEO, botiga online… Sense cap compromís." },
  { title: "Ho preparem tot", text: "Et fem la proposta i deixem llesta la documentació del projecte." },
  { title: "Primer dia, a punt", text: "Quan s'obre la convocatòria t'avisem i ho tens tot preparat per sol·licitar l'ajut a temps." },
];

export const PdeView = () => {
  const maxSolution = Math.max(...pdeSolutions.map((s) => s.max));
  return (
    <>
      <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
      <main id="top" className="w-full bg-hero-page text-[#171717]">
        {/* Capçalera */}
        <section
          aria-labelledby="pde-title"
          className="relative overflow-hidden bg-[#0b1424] px-6 pb-56 pt-36 text-white md:px-10 md:pb-72 md:pt-44 lg:px-12"
        >
          <HeroMountain />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_70%_at_85%_0%,rgb(47_91_255/0.35),transparent_70%),radial-gradient(35%_45%_at_0%_100%,rgb(182_241_58/0.08),transparent_70%)]" />
          <div className="relative z-10 mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal className="reveal-up">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                  Ajuts del Govern · PDE
                </p>
              </Reveal>
              <Reveal className="reveal-up" style={{ transitionDelay: "120ms" }}>
                <h1 id="pde-title" className="mt-6 text-[2.6rem] font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                  Digitalitza el teu negoci amb fins al <span className="font-semibold text-accent-lime">50%</span> subvencionat.
                </h1>
              </Reveal>
              <Reveal className="reveal-up" style={{ transitionDelay: "240ms" }}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
                  El Programa de Digitalització d&apos;Empreses (PDE) d&apos;Andorra Digital subvenciona entre el 30% i el 50% del
                  cost de les solucions de digitalització de la teva empresa. Nosaltres t&apos;ajudem a aprofitar-lo.
                </p>
              </Reveal>
              <Reveal className="reveal-up" style={{ transitionDelay: "360ms" }}>
                <a
                  href="#llista"
                  className="mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-accent-lime pl-7 pr-2 text-[15px] font-semibold text-black transition-transform hover:scale-[1.02]"
                >
                  Apunta&apos;m a la llista d&apos;espera
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-accent-lime">↓</span>
                </a>
              </Reveal>
            </div>

            <Reveal className="reveal-up lg:col-span-5" style={{ transitionDelay: "300ms" }}>
              <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-7 backdrop-blur">
                <div className="flex items-start gap-4">
                  <span className="relative mt-1 flex h-3 w-3 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime/60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-lime" />
                  </span>
                  <div>
                    <p className="text-lg font-medium">El pressupost s&apos;esgota molt ràpid</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/70">
                      Quan s&apos;obre la convocatòria, els ajuts es reparteixen en pocs dies. Deixa ja triades les solucions
                      i, quan surti la nova convocatòria, ho tindràs tot preparat per no perdre la subvenció.
                    </p>
                  </div>
                </div>
                <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-white/50">Cobertura</dt>
                    <dd className="mt-1 text-3xl font-light">30–50%</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-white/50">Per solució, fins a</dt>
                    <dd className="mt-1 text-3xl font-light">{formatEuros(maxSolution)}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </section>

        <PdePeaks />

        {/* Com funciona */}
        <section aria-labelledby="pde-steps" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <h2 id="pde-steps" className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-small">Com funciona la llista d&apos;espera</h2>
          <Reveal as="ol" className="reveal-stagger mt-10 grid gap-10 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="border-t border-black/10 pt-6" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="text-sm font-medium text-[#2f5bff]">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-light tracking-tight">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-black/60">{s.text}</p>
              </li>
            ))}
          </Reveal>
        </section>

        {/* Formulari */}
        <section id="llista" aria-label="Llista d'espera del PDE" className="scroll-mt-24 bg-paper px-4 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <PdeForm solutions={pdeSolutions} />
          </div>
        </section>

        <SiteFooter content={footerContent} />
        <ReviewToasts items={homeContent.reviews.items.filter((r) => r.text.length < 190)} />
      </main>
    </>
  );
};
