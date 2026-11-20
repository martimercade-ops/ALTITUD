import type { FooterContent, FooterLink } from "@/data/mocks/contact";
import Image from "next/image";
import Link from "next/link";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { Reveal } from "@/components/common/reveal";
import { ConsentSettingsLink, MapEmbed } from "@/components/common/consent";
import { legalPages } from "@/data/mocks/legal";
import { BOOKING_URL } from "@/lib/send-contact";

const MAP_EMBED =
  "https://www.google.com/maps?q=Carrer+Ciutat+de+Valls+24,+AD500+Andorra+la+Vella&z=16&output=embed";

export interface SiteFooterProps {
  content: FooterContent;
}

const linkProps = (link: FooterLink) =>
  link.external
    ? { href: link.href, target: "_blank", rel: "noopener" as const }
    : { href: link.href };

export const SiteFooter = ({ content }: SiteFooterProps) => {
  const {
    labelId,
    heading,
    office,
    cta,
    backToTop,
    linksLabel,
    sitemap,
    contact,
    social,
  } = content;

  const colTitle =
    "mb-4 text-xs font-medium uppercase tracking-wide text-footer-muted";
  const colLink = "text-sm text-footer-fg/80 hover:text-footer-fg";

  return (
    <footer
      aria-labelledby={labelId}
      className="relative z-20 flex min-h-lvh flex-col overflow-hidden bg-footer px-6 pb-6 pt-20 text-footer-fg md:px-10 md:pb-10 lg:px-12 lg:pb-12"
    >
      <Image src={content.image} alt="" fill sizes="100vw" quality={90} className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_20_36/0.45),transparent_40%,rgb(11_20_36/0.82))]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgb(11_20_36/0.92)_60%,rgb(11_20_36)_100%)] md:hidden" />

      <div className="relative z-10 flex flex-1 flex-col">
      <div className="flex flex-col items-center text-center">
        <AnimatedHeading
          as="h2"
          id={labelId}
          className="mx-auto max-w-[14ch] text-[1.75rem] font-light leading-[1.05] tracking-tight sm:text-[2.25rem] lg:max-w-none lg:text-[2.75rem]"
        >
          {heading}
        </AnimatedHeading>
      </div>

      {/* Dues maneres de fer el cafè: a l'oficina o per videotrucada */}
      <div className="mx-auto mt-12 grid w-full max-w-5xl gap-4 text-left md:grid-cols-5">
        <Reveal className="reveal-map relative min-h-[22rem] overflow-hidden rounded-3xl border border-footer-fg/15 bg-footer md:col-span-3">
          <MapEmbed src={MAP_EMBED} title="Mapa de l'oficina d'Altitud Digital a Andorra la Vella" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_20px_rgb(10_21_51/0.9)]" />
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl border border-footer-fg/15 bg-footer/85 p-2 pr-3 backdrop-blur-md sm:pr-4">
            <Image
              src={office.src}
              alt={office.alt}
              width={office.width}
              height={office.height}
              sizes="7rem"
              className="block h-16 w-24 shrink-0 rounded-xl object-cover sm:h-20 sm:w-28"
            />
            <span className="min-w-0 flex-1 text-sm leading-snug text-footer-fg/85">
              <span className="block text-xs font-medium uppercase tracking-wide text-footer-muted">Cafè a l&apos;oficina</span>
              <span className="mt-1 block whitespace-pre-line">{contact.address}</span>
            </span>
            <a
              {...linkProps(cta)}
              className="inline-flex shrink-0 rounded-full bg-footer-fg px-3 py-2 text-xs font-medium text-footer hover:bg-white sm:px-4 sm:py-2.5 sm:text-sm"
            >
              {cta.label} ↗
            </a>
          </div>
        </Reveal>

        <Reveal className="reveal-up flex flex-col justify-between rounded-3xl border border-footer-fg/15 bg-footer/70 p-7 backdrop-blur md:col-span-2">
          <div>
            <svg viewBox="0 0 64 64" aria-hidden="true" className="h-14 w-14 text-accent-lime">
              <path className="cafe-vapor" d="M24 14c-3 4 3 6 0 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path className="cafe-vapor cafe-vapor--2" d="M33 12c-3 4 3 6 0 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path className="cafe-vapor cafe-vapor--3" d="M42 14c-3 4 3 6 0 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M14 30h36v10a14 14 0 01-14 14h-8a14 14 0 01-14-14z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M50 33h3a6 6 0 010 12h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-footer-muted">Cafè virtual</p>
            <p className="mt-2 text-2xl font-light leading-tight tracking-tight">No pots venir? Fem el cafè per videotrucada.</p>
            <p className="mt-3 text-sm leading-relaxed text-footer-fg/70">
              Vint minuts, cadascú amb el seu cafè, per conèixer el teu projecte i veure com et podem ajudar. Tria el dia i l&apos;hora que et vagi bé.
            </p>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex h-12 items-center justify-between gap-3 rounded-full bg-accent-lime pl-6 pr-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            Reserva un cafè virtual
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-accent-lime">→</span>
          </a>
        </Reveal>
      </div>

      <div className="flex-1" />

      {/* Peu al mòbil */}
      <nav aria-label="Footer" className="mt-14 flex flex-col gap-8 md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-footer-fg text-sm font-medium text-footer"
          >
            Truca&apos;ns
          </a>
          <a href={`mailto:${contact.email}`} className="flex h-12 items-center justify-center gap-2 rounded-full border border-footer-fg/25 text-sm font-medium">
            Escriu-nos
          </a>
        </div>

        <div>
          <h3 className={colTitle}>{sitemap.title}</h3>
          <ul className="grid grid-cols-2 gap-2">
            {sitemap.links.map((link) => (
              <li key={link.label}>
                <a {...linkProps(link)} className="flex h-11 items-center rounded-2xl border border-footer-fg/12 bg-footer-fg/[0.04] px-4 text-sm text-footer-fg/90">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={colTitle}>{contact.title}</h3>
          <address className="flex flex-col divide-y divide-footer-fg/10 rounded-2xl border border-footer-fg/12 bg-footer-fg/[0.04] text-sm not-italic text-footer-fg/85">
            <span className="whitespace-pre-line px-4 py-3">{contact.address}</span>
            <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="px-4 py-3">{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="px-4 py-3">{contact.email}</a>
            <span className="whitespace-pre-line px-4 py-3 text-footer-fg/60">{contact.hours}</span>
          </address>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium uppercase tracking-wide text-footer-muted">{social.title}</h3>
          <ul className="flex gap-2">
            {social.links.map((link) => (
              <li key={link.label}>
                <a {...linkProps(link)} className="flex h-10 items-center rounded-full border border-footer-fg/20 px-4 text-sm">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <nav
        aria-label="Footer"
        className="-mx-6 mt-16 hidden flex-col gap-10 border-t border-footer-fg/15 px-6 pt-12 md:-mx-10 md:mt-12 md:flex md:flex-row md:justify-between md:px-10 lg:-mx-12 lg:px-12"
      >
        <div className="flex gap-12 sm:gap-20">
          <div>
            <h3 className={colTitle}>{linksLabel}</h3>
            <a href={backToTop.href} className={colLink}>
              {backToTop.label}
            </a>
          </div>

          <div>
            <h3 className={colTitle}>{sitemap.title}</h3>
            <ul className="flex flex-col gap-2">
              {sitemap.links.map((link) => (
                <li key={link.label}>
                  <a {...linkProps(link)} className={colLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-12 sm:gap-20">
          <div>
            <h3 className={colTitle}>{contact.title}</h3>
            <address className="flex flex-col gap-3 text-sm not-italic text-footer-fg/80">
              <span className="whitespace-pre-line">{contact.address}</span>
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                className="hover:text-footer-fg"
              >
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="hover:text-footer-fg">
                {contact.email}
              </a>
              <span className="whitespace-pre-line text-footer-fg/60">{contact.hours}</span>
            </address>
          </div>

          <div>
            <h3 className={colTitle}>{social.title}</h3>
            <ul className="flex flex-col gap-2">
              {social.links.map((link) => (
                <li key={link.label}>
                  <a {...linkProps(link)} className={colLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="-mx-6 mt-10 flex flex-col items-center gap-4 border-t border-footer-fg/15 px-6 pt-6 text-center text-xs text-footer-fg/55 md:mt-12 md:items-stretch md:text-left md:-mx-10 md:flex-row md:items-center md:justify-between md:px-10 lg:-mx-12 lg:px-12">
        <p>
          {content.copyright} NRT F-222591-D
        </p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-start">
          {legalPages.map((p) => (
            <li key={p.slug}>
              <Link href={p.href} className="hover:text-footer-fg">
                {p.title}
              </Link>
            </li>
          ))}
          <li>
            <ConsentSettingsLink className="hover:text-footer-fg" />
          </li>
        </ul>
      </div>
      </div>
      <img loading="lazy" decoding="async" src="/assets/altitud/altitud-paraula.svg" alt="Altitud Digital" width="1600" height="245" className="peu-logo relative z-10 mt-8 px-1 opacity-90 md:px-0 md:opacity-100" />
    </footer>
  );
};
