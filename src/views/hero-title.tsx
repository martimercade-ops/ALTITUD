"use client";

import { useEffect, useMemo, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { subscribeToTicker } from "@/lib/animation/ticker";
import { usePreloader } from "@/hooks/use-preloader";
import { useRobot } from "@/components/common/robot-view";

export interface HeroTitleProps {
  lines: string[];
  className?: string;
  /** Etiqueta HTML: per defecte h1 */
  as?: "h1" | "p";
}

const DURATION = 1600;
const SPREAD = 0.55;
const RISE = 16;
const BLUR = 8;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const letterAlpha = (line: number, pos: number) =>
  line % 2 === 0 ? 1 - pos * 0.25 : 0.75 + pos * 0.25;

export const HeroTitle = ({ lines, className, as: Tag = "h1" }: HeroTitleProps) => {
  type Letter = { ch: string; alpha: number; i: number };
  const { lineWords, total } = useMemo(() => {
    let gi = 0;
    const built = lines.map((line, li) => {
      const chars = [...line];
      const denom = chars.length > 1 ? chars.length - 1 : 1;
      const words: Letter[][] = [];
      let current: Letter[] = [];
      chars.forEach((ch, ci) => {
        if (ch === " ") {
          words.push(current);
          current = [];
        } else {
          current.push({ ch, alpha: letterAlpha(li, ci / denom), i: gi++ });
        }
      });
      words.push(current);
      return words;
    });
    return { lineWords: built, total: gi };
  }, [lines]);
  const robot = useRobot();
  const [{ p }, api] = useSpring(() => ({ p: robot ? 1 : 0 }));
  const startRef = useRef<number | null>(null);
  const preloaderDone = usePreloader((s) => s.done);

  useEffect(() => {
    if (robot || !preloaderDone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      api.start({ p: 1, immediate: true });
      return;
    }
    let finished = false;
    const unsubscribe = subscribeToTicker(
      (time) => {
        if (finished) return;
        if (startRef.current === null) startRef.current = time;
        const t = Math.min((time - startRef.current) / DURATION, 1);
        api.start({ p: t, immediate: true });
        if (t >= 1) {
          finished = true;
          unsubscribe();
        }
      },
      () => 0,
    );
    return unsubscribe;
  }, [api, preloaderDone, robot]);

  const span = 1 - SPREAD;
  const localProg = (v: number, i: number) => {
    const start = total > 1 ? (i / (total - 1)) * SPREAD : 0;
    return easeOutQuart(
      span <= 0 ? 1 : Math.min(Math.max((v - start) / span, 0), 1),
    );
  };

  return (
    <Tag aria-label={lines.join(" ")} className={className}>
      {lineWords.map((words, li) => (
        <span key={li} aria-hidden="true" className="block">
          {words.flatMap((word, wi) => {
            const wordNode = (
              <span key={`w${wi}`} className="inline-block">
                {word.map(({ ch, alpha, i }, ci) => (
                  <animated.span
                    key={ci}
                    className="inline-block text-white [will-change:transform,opacity]"
                    style={{
                      opacity: p.to((v) => alpha * localProg(v, i)),
                      transform: p.to(
                        (v) => `translateY(${RISE * (1 - localProg(v, i))}px)`,
                      ),
                      filter: p.to((v) => `blur(${BLUR * (1 - localProg(v, i))}px)`),
                    }}
                  >
                    {ch}
                  </animated.span>
                ))}
              </span>
            );
            return wi < words.length - 1
              ? [wordNode, <span key={`sp${wi}`}> </span>]
              : [wordNode];
          })}
        </span>
      ))}
    </Tag>
  );
};
