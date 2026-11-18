"use client";

import { AnimatedHeading } from "@/components/common/animated-heading";
import { Reveal } from "@/components/common/reveal";

export interface ReviewItem {
  name: string;
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
      <svg key={star} viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5 fill-[#fbbc04]">
        <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
      </svg>
    ))}
  </span>
);

export const GoogleMark = () => (
  <svg viewBox="0 0 24 24" aria-label="Google" role="img" className="h-5 w-5 shrink-0">
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.2v3.1A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.2a12 12 0 0 0 0 10.8z" />
    <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.2 6.6l4.1 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
  </svg>
);

const initials = (name: string) =>
  name
    .replace(/[^\p{L}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

/** Tons suaus per als avatars amb inicials */
const TONES = ["bg-[#e8edff] text-[#2f5bff]", "bg-[#eef7d6] text-[#4d6b10]", "bg-[#f1ecff] text-[#6b4fd8]", "bg-[#e6f4f1] text-[#1f7a68]", "bg-[#fff1e6] text-[#b35a14]"];

export const Reviews = ({ content }: { content: ReviewsContent }) => {
  const { eyebrow, heading, score, basis, link, items } = content;
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative z-20 bg-hero-page px-4 py-24 text-black md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-small">{eyebrow}</p>
          <AnimatedHeading
            as="h2"
            id="reviews-title"
            className="mt-6 text-[1.75rem] font-light leading-[1.05] tracking-tight text-black sm:text-[2.25rem] lg:text-[2.75rem]"
          >
            {heading}
          </AnimatedHeading>
          <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-black/10 py-2 pl-3 pr-5">
            <GoogleMark />
            <span className="text-[1.6rem] font-light leading-none">{score}</span>
            <Stars />
            <span className="text-sm text-black/55">{basis}</span>
          </div>
        </div>

        <div className="relative mt-12">
          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>li]:mb-4">
            {items.map((item, i) => (
              <Reveal
                key={item.name}
                as="li"
                className={`reveal-up break-inside-avoid ${i >= 12 ? "hidden lg:block" : i >= 6 ? "hidden sm:block" : ""}`}
                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
              >
                <figure className="rounded-2xl border border-black/[0.07] bg-[#f6f7f9] p-5 transition-colors hover:border-black/15 hover:bg-white">
                  <Stars />
                  <blockquote className="mt-3 text-[14px] leading-[1.55] text-black/75">{item.text}</blockquote>
                  <figcaption className="mt-4 flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${TONES[i % TONES.length]}`}
                    >
                      {initials(item.name)}
                    </span>
                    <span className="min-w-0 truncate text-[13px] font-medium text-black/80">{item.name}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
          {/* Difuminat final que convida a veure'n més */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-hero-page via-hero-page/80 to-transparent" />
        </div>

        <div className="relative -mt-6 flex justify-center">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-black pl-6 pr-2 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          >
            {link.label}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:translate-x-0.5">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};
