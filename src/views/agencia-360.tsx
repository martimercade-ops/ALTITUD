import { Tx } from "@/i18n/client";
import { getI18n } from "@/i18n/server";
import Image from "next/image";

import Link from "next/link";
import { Reveal } from "@/components/common/reveal";

/** El que ens diferencia: flota al voltant del client */
const PILLS = [
  { label: "Un sol equip", dx: -380, dy: -200, d: "-0s" },
  { label: "Tracte proper", dx: 330, dy: -150, d: "-1.2s" },
  { label: "Coneixem Andorra", dx: -470, dy: 20, d: "-2.1s" },
  { label: "Resultats mesurables", dx: 470, dy: 60, d: "-0.6s" },
  { label: "Creativitat", dx: -300, dy: 200, d: "-1.6s" },
  { label: "Tecnologia i IA", dx: 260, dy: 240, d: "-2.6s" },
];

const Center = () => (
  <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_25%,#3a4a52,#1a2228_55%,#121619)] shadow-[0_40px_90px_rgb(0_0_0/0.55)] md:h-[260px] md:w-[260px]">
    <span className="pl-[0.3em] text-[26px] font-normal uppercase tracking-[0.3em] md:text-[32px]"><Tx>Valors</Tx></span>
  </div>
);

export const Agencia360 = () => {
  const { h } = getI18n();
  return (
  <section aria-labelledby="agencia-title" className="relative overflow-hidden bg-[#141414] text-white">
    {/* Muntanya de fons a dalt */}
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[620px]">
      <Image src="/assets/altitud/nevado-3.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_40%] opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/30 via-[#141414]/55 to-[#141414]" />
    </div>

    <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 text-center md:pt-36">
      <Reveal className="reveal-up">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2f5bff] px-4 py-1.5 text-[12px] uppercase md:text-[13px]">
          <strong className="font-bold">360°</strong>
          <span className="font-light"><Tx>Agència de màrqueting</Tx></span>
        </span>
      </Reveal>
      <Reveal className="reveal-up" style={{ transitionDelay: "120ms" }}>
        <h2 id="agencia-title" className="mt-6 text-[1.75rem] font-light leading-[1.22] tracking-[-0.01em] md:text-[2.6rem]">
          <Tx>Pensem en el teu negoci com un tot: estratègia, creativitat i tecnologia, i</Tx>{" "}
          <strong className="font-bold"><Tx>tu sempre al centre.</Tx></strong>
        </h2>
      </Reveal>
    </div>

    {/* Línia que baixa fins al centre */}
    <div aria-hidden="true" className="relative z-10 mx-auto mt-14 flex w-px flex-col items-center md:mt-20">
      <span className="h-6 w-6 rounded-full bg-[radial-gradient(circle_at_35%_30%,#3a4a52,#1a2228)]" />
      <span className="h-24 w-0 border-l-2 border-dotted border-white/80 md:h-36" />
    </div>

    {/* Escriptori: píndoles al voltant */}
    <div className="relative z-10 -mt-[180px] hidden h-[620px] w-full md:block">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Center />
      </div>
      {PILLS.map((p) => (
        <span
          key={p.label}
          className="agencia-pindola absolute whitespace-nowrap rounded-full border border-white/90 px-7 py-3.5 text-[14px] uppercase"
          style={{ left: `calc(50% + ${p.dx}px)`, top: `calc(50% + ${p.dy}px)`, animationDelay: p.d }}
        >
          <Tx>{p.label}</Tx>
        </span>
      ))}
    </div>

    {/* Mòbil: centre i píndoles a sota */}
    <div className="relative z-10 -mt-1 px-6 md:hidden">
      <Center />
      <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
        {PILLS.map((p) => (
          <li key={p.label} className="rounded-full border border-white/80 px-4 py-2.5 text-[12px] uppercase">
            <Tx>{p.label}</Tx>
          </li>
        ))}
      </ul>
    </div>

    <div className="relative z-10 flex justify-center pb-24 pt-14 md:pb-32 md:pt-6">
      <Link
        href={h("/equip")}
        className="group inline-flex h-12 items-center gap-3 rounded-full bg-white pl-6 pr-2 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
      >
        <Tx>Coneix l&apos;equip</Tx>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">→</span>
      </Link>
    </div>
  </section>
);
};
