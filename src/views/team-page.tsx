import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { Reveal } from "@/components/common/reveal";
import { footerContent } from "@/data/mocks/contact";
import { homeContent, homeNav, PARLEM_HREF } from "@/data/mocks/home";
import { projectHref } from "@/data/mocks/projects";

const LinkedIn = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

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
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {members.map((m, i) => (
              <Reveal key={m.name} as="li" className="reveal-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-[#eceef2]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={m.image}
                      alt={`${m.name}, ${m.role} d'Altitud Digital`}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1280px) 30vw, 18vw"
                      quality={90}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn de ${m.name}`}
                        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0a66c2] shadow-sm transition-transform hover:scale-110"
                      >
                        <LinkedIn />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-[1.35rem] font-normal leading-tight tracking-tight">{m.name}</h2>
                    <p className="mt-1 text-sm font-medium text-[#2f5bff]">{m.role}</p>
                    {m.bio && <p className="mt-3 text-[14px] leading-relaxed text-black/60">{m.bio}</p>}

                    {m.focus && (
                      <>
                        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">Què fa</p>
                        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Tasques">
                          {m.focus.map((f) => (
                            <li key={f} className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70">{f}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {m.projects && m.projects.length > 0 && (
                      <div className="mt-auto pt-5">
                        <p className="border-t border-black/[0.07] pt-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">Projectes</p>
                        <ul className="mt-2 flex flex-wrap gap-2" aria-label="Projectes">
                          {m.projects.map((pr) => {
                            const inner = (
                              <>
                                {pr.logo && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={`/assets/altitud/clients/color/${pr.logo}.webp`} alt="" className="h-5 w-auto max-w-[3.5rem] object-contain" />
                                )}
                                <span>{pr.name}</span>
                              </>
                            );
                            const cls = "flex items-center gap-2 rounded-xl bg-white px-2.5 py-1.5 text-xs text-black/75 shadow-[0_1px_2px_rgba(0,0,0,0.06)]";
                            return (
                              <li key={pr.name}>
                                {pr.slug ? (
                                  <Link href={projectHref(pr.slug)} className={`${cls} transition-colors hover:text-[#2f5bff]`}>{inner}</Link>
                                ) : (
                                  <span className={cls}>{inner}</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
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
