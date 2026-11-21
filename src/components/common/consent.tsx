"use client";
import { useLayoutText } from "@/i18n/layout";

import { useEffect, useState } from "react";
import Link from "next/link";
import { create } from "zustand";

/**
 * Consentiment de galetes. Només hi ha una categoria opcional: Google Maps
 * (galetes de tercers). El web no fa servir analítica ni publicitat.
 */
const KEY = "cookie-consent-v1";

type Choice = { maps: boolean; date: string };

interface ConsentState {
  choice: Choice | null;
  hydrated: boolean;
  open: boolean;
  hydrate: () => void;
  decide: (maps: boolean) => void;
  reopen: () => void;
}

export const useConsent = create<ConsentState>((set) => ({
  choice: null,
  hydrated: false,
  open: false,
  hydrate: () => {
    let choice: Choice | null = null;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Choice>;
        if (typeof parsed.maps === "boolean") choice = { maps: parsed.maps, date: parsed.date ?? "" };
      }
    } catch {}
    set({ choice, hydrated: true, open: choice === null });
  },
  decide: (maps) => {
    const choice = { maps, date: new Date().toISOString() };
    try {
      localStorage.setItem(KEY, JSON.stringify(choice));
    } catch {}
    set({ choice, open: false });
  },
  reopen: () => set({ open: true }),
}));

/** Banner discret a la cantonada inferior */
export const ConsentBanner = () => {
  const tx = useLayoutText();
  const { hydrated, open, hydrate, decide } = useConsent();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Apareix amb un petit retard perquè no competeixi amb la càrrega de la pàgina
  useEffect(() => {
    if (!open) return setShown(false);
    const t = setTimeout(() => setShown(true), 900);
    return () => clearTimeout(t);
  }, [open]);

  if (!hydrated || !open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={tx("galetes")}
      className={`fixed inset-x-[12px] bottom-[12px] z-[70] transition-all duration-500 sm:inset-x-auto sm:bottom-[24px] sm:left-[24px] sm:w-[400px] ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="rounded-[22px] border border-white/10 bg-[#0b1424]/92 p-[20px] text-white shadow-[0_20px_60px_rgb(0_0_0/0.35)] backdrop-blur-xl">
        <div className="flex items-start gap-[14px]">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-[2px] h-[22px] w-[22px] shrink-0 text-accent-lime">
            <path
              d="M12 3a9 9 0 109 9 3 3 0 01-3-3 3 3 0 01-3-3 3 3 0 01-3-3z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="11" r="1.1" fill="currentColor" />
            <circle cx="14" cy="15" r="1.1" fill="currentColor" />
            <circle cx="9.5" cy="16" r="0.9" fill="currentColor" />
          </svg>
          <p className="text-[14px] leading-[1.5] text-white/80">
            {tx("banner")}{" "}
            <Link href="/politica-de-galetes" className="text-white underline underline-offset-2 hover:text-accent-lime">
              {tx("mes")}
            </Link>
          </p>
        </div>
        <div className="mt-[16px] flex gap-[8px]">
          <button
            type="button"
            onClick={() => decide(false)}
            className="h-[44px] flex-1 rounded-full border border-white/20 text-[14px] text-white/85 transition-colors hover:border-white/50 hover:text-white"
          >
            {tx("nomes")}
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="h-[44px] flex-1 rounded-full bg-accent-lime text-[14px] font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            {tx("acceptar")}
          </button>
        </div>
      </div>
    </div>
  );
};

/** Enllaç «Configurar galetes» del peu */
export const ConsentSettingsLink = ({ className = "" }: { className?: string }) => {
  const reopen = useConsent((s) => s.reopen);
  const tx = useLayoutText();
  return (
    <button type="button" onClick={reopen} className={className}>
      {tx("configurar")}
    </button>
  );
};

/** Mapa de Google que només es carrega amb consentiment */
export const MapEmbed = ({ src, title, className = "" }: { src: string; title: string; className?: string }) => {
  const { choice, hydrated, decide } = useConsent();
  const allowed = choice?.maps === true;

  if (allowed) {
    return (
      <>
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={`absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_hue-rotate(180deg)_contrast(0.9)_brightness(0.95)] ${className}`}
        />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="mapa-pols absolute -left-10 -top-10 block h-20 w-20 rounded-full bg-accent-lime/40" />
          <span className="mapa-pols mapa-pols--2 absolute -left-10 -top-10 block h-20 w-20 rounded-full bg-accent-lime/30" />
        </div>
      </>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start gap-[14px] pt-[22%] bg-[radial-gradient(60%_60%_at_50%_45%,rgb(47_91_255/0.18),transparent_70%)] p-6 text-center">
      {/* Retícula subtil que suggereix un mapa */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgb(255_255_255/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.6)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(60%_60%_at_50%_45%,black,transparent)]"
      />
      {hydrated && (
        <>
          <button
            type="button"
            onClick={() => decide(true)}
            className="relative rounded-full border border-white/25 bg-white/5 px-[18px] py-[10px] text-[14px] text-white backdrop-blur transition-colors hover:border-white/60"
          >
            Mostra el mapa
          </button>
          <p className="relative max-w-[16rem] text-[12px] leading-snug text-white/50">
            En carregar-lo, Google pot desar galetes al teu navegador.
          </p>
        </>
      )}
    </div>
  );
};
