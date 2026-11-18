"use client";

import { useCallback, useEffect } from "react";

import { useResizeLoop } from "@/hooks/animation/user-resize-loop";

const FONT_BASE = 16;

export interface UseAdaptiveGridOptions {
  baseWidth: number;
  coef?: number;
}

export const interpolateFontSize = (
  baseFontSize: number,
  baseWidth: number,
  windowWidth: number,
  coef = 0.5,
): number => {
  const widthReduction = ((baseWidth - windowWidth) / baseWidth) * 100;
  const fontReduction = widthReduction * coef;
  return baseFontSize - (baseFontSize * fontReduction) / 100;
};

export const useAdaptiveGrid = ({
  baseWidth,
  coef = 0.6666,
}: UseAdaptiveGridOptions): void => {
  const apply = useCallback(() => {
    const root = document.documentElement;
    const size = interpolateFontSize(
      FONT_BASE,
      baseWidth,
      window.innerWidth,
      coef,
    );

    if (size > FONT_BASE) {
      root.style.setProperty("font-size", `${size}px`);
    } else {
      root.style.removeProperty("font-size");
    }
  }, [baseWidth, coef]);

  useEffect(() => {
    apply();
  }, [apply]);

  useResizeLoop(apply);
};
