"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Atura les animacions CSS infinites de les seccions que no es veuen (marquesines,
 * òrbites, estrelles...). El navegador no les ha de calcular fotograma a fotograma
 * i la pàgina va més fluida, sobretot al mòbil.
 */
export const AnimPause = () => {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.removeAttribute("data-fora");
          else e.target.setAttribute("data-fora", "");
        }
      },
      { rootMargin: "300px 0px" },
    );
    const observa = () => document.querySelectorAll("main section, footer").forEach((s) => io.observe(s));
    observa();
    // Seccions que apareixen després (contingut carregat tard)
    const t = window.setTimeout(observa, 1500);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);
  return null;
};
