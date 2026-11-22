import { getI18n } from "@/i18n/server";
import { Reveal } from "@/components/common/reveal";

/** El que ens fa diferents: les píndoles giren en òrbita al voltant de la IA */
const PINDOLES = ["Creativitat + IA", "Innovació constant", "Tendències al dia", "Equip jove", "Atenció propera", "Proactivitat"];

const ESTRELLES = Array.from({ length: 28 }, (_, i) => ({
  l: (i * 37) % 100,
  t: (i * 61) % 100,
  s: 1 + (i % 3),
  d: `${((i * 13) % 40) / 10}s`,
}));

const Centre = () => {
  const { t } = getI18n();
  return (
    <div className="relative mx-auto flex h-[210px] w-[210px] items-center justify-center md:h-[240px] md:w-[240px]">
      <span aria-hidden="true" className="dif-ona absolute inset-0 rounded-full border border-[#2f5bff]/60" />
      <span aria-hidden="true" className="dif-ona absolute inset-0 rounded-full border border-[#2f5bff]/60" style={{ animationDelay: "1.6s" }} />
      <div className="relative flex h-full w-full flex-col items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_25%,#3a4a52,#1a2228_55%,#121619)] shadow-[0_0_80px_rgb(47_91_255/0.35),0_40px_90px_rgb(0_0_0/0.55)]">
        <span className="pl-[0.3em] text-[54px] font-semibold leading-none tracking-[0.3em] md:text-[64px]">IA</span>
        <span className="mt-3 pl-[0.3em] text-[12px] uppercase tracking-[0.3em] text-white/70 md:text-[13px]">{t("al centre")}</span>
      </div>
    </div>
  );
};

export const Diferencial = () => {
  const { t } = getI18n();
  return (
    <section aria-labelledby="diferencial-title" className="relative overflow-hidden bg-[#141414] text-white">
      {/* Fons: resplendor i estrelles */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_62%,rgb(47_91_255/0.18),transparent_70%)]" />
      <div aria-hidden="true" className="absolute inset-0">
        {ESTRELLES.map((e, i) => (
          <span key={i} className="dif-estrella absolute rounded-full bg-white" style={{ left: `${e.l}%`, top: `${e.t}%`, width: e.s, height: e.s, animationDelay: e.d }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-28 text-center md:pt-36">
        <Reveal className="reveal-up">
          <span className="inline-flex items-center rounded-full bg-[#2f5bff] px-4 py-1.5 text-[12px] font-light uppercase md:text-[13px]">
            {t("El que ens fa diferents")}
          </span>
        </Reveal>
        <Reveal className="reveal-up" style={{ transitionDelay: "120ms" }}>
          <h2 id="diferencial-title" className="mt-6 text-[1.75rem] font-light leading-[1.22] tracking-[-0.01em] md:text-[2.6rem]">
            {t("Un equip jove, nascut amb l'algoritme, que va")} <strong className="font-bold">{t("un pas per davant.")}</strong>
          </h2>
        </Reveal>
        <Reveal className="reveal-up" style={{ transitionDelay: "220ms" }}>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-white/60">
            {t("Creativitat i IA de la mà per donar-te un millor resultat. Coneixement jove, però amb experiència.")}
          </p>
        </Reveal>
      </div>

      {/* Línia que baixa fins al centre */}
      <div aria-hidden="true" className="relative z-10 mx-auto mt-14 flex w-px flex-col items-center">
        <span className="h-6 w-6 rounded-full bg-[radial-gradient(circle_at_35%_30%,#3a4a52,#1a2228)]" />
        <span className="h-24 w-0 border-l-2 border-dotted border-white/80" />
      </div>

      {/* Escriptori: òrbita (posicions amb cos/sin d'un angle animat) */}
      <div className="dif-orbita relative z-10 mx-auto -mt-[130px] hidden h-[500px] w-full max-w-[1100px] lg:block">
        <div className="absolute left-1/2 top-1/2 h-0 w-0 lg:scale-90 xl:scale-100">
          <span aria-hidden="true" className="absolute left-0 top-0 h-[350px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-white/15" />
          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
            <Centre />
          </div>
          {PINDOLES.map((label, i) => (
            <span
              key={label}
              className="dif-pindola absolute left-0 top-0 whitespace-nowrap rounded-full border border-white/90 bg-[#141414]/80 px-7 py-3.5 text-[14px] uppercase backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
              style={{ ["--o" as string]: `${i * 60}deg` }}
            >
              {t(label)}
            </span>
          ))}
        </div>
      </div>

      {/* Mòbil i tauleta */}
      <div className="relative z-10 -mt-1 px-6 lg:hidden">
        <Centre />
        <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
          {PINDOLES.map((label) => (
            <li key={label} className="rounded-full border border-white/80 px-4 py-2.5 text-[12px] uppercase">
              {t(label)}
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-20 md:pb-28" />
    </section>
  );
};
