import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { Reveal } from "@/components/common/reveal";
import { footerContent } from "@/data/mocks/contact";
import { homeContent, homeNav, PARLEM_HREF } from "@/data/mocks/home";
import { TeamCard } from "@/views/team-cards";


export const TeamPageView = () => {
  const { members } = homeContent.team;

  return (
    <>
      <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
      <main id="top" className="w-full bg-hero-page text-[#171717]">
        {/* Capçalera */}
        <section aria-labelledby="equip-title" className="relative overflow-hidden bg-[#0b1424] px-5 pb-12 pt-32 text-white md:px-8 md:pb-14 md:pt-36">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_90%_at_85%_0%,rgb(47_91_255/0.3),transparent_70%)]" />
          <div className="relative z-10 mx-auto max-w-[88rem]">
            <h1 id="equip-title" aria-label="Un equip petit, proper i compromès." className="pj-titol text-[2.4rem] font-light leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              {["Un", "equip", "petit,", "proper", "i", "compromès."].map((w, i) => (
                <span key={i} aria-hidden="true" className={`n1-paraula inline-block${i >= 4 ? " pj-muted" : ""}`} style={{ ["--d" as string]: `${120 + i * 90}ms` }}>
                  {w}
                </span>
              ))}
            </h1>
          </div>
        </section>

        {/* L'equip en una fila */}
        <section aria-label="Membres de l'equip" className="mx-auto max-w-[88rem] px-5 pb-24 pt-10 md:px-8 md:pt-14">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {members.map((m, i) => (
              <Reveal key={m.name} as="li" className="reveal-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <TeamCard m={m} />
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Darrere la càmera */}
        <section aria-labelledby="rodatge-title" className="mx-auto max-w-[88rem] px-5 pb-24 md:px-8">
          <Reveal className="reveal-up flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <h2 id="rodatge-title" className="text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">Darrere la càmera.</h2>
            <p className="max-w-md text-[15px] leading-relaxed text-black/55">Gravem a casa dels nostres clients: a la botiga, a la pista o on calgui.</p>
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-[1fr_1.35fr]">
            {[
              { src: "/assets/altitud/rodatge/cheesecake.jpg", alt: "Gravant amb gimbal la vitrina de The Fucking Cheesecake", client: "The Fucking Cheesecake", ratio: "aspect-[4/5]" },
              { src: "/assets/altitud/rodatge/tennis.jpg", alt: "Gravant un entrenament de tennis a la pista coberta", client: "Pedro Martínez · Tennis", ratio: "aspect-[4/5] md:aspect-auto" },
            ].map((f, i) => (
              <Reveal key={f.src} as="li" className="reveal-up" style={{ transitionDelay: `${i * 100}ms` }}>
                <figure className={`group relative h-full overflow-hidden rounded-[28px] ${f.ratio}`}>
                  <Image src={f.src} alt={f.alt} fill sizes="(max-width: 768px) 92vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <figcaption className="absolute bottom-4 left-4 rounded-full bg-black/55 px-4 py-2 text-sm text-white backdrop-blur">{f.client}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Crida */}
        <section className="px-6 pb-24 text-center md:pb-32">
          <Reveal className="reveal-up">
            <p className="mx-auto max-w-3xl text-[1.75rem] font-light leading-[1.15] tracking-tight md:text-[2.5rem]">
              Vols treballar amb nosaltres?
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
};
