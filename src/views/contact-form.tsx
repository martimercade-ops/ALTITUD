"use client";

import { useState, type FormEvent } from "react";
import { AnimatedHeading } from "@/components/common/animated-heading";
import type { ContactContent } from "@/data/mocks/contact";
import { CONTACT_EMAIL, sendContact } from "@/lib/send-contact";

export interface ContactFormProps {
  content: ContactContent;
}

export const ContactForm = ({ content }: ContactFormProps) => {
  const { labelId, heading, fields, cta } = content;
  const [values, setValues] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");

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
      filled ? "bg-black" : "bg-black/25"
    }`;

  const fieldWrap =
    "relative border-b border-black/25 pb-3 focus-within:border-black";
  const input =
    "w-full bg-transparent pr-6 text-lg text-black outline-none placeholder:uppercase placeholder:tracking-wide placeholder:text-black/40";

  return (
    <section
      id="contact"
      aria-labelledby={labelId}
      className="sticky top-0 z-10 flex flex-col bg-hero-page px-6 pb-24 pt-10 md:px-12 md:pt-14 lg:px-page-gutter"
    >
      <AnimatedHeading
        as="h2"
        id={labelId}
        className="mx-auto mb-16 max-w-2xl text-center text-2xl leading-snug tracking-tight text-black"
      >
        {heading}
      </AnimatedHeading>

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

        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full disabled:opacity-60 bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90"
          >
            {cta}
          </button>
          <p
            role="status"
            aria-live="polite"
            className="min-h-5 text-sm text-black/60"
          >
            {statusText}
          </p>
        </div>
      </form>
    </section>
  );
};
