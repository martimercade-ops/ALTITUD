"use client";

import { useActionState } from "react";
import { configura, type Estat } from "@/app/panell/accions";

export const FormConfigura = ({ secret, qr }: { secret: string; qr: string }) => {
  const [estat, accio, pendent] = useActionState<Estat, FormData>(configura, {});
  return (
    <form action={accio} className="mt-7 flex flex-col gap-5">
      <input type="hidden" name="secret" value={secret} />
      <label>
        <span className="panell-etiqueta">Codi de configuració</span>
        <input name="token" type="password" required className="panell-camp" autoComplete="off" />
      </label>
      <label>
        <span className="panell-etiqueta">Usuari</span>
        <input name="usuari" required className="panell-camp" autoComplete="username" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="panell-etiqueta">Contrasenya (mín. 14)</span>
          <input name="contrasenya" type="password" minLength={14} required className="panell-camp" autoComplete="new-password" />
        </label>
        <label>
          <span className="panell-etiqueta">Repeteix-la</span>
          <input name="contrasenya2" type="password" minLength={14} required className="panell-camp" autoComplete="new-password" />
        </label>
      </div>
      <div className="rounded-2xl bg-[#f4f5f7] p-5">
        <p className="text-sm font-medium">Escaneja aquest codi amb Google Authenticator</p>
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qr} alt="Codi QR per a l'aplicació d'autenticació" width={160} height={160} className="rounded-lg bg-white p-2" />
          <div className="text-xs text-black/55">
            <p>O escriu aquesta clau a mà:</p>
            <p className="mt-1 break-all font-mono text-[0.8rem] text-black">{secret.match(/.{1,4}/g)?.join(" ")}</p>
          </div>
        </div>
        <label className="mt-4 block">
          <span className="panell-etiqueta">Codi que surt al mòbil</span>
          <input name="codi" required inputMode="numeric" pattern="[0-9 ]{6,7}" className="panell-camp tracking-[0.3em]" autoComplete="one-time-code" />
        </label>
      </div>
      {estat.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{estat.error}</p>}
      <button type="submit" disabled={pendent} className="panell-boto w-full disabled:opacity-60">
        {pendent ? "Creant…" : "Crear accés"}
      </button>
    </form>
  );
};
