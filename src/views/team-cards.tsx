import Image from "next/image";
import type { TeamMember } from "@/views/team";

const LinkedIn = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const Mail = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

/** Targeta d'una persona de l'equip: foto, nom, càrrec, descripció i contacte */
export const TeamCard = ({ m }: { m: TeamMember }) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-[#eceef2]">
    <div className="relative aspect-[4/5] overflow-hidden">
      <Image
        src={m.image}
        alt={`${m.name}, ${m.role} d'Altitud Digital`}
        fill
        sizes="(max-width: 640px) 92vw, (max-width: 1280px) 30vw, 16vw"
        quality={90}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    </div>
    <div className="flex flex-1 flex-col p-5">
      <h2 className="text-[1.3rem] font-normal leading-tight tracking-tight">{m.name}</h2>
      <p className="mt-1 text-sm font-medium text-[#2f5bff]">{m.role}</p>
      {m.bio && <p className="mt-3 text-[14px] leading-relaxed text-black/60">{m.bio}</p>}
      {(m.email || m.linkedin) && (
        <div className="mt-auto flex gap-2 pt-5">
          {m.email && (
            <a
              href={`mailto:${m.email}`}
              title={m.email}
              aria-label={`Escriu a ${m.name}: ${m.email}`}
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-white text-xs font-medium text-black/75 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-colors hover:bg-black hover:text-white"
            >
              <Mail /> Correu
            </a>
          )}
          {m.linkedin && (
            <a
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn de ${m.name}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a66c2] text-white"
            >
              <LinkedIn />
            </a>
          )}
        </div>
      )}
    </div>
  </article>
);
