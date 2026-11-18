import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/common/reveal";

/** El que ens diferencia: flota al voltant del client */
const PILLS = [
  { label: "Un sol equip", dx: -380, dy: -200, d: "0s" },
  { label: "Tracte proper", dx: 330, dy: -150, d: "1.2s" },
  { label: "Coneixem Andorra", dx: -470, dy: 20, d: "2.1s" },
  { label: "Resultats mesurables", dx: 470, dy: 60, d: "0.6s" },
  { label: "Creativitat", dx: -300, dy: 200, d: "1.6s" },
  { label: "Tecnologia i IA", dx: 260, dy: 240, d: "2.6s" },
];

/** Les potes del 360°: giren al voltant del client */
const RING = "ESTRATÈGIA · WEB · XARXES SOCIALS · SEO · PUBLICITAT · AUDIOVISUAL · BRANDING · IA · ";

const Center = () => (
  <div className="relative mx-auto h-[260px] w-[260px] md:h-[320px] md:w-[320px]">
    {/* Anell 360° que gira */}
    <svg viewBox="0 0 320 320" aria-hidden="true" className="agencia-anell absolute inset-0 h-full w-full text-white/45">
      <defs>
        <path id="anell-360" d="M160,160 m-138,0 a138,138 0 1,1 276,0 a138,138 0 1,1 -276,0" />
      </defs>
      <text className="fill-current text-[11.5px] tracking-[0.22em]">
        <textPath href="#anell-360">{RING}</textPath>
      </text>
    </svg>
    <div aria-hidden="true" className="absolute inset-[34px] rounded-full border border-dashed border-white/15" />
    {/* El client al centre */}
    <div className="absolute inset-[52px] flex flex-col items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#2c3a44,#141a20_70%)] shadow-[0_30px_80px_rgb(0_0_0/0.5)] md:inset-[62px]">
      <span className="text-[11px] uppercase tracking-[0.3em] text-white/50">Al centre</span>
      <span className="mt-2 text-[28px] font-light uppercase tracking-[0.25em] md:text-[34px]">Tu</span>
      <span className="mt-2 text-[11px] uppercase tracking-[0.3em] text-accent-lime">360°</span>
    </div>
  </div>
);

export const Agencia360 = () => (
  <section aria-labelledby="agencia-title" className="relative overflow-hidden bg-[#0e1116] text-white">
    {/* Muntanya de fons a dalt */}
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[620px]">
      <Image src="/assets/altitud/nevado-3.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_40%] opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1116]/40 via-[#0e1116]/60 to-[#0e1116]" />
    </div>

    <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 text-center md:pt-36">
      <Reveal className="reveal-up">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2f5bff] px-4 py-1.5 text-xs uppercase tracking-wide shadow-[0_0_30px_rgb(47_91_255/0.35)] md:text-sm">
          <strong className="font-bold">360°</strong>
          <span className="font-light">Agència de màrqueting</span>
        </span>
      </Reveal>
      <Reveal className="reveal-up" style={{ transitionDelay: "120ms" }}>
        <h2 id="agencia-title" className="mt-7 text-[1.9rem] font-light leading-[1.18] tracking-tight md:text-[3rem]">
          Pensem en el teu negoci com un tot: estratègia, creativitat i tecnologia, i{" "}
          <strong className="font-semibold">tu sempre al centre.</strong>
        </h2>
      </Reveal>
    </div>

    {/* Línia que baixa fins al centre */}
    <div aria-hidden="true" className="relative z-10 mx-auto mt-14 flex w-px flex-col items-center md:mt-20">
      <span className="h-5 w-5 rounded-full bg-[#2c3a44]" />
      <span className="h-24 w-px border-l border-dashed border-white/50 md:h-32" />
    </div>

    {/* Escriptori: píndoles al voltant */}
    <div className="relative z-10 -mt-[150px] hidden h-[640px] w-full md:block">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Center />
      </div>
      {PILLS.map((p) => (
        <span
          key={p.label}
          className="agencia-pindola absolute whitespace-nowrap rounded-full border border-white/70 px-7 py-3.5 text-[15px] uppercase tracking-wide"
          style={{ left: `calc(50% + ${p.dx}px)`, top: `calc(50% + ${p.dy}px)`, animationDelay: p.d }}
        >
          {p.label}
        </span>
      ))}
    </div>

    {/* Mòbil: centre i píndoles a sota */}
    <div className="relative z-10 -mt-[38px] px-6 md:hidden">
      <Center />
      <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
        {PILLS.map((p) => (
          <li key={p.label} className="rounded-full border border-white/60 px-4 py-2.5 text-[13px] uppercase tracking-wide">
            {p.label}
          </li>
        ))}
      </ul>
    </div>

    <div className="relative z-10 flex justify-center pb-24 pt-14 md:pb-32 md:pt-6">
      <Link
        href="/equip"
        className="group inline-flex h-12 items-center gap-3 rounded-full bg-white pl-6 pr-2 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
      >
        Coneix l&apos;equip
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">→</span>
      </Link>
    </div>
  </section>
);
