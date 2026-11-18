"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSpring, type SpringValue } from "@react-spring/web";
import { useRobot } from "@/components/common/robot-view";
import { subscribeToTicker } from "@/lib/animation/ticker";

const DURATION = 1400;
const SPREAD = 0.55;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export interface RevealCascade<T extends HTMLElement = HTMLElement> {
  p: SpringValue<number>;
  rootRef: React.RefObject<T | null>;
  localProg: (v: number, i: number) => number;
}

export interface RevealCascadeOptions {
  startWhen?: boolean;
}

export function useRevealCascade<T extends HTMLElement = HTMLElement>(
  total: number,
  options?: RevealCascadeOptions,
): RevealCascade<T> {
  const rootRef = useRef<T>(null);
  const startedRef = useRef(false);
  const robot = useRobot();
  const [{ p }, api] = useSpring(() => ({ p: robot ? 1 : 0 }));
  const gated = options?.startWhen !== undefined;
  const startWhen = options?.startWhen;

  useEffect(() => {
    if (robot) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let unsubscribe = () => {};
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      if (reduce) {
        api.start({ p: 1, immediate: true });
        return;
      }
      let t0: number | null = null;
      let done = false;
      unsubscribe = subscribeToTicker(
        (time) => {
          if (done) return;
          if (t0 === null) t0 = time;
          const t = Math.min((time - t0) / DURATION, 1);
          api.start({ p: t, immediate: true });
          if (t >= 1) {
            done = true;
            unsubscribe();
          }
        },
        () => 0,
      );
    };

    if (gated) {
      if (startWhen) start();
      return () => unsubscribe();
    }

    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      unsubscribe();
    };
  }, [api, gated, startWhen, robot]);

  const span = 1 - SPREAD;
  const localProg = useMemo(
    () => (v: number, i: number) => {
      const s = total > 1 ? (i / (total - 1)) * SPREAD : 0;
      return easeOutQuart(
        span <= 0 ? 1 : Math.min(Math.max((v - s) / span, 0), 1),
      );
    },
    [total, span],
  );

  return { p, rootRef, localProg };
}
