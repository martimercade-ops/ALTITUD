import { getI18n } from "@/i18n/server";
import { Tx } from "@/i18n/client";
import { SiteNav } from "@/views/site-nav";
import { SiteFooter } from "@/views/site-footer";
import { Reveal } from "@/components/common/reveal";
import { footerContent } from "@/data/mocks/contact";
import { homeContent, homeNav } from "@/data/mocks/home";
import { TeamGrid } from "@/views/team-grid";
import { Diferencial } from "@/views/diferencial";


export const TeamPageView = () => {
  const { t, T, h } = getI18n();
  const { members } = T(homeContent.team);
  const titol = t("Un equip petit, proper i compromès.");

  return (
    <>
      <SiteNav {...T(homeNav)} homeHref={h("/")} navLabel={t("Principal")} />
      <main id="top" className="w-full bg-hero-page text-[#171717]">
        {/* Capçalera */}
        <section aria-labelledby="equip-title" className="relative overflow-hidden bg-[#0b1424] px-5 pb-12 pt-32 text-white md:px-8 md:pb-14 md:pt-36">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_90%_at_85%_0%,rgb(47_91_255/0.3),transparent_70%)]" />
          <div className="relative z-10 mx-auto max-w-[88rem]">
            <h1 id="equip-title" aria-label={titol} className="pj-titol text-[2.4rem] font-light leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              {titol.split(" ").map((w, i, all) => (
                <span key={i} aria-hidden="true" className={`n1-paraula inline-block${i >= all.length - 2 ? " pj-muted" : ""}`} style={{ ["--d" as string]: `${120 + i * 90}ms` }}>
                  {w}
                </span>
              ))}
            </h1>
          </div>
        </section>

        {/* L'equip en una fila */}
        <section aria-label={t("Membres de l'equip")} className="mx-auto max-w-[88rem] px-5 pb-24 pt-10 md:px-8 md:pt-14">
          <TeamGrid members={members} />
        </section>

        <Diferencial />

        {/* Crida */}

        <section className="px-6 py-24 text-center md:py-32">
          <Reveal className="reveal-up">
            <p className="mx-auto max-w-3xl text-[1.75rem] font-light leading-[1.15] tracking-tight md:text-[2.5rem]">
              <Tx>Vols treballar amb nosaltres?</Tx>
            </p>
            <a
              href={`mailto:info@altitudigital.com?subject=${encodeURIComponent(t("Vull treballar amb vosaltres"))}`}
              className="mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-black pl-6 pr-2 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              <Tx>Envia&apos;ns el teu CV</Tx>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">→</span>
            </a>
            <p className="mt-4 text-sm text-black/50">info@altitudigital.com</p>
          </Reveal>
        </section>

        <SiteFooter content={T(footerContent)} />
      </main>
    </>
  );
};
