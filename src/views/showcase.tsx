"use client";

import Image from "next/image";
import Link from "next/link";
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
}

export interface ShowcaseProps {
  content: ShowcaseContent;
}

const Column = ({ id, href, prefix, name, description, image }: ShowcaseItem) => (
  <article
    id={id}
    className="group relative min-h-[46vh] scroll-mt-24 overflow-hidden rounded-2xl bg-[#0b1424] lg:min-h-[78vh] lg:rounded-none"
  >
    <Image
      src={image}
      alt=""
      fill
      sizes="(max-width: 1024px) 50vw, 17vw"
      quality={85}
      className="object-cover opacity-70 transition-[transform,opacity,filter] duration-700 ease-out [filter:saturate(0.75)] group-hover:scale-[1.06] group-hover:opacity-100 group-hover:[filter:saturate(1)]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1424] via-[#0b1424]/45 to-[#0b1424]/10 transition-opacity duration-700 group-hover:opacity-80"
    />

    <div className="pointer-events-none absolute inset-x-5 bottom-6 text-white lg:inset-x-6 lg:bottom-8">
      <span className="block text-lg font-light leading-[1.1] tracking-tight text-white/75 lg:text-xl">
        {prefix}
      </span>
      <span className="block text-lg font-normal leading-[1.1] tracking-tight lg:text-xl">{name}</span>
      <span className="mt-3 block max-h-0 overflow-hidden text-sm leading-snug text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100 max-lg:max-h-20 max-lg:opacity-100">
        {description}
      </span>
      {href && (
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-lime opacity-0 transition-all duration-500 group-hover:opacity-100 max-lg:opacity-100">
          Descobrir <span aria-hidden="true">→</span>
        </span>
      )}
    </div>
    {href && <Link href={href} className="absolute inset-0 z-10" aria-label={`${prefix} ${name}`} />}
  </article>
);

export const Showcase = ({ content }: ShowcaseProps) => {
  const { heading, cta, items, extra } = content;
  return (
    <section
      id="services"
      aria-labelledby="showcase-title"
      className="relative overflow-hidden bg-[#0b1424] text-white"
    >
      <div className="flex flex-col gap-8 px-6 pb-12 pt-20 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-14 lg:pt-28">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
            Serveis
          </p>
          <AnimatedHeading
            as="h2"
            id="showcase-title"
            className="mt-5 max-w-[22ch] text-[1.9rem] font-light leading-[1.08] tracking-tight sm:text-[2.4rem] lg:text-[3rem]"
          >
            {heading}
          </AnimatedHeading>
        </div>
        <a
          href={cta.href}
          className="inline-flex h-12 shrink-0 items-center gap-3 self-start rounded-full bg-white pl-6 pr-2 text-sm font-medium text-black transition-transform hover:scale-[1.02] lg:self-auto"
        >
          {cta.label}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">→</span>
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pb-4 sm:gap-4 md:px-10 lg:grid-cols-6 lg:gap-0 lg:divide-x lg:divide-white/10 lg:border-y lg:border-white/10 lg:px-0 lg:pb-0">
        {items.map((item) => (
          <Column key={item.name} {...item} />
        ))}
      </div>

      {extra && extra.items.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 px-6 py-8 md:px-10 lg:px-12">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">{extra.label}</span>
          {extra.items.map((x) => (
            <Link
              key={x.href}
              href={x.href}
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/90 transition-colors hover:border-accent-lime hover:bg-accent-lime hover:text-black"
            >
              {x.label}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
