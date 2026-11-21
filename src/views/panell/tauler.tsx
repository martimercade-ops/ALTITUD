"use client";

import Link from "next/link";
import { useMemo, useOptimistic, useState, useTransition } from "react";
import { canviaEstat } from "@/app/panell/accions";
import { ESTATS, TIPUS, colorEstat, nomEstat, nomTipus, type Lead } from "@/lib/panell/tipus";

const data = (s: string) => new Date(s.replace(" ", "T") + "Z").toLocaleDateString("ca-ES", { day: "2-digit", month: "short", year: "numeric" });
const euros = (n: number) => n.toLocaleString("ca-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const avui = () => new Date().toISOString().slice(0, 10);

const PALETA = ["#2b72e2", "#7c5cd6", "#0f9aa8", "#d48a1c", "#c2410c", "#15803d", "#db2777", "#4f46e5"];
const colorDe = (s: string) => PALETA[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETA.length];
const inicials = (s: string) =>
  s.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "·";
const Avatar = ({ nom, mida = "size-9" }: { nom: string; mida?: string }) => (
  <span className={`grid ${mida} shrink-0 place-items-center rounded-xl text-xs font-semibold text-white`} style={{ background: colorDe(nom) }}>
    {inicials(nom)}
  </span>
);
const Tipus = ({ t }: { t: string }) => (
  <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ${t === "ajuts" ? "bg-[#b6f13a]/30 text-[#3d5a00]" : "bg-[#2b72e2]/10 text-[#1d4ed8]"}`}>
    {nomTipus(t)}
  </span>
);
const salutacio = () => {
  const h = Number(new Date().toLocaleString("en-GB", { hour: "2-digit", hour12: false, timeZone: "Europe/Andorra" }));
  return h < 13 ? "Bon dia" : h < 20 ? "Bona tarda" : "Bona nit";
};

const Pastilla = ({ estat }: { estat: string }) => (
  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: `${colorEstat(estat)}18`, color: colorEstat(estat) }}>
    <span className="size-1.5 rounded-full" style={{ background: colorEstat(estat) }} />
    {nomEstat(estat)}
  </span>
);

export const Tauler = ({ leads, usuari }: { leads: Lead[]; usuari: string }) => {
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
    <div>
      <section className="pa-hero relative overflow-hidden text-white">
        <span aria-hidden="true" className="pa-llum pa-llum--a !opacity-40" />
        <span aria-hidden="true" className="pa-graella" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-8 md:pb-14 md:pt-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="pa-entra">
              <p className="text-sm text-white/50">{new Date().toLocaleDateString("ca-ES", { weekday: "long", day: "numeric", month: "long" })}</p>
              <h1 className="mt-1 text-[2rem] font-semibold leading-tight tracking-tight md:text-5xl">
                {salutacio()}, <span className="capitalize text-[#b6f13a]">{usuari}</span>.
              </h1>
              <p className="mt-2 text-white/60">
                {kpi.nous ? `Tens ${kpi.nous} ${kpi.nous === 1 ? "lead nou" : "leads nous"} per contactar.` : "Tot al dia. Cap lead pendent de contactar."}
              </p>
            </div>
            <Link href="/panell/nou" className="pa-entra inline-flex items-center gap-2 rounded-full bg-[#b6f13a] px-5 py-3 text-sm font-semibold text-[#0b1424] transition-transform hover:scale-[1.03]">
              + Nou lead
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[
              ["Per contactar", kpi.nous, "#b6f13a"],
              ["Aquest mes", kpi.mes, "#60a5fa"],
              ["En curs", kpi.actius, "#a78bfa"],
              ["Guanyats", kpi.guanyats, "#34d399"],
              ["En cartera", euros(kpi.cartera), "#fbbf24"],
            ].map(([k, v, c], i) => (
              <div key={String(k)} className="pa-kpi pa-entra rounded-2xl p-4 md:p-5" style={{ "--i": i + 1 } as React.CSSProperties}>
                <p className="flex items-center gap-2 text-xs text-white/55">
                  <span className="size-1.5 rounded-full" style={{ background: String(c) }} />
                  {k}
                </p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight md:mt-2 md:text-3xl">{v}</p>
              </div>
            ))}
          </div>

          {optim.length > 0 && (
            <div className="pa-entra mt-8" style={{ "--i": 6 } as React.CSSProperties}>
              <p className="mb-2 text-xs text-white/45">Embut de vendes</p>
              <div className="flex h-2.5 overflow-hidden rounded-full bg-white/10">
                {ESTATS.map((e) => {
                  const n = optim.filter((l) => l.estat === e.id).length;
                  return n ? <span key={e.id} title={`${e.nom}: ${n}`} style={{ width: `${(n / optim.length) * 100}%`, background: e.color }} /> : null;
                })}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/55">
                {ESTATS.map((e) => (
                  <span key={e.id} className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full" style={{ background: e.color }} />
                    {e.nom} <span className="text-white/35">{optim.filter((l) => l.estat === e.id).length}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
        {kpi.seguiments.length > 0 && (
          <section className="flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-sm font-semibold text-amber-900">⏰ Seguiments per fer ({kpi.seguiments.length})</p>
            <ul className="flex flex-wrap gap-2">
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
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cerca empresa, persona, correu…" className="panell-camp !w-full md:!w-auto md:min-w-[16rem] md:flex-1" />
        <select value={tipus} onChange={(e) => setTipus(e.target.value)} className="panell-camp !w-auto flex-1 md:flex-none">
          <option value="tots">Tots els tipus</option>
          {TIPUS.map((t) => <option key={t.id} value={t.id}>{t.nom}</option>)}
        </select>
        <select value={estat} onChange={(e) => setEstat(e.target.value)} className="panell-camp !w-auto flex-1 md:flex-none">
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
        <>
        <ul className="flex flex-col gap-2 md:hidden">
          {filtrats.map((l) => (
            <li key={l.id}>
              <Link href={`/panell/lead/${l.id}`} className="panell-targeta flex items-center gap-3 p-3.5">
                <Avatar nom={l.empresa || l.contacte} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{l.empresa || l.contacte || "—"}</span>
                  <span className="block truncate text-xs text-black/50">{l.contacte}{l.serveis ? ` · ${l.serveis}` : ""}</span>
                  <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <Pastilla estat={l.estat} />
                    <Tipus t={l.tipus} />
                    <span className="text-[0.7rem] text-black/40">{data(l.creat)}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
          {!filtrats.length && <li className="panell-targeta p-8 text-center text-sm text-black/45">Cap lead amb aquests filtres.</li>}
        </ul>
        <div className="panell-targeta hidden overflow-x-auto md:block">
          <table className="w-full min-w-[60rem] text-left text-sm">
            <thead className="border-b border-black/5 text-xs uppercase tracking-wide text-black/45">
              <tr>
                {["Data", "Empresa", "Contacte", "Serveis", "Tipus", "Estat", "Seguiment"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrats.map((l) => (
                <tr key={l.id} className="border-b border-black/[0.04] transition-colors last:border-0 hover:bg-[#2b72e2]/[0.03]">
                  <td className="whitespace-nowrap px-4 py-3 text-black/55">{data(l.creat)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/panell/lead/${l.id}`} className="flex items-center gap-3 font-medium hover:underline">
                      <Avatar nom={l.empresa || l.contacte} />
                      {l.empresa || "—"}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div>{l.contacte}</div>
                    <div className="text-xs text-black/45">{l.email}{l.telefon ? ` · ${l.telefon}` : ""}</div>
                  </td>
                  <td className="max-w-[14rem] px-4 py-3 text-xs text-black/60">{l.serveis}</td>
                  <td className="whitespace-nowrap px-4 py-3"><Tipus t={l.tipus} /></td>
                  <td className="px-4 py-3">
                    <select value={l.estat} onChange={(e) => mouA(l.id, e.target.value)} className="cursor-pointer rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none focus:ring-2" style={{ color: colorEstat(l.estat), background: `${colorEstat(l.estat)}14` }} aria-label="Estat">
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
        </>
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
                className="flex w-72 shrink-0 flex-col rounded-2xl bg-white/60 p-2 ring-1 ring-black/5"
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
                      className="panell-targeta block cursor-grab border-l-4 p-3 text-sm transition-shadow hover:shadow-lg active:cursor-grabbing"
                      style={{ borderLeftColor: e.color }}
                    >
                      <span className="flex items-center gap-2.5">
                        <Avatar nom={l.empresa || l.contacte} mida="size-8" />
                        <span className="min-w-0">
                          <span className="block truncate font-medium">{l.empresa || l.contacte || "—"}</span>
                          <span className="block truncate text-xs text-black/50">{l.contacte}</span>
                        </span>
                      </span>
                      <p className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[0.7rem] text-black/45">
                        <Tipus t={l.tipus} />
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
    </div>
  );
};
