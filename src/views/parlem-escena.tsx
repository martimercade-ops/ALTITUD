"use client";

import { useEffect, useRef } from "react";

/** Fons de Parlem: aurora que es mou sola i un focus de llum que segueix el ratolí */
export const ParlemEscena = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--fx", `${e.clientX - r.left}px`);
        el.style.setProperty("--fy", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="parlem-escena pointer-events-none absolute inset-0 overflow-hidden">
      <span className="aurora aurora--1" />
      <span className="aurora aurora--2" />
      <span className="aurora aurora--3" />
      <span className="parlem-focus" />
      <span className="parlem-gra" />
    </div>
  );
};

/** «Parlem.» lletra a lletra */
export const ParlemTitol = ({ id }: { id: string }) => (
  <h1 id={id} aria-label="Parlem." className="text-[4.5rem] font-light leading-[0.9] tracking-tight sm:text-[6.5rem] lg:text-[9rem]">
    {"Parlem.".split("").map((ch, i) => (
      <span key={i} aria-hidden="true" className="lletra-puja inline-block" style={{ animationDelay: `${150 + i * 70}ms` }}>
        {ch}
      </span>
    ))}
  </h1>
);
