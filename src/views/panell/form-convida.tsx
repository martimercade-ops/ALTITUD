"use client";

import { useActionState, useState } from "react";
import { convida, type EstatInvitacio } from "@/app/panell/accions";

export const FormConvida = () => {
  const [estat, accio, pendent] = useActionState<EstatInvitacio, FormData>(convida, {});
  const [copiat, setCopiat] = useState(false);
  return (
    <div className="panell-targeta mt-4 p-6">
      <form action={accio} className="flex flex-wrap gap-2">
        <input name="email" type="email" placeholder="correu@exemple.com (opcional)" className="panell-camp !w-auto flex-1" />
        <button type="submit" disabled={pendent} className="panell-boto disabled:opacity-60">{pendent ? "Creant…" : "Crear invitació"}</button>
      </form>
      <p className="mt-2 text-xs text-black/45">Si poses un correu, li enviem l&apos;enllaç directament.</p>
      {estat.enviat && <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Invitació enviada a {estat.enviat}.</p>}
      {estat.error && <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">{estat.error}</p>}
      {estat.enllac && (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-[#f4f5f7] p-3">
          <code className="min-w-0 flex-1 break-all text-xs">{estat.enllac}</code>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(estat.enllac!).then(() => setCopiat(true))}
            className="panell-boto panell-boto--clar !py-1.5"
          >
            {copiat ? "Copiat ✓" : "Copiar"}
          </button>
        </div>
      )}
    </div>
  );
};
