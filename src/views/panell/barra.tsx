import Link from "next/link";
import { sortir } from "@/app/panell/accions";

export const Barra = ({ usuari }: { usuari: string }) => (
  <header className="sticky top-0 z-30 border-b border-black/5 bg-white/85 backdrop-blur">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:px-8">
      <Link href="/panell" className="flex items-center gap-2 font-semibold tracking-tight">
        <span className="grid size-8 place-items-center rounded-lg bg-[#111827] text-xs text-white">AD</span>
        Panell
      </Link>
      <nav className="flex flex-1 flex-wrap items-center gap-1 text-sm">
        <Link href="/panell" className="rounded-full px-3 py-1.5 hover:bg-black/5">Leads</Link>
        <Link href="/panell/nou" className="rounded-full px-3 py-1.5 hover:bg-black/5">+ Nou lead</Link>
        <Link href="/panell/importa" className="rounded-full px-3 py-1.5 hover:bg-black/5">Importar</Link>
        <a href="/api/panell/exporta" className="rounded-full px-3 py-1.5 hover:bg-black/5">Exportar CSV</a>
      </nav>
      <form action={sortir} className="flex items-center gap-3 text-sm text-black/55">
        <span className="hidden sm:inline">{usuari}</span>
        <button type="submit" className="panell-boto panell-boto--clar !py-1.5">Sortir</button>
      </form>
    </div>
  </header>
);
