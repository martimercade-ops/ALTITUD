"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, sendContact } from "@/lib/send-contact";

export interface ParlemFormProps {
  services: { slug: string; label: string }[];
  /** Serveis que es mostren d'entrada (buit = tots) */
  topSlugs: string[];
  unsureLabel: string;
}

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const BUDGETS = ["Encara no invertim", "< 500 €/mes", "500 – 1.000 €", "1.000 – 3.000 €", "+3.000 €/mes"];
const REFERRALS = ["Boca-orella", "Google", "Instagram", "Anuncis", "Ja som clients", "Altres"];

const STEPS = [
  { title: "En què t'ajudem?", hint: "Tria tot el que t'interessi." },
  { title: "Com et contactem?", hint: "Et responem en menys de 24 h." },
  { title: "Gairebé hi som", hint: "Tot opcional. Ens ajuda a preparar-te una proposta millor." },
] as const;

const field =
  "peer h-14 w-full rounded-2xl border border-white/15 bg-white/[0.05] px-4 pt-4 text-[1rem] text-white outline-none transition-all duration-300 placeholder:text-transparent hover:border-white/30 focus:border-accent-lime focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgb(182_241_58/0.12)] [&:user-invalid]:border-red-400/70";
const floating =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1rem] text-white/50 transition-all duration-200 peer-focus:top-3.5 peer-focus:text-[0.7rem] peer-focus:text-accent-lime peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[0.7rem]";

const Input = ({
  id,
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) => (
  <div className="relative">
    <input id={id} name={id} placeholder={label} className={field} {...props} />
    <label htmlFor={id} className={floating}>
      {label}
    </label>
  </div>
);

const Chip = ({ on, onClick, children, big }: { on: boolean; onClick: () => void; children: React.ReactNode; big?: boolean }) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className={`chip-salta inline-flex items-center gap-2 rounded-full border transition-all duration-200 active:scale-95 ${
      big ? "px-4 py-2.5 text-[15px]" : "px-3.5 py-2 text-sm"
    } ${
      on
        ? "border-accent-lime bg-accent-lime text-black shadow-[0_6px_20px_-6px_rgb(182_241_58/0.6)]"
        : "border-white/20 text-white/85 hover:-translate-y-0.5 hover:border-white/55 hover:text-white"
    }`}
  >
    {on && (
      <span aria-hidden="true" className="chip-check grid h-4 w-4 place-items-center rounded-full bg-black text-accent-lime">
        <svg viewBox="0 0 20 20" className="h-2.5 w-2.5">
          <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )}
    {children}
  </button>
);

export const ParlemForm = ({ services, topSlugs, unsureLabel }: ParlemFormProps) => {
  const empty = { name: "", company: "", email: "", phone: "", message: "", company_url: "" };
  const [values, setValues] = useState(empty);
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [referral, setReferral] = useState("");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [status, setStatus] = useState<Status>("idle");
  const stepRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent") doneRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [status]);

  // Preselecciona el servei si venim d'una pàgina de servei (?servei=slug)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const match = services.find((s) => s.slug === params.get("servei"));
    if (match) setSelected([match.label]);
    if (params.get("cafe") === "virtual") {
      setValues((v) => ({ ...v, message: v.message || "M'agradaria fer un cafè virtual (videotrucada de 20 minuts)." }));
    }
  }, [services]);

  // En canviar de pas, el primer camp agafa el focus (sense moure la pàgina)
  useEffect(() => {
    if (step === 1) stepRef.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
  }, [step]);

  const chips = useMemo(
    () => [...services.filter((s) => !topSlugs.length || topSlugs.includes(s.slug)).map((s) => s.label), unsureLabel],
    [services, topSlugs, unsureLabel],
  );

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const toggle = (label: string) =>
    setSelected((cur) => (cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label]));

  const go = (to: number) => {
    if (to > step && step === 1) {
      const inputs = [...(stepRef.current?.querySelectorAll<HTMLInputElement>("input[required]") ?? [])];
      const bad = inputs.find((i) => !i.checkValidity());
      if (bad) {
        bad.reportValidity();
        return;
      }
    }
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 2) return go(step + 1);
    if (status === "sending") return;
    setStatus("sending");
    try {
      const result = await sendContact({
        ...values,
        services: selected,
        budget,
        referral,
        source: "Pàgina Parlem",
        subject: `Nova sol·licitud de ${values.name}${values.company ? ` (${values.company})` : ""}`,
      });
      setStatus(result);
    } catch {
      setStatus("error");
    }
  };

  // Enter avança de pas (excepte dins del missatge)
  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !(e.target instanceof HTMLTextAreaElement) && step < 2) {
      e.preventDefault();
      go(step + 1);
    }
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div ref={doneRef} role="status" className="form-aura flex min-h-[30rem] flex-col items-start justify-center p-8 md:p-12">
        <span className="exit-pop flex h-14 w-14 items-center justify-center rounded-full bg-accent-lime text-black">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-6 w-6">
            <path className="exit-traç" d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-8 text-3xl font-light tracking-tight md:text-4xl">
          Gràcies{values.name ? `, ${values.name.split(" ")[0]}` : ""}! Missatge rebut.
        </h2>
        <p className="mt-4 max-w-md text-white/70">Et contactarem en menys de 24 hores amb una primera proposta.</p>
        <p className="mt-6 text-sm text-white/60">
          Si és urgent, truca&apos;ns al{" "}
          <a href="tel:+376670222" className="font-medium text-white underline underline-offset-4">+376 670 222</a>.
        </p>
        <Link href="/" className="mt-10 inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-sm text-white/90 hover:border-white/60">
          Tornar a l&apos;inici
        </Link>
      </div>
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form onSubmit={onSubmit} onKeyDown={onKeyDown} className="form-aura flex min-h-[30rem] flex-col p-6 md:p-10 lg:min-h-[41rem]">
      {/* Progrés */}
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-white/45">
        <span>
          Pas <span className="text-accent-lime">{step + 1}</span> de {STEPS.length}
        </span>
        <span>{step === 2 ? "Últim pas" : step === 1 ? "Quasi" : "1 minut"}</span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-[#2f5bff] to-accent-lime transition-[width] duration-700 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div ref={stepRef} key={step} className={`pas-entra flex flex-1 flex-col pt-7 ${dir === 1 ? "" : "pas-entra--enrere"}`}>
        <p className="text-[1.75rem] font-light leading-tight tracking-tight md:text-[2.1rem]">{STEPS[step].title}</p>
        <p className="mt-1.5 text-sm text-white/55">{STEPS[step].hint}</p>

        {step === 0 && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {chips.map((label, i) => (
              <span key={label} className="contents" style={{ ["--i" as string]: i }}>
                <Chip on={selected.includes(label)} onClick={() => toggle(label)}>
                  {label}
                </Chip>
              </span>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Input id="name" label="Nom" autoComplete="name" required value={values.name} onChange={set("name")} />
            <Input id="company" label="Empresa" autoComplete="organization" required value={values.company} onChange={set("company")} />
            <Input id="email" label="Correu electrònic" type="email" inputMode="email" autoComplete="email" required value={values.email} onChange={set("email")} />
            <Input id="phone" label="Telèfon" type="tel" inputMode="tel" autoComplete="tel" required value={values.phone} onChange={set("phone")} />
          </div>
        )}

        {step === 2 && (
          <div className="mt-5 flex flex-col gap-5">
            <div>
              <p className="mb-2 text-[13px] text-white/60">Quant inverteixes ara en màrqueting?</p>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <Chip key={b} on={budget === b} onClick={() => setBudget(budget === b ? "" : b)}>{b}</Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[13px] text-white/60">Com ens has conegut?</p>
              <div className="flex flex-wrap gap-2">
                {REFERRALS.map((r) => (
                  <Chip key={r} on={referral === r} onClick={() => setReferral(referral === r ? "" : r)}>{r}</Chip>
                ))}
              </div>
            </div>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={2}
                placeholder="Alguna cosa més?"
                value={values.message}
                onChange={set("message")}
                className="peer w-full resize-none rounded-2xl border border-white/15 bg-white/[0.05] px-4 pb-3 pt-7 text-[1rem] text-white outline-none transition-all duration-300 placeholder:text-transparent hover:border-white/30 focus:border-accent-lime focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgb(182_241_58/0.12)]"
              />
              <label
                htmlFor="message"
                className="pointer-events-none absolute left-4 top-5 text-[1rem] text-white/50 transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[0.7rem] peer-focus:text-accent-lime peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[0.7rem]"
              >
                Alguna cosa més? Explica&apos;ns el projecte
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Camp trampa contra robots: invisible per a les persones */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="hp-zx">Deixa-ho buit</label>
        <input id="hp-zx" name="hp-zx" type="text" tabIndex={-1} autoComplete="new-password" data-lpignore="true" data-1p-ignore value={values.company_url} onChange={set("company_url")} />
      </div>

      <div className="mt-7 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => go(step - 1)}
            aria-label="Pas anterior"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/60 hover:text-white"
          >
            ←
          </button>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="boto-brilla group relative inline-flex h-14 flex-1 items-center justify-between overflow-hidden rounded-full bg-accent-lime pl-7 pr-2 text-[15px] font-semibold text-black transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {status === "sending"
            ? "Enviant…"
            : step === 0
              ? selected.length
                ? `Continuar · ${selected.length} ${selected.length === 1 ? "servei" : "serveis"}`
                : "Continuar"
              : step === 1
                ? "Continuar"
                : "Enviar i rebre proposta"}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-accent-lime transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          No s&apos;ha pogut enviar. Truca&apos;ns al <a href="tel:+376670222" className="underline">+376 670 222</a> o escriu a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
        </p>
      )}
      <p className="mt-4 text-xs text-white/40">
        Sense compromís · En enviar acceptes la{" "}
        <Link href="/privacy-policy" className="text-white/70 underline underline-offset-2 hover:text-white">política de privacitat</Link>.
      </p>
    </form>
  );
};
