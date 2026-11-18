"use client";

import { useRef } from "react";
import Image from "next/image";
import { Hover } from "@/components/animation/springs/hover";
import { AnimatedHeading } from "@/components/common/animated-heading";

export interface ShowcaseItem {
  prefix: string;
  name: string;
  description: string;
  image: string;
}

export interface ShowcaseContent {
  heading: string;
  cta: { label: string; href: string };
  items: ShowcaseItem[];
}

export interface ShowcaseProps {
  content: ShowcaseContent;
}

const REVEAL_CONFIG = { tension: 170, friction: 26 };

const Column = ({ prefix, name, description, image }: ShowcaseItem) => {
  const ref = useRef<HTMLElement>(null);
  return (
    <article
      ref={ref}
      className="relative min-h-[38vh] overflow-hidden rounded-2xl lg:min-h-[85vh] lg:rounded-none"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        quality={90}
        className="object-cover lg:hidden"
      />

      <Hover
        trigger={ref}
        tag="div"
        className="absolute inset-0 hidden will-change-[clip-path] lg:block"
        from={{ clipPath: "inset(100% 0% 0% 0%)" }}
        to={{ clipPath: "inset(0% 0% 0% 0%)" }}
        config={REVEAL_CONFIG}
      >
        <Image src={image} alt="" fill sizes="60vw" quality={90} className="object-cover" />
      </Hover>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent lg:hidden"
      />
      <Hover
        trigger={ref}
        tag="div"
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 origin-bottom bg-gradient-to-t from-white via-white/80 to-transparent will-change-transform lg:block"
        from={{ transform: "scaleY(0)" }}
        to={{ transform: "scaleY(1)" }}
        config={REVEAL_CONFIG}
      />

      <div className="pointer-events-none absolute inset-x-5 bottom-6 lg:inset-x-6 lg:bottom-8">
        <span className="block text-lg font-normal leading-[1.1] tracking-tight text-white lg:text-xl lg:text-black">
          {prefix}
        </span>
        <span className="block text-lg font-normal leading-[1.1] tracking-tight text-white lg:text-xl lg:text-black">
          {name}
        </span>
        <span className="mt-2 block text-sm leading-snug text-white/85 lg:text-black/65">
          {description}
        </span>
      </div>
    </article>
  );
};

export const Showcase = ({ content }: ShowcaseProps) => {
  const { heading, cta, items } = content;
  return (
    <section
      id="services"
      aria-labelledby="showcase-title"
      className="relative overflow-hidden border-y border-plum/10 bg-hero-page text-black"
    >
      <div className="relative z-10 px-6 pb-10 pt-14 md:px-10 lg:pointer-events-none lg:absolute lg:left-1/2 lg:right-0 lg:top-14 lg:z-20 lg:px-12 lg:pb-0">
        <AnimatedHeading
          as="h2"
          id="showcase-title"
          className="text-[1.75rem] font-light leading-[1.05] tracking-tight sm:text-[2.25rem] lg:text-[2.5rem]"
        >
          {heading}
        </AnimatedHeading>
        <a
          href={cta.href}
          className="pointer-events-auto mt-8 inline-block rounded-full border border-black/30 px-6 py-3 text-sm font-medium text-black hover:bg-black hover:text-hero-page"
        >
          {cta.label}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 px-6 pb-6 sm:gap-5 md:px-10 lg:grid-cols-6 lg:gap-0 lg:px-0 lg:pb-0 lg:divide-x lg:divide-plum/10">
        {items.map((item) => (
          <Column
            key={item.name}
            prefix={item.prefix}
            name={item.name}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};
