"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from "react";

export interface RevealProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** Part de l'element que ha de ser visible per activar-lo (0–1) */
  threshold?: number;
}

/**
 * Afegeix la classe `is-in` quan l'element entra a la pantalla (una sola vegada).
 * Les animacions es defineixen al CSS amb `.reveal-*`.
 */
export const Reveal = ({ as: Tag = "div", className = "", style, children, threshold = 0.25 }: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} style={style} className={`${className} ${inView ? "is-in" : ""}`}>
      {children}
    </Tag>
  );
};
