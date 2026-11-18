"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { subscribeToTicker } from "@/lib/animation/ticker";
import type { methodContent as MethodData } from "@/data/mocks/method";

export interface MethodProps {
  content: typeof MethodData;
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

export const Method = ({ content }: MethodProps) => {
  const { eyebrow, heading, image, start, phases } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    let last = -1;
    return subscribeToTicker(
      () => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = clamp(-rect.top / Math.max(1, total));
        const next = Math.round(p * phases.length * 1000) / 1000;
        if (next !== last) {
          last = next;
          setT(next);
        }
      },
      () => 0,
    );
  }, [phases.length]);

  const active = Math.min(phases.length - 1, Math.floor(t));
  const points = [start, ...phases.map((p) => p.at)];
  const phase = phases[active];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="method-title"
      className="relative bg-[#070a12] text-white"
      style={{ height: `${100 + phases.length * 70}lvh` }}
    >
      <div className="sticky top-0 flex h-lvh flex-col overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_60%,rgb(47_91_255/0.12),transparent_70%)]" />

        <header className="relative z-10 px-6 pt-24 text-center md:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">{eyebrow}</p>
          <h2 id="method-title" className="mt-4 text-[1.9rem] font-light leading-[1.1] tracking-tight md:text-[3rem]">
            {heading.text} <strong className="font-semibold">{heading.strong}</strong>
          </h2>
        </header>

        {/* Muntanya amb la ruta */}
        <div className="relative flex min-h-0 flex-1 items-start justify-center pt-6 lg:items-end lg:pt-0">
          <div
            className="relative"
            style={{
              aspectRatio: `${RATIO}`,
              width: `min(100%, calc(78lvh * ${RATIO}), calc((100lvh - 13rem) * ${RATIO}))`,
            }}
          >
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
                const fill = clamp((t - i) / DRAW);
                return (
                  <g key={i}>
                    <path d={d} fill="none" stroke="rgb(255 255 255 / 0.35)" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
                    <path
                      d={d}
                      fill="none"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="1 1"
                      strokeDashoffset={1 - fill}
                    />
                  </g>
                );
              })}
            </svg>

            {phases.map((p, i) => {
              const reached = t >= i + DRAW;
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
                      reached ? "border-white bg-white" : "border-white/40 bg-[#070a12]"
                    }`}
                  />
                  {/* pal i bandera */}
                  <span
                    className={`absolute bottom-0 left-0 h-12 w-px origin-bottom transition-all duration-500 md:h-16 ${
                      reached ? "scale-y-100 bg-white" : "scale-y-50 bg-white/30"
                    }`}
                  />
                  <span
                    className={`absolute -top-12 left-0 flex h-6 w-9 items-center justify-center transition-all duration-500 md:-top-16 md:h-7 md:w-10 ${
                      reached ? "bg-white opacity-100" : "bg-white/40 opacity-60"
                    }`}
                  >
                    <svg viewBox="0 0 640 420" className="h-3 w-auto md:h-3.5" aria-hidden="true">
                      <path fill="#070a12" fillRule="evenodd" d="M2 419 L63 419 L184 249 L305 419 L637 419 L340 0 L300 0Z M345 95 L539 370 L344 368Z M294 95 L294 315 L216 206Z" />
                    </svg>
                  </span>
                  <span
                    className={`absolute -top-12 left-12 hidden whitespace-nowrap leading-tight transition-all duration-500 sm:block md:-top-16 md:left-14 ${
                      current ? "opacity-100" : reached ? "opacity-60" : "opacity-30"
                    }`}
                  >
                    <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-white/70">Fase {pad(i + 1)}</span>
                    <span className="block text-sm font-semibold uppercase tracking-wide">{p.name}</span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Text de la fase activa */}
          <div
            aria-live="polite"
            className="absolute inset-x-6 bottom-8 z-10 md:inset-x-10 lg:inset-x-auto lg:bottom-auto lg:left-12 lg:top-1/2 lg:w-[22rem] lg:-translate-y-1/2 xl:left-20"
          >
            <div key={active} className="method-fase rounded-2xl bg-[#070a12]/75 p-5 backdrop-blur-md lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
              <p className="text-[3.5rem] font-extralight leading-none text-white/40 md:text-[4.5rem]">{pad(active + 1)}</p>
              <p className="mt-4 text-xl font-light md:text-2xl">
                {phase.name} · <strong className="font-semibold">{phase.stage}</strong>
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">{phase.text}</p>
              <div className="mt-6 flex gap-1.5" aria-hidden="true">
                {phases.map((_, i) => (
                  <span key={i} className={`h-0.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-accent-lime" : "w-4 bg-white/25"}`} />
                ))}
              </div>
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
