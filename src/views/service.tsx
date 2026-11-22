import { getI18n } from "@/i18n/server";
import { Tx } from "@/i18n/client";
import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { Reveal } from "@/components/common/reveal";
import { footerContent } from "@/data/mocks/contact";
import { homeNav, PARLEM_HREF } from "@/data/mocks/home";
import { projectHref, projects } from "@/data/mocks/projects";
import { SERVICE_GROUP_LABEL, serviceHref, services, type Service } from "@/data/mocks/services";

export interface ServiceViewProps {
  service: Service;
}

const pad = (n: number) => String(n).padStart(2, "0");

export const ServiceView = ({ service: serviceCa }: ServiceViewProps) => {
  const { t, T, h } = getI18n();
  const service = T(serviceCa);
  const related = serviceCa.projectTags
    ? projects.filter((p) => p.services.some((s) => serviceCa.projectTags!.includes(s))).slice(0, 3)
    : [];
  const others = T(services.filter((s) => s.slug !== service.slug));
  const parlem = h(`${PARLEM_HREF}?servei=${service.slug}`);

  return (
    <>
      <SiteNav {...T(homeNav)} homeHref={h("/")} navLabel={t("Principal")} />
      <main id="top" className="w-full bg-hero-page text-[#171717]">
        {/* Capçalera */}
        <section
          aria-labelledby="service-title"
          className="relative overflow-hidden bg-[#0b1424] px-6 pb-40 pt-36 text-white md:px-10 md:pb-56 md:pt-44 lg:px-12"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_10%,rgb(43_114_226/0.35),transparent_70%)]" />
          <div aria-hidden="true" className="logo-vidre logo-vidre--dreta opacity-40" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
              {t(SERVICE_GROUP_LABEL[service.group])} · {service.name}
            </p>
            <h1
              id="service-title"
              className="mt-6 max-w-[18ch] text-[2.5rem] font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.5rem]"
            >
              {service.headline}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80">{service.intro}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={parlem}
                className="inline-flex h-12 items-center gap-3 rounded-full bg-accent-lime pl-6 pr-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                <Tx>Demana pressupost</Tx>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-accent-lime">→</span>
              </Link>
              <Link
                href="/projectes"
                className="inline-flex h-12 items-center rounded-full border border-white/30 px-6 text-sm font-medium text-white/90 hover:border-white/70 hover:text-white"
              >
                <Tx>Veure projectes</Tx>
              </Link>
            </div>
          </div>
        </section>

        <div className="relative z-10 mx-auto -mt-28 max-w-6xl px-4 md:-mt-40 md:px-10">
          <figure className="relative aspect-[16/8] overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={service.image}
              alt=""
              fill
              priority
              sizes="(max-width: 1152px) 92vw, 1088px"
              className="object-cover"
            />
          </figure>
        </div>

        {/* Què fem */}
        <section aria-labelledby="includes-title" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-small"><Tx>Què inclou</Tx></p>
          <h2 id="includes-title" className="mt-4 max-w-[22ch] text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">
            <Tx>Tot el que necessites, en un sol equip.</Tx>
          </h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item, i) => (
              <li key={item.title} className="flex flex-col bg-white p-8 transition-colors hover:bg-paper">
                <span className="text-sm font-medium text-[#2f5bff]">{pad(i + 1)}</span>
                <h3 className="mt-6 text-xl font-normal tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-black/60">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {service.tools && service.tools.length > 0 && (
          <section aria-label={t("Eines")} className="mx-auto -mt-12 max-w-6xl px-6 pb-24 md:-mt-16 md:px-10 md:pb-28">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-black/10 pt-6">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40"><Tx>Treballem amb</Tx></span>
              {service.tools.map((t) =>
                t === "Hostinger" ? (
                  <a key={t} href="https://www.hostinger.com/es?REFERRALCODE=ALTITUD" target="_blank" rel="sponsored noopener" title="Agència partner oficial de Hostinger" className="self-center transition-opacity hover:opacity-80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/altitud/hostinger-partner-light.svg" alt="Hostinger Partner" width={96} height={36} className="h-9 w-auto" />
                  </a>
                ) : (
                  <span key={t} className="text-[15px] text-black/55">{t}</span>
                ),
              )}
            </div>
          </section>
        )}

        {/* Feina recent */}
        {service.gallery && service.gallery.length > 0 && (
          <section aria-labelledby="gallery-title" className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-small"><Tx>Feina recent</Tx></p>
            <h2 id="gallery-title" className="mt-4 text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">
              <Tx>Fet per l&apos;equip, per a clients d&apos;aquí.</Tx>
            </h2>
            <div className={`mt-12 grid gap-6 ${service.gallery.length > 1 ? "md:grid-cols-2" : "md:max-w-md"}`}>
              {service.gallery.map((g) => (
                <figure key={g.src} className="group">
                  <Reveal className="reveal-photo relative aspect-[2/3] overflow-hidden rounded-3xl bg-card-gray">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 45vw"
                      className="object-cover"
                    />
                  </Reveal>
                  <figcaption className="mt-4">
                    <span className="block text-lg font-light tracking-tight">{g.client}</span>
                    <span className="mt-1 block text-sm text-black/55">{g.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Com treballem */}
        <section aria-labelledby="steps-title" className="bg-[#0b1424] px-6 py-24 text-white md:px-10 md:py-32">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50"><Tx>Com treballem</Tx></p>
            <h2 id="steps-title" className="mt-4 max-w-[22ch] text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">
              <Tx>Un procés clar, de la idea als resultats.</Tx>
            </h2>
            <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {service.steps.map((step, i) => (
                <li key={step.title} className="border-t border-white/15 pt-6">
                  <span className="text-sm text-accent-lime">{pad(i + 1)}</span>
                  <h3 className="mt-4 text-xl font-normal">{step.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Projectes relacionats */}
        {related.length > 0 && (
          <section aria-labelledby="related-title" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-title" className="text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">
                <Tx>Projectes on ho hem fet</Tx>
              </h2>
              <Link href="/projectes" className="hidden whitespace-nowrap rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium hover:border-black/50 sm:inline-flex">
                <Tx>Tots els projectes</Tx>
              </Link>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={projectHref(p.slug)} className="group flex flex-col gap-4">
                  <span className="relative block aspect-[16/11] overflow-hidden rounded-2xl bg-card-gray">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 92vw, 30vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted-small">{p.sector}</span>
                    <span className="mt-1 block text-xl font-light tracking-tight group-hover:underline group-hover:underline-offset-4">{p.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Crida a l'acció */}
        <section className="px-4 pb-24 md:px-10 md:pb-32">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#2f5bff] px-8 py-16 text-white md:px-16 md:py-20">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_80%_at_100%_0%,rgb(182_241_58/0.25),transparent_70%)]" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{service.name}</p>
                <h2 className="mt-4 max-w-[18ch] text-[2rem] font-light leading-[1.08] tracking-tight md:text-[2.75rem]">
                  <Tx>Parlem del teu projecte?</Tx>
                </h2>
              </div>
              <Link
                href={parlem}
                className="inline-flex h-12 shrink-0 items-center gap-3 self-start rounded-full bg-white pl-6 pr-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02] md:self-auto"
              >
                <Tx>Demana pressupost</Tx>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Altres serveis */}
        <nav aria-label={t("Altres serveis")} className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-small"><Tx>Altres serveis</Tx></p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={h(serviceHref(s.slug))}
                  className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm transition-colors hover:border-black hover:bg-black hover:text-white"
                >
                  {s.name}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SiteFooter content={T(footerContent)} />
      </main>
    </>
  );
};
