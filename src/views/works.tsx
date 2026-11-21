"use client";

import { Tx, useI18n } from "@/i18n/client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { animated, useSpring } from "@react-spring/web";
import { subscribeToTicker } from "@/lib/animation/ticker";
import { AnimatedHeading } from "@/components/common/animated-heading";

export interface WorkItem {
  name: string;
  sector: string;
  description: string;
  href: string;
  image: string;
}

export interface WorksContent {
  heading: string;
  eyebrow: string;
  viewLabel: string;
  viewHref: string;
  items: WorkItem[];
}

export interface WorksProps {
  content: WorksContent;
}

const SCROLL_PER_CARD = 45;
const RADIUS = 1350;
const STEP = 27;

const pad = (n: number) => String(n).padStart(2, "0");

const backdropFrame = (i: number, v: number) => ({
  opacity: Math.max(0, 1 - Math.abs(i - v)),
  transform: `translateY(${(i - v) * 22}%) scale(1.6)`,
});

const cardFrame = (i: number, v: number) => {
  const rel = i - v;
  const rad = (rel * STEP * Math.PI) / 180;
  const y = RADIUS * Math.sin(rad);
  const z = RADIUS * Math.cos(rad) - RADIUS;
  const d = Math.abs(i - v);
  return {
    transform: `translate3d(0px, ${y}px, ${z}px) rotateX(${rel * STEP}deg) translate(-50%, -50%)`,
    opacity: d > 3.6 ? 0 : Math.max(0, 1 - d * 0.24),
  };
};

const scrimOpacity = (i: number, v: number) => Math.min(0.35, Math.abs(i - v) * 0.22);

export const Works = ({ content }: WorksProps) => {
  const { t } = useI18n();
  const { items, heading, eyebrow, viewLabel, viewHref } = content;
  const count = items.length;
  const sectionRef = useRef<HTMLElement>(null);
  const currentRef = useRef(0);
  const idxRef = useRef(0);
  const indexElRef = useRef<HTMLSpanElement>(null);
  const nameElRef = useRef<HTMLSpanElement>(null);
  const [{ f }, api] = useSpring(() => ({ f: 0 }));

  useEffect(() => {
    const unsubscribe = subscribeToTicker(
      () => {
        const el = sectionRef.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const p = Math.min(
          Math.max(-el.getBoundingClientRect().top / Math.max(1, total), 0),
          1,
        );
        const OVERSCAN = 0.2;
        const target = p * (count - 1 + OVERSCAN * 2) - OVERSCAN;
        currentRef.current += (target - currentRef.current) * 0.14;
        api.start({ f: currentRef.current, immediate: true });

        const idx = Math.min(
          count - 1,
          Math.max(0, Math.round(currentRef.current)),
        );
        if (idx !== idxRef.current) {
          idxRef.current = idx;
          if (indexElRef.current) indexElRef.current.textContent = pad(idx + 1);
          if (nameElRef.current) nameElRef.current.textContent = items[idx].name;
        }
      },
      () => 0,
    );
    return unsubscribe;
  }, [api, count, items]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label={heading}
      className="relative bg-card-dark text-white"
      style={{ height: `${100 + (count - 1) * SCROLL_PER_CARD}vh` }}
    >
      <div className="sticky top-0 h-lvh overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          {items.map((item, i) => (
            <animated.div
              key={item.name}
              suppressHydrationWarning
              className="absolute inset-0 [will-change:transform,opacity]"
              style={{
                opacity: f.to((v) => backdropFrame(i, v).opacity),
                transform: f.to((v) => backdropFrame(i, v).transform),
              }}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="60vw"
                quality={30}
                className="object-cover blur-2xl"
              />
            </animated.div>
          ))}
          <div className="absolute inset-0 bg-card-dark/55" />
        </div>

        <p className="absolute inset-x-0 top-20 z-30 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
          {eyebrow}
        </p>
        <AnimatedHeading
          as="h2"
          className="absolute inset-x-4 top-28 z-30 mx-auto max-w-4xl text-center text-[1.75rem] font-light leading-[1.05] tracking-tight sm:text-[2.25rem] lg:text-[2.75rem]"
        >
          {heading}
        </AnimatedHeading>

        <div className="absolute inset-0 [perspective:1900px] [transform-style:preserve-3d]">
          {items.map((item, i) => (
            <animated.a
              key={item.name}
              href={item.href}
              aria-label={`${t("Veure el projecte")} ${item.name}`}
              suppressHydrationWarning
              className="group absolute left-1/2 top-1/2 block aspect-[16/10] w-[90vw] max-w-[46rem] overflow-hidden rounded-3xl bg-card-dark shadow-2xl [backface-visibility:hidden] [will-change:transform]"
              style={{
                transform: f.to((v) => cardFrame(i, v).transform),
                opacity: f.to((v) => cardFrame(i, v).opacity),
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 90vw, 736px"
                className="object-cover object-top"
              />
              <animated.div
                aria-hidden="true"
                suppressHydrationWarning
                className="absolute inset-0 bg-black"
                style={{ opacity: f.to((v) => scrimOpacity(i, v)) }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16 text-white sm:p-7 sm:pt-20">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">{item.sector}</p>
                <p className="mt-1 text-sm leading-snug sm:text-base">{item.description}</p>
                <p className="mt-2 text-xs font-medium text-white/80 underline-offset-4 group-hover:text-white group-hover:underline">
                  <Tx>Veure el projecte →</Tx>
                </p>
              </div>
            </animated.a>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-4 top-1/2 z-30 grid -translate-y-1/2 grid-cols-[auto_1fr_auto] items-center gap-4 text-sm tracking-wide sm:inset-x-8 sm:gap-6">
          <span className="justify-self-start tabular-nums text-white/50">
            <span ref={indexElRef}>{pad(1)}</span> / {pad(count)}
          </span>
          <span
            ref={nameElRef}
            className="justify-self-center truncate text-lg leading-snug tracking-tight text-white sm:text-2xl"
          >
            {items[0].name}
          </span>
          <a
            href={viewHref}
            className="pointer-events-auto justify-self-end whitespace-nowrap rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white/80 hover:border-white/60 hover:text-white sm:px-6 sm:py-3"
          >
            {viewLabel}
          </a>
        </div>
      </div>
    </section>
  );
};
