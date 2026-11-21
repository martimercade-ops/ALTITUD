/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { sortir } from "@/app/panell/accions";

const ENLLACOS = [
  { href: "/panell", nom: "Leads" },
  { href: "/panell/nou", nom: "Nou lead" },
  { href: "/panell/importa", nom: "Importar" },
];

export const Barra = ({ usuari, actiu = "/panell" }: { usuari: string; actiu?: string }) => (
  <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b1424]/95 text-white backdrop-blur">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3.5 md:px-8">
      <Link href="/panell" className="flex items-center gap-3">
        <img src="/assets/altitud/altitud-logo-h.svg" alt="Altitud Digital" className="h-[18px] w-auto" />
        <span className="rounded-full bg-[#b6f13a] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-[#0b1424]">Panell</span>
      </Link>
      <nav className="flex flex-1 flex-wrap items-center gap-1 text-sm">
        {ENLLACOS.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className={`rounded-full px-3.5 py-1.5 transition-colors ${actiu === e.href ? "bg-white/10 text-white" : "text-white/60 hover:text-white"}`}
          >
            {e.nom}
          </Link>
        ))}
        <a href="/api/panell/exporta" className="rounded-full px-3.5 py-1.5 text-white/60 hover:text-white">Exportar</a>
      </nav>
      <form action={sortir} className="flex items-center gap-3 text-sm">
        <span className="hidden items-center gap-2 text-white/60 sm:flex">
          <span className="grid size-7 place-items-center rounded-full bg-[#b6f13a] text-xs font-semibold uppercase text-[#0b1424]">{usuari.slice(0, 1)}</span>
          {usuari}
        </span>
        <button type="submit" className="rounded-full border border-white/15 px-3.5 py-1.5 text-white/80 hover:border-white/40 hover:text-white">Sortir</button>
      </form>
    </div>
  </header>
);
