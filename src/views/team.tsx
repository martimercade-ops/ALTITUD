"use client";

import Image from "next/image";
import Link from "next/link";
import { animated } from "@react-spring/web";
import { AnimatedHeading } from "@/components/common/animated-heading";
import { useRevealCascade } from "@/components/common/use-reveal-cascade";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  focus?: string[];
  /** Formació i experiència destacades */
  highlights?: string[];
  /** Perfil de LinkedIn */
  linkedin?: string;
  /** Projectes en què ha treballat */
  projects?: { name: string; slug?: string; logo?: string }[];
}

export interface TeamContent {
  eyebrow: string;
  heading: string;
  members: TeamMember[];
}

const CARD_RISE = 24;
const CARD_BLUR = 12;

export const Team = ({ content }: { content: TeamContent }) => {
  const { eyebrow, heading, members } = content;
  const { p, rootRef, localProg } = useRevealCascade<HTMLUListElement>(members.length);
  const cardStyle = (i: number) => ({
    opacity: p.to((v) => localProg(v, i)),
    transform: p.to((v) => `translateY(${CARD_RISE * (1 - localProg(v, i))}px)`),
    filter: p.to((v) => `blur(${CARD_BLUR * (1 - localProg(v, i))}px)`),
  });
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="relative z-20 bg-hero-page px-6 pb-16 pt-8 text-black md:px-12 lg:px-page-gutter"
    >
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.35em] text-muted-small">
        {eyebrow}
      </p>
      <AnimatedHeading
        as="h2"
        id="team-title"
        className="mx-auto mb-14 max-w-3xl text-center text-[1.75rem] font-light leading-[1.05] tracking-tight text-black sm:text-[2.25rem] lg:text-[2.75rem]"
      >
        {heading}
      </AnimatedHeading>
      <ul ref={rootRef} className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {members.map((member, i) => (
          <animated.li key={member.name} style={cardStyle(i)} className="[will-change:transform,opacity]">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-card-gray">
              <Image src={member.image} alt={member.name} fill sizes="(max-width: 768px) 50vw, 20vw" quality={90} className="object-cover" />
            </div>
            <p className="mt-4 text-lg leading-snug tracking-tight">{member.name}</p>
            <p className="mt-1 text-sm text-black/55">{member.role}</p>
          </animated.li>
        ))}
      </ul>
      <div className="mt-14 flex justify-center">
        <Link
          href="/equip"
          className="group inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-sm font-medium hover:border-black hover:bg-black hover:text-white"
        >
          Coneix l&apos;equip
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </section>
  );
};
