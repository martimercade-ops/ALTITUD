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
  {
    title: "Preparació",
    text: "Ningú surt a fer un cim sense mirar el temps i preparar la motxilla. Abans de fer res, analitzem el teu negoci i el mercat.",
  },
  {
    title: "Constància",
    text: "A la muntanya es puja pas a pas. Amb un ritme sostingut, mes a mes, és com arriben els resultats.",
  },
  {
    title: "Cordada",
    text: "Pugem lligats a tu: un equip que parla clar, que avisa dels perills i que no deixa ningú enrere.",
  },
  {
    title: "Mirada llarga",
    text: "Des del cim es veu el següent. Mesurem, aprenem i tornem a planificar per continuar pujant.",
  },
];

export const MetodologiaView = () => (
  <>
    <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
    <main id="top" className="w-full bg-hero-page text-[#171717]">
      {/* Capçalera amb la muntanya */}
      <section aria-labelledby="metode-title" className="relative flex min-h-[88svh] items-end overflow-hidden bg-[#0b1424] px-6 pb-20 pt-40 text-white md:px-10 lg:px-12">
        <Image src="/assets/altitud/nevado-3.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[50%_70%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_20_36/0.55),rgb(11_20_36/0.25)_40%,rgb(11_20_36/0.92))]" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Reveal className="reveal-up">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
              Metodologia
            </p>
          </Reveal>
          <Reveal className="reveal-up" style={{ transitionDelay: "120ms" }}>
            <h1 id="metode-title" className="mt-6 max-w-[16ch] text-[2.75rem] font-light leading-[1] tracking-tight sm:text-6xl lg:text-[5rem]">
              Pugem junts, com es puja a Andorra.
            </h1>
          </Reveal>
          <Reveal className="reveal-up" style={{ transitionDelay: "240ms" }}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/80">
              Hem crescut entre muntanyes i sabem que cap cim s&apos;improvisa: cal preparació, constància i un bon
              equip. Així és com fem créixer cada projecte, de la vall fins al cim.
            </p>
          </Reveal>
          <Reveal className="reveal-up mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6 text-sm text-white/70" style={{ transitionDelay: "360ms" }}>
            <span>
              <strong className="block text-2xl font-light text-white">1.023 m</strong>
              Andorra la Vella, el nostre camp base
            </span>
            <span>
              <strong className="block text-2xl font-light text-white">2.942 m</strong>
              Comapedrosa, el sostre del país
            </span>
            <span>
              <strong className="block text-2xl font-light text-white">4 fases</strong>
              de la idea als resultats
            </span>
          </Reveal>
        </div>
      </section>

      {/* La ruta amb altímetre */}
      <Method content={methodContent} altitudes={[1023, 2942]} places={["Camp base · Andorra la Vella", "Cim · Comapedrosa"]} />

      {/* Valors de muntanya */}
      <section aria-labelledby="valors-title" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-small">Esperit de muntanya</p>
        <h2 id="valors-title" className="mt-4 max-w-[22ch] text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">
          El que ens ha ensenyat la muntanya, aplicat al teu negoci.
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Com en una cursa de muntanya</p>
            <h2 className="mt-4 text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">
              Ritme, estratègia i cap per arribar a meta.
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/70">
              Treballem amb esdeveniments i clubs esportius del país, com l&apos;Olympus Race o la Federació Andorrana
              d&apos;Handbol. N&apos;hem après que guanya qui gestiona bé l&apos;esforç: ni sortir massa ràpid ni
              quedar-se enrere. Així plantegem el màrqueting.
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
            Quin és el cim del teu negoci? Comencem la pujada.
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
