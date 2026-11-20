"use client";

import { useRef, useState } from "react";
import type { Reel } from "@/data/mocks/reels";

/** Targeta de reel: mòbil dibuixat amb el millor fotograma; en passar-hi el cursor es reprodueix el reel sencer */
export const ReelCard = ({ r }: { r: Reel }) => {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const play = () => {
    const v = video.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const stop = () => {
    const v = video.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    v.muted = true;
    setMuted(true);
    setPlaying(false);
  };

  return (
    <div
      className="illa illa--clar reel group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[#eceef2] text-black"
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      <span aria-hidden="true" className="illa-llum" />
      <div className="relative flex w-full items-center justify-center px-6 pb-4 pt-8">
        <span aria-hidden="true" className="reel-ombra" />
        <button
          type="button"
          onClick={() => (playing ? stop() : play())}
          aria-label={playing ? `Atura el reel de ${r.client}` : `Mira el reel de ${r.client}`}
          className="reel-mobil relative w-[70%] max-w-[260px]"
        >
          <span className="reel-pantalla">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.poster} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${playing ? "opacity-0" : "opacity-100"}`} />
            <video
              ref={video}
              src={r.video}
              muted
              loop
              playsInline
              preload="none"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
            />
            <span className="reel-illa" />
            {!playing && (
              <span aria-hidden="true" className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-transform group-hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11l9.5-5.5z" /></svg>
              </span>
            )}
          </span>
        </button>
        {playing && (
          <button
            type="button"
            onClick={() => {
              const v = video.current;
              if (!v) return;
              v.muted = !v.muted;
              setMuted(v.muted);
            }}
            aria-label={muted ? "Activa el so" : "Silencia"}
            className="absolute bottom-7 right-[22%] z-[4] flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
          >
            {muted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="m23 9-6 6M17 9l6 6" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>
            )}
          </button>
        )}
      </div>

      <div className="relative z-[3] mt-auto flex items-center gap-4 px-6 pb-6 pt-2 md:px-7 md:pb-7">
        {r.logo && (
          <span aria-hidden="true" className="flex h-14 min-w-14 max-w-[7.5rem] shrink-0 items-center justify-center rounded-2xl bg-white px-2.5 py-2 shadow-[0_6px_18px_-8px_rgb(11_20_36/0.35)] ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/assets/altitud/clients/color/${r.logo}.webp`} alt="" className="max-h-full max-w-full object-contain" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/45">{r.sector}</p>
          <h2 className="mt-1 line-clamp-2 text-[1.3rem] font-normal leading-tight tracking-tight">{r.client}</h2>
        </div>
        <span className="shrink-0 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70">Reel</span>
      </div>
    </div>
  );
};
