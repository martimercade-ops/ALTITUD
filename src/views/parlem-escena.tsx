"use client";
import { useI18n } from "@/i18n/client";

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
        el.style.setProperty("--mx", String((e.clientX / window.innerWidth - 0.5) * 2));
        el.style.setProperty("--my", String((e.clientY / window.innerHeight - 0.5) * 2));
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
      <span className="parlem-logo" />
      <span className="parlem-focus" />
      <span className="parlem-gra" />
    </div>
  );
};

/** «Parlem.» lletra a lletra */
export const ParlemTitol = ({ id }: { id: string }) => {
  const text = useI18n().t("Parlem.");
  const llarg = text.length > 8;
  let n = 0;
  return (
    <h1
      id={id}
      aria-label={text}
      className={`font-light leading-[0.9] tracking-tight ${llarg ? "text-[3.6rem] sm:text-[5.25rem] lg:text-[5.75rem]" : "text-[4.5rem] sm:text-[6.5rem] lg:text-[7.5rem]"}`}
    >
      {text.split(" ").map((paraula, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {paraula.split("").map((ch) => (
            <span key={n} aria-hidden="true" className="lletra-puja inline-block" style={{ animationDelay: `${150 + n++ * 70}ms` }}>
              {ch}
            </span>
          ))}
          {w < text.split(" ").length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </h1>
  );
};
