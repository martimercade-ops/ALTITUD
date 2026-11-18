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

      <ol className="mt-16 flex flex-col">
        {shown.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={p.slug} className="grid items-center gap-10 border-t border-black/10 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
              <Reveal className={`reveal-up lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                <Link href={projectHref(p.slug)} aria-label={`Veure el projecte de ${p.name}`} className="block">
                  <Laptop src={p.image} alt={`Web de ${p.name}`} url={p.links[0]?.label} />
                </Link>
              </Reveal>
              <Reveal className={`reveal-text lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">{p.sector}</p>
                <h2 className="mt-4 text-[2rem] font-light leading-[1.05] tracking-tight md:text-[2.75rem]">{p.name}</h2>
                <p className="mt-5 text-[16px] leading-relaxed text-black/65">
                  {p.about} {p.summary}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Serveis">
                  {p.services.map((s) => (
                    <li key={s} className="rounded-full bg-black/[0.05] px-3.5 py-1.5 text-[13px] text-black/70">{s}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-5 text-sm">
                  <Link href={projectHref(p.slug)} className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-5 font-medium text-white hover:bg-black/85">
                    Veure el projecte →
                  </Link>
                  {p.links[0] && (
                    <a href={p.links[0].url} target="_blank" rel="noopener noreferrer" className="border-b border-black/30 pb-0.5 text-black/70 hover:border-black hover:text-black">
                      {p.links[0].label} ↗
                    </a>
                  )}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </>
  );
};
