"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, sendContact } from "@/lib/send-contact";

export interface ParlemFormProps {
  services: { slug: string; label: string }[];
  /** Serveis que es mostren d'entrada (la resta, només si venen preseleccionats) */
  topSlugs: string[];
  unsureLabel: string;
}

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const BUDGETS = ["Encara no invertim", "Menys de 500 €/mes", "500 – 1.000 €/mes", "1.000 – 3.000 €/mes", "Més de 3.000 €/mes"];
const REFERRALS = ["Boca-orella / recomanació", "Google", "Instagram / xarxes socials", "Anuncis (Meta o Google Ads)", "Ja som clients", "Altres"];

const selectCls =
  "h-12 w-full appearance-none rounded-xl border border-white/15 bg-white/[0.05] px-4 pr-10 text-[0.9rem] text-white outline-none transition-all duration-300 hover:border-white/30 focus:border-accent-lime";

const Select = ({ id, label, options, value, onChange }: { id: string; label: string; options: string[]; value: string; onChange: (e: { target: { value: string } }) => void }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-[13px] text-white/60">
      {label}
    </label>
    <div className="relative">
      <select id={id} name={id} value={value} onChange={onChange} className={selectCls}>
        <option value="" className="bg-[#0b1424]">Opcional</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0b1424]">{o}</option>
        ))}
      </select>
      <svg aria-hidden="true" viewBox="0 0 10 6" className="pointer-events-none absolute right-4 top-1/2 h-1.5 w-2.5 -translate-y-1/2 text-white/60">
        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>
);

const field =
  "peer h-14 w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 pt-4 text-[0.95rem] text-white outline-none transition-all duration-300 placeholder:text-transparent hover:border-white/30 focus:border-accent-lime focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgb(182_241_58/0.12)]";
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

export const ParlemForm = ({ services, topSlugs, unsureLabel }: ParlemFormProps) => {
  const empty = { name: "", company: "", email: "", phone: "", message: "", budget: "", referral: "", company_url: "" };
  const [values, setValues] = useState(empty);
  const [selected, setSelected] = useState<string[]>([]);
  const [extra, setExtra] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const doneRef = useRef<HTMLDivElement>(null);
  // En enviar, el missatge de confirmació queda al mateix lloc de la pantalla
  useEffect(() => {
    if (status === "sent") doneRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [status]);

  // Preselecciona el servei si venim d'una pàgina de servei (?servei=slug)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const match = services.find((s) => s.slug === params.get("servei"));
    if (match) {
      setSelected([match.label]);
      if (!topSlugs.includes(match.slug)) setExtra(match.slug);
    }
    if (params.get("cafe") === "virtual") {
      setValues((v) => ({
        ...v,
        message: v.message || "M'agradaria fer un cafè virtual (videotrucada de 20 minuts) per explicar-vos el meu projecte.",
      }));
    }
  }, [services, topSlugs]);

  const chips = useMemo(
    () => [
      ...services.filter((s) => !topSlugs.length || topSlugs.includes(s.slug) || s.slug === extra).map((s) => s.label),
      unsureLabel,
    ],
    [services, topSlugs, extra, unsureLabel],
  );

  const set =
    (key: keyof typeof empty) =>
    (e: { target: { value: string } }) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const toggle = (label: string) =>
    setSelected((cur) => (cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label]));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const result = await sendContact({
        ...values,
        services: selected,
        source: "Pàgina Parlem",
        subject: `Nova sol·licitud de ${values.name}${values.company ? ` (${values.company})` : ""}`,
      });
      setStatus(result);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div ref={doneRef} role="status" className="form-aura flex min-h-[28rem] flex-col items-start justify-center p-8 md:p-12">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-lime text-black">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
            <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-8 text-3xl font-light tracking-tight md:text-4xl">Missatge rebut!</h2>
        <p className="mt-4 max-w-md text-white/70">
          Gràcies per confiar en nosaltres. Et contactarem en menys de 24 hores amb una primera proposta.
        </p>
        <p className="mt-6 text-sm text-white/60">
          Si és urgent, truca&apos;ns al{" "}
          <a href="tel:+376670222" className="font-medium text-white underline underline-offset-4">+376 670 222</a>.
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
    <form onSubmit={onSubmit} className="form-aura flex flex-col gap-3 p-7 md:p-10">
      <div className="form-entra" style={{ animationDelay: "0ms" }}>
        <p className="text-[1.65rem] font-light leading-tight tracking-tight md:text-3xl">
          Explica&apos;ns què necessites.
        </p>
      </div>

      <div className="form-entra mt-4 grid gap-3 sm:grid-cols-2" style={{ animationDelay: "90ms" }}>
        <Input id="name" label="Nom" autoComplete="name" required value={values.name} onChange={set("name")} />
        <Input id="company" label="Empresa" autoComplete="organization" required value={values.company} onChange={set("company")} />
        <Input id="email" label="Correu electrònic" type="email" inputMode="email" autoComplete="email" required value={values.email} onChange={set("email")} />
        <Input id="phone" label="Telèfon" type="tel" inputMode="tel" autoComplete="tel" required value={values.phone} onChange={set("phone")} />
      </div>

      {/* Camp trampa contra robots: invisible per a les persones */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="hp-zx">Deixa-ho buit</label>
        <input id="hp-zx" name="hp-zx" type="text" tabIndex={-1} autoComplete="new-password" data-lpignore="true" data-1p-ignore value={values.company_url} onChange={set("company_url")} />
      </div>

      <fieldset className="form-entra mt-3" style={{ animationDelay: "180ms" }}>
        <legend className="mb-2.5 text-sm text-white/70">Quins serveis t&apos;interessen? <span className="text-white/35">· pots triar-ne més d&apos;un</span></legend>
        <div className="flex flex-wrap gap-2">
          {chips.map((label) => {
            const on = selected.includes(label);
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(label)}
                className={`rounded-full border px-3 py-1.5 text-[13px] transition-all duration-200 ${
                  on
                    ? "border-accent-lime bg-accent-lime text-black"
                    : "border-white/20 text-white/80 hover:border-white/55 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="form-entra relative mt-3" style={{ animationDelay: "240ms" }}>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Explica'ns el teu projecte"
          value={values.message}
          onChange={set("message")}
          className="peer w-full resize-none rounded-xl border border-white/15 bg-white/[0.05] px-4 pb-3 pt-7 text-[0.95rem] text-white outline-none transition-all duration-300 placeholder:text-transparent hover:border-white/30 focus:border-accent-lime focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgb(182_241_58/0.12)]"
        />
        <label
          htmlFor="message"
          className="pointer-events-none absolute left-4 top-5 text-[0.95rem] text-white/50 transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[0.7rem] peer-focus:text-accent-lime peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[0.7rem]"
        >
          Explica&apos;ns el teu projecte <span className="text-white/30">· opcional</span>
        </label>
      </div>

      <div className="form-entra mt-3 grid gap-3 sm:grid-cols-2" style={{ animationDelay: "270ms" }}>
        <Select id="budget" label="Inversió en màrqueting" options={BUDGETS} value={values.budget} onChange={set("budget")} />
        <Select id="referral" label="Com ens has conegut?" options={REFERRALS} value={values.referral} onChange={set("referral")} />
      </div>

      <div className="form-entra mt-3" style={{ animationDelay: "300ms" }}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="boto-brilla group relative inline-flex h-14 w-full items-center justify-between overflow-hidden rounded-full bg-accent-lime pl-7 pr-2 text-[15px] font-semibold text-black transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {status === "sending" ? "Enviant…" : "Vull la meva proposta"}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-accent-lime transition-transform group-hover:translate-x-0.5">→</span>
        </button>
        {status === "error" && (
          <p role="alert" className="mt-3 text-sm text-red-300">
            No s&apos;ha pogut enviar. Truca&apos;ns al <a href="tel:+376670222" className="underline">+376 670 222</a> o escriu a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
          </p>
        )}
        <p className="mt-4 text-xs text-white/45">
          <span>
            En enviar acceptes la{" "}
            <Link href="/privacy-policy" className="text-white/75 underline underline-offset-2 hover:text-white">política de privacitat</Link>.
          </span>
        </p>
      </div>
    </form>
  );
};
