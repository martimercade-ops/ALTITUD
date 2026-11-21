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
      className="reel group relative aspect-[9/16] w-full overflow-hidden rounded-[30px] bg-black text-white shadow-[0_24px_50px_-20px_rgb(11_20_36/0.45)] transition-transform duration-500 hover:-translate-y-1"
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" src={r.poster} alt={`Reel d'Altitud Digital per a ${r.client}`} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${playing ? "opacity-0" : "opacity-100"}`} />
      <video
        ref={video}
        src={r.video}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
      />
      <button
        type="button"
        onClick={() => (playing ? stop() : play())}
        aria-label={playing ? `Atura el reel de ${r.client}` : `Mira el reel de ${r.client}`}
        className="absolute inset-0 z-[2]"
      />
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
          className="absolute right-4 top-4 z-[4] flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur"
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="m23 9-6 6M17 9l6 6" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>
          )}
        </button>
      )}

      <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex items-center gap-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-16 transition-opacity duration-500 ${playing ? "opacity-0" : "opacity-100"}`}>
        {r.logo && (
          <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src={`/assets/altitud/clients/color/${r.logo}.webp`} alt="" className="max-h-full max-w-full object-contain" />
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium leading-tight">{r.client}</p>
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-white/60">{r.sector}</p>
        </div>
      </div>
    </div>
  );
};
