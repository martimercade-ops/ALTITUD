import { apiFetch } from "@/lib/api-client";

export interface ContactPayload {
  name: string;
  surname?: string;
  company?: string;
  subject?: string;
  email: string;
  phone?: string;
  website?: string;
  services?: string[];
  budget?: string;
  message?: string;
  newsletter?: boolean;
  source?: string;
  company_url?: string;
}

export const CONTACT_EMAIL = "info@altitudigital.com";
/** Agenda de Google per reservar reunions amb en Martí */
export const BOOKING_URL = "https://calendar.app.google/qQwTx3KyvEzpvTT3A";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mailtoBody = (p: ContactPayload) =>
  [
    `Nom: ${[p.name, p.surname].filter(Boolean).join(" ")}`,
    p.company && `Empresa: ${p.company}`,
    `Correu: ${p.email}`,
    p.phone && `Telèfon: ${p.phone}`,
    p.website && `Web: ${p.website}`,
    p.services?.length && `Serveis d'interès:\n- ${p.services.join("\n- ")}`,
    p.budget && `Inversió mensual: ${p.budget}`,
    p.message && `\n${p.message}`,
  ]
    .filter(Boolean)
    .join("\n");

/**
 * Envia el formulari al servidor. Només retorna "sent" si el servidor
 * ha registrat i enviat la sol·licitud; si no, llança un error.
 */
export async function sendContact(
  payload: ContactPayload,
): Promise<"sent" | "mailto"> {
  await apiFetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return "sent";
}
