import Link from "next/link";
import { dbConfigurada } from "@/lib/panell/db";
import { llistaProjectes } from "@/lib/panell/projectes";
import { requereixSessio } from "@/lib/panell/seguretat";
import { colorEstatProjecte, nomEstatProjecte } from "@/lib/panell/tipus";
import { Barra } from "@/views/panell/barra";
import { SenseDb } from "@/views/panell/sense-db";

const euros = (n: number) => n.toLocaleString("ca-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const dia = (s: string) => new Date(s + "T12:00:00Z").toLocaleDateString("ca-ES", { day: "numeric", month: "short", year: "numeric" });
const avui = () => new Date().toISOString().slice(0, 10);
const diesFins = (s: string) => Math.round((new Date(s + "T12:00:00Z").getTime() - new Date(avui() + "T12:00:00Z").getTime()) / 864e5);

export default async function Projectes() {
  if (!dbConfigurada()) return <SenseDb />;
  const s = await requereixSessio();
  const ps = await llistaProjectes();
  const actius = ps.filter((p) => p.estat === "actiu");
  const kpis = [
    ["Projectes en curs", String(actius.length), "#60a5fa"],
    ["Entregues en 14 dies", String(actius.filter((p) => p.entrega && diesFins(p.entrega) <= 14).length), "#fbbf24"],
    ["Facturació en curs", euros(actius.reduce((a, p) => a + (p.preu_client ?? 0), 0)), "#b6f13a"],
    ["Pendent de pagar (extern)", euros(ps.filter((p) => !p.cost_pagat).reduce((a, p) => a + (p.cost_extern ?? 0), 0)), "#f87171"],
  ];

  return (
    <>
      <Barra usuari={s.usuari} actiu="/panell/projectes" />
      <section className="pa-hero relative overflow-hidden text-white">
        <span aria-hidden="true" className="pa-graella" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="pa-entra">
              <h1 className="text-[2.4rem] font-semibold leading-tight tracking-tight md:text-5xl">Projectes</h1>
              <p className="mt-2 text-white/60">Fases, dates d&apos;entrega i números de cada projecte obert.</p>
            </div>
            <Link href="/panell/projectes/nou" className="pa-entra inline-flex items-center gap-2 rounded-full bg-[#b6f13a] px-5 py-3 text-sm font-semibold text-[#0b1424] transition-transform hover:scale-[1.03]">+ Nou projecte</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {kpis.map(([k, v, c], i) => (
              <div key={k} className="pa-kpi pa-entra rounded-2xl p-5" style={{ "--i": i + 1 } as React.CSSProperties}>
                <p className="flex items-center gap-2 text-xs text-white/55"><span className="size-1.5 rounded-full" style={{ background: c }} />{k}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {ps.length === 0 ? (
          <div className="panell-targeta p-12 text-center text-black/55">
            Encara no hi ha projectes. <Link href="/panell/projectes/nou" className="font-medium text-black underline">Crea el primer</Link> o converteix un lead guanyat des de la seva fitxa.
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ps.map((p) => {
              const pct = p.fases_total ? Math.round(((p.fases_fetes ?? 0) / p.fases_total) * 100) : 0;
              const d = p.entrega ? diesFins(p.entrega) : null;
              const tard = d !== null && d < 0 && p.estat === "actiu";
              return (
                <li key={p.id}>
                  <Link href={`/panell/projectes/${p.id}`} className="panell-targeta group flex h-full flex-col p-5 transition-shadow hover:shadow-lg">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold uppercase tracking-wider text-black/45">{p.client}</p>
                        <p className="mt-1 text-lg font-semibold leading-snug tracking-tight group-hover:underline">{p.nom}</p>
                      </div>
                      <span className="shrink-0 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold" style={{ background: `${colorEstatProjecte(p.estat)}18`, color: colorEstatProjecte(p.estat) }}>
                        {nomEstatProjecte(p.estat)}
                      </span>
                    </div>
                    <div className="mt-5">
                      <div className="flex justify-between text-xs text-black/50"><span>{p.fases_fetes}/{p.fases_total} fases</span><span>{pct}%</span></div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/5">
                        <span className="block h-full rounded-full bg-gradient-to-r from-[#2b72e2] to-[#b6f13a]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                      {p.entrega && (
                        <span className={`rounded-full px-2.5 py-1 ${tard ? "bg-red-50 text-red-700" : d !== null && d <= 7 ? "bg-amber-50 text-amber-800" : "bg-black/5 text-black/60"}`}>
                          📅 {dia(p.entrega)}{p.estat === "actiu" && d !== null ? (tard ? ` · fa ${-d} dies` : d === 0 ? " · avui" : ` · ${d} dies`) : ""}
                        </span>
                      )}
                      {p.preu_client ? <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">{euros(p.preu_client)}</span> : null}
                      {p.cost_extern ? (
                        <span className={`rounded-full px-2.5 py-1 ${p.cost_pagat ? "bg-black/5 text-black/50" : "bg-red-50 text-red-700"}`}>
                          Extern {euros(p.cost_extern)} · {p.cost_pagat ? "pagat" : "pendent"}
                        </span>
                      ) : null}
                      {p.responsable && <span className="rounded-full bg-black/5 px-2.5 py-1 text-black/60">👤 {p.responsable}</span>}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
