"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { to: 100, prefix: "+", label: "clients a Andorra" },
  { to: 200, prefix: "+", label: "projectes" },
  { to: 98, prefix: "", label: "ressenyes ★★★★★" },
  { to: 6, prefix: "+", suffix: " anys", label: "d'experiència" },
];

const Counter = ({ to, prefix = "", suffix = "", run }: { to: number; prefix?: string; suffix?: string; run: boolean }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1800);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (
    <span className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
};

/** Capçalera de les ressenyes: títol amb llum que hi passa i xifres que compten */
export const ReviewsHeader = () => {
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
      <p className="n1-entra text-xs font-semibold uppercase tracking-[0.35em] text-muted-small">Valoracions</p>
      <h2 id="reviews-title" className="n1-entra n1-titol mt-5 text-[2.6rem] font-light leading-[1] tracking-tight sm:text-6xl lg:text-[5.25rem]" style={{ animationDelay: "120ms" }}>
        L&apos;agència <span className="font-semibold">nº1</span> d&apos;Andorra
      </h2>
      <dl className="mt-12 grid grid-cols-2 gap-y-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className="n1-entra relative px-3" style={{ animationDelay: `${300 + i * 120}ms` }}>
            {i > 0 && <span aria-hidden="true" className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-black/10 md:block" />}
            <dd className="text-[2.6rem] font-light leading-none tracking-tight md:text-[3.5rem]">
              <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} run={run} />
            </dd>
            <dt className="mt-2 text-sm text-black/55">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
};
