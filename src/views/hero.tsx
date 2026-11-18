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
      className="relative h-lvh bg-hero-page"
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
        <div aria-hidden="true" className="logo-vidre logo-vidre--dreta" />

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
