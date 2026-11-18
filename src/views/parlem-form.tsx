"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, sendContact } from "@/lib/send-contact";

export interface ParlemFormProps {
  services: { slug: string; label: string }[];
  budgets: string[];
  unsureLabel: string;
}

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const field =
  "peer h-14 w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 pt-4 text-[0.95rem] text-white outline-none transition-colors placeholder:text-transparent hover:border-white/35 focus:border-accent-lime focus:bg-white/[0.07]";
const floating =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[0.95rem] text-white/50 transition-all duration-200 peer-focus:top-3.5 peer-focus:text-[0.7rem] peer-focus:text-accent-lime peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[0.7rem]";

const Input = ({
  id,
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) => (
  <div className={`relative ${className}`}>
    <input id={id} name={id} placeholder={label} className={field} {...props} />
    <label htmlFor={id} className={floating}>
      {label}
      {props.required ? "" : <span className="text-white/30"> · opcional</span>}
    </label>
  </div>
);

export const ParlemForm = ({ services, budgets, unsureLabel }: ParlemFormProps) => {
  const empty = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    website: "",
    budget: "",
    message: "",
    company_url: "",
  };
  const [values, setValues] = useState(empty);
  const [selected, setSelected] = useState<string[]>([]);
  const [newsletter, setNewsletter] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  // Preselecciona el servei si venim d'una pàgina de servei (?servei=slug)
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("servei");
    const match = services.find((s) => s.slug === slug);
    if (match) setSelected([match.label]);
  }, [services]);

  const set =
    (key: keyof typeof empty) =>
    (e: { target: { value: string } }) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const toggle = (label: string) =>
    setSelected((cur) =>
      cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label],
    );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const result = await sendContact({
        ...values,
        services: selected,
        newsletter,
        source: "Pàgina Parlem",
      });
      setStatus(result);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div
        role="status"
        className="flex min-h-[28rem] flex-col items-start justify-center rounded-3xl border border-white/15 bg-white/[0.04] p-8 backdrop-blur md:p-12"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-lime text-black">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
            <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-8 text-3xl font-light tracking-tight md:text-4xl">
          {status === "sent" ? "Missatge rebut!" : "Ja gairebé està."}
        </h2>
        <p className="mt-4 max-w-md text-white/70">
          {status === "sent"
            ? "Gràcies per confiar en nosaltres. Revisarem el teu projecte i et contactarem molt aviat."
            : "Hem obert el teu correu amb el missatge preparat. Només cal que el revisis i l'enviïs."}
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-sm text-white/90 hover:border-white/60"
        >
          Tornar a l&apos;inici
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="name" label="Nom" autoComplete="given-name" required value={values.name} onChange={set("name")} />
        <Input id="surname" label="Cognoms" autoComplete="family-name" value={values.surname} onChange={set("surname")} />
        <Input id="email" label="Correu electrònic" type="email" inputMode="email" autoComplete="email" required value={values.email} onChange={set("email")} />
        <Input id="phone" label="Telèfon" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} />
      </div>
      <Input id="website" label="La teva web" type="text" inputMode="url" autoComplete="url" value={values.website} onChange={set("website")} />

      {/* Camp trampa contra robots: invisible per a les persones */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_url">No omplis aquest camp</label>
        <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" value={values.company_url} onChange={set("company_url")} />
      </div>

      <fieldset className="mt-4">
        <legend className="mb-3 text-sm text-white/70">Quins serveis t&apos;interessen?</legend>
        <div className="flex flex-wrap gap-2">
          {[...services.map((s) => s.label), unsureLabel].map((label) => {
            const on = selected.includes(label);
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(label)}
                className={`rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                  on
                    ? "border-accent-lime bg-accent-lime text-black"
                    : "border-white/25 text-white/85 hover:border-white/60 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="relative mt-4">
        <label htmlFor="budget" className="mb-3 block text-sm text-white/70">
          Inversió mensual en màrqueting
        </label>
        <div className="relative">
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={set("budget")}
            className="h-14 w-full appearance-none rounded-xl border border-white/20 bg-white/[0.04] px-4 text-[0.95rem] text-white outline-none transition-colors hover:border-white/35 focus:border-accent-lime"
          >
            <option value="" className="bg-[#0b1424]">Selecciona una opció</option>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-[#0b1424]">
                {b}
              </option>
            ))}
          </select>
          <svg aria-hidden="true" viewBox="0 0 10 6" className="pointer-events-none absolute right-5 top-1/2 h-1.5 w-2.5 -translate-y-1/2 text-white/70">
            <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="relative mt-4">
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Explica'ns el teu projecte"
          value={values.message}
          onChange={set("message")}
          className="peer w-full resize-none rounded-xl border border-white/20 bg-white/[0.04] px-4 pb-3 pt-7 text-[0.95rem] text-white outline-none transition-colors placeholder:text-transparent hover:border-white/35 focus:border-accent-lime focus:bg-white/[0.07]"
        />
        <label
          htmlFor="message"
          className="pointer-events-none absolute left-4 top-5 text-[0.95rem] text-white/50 transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[0.7rem] peer-focus:text-accent-lime peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[0.7rem]"
        >
          Explica&apos;ns el teu projecte <span className="text-white/30">· opcional</span>
        </label>
      </div>

      <label className="mt-2 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-white/60">
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-accent-lime"
        />
        Vull rebre novetats, casos d&apos;èxit i consells de màrqueting d&apos;Altitud Digital. Em puc donar de baixa quan vulgui.
      </label>
      <p className="text-xs text-white/50">
        En enviar el formulari acceptes la{" "}
        <Link href="/privacy-policy" className="text-white/80 underline underline-offset-2 hover:text-white">
          política de privacitat
        </Link>
        .
      </p>

      <div className="mt-4 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" aria-live="polite" className="min-h-5 text-sm text-white/70">
          {status === "error" && (
            <>
              No s&apos;ha pogut enviar. Escriu-nos a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                {CONTACT_EMAIL}
              </a>
              .
            </>
          )}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-12 items-center gap-3 rounded-full bg-accent-lime pl-7 pr-2 text-sm font-semibold uppercase tracking-wide text-black transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {status === "sending" ? "Enviant…" : "Enviar"}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-accent-lime transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    </form>
  );
};
