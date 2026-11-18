"use client";

import Image from "next/image";
import { animated } from "@react-spring/web";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { useRevealCascade } from "@/components/common/use-reveal-cascade";
import type { ProductContent } from "@/data/mocks/product";

export interface ProductProps {
  content: ProductContent;
}

const CARD_RISE = 24;
const CARD_BLUR = 12;

export const Product = ({ content }: ProductProps) => {
  const { labelId, heading, cta, cards } = content;
  const { p, rootRef, localProg } = useRevealCascade<HTMLDivElement>(3);
  const cardStyle = (i: number) => ({
    opacity: p.to((v) => localProg(v, i)),
    transform: p.to((v) => `translateY(${CARD_RISE * (1 - localProg(v, i))}px)`),
    filter: p.to((v) => `blur(${CARD_BLUR * (1 - localProg(v, i))}px)`),
  });
  return (
    <section
      aria-labelledby={labelId}
      className="relative z-20 bg-hero-page px-6 py-24 text-black md:px-12 lg:px-page-gutter"
    >
      <div className="mb-14 flex flex-col items-center text-center">
        <AnimatedHeading
          as="h2"
          id={labelId}
          className="text-[2rem] font-light leading-[0.95] tracking-tight text-black sm:text-[2.5rem] lg:text-[4rem]"
        >
          {heading}
        </AnimatedHeading>
        <a
          href={cta.href}
          className="mt-8 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90"
        >
          {cta.label}
        </a>
      </div>

      <div ref={rootRef} className="grid gap-5 lg:grid-cols-4">
        <animated.article
          style={cardStyle(0)}
          className="relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-3xl p-8 text-white lg:col-span-2 [will-change:transform,opacity]"
        >
          <Image
            src={cards.grow.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
          <h3 className="relative text-xl leading-snug tracking-tight">
            {cards.grow.title}
          </h3>
          <p className="relative max-w-xs text-lg text-white/90">
            {cards.grow.body}
          </p>
        </animated.article>

        <animated.article
          style={cardStyle(1)}
          className="flex min-h-[26rem] flex-col justify-between rounded-3xl bg-card-gray p-8 text-black [will-change:transform,opacity]"
        >
          <h3 className="text-xl leading-snug tracking-tight">
            {cards.liquid.title}
          </h3>
          <p className="text-base text-black/70">{cards.liquid.body}</p>
        </animated.article>

        <animated.article
          style={cardStyle(2)}
          className="flex min-h-[26rem] flex-col justify-between rounded-3xl bg-card-gray p-8 text-black [will-change:transform,opacity]"
        >
          <h3 className="text-xl leading-snug tracking-tight">
            {cards.hands.title}
          </h3>
          <p className="text-base text-black/70">{cards.hands.body}</p>
        </animated.article>
      </div>
    </section>
  );
};
