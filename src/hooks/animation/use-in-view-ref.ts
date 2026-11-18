"use client";

import { useInView } from "@react-spring/web";
import { useEffect, useRef } from "react";

export const useInViewRef = () => {
  const [ref, inView] = useInView();
  const inViewRef = useRef(inView);
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);
  return [ref, inViewRef];
};
