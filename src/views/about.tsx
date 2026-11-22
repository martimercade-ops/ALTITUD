"use client";

import { useEffect, useRef, useState } from "react";

export interface AboutContent {
  eyebrow: string;
  lead: string;
  mutedLead: string;
}

export interface AboutProps {
  content: AboutContent;
  labelId: string;
}

/**
 * «Més que una agència…»: la frase surt entre les muntanyes.
 * Capes: cel → frase → muntanyes. Amb l'scroll les muntanyes pugen més ràpid
 * que la frase (profunditat) i amb el cursor tot es mou una mica i el sol el segueix.
 */
export const About = ({ content, labelId }: AboutProps) => {
  const { eyebrow, lead, mutedLead } = content;
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(el);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => io.disconnect();

    let raf = 0;
    let mx = 0;
    let my = 0;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // 0 quan la secció entra per baix, 1 quan surt per dalt
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--mx", mx.toFixed(4));
      el.style.setProperty("--my", my.toFixed(4));
    };
    const ask = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
      ask();
    };
    window.addEventListener("scroll", ask, { passive: true });
    window.addEventListener("resize", ask);
    el.addEventListener("pointermove", move);
    paint();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", ask);
      window.removeEventListener("resize", ask);
      el.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const words = [
    ...lead.split(" ").map((w) => ({ w, muted: false })),
    ...mutedLead.split(" ").map((w) => ({ w, muted: true })),
  ];

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby={labelId}
      className={`cim ${on ? "cim--on" : ""} relative isolate flex min-h-[36rem] flex-col overflow-hidden text-center md:min-h-[58rem] lg:min-h-[115svh]`}
    >
      <span aria-hidden="true" className="cim-cel" />
      <span aria-hidden="true" className="cim-sol" />

      <div className="cim-text relative z-10 mx-auto max-w-6xl px-6 pt-24 md:pt-32 lg:pt-[16svh]">
        <p className="n1-entra mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-muted-small">
          <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-[0.15em] rounded-full bg-plum align-middle" />
          {eyebrow}
        </p>
        <h2
          id={labelId}
          aria-label={`${lead} ${mutedLead}`}
          className="text-[2.5rem] font-light leading-[1.04] tracking-tight sm:text-6xl lg:text-[5.5rem]"
        >
          {words.map(({ w, muted }, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`n1-paraula inline-block ${muted ? "cim-muted" : ""}`}
              style={{ ["--d" as string]: `${150 + i * 85}ms` }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
      </div>

      { }
      <img
        src="/assets/altitud/muntanyes-llac.webp"
        srcSet="/assets/altitud/muntanyes-llac-720.webp 720w, /assets/altitud/muntanyes-llac-1100.webp 1100w, /assets/altitud/muntanyes-llac-1440.webp 1440w, /assets/altitud/muntanyes-llac.webp 1920w"
        sizes="(max-width: 768px) 180vw, 100vw"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="cim-muntanyes pointer-events-none absolute -bottom-[12%] left-1/2 z-20 w-[180vw] max-w-none select-none md:w-[115vw] lg:w-[104vw]"
      />
      <span aria-hidden="true" className="cim-llac pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[16%]" />
    </section>
  );
};
