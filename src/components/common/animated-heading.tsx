"use client";

import { useMemo } from "react";
import type { ElementType } from "react";
import { animated } from "@react-spring/web";
import { useRevealCascade } from "@/components/common/use-reveal-cascade";

export interface AnimatedHeadingProps {
  children: string;
  as?: "h1" | "h2";
  className?: string;
  id?: string;
  alpha?: (fraction: number) => number;
}

const RISE = 16;
const BLUR = 8;

export const AnimatedHeading = ({
  children: text,
  as = "h2",
  className,
  id,
  alpha,
}: AnimatedHeadingProps) => {
  const Tag = as as ElementType;
  const hasDigit = /\d/.test(text);
  const words = useMemo(() => text.split(" "), [text]);
  const total = useMemo(
    () => words.reduce((n, w) => n + [...w].length, 0),
    [words],
  );
  const { p, rootRef, localProg } = useRevealCascade(hasDigit ? 0 : total);

  if (hasDigit) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  let li = 0;
  return (
    <Tag ref={rootRef} id={id} aria-label={text} className={className}>
      {words.flatMap((word, wi) => {
        const nodes = [
          <span key={`w${wi}`} aria-hidden="true" className="inline-block">
            {[...word].map((ch, ci) => {
              const i = li;
              li += 1;
              const a = alpha ? alpha(total > 1 ? i / (total - 1) : 0) : 1;
              return (
                <animated.span
                  key={ci}
                  className="inline-block [will-change:transform,opacity]"
                  style={{
                    opacity: p.to((v) => a * localProg(v, i)),
                    transform: p.to(
                      (v) => `translateY(${RISE * (1 - localProg(v, i))}px)`,
                    ),
                    filter: p.to(
                      (v) => `blur(${BLUR * (1 - localProg(v, i))}px)`,
                    ),
                  }}
                >
                  {ch}
                </animated.span>
              );
            })}
          </span>,
        ];
        if (wi < words.length - 1) {
          nodes.push(
            <span key={`s${wi}`} aria-hidden="true">
              {" "}
            </span>,
          );
        }
        return nodes;
      })}
    </Tag>
  );
};
