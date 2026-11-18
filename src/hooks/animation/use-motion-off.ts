"use client";

import { useState } from "react";
import { useReducedMotion } from "@react-spring/web";

import { useRobot } from "@/components/common/robot-view";

const reducedAtStart = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useMotionOff = (): boolean => {
  const [reducedFirst] = useState(reducedAtStart);
  const reduced = Boolean(useReducedMotion());
  const robot = useRobot();
  return reducedFirst || reduced || robot;
};
