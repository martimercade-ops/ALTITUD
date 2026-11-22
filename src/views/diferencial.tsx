import Image from "next/image";
import { getI18n } from "@/i18n/server";
import { Reveal } from "@/components/common/reveal";

/** El que ens fa diferents: les píndoles giren en òrbita al voltant de la IA */
const PINDOLES = ["Creativitat + IA", "Innovació constant", "Tendències al dia", "Equip jove", "Atenció propera", "Proactivitat"];

const EQUIP = [
  { nom: "Martí", rol: "CEO", foto: "marti", text: "Havas Media · UNICEF, JDE i Banca March", x: -470, y: -225, d: "0s" },
  { nom: "Eric", rol: "CTO", foto: "eric", text: "Tecnologia des de jove · agències de Tarragona", x: 470, y: -225, d: "-1.4s" },
  { nom: "Andrea", rol: "Project Manager", foto: "andrea", text: "Sociologia · màster a la UB · agències", x: -470, y: 225, d: "-2.3s" },
  { nom: "Maria", rol: "Content Creator", foto: "maria", text: "Vídeo i il·luminació", x: 470, y: 225, d: "-0.8s" },
];

const ESTRELLES = Array.from({ length: 46 }, (_, i) => ({
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

const Persona = ({ p }: { p: (typeof EQUIP)[number] }) => {
  const { t } = getI18n();
  return (
    <div className="flex w-[250px] items-center gap-3 rounded-full border border-white/25 bg-[#141414]/80 p-2 pr-5 backdrop-blur-md">
      <Image src={`/assets/altitud/equip/${p.foto}-480.webp`} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-full object-cover" />
      <span className="min-w-0 text-left">
        <span className="block text-[15px] leading-tight">
          {p.nom} <span className="text-[11px] uppercase tracking-[0.14em] text-white/45">{t(p.rol)}</span>
        </span>
        <span className="mt-1 block text-[12px] leading-snug text-white/60">{t(p.text)}</span>
      </span>
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

      {/* Escriptori: òrbita */}
      <div className="dif-orbita relative z-10 mx-auto -mt-[190px] hidden h-[640px] w-full max-w-[1280px] lg:block">
        <div className="absolute left-1/2 top-1/2 h-0 w-0 lg:scale-[0.84] xl:scale-100">
          {/* Anell dibuixat */}
          <span aria-hidden="true" className="absolute left-0 top-0 h-[340px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-white/15" />

          {/* Píndoles en òrbita (el·lipse = gir dins d'un contenidor aplanat) */}
          <div className="absolute left-0 top-0" style={{ transform: "scaleY(0.5)" }}>
            <div className="dif-gira absolute left-0 top-0">
              {PINDOLES.map((label, i) => (
                <div key={label} className="absolute left-0 top-0" style={{ transform: `rotate(${i * 60}deg) translateX(340px) rotate(${-i * 60}deg)` }}>
                  <div className="dif-contra">
                    <div style={{ transform: "scaleY(2)" }}>
                      <span className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/90 bg-[#141414]/70 px-7 py-3.5 text-[14px] uppercase backdrop-blur-sm transition-colors hover:bg-white hover:text-black">
                        {t(label)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
            <Centre />
          </div>

          {/* L'equip, surant a les cantonades */}
          {EQUIP.map((p) => (
            <div key={p.nom} className="agencia-pindola absolute w-[250px]" style={{ left: p.x, top: p.y, animationDelay: p.d }}>
              <Persona p={p} />
            </div>
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
        <ul className="mx-auto mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
          {EQUIP.map((p) => (
            <li key={p.nom} className="flex justify-center">
              <Persona p={p} />
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-20 md:pb-28" />
    </section>
  );
};
