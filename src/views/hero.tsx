"use client";

import { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { subscribeToTicker } from "@/lib/animation/ticker";
import Image from "next/image";
import { HeroTitle } from "@/views/hero-title";
import { usePreloader } from "@/hooks/use-preloader";
import { FINALE_IMAGE_LAYER, FINALE_IMAGE_QUALITY, FINALE_IMAGE_SIZES } from "@/components/common/preloader/finale";
import { useRevealCascade } from "@/components/common/use-reveal-cascade";

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  titleLines: string[];
  sectionLabel: string;
  image: { src: string; alt: string };
  cta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  insightTitle: string;
  insightBody: string;
  stats?: HeroStat[];
}

export interface HeroProps {
  content: HeroContent;
}

const INSET = 24;
const RADIUS = 24;
const SHRINK_VH = 0.6;
const REVEAL_RISE = 20;
const REVEAL_BLUR = 10;
const HERO_ITEMS = 6;

const MARK =
  "M2 419 L63 419 L184 249 L305 419 L637 419 L340 0 L300 0Z M345 95 L539 370 L344 368Z M294 95 L294 315 L216 206Z";

/* Logo central: es dibuixa el contorn, s'omple de vidre i hi passa un reflex de llum.
   Es mou lleugerament amb el ratolí. */
const HeroMark = ({ on }: { on: boolean }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0)`;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <svg
      ref={ref}
      viewBox="-4 -4 648 424"
      preserveAspectRatio="xMidYMax meet"
      className={`hero-mark ${on ? "is-on" : ""}`}
    >
      <defs>
        <linearGradient id="hm-vidre" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="hm-llum" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="hm-clip">
          <path d={MARK} fillRule="evenodd" />
        </clipPath>
      </defs>
      <path className="hero-mark-fill" d={MARK} fillRule="evenodd" fill="url(#hm-vidre)" />
      <g clipPath="url(#hm-clip)">
        <rect className="hero-mark-llum" x="-200" y="-40" width="160" height="520" fill="url(#hm-llum)" />
      </g>
      <path
        className="hero-mark-traç"
        d={MARK}
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
        pathLength={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export const Hero = ({ content }: HeroProps) => {
  const {
    titleLines,
    sectionLabel,
    image,
    cta,
    secondaryCta,
    insightTitle,
    insightBody,
    stats = [],
  } = content;

  const sectionRef = useRef<HTMLElement>(null);
  const [{ p }, api] = useSpring(() => ({
    p: 0,
    config: { tension: 420, friction: 44 },
  }));

  const preloaderDone = usePreloader((s) => s.done);
  const { p: rp, localProg: revealProg } = useRevealCascade(HERO_ITEMS, {
    startWhen: preloaderDone,
  });
  const revealStyle = (i: number) => ({
    opacity: rp.to((v) => revealProg(v, i)),
    transform: rp.to((v) => `translateY(${REVEAL_RISE * (1 - revealProg(v, i))}px)`),
    filter: rp.to((v) => `blur(${REVEAL_BLUR * (1 - revealProg(v, i))}px)`),
  });

  useEffect(() => {
    const unsubscribe = subscribeToTicker(
      () => {
        const el = sectionRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        const dist = Math.max(1, window.innerHeight * SHRINK_VH);
        const raw = Math.min(Math.max(-top / dist, 0), 1);
        api.start({ p: raw });
      },
      () => 0,
    );
    return unsubscribe;
  }, [api]);

  return (
    <section
      ref={sectionRef}
      aria-label={sectionLabel}
      className="relative h-lvh bg-[#0b1424]"
    >
      <animated.div
        style={{
          clipPath: p.to(
            (v) => `inset(${v * INSET}px round ${v * RADIUS}px)`,
          ),
        }}
        data-hero-stage=""
        className="absolute inset-0 overflow-hidden"
      >
        <div className={FINALE_IMAGE_LAYER}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes={FINALE_IMAGE_SIZES}
            quality={FINALE_IMAGE_QUALITY}
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(11_20_36/0.62),transparent_38%,transparent_62%,rgb(11_20_36/0.72))]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/2 bg-gradient-to-t from-[rgb(11_20_36/0.88)] to-transparent"
        />
        <animated.div
          aria-hidden="true"
          style={{ transform: p.to((v) => `translate3d(0, ${v * -60}px, 0) scale(${1 + v * 0.06})`) }}
          className="pointer-events-none absolute inset-0 z-[1]"
        >
          <HeroMark on={preloaderDone} />
        </animated.div>

        <animated.div
          style={{ transform: p.to((v) => `scale(${1 - v * 0.1})`) }}
          className="absolute inset-0 z-10 flex flex-col px-6 pb-6 pt-5 text-white md:px-10 md:pb-10 lg:px-12 lg:pb-12"
        >
          <HeroTitle
            lines={titleLines}
            className="mt-24 text-[2.25rem] font-light leading-[1] tracking-tight sm:text-5xl lg:text-[3.5rem]"
          />

          <div className="mt-auto flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-end">
            {stats.length > 0 && (
            <ul className="flex gap-6 sm:gap-10">
              {stats.map((s, i) => (
                <animated.li
                  key={s.label}
                  style={revealStyle(i)}
                  className="border-l border-white pl-5 [will-change:transform,opacity]"
                >
                  <span className="block text-[2.25rem] font-light leading-none sm:text-5xl">
                    {s.value}
                  </span>
                  <span className="mt-3 block text-sm text-white">
                    {s.label}
                  </span>
                </animated.li>
              ))}
            </ul>
            )}

            <div className="max-w-lg">
              <animated.p
                style={revealStyle(3)}
                className="text-xl font-medium leading-snug [will-change:transform,opacity]"
              >
                {insightTitle}
              </animated.p>
              <animated.p
                style={revealStyle(4)}
                className="mt-4 hidden text-base leading-relaxed text-white/80 sm:block [will-change:transform,opacity]"
              >
                {insightBody}
              </animated.p>
              <animated.div
                style={revealStyle(5)}
                className="mt-8 flex items-center gap-6 [will-change:transform,opacity]"
              >
                <a
                  href={cta.href}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
                >
                  {cta.label}
                </a>
                <a
                  href={secondaryCta.href}
                  className="text-sm text-white underline underline-offset-4 hover:text-white/80"
                >
                  {secondaryCta.label}
                </a>
              </animated.div>
            </div>
          </div>
        </animated.div>
      </animated.div>
    </section>
  );
};
