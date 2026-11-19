"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { ContactContent } from "@/data/mocks/contact";
import { CONTACT_EMAIL, sendContact } from "@/lib/send-contact";

export interface ContactFormProps {
  content: ContactContent;
}

export const ContactForm = ({ content }: ContactFormProps) => {
  const { labelId, heading, fields, cta } = content;
  const [values, setValues] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  // Entrada en veure la secció, profunditat amb l'scroll i llum que segueix el cursor
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => io.disconnect();
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const ask = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
      el.style.setProperty("--mx", ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
    };
    window.addEventListener("scroll", ask, { passive: true });
    el.addEventListener("pointermove", move);
    paint();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", ask);
      el.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const result = await sendContact({
        name: values.name,
        email: values.email,
        phone: values.phone,
        source: "Portada",
      });
      setStatus(result);
      if (result === "sent") setValues({ name: "", phone: "", email: "" });
    } catch {
      setStatus("error");
    }
  };

  const statusText = {
    idle: "",
    sending: "Enviant…",
    sent: "Gràcies! Hem rebut el teu missatge i et contactarem aviat. Si és urgent, truca'ns al +376 670 222.",
    mailto: "Hem obert el teu correu amb el missatge preparat.",
    error: `No s'ha pogut enviar. Escriu-nos a ${CONTACT_EMAIL}.`,
  }[status];

  const dot = (filled: boolean) =>
    `pointer-events-none absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${
      filled ? "scale-100 bg-[#2f5bff] shadow-[0_0_0_4px_rgb(47_91_255/0.15)]" : "scale-75 bg-black/15"
    }`;

  const fieldWrap =
    "isard-camp relative border-b border-black/15 pb-3 transition-colors focus-within:border-black/30";
  const input =
    "w-full bg-transparent pr-6 text-lg text-black outline-none transition-[padding] duration-300 placeholder:uppercase placeholder:tracking-[0.12em] placeholder:text-black/35 focus:pl-1";

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby={labelId}
      className={`isard isard--clar ${on ? "isard--on" : ""} sticky top-0 z-10 isolate overflow-hidden bg-hero-page text-black`}
    >
      <span aria-hidden="true" className="clar-halo" />
      <span aria-hidden="true" className="clar-llum" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-28 pt-24 md:px-12 md:pt-32">
        <div className="text-center">
          <p className="isard-entra mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-muted-small">
            <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-[0.15em] rounded-full bg-plum align-middle" />
            Parlem
          </p>
          <h2 id={labelId} aria-label={heading} className="mx-auto max-w-3xl text-[2rem] font-light leading-[1.1] tracking-tight sm:text-[2.6rem] lg:text-[3.1rem]">
            {heading.split(" ").map((w, i) => (
              <span key={i} aria-hidden="true" className="isard-paraula inline-block" style={{ ["--d" as string]: `${120 + i * 55}ms` }}>
                {w}
                {"\u00a0"}
              </span>
            ))}
          </h2>
        </div>
          <div className="isard-entra mt-14" style={{ animationDelay: "700ms" }}>
      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div className={fieldWrap}>
            <label htmlFor="cf-name" className="sr-only">
              {fields.name}
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder={fields.name}
              value={values.name}
              onChange={set("name")}
              className={input}
            />
            <span aria-hidden="true" className={dot(values.name.length > 0)} />
          </div>

          <div className={fieldWrap}>
            <label htmlFor="cf-phone" className="sr-only">
              {fields.phone}
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={fields.phone}
              value={values.phone}
              onChange={set("phone")}
              className={input}
            />
            <span aria-hidden="true" className={dot(values.phone.length > 0)} />
          </div>
        </div>

        <div className={fieldWrap}>
          <label htmlFor="cf-email" className="sr-only">
            {fields.email}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={fields.email}
            value={values.email}
            onChange={set("email")}
            className={input}
          />
          <span aria-hidden="true" className={dot(values.email.length > 0)} />
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="boto-brilla group relative inline-flex h-14 items-center gap-4 overflow-hidden rounded-full bg-black pl-7 pr-2 text-[15px] font-medium text-white shadow-[0_14px_40px_-14px_rgb(11_20_36/0.6)] transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {cta}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-lime text-black transition-transform group-hover:translate-x-0.5">→</span>
          </button>
          <p
            role="status"
            aria-live="polite"
            className="min-h-5 text-center text-sm text-black/60"
          >
            {statusText}
          </p>
        </div>
      </form>
          </div>
      </div>
    </section>
  );
};
