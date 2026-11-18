"use client";

import Image from "next/image";
import { AnimatedHeading } from "@/components/common/animated-heading";

export interface ChainContent {
  heading: string;
  tagline: string;
  aside: string;
  image: { src: string; alt: string };
}

export interface ChainProps {
  content: ChainContent;
}

export const Chain = ({ content }: ChainProps) => {
  const { heading, tagline, aside, image } = content;
  return (
    <section
      aria-labelledby="chain-title"
      className="sticky top-0 z-10 h-lvh overflow-hidden"
    >
      <Image src={image.src} alt={image.alt} fill sizes="100vw" quality={90} className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_20_36/0.55),transparent_45%,rgb(11_20_36/0.75))]" />

      <div className="absolute inset-0 z-10 flex flex-col px-6 pb-6 pt-5 text-white md:px-10 md:pb-10 lg:px-12 lg:pb-12">
        <AnimatedHeading
          as="h2"
          id="chain-title"
          className="mt-24 max-w-[18ch] text-[1.75rem] font-light leading-[1.05] tracking-tight text-white sm:text-[2.25rem] lg:text-[2.75rem]"
        >
          {heading}
        </AnimatedHeading>

        <div className="mt-auto flex items-end justify-between gap-8">
          <p className="max-w-md text-base leading-relaxed text-white">{tagline}</p>
          <p className="hidden max-w-xl text-right text-[2.25rem] font-light leading-[1.05] tracking-tight text-white/60 lg:block">
            {aside}
          </p>
        </div>
      </div>
    </section>
  );
};
