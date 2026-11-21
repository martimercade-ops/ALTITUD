"use client";

import Link from "next/link";
import { useMemo, useOptimistic, useState, useTransition } from "react";
import { canviaEstat } from "@/app/panell/accions";
import { ESTATS, TIPUS, colorEstat, nomEstat, nomTipus, type Lead } from "@/lib/panell/tipus";

const data = (s: string) => new Date(s.replace(" ", "T") + "Z").toLocaleDateString("ca-ES", { day: "2-digit", month: "short", year: "numeric" });
const euros = (n: number) => n.toLocaleString("ca-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const avui = () => new Date().toISOString().slice(0, 10);

const Pastilla = ({ estat }: { estat: string }) => (
  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: `${colorEstat(estat)}18`, color: colorEstat(estat) }}>
    <span className="size-1.5 rounded-full" style={{ background: colorEstat(estat) }} />
    {nomEstat(estat)}
  </span>
);

export const Tauler = ({ leads }: { leads: Lead[] }) => {
  const [vista, setVista] = useState<"taula" | "columnes">("taula");
  const [tipus, setTipus] = useState("tots");
  const [estat, setEstat] = useState("tots");
  const [q, setQ] = useState("");
  const [, startTransition] = useTransition();
  const [optim, mou] = useOptimistic(leads, (ls: Lead[], c: { id: number; estat: string }) =>
    ls.map((l) => (l.id === c.id ? { ...l, estat: c.estat } : l)),
  );

  const filtrats = useMemo(() => {
    const t = q.trim().toLowerCase();
    return optim.filter(
      (l) =>
        (tipus === "tots" || l.tipus === tipus) &&
        (estat === "tots" || l.estat === estat) &&
        (!t || [l.empresa, l.contacte, l.email, l.telefon, l.serveis].join(" ").toLowerCase().includes(t)),
    );
  }, [optim, tipus, estat, q]);

  const kpi = useMemo(() => {
    const mes = new Date().toISOString().slice(0, 7);
    const actius = optim.filter((l) => !["guanyat", "perdut"].includes(l.estat));
    return {
      nous: optim.filter((l) => l.estat === "nou").length,
      mes: optim.filter((l) => l.creat.startsWith(mes)).length,
      actius: actius.length,
      guanyats: optim.filter((l) => l.estat === "guanyat").length,
      cartera: actius.reduce((s, l) => s + (l.valor ?? 0), 0),
      seguiments: optim.filter((l) => l.seguiment && l.seguiment <= avui() && !["guanyat", "perdut"].includes(l.estat)),
    };
  }, [optim]);

  const mouA = (id: number, nou: string) =>
    startTransition(async () => {
      mou({ id, estat: nou });
      await canviaEstat(id, nou);
    });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-black/50">{optim.length} en total</p>
        </div>
        <Link href="/panell/nou" className="panell-boto">+ Nou lead</Link>
      </div>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {[
          ["Nous per contactar", kpi.nous],
          ["Entrats aquest mes", kpi.mes],
          ["En curs", kpi.actius],
          ["Guanyats", kpi.guanyats],
          ["En cartera", euros(kpi.cartera)],
        ].map(([k, v]) => (
          <div key={k} className="panell-targeta p-4">
            <p className="text-xs text-black/50">{k}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{v}</p>
          </div>
        ))}
      </section>

      {kpi.seguiments.length > 0 && (
        <section className="panell-targeta border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-900">Seguiments pendents ({kpi.seguiments.length})</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {kpi.seguiments.map((l) => (
              <li key={l.id}>
                <Link href={`/panell/lead/${l.id}`} className="inline-flex rounded-full bg-white px-3 py-1 text-sm text-amber-900 ring-1 ring-amber-200 hover:ring-amber-400">
                  {l.empresa || l.contacte} · {data(l.seguiment!)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="flex flex-wrap items-center gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cerca empresa, persona, correu…" className="panell-camp !w-auto min-w-[16rem] flex-1" />
        <select value={tipus} onChange={(e) => setTipus(e.target.value)} className="panell-camp !w-auto">
          <option value="tots">Tots els tipus</option>
          {TIPUS.map((t) => <option key={t.id} value={t.id}>{t.nom}</option>)}
        </select>
        <select value={estat} onChange={(e) => setEstat(e.target.value)} className="panell-camp !w-auto">
          <option value="tots">Tots els estats</option>
          {ESTATS.map((e) => <option key={e.id} value={e.id}>{e.nom}</option>)}
        </select>
        <div className="flex rounded-full bg-black/5 p-1 text-sm">
          {(["taula", "columnes"] as const).map((v) => (
            <button key={v} type="button" onClick={() => setVista(v)} className={`rounded-full px-3 py-1.5 ${vista === v ? "bg-white shadow-sm" : "text-black/55"}`}>
              {v === "taula" ? "Taula" : "Columnes"}
            </button>
          ))}
        </div>
      </section>

      {vista === "taula" ? (
        <div className="panell-targeta overflow-x-auto">
          <table className="w-full min-w-[56rem] text-left text-sm">
            <thead className="border-b border-black/5 text-xs uppercase tracking-wide text-black/45">
              <tr>
                {["Data", "Empresa", "Contacte", "Serveis", "Tipus", "Estat", "Seguiment"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrats.map((l) => (
                <tr key={l.id} className="border-b border-black/[0.04] last:border-0 hover:bg-black/[0.02]">
                  <td className="whitespace-nowrap px-4 py-3 text-black/55">{data(l.creat)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/panell/lead/${l.id}`} className="font-medium hover:underline">{l.empresa || "—"}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <div>{l.contacte}</div>
                    <div className="text-xs text-black/45">{l.email}{l.telefon ? ` · ${l.telefon}` : ""}</div>
                  </td>
                  <td className="max-w-[14rem] px-4 py-3 text-xs text-black/60">{l.serveis}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs">{nomTipus(l.tipus)}</td>
                  <td className="px-4 py-3">
                    <select value={l.estat} onChange={(e) => mouA(l.id, e.target.value)} className="rounded-full border-0 bg-transparent text-xs font-medium focus:ring-2" style={{ color: colorEstat(l.estat) }} aria-label="Estat">
                      {ESTATS.map((e) => <option key={e.id} value={e.id}>{e.nom}</option>)}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-black/55">{l.seguiment ? data(l.seguiment) : ""}</td>
                </tr>
              ))}
              {!filtrats.length && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-black/45">Cap lead amb aquests filtres.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {ESTATS.map((e) => {
            const col = filtrats.filter((l) => l.estat === e.id);
            return (
              <div
                key={e.id}
                onDragOver={(ev) => ev.preventDefault()}
                onDrop={(ev) => {
                  const id = Number(ev.dataTransfer.getData("text/plain"));
                  if (id) mouA(id, e.id);
                }}
                className="flex w-64 shrink-0 flex-col rounded-2xl bg-black/[0.035] p-2"
              >
                <p className="flex items-center justify-between px-2 py-2 text-sm font-medium">
                  <Pastilla estat={e.id} />
                  <span className="text-xs text-black/40">{col.length}</span>
                </p>
                <div className="flex min-h-24 flex-col gap-2">
                  {col.map((l) => (
                    <Link
                      key={l.id}
                      href={`/panell/lead/${l.id}`}
                      draggable
                      onDragStart={(ev) => ev.dataTransfer.setData("text/plain", String(l.id))}
                      className="panell-targeta block cursor-grab p-3 text-sm hover:shadow-md active:cursor-grabbing"
                    >
                      <p className="font-medium">{l.empresa || l.contacte || "—"}</p>
                      <p className="mt-0.5 text-xs text-black/50">{l.contacte}</p>
                      <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[0.7rem] text-black/45">
                        <span className="rounded-full bg-black/5 px-2 py-0.5">{nomTipus(l.tipus)}</span>
                        {l.valor ? <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">{euros(l.valor)}</span> : null}
                        <span>{data(l.creat)}</span>
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
