"use client";

import { useOptimistic, useTransition } from "react";
import { canviaFase, novaFase, treuFase } from "@/app/panell/accions";
import { ESTATS_FASE, type Fase } from "@/lib/panell/tipus";

const seguent = (e: string) => (e === "pendent" ? "en_curs" : e === "en_curs" ? "fet" : "pendent");

export const EditorFases = ({ projecteId, fases }: { projecteId: number; fases: Fase[] }) => {
  const [, start] = useTransition();
  const [optim, aplica] = useOptimistic(fases, (fs: Fase[], c: { id: number; estat: string }) =>
    fs.map((f) => (f.id === c.id ? { ...f, estat: c.estat } : f)),
  );
  const fetes = optim.filter((f) => f.estat === "fet").length;

  return (
    <section className="panell-targeta p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Fases</h2>
        <span className="text-sm text-black/50">{fetes} de {optim.length} fetes</span>
      </div>
      <p className="mt-1 text-xs text-black/45">Clica el cercle per passar la fase a "En curs" i després a "Fet".</p>
      <ol className="relative mt-5 flex flex-col">
        {optim.map((f, i) => {
          const e = ESTATS_FASE.find((x) => x.id === f.estat) ?? ESTATS_FASE[0];
          return (
            <li key={f.id} className="group relative flex items-start gap-4 pb-5 last:pb-0">
              {i < optim.length - 1 && (
                <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-0.5" style={{ background: f.estat === "fet" ? "#15803d" : "rgb(0 0 0 / .08)" }} />
              )}
              <button
                type="button"
                title={`Estat: ${e.nom}. Clica per canviar`}
                onClick={() =>
                  start(async () => {
                    const nou = seguent(f.estat);
                    aplica({ id: f.id, estat: nou });
                    await canviaFase(projecteId, f.id, { estat: nou });
                  })
                }
                className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold text-white transition-transform hover:scale-110"
                style={{ borderColor: e.color, background: f.estat === "fet" ? e.color : f.estat === "en_curs" ? `${e.color}22` : "#fff", color: f.estat === "en_curs" ? e.color : "#fff" }}
              >
                {f.estat === "fet" ? "✓" : f.estat === "en_curs" ? "●" : ""}
              </button>
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 pt-1">
                <input
                  defaultValue={f.nom}
                  onBlur={(ev) => ev.target.value.trim() && ev.target.value !== f.nom && start(() => canviaFase(projecteId, f.id, { nom: ev.target.value }))}
                  className={`min-w-0 flex-1 rounded-md bg-transparent px-1 py-0.5 text-[0.95rem] outline-none focus:bg-black/5 ${f.estat === "fet" ? "text-black/45 line-through" : "font-medium"}`}
                  aria-label="Nom de la fase"
                />
                <span className="rounded-full px-2 py-0.5 text-[0.7rem] font-semibold" style={{ background: `${e.color}18`, color: e.color }}>{e.nom}</span>
                <input
                  type="date"
                  defaultValue={f.data_limit ?? ""}
                  onChange={(ev) => start(() => canviaFase(projecteId, f.id, { data_limit: ev.target.value || null }))}
                  className="rounded-lg border border-black/10 px-2 py-1 text-xs text-black/60"
                  aria-label="Data límit"
                />
                <button type="button" onClick={() => start(() => treuFase(projecteId, f.id))} className="text-xs text-black/30 opacity-0 hover:text-red-600 group-hover:opacity-100" aria-label="Esborrar fase">✕</button>
              </div>
            </li>
          );
        })}
      </ol>
      <form action={novaFase.bind(null, projecteId)} className="mt-5 flex flex-wrap gap-2 border-t border-black/5 pt-5">
        <input name="nom" required placeholder="Nova fase…" className="panell-camp !w-auto flex-1" />
        <input name="data_limit" type="date" className="panell-camp !w-auto" />
        <button type="submit" className="panell-boto">Afegir</button>
      </form>
    </section>
  );
};
