"use client";

import { useActionState } from "react";
import { entrar, type Estat } from "@/app/panell/accions";

export const FormEntrar = () => {
  const [estat, accio, pendent] = useActionState<Estat, FormData>(entrar, {});
  return (
    <form action={accio} className="mt-7 flex flex-col gap-4" autoComplete="on">
      <label>
        <span className="panell-etiqueta">Usuari</span>
        <input name="usuari" required autoComplete="username" className="panell-camp" />
      </label>
      <label>
        <span className="panell-etiqueta">Contrasenya</span>
        <input name="contrasenya" type="password" required autoComplete="current-password" className="panell-camp" />
      </label>
      <label>
        <span className="panell-etiqueta">Codi del mòbil</span>
        <input
          name="codi"
          required
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9 ]{6,7}"
          placeholder="123 456"
          className="panell-camp tracking-[0.3em]"
        />
      </label>
      {estat.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{estat.error}</p>}
      <button type="submit" disabled={pendent} className="panell-boto mt-2 w-full disabled:opacity-60">
        {pendent ? "Comprovant…" : "Entrar"}
      </button>
    </form>
  );
};
