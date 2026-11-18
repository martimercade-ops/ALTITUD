"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { subscribeToTicker } from "@/lib/animation/ticker";
import type { methodContent as MethodData } from "@/data/mocks/method";

export interface MethodProps {
  content: typeof MethodData;
  /** Altímetre: punt de sortida i una parada per fase (nom i altitud en m) */
  route?: { name: string; alt: number; note?: string }[];
}

const RATIO = 3402 / 3456;
/** Part del recorregut de cada tram que es fa dibuixant la línia (la resta, aturada a la bandera) */
const DRAW = 0.55;

const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Corba suau entre dos punts, amb un lleuger arc */
const VB_W = 1000 * RATIO;
const VB_H = 1000;
const sx = (x: number) => (x / 100) * VB_W;
const sy = (y: number) => (y / 100) * VB_H;
const segment = ([x1, y1]: [number, number], [x2, y2]: [number, number], bend: number) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 + bend;
  return `M${sx(x1)},${sy(y1)} Q${sx(mx)},${sy(my)} ${sx(x2)},${sy(y2)}`;
};

const BENDS = [2, 6, -4, 3];

/** Un color per bandera, amb el símbol de la marca */
const FLAG_COLORS = ["#2e9bff", "#b6f13a", "#d7d1f2", "#ff9f5a"];

const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const Method = ({ content, route }: MethodProps) => {
  const { eyebrow, heading, image, start, phases } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const altRef = useRef<HTMLSpanElement>(null);
  const placeRef = useRef<HTMLParagraphElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(0);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    let lastT = -1;
    return subscribeToTicker(
      () => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Fora de pantalla: res a fer
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const total = rect.height - window.innerHeight;
        const t = clamp(-rect.top / Math.max(1, total)) * phases.length;
        if (Math.abs(t - lastT) < 0.002) return;
        lastT = t;
        // La línia es dibuixa directament al DOM, sense tornar a pintar React a cada fotograma
        if (route && route.length === phases.length + 1 && altRef.current) {
          // Punts de pas: sortida a t=0 i cada parada quan s'hi arriba (t = i + DRAW)
          const ts = [0, ...phases.map((_, i) => i + DRAW)];
          let k = 0;
          while (k < ts.length - 1 && t > ts[k + 1]) k++;
          const span = k < ts.length - 1 ? clamp((t - ts[k]) / (ts[k + 1] - ts[k])) : 0;
          const alt = k < ts.length - 1 ? route[k].alt + (route[k + 1].alt - route[k].alt) * span : route[k].alt;
          altRef.current.textContent = fmt(alt);
          const stop = route[t >= ts[k + 1] - 0.001 && k < ts.length - 1 ? k + 1 : k];
          if (placeRef.current) placeRef.current.textContent = stop.name;
          if (noteRef.current) noteRef.current.textContent = stop.note ?? "";
        }
        pathRefs.current.forEach((path, i) => {
          if (path) path.style.strokeDashoffset = String(1 - clamp((t - i) / DRAW));
        });
        setActive(Math.min(phases.length - 1, Math.floor(t)));
        setReached(phases.filter((_, i) => t >= i + DRAW).length);
      },
      () => 0,
    );
  }, [phases, route]);

  const points = [start, ...phases.map((p) => p.at)];
  const phase = phases[active];

  return (
    <section
      ref={sectionRef}
      id="metodologia"
      aria-labelledby="method-title"
      className="relative bg-[#070a12] text-white"
      style={{ height: `${100 + phases.length * 70}lvh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden lg:h-lvh">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_60%,rgb(47_91_255/0.12),transparent_70%)]" />

        <header className="relative z-10 px-[24px] pt-[92px] text-center lg:pt-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50 lg:text-xs lg:tracking-[0.35em]">{eyebrow}</p>
          <h2 id="method-title" className="mt-[10px] text-[26px] font-light leading-[1.15] tracking-tight lg:mt-4 lg:text-[3rem]">
            {heading.text} <strong className="font-semibold">{heading.strong}</strong>
          </h2>
        </header>

        {route && (
          <div className="absolute right-[18px] top-[152px] z-10 max-w-[11rem] text-right lg:right-12 lg:top-1/2 lg:max-w-[14rem] lg:-translate-y-1/2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45 lg:text-xs">Altitud</p>
            <p className="mt-1 font-light tabular-nums leading-none text-white">
              <span ref={altRef} className="text-[30px] lg:text-[3.5rem]">{fmt(route[0].alt)}</span>
              <span className="ml-1 text-[14px] text-white/50 lg:text-xl">m</span>
            </p>
            <p ref={placeRef} className="mt-2 text-[11px] uppercase tracking-[0.2em] text-accent-lime lg:text-xs">
              {route[0].name}
            </p>
            <p ref={noteRef} className="mt-1 hidden text-[13px] leading-snug text-white/55 lg:block">{route[0].note ?? ""}</p>
          </div>
        )}

        {/* Muntanya amb la ruta */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden lg:items-end lg:overflow-visible">
          <div className="metode-caixa relative shrink-0" style={{ aspectRatio: `${RATIO}`, ["--r" as string]: RATIO }}>
            <Image
              src={image}
              alt="Muntanya nevada amb la ruta de les quatre fases de la metodologia"
              fill
              sizes="(max-width: 768px) 100vw, 80vh"
              quality={85}
              className="object-cover [mask-image:radial-gradient(50%_50%_at_50%_55%,black_70%,transparent_100%)]"
            />

            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
              {points.slice(1).map((to, i) => {
                const d = segment(points[i] as [number, number], to as [number, number], BENDS[i] ?? 0);
                return (
                  <g key={i}>
                    <path d={d} fill="none" stroke="rgb(255 255 255 / 0.35)" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
                    <path
                      ref={(el) => {
                        pathRefs.current[i] = el;
                      }}
                      d={d}
                      fill="none"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="1 1"
                      strokeDashoffset={1}
                    />
                  </g>
                );
              })}
            </svg>

            {phases.map((p, i) => {
              const isReached = i < reached;
              const current = i === active;
              return (
                <div
                  key={p.name}
                  className="absolute"
                  style={{ left: `${p.at[0]}%`, top: `${p.at[1]}%` }}
                >
                  {/* punt */}
                  <span
                    className={`absolute -left-1.5 -top-1.5 h-3 w-3 rotate-45 border transition-all duration-500 ${
                      isReached ? "" : "bg-[#070a12]"
                    }`}
                    style={{ borderColor: FLAG_COLORS[i % FLAG_COLORS.length], backgroundColor: isReached ? FLAG_COLORS[i % FLAG_COLORS.length] : undefined }}
                  />
                  {/* pal i bandera */}
                  <span
                    className={`absolute bottom-0 left-0 h-12 w-px origin-bottom transition-all duration-500 md:h-16 ${
                      isReached ? "scale-y-100 bg-white" : "scale-y-50 bg-white/30"
                    }`}
                  />
                  <span
                    className={`absolute -top-12 left-0 flex h-6 w-9 items-center justify-center transition-all duration-500 md:-top-16 md:h-7 md:w-10 ${
                      isReached ? "opacity-100" : "opacity-45"
                    }`}
                    style={{ backgroundColor: FLAG_COLORS[i % FLAG_COLORS.length] }}
                  >
                    <svg viewBox="0 0 640 420" className="h-3 w-auto md:h-3.5" aria-hidden="true">
                      <path fill="#070a12" fillRule="evenodd" d="M2 419 L63 419 L184 249 L305 419 L637 419 L340 0 L300 0Z M345 95 L539 370 L344 368Z M294 95 L294 315 L216 206Z" />
                    </svg>
                  </span>
                  <span
                    className={`absolute -top-12 left-12 hidden whitespace-nowrap leading-tight transition-all duration-500 sm:block md:-top-16 md:left-14 ${
                      current ? "opacity-100" : isReached ? "opacity-60" : "opacity-30"
                    }`}
                  >
                    <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-white/70">Fase {pad(i + 1)}</span>
                    <span className="block text-sm font-semibold uppercase tracking-wide">{p.name}</span>
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Text de la fase activa: sota la muntanya al mòbil, a l'esquerra a l'ordinador */}
        <div
          aria-live="polite"
          className="relative z-10 shrink-0 px-[24px] pb-[28px] pt-[8px] lg:absolute lg:left-12 lg:top-1/2 lg:w-[22rem] lg:-translate-y-1/2 lg:p-0 xl:left-20"
        >
          <div key={active} className="method-fase">
            <div className="flex items-baseline gap-[14px] lg:block">
              <p className="text-[44px] font-extralight leading-none text-white/40 lg:text-[4.5rem]">{pad(active + 1)}</p>
              <p className="text-[20px] font-light lg:mt-4 lg:text-2xl">
                <strong className="font-semibold">{phase.name}</strong>
              </p>
            </div>
            <p className="mt-[10px] min-h-[66px] text-[15px] leading-[1.45] text-white/70 lg:mt-3 lg:min-h-0 lg:text-[0.95rem] lg:leading-relaxed">{phase.text}</p>
            <div className="mt-[14px] flex gap-1.5 lg:mt-6" aria-hidden="true">
              {phases.map((_, i) => (
                <span key={i} className={`h-[3px] rounded-full transition-all duration-500 lg:h-0.5 ${i === active ? "w-8 bg-accent-lime" : "w-4 bg-white/25"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Versió llegible per a lectors de pantalla */}
      <ol className="sr-only">
        {phases.map((p, i) => (
          <li key={p.name}>
            Fase {i + 1}, {p.name}: {p.stage}. {p.text}
          </li>
        ))}
      </ol>
    </section>
  );
};
