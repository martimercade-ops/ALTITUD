"use client";

import { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { subscribeToTicker } from "@/lib/animation/ticker";

export interface ClientLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

export interface LogoMarqueeProps {
  logos: ClientLogo[];
  label: string;
}

const COPIES = 6;
const ONE_SET = 100 / COPIES;

const Row = ({
  logos,
  direction,
  speed,
}: {
  logos: ClientLogo[];
  direction: "left" | "right";
  speed: number;
}) => {
  const [{ s }, api] = useSpring(() => ({
    s: 0,
    config: { tension: 90, friction: 34 },
  }));

  useEffect(() => {
    const unsubscribe = subscribeToTicker(
      () => api.start({ s: window.scrollY * speed }),
      () => 0,
    );
    return unsubscribe;
  }, [api, speed]);

  const transform = s.to((v) => {
    const m = ((v % ONE_SET) + ONE_SET) % ONE_SET;
    const off = direction === "left" ? -m : -(ONE_SET - m);
    return `translate3d(${off}%,0,0)`;
  });

  return (
    <div className="flex overflow-hidden">
      <animated.div
        style={{ transform }}
        className="flex w-max shrink-0 items-center text-logo"
      >
        {Array.from({ length: COPIES }).flatMap((_, c) =>
          logos.map((logo, i) => (
            <img
              key={`${c}-${i}`}
              src={logo.src}
              alt=""
              width={logo.width}
              height={logo.height}
              decoding="async"
              className="mr-3 h-16 w-auto shrink-0 rounded-xl md:mr-4 md:h-20"
            />
          )),
        )}
      </animated.div>
    </div>
  );
};

export const LogoMarquee = ({ logos, label }: LogoMarqueeProps) => {
  const half = Math.ceil(logos.length / 2);
  return (
    <section aria-label={label} className="bg-hero-page py-12">
      <ul className="sr-only">
        {logos.map((logo) => <li key={logo.name}>{logo.name}</li>)}
      </ul>
      <div aria-hidden="true" className="flex flex-col gap-3 md:gap-4">
        <Row logos={logos.slice(0, half)} direction="left" speed={0.005} />
        <Row logos={logos.slice(half)} direction="right" speed={0.0038} />
      </div>
    </section>
  );
};
