"use client";

import Image from "next/image";
import { animated } from "@react-spring/web";
import { useRevealCascade } from "@/components/common/use-reveal-cascade";

export interface StatsContent {
  label: string;
  brand: string;
  collab: { value: string; desc: string };
  commitment: { eyebrow: string; value: string; quote: string; author: string; avatars: string[] };
  image: string;
  /** Enquadrament de la foto (classe object-position de Tailwind) */
  imagePosition?: string;
  data: { label: string; value: string; desc: string; tags?: string[] };
  reach: { label: string; value: string };
}

export interface StatsProps {
  content: StatsContent;
}

const CARD_RISE = 24;
const CARD_BLUR = 12;

const BarsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <rect x="4" y="12" width="4" height="8" rx="1" />
    <rect x="10" y="7" width="4" height="13" rx="1" />
    <rect x="16" y="3" width="4" height="17" rx="1" />
  </svg>
);

const STAT_NUM =
  "font-light leading-none tracking-tight text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem]";

export const Stats = ({ content }: StatsProps) => {
  const { brand, collab, commitment, data, reach } = content;
  const { p, rootRef, localProg } = useRevealCascade<HTMLDivElement>(4);
  const cardStyle = (i: number) => ({
    opacity: p.to((v) => localProg(v, i)),
    transform: p.to((v) => `translateY(${CARD_RISE * (1 - localProg(v, i))}px)`),
    filter: p.to((v) => `blur(${CARD_BLUR * (1 - localProg(v, i))}px)`),
  });
  return (
    <section
      aria-label={content.label}
      id="results"
      className="bg-hero-page px-6 pb-32 md:px-12 lg:px-page-gutter"
    >
      <div ref={rootRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <animated.article
          style={cardStyle(0)}
          className="relative flex min-h-[32rem] flex-col justify-end overflow-hidden rounded-3xl bg-card-blue p-7 text-black [will-change:transform,opacity]"
        >
          <Image
            src={content.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            quality={90}
            className={`object-cover ${content.imagePosition ?? "object-[82%_50%]"}`}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/25"
            aria-hidden="true"
          />
          <span className="absolute left-7 top-7 text-lg font-medium tracking-tight text-white">
            {brand}
          </span>
          <span className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-card-blue">
            <BarsIcon />
          </span>
          <div className="relative rounded-2xl bg-white p-6 text-black">
            <div className={STAT_NUM}>{collab.value}</div>
            <p className="mt-3 max-w-xs text-base leading-relaxed text-black/60">
              {collab.desc}
            </p>
          </div>
        </animated.article>

        <animated.article
          style={cardStyle(1)}
          className="flex min-h-[32rem] flex-col rounded-3xl bg-card-gray p-8 text-black [will-change:transform,opacity]"
        >
          <p className="text-base leading-relaxed text-black/55">
            {commitment.eyebrow}
          </p>
          <div className={`mt-4 ${STAT_NUM}`}>{commitment.value}</div>
          <div className="mt-auto">
            <div className="mb-6 flex">
              {commitment.avatars.map((src, i) => (
                <span
                  key={i}
                  className="relative -ml-3 h-11 w-11 overflow-hidden rounded-full border-2 border-card-gray first:ml-0"
                >
                  <Image src={src} alt="" fill sizes="44px" className="object-cover" />
                </span>
              ))}
            </div>
            <blockquote className="max-w-md text-xl leading-snug tracking-tight text-black/80">
              &ldquo;{commitment.quote}&rdquo;
              <footer className="mt-3 text-sm tracking-normal text-black/55">{commitment.author}</footer>
            </blockquote>
          </div>
        </animated.article>

        <div className="flex flex-col gap-6">
          <animated.article
            style={cardStyle(2)}
            className="flex flex-1 flex-col rounded-3xl bg-card-blue p-8 text-white [will-change:transform,opacity]"
          >
            <p className="text-sm text-white">{data.label}</p>
            <div className={`mt-4 ${STAT_NUM}`}>{data.value}</div>
            <div className="mt-auto">
              {data.tags && (
                <ul className="mb-5 flex flex-wrap gap-2">
                  {data.tags.map((t) => (
                    <li key={t} className="rounded-full border border-white/35 px-3 py-1 text-sm text-white">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <p className="max-w-xs text-base leading-relaxed text-white">{data.desc}</p>
            </div>
          </animated.article>
          <animated.article
            style={cardStyle(3)}
            className="flex items-center justify-between rounded-3xl bg-card-dark px-8 py-10 text-white [will-change:transform,opacity]"
          >
            <span className="text-lg text-white/55">{reach.label}</span>
            <span className={STAT_NUM}>{reach.value}</span>
          </animated.article>
        </div>
      </div>
    </section>
  );
};
