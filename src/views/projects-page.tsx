"use client";

import { LOGOS, LOGOS_COLOR } from "@/data/mocks/project-logos";
import { useState } from "react";
import { reels } from "@/data/mocks/reels";
import { ReelCard } from "./reel-card";
import Image from "next/image";
import Link from "next/link";
import { projectHref, type Project } from "@/data/mocks/projects";
import { Reveal } from "@/components/common/reveal";

/** Portàtil obert amb la captura del web a la pantalla */
export const Laptop = ({ src, alt, url }: { src: string; alt: string; url?: string }) => (
  <div className="group/laptop relative mx-auto w-full">
    <div className="relative rounded-t-[14px] border border-black/20 bg-[#1b1d22] p-[2.2%] pb-[2.6%] shadow-[0_30px_60px_-20px_rgb(11_20_36/0.45)] transition-transform duration-700 ease-out group-hover/laptop:-translate-y-1">
      <span aria-hidden="true" className="absolute left-1/2 top-[0.9%] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white/25" />
      <div className="relative overflow-hidden rounded-[3px] bg-black">
        {url && (
          <div className="flex items-center gap-1.5 bg-[#2a2d33] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="mx-auto truncate rounded bg-white/10 px-3 py-0.5 text-[10px] text-white/60">{url}</span>
          </div>
        )}
        <div className="relative aspect-[16/10]">
          <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 92vw, 60vw" className="object-cover object-top" />
        </div>
      </div>
    </div>
    {/* Base del portàtil */}
    <div aria-hidden="true" className="relative mx-[-6%] h-[clamp(10px,1.6vw,18px)] rounded-b-[18px] bg-gradient-to-b from-[#d9dce1] to-[#a9adb4] shadow-[0_18px_30px_-12px_rgb(11_20_36/0.4)]">
      <span className="absolute left-1/2 top-0 h-[38%] w-[16%] -translate-x-1/2 rounded-b-[8px] bg-[#b7bbc2]" />
    </div>
  </div>
);

/** Portàtil dibuixat (vectorial, net a qualsevol mida) amb la web del client a la pantalla */
const Dispositius = ({ src, priority = false }: { src: string; priority?: boolean }) => (
  <div className="illa-dispositiu portatil relative w-full" style={{ aspectRatio: "100 / 60" }}>
    <div className="portatil-tapa">
      <span className="portatil-camera" />
      <div className="illa-pantalla portatil-pantalla">
        <Image src={src} alt="" fill priority={priority} sizes="(max-width: 640px) 80vw, 28vw" className="object-cover object-top" />
        <span aria-hidden="true" className="illa-reflex" />
        <span aria-hidden="true" className="illa-vidre" />
      </div>
    </div>
    <div className="portatil-base">
      <span className="portatil-osca" />
    </div>
  </div>
);

/**
 * Mockup UX/UI per a la miniatura: llenç de Figma amb les pantalles del projecte,
 * la central seleccionada (marc blau, nanses i mides) i un cursor de col·laboració.
 */
const MockupUX = ({ p }: { p: Project }) => {
  const pantalles = (p.ux ?? []).slice(0, 3);
  const web = pantalles[0]?.format === "web";
  const nom = web ? "Desktop" : "iPhone";
  const color = p.color ?? "#2b72e2";
  return (
    <div
      className="ux-llenc absolute inset-3 z-[2] overflow-hidden rounded-[20px] md:inset-4"
      style={{ background: `color-mix(in srgb, ${color} 16%, #f4f4f2)`, ["--ux" as string]: color }}
    >
      <span aria-hidden="true" className="ux-graella" />
      <div className={`ux-pantalles ${web ? "ux-pantalles--web" : ""}`}>
        {pantalles.map((u, i) => (
          <figure key={u.src} className={`ux-pantalla ${i === 1 ? "ux-pantalla--sel" : ""}`} style={{ ["--i" as string]: i }}>
            <figcaption className="ux-etiqueta">
              {nom} — {String(i + 1).padStart(2, "0")}
            </figcaption>
            <div className="ux-marc">
              <Image src={u.src} alt="" fill sizes="(max-width: 640px) 30vw, 10vw" className="object-cover object-top" />
            </div>
            {i === 1 && (
              <>
                <span className="ux-nansa ux-nansa--a" />
                <span className="ux-nansa ux-nansa--b" />
                <span className="ux-nansa ux-nansa--c" />
                <span className="ux-nansa ux-nansa--d" />
                <span className="ux-mida">{web ? "1440 × 2300" : "390 × 844"}</span>
              </>
            )}
          </figure>
        ))}
      </div>
      <span className="ux-cursor">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M1 1l5.2 13.2 2-5.6 5.6-2z" />
        </svg>
        <span>Altitud</span>
      </span>
      <span className="ux-figma">Figma</span>
    </div>
  );
};

/** Targeta de projecte: en passar-hi el cursor surt el portàtil de perfil amb la web */
const ProjectCard = ({ p, priority = false, ux = false }: { p: Project; priority?: boolean; ux?: boolean }) => {
  const modeUX = ux && !!p.ux?.length;
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--tx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    e.currentTarget.style.setProperty("--ty", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };
  const onLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.setProperty("--tx", "0");
    e.currentTarget.style.setProperty("--ty", "0");
  };
  return (
    <Link
      href={modeUX ? `${projectHref(p.slug)}#ux-ui` : projectHref(p.slug)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`illa illa--clar ${p.foto ? "illa--foto" : ""} group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[#eceef2] text-black`}
    >
      <span aria-hidden="true" className="illa-llum" />

      <div aria-hidden="true" className="illa-estudi relative aspect-[16/11] w-full">
        <span className="illa-ombra" />
        {modeUX ? (
          <MockupUX p={p} />
        ) : p.foto ? (
          <div className="absolute inset-4 z-[2] overflow-hidden rounded-[20px] md:inset-5">
            <Image src={p.image} alt="" fill sizes="(max-width: 640px) 92vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
          </div>
        ) : (
          <div className="illa-escenari">
            <div className="illa-portatil">
              <Dispositius src={p.image} priority={priority} />
            </div>
          </div>
        )}
      </div>

      <div className="relative z-[3] mt-auto flex flex-col gap-4 px-6 pb-6 pt-1 md:px-7 md:pb-7">
        <div className="flex items-center gap-4">
          {(LOGOS_COLOR[p.slug] || LOGOS[p.slug]) && (
            <span aria-hidden="true" className="flex h-14 min-w-14 max-w-[7.5rem] shrink-0 items-center justify-center rounded-2xl bg-white px-2.5 py-2 shadow-[0_6px_18px_-8px_rgb(11_20_36/0.35)] ring-1 ring-black/5">
              {LOGOS_COLOR[p.slug] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={`/assets/altitud/clients/color/${LOGOS_COLOR[p.slug]}.webp`} alt="" className="max-h-full max-w-full object-contain" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={`/assets/altitud/clients/color/${LOGOS[p.slug]}.webp`} alt="" className="max-h-full max-w-full object-contain" />
              )}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/45">{p.sector}</p>
            <h2 className="mt-1 line-clamp-2 text-[1.3rem] font-normal leading-tight tracking-tight">{p.name}</h2>
            <p className="mt-1.5 flex items-center gap-1 text-xs text-black/50">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 shrink-0 fill-none stroke-current" strokeWidth="2">
                <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <span className="truncate">
                {p.lloc ?? "Andorra"}
                {p.any ? ` · ${p.any}` : ""}
              </span>
            </p>
          </div>
          <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-sm transition-colors group-hover:bg-black group-hover:text-accent-lime">↗</span>
        </div>
        <ul className="flex flex-wrap gap-1.5 border-t border-black/[0.07] pt-4" aria-label="Serveis">
          {p.services.map((s) => (
            <li key={s} className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70">{s}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export const ProjectsList = ({ projects }: { projects: Project[] }) => {
  const XARXES = "Xarxes socials";
  /** Filtres fixos: cada un agrupa les etiquetes dels projectes que hi entren */
  const FILTRES: Record<string, string[]> = {
    Web: ["Web"],
    [XARXES]: [],
    "UX/UI": ["Disseny UX/UI"],
    Identitat: ["Identitat corporativa", "Branding"],
    Ecommerce: ["Botiga online"],
    "Projectes amb IA": ["Chatbot amb IA", "IA", "Automatitzacions amb IA"],
    "Publicitat exterior": ["Publicitat exterior"],
  };
  const TOTS = "Tots";
  const tags = [TOTS, ...Object.keys(FILTRES)];
  const [tag, setTag] = useState<string | null>(null);
  const entra = (p: Project, t: string) => FILTRES[t].some((x) => p.services.includes(x));
  const shown = tag ? projects.filter((p) => entra(p, tag)) : projects;
  const compte = (t: string) =>
    t === TOTS ? projects.length : t === XARXES ? reels.length : projects.filter((p) => entra(p, t)).length;

  return (
    <>
      <div role="group" aria-label="Filtra per servei" className="filtres -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
        {tags.map((t) => {
          const on = t === TOTS ? tag === null : t === tag;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              onClick={() => setTag(t === TOTS || on ? null : t)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm sm:px-5 sm:py-2.5 transition-colors ${
                on ? "border-black bg-black text-white" : "border-black/15 text-black/75 hover:border-black/40"
              }`}
            >
              {t}
              {compte(t) > 0 && (
                <span className={`ml-2 ${on ? "text-white/70" : "text-black/55"}`}>
                  {compte(t)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tag === XARXES && reels.length > 0 && (
        <ul className="mx-auto mt-10 grid max-w-[76rem] grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-14">
          {reels.map((r, i) => (
            <Reveal key={r.slug} as="li" className="reveal-up" style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
              <ReelCard r={r} />
            </Reveal>
          ))}
        </ul>
      )}

      {tag !== XARXES && shown.length === 0 && (
        <p className="mt-10 rounded-[28px] bg-[#eceef2] px-6 py-16 text-center text-black/55">Aviat hi afegirem projectes d&apos;aquest servei.</p>
      )}

      {tag !== XARXES && (
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {shown.map((p, i) => (
          <Reveal key={p.slug} as="li" className="reveal-up" style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
            <ProjectCard p={p} priority={i < 3} ux={tag === "UX/UI"} />
          </Reveal>
        ))}
      </ul>
      )}
    </>
  );
};
