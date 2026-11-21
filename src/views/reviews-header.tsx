"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";

const FRASE_CA = "Cada cim comença amb un primer pas.";

/** Capçalera de les ressenyes: títol amb llum que hi passa i xifres que compten */
export const ReviewsHeader = () => {
  const FRASE = useI18n().t(FRASE_CA).split(" ");
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setRun(true);
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`n1 ${run ? "n1--on" : ""} relative mx-auto max-w-6xl px-4 text-center md:px-10`}>
      <span aria-hidden="true" className="n1-halo" />
      <p className="n1-entra text-xs font-semibold uppercase tracking-[0.35em] text-muted-small">Altitud Digital</p>
      <h2 id="reviews-title" aria-label={FRASE.join(" ")} className="n1-titol mt-5 text-[2.6rem] font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-[5rem]">
        {FRASE.map((w, i) => (
          <span key={i} aria-hidden="true" className={`n1-paraula inline-block ${w === "cim" ? "font-semibold" : ""}`} style={{ ["--d" as string]: `${120 + i * 90}ms` }}>
            {w}
            {i < FRASE.length - 1 ? "\u00a0" : ""}
          </span>
        ))}
      </h2>
    </div>
  );
};
