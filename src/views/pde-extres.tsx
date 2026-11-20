"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { subscribeToTicker } from "@/lib/animation/ticker";
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

/** Capçalera amb foto de muntanya: zoom lent i paral·laxi en fer scroll */
export const PdeHero = () => {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(
    () =>
      subscribeToTicker(
        () => {
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (r.bottom < 0) return;
          const p = Math.min(Math.max(-r.top / r.height, 0), 1);
          if (imgRef.current) imgRef.current.style.transform = `translate3d(0, ${p * 18}%, 0)`;
          if (textRef.current) {
            textRef.current.style.transform = `translate3d(0, ${p * -80}px, 0)`;
            textRef.current.style.opacity = String(1 - p * 1.4);
          }
        },
        () => 0,
      ),
    [],
  );
  return (
    <section ref={ref} aria-labelledby="pde-title" className="relative flex h-svh min-h-[600px] items-end overflow-hidden bg-[#0b1424] text-white">
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <div className="pde-zoom absolute inset-0">
          <Image src="/assets/altitud/nevado-3.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[50%_65%]" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_20_36/0.5),rgb(11_20_36/0.1)_35%,rgb(11_20_36/0.85))]" />
      <div aria-hidden="true" className="pde-boira absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0b1424] via-[#0b1424]/60 to-transparent" />

      <div ref={textRef} className="relative z-10 w-full px-6 pb-16 md:px-10 md:pb-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="pde-entra flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
            Ajuts del Govern · PDE
          </p>
          <h1 id="pde-title" className="pde-entra mt-6 max-w-[18ch] text-[2.6rem] font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.75rem]" style={{ animationDelay: "120ms" }}>
            Digitalitza&apos;t amb fins al <strong className="font-semibold">50%</strong> subvencionat.
          </h1>
          <div className="pde-entra mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: "260ms" }}>
            <a
              href="#llista"
              className="inline-flex h-12 items-center gap-3 rounded-full bg-white pl-6 pr-2 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              Apunta&apos;m a la llista d&apos;espera
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">↓</span>
            </a>
            <p className="text-sm text-white/65">Prepara&apos;t per a la convocatòria 2027.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TIERS = [
  { name: "Gran empresa", people: "Més de 100 treballadors", amount: 3000, solutions: 3 },
  { name: "Mitjana empresa", people: "26 a 100 treballadors", amount: 4000, solutions: 4 },
  { name: "Petita empresa", people: "6 a 25 treballadors", amount: 5500, solutions: 5 },
  { name: "Microempresa", people: "1 a 5 treballadors", amount: 6000, solutions: 6 },
];

const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

/** Cims reals de la foto (nevado-3.jpg, en coordenades d'una imatge de 800×530) */
const SUMMITS = [
  { x: 745, y: 390, tier: 0 },
  { x: 640, y: 338, tier: 1 },
  { x: 200, y: 303, tier: 2 },
  { x: 432, y: 270, tier: 3 },
];
const HUT = { x: 545, y: 352 };
const IW = 800;
const IH = 530;
const CROP_TOP = 190;
const CROP_H = 320;

/** Imports per mida d'empresa, marcats sobre els cims d'una muntanya real */
export const PdePeaks = () => {
  const pos = (x: number, y: number) => ({ left: `${(x / IW) * 100}%`, top: `${(y / IH) * 100}%` });
  return (
    <section aria-labelledby="pics-title" className="relative overflow-hidden bg-[#0b1424] pb-20 pt-24 text-white md:pb-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-6 text-center md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Quant et pot cobrir</p>
        <h2 id="pics-title" className="mt-4 text-[2rem] font-light leading-[1.1] tracking-tight md:text-[2.75rem]">
          Com més petita l&apos;empresa, <strong className="font-semibold">més alt el cim.</strong>
        </h2>
      </div>

      <Reveal className="cims-pde relative mx-auto mt-12 max-w-[1400px] overflow-hidden md:mt-16" style={{ aspectRatio: `${IW} / ${CROP_H}` }}>
        <div className="cims-foto absolute inset-x-0" style={{ top: `${(-CROP_TOP / CROP_H) * 100}%`, height: `${(IH / CROP_H) * 100}%` }}>
          <Image src="/assets/altitud/nevado-3.jpg" alt="Serralada nevada amb quatre cims marcats amb els imports del PDE" fill sizes="(max-width: 1400px) 100vw, 1400px" className="object-cover" />
          {/* Ruta de cim a cim */}
          <svg viewBox={`0 0 ${IW} ${IH}`} preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
            <path
              d={`M${SUMMITS[0].x} ${SUMMITS[0].y} Q 700 380 ${SUMMITS[1].x} ${SUMMITS[1].y} Q ${HUT.x + 30} 370 ${HUT.x} ${HUT.y} Q 480 340 ${SUMMITS[3].x} ${SUMMITS[3].y}`}
              fill="none"
              stroke="white"
              strokeWidth="1.4"
              strokeDasharray="3 5"
              vectorEffect="non-scaling-stroke"
              className="cims-ruta"
              opacity="0.7"
            />
          </svg>

          {SUMMITS.map((m) => {
            const t = TIERS[m.tier];
            const top = m.tier === TIERS.length - 1;
            return (
              <div key={t.name} className="cims-marca absolute" style={{ ...pos(m.x, m.y), transitionDelay: `${500 + m.tier * 260}ms` }}>
                <span className="absolute -left-[5px] -top-[5px] block h-[10px] w-[10px] rotate-45 border-2 border-white bg-[#0b1424]" />
                {top ? (
                  <svg viewBox="-4 -80 80 84" className="absolute -left-[4px] bottom-0 h-[64px] w-[64px] overflow-visible md:h-[84px] md:w-[84px]" aria-hidden="true">
                    <Flag x={0} y={0} />
                  </svg>
                ) : null}
                <span
                  className={`absolute whitespace-nowrap rounded-full border border-white/25 bg-[#0b1424]/70 px-3 py-1 font-light backdrop-blur-md ${
                    top ? "-top-[4.6rem] left-12 text-[15px] md:-top-[6rem] md:left-16 md:text-[22px]" : "-top-10 left-1/2 -translate-x-1/2 text-[12px] md:-top-12 md:text-[17px]"
                  }`}
                >
                  {euros(t.amount)}
                </span>
              </div>
            );
          })}

          {/* Refugi */}
          <div className="cims-marca absolute" style={{ ...pos(HUT.x, HUT.y), transitionDelay: "1300ms" }}>
            <svg viewBox="0 0 24 24" className="absolute -left-[11px] -top-[20px] h-[22px] w-[22px] drop-shadow" aria-hidden="true">
              <path d="M2 12 L12 4 L22 12" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <path d="M5 11 V20 H19 V11" fill="#0b1424" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <rect x="10" y="14" width="4" height="6" fill="#b6f13a" />
            </svg>
            <span className="absolute left-4 top-1 hidden whitespace-nowrap rounded-full bg-[#0b1424]/60 px-2 py-0.5 text-[11px] text-white/85 backdrop-blur md:block">Refugi · t&apos;ajudem amb els tràmits</span>
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0b1424,transparent_12%,transparent_88%,#0b1424),linear-gradient(180deg,#0b1424,transparent_18%,transparent_75%,#0b1424)]" />
      </Reveal>

      <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-4 md:px-10">
        {TIERS.map((t) => (
          <li key={t.name} className="border-t border-white/10 pt-5">
            <p className="text-[22px] font-light md:text-[26px]">{euros(t.amount)}</p>
            <p className="mt-1 text-[14px]">{t.name}</p>
            <p className="mt-1 text-[12px] text-white/50">{t.people} · fins a {t.solutions} solucions</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

/** Ressenyes de Google que van apareixent en una cantonada */
export const ReviewToasts = ({ items, side = "right" }: { items: { name: string; text: string }[]; side?: "left" | "right" }) => {
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
      className={`fixed bottom-20 ${side === "left" ? "left-6" : "right-6"} z-[65] hidden w-[340px] transition-all duration-500 sm:block ${
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
