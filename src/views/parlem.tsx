import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { LogoMarquee } from "@/views/logo-marquee";
import { ParlemForm } from "@/views/parlem-form";
import { ParlemEscena, ParlemTitol } from "@/views/parlem-escena";
import { footerContent } from "@/data/mocks/contact";
import { homeContent, homeNav } from "@/data/mocks/home";
import { services } from "@/data/mocks/services";
import { BOOKING_URL } from "@/lib/send-contact";


export const ParlemView = () => {
  const { contact } = footerContent;
  const tel = contact.phone.replace(/\s/g, "");
  return (
    <>
      <SiteNav {...homeNav} homeHref="/" navLabel="Principal" />
      <main id="top" className="w-full bg-[#0b1424] text-white">
        <section
          aria-labelledby="parlem-title"
          className="relative flex items-center overflow-hidden px-6 pb-24 pt-32 md:px-10 md:pt-40 lg:min-h-svh lg:px-12 lg:pb-16 lg:pt-28"
        >
          <ParlemEscena />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1fr_30rem] lg:gap-20">
            <div>
              <ParlemTitol id="parlem-title" />
              <p className="form-entra mt-8 max-w-sm text-xl font-light leading-snug text-white/75 md:text-2xl" style={{ animationDelay: "700ms" }}>
                Explica&apos;ns el teu repte. Et responem en 24 h.
              </p>
              <div className="form-entra mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60" style={{ animationDelay: "850ms" }}>
                <a href={`tel:${tel}`} className="hover:text-accent-lime">{contact.phone}</a>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/30" />
                <a href={`mailto:${contact.email}`} className="hover:text-accent-lime">{contact.email}</a>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/30" />
                <a href={BOOKING_URL} target="_blank" rel="noopener" className="text-accent-lime hover:underline">
                  Reserva un cafè amb en Martí →
                </a>
              </div>
            </div>

            <div>
              <ParlemForm
                services={services.map((s) => ({ slug: s.slug, label: s.name }))}
                topSlugs={[]}
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
