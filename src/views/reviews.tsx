"use client";

import Image from "next/image";
import { animated } from "@react-spring/web";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { useRevealCascade } from "@/components/common/use-reveal-cascade";

export interface ReviewItem {
  name: string;
  avatar: string;
  date: string;
  text: string;
}

export interface ReviewsContent {
  eyebrow: string;
  heading: string;
  score: string;
  basis: string;
  link: { label: string; href: string };
  items: ReviewItem[];
}

const Stars = () => (
  <span role="img" aria-label="5 de 5 estrelles" className="flex gap-0.5">
    {[0, 1, 2, 3, 4].map((star) => (
      <svg key={star} viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-[#fbbc04]">
        <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
      </svg>
    ))}
  </span>
);

const GoogleMark = () => (
  <svg viewBox="0 0 24 24" aria-label="Google" role="img" className="h-5 w-5 shrink-0">
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.2v3.1A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.2a12 12 0 0 0 0 10.8z" />
    <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.2 6.6l4.1 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
  </svg>
);

const CARD_RISE = 24;
const CARD_BLUR = 12;

export const Reviews = ({ content }: { content: ReviewsContent }) => {
  const { eyebrow, heading, score, basis, link, items } = content;
  const { p, rootRef, localProg } = useRevealCascade<HTMLUListElement>(items.length);
  const cardStyle = (i: number) => ({
    opacity: p.to((v) => localProg(v, i)),
    transform: p.to((v) => `translateY(${CARD_RISE * (1 - localProg(v, i))}px)`),
    filter: p.to((v) => `blur(${CARD_BLUR * (1 - localProg(v, i))}px)`),
  });
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative z-20 bg-hero-page px-6 py-24 text-black md:px-12 lg:px-page-gutter"
    >
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.35em] text-muted-small">
        {eyebrow}
      </p>
      <AnimatedHeading
        as="h2"
        id="reviews-title"
        className="text-center text-[1.75rem] font-light leading-[1.05] tracking-tight text-black sm:text-[2.25rem] lg:text-[2.75rem]"
      >
        {heading}
      </AnimatedHeading>
      <div className="mb-14 mt-8 flex flex-col items-center gap-2">
        <p className="flex items-center gap-3">
          <span className="text-[2.25rem] font-light leading-none">{score}</span>
          <Stars />
        </p>
        <p className="flex items-center gap-2 text-sm text-black/70">
          <GoogleMark /> {basis}
        </p>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline underline-offset-4 hover:text-black/70"
        >
          {link.label}
        </a>
      </div>

      <ul ref={rootRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {items.map((item, i) => (
          <animated.li
            key={item.name}
            style={cardStyle(i)}
            className={`flex flex-col gap-4 rounded-3xl bg-card-gray p-7 [will-change:transform,opacity] ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
          >
            <div className="flex items-center gap-3">
              <Image src={item.avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
              <p className="min-w-0 flex-1 text-base leading-tight">
                <span className="block truncate">{item.name}</span>
                <span className="text-sm text-black/55">{item.date}</span>
              </p>
              <GoogleMark />
            </div>
            <Stars />
            <p className="text-sm leading-relaxed text-black/80">{item.text}</p>
          </animated.li>
        ))}
      </ul>
    </section>
  );
};
