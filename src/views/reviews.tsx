"use client";

import { AnimatedHeading } from "@/components/common/animated-heading";
import { Reveal } from "@/components/common/reveal";
import { ReviewsHeader } from "@/views/reviews-header";

export interface ReviewItem {
  name: string;
  text: string;
  /** Foto de perfil de Google, si la tenim */
  avatar?: string;
}

export interface ReviewsContent {
  eyebrow: string;
  heading: string;
  basis: string;
  link: { label: string; href: string };
  items: ReviewItem[];
}

const Stars = ({ size = "h-3.5 w-3.5" }: { size?: string }) => (
  <span role="img" aria-label="5 de 5 estrelles" className="flex gap-0.5">
    {[0, 1, 2, 3, 4].map((star) => (
      <svg key={star} viewBox="0 0 20 20" aria-hidden="true" className={`${size} fill-[#fbbc04]`}>
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

/** Colors dels avatars de Google quan no hi ha foto */
const TONES = ["bg-[#1a73e8]", "bg-[#188038]", "bg-[#e37400]", "bg-[#a142f4]", "bg-[#d93025]", "bg-[#12b5cb]"];

const Card = ({ item, i }: { item: ReviewItem; i: number }) => (
  <figure className="flex h-full w-[19rem] shrink-0 flex-col rounded-2xl border border-black/[0.08] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:w-[22rem]">
    <figcaption className="flex items-center gap-3">
      {item.avatar ? (
         
        <img src={item.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" loading="lazy" />
      ) : (
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white ${TONES[i % TONES.length]}`}
        >
          {initials(item.name)}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium text-[#202124]">{item.name}</span>
        <span className="block text-xs text-[#5f6368]">Ressenya de Google</span>
      </span>
      <GoogleMark />
    </figcaption>
    <div className="mt-3">
      <Stars />
    </div>
    <blockquote className="mt-2 line-clamp-5 text-[14px] leading-[1.55] text-[#3c4043]">{item.text}</blockquote>
  </figure>
);

/** Fila que gira sola; es para en passar-hi el ratolí */
const Row = ({ items, offset, reverse }: { items: ReviewItem[]; offset: number; reverse?: boolean }) => (
  <div className="ressenyes-fila group relative overflow-hidden">
    <ul
      className={`ressenyes-pista flex w-max gap-4 py-2 ${reverse ? "ressenyes-pista--inversa" : ""}`}
      style={{ animationDuration: `${items.length * 7}s` }}
    >
      {[...items, ...items].map((item, i) => (
        <li key={`${item.name}-${i}`} aria-hidden={i >= items.length || undefined} className="flex">
          <Card item={item} i={i + offset} />
        </li>
      ))}
    </ul>
  </div>
);

export const Reviews = ({ content }: { content: ReviewsContent }) => {
  const { basis, link, items } = content;
  const half = Math.ceil(items.length / 2);
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative z-20 overflow-hidden bg-hero-page pb-24 pt-24 text-black md:pt-32"
    >
      <ReviewsHeader />

      <div className="ressenyes mt-16 flex flex-col gap-4">
        <Row items={items.slice(0, half)} offset={0} />
        <Row items={items.slice(half)} offset={half} reverse />
      </div>

      <div className="mt-10 flex justify-center px-4">
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
    </section>
  );
};
