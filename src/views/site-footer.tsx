import type { FooterContent, FooterLink } from "@/data/mocks/contact";
import Image from "next/image";
import { AnimatedHeading } from "@/components/common/animated-heading";

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
      <div aria-hidden="true" className="logo-vidre logo-vidre--peu" />

      <div className="relative z-10 flex flex-1 flex-col">
      <div className="flex flex-col items-center text-center">
        <AnimatedHeading
          as="h2"
          id={labelId}
          className="mx-auto max-w-[14ch] text-[1.75rem] font-light leading-[1.05] tracking-tight sm:text-[2.25rem] lg:max-w-none lg:text-[2.75rem]"
        >
          {heading}
        </AnimatedHeading>
        <figure className="mt-6 flex items-center gap-4 rounded-2xl border border-footer-fg/20 bg-footer/60 p-2 pr-5 text-left shadow-2xl backdrop-blur">
          <Image
            src={office.src}
            alt={office.alt}
            width={office.width}
            height={office.height}
            sizes="9rem"
            className="block h-auto w-28 rounded-xl sm:w-36"
          />
          <figcaption className="text-sm leading-snug text-footer-fg/85">
            <span className="block text-xs font-medium uppercase tracking-wide text-footer-muted">La nostra oficina</span>
            <span className="mt-1 block whitespace-pre-line">{contact.address}</span>
          </figcaption>
        </figure>
        <a
          {...linkProps(cta)}
          className="mt-6 rounded-full border border-footer-fg/40 px-6 py-3 text-sm font-medium hover:bg-footer-fg hover:text-footer"
        >
          {cta.label}
        </a>
      </div>

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
