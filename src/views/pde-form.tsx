"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, sendContact } from "@/lib/send-contact";
import { formatEuros, type PdeSolution } from "@/data/mocks/pde";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const field =
  "peer h-14 w-full rounded-xl border border-black/15 bg-white px-4 pt-4 text-[15px] text-black outline-none transition-colors placeholder:text-transparent hover:border-black/30 focus:border-[#2f5bff]";
const floating =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-black/45 transition-all duration-200 peer-focus:top-3.5 peer-focus:text-[11px] peer-focus:text-[#2f5bff] peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[11px]";

const Input = ({
  id,
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) => (
  <div className="relative">
    <input id={id} name={id} placeholder={label} className={field} {...props} />
    <label htmlFor={id} className={floating}>
      {label}
      {props.required ? "" : <span className="text-black/30"> · opcional</span>}
    </label>
  </div>
);

const Check = ({ on }: { on: boolean }) => (
  <span
    aria-hidden="true"
    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
      on ? "border-[#2f5bff] bg-[#2f5bff] text-white" : "border-black/25 bg-white"
    }`}
  >
    {on && (
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5">
        <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </span>
);

export const PdeForm = ({ solutions }: { solutions: PdeSolution[] }) => {
  const empty = { name: "", company: "", email: "", phone: "", message: "", company_url: "" };
  const [values, setValues] = useState(empty);
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const doneRef = useRef<HTMLDivElement>(null);
  // En enviar, el missatge de confirmació queda al mateix lloc de la pantalla
  useEffect(() => {
    if (status === "sent") doneRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [status]);
  const [missing, setMissing] = useState(false);

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const toggle = (id: string) => {
    setMissing(false);
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  const chosen = solutions.filter((s) => selected.includes(s.id));
  const total = chosen.reduce((sum, s) => sum + s.max, 0);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selected.length === 0) {
      setMissing(true);
      document.getElementById("pde-solucions")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (status === "sending") return;
    setStatus("sending");
    try {
      const result = await sendContact({
        name: values.name,
        company: values.company,
        email: values.email,
        phone: values.phone,
        message: values.message,
        company_url: values.company_url,
        services: chosen.map((s) => `${s.name} (fins a ${formatEuros(s.max)})`),
        source: "Llista d'espera PDE",
        subject: `Llista d'espera PDE — ${values.company || values.name}`,
      });
      setStatus(result);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div ref={doneRef} role="status" className="rounded-3xl border border-black/10 bg-white p-8 md:p-12">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f5bff] text-white">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
            <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-8 text-3xl font-light tracking-tight md:text-4xl">
          {status === "sent" ? "Ja ets a la llista d'espera!" : "Ja gairebé està."}
        </h3>
        <p className="mt-4 max-w-lg text-black/65">
          {status === "sent"
            ? "Quan s'obri la nova convocatòria del PDE et contactarem de seguida perquè ho tinguis tot preparat i no perdis l'ajut."
            : "Hem obert el teu correu amb la sol·licitud preparada. Només cal que l'enviïs per entrar a la llista d'espera."}
        </p>
        <p className="mt-6 text-sm text-black/60">
          Si és urgent, truca&apos;ns al{" "}
          <a href="tel:+376670222" className="font-medium text-black underline underline-offset-4">+376 670 222</a>.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {chosen.map((s) => (
            <li key={s.id} className="rounded-full border border-black/15 px-4 py-1.5 text-sm">
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const featured = solutions.filter((s) => s.featured);
  const others = solutions.filter((s) => !s.featured);

  const Card = ({ s, big }: { s: PdeSolution; big?: boolean }) => {
    const on = selected.includes(s.id);
    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={on}
        onClick={() => toggle(s.id)}
        className={`group relative flex w-full flex-col rounded-2xl border p-5 text-left transition-all duration-200 ${
          on
            ? "border-[#2f5bff] bg-[#2f5bff]/[0.04] shadow-[0_0_0_3px_rgb(47_91_255/0.12)]"
            : "border-black/12 bg-white hover:border-black/30"
        } ${big ? "md:p-6" : ""}`}
      >
        <span className="flex items-start justify-between gap-4">
          <Check on={on} />
          {big && (
            <span className="rounded-full bg-accent-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-black">
              Més demanat
            </span>
          )}
        </span>
        <span className={`mt-5 block font-normal tracking-tight ${big ? "text-xl" : "text-lg"}`}>{s.name}</span>
        <span className="mt-2 block text-[15px] leading-snug text-black/60">{s.text}</span>
        <span className="mt-5 block border-t border-black/10 pt-4 text-sm text-black/55">
          <strong className="font-semibold text-[#2f5bff]">{s.pct}%</strong> del cost · fins a{" "}
          <strong className="text-lg font-semibold text-black">{formatEuros(s.max)}</strong>
        </span>
      </button>
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-12">
      <fieldset id="pde-solucions" className="scroll-mt-32">
        <legend className="text-2xl font-light tracking-tight md:text-3xl">1. Tria les solucions que t&apos;interessen</legend>
        <p className="mt-2 text-[15px] text-black/55">Pots marcar-ne tantes com vulguis.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured.map((s) => (
            <Card key={s.id} s={s} big />
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {others.map((s) => (
            <Card key={s.id} s={s} />
          ))}
        </div>
        <div
          aria-live="polite"
          className={`mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4 transition-colors ${
            missing ? "bg-red-50 text-red-700" : selected.length ? "bg-[#0b1424] text-white" : "bg-black/[0.04] text-black/55"
          }`}
        >
          {missing ? (
            <span className="text-[15px]">Tria almenys una solució per apuntar-te a la llista.</span>
          ) : selected.length ? (
            <>
              <span className="text-[15px]">
                {selected.length} {selected.length === 1 ? "solució triada" : "solucions triades"}
              </span>
              <span className="text-[15px]">
                Ajut potencial: fins a <strong className="text-xl font-semibold text-accent-lime">{formatEuros(total)}</strong>
              </span>
            </>
          ) : (
            <span className="text-[15px]">Encara no has triat cap solució.</span>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-2xl font-light tracking-tight md:text-3xl">2. Les teves dades</legend>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input id="pde-name" label="Nom i cognoms" autoComplete="name" required value={values.name} onChange={set("name")} />
          <Input id="pde-company" label="Empresa" autoComplete="organization" required value={values.company} onChange={set("company")} />
          <Input id="pde-email" label="Correu electrònic" type="email" inputMode="email" autoComplete="email" required value={values.email} onChange={set("email")} />
          <Input id="pde-phone" label="Telèfon" type="tel" inputMode="tel" autoComplete="tel" required value={values.phone} onChange={set("phone")} />
        </div>
        <div className="relative mt-4">
          <textarea
            id="pde-message"
            name="message"
            rows={3}
            placeholder="Comentari"
            value={values.message}
            onChange={set("message")}
            className="peer w-full resize-none rounded-xl border border-black/15 bg-white px-4 pb-3 pt-7 text-[15px] outline-none transition-colors placeholder:text-transparent hover:border-black/30 focus:border-[#2f5bff]"
          />
          <label
            htmlFor="pde-message"
            className="pointer-events-none absolute left-4 top-5 text-[15px] text-black/45 transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-[#2f5bff] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]"
          >
            Comentari <span className="text-black/30">· opcional</span>
          </label>
        </div>

        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="hp-zx-pde">Deixa-ho buit</label>
          <input id="hp-zx-pde" name="hp-zx-pde" type="text" tabIndex={-1} autoComplete="new-password" data-lpignore="true" data-1p-ignore value={values.company_url} onChange={set("company_url")} />
        </div>
      </fieldset>

      <div className="flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-black/50">
          Apuntar-te no té cap cost ni compromís. En enviar el formulari acceptes la{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-black">
            política de privacitat
          </Link>
          .
          {status === "error" && (
            <span className="mt-2 block text-sm text-red-700">
              No s&apos;ha pogut enviar. Escriu-nos a <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
            </span>
          )}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-[#2f5bff] pl-7 pr-2 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {status === "sending" ? "Enviant…" : "Apunta'm a la llista d'espera"}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2f5bff] transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </form>
  );
};
