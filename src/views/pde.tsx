import Image from "next/image";
import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { PdeForm } from "@/views/pde-form";
import { Reveal } from "@/components/common/reveal";
import { footerContent } from "@/data/mocks/contact";
import { homeContent, homeNav } from "@/data/mocks/home";
import { ReviewToasts } from "@/views/pde-extres";
import { GoogleMark } from "@/views/reviews";
import { WHATSAPP_URL } from "@/components/common/whatsapp-button";
import { formatEuros, pdeSolutions } from "@/data/mocks/pde";

const POINTS = [
  "Fins al 50% del cost pagat pel Govern",
  "Nosaltres preparem tota la documentació",
  "+100 empreses d'Andorra ja confien en nosaltres",
];

const STEPS = [
  { n: "01", title: "T'apuntes", text: "1 minut, sense compromís." },
  { n: "02", title: "Et truquem", text: "Triem juntes les solucions." },
  { n: "03", title: "Ajut demanat", text: "El primer dia de la convocatòria." },
];

const Tick = () => (
  <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-lime text-black">
    <svg viewBox="0 0 20 20" className="h-3 w-3">
      <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const Stars = () => (
  <span className="flex gap-0.5" aria-label="5 estrelles">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-[#fbbc04]">
        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
      </svg>
    ))}
  </span>
);

export const PdeView = () => {
  const top = pdeSolutions.filter((s) => s.featured).slice(0, 3);
  return (
    <>
      <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
      <main id="top" className="w-full bg-hero-page text-[#171717]">
        {/* Capçalera: informació a l'esquerra, formulari a la dreta */}
        <section aria-labelledby="pde-title" className="relative overflow-hidden bg-[#0b1424] text-white">
          <div className="pde-zoom absolute inset-0">
            <Image src="/assets/altitud/nevado-3.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[50%_65%] opacity-60" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_20_36/0.92),rgb(11_20_36/0.55)_55%,rgb(11_20_36/0.35))]" />

          <div id="llista" className="relative z-10 mx-auto grid max-w-6xl scroll-mt-24 items-center gap-10 px-6 pb-16 pt-32 md:px-10 md:pt-40 lg:min-h-svh lg:grid-cols-[1fr_29rem] lg:gap-14 lg:pb-20">
            <div className="pde-entra">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                Ajuts del Govern · PDE
              </p>
              <h1 id="pde-title" className="mt-5 text-[2.6rem] font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                Digitalitza&apos;t amb fins al <strong className="font-semibold text-accent-lime">50%</strong> subvencionat.
              </h1>

              <ul className="mt-8 flex flex-col gap-3">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[17px] text-white/90">
                    <Tick />
                    {p}
                  </li>
                ))}
              </ul>

              <ul className="mt-8 hidden gap-3 sm:grid sm:grid-cols-3">
                {top.map((s) => (
                  <li key={s.id} className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur">
                    <span className="block text-sm text-white/70">{s.name}</span>
                    <span className="mt-1 block text-xl font-semibold">fins a {formatEuros(s.max)}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/75">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white"><GoogleMark /></span>
                <Stars />
                <span>98 ressenyes a Google</span>
              </p>
              <p className="mt-3 text-sm font-medium text-accent-lime">Places limitades: la convocatòria s&apos;esgota en pocs dies.</p>
            </div>

            <div className="pde-entra lg:sticky lg:top-28" style={{ animationDelay: "150ms" }}>
              <PdeForm solutions={pdeSolutions} />
            </div>
          </div>
        </section>

        {/* Com funciona */}
        <section aria-labelledby="pde-steps" className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <h2 id="pde-steps" className="text-center text-[1.75rem] font-light tracking-tight md:text-[2.25rem]">
            Així de fàcil.
          </h2>
          <Reveal as="ol" className="reveal-stagger mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.n} className="rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2f5bff] text-sm font-semibold text-white">{s.n}</span>
                <h3 className="mt-5 text-2xl font-light tracking-tight">{s.title}</h3>
                <p className="mt-1 text-[15px] text-black/55">{s.text}</p>
              </li>
            ))}
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#llista"
              className="inline-flex h-12 items-center gap-3 rounded-full bg-[#2f5bff] pl-6 pr-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Apunta&apos;m ara
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2f5bff]">↑</span>
            </a>
            <a href="tel:+376670222" className="text-sm text-black/60 underline underline-offset-4 hover:text-black">
              o truca&apos;ns al +376 670 222
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#128c4a] underline underline-offset-4">
              Escriu-nos per WhatsApp
            </a>
          </div>
        </section>

        <SiteFooter content={footerContent} />
        <ReviewToasts items={homeContent.reviews.items.filter((r) => r.text.length < 190)} />
      </main>
    </>
  );
};
