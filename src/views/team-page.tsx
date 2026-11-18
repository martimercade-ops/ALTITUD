import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { Reveal } from "@/components/common/reveal";
import { footerContent } from "@/data/mocks/contact";
import { homeContent, homeNav, MAPS, PARLEM_HREF } from "@/data/mocks/home";

const pad = (n: number) => String(n).padStart(2, "0");

const MAP_EMBED =
  "https://www.google.com/maps?q=Carrer+Ciutat+de+Valls+24,+AD500+Andorra+la+Vella&z=16&output=embed";

export const TeamPageView = () => {
  const { members } = homeContent.team;
  const { contact, office } = footerContent;

  return (
    <>
      <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
      <main id="top" className="w-full bg-hero-page text-[#171717]">
        {/* Capçalera */}
        <section
          aria-labelledby="equip-title"
          className="relative overflow-hidden bg-[#0b1424] px-6 pb-28 pt-36 text-white md:px-10 md:pb-36 md:pt-44 lg:px-12"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_10%,rgb(43_114_226/0.35),transparent_70%)]" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <Reveal className="reveal-up">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                L&apos;equip
              </p>
            </Reveal>
            <Reveal className="reveal-up" style={{ transitionDelay: "120ms" }}>
              <h1 id="equip-title" className="mt-6 max-w-[16ch] text-[2.75rem] font-light leading-[1] tracking-tight sm:text-6xl lg:text-[5rem]">
                Persones reals, d&apos;Andorra.
              </h1>
            </Reveal>
            <Reveal className="reveal-up" style={{ transitionDelay: "240ms" }}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
                Darrere de cada projecte hi ha un equip petit i proper, que coneix el mercat local i
                treballa colze a colze amb cada client.
              </p>
            </Reveal>

            {/* Miniatures de l'equip */}
            <Reveal as="ul" className="reveal-stagger mt-14 flex flex-wrap gap-3">
              {members.map((m, i) => (
                <li key={m.name} style={{ transitionDelay: `${300 + i * 80}ms` }}>
                  <a
                    href={`#membre-${i + 1}`}
                    className="group flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-5 text-sm backdrop-blur transition-colors hover:border-white/40"
                  >
                    <span className="relative block h-9 w-9 overflow-hidden rounded-full">
                      <Image src={m.image} alt="" fill sizes="36px" className="object-cover" />
                    </span>
                    {m.name.split(" ")[0]}
                  </a>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Presentació un per un */}
        <section aria-label="Membres de l'equip" className="px-6 md:px-10 lg:px-12">
          <ol className="mx-auto max-w-6xl">
            {members.map((m, i) => {
              const flip = i % 2 === 1;
              return (
                <li
                  key={m.name}
                  id={`membre-${i + 1}`}
                  className="grid scroll-mt-28 items-center gap-10 border-b border-black/10 py-20 md:grid-cols-12 md:gap-12 md:py-28"
                >
                  <Reveal
                    className={`reveal-photo relative aspect-[4/5] overflow-hidden rounded-3xl md:col-span-5 ${
                      flip ? "md:order-2 md:col-start-8" : ""
                    }`}
                  >
                    <Image
                      src={m.image}
                      alt={`${m.name}, ${m.role} d'Altitud Digital`}
                      fill
                      sizes="(max-width: 768px) 92vw, 40vw"
                      quality={90}
                      className="object-cover"
                    />
                  </Reveal>

                  <Reveal
                    className={`reveal-text md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}
                  >
                    <p className="text-sm font-medium tracking-[0.2em] text-black/35">
                      {pad(i + 1)} <span className="text-black/20">/ {pad(members.length)}</span>
                    </p>
                    <h2 className="mt-6 text-[2.5rem] font-light leading-[1] tracking-tight md:text-[3.5rem]">{m.name}</h2>
                    <p className="mt-3 text-lg text-[#2f5bff]">{m.role}</p>
                    {m.bio && <p className="mt-8 max-w-md text-lg leading-relaxed text-black/65">{m.bio}</p>}
                    {m.focus && (
                      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Especialitats">
                        {m.focus.map((f) => (
                          <li key={f} className="rounded-full border border-black/15 px-4 py-1.5 text-sm text-black/75">
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Crida */}
        <section className="px-6 py-24 text-center md:py-32">
          <Reveal className="reveal-up">
            <p className="mx-auto max-w-3xl text-[1.75rem] font-light leading-[1.15] tracking-tight md:text-[2.5rem]">
              Un equip petit, proper i sempre a l&apos;altura del teu projecte.
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

        {/* Oficina i mapa */}
        <section
          aria-labelledby="oficina-title"
          className="relative overflow-hidden bg-[#0b1424] px-6 py-24 text-white md:px-10 md:py-32 lg:px-12"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Reveal className="reveal-up">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                  On som
                </p>
                <h2 id="oficina-title" className="mt-6 text-[2.25rem] font-light leading-[1.05] tracking-tight md:text-[3rem]">
                  Ens trobaràs al cor d&apos;Andorra la Vella.
                </h2>
                <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-white/75">{contact.address}</p>
              </Reveal>

              <Reveal className="reveal-photo relative mt-10 aspect-[3/2] overflow-hidden rounded-3xl">
                <Image src={office.src} alt={office.alt} fill sizes="(max-width: 1024px) 92vw, 40vw" className="object-cover" />
              </Reveal>

              <Reveal className="reveal-up mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-12 items-center gap-3 rounded-full bg-accent-lime pl-6 pr-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
                >
                  Com arribar
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-accent-lime">↗</span>
                </a>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-sm text-white/80 underline-offset-4 hover:text-white hover:underline">
                  {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="text-sm text-white/80 underline-offset-4 hover:text-white hover:underline">
                  {contact.email}
                </a>
              </Reveal>
            </div>

            <Reveal className="reveal-map relative aspect-square overflow-hidden rounded-3xl border border-white/10 lg:col-span-7 lg:aspect-[4/5]">
              <iframe
                title="Mapa de l'oficina d'Altitud Digital a Andorra la Vella"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_hue-rotate(180deg)_contrast(0.9)_brightness(0.95)]"
              />
              {/* Vores fosques perquè el mapa es fongui amb el fons */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_30px_#0b1424]" />
              {/* Pols animat sobre la nostra ubicació */}
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="mapa-pols absolute -left-10 -top-10 block h-20 w-20 rounded-full bg-accent-lime/40" />
                <span className="mapa-pols mapa-pols--2 absolute -left-10 -top-10 block h-20 w-20 rounded-full bg-accent-lime/30" />
              </div>
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0b1424]/80 p-3 pr-5 backdrop-blur-md">
                <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image src={office.src} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="text-sm leading-snug">
                  <span className="block font-medium">Altitud Digital</span>
                  <span className="block text-white/65">{contact.address.replace("\n", " · ")}</span>
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        <SiteFooter content={footerContent} />
      </main>
    </>
  );
};
