"use client";

import Image from "next/image";
import { useRef } from "react";

/** Fotos de rodatge. Afegeix-n'hi més aquí. */
const FOTOS = [
  { src: "/assets/altitud/rodatge/cheesecake.jpg", alt: "Gravant amb gimbal la vitrina de The Fucking Cheesecake", client: "The Fucking Cheesecake" },
  { src: "/assets/altitud/rodatge/tennis.jpg", alt: "Gravant un entrenament de tennis a la pista coberta", client: "Pedro Martínez · Tennis" },
];

/** Carrusel infinit que passa sol i s'atura en passar-hi el cursor */
export const RodatgeCarrusel = () => {
  // repetim les fotos perquè la cinta sempre ompli la pantalla
  const base = Array.from({ length: Math.max(1, Math.ceil(8 / FOTOS.length)) }, () => FOTOS).flat();
  const cinta = [...base, ...base];
  return (
    <div className="rodatge group relative mt-10 overflow-hidden">
      <ul className="rodatge-cinta flex w-max gap-5" style={{ ["--dur" as string]: `${base.length * 6}s` }}>
        {cinta.map((f, i) => (
          <li key={i} aria-hidden={i >= base.length} className="relative aspect-[4/5] w-[68vw] shrink-0 overflow-hidden rounded-[28px] sm:w-[320px]">
            <Image src={f.src} alt={i < base.length ? f.alt : ""} fill sizes="320px" className="object-cover" />
            <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-4 py-2 text-sm text-white backdrop-blur">{f.client}</span>
          </li>
        ))}
      </ul>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f4f5f7] to-transparent md:w-32" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f4f5f7] to-transparent md:w-32" />
    </div>
  );
};

const VALORS = [
  { w: "Esforç", t: "Hi posem hores, cap i ganes fins que surt bé." },
  { w: "Proximitat", t: "Som d'aquí i parlem clar, cara a cara." },
  { w: "Compromís", t: "El teu objectiu passa a ser el nostre." },
  { w: "Creativitat", t: "Idees que fan aturar el dit a la pantalla." },
  { w: "Honestedat", t: "Si una cosa no et convé, t'ho diem." },
  { w: "Resultats", t: "Mesurem el que fem i ho millorem cada mes." },
];

/** Valors: dues cintes de paraules que es creuen; el cursor les encén i les empeny */
export const Valors = () => {
  const ref = useRef<HTMLElement>(null);
  const move = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--vx", `${e.clientX - r.left}px`);
    el.style.setProperty("--vy", `${e.clientY - r.top}px`);
    el.style.setProperty("--vp", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--vr", "1");
  };
  const leave = () => ref.current?.style.setProperty("--vr", "0");

  const fila = (dir: "esq" | "dre", omplert: boolean) => (
    <div className={`valors-fila valors-fila--${dir}`}>
      <div className="valors-cinta">
        {[0, 1].map((k) => (
          <span key={k} className="flex shrink-0">
            {(dir === "esq" ? VALORS : [...VALORS].reverse()).map((v) => (
              <span key={v.w} className={`valors-paraula ${omplert ? "valors-paraula--plena" : ""}`}>
                {v.w}
                <span className="valors-punt">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      aria-labelledby="valors-title"
      className="valors relative overflow-hidden bg-[#0b1424] py-24 text-white md:py-32"
    >
      <h2 id="valors-title" className="sr-only">Els nostres valors</h2>
      <div aria-hidden="true" className="valors-llum" />

      <div aria-hidden="true" className="relative">
        <div className="valors-capa">
          {fila("esq", false)}
          {fila("dre", false)}
        </div>
        <div className="valors-capa valors-capa--plena">
          {fila("esq", true)}
          {fila("dre", true)}
        </div>
      </div>

      <ul className="relative z-10 mx-auto mt-16 grid max-w-[88rem] gap-x-10 gap-y-8 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {VALORS.map((v, i) => (
          <li key={v.w} className="valor-item" style={{ ["--i" as string]: i }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-lime">{v.w}</p>
            <p className="mt-2 text-xl font-light leading-snug text-white/85 md:text-2xl">{v.t}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
