import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConfigurada } from "@/lib/panell/db";
import { fasesDe, notesProjecte, obtéProjecte } from "@/lib/panell/projectes";
import { requereixSessio } from "@/lib/panell/seguretat";
import { colorEstatProjecte, nomEstatProjecte } from "@/lib/panell/tipus";
import { desaProjecte, esborraProj, notaProj } from "@/app/panell/accions";
import { Barra } from "@/views/panell/barra";
import { FormProjecte } from "@/views/panell/form-projecte";
import { SenseDb } from "@/views/panell/sense-db";
import { BotoEsborrar } from "@/views/panell/boto-esborrar";
import { EditorFases } from "@/views/panell/editor-fases";

const dataHora = (s: string) =>
  new Date(s.replace(" ", "T") + "Z").toLocaleString("ca-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Andorra" });
const euros = (n: number) => n.toLocaleString("ca-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const dia = (s: string) => new Date(s + "T12:00:00Z").toLocaleDateString("ca-ES", { day: "numeric", month: "long", year: "numeric" });

export default async function FitxaProjecte({ params }: { params: Promise<{ id: string }> }) {
  if (!dbConfigurada()) return <SenseDb />;
  const s = await requereixSessio();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const p = await obtéProjecte(id);
  if (!p) notFound();
  const [fases, notes] = await Promise.all([fasesDe(id), notesProjecte(id)]);
  const fetes = fases.filter((f) => f.estat === "fet").length;
  const pct = fases.length ? Math.round((fetes / fases.length) * 100) : 0;
  const marge = p.preu_client !== null ? p.preu_client - (p.cost_extern ?? 0) : null;

  return (
    <>
      <Barra usuari={s.usuari} actiu="/panell/projectes" />
      <section className="pa-hero relative overflow-hidden text-white">
        <span aria-hidden="true" className="pa-graella" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-8">
          <Link href="/panell/projectes" className="text-sm text-white/50 hover:text-white">← Tots els projectes</Link>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#b6f13a]">{p.client}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{p.nom}</h1>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${colorEstatProjecte(p.estat)}40` }}>● {nomEstatProjecte(p.estat)}</span>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pa-kpi rounded-2xl p-4">
              <p className="text-xs text-white/55">Progrés</p>
              <p className="mt-1 text-2xl font-semibold">{pct}%</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-[#b6f13a]" style={{ width: `${pct}%` }} /></div>
            </div>
            <div className="pa-kpi rounded-2xl p-4">
              <p className="text-xs text-white/55">Entrega</p>
              <p className="mt-1 text-lg font-semibold">{p.entrega ? dia(p.entrega) : "Sense data"}</p>
            </div>
            <div className="pa-kpi rounded-2xl p-4">
              <p className="text-xs text-white/55">Preu client · Marge</p>
              <p className="mt-1 text-lg font-semibold">
                {p.preu_client !== null ? euros(p.preu_client) : "—"}
                {marge !== null && <span className="ml-2 text-sm font-normal text-white/55">({euros(marge)})</span>}
              </p>
            </div>
            <div className="pa-kpi rounded-2xl p-4">
              <p className="text-xs text-white/55">Cost extern</p>
              <p className="mt-1 text-lg font-semibold">
                {p.cost_extern !== null ? euros(p.cost_extern) : "—"}
                {p.cost_extern !== null && (
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${p.cost_pagat ? "bg-emerald-400/20 text-emerald-200" : "bg-red-400/20 text-red-200"}`}>
                    {p.cost_pagat ? "Pagat" : "Pendent"}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:px-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-6">
          <EditorFases projecteId={id} fases={fases} />
          <div>
            <h2 className="mb-3 text-lg font-semibold tracking-tight">Dades del projecte</h2>
            <FormProjecte p={p} accio={desaProjecte.bind(null, id)} boto="Desar canvis" />
          </div>
        </div>
        <aside className="flex flex-col gap-4">
          <form action={notaProj.bind(null, id)} className="panell-targeta p-5">
            <label>
              <span className="panell-etiqueta">Actualització</span>
              <textarea name="text" rows={3} required placeholder="Què s'ha fet, què falta, bloquejos…" className="panell-camp" />
            </label>
            <button type="submit" className="panell-boto mt-3">Publicar</button>
          </form>
          <div className="panell-targeta p-5">
            <p className="panell-etiqueta">Historial</p>
            {notes.length ? (
              <ol className="mt-2 flex flex-col gap-4">
                {notes.map((n) => (
                  <li key={n.id} className="flex gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#0b1424] text-xs font-semibold uppercase text-[#b6f13a]">{n.autor.slice(0, 1)}</span>
                    <div>
                      <p className="text-xs text-black/45"><strong className="font-medium capitalize text-black/70">{n.autor}</strong> · {dataHora(n.quan)}</p>
                      <p className="mt-0.5 whitespace-pre-wrap text-sm">{n.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-2 text-sm text-black/45">Encara no hi ha actualitzacions.</p>
            )}
          </div>
          {p.lead_id && <Link href={`/panell/lead/${p.lead_id}`} className="text-sm text-black/55 hover:text-black">→ Veure el lead d&apos;origen</Link>}
          <BotoEsborrar accio={esborraProj.bind(null, id)} text="Esborrar projecte" />
        </aside>
      </main>
    </>
  );
}
