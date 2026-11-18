import nodemailer from "nodemailer";
import { z } from "zod";

import { getServerEnv } from "@/env";
import { ApiError, handle } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  surname: z.string().trim().max(100).optional().default(""),
  company: z.string().trim().max(150).optional().default(""),
  subject: z.string().trim().max(200).optional().default(""),
  email: z.email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  website: z.string().trim().max(200).optional().default(""),
  services: z.array(z.string().max(80)).max(20).optional().default([]),
  budget: z.string().max(80).optional().default(""),
  message: z.string().trim().max(3000).optional().default(""),
  newsletter: z.boolean().optional().default(false),
  source: z.string().max(80).optional().default(""),
  /** Camp trampa: les persones no l'omplen, els robots sí. */
  company_url: z.string().max(0).optional(),
});

type Contact = z.infer<typeof contactSchema>;

const row = (label: string, value: string) =>
  value ? `${label}: ${value}` : null;

const toText = (c: Contact) =>
  [
    row("Nom", `${c.name} ${c.surname}`.trim()),
    row("Empresa", c.company),
    row("Correu", c.email),
    row("Telèfon", c.phone),
    row("Web", c.website),
    c.services.length ? `Serveis d'interès:\n- ${c.services.join("\n- ")}` : null,
    row("Inversió mensual", c.budget),
    row("Newsletter", c.newsletter ? "Sí" : ""),
    row("Formulari", c.source),
    c.message ? `\nMissatge:\n${c.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

export const POST = handle(async (req) => {
  const input = contactSchema.parse(await req.json());
  const env = getServerEnv();
  const text = toText(input);

  if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
    const port = env.SMTP_PORT ?? 465;
    const transport = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
    try {
      await transport.sendMail({
        from: `"Web Altitud Digital" <${env.SMTP_USER}>`,
        to: env.CONTACT_TO ?? "info@altitudigital.com",
        replyTo: input.email,
        subject: input.subject || `Nova sol·licitud de ${input.name} ${input.surname}`.trim(),
        text,
        html: `<pre style="font-family:inherit;font-size:14px;line-height:1.6">${escape(text)}</pre>`,
      });
    } catch (error) {
      console.error("[api/contact] smtp error:", error);
      throw new ApiError(502, "send_failed", "No s'ha pogut enviar el missatge.");
    }
    return { sent: true };
  }

  if (env.CONTACT_ENDPOINT) {
    const upstream = await fetch(env.CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...input, text }),
    });
    if (!upstream.ok) {
      throw new ApiError(502, "upstream_error", "No s'ha pogut enviar el missatge.");
    }
    return { sent: true };
  }

  throw new ApiError(503, "not_configured", "L'enviament de correu no està configurat.");
});
