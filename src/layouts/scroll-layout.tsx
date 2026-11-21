"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { scrollTo } from "@/utils/scroll-to";
import { useShallow } from "zustand/react/shallow";

export const scrollSpeed = { current: 1 };

export function ScrollLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="scroll-layout">
      <div className="scroll-layout-content">{children}</div>

      <ScrollController />
    </div>
  );
}

function ScrollController() {
  const isEnableScroll = useScroll((state) => state.isEnableScroll);
  const [hash, setHash] = useState<string>("");
  const [lenis, setLenis] = useScroll(
    useShallow((state) => [state.lenis, state.setLenis]),
  );
  const pathname = usePathname();
  const savedPathname = useRef("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = new Lenis({
      smoothWheel: !reduceMotion,
      lerp: 0.08,
    });
    (window as typeof window & { lenis: Lenis }).lenis = lenis;
    setLenis(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, [setLenis]);

  useEffect(() => {
    if (isEnableScroll) {
      lenis?.start();
      enableNativeScroll(true);
    } else {
      lenis?.stop();
      enableNativeScroll(false);
    }
  }, [isEnableScroll, lenis]);

  useEffect(() => {
    if (lenis && hash) {
      setTimeout(() => {
        scrollTo(hash, true);
      }, 300);
    }
  }, [lenis, hash]);

  useEffect(() => {
    if (savedPathname.current !== pathname) {
      const primeraCarrega = savedPathname.current === "";
      savedPathname.current = pathname;
      // Canvi de pàgina: tornar a dalt (Lenis manté la posició antiga si no li diem)
      if (!primeraCarrega && !window.location.hash) {
        lenis?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
      }
      // Enllaç amb àncora (p. ex. /projectes/x#ux-ui): baixar fins a la secció
      const hash = window.location.hash.slice(1);
      if (hash) setHash(hash);
    }
  }, [pathname, setHash, lenis]);

  return null;
}

const enableNativeScroll = (value: boolean) => {
  if (typeof document === "undefined") return;
  if (!document) return;
  const html = document.querySelector("html");
  if (!html) return;
  if (!value) {
    html.style.position = "relative";
    html.style.overflow = "hidden";
    html.style.height = "100%";
  } else {
    html.style.removeProperty("position");
    html.style.removeProperty("overflow");
    html.style.removeProperty("height");
  }
};
