"use client";

import { useEffect, useState } from "react";

export const PAS1_URL = "https://andorra-digital.com/pde/questionari-maduresa-digital";

/** Avís del pas 1 del PDE: el qüestionari de maduresa digital ja es pot fer */
export const Pas1Banner = ({ dark = false }: { dark?: boolean }) => (
  <div
    className={`flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between ${
      dark ? "border border-accent-lime/40 bg-accent-lime/10 text-white" : "bg-[#eef3ff] text-black"
    }`}
  >
    <p className="text-[15px] leading-snug">
      <strong className={dark ? "text-accent-lime" : "text-[#2f5bff]"}>El pas 1 ja està obert.</strong>{" "}
      Fes ara el qüestionari de maduresa digital del Govern (uns 10 minuts) i aniràs més ràpid que la resta.
    </p>
    <a
      href={PAS1_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-10 shrink-0 items-center justify-center rounded-full px-5 text-sm font-semibold transition-transform hover:scale-[1.02] ${
        dark ? "bg-accent-lime text-black" : "bg-[#2f5bff] text-white"
      }`}
    >
      Fer el pas 1 ↗
    </a>
  </div>
);

/** Finestra emergent, una sola vegada per visita */
export const Pas1Popup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let vist = false;
    try {
      vist = sessionStorage.getItem("pde-pas1") === "1";
    } catch {}
    if (vist) return;
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const tanca = () => {
    setOpen(false);
    try {
      sessionStorage.setItem("pde-pas1", "1");
    } catch {}
  };

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && tanca();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-[#0b1424]/60 p-4 backdrop-blur-sm sm:items-center" onClick={tanca}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pas1-titol"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-white p-7 text-black shadow-2xl md:p-8"
      >
        <button type="button" onClick={tanca} aria-label="Tanca" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-black/50 hover:bg-black/5 hover:text-black">
          ✕
        </button>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#2f5bff]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2f5bff]" />
          PDE · Pas 1 obert
        </p>
        <h2 id="pas1-titol" className="mt-4 text-[1.75rem] font-light leading-tight tracking-tight">
          Avança&apos;t a la resta.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-black/65">
          El primer pas de l&apos;ajut ja es pot fer: el <strong className="text-black">qüestionari de maduresa digital</strong> del Govern.
          Fes-lo ara i, quan s&apos;obri el pas 3, presentarem el teu pressupost el primer dia.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a href={PAS1_URL} target="_blank" rel="noopener noreferrer" onClick={tanca} className="inline-flex h-12 items-center justify-center rounded-full bg-[#2f5bff] text-sm font-semibold text-white">
            Fer el qüestionari ↗
          </a>
          <a href="#llista" onClick={tanca} className="inline-flex h-12 items-center justify-center rounded-full border border-black/15 text-sm font-medium">
            Apunta&apos;m i ajudeu-me
          </a>
        </div>
      </div>
    </div>
  );
};
