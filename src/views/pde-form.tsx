"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, sendContact } from "@/lib/send-contact";
import { formatEuros, type PdeSolution } from "@/data/mocks/pde";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const field =
  "peer h-13 w-full rounded-xl border border-black/15 bg-white px-4 pt-4 text-[15px] text-black outline-none transition-colors placeholder:text-transparent hover:border-black/30 focus:border-[#2f5bff]";
const floating =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-black/45 transition-all duration-200 peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-[#2f5bff] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[11px]";

const Input = ({
  id,
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) => (
  <div className="relative">
    <input id={id} name={id} placeholder={label} className={`${field} h-[3.25rem]`} {...props} />
    <label htmlFor={id} className={floating}>
      {label}
      {props.required ? "" : <span className="text-black/30"> · opcional</span>}
    </label>
  </div>
);

/** Import màxim sense comptar dues vegades les solucions del mateix paquet */
const potentialAid = (chosen: PdeSolution[]) => {
  const packs = new Map<string, number>();
  for (const s of chosen) {
    const key = s.pack ?? s.id;
    packs.set(key, Math.max(packs.get(key) ?? 0, s.max));
  }
  return [...packs.values()].reduce((a, b) => a + b, 0);
};

export const PdeForm = ({ solutions }: { solutions: PdeSolution[] }) => {
  const empty = { name: "", company: "", email: "", phone: "", company_url: "" };
  const [values, setValues] = useState(empty);
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const doneRef = useRef<HTMLDivElement>(null);
  // En enviar, el missatge de confirmació queda al mateix lloc de la pantalla
  useEffect(() => {
    if (status === "sent") doneRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [status]);

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const toggle = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const chosen = solutions.filter((s) => selected.includes(s.id));
  const total = potentialAid(chosen);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const result = await sendContact({
        name: values.name,
        company: values.company,
        email: values.email,
        phone: values.phone,
        company_url: values.company_url,
        services: chosen.length
          ? chosen.map((s) => `${s.name} (fins a ${formatEuros(s.max)})`)
          : ["Encara no ho sap: vol assessorament"],
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
      <div ref={doneRef} role="status" className="rounded-3xl bg-white p-8 text-black shadow-2xl md:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f5bff] text-white">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
            <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-6 text-3xl font-light tracking-tight">Ja ets a la llista d&apos;espera!</h2>
        <p className="mt-3 text-black/65">
          Et trucarem per resoldre dubtes i preparar-te el pressupost, perquè el presentem el primer dia del pas 3.
        </p>
        <a
          href="https://andorra-digital.com/pde/questionari-maduresa-digital"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-[#eef3ff] p-4 text-[15px] leading-snug"
        >
          <span>
            <strong className="text-[#2f5bff]">Mentrestant, fes el pas 1:</strong> el qüestionari de maduresa digital del Govern.
          </span>
          <span className="shrink-0 rounded-full bg-[#2f5bff] px-4 py-2 text-sm font-semibold text-white">Fer-lo ↗</span>
        </a>
        <p className="mt-5 text-sm text-black/60">
          Si és urgent, truca&apos;ns al{" "}
          <a href="tel:+376670222" className="font-medium text-black underline underline-offset-4">+376 670 222</a>.
        </p>
        {chosen.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {chosen.map((s) => (
              <li key={s.id} className="rounded-full border border-black/15 px-3 py-1 text-sm">{s.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 text-black shadow-2xl md:p-8">
      <p className="text-2xl font-light tracking-tight">Reserva el teu lloc</p>
      <p className="mt-1 text-sm text-black/55">Gratis i sense compromís. Et truquem nosaltres.</p>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">Què t&apos;interessa? <span className="font-normal text-black/40">· opcional</span></legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {solutions.map((s) => {
            const on = selected.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(s.id)}
                className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
                  on ? "border-[#2f5bff] bg-[#2f5bff] text-white" : "border-black/15 hover:border-black/40"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="mt-3 min-h-5 text-sm text-black/55">
          {total > 0 && (
            <>Ajut potencial: fins a <strong className="text-base font-semibold text-[#2f5bff]">{formatEuros(total)}</strong></>
          )}
        </p>
      </fieldset>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Input id="pde-name" label="Nom" autoComplete="name" required value={values.name} onChange={set("name")} />
        <Input id="pde-phone" label="Telèfon" type="tel" inputMode="tel" autoComplete="tel" required value={values.phone} onChange={set("phone")} />
        <Input id="pde-email" label="Correu electrònic" type="email" inputMode="email" autoComplete="email" required value={values.email} onChange={set("email")} />
        <Input id="pde-company" label="Empresa" autoComplete="organization" value={values.company} onChange={set("company")} />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="hp-zx-pde">Deixa-ho buit</label>
        <input id="hp-zx-pde" name="hp-zx-pde" type="text" tabIndex={-1} autoComplete="new-password" data-lpignore="true" data-1p-ignore value={values.company_url} onChange={set("company_url")} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-5 inline-flex h-14 w-full items-center justify-between rounded-full bg-[#2f5bff] pl-7 pr-2 text-[15px] font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {status === "sending" ? "Enviant…" : "Apunta'm a la llista d'espera"}
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2f5bff] transition-transform group-hover:translate-x-0.5">→</span>
      </button>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          No s&apos;ha pogut enviar. Truca&apos;ns al <a href="tel:+376670222" className="underline">+376 670 222</a> o escriu a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
        </p>
      )}
      <p className="mt-4 text-xs leading-relaxed text-black/45">
        En enviar acceptes la{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-black">política de privacitat</Link>.
      </p>
    </form>
  );
};
