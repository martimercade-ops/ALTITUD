"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/common/reveal";
import { GoogleMark } from "@/views/reviews";

const LOGO =
  "M2 419 L63 419 L184 249 L305 419 L637 419 L340 0 L300 0Z M345 95 L539 370 L344 368Z M294 95 L294 315 L216 206Z";

/** Bandera d'Altitud que onejar al cim */
export const Flag = ({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <line x1="0" y1="0" x2="0" y2="-70" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <g className="bandera-onada">
      <path d="M0 -70 L64 -62 L60 -40 L0 -32 Z" fill="#b6f13a" />
      <svg x="14" y="-62" width="34" height="22" viewBox="0 0 640 420">
        <path d={LOGO} fill="#0b1424" fillRule="evenodd" />
      </svg>
    </g>
  </g>
);

/** Silueta de muntanya amb la bandera al cim, per a la capçalera */
export const HeroMountain = () => (
  <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px] w-full md:h-[360px]">
    <defs>
      <linearGradient id="pde-m1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2f5bff" stopOpacity="0.22" />
        <stop offset="1" stopColor="#0b1424" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="pde-m2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="1" stopColor="#0b1424" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path d="M0 360 L0 250 L180 190 L320 240 L470 150 L600 220 L760 120 L900 210 L1060 160 L1220 230 L1440 180 L1440 360Z" fill="url(#pde-m1)" />
    <path d="M0 360 L0 300 L260 230 L520 280 L780 200 L960 250 L1150 180 L1360 96 L1440 140 L1440 360Z" fill="url(#pde-m2)" />
    <path d="M1360 96 L1330 120 L1346 118 L1360 130 L1374 118 L1392 124Z" fill="white" opacity="0.5" />
    <g className="bandera-puja">
      <Flag x={1360} y={96} scale={0.9} />
    </g>
  </svg>
);

const TIERS = [
  { name: "Gran empresa", people: "Més de 100 treballadors", amount: 3000, solutions: 3 },
  { name: "Mitjana empresa", people: "26 a 100 treballadors", amount: 4000, solutions: 4 },
  { name: "Petita empresa", people: "6 a 25 treballadors", amount: 5500, solutions: 5 },
  { name: "Microempresa", people: "1 a 5 treballadors", amount: 6000, solutions: 6 },
];

const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

/** Imports per mida d'empresa, com a pics que pugen */
export const PdePeaks = () => {
  const W = 1000;
  const H = 420;
  const col = W / TIERS.length;
  const peak = (amt: number) => H - (150 + ((amt - 3000) / 3000) * 190);
  return (
    <section aria-labelledby="pics-title" className="relative overflow-hidden bg-[#0b1424] px-6 pb-20 pt-24 text-white md:px-10 md:pb-28 md:pt-32 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Quant et pot cobrir</p>
          <h2 id="pics-title" className="mt-4 text-[2rem] font-light leading-[1.1] tracking-tight md:text-[2.75rem]">
            Com més petita l&apos;empresa, <strong className="font-semibold">més alt el cim.</strong>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/60">
            L&apos;import total que pots rebre depèn de la mida de la teva empresa, a repartir entre les solucions que triïs.
          </p>
        </div>

        <Reveal className="pics-pde mt-14">
          <svg viewBox={`0 -110 ${W} ${H + 110}`} className="h-auto w-full" role="img" aria-label="Imports màxims del PDE segons la mida de l'empresa">
            <defs>
              <linearGradient id="pic-cos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3a4f7a" />
                <stop offset="1" stopColor="#0b1424" />
              </linearGradient>
            </defs>
            <line x1="0" y1={H - 1} x2={W} y2={H - 1} stroke="rgb(255 255 255 / 0.15)" />
            {TIERS.map((t, i) => {
              const cx = col * i + col / 2;
              const top = peak(t.amount);
              const half = col * 0.62;
              const last = i === TIERS.length - 1;
              return (
                <g key={t.name}>
                  <g className="pic" style={{ transitionDelay: `${i * 160}ms` }}>
                    <path d={`M${cx - half} ${H} L${cx} ${top} L${cx + half} ${H}Z`} fill="url(#pic-cos)" stroke="rgb(255 255 255 / 0.12)" />
                    <path d={`M${cx} ${top} L${cx - 26} ${top + 34} L${cx - 9} ${top + 28} L${cx} ${top + 40} L${cx + 11} ${top + 27} L${cx + 26} ${top + 34}Z`} fill="white" opacity="0.85" />
                  </g>
                  <text x={last ? cx - 16 : cx} y={top - (last ? 40 : 22)} textAnchor={last ? "end" : "middle"} className={`pic-text fill-white font-light ${last ? "text-[44px]" : "text-[36px]"}`} style={{ transitionDelay: `${400 + i * 160}ms` }}>
                    {euros(t.amount)}
                  </text>
                  {last && (
                    <g className="pic-text" style={{ transitionDelay: "1100ms" }}>
                      <Flag x={cx} y={top} />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
          <ul className="grid grid-cols-4 gap-2 border-t border-white/10 pt-6 text-center">
            {TIERS.map((t) => (
              <li key={t.name}>
                <p className="text-[13px] font-medium md:text-[17px]">{t.name}</p>
                <p className="mt-1 text-[11px] text-white/50 md:text-[14px]">{t.people}</p>
                <p className="mt-2 text-[11px] text-accent-lime md:text-[13px]">Fins a {t.solutions} solucions</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

/** Ressenyes de Google que van apareixent en una cantonada */
export const ReviewToasts = ({ items }: { items: { name: string; text: string }[] }) => {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed || !items.length) return;
    let t: ReturnType<typeof setTimeout>;
    const cycle = (first: boolean) => {
      t = setTimeout(
        () => {
          setShown(true);
          t = setTimeout(() => {
            setShown(false);
            t = setTimeout(() => {
              setI((v) => (v + 1) % items.length);
              cycle(false);
            }, 600);
          }, 6000);
        },
        first ? 4000 : 2500,
      );
    };
    cycle(true);
    return () => clearTimeout(t);
  }, [closed, items.length]);

  if (closed || !items.length) return null;
  const r = items[i];
  return (
    <aside
      aria-live="polite"
      aria-label="Ressenya de Google"
      className={`fixed bottom-6 right-6 z-[65] hidden w-[340px] transition-all duration-500 sm:block ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="relative rounded-2xl border border-black/5 bg-white p-4 pr-9 text-black shadow-[0_20px_50px_rgb(11_20_36/0.25)]">
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Tancar les ressenyes"
          className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-black/35 hover:bg-black/5 hover:text-black"
        >
          ×
        </button>
        <div className="flex items-center gap-2">
          <GoogleMark />
          <span className="text-[13px] font-semibold">{r.name}</span>
          <span className="ml-auto flex gap-0.5 pr-1" aria-label="5 estrelles">
            {[0, 1, 2, 3, 4].map((s) => (
              <svg key={s} viewBox="0 0 20 20" className="h-3 w-3 fill-[#fbbc04]" aria-hidden="true">
                <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
              </svg>
            ))}
          </span>
        </div>
        <p className="mt-2 line-clamp-3 text-[13px] leading-snug text-black/70">{r.text}</p>
      </div>
    </aside>
  );
};
