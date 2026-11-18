"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, type SpringValue } from "@react-spring/web";
import { subscribeToTicker } from "@/lib/animation/ticker";

const DURATION = 500;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export interface SwapReveal {
  swap: SpringValue<number>;
  previous: number;
}

export function useSwapReveal(key: number): SwapReveal {
  const [{ swap }, api] = useSpring(() => ({ swap: 1 }));
  const mountedRef = useRef(false);
  const [seen, setSeen] = useState({ key, previous: -1 });
  if (seen.key !== key) setSeen({ key, previous: seen.key });

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      api.start({ swap: 1, immediate: true });
      return;
    }
    let t0: number | null = null;
    let done = false;
    let unsubscribe = () => {};
    api.start({ swap: 0, immediate: true });
    unsubscribe = subscribeToTicker(
      (time) => {
        if (done) return;
        if (t0 === null) t0 = time;
        const t = Math.min((time - t0) / DURATION, 1);
        api.start({ swap: easeOutCubic(t), immediate: true });
        if (t >= 1) {
          done = true;
          unsubscribe();
        }
      },
      () => 0,
    );
    return () => {
      done = true;
      unsubscribe();
    };
  }, [key, api]);

  return { swap, previous: seen.previous };
}
