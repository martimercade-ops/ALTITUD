"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface ClientLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

export interface LogoMarqueeContent {
  label: string;
  badge: { strong: string; text: string };
  heading: { text: string; strong: string };
  items: ClientLogo[];
}

export interface LogoMarqueeProps {
  content: LogoMarqueeContent;
}

/**
 * Mida òptica: tots els logos ocupen aproximadament la mateixa àrea,
 * de manera que els quadrats no es veuen enormes ni els allargats minúsculs.
 */
const AREA = 8200;
const MAX_H = 68;
const MIN_H = 24;
const MAX_W = 220;

const logoSize = ({ width, height }: ClientLogo) => {
  const ratio = width / height;
  let h = Math.min(MAX_H, Math.max(MIN_H, Math.sqrt(AREA / ratio)));
  let w = h * ratio;
  if (w > MAX_W) {
    w = MAX_W;
    h = w / ratio;
  }
  return { width: Math.round(w), height: Math.round(h) };
};

const Row = ({
  logos,
  reverse,
  duration,
}: {
  logos: ClientLogo[];
  reverse?: boolean;
  duration: number;
}) => (
  <div className="logos-fila group flex overflow-hidden">
    <div
      className={`logos-pista flex w-max shrink-0 items-center group-hover:[animation-play-state:paused] ${
        reverse ? "logos-pista--inversa" : ""
      }`}
      style={{ "--logos-durada": `${duration}s` } as CSSProperties}
    >
      {[0, 1].map((copy) =>
        logos.map((logo) => {
          const size = logoSize(logo);
          return (
            <div
              key={`${copy}-${logo.name}`}
              className="flex h-20 w-44 shrink-0 items-center justify-center px-4 md:h-24 md:w-60 md:px-6"
            >
              <img
                src={logo.src}
                alt=""
                width={size.width}
                height={size.height}
                loading="lazy"
                decoding="async"
                style={{ width: size.width, height: size.height }}
                className="max-w-full object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          );
        }),
      )}
    </div>
  </div>
);

export const LogoMarquee = ({ content }: LogoMarqueeProps) => {
  const { label, badge, heading, items } = content;
  const half = Math.ceil(items.length / 2);
  const ref = useRef<HTMLElement>(null);
  const [fora, setFora] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setFora(false);
    const io = new IntersectionObserver(([e]) => setFora(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      data-fora={fora ? "" : undefined}
      aria-labelledby="logos-title"
      className="bg-[#0b1424] py-20 text-white md:py-28"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2f5bff] px-4 py-1.5 text-xs uppercase tracking-wide text-white shadow-[0_0_30px_rgb(47_91_255/0.35)] md:text-sm">
          <strong className="font-bold">{badge.strong}</strong>
          <span className="font-light">{badge.text}</span>
        </span>
        <h2
          id="logos-title"
          className="mt-6 text-[1.6rem] font-light leading-[1.2] tracking-tight md:text-[2.25rem]"
        >
          {heading.text} <strong className="font-semibold">{heading.strong}</strong>
        </h2>
      </div>

      <ul className="sr-only" aria-label={label}>
        {items.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="mt-14 flex flex-col gap-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] md:mt-20 md:gap-4"
      >
        <Row logos={items.slice(0, half)} duration={70} />
        <Row logos={items.slice(half)} duration={80} reverse />
      </div>
    </section>
  );
};
