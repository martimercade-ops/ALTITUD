"use client";

import { useState, type FormEvent } from "react";
import { sendContact } from "@/lib/send-contact";

/** Formulari curt en castellà per a les pàgines /es. Desa el contacte al panell igual que la resta. */
export const FormEs = ({ origen, servei }: { origen: string; servei?: string }) => {
  const [estat, setEstat] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (estat === "sending") return;
    const f = new FormData(e.currentTarget);
    setEstat("sending");
    try {
      await sendContact({
        name: String(f.get("name") ?? ""),
        company: String(f.get("company") ?? ""),
        email: String(f.get("email") ?? ""),
        phone: String(f.get("phone") ?? ""),
        message: String(f.get("message") ?? ""),
        services: servei ? [servei] : [],
        source: `ES · ${origen}`,
        company_url: String(f.get("company_url") ?? ""),
      });
      setEstat("sent");
    } catch {
      setEstat("error");
    }
  };

  if (estat === "sent") {
    return (
      <div className="rounded-3xl bg-white p-8 text-[#171717]" role="status">
        <p className="text-2xl font-light tracking-tight">¡Gracias! Hemos recibido tu mensaje.</p>
        <p className="mt-3 text-black/60">Te contactaremos muy pronto. Si es urgente, llámanos al +376 670 222.</p>
      </div>
    );
  }

  const camp =
    "h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-[15px] text-[#171717] outline-none placeholder:text-black/40 focus:border-[#2f5bff]";

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-3xl bg-white p-6 text-[#171717] shadow-2xl md:p-8">
      <p className="text-xl font-light tracking-tight">Pide presupuesto sin compromiso</p>
      <input name="name" required maxLength={100} placeholder="Nombre" aria-label="Nombre" className={camp} />
      <input name="company" maxLength={150} placeholder="Empresa" aria-label="Empresa" className={camp} />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="email" type="email" required maxLength={200} placeholder="Correo electrónico" aria-label="Correo electrónico" className={camp} />
        <input name="phone" type="tel" maxLength={40} placeholder="Teléfono" aria-label="Teléfono" className={camp} />
      </div>
      <textarea name="message" rows={3} maxLength={3000} placeholder="Cuéntanos tu proyecto" aria-label="Cuéntanos tu proyecto" className={`${camp} h-auto py-3`} />
      <input name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button
        type="submit"
        disabled={estat === "sending"}
        className="mt-1 inline-flex h-12 items-center justify-center rounded-full bg-[#2f5bff] px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {estat === "sending" ? "Enviando…" : "Enviar"}
      </button>
      {estat === "error" && (
        <p className="text-sm text-red-600">No se ha podido enviar. Escríbenos a info@altitudigital.com o al WhatsApp +376 670 222.</p>
      )}
      <p className="text-xs text-black/45">Te respondemos en menos de 24 h laborables.</p>
    </form>
  );
};
