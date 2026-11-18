import type { FooterContent, FooterLink } from "@/data/mocks/contact";
import Image from "next/image";
import Link from "next/link";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { Reveal } from "@/components/common/reveal";

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

      {/* El cafè: a l'oficina (mapa + façana) o virtual */}
      <Reveal className="reveal-up mx-auto mt-10 flex flex-col items-center gap-8 md:flex-row md:gap-12">
        <div className="relative shrink-0">
          {/* Mapa rodó, com una lent sobre el cel */}
          <div className="relative h-44 w-44 overflow-hidden rounded-full ring-1 ring-footer-fg/25 md:h-52 md:w-52">
            <iframe
              title="Mapa de l'oficina d'Altitud Digital a Andorra la Vella"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
              className="pointer-events-none absolute -inset-16 h-[calc(100%+8rem)] w-[calc(100%+8rem)] [filter:grayscale(1)_invert(0.92)_hue-rotate(180deg)_contrast(0.85)_brightness(0.9)]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_30px_8px_rgb(10_21_51/0.85)]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
              <span className="mapa-pols absolute -left-6 -top-6 block h-12 w-12 rounded-full bg-accent-lime/45" />
              <span className="absolute -left-1.5 -top-1.5 block h-3 w-3 rounded-full bg-accent-lime ring-2 ring-footer" />
            </div>
          </div>
          {/* La façana, com una segona moneda */}
          <Image
            src={office.src}
            alt={office.alt}
            width={office.width}
            height={office.height}
            sizes="7rem"
            className="absolute -bottom-2 -right-6 block h-20 w-20 rounded-full object-cover ring-4 ring-footer md:h-24 md:w-24"
          />
        </div>

        <div className="text-center md:text-left">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-footer-muted">La nostra oficina</p>
          <p className="mt-2 whitespace-pre-line text-lg leading-snug text-footer-fg">{contact.address}</p>
          <div className="mt-5 flex items-center justify-center gap-6 text-sm md:justify-start">
            <a
              {...linkProps(cta)}
              className="border-b border-footer-fg/40 pb-0.5 text-footer-fg/90 transition-colors hover:border-footer-fg hover:text-footer-fg"
            >
              {cta.label} ↗
            </a>
            <span aria-hidden="true" className="h-4 w-px bg-footer-fg/20" />
            <Link
              href="/parlem?cafe=virtual"
              className="group inline-flex items-center gap-2 border-b border-accent-lime/50 pb-0.5 text-accent-lime transition-colors hover:border-accent-lime"
            >
              <svg viewBox="0 0 64 64" aria-hidden="true" className="-mt-1 h-5 w-5">
                <path className="cafe-vapor" d="M26 12c-3 4 3 6 0 10" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <path className="cafe-vapor cafe-vapor--2" d="M36 12c-3 4 3 6 0 10" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M14 30h36v10a14 14 0 01-14 14h-8a14 14 0 01-14-14z" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
                <path d="M50 33h3a6 6 0 010 12h-4" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
              O fem-lo virtual
            </Link>
          </div>
        </div>
      </Reveal>

      <div className="flex-1" />

      <nav
        aria-label="Footer"
        className="-mx-6 mt-16 flex flex-col gap-10 border-t border-footer-fg/15 px-6 pt-12 md:-mx-10 md:mt-12 md:flex-row md:justify-between md:px-10 lg:-mx-12 lg:px-12"
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
      </div>
      <img src="/assets/altitud/altitud-paraula.svg" alt="Altitud Digital" width="1600" height="245" className="peu-logo relative z-10 mt-8" />
    </footer>
  );
};
