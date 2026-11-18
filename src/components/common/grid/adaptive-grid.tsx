"use client";

import { useAdaptiveGrid } from "@/hooks/use-adaptive-grid";

import { GRID_BASE_WIDTH } from "./grid.config";

export interface AdaptiveGridProps {
  baseWidth?: number;
  coef?: number;
}

export const AdaptiveGrid = ({
  baseWidth = GRID_BASE_WIDTH,
  coef,
}: AdaptiveGridProps): null => {
  useAdaptiveGrid({ baseWidth, coef });
  return null;
};
