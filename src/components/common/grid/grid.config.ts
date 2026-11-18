export const FONT_BASE = 16;

export interface GridBreakpoint {
  maxWidth: number;
  baseWidth: number;
}

export const GRID_BREAKPOINTS: readonly GridBreakpoint[] = [
  { maxWidth: 1440, baseWidth: 1440 },
  { maxWidth: 1024, baseWidth: 1024 },
  { maxWidth: 640, baseWidth: 360 },
];

export const GRID_BASE_WIDTH = Math.max(
  ...GRID_BREAKPOINTS.map((bp) => bp.maxWidth),
);
