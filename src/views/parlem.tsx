import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { LogoMarquee } from "@/views/logo-marquee";
import { ParlemForm } from "@/views/parlem-form";
import { footerContent } from "@/data/mocks/contact";
import { homeContent, homeNav, MAPS } from "@/data/mocks/home";
import { services } from "@/data/mocks/services";
import Image from "next/image";
import { BOOKING_URL } from "@/lib/send-contact";

const BUDGETS = [
  "Menys de 500 €",
  "500 € – 1.000 €",
  "1.000 € – 3.000 €",
  "Més de 3.000 €",
  "Encara no ho sé",
];

const Icon = ({ d }: { d: string }) => (
  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-accent-lime">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const ICONS = {
  mail: "M4 6h16v12H4z M4 7l8 6 8-6",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z M12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
};

export const ParlemView = () => {
  const { contact } = footerContent;
  const tel = contact.phone.replace(/\s/g, "");
  return (
    <>
      <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
      <main id="top" className="w-full bg-[#0b1424] text-white">
        <section
          aria-labelledby="parlem-title"
          className="relative overflow-hidden px-6 pb-24 pt-32 md:px-10 md:pt-40 lg:px-12 lg:pb-32"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(55%_60%_at_15%_0%,rgb(47_91_255/0.28),transparent_70%),radial-gradient(40%_50%_at_95%_100%,rgb(182_241_58/0.08),transparent_70%)]"
          />
          <div aria-hidden="true" className="logo-vidre logo-vidre--parlem" />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div className="flex flex-col">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                Contacte
              </p>
              <h1
                id="parlem-title"
                className="mt-6 text-[4rem] font-light leading-[0.9] tracking-tight sm:text-[5.5rem] lg:text-[7.5rem]"
              >
                Parlem.
              </h1>
              <p className="mt-6 text-2xl font-light leading-snug text-white md:text-3xl">
                Comença a marcar la diferència.
              </p>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
                Si ets aquí és perquè vols alguna cosa més que màrqueting. Explica&apos;ns en quin
                punt és la teva marca, quins objectius tens i quins reptes vols resoldre. T&apos;assessorem
                sense compromís.
              </p>

              <ul className="mt-10 flex flex-col gap-4 text-[0.95rem]">
                <li>
                  <a href={`mailto:${contact.email}`} className="group flex items-center gap-4 hover:text-accent-lime">
                    <Icon d={ICONS.mail} />
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${tel}`} className="group flex items-center gap-4 hover:text-accent-lime">
                    <Icon d={ICONS.phone} />
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={MAPS} target="_blank" rel="noopener" className="group flex items-center gap-4 hover:text-accent-lime">
                    <Icon d={ICONS.pin} />
                    <span className="whitespace-pre-line">{contact.address.replace("\n", ", ")}</span>
                  </a>
                </li>
              </ul>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener"
                className="group mt-12 flex max-w-md items-center gap-5 rounded-2xl border border-white/12 bg-white/[0.04] p-4 pr-5 transition-colors hover:border-accent-lime/60 hover:bg-white/[0.07]"
              >
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-accent-lime/70">
                  <Image src="/assets/altitud/equip/marti.jpg" alt="Martí Mercadé" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-lime">Parla amb el CEO</span>
                  <span className="mt-1 block text-lg leading-snug text-white">Reserva 20 minuts amb en Martí</span>
                  <span className="mt-0.5 block text-sm text-white/60">Videotrucada o cafè a l&apos;oficina. Tu tries el dia.</span>
                </span>
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-lime text-black transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            <div className="lg:pt-4">
              <ParlemForm
                services={services.map((s) => ({ slug: s.slug, label: s.name }))}
                budgets={BUDGETS}
                unsureLabel="Encara no ho tinc clar"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-6 pt-20 text-center md:pt-28">
          <p className="mx-auto max-w-3xl text-[1.6rem] font-light leading-[1.25] tracking-tight md:text-[2.25rem]">
            Som el partner de confiança de les empreses que aposten per{" "}
            <span className="text-accent-lime">créixer de manera contínua</span>.
          </p>
        </section>
        <LogoMarquee content={homeContent.logos} />

        <SiteFooter content={footerContent} />
      </main>
    </>
  );
};
