import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { Method } from "@/views/method";
import { Reveal } from "@/components/common/reveal";
import { footerContent } from "@/data/mocks/contact";
import { homeNav, PARLEM_HREF } from "@/data/mocks/home";
import { methodContent } from "@/data/mocks/method";

const VALUES = [
  { title: "Escoltar", text: "Abans de proposar res, volem entendre bé el teu negoci." },
  { title: "Pas a pas", text: "Sense presses ni promeses màgiques: feina constant, mes a mes." },
  { title: "Al teu costat", text: "Ens tens a prop, a Andorra la Vella, i et parlem clar." },
  { title: "Sempre més amunt", text: "Quan arribem a l'objectiu, en busquem un de nou." },
];

export const MetodologiaView = () => (
  <>
    <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
    <main id="top" className="w-full bg-hero-page text-[#171717]">
      {/* La ruta amb altímetre */}
      <Method
        content={methodContent}
        route={[
          { name: "Andorra la Vella", alt: 1023, note: "Sortim de l'oficina." },
          { name: "Arinsal", alt: 1550, note: "Comença el camí: escoltem i analitzem." },
          { name: "Refugi de Comapedrosa", alt: 2260, note: "Parada per recarregar piles i traçar el pla." },
          { name: "Estany Negre", alt: 2630, note: "L'última pujada, la de més feina." },
          { name: "Pic de Comapedrosa", alt: 2942, note: "El sostre d'Andorra. I ara, el següent cim." },
        ]}
      />

      {/* Valors de muntanya */}
      <section aria-labelledby="valors-title" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-small">Com som</p>
        <h2 id="valors-title" className="mt-4 max-w-[22ch] text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">
          Treballem com es puja una muntanya.
        </h2>
        <Reveal as="ol" className="reveal-stagger mt-14 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <li key={v.title} className="flex flex-col bg-white p-8" style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="text-sm font-medium text-[#2f5bff]">0{i + 1}</span>
              <h3 className="mt-8 text-2xl font-light tracking-tight">{v.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-black/60">{v.text}</p>
            </li>
          ))}
        </Reveal>
      </section>

      {/* Esport de muntanya */}
      <section className="relative overflow-hidden bg-[#0b1424] px-6 py-24 text-white md:px-10 md:py-32 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal className="reveal-photo relative aspect-[4/3] overflow-hidden rounded-3xl [--cortina:#0b1424]">
            <Image src="/assets/altitud/projectes/olympus-race.jpg" alt="Web de l'Olympus Race, cursa de muntanya a Andorra" fill sizes="(max-width: 1024px) 92vw, 45vw" className="object-cover object-top" />
          </Reveal>
          <Reveal className="reveal-up">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Esport i muntanya</p>
            <h2 className="mt-4 text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">
              Ens agrada la muntanya, i es nota.
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/70">
              Treballem amb curses i clubs del país, com l&apos;Olympus Race o la Federació Andorrana d&apos;Handbol.
              Hi posem les mateixes ganes que quan sortim a fer un cim.
            </p>
            <Link href="/projectes/olympus-race" className="mt-8 inline-flex items-center gap-2 border-b border-white/40 pb-0.5 text-sm text-white/90 hover:border-white">
              Veure el projecte de l&apos;Olympus Race →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Crida */}
      <section className="px-6 py-24 text-center md:py-32">
        <Reveal className="reveal-up">
          <p className="mx-auto max-w-3xl text-[1.9rem] font-light leading-[1.12] tracking-tight md:text-[2.75rem]">
            Quin és el teu proper objectiu? En parlem?
          </p>
          <Link
            href={PARLEM_HREF}
            className="mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-black pl-6 pr-2 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          >
            Parlem
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">→</span>
          </Link>
        </Reveal>
      </section>

      <SiteFooter content={footerContent} />
    </main>
  </>
);
