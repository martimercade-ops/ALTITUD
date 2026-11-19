"use client";

import { useMemo, useState } from "react";
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

/** Targeta de projecte: en passar-hi el cursor surt el portàtil de perfil amb la web */
const ProjectCard = ({ p }: { p: Project }) => {
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
      href={projectHref(p.slug)}
      aria-label={`Veure el projecte de ${p.name}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="illa group relative block aspect-[4/5] lg:aspect-square overflow-hidden rounded-[28px] bg-[#0b1424] text-white"
    >
      <Image src={p.image} alt="" fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw" className="illa-fons object-cover object-top" />
      <span aria-hidden="true" className="illa-vel" />
      <span aria-hidden="true" className="illa-llum" />

      <div aria-hidden="true" className="illa-escenari">
        <div className="illa-portatil">
          <Laptop src={p.image} alt="" url={p.links[0]?.label} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[3] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/55">{p.sector}</p>
        <h2 className="mt-2 text-[1.7rem] font-light leading-[1.05] tracking-tight">{p.name}</h2>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Serveis">
          {p.services.map((s) => (
            <li key={s} className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-xs text-white/85 backdrop-blur">{s}</li>
          ))}
        </ul>
      </div>
      <span aria-hidden="true" className="absolute right-5 top-5 z-[3] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors group-hover:bg-accent-lime group-hover:text-black">↗</span>
    </Link>
  );
};

export const ProjectsList = ({ projects }: { projects: Project[] }) => {
  const tags = useMemo(() => {
    const all = projects.flatMap((p) => p.services);
    return [...new Set(all)].sort((a, b) => all.filter((x) => x === b).length - all.filter((x) => x === a).length);
  }, [projects]);
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? projects.filter((p) => p.services.includes(tag)) : projects;

  return (
    <>
      <div role="group" aria-label="Filtra per servei" className="flex flex-wrap gap-2">
        {[null, ...tags].map((t) => {
          const on = t === tag;
          return (
            <button
              key={t ?? "tots"}
              type="button"
              aria-pressed={on}
              onClick={() => setTag(t)}
              className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                on ? "border-black bg-black text-white" : "border-black/15 text-black/75 hover:border-black/40"
              }`}
            >
              {t ?? "Tots"}
              <span className={`ml-2 ${on ? "text-white/60" : "text-black/35"}`}>
                {t ? projects.filter((p) => p.services.includes(t)).length : projects.length}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <Reveal key={p.slug} as="li" className="reveal-up" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </ul>
    </>
  );
};
