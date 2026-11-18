import { ApiClientError, apiFetch } from "@/lib/api-client";

export interface ContactPayload {
  name: string;
  surname?: string;
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

const mailtoBody = (p: ContactPayload) =>
  [
    `Nom: ${[p.name, p.surname].filter(Boolean).join(" ")}`,
    `Correu: ${p.email}`,
    p.phone && `Telèfon: ${p.phone}`,
    p.website && `Web: ${p.website}`,
    p.services?.length && `Serveis d'interès: ${p.services.join(", ")}`,
    p.budget && `Inversió mensual: ${p.budget}`,
    p.message && `\n${p.message}`,
  ]
    .filter(Boolean)
    .join("\n");

/**
 * Envia el formulari al servidor. Si el correu encara no està configurat
 * al servidor, obre el client de correu del visitant amb el missatge preparat.
 */
export async function sendContact(
  payload: ContactPayload,
): Promise<"sent" | "mailto"> {
  try {
    await apiFetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return "sent";
  } catch (error) {
    if (error instanceof ApiClientError && error.code === "not_configured") {
      const subject = `Demanda de pressupost — ${payload.name}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody(payload))}`;
      return "mailto";
    }
    throw error;
  }
}
