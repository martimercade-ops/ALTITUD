"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Hover } from "@/components/animation/springs/hover";
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

const REVEAL_CONFIG = { tension: 170, friction: 26 };

const pad = (n: number) => String(n).padStart(2, "0");

const Column = ({ id, href, prefix, name, description, image, index }: ShowcaseItem & { index: number }) => {
  const ref = useRef<HTMLElement>(null);
  return (
    <article
      ref={ref}
      id={id}
      className="group relative min-h-[46vh] scroll-mt-24 overflow-hidden rounded-2xl lg:min-h-[72vh] lg:rounded-none"
    >
      {/* Mòbil: foto sempre visible */}
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 1024px) 50vw, 17vw"
        quality={85}
        className="object-cover lg:hidden"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent lg:hidden" />

      {/* Escriptori: la foto puja en passar el ratolí */}
      <Hover
        trigger={ref}
        tag="div"
        className="absolute inset-0 hidden will-change-[clip-path] lg:block"
        from={{ clipPath: "inset(100% 0% 0% 0%)" }}
        to={{ clipPath: "inset(0% 0% 0% 0%)" }}
        config={REVEAL_CONFIG}
      >
        <Image src={image} alt="" fill sizes="17vw" quality={85} className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </Hover>

      <span className="pointer-events-none absolute left-5 top-5 hidden text-xs font-medium tracking-[0.2em] text-black/35 transition-colors duration-500 group-hover:text-white/70 lg:left-6 lg:top-7 lg:block">
        {pad(index + 1)}
      </span>

      <div className="pointer-events-none absolute inset-x-5 bottom-6 text-white lg:inset-x-6 lg:bottom-8 lg:text-black lg:transition-colors lg:duration-500 lg:group-hover:text-white">
        <span className="block text-lg font-light leading-[1.1] tracking-tight lg:text-xl">{prefix}</span>
        <span className="block text-lg font-normal leading-[1.1] tracking-tight lg:text-xl">{name}</span>
        <span className="mt-2 block text-sm leading-snug text-white/85 lg:text-black/55 lg:transition-colors lg:duration-500 lg:group-hover:text-white/85">
          {description}
        </span>
        {href && (
          <span className="mt-4 hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:inline-flex">
            Veure servei <span aria-hidden="true">→</span>
          </span>
        )}
      </div>
      {href && <Link href={href} className="absolute inset-0 z-10" aria-label={`${prefix} ${name}`} />}
    </article>
  );
};

export const Showcase = ({ content }: ShowcaseProps) => {
  const { heading, cta, items, extra, tools } = content;
  return (
    <section
      id="services"
      aria-labelledby="showcase-title"
      className="relative overflow-hidden bg-hero-page text-black"
    >
      <div className="flex flex-col gap-8 px-6 pb-12 pt-20 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-14 lg:pt-28">
        <AnimatedHeading
          as="h2"
          id="showcase-title"
          className="max-w-[24ch] text-[1.75rem] font-light leading-[1.08] tracking-tight sm:text-[2.25rem] lg:text-[2.75rem]"
        >
          {heading}
        </AnimatedHeading>
        <a
          href={cta.href}
          className="inline-block shrink-0 self-start rounded-full border border-black/30 px-6 py-3 text-sm font-medium text-black hover:bg-black hover:text-hero-page lg:self-auto"
        >
          {cta.label}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pb-4 sm:gap-4 md:px-10 lg:grid-cols-6 lg:gap-0 lg:divide-x lg:divide-plum/10 lg:border-y lg:border-plum/10 lg:px-0 lg:pb-0">
        {items.map((item, i) => (
          <Column key={item.name} {...item} index={i} />
        ))}
      </div>

      {extra && extra.items.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 px-6 py-8 md:px-10 lg:px-12">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.25em] text-black/45">{extra.label}</span>
          {extra.items.map((x) => (
            <Link
              key={x.href}
              href={x.href}
              className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm text-black transition-colors hover:border-black hover:bg-black hover:text-white"
            >
              {x.label}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          ))}
        </div>
      )}

      {tools && (
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-plum/10 px-6 py-6 md:px-10 lg:px-12">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.25em] text-black/40">{tools.label}</span>
          {tools.items.map((t) => (
            <span key={t} className="text-[14px] text-black/45">{t}</span>
          ))}
        </div>
      )}
    </section>
  );
};
