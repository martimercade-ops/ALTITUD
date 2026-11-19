"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedHeading } from "@/components/common/animated-heading";

export interface ShowcaseItem {
  id?: string;
  href?: string;
  prefix: string;
  name: string;
  description: string;
  image: string;
}

export interface ShowcaseContent {
  heading: string;
  cta: { label: string; href: string };
  items: ShowcaseItem[];
  extra?: { label: string; items: { label: string; href: string }[] };
  tools?: { label: string; items: string[] };
}

export interface ShowcaseProps {
  content: ShowcaseContent;
}

const AUTOPLAY_MS = 5200;

const pad = (n: number) => String(n).padStart(2, "0");

/* Escriptori: acordió horitzontal. La columna activa s'eixampla i mostra la foto;
   les altres queden estretes amb el títol en vertical. */
const Accordion = ({ items }: { items: ShowcaseItem[] }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [calm, setCalm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCalm(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = visible && !paused && !calm;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % items.length), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [running, active, items.length]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative z-[1] hidden h-[min(78vh,820px)] min-h-[560px] border-y border-white/10 lg:flex"
    >
      {items.map((item, i) => {
        const on = i === active;
        return (
          <Link
            key={item.name}
            id={item.id}
            href={item.href ?? "#"}
            aria-label={`${item.prefix} ${item.name}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            style={{ flexGrow: on ? 5.2 : 1 }}
            className="showcase-col group relative min-w-0 basis-0 scroll-mt-24 overflow-hidden border-l border-white/10 first:border-l-0 focus-visible:outline-none"
          >
            {/* Foto apagada de fons a les columnes tancades */}
            <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-700 ${on ? "opacity-0" : "opacity-100"}`}>
              <Image src={item.image} alt="" fill sizes="12vw" quality={60} className="object-cover opacity-[0.18] grayscale transition-all duration-700 group-hover:opacity-50 group-hover:grayscale-0 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1424] via-[#0b1424]/40 to-[#0b1424]/70" />
            </div>

            {/* Foto */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(.7,0,.2,1)] ${
                on ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_0_100%)]"
              }`}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="55vw"
                quality={85}
                className={`object-cover transition-transform duration-[1600ms] ease-out ${on ? "scale-100" : "scale-[1.12]"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
            </div>

            {/* Número */}
            <span
              className={`absolute left-6 top-7 z-[1] text-xs font-medium tracking-[0.2em] transition-colors duration-500 ${
                on ? "text-white/75" : "text-white/40"
              }`}
            >
              {pad(i + 1)}
            </span>

            {/* Títol vertical (columna estreta) */}
            <span
              aria-hidden="true"
              className={`absolute bottom-8 left-1/2 z-[1] -translate-x-1/2 rotate-180 whitespace-nowrap text-lg font-light tracking-tight text-white/75 transition-opacity [writing-mode:vertical-rl] ${
                on ? "opacity-0 duration-200" : "opacity-100 delay-300 duration-500 group-hover:text-white"
              }`}
            >
              {item.prefix} <span className="font-normal">{item.name}</span>
            </span>

            {/* Text de la columna oberta */}
            <div
              className={`absolute bottom-10 left-8 z-[1] w-[min(30vw,460px)] text-white transition-all ${
                on ? "translate-y-0 opacity-100 delay-[450ms] duration-700" : "pointer-events-none translate-y-4 opacity-0 duration-200"
              }`}
            >
              <span className="block text-[2.4rem] font-light leading-[1.02] tracking-tight">{item.prefix}</span>
              <span className="block text-[2.4rem] font-normal leading-[1.02] tracking-tight">{item.name}</span>
              <span className="mt-4 block max-w-[34ch] text-base leading-snug text-white/85">{item.description}</span>
              {item.href && (
                <span className="mt-6 inline-flex items-center gap-3 rounded-full bg-accent-lime px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-transform duration-300 group-hover:translate-x-1">
                  Veure servei <span aria-hidden="true">→</span>
                </span>
              )}
            </div>

            {/* Progrés de la rotació automàtica */}
            {on && running && (
              <span
                key={active}
                aria-hidden="true"
                className="showcase-progress absolute inset-x-0 bottom-0 z-[1] h-[3px] origin-left bg-gradient-to-r from-[#2f5bff] to-accent-lime"
                style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
};

/* Mòbil i tauleta: llista neta amb foto petita */
const MobileList = ({ items }: { items: ShowcaseItem[] }) => (
  <ul className="relative z-[1] border-t border-white/10 lg:hidden">
    {items.map((item, i) => (
      <li key={item.name} className="border-b border-white/10">
        <Link
          href={item.href ?? "#"}
          className="flex items-center gap-4 px-6 py-5 active:bg-white/[0.05] md:px-10"
        >
          <span className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-xl md:h-[110px] md:w-[110px]">
            <Image src={item.image} alt="" fill sizes="110px" quality={80} className="object-cover" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-medium tracking-[0.2em] text-white/40">{pad(i + 1)}</span>
            <span className="mt-1 block text-lg leading-[1.15] tracking-tight text-white">
              <span className="font-light">{item.prefix}</span> {item.name}
            </span>
            <span className="mt-1 block text-sm leading-snug text-white/55">{item.description}</span>
          </span>
          <span aria-hidden="true" className="shrink-0 text-lg text-accent-lime">→</span>
        </Link>
      </li>
    ))}
  </ul>
);

export const Showcase = ({ content }: ShowcaseProps) => {
  const { heading, cta, items, extra, tools } = content;
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--fx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--fy", `${e.clientY - r.top}px`);
  };
  return (
    <section
      onPointerMove={onMove}
      id="services"
      aria-labelledby="showcase-title"
      className="serveis-fosc relative isolate overflow-hidden bg-[#0b1424] text-white"
    >
      <span aria-hidden="true" className="serveis-aurora" />
      <span aria-hidden="true" className="serveis-focus" />
      <div className="relative z-[1] flex flex-col gap-8 px-6 pb-12 pt-20 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-14 lg:pt-28">
        <AnimatedHeading
          as="h2"
          id="showcase-title"
          className="max-w-[24ch] text-[1.75rem] font-light leading-[1.08] tracking-tight sm:text-[2.25rem] lg:text-[2.75rem]"
        >
          {heading}
        </AnimatedHeading>
        <a
          href={cta.href}
          className="inline-block shrink-0 self-start rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-accent-lime hover:bg-accent-lime hover:text-black lg:self-auto"
        >
          {cta.label}
        </a>
      </div>

      <Accordion items={items} />
      <MobileList items={items} />

      {extra && extra.items.length > 0 && (
        <div className="relative z-[1] flex flex-wrap items-center gap-3 px-6 py-8 md:px-10 lg:px-12">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">{extra.label}</span>
          {extra.items.map((x) => (
            <Link
              key={x.href}
              href={x.href}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm text-white/85 backdrop-blur transition-colors hover:border-accent-lime hover:bg-accent-lime hover:text-black"
            >
              {x.label}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          ))}
        </div>
      )}

      {tools && (
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 relative z-[1] border-t border-white/10 px-6 py-6 md:px-10 lg:px-12">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">{tools.label}</span>
          {tools.items.map((t) => (
            <span key={t} className="text-[14px] text-white/50">{t}</span>
          ))}
        </div>
      )}
    </section>
  );
};
