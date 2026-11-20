import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { Reveal } from "@/components/common/reveal";
import { footerContent } from "@/data/mocks/contact";
import { homeNav, PARLEM_HREF } from "@/data/mocks/home";
import { SERVICE_GROUP_LABEL, serviceHref, services, type ServiceGroup } from "@/data/mocks/services";

const pad = (n: number) => String(n).padStart(2, "0");

const GROUPS: { id: ServiceGroup; intro: string }[] = [
  { id: "marketing", intro: "Estratègia, web, anuncis, contingut i marca. Tot el que necessites per vendre més." },
  { id: "ia", intro: "Eines que estalvien hores, atenen clients i fan créixer l'equip." },
];

export const ServeisView = () => {
  let n = 0;
  return (
    <>
      <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
      <main id="top" className="w-full bg-hero-page text-[#171717]">
        {/* Capçalera */}
        <section aria-labelledby="serveis-title" className="relative overflow-hidden bg-[#0b1424] px-5 pb-10 pt-32 text-white md:px-8 md:pb-12 md:pt-36">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_90%_at_85%_0%,rgb(47_91_255/0.3),transparent_70%)]" />
          <div className="relative z-10 mx-auto flex max-w-[88rem] flex-wrap items-end justify-between gap-x-8 gap-y-6">
            <h1 id="serveis-title" aria-label="Tot el que necessites per arribar al cim." className="pj-titol text-[2.4rem] font-light leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              <span aria-hidden="true" className="n1-paraula inline-block" style={{ ["--d" as string]: "120ms" }}>
                Tot
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block" style={{ ["--d" as string]: "200ms" }}>
                el
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block" style={{ ["--d" as string]: "280ms" }}>
                que
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block" style={{ ["--d" as string]: "360ms" }}>
                necessites
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block" style={{ ["--d" as string]: "440ms" }}>
                per
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block pj-muted" style={{ ["--d" as string]: "520ms" }}>
                arribar
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block pj-muted" style={{ ["--d" as string]: "600ms" }}>
                al
              </span>
              <span aria-hidden="true" className="n1-paraula inline-block pj-muted" style={{ ["--d" as string]: "680ms" }}>
                cim.
              </span>
            </h1>
            <nav aria-label="Grups de serveis" className="flex flex-wrap gap-2 pb-2">
              {GROUPS.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="inline-flex h-10 items-center rounded-full border border-white/25 px-4 text-sm text-white/85 hover:border-white/60 hover:text-white"
                >
                  {SERVICE_GROUP_LABEL[g.id]}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {GROUPS.map((g) => {
          const list = services.filter((s) => s.group === g.id);
          return (
            <section
              key={g.id}
              id={g.id}
              aria-labelledby={`${g.id}-title`}
              className="scroll-mt-24 px-6 py-20 md:px-10 md:py-28 lg:px-12"
            >
              <div className="mx-auto max-w-6xl">
                <Reveal className="reveal-up flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <h2
                    id={`${g.id}-title`}
                    className="text-[2rem] font-light leading-[1.05] tracking-tight md:text-[2.75rem]"
                  >
                    {SERVICE_GROUP_LABEL[g.id]}
                  </h2>
                  <p className="max-w-md text-base leading-relaxed text-black/60">{g.intro}</p>
                </Reveal>

                <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((s, i) => {
                    n += 1;
                    return (
                      <Reveal key={s.slug} as="li" className="reveal-up" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                        <Link
                          href={serviceHref(s.slug)}
                          className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-[#0b1424] p-6 text-white"
                        >
                          <Image
                            src={s.image}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                            priority={n <= 3}
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                          <span className="absolute left-6 top-6 text-sm font-medium text-white/80">{pad(n)}</span>
                          <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-accent-lime group-hover:text-black">
                            ↗
                          </span>
                          <div className="relative">
                            <h3 className="text-2xl font-light leading-tight tracking-tight">
                              {s.prefix} <span className="font-medium">{s.suffix}</span>
                            </h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-white/75">{s.short}</p>
                            <ul className="mt-4 flex max-h-0 flex-wrap gap-1.5 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                              {s.includes.slice(0, 3).map((inc) => (
                                <li key={inc.title} className="rounded-full border border-white/30 px-2.5 py-1 text-xs text-white/90">
                                  {inc.title}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Link>
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            </section>
          );
        })}

        {/* Crida */}
        <section className="px-6 pb-28 pt-8 text-center">
          <Reveal className="reveal-up">
            <p className="mx-auto max-w-3xl text-[1.9rem] font-light leading-[1.12] tracking-tight md:text-[2.75rem]">
              No saps per on començar? T&apos;ho diem en un cafè.
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
