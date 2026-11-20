"use client";

import Image from "next/image";
import type { TeamMember } from "@/views/team";

/** Targeta d'una persona: s'inclina seguint el ratolí i la foto s'apropa */
export const TeamCard = ({ m }: { m: TeamMember }) => {
  const move = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--tx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    e.currentTarget.style.setProperty("--ty", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };
  const leave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--tx", "0");
    e.currentTarget.style.setProperty("--ty", "0");
  };
  return (
    <article onPointerMove={move} onPointerLeave={leave} className="membre group flex h-full flex-col overflow-hidden rounded-[28px] bg-[#eceef2]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={m.image}
          alt={`${m.name}, ${m.role} d'Altitud Digital`}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1280px) 30vw, 18vw"
          quality={90}
          className="membre-foto object-cover"
        />
        <span aria-hidden="true" className="membre-brill" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-[1.3rem] font-normal leading-tight tracking-tight">{m.name}</h2>
        <p className="membre-rol mt-1 text-sm font-medium text-[#2f5bff]">{m.role}</p>
        {m.bio && <p className="mt-3 text-[14px] leading-relaxed text-black/60">{m.bio}</p>}
      </div>
    </article>
  );
};
