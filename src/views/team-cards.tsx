"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { TeamMember } from "@/views/team";
import { projectHref } from "@/data/mocks/projects";

const LinkedIn = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

/** Targeta que en clicar-la sobresurt i es gira per ensenyar la informació de la persona */
export const TeamCard = ({ m }: { m: TeamMember }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`gira group relative aspect-[3/4.4] w-full ${open ? "gira--on" : ""}`}>
      <div className="gira-cos">
        {/* Davant */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label={`Veure la informació de ${m.name}`}
          className="gira-cara absolute inset-0 overflow-hidden rounded-[28px] bg-[#eceef2] text-left"
        >
          <Image
            src={m.image}
            alt={`${m.name}, ${m.role} d'Altitud Digital`}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1280px) 30vw, 18vw"
            quality={90}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
            <span>
              <span className="block text-[1.35rem] font-normal leading-tight tracking-tight">{m.name}</span>
              <span className="mt-1 block text-sm text-accent-lime">{m.role}</span>
            </span>
            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl leading-none text-black transition-transform group-hover:rotate-90">+</span>
          </span>
        </button>

        {/* Darrere */}
        <div className="gira-cara gira-darrere absolute inset-0 flex flex-col overflow-y-auto rounded-[28px] bg-[#0b1424] p-6 text-white" aria-hidden={!open}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={m.image} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span>
                <span className="block text-lg leading-tight">{m.name}</span>
                <span className="block text-sm text-accent-lime">{m.role}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              aria-label="Tanca"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          {m.bio && <p className="mt-6 text-[15px] leading-relaxed text-white/80">{m.bio}</p>}

          {m.projects && m.projects.length > 0 && (
            <div className="mt-auto pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">Projectes</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {m.projects.map((pr) => {
                  const inner = (
                    <>
                      {pr.logo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`/assets/altitud/clients/color/${pr.logo}.webp`} alt="" className="h-5 w-auto max-w-[3.5rem] object-contain" />
                      )}
                      <span>{pr.name}</span>
                    </>
                  );
                  const cls = "flex items-center gap-2 rounded-xl bg-white px-2.5 py-1.5 text-xs text-black/80";
                  return (
                    <li key={pr.name}>
                      {pr.slug ? (
                        <Link href={projectHref(pr.slug)} tabIndex={open ? 0 : -1} className={`${cls} hover:text-[#2f5bff]`}>{inner}</Link>
                      ) : (
                        <span className={cls}>{inner}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {m.linkedin && (
            <a
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#0a66c2] text-sm font-medium text-white"
            >
              <LinkedIn /> LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
