"use client";

import { useActionState } from "react";
import { importa, type Estat } from "@/app/panell/accions";

export const FormImporta = () => {
  const [estat, accio, pendent] = useActionState<Estat, FormData>(importa, {});
  return (
    <form action={accio} className="panell-targeta mt-6 flex flex-col gap-4 p-6">
      <input type="file" name="fitxer" accept=".csv,text/csv" required className="text-sm" />
      {estat.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{estat.error}</p>}
      {estat.ok && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{estat.ok}</p>}
      <button type="submit" disabled={pendent} className="panell-boto self-start disabled:opacity-60">{pendent ? "Important…" : "Importar"}</button>
    </form>
  );
};
