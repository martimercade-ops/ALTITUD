"use client";

import { animated } from "@react-spring/web";
import { Inview } from "@/components/common/robot-inview";
import { useRevealCascade } from "@/components/common/use-reveal-cascade";

export interface AboutContent {
  eyebrow: string;
  lead: string;
  mutedLead: string;
}

export interface AboutProps {
  content: AboutContent;
  labelId: string;
}

const RISE = 16;
const BLUR = 8;
const CHIP_MIN_SCALE = 0.3;

const Chip = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => (
  <span
    className={`mx-[0.15em] inline-flex h-[0.82em] w-[0.82em] translate-y-[0.08em] items-center justify-center rounded-full text-white ${className}`}
  >
    {children}
  </span>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[0.5em] w-[0.5em]" fill="currentColor" aria-hidden="true">
    <rect x="4" y="12" width="4" height="8" rx="1" />
    <rect x="10" y="7" width="4" height="13" rx="1" />
    <rect x="16" y="3" width="4" height="17" rx="1" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[0.55em] w-[0.55em]" fill="currentColor" aria-hidden="true">
    <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
  </svg>
);

const letterCount = (s: string) => [...s].filter((c) => c !== " ").length;

export const About = ({ content, labelId }: AboutProps) => {
  const { lead, mutedLead } = content;
  const leadLen = letterCount(lead);
  const mutedLen = letterCount(mutedLead);
  const total = leadLen + 1 + mutedLen + 1;
  const { p, rootRef, localProg } = useRevealCascade<HTMLHeadingElement>(total);

  const runLetters = (text: string, from: number) => {
    const words = text.split(" ");
    const nodes: React.ReactNode[] = [];
    let i = from;
    words.forEach((word, wi) => {
      nodes.push(
        <span key={`w${from}-${wi}`} aria-hidden="true" className="inline-block">
          {[...word].map((ch, ci) => {
            const idx = i;
            i += 1;
            return (
              <animated.span
                key={ci}
                className="inline-block [will-change:transform,opacity]"
                style={{
                  opacity: p.to((v) => localProg(v, idx)),
                  transform: p.to(
                    (v) => `translateY(${RISE * (1 - localProg(v, idx))}px)`,
                  ),
                  filter: p.to((v) => `blur(${BLUR * (1 - localProg(v, idx))}px)`),
                }}
              >
                {ch}
              </animated.span>
            );
          })}
        </span>,
      );
      if (wi < words.length - 1) {
        nodes.push(
          <span key={`s${from}-${wi}`} aria-hidden="true">
            {" "}
          </span>,
        );
      }
    });
    return { nodes, next: i };
  };

  const chip = (
    idx: number,
    className: string,
    icon: React.ReactNode,
  ) => (
    <animated.span
      aria-hidden="true"
      className="inline-block [will-change:transform,opacity]"
      style={{
        opacity: p.to((v) => localProg(v, idx)),
        transform: p.to(
          (v) => `scale(${CHIP_MIN_SCALE + (1 - CHIP_MIN_SCALE) * localProg(v, idx)})`,
        ),
        filter: p.to((v) => `blur(${BLUR * (1 - localProg(v, idx))}px)`),
      }}
    >
      <Chip className={className}>{icon}</Chip>
    </animated.span>
  );

  const leadRun = runLetters(lead, 0);
  const chip1Idx = leadRun.next;
  const mutedRun = runLetters(mutedLead, chip1Idx + 1);
  const chip2Idx = mutedRun.next;

  return (
    <section
      id="about"
      aria-labelledby={labelId}
      className="bg-hero-page px-6 pb-32 pt-16 text-center"
    >
      <Inview
        tag="p"
        innerTag="span"
        mode="once"
        from={{ opacity: 0, y: 12 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 260, friction: 30 }}
        className="mb-6 block text-xs font-semibold uppercase tracking-[0.35em] text-muted-small"
      >
        <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-[0.15em] rounded-full bg-plum align-middle" />
        {content.eyebrow}
      </Inview>

      <h2
        ref={rootRef}
        id={labelId}
        aria-label={`${lead} ${mutedLead}`}
        className="mx-auto block max-w-4xl text-[2rem] font-light leading-[0.95] tracking-tight text-black sm:text-[2.5rem] lg:text-[4rem]"
      >
        {leadRun.nodes}
        {chip(chip1Idx, "bg-accent-blue", <ChartIcon />)}{" "}
        <span className="text-muted">
          {mutedRun.nodes}
          {chip(chip2Idx, "bg-accent-lime text-black", <BoltIcon />)}
        </span>
      </h2>
    </section>
  );
};
