import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { PdeForm } from "@/views/pde-form";
import { Reveal } from "@/components/common/reveal";
import { footerContent } from "@/data/mocks/contact";
import { homeContent, homeNav } from "@/data/mocks/home";
import { PdeHero, PdePeaks, ReviewToasts } from "@/views/pde-extres";
import { pdeSolutions } from "@/data/mocks/pde";

const STEPS = [
  { title: "Tria les solucions", text: "Marca ara què vols fer: web, IA, SEO, botiga online… Sense cap compromís." },
  { title: "Ho preparem tot", text: "Et fem la proposta i deixem llesta la documentació del projecte." },
  { title: "Primer dia, a punt", text: "Quan s'obre la convocatòria t'avisem i ho tens tot preparat per sol·licitar l'ajut a temps." },
];

export const PdeView = () => {
  return (
    <>
      <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
      <main id="top" className="w-full bg-hero-page text-[#171717]">
        {/* Capçalera */}
        <PdeHero />

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
