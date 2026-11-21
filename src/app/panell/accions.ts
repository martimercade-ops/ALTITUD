"use server";

import { timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { RowDataPacket } from "mysql2/promise";
import { getServerEnv } from "@/env";
import { consulta, executa } from "@/lib/panell/db";
import {
  bloquejat,
  creaSessio,
  hashContrasenya,
  hiHaUsuari,
  ipClient,
  registraIntentFallit,
  requereixSessio,
  tancaSessio,
  verificaContrasenya,
  verificaTotp,
} from "@/lib/panell/seguretat";
import { actualitzaLead, afegeixNota, aLaPaperera, creaLead, esborraLead, type DadesLead } from "@/lib/panell/leads";
import { llegeixCsv } from "@/lib/panell/csv";
import {
  actualitzaFase,
  actualitzaProjecte,
  afegeixFase,
  creaProjecte,
  esborraFase,
  esborraProjecte,
  notaProjecte,
  type DadesProjecte,
} from "@/lib/panell/projectes";
import { obtéLead } from "@/lib/panell/leads";
import { createHash, randomBytes } from "node:crypto";
import nodemailer from "nodemailer";

export type Estat = { error?: string; ok?: string };

const espera = (ms: number) => new Promise((r) => setTimeout(r, ms));
const txt = (f: FormData, k: string, max = 500) => String(f.get(k) ?? "").trim().slice(0, max);
const igual = (a: string, b: string) => {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
};

/* ── Entrar / sortir ───────────────────────────────────────────────── */
export async function entrar(_: Estat, f: FormData): Promise<Estat> {
  const ip = await ipClient();
  if (await bloquejat(ip)) {
    return { error: "Massa intents fallits. Torna-ho a provar d'aquí a 15 minuts." };
  }
  const usuari = txt(f, "usuari", 80);
  const contrasenya = String(f.get("contrasenya") ?? "").slice(0, 200);
  const codi = txt(f, "codi", 10);

  type U = RowDataPacket & { id: number; hash: string; totp_secret: string; totp_ultim: number };
  const [u] = await consulta<U>("SELECT id, hash, totp_secret, totp_ultim FROM panell_usuari WHERE usuari = ?", [usuari]);
  const pwOk = u ? await verificaContrasenya(contrasenya, u.hash) : await verificaContrasenya(contrasenya, "scrypt$32768$AAAA$AAAA").catch(() => false);
  const comptador = u && pwOk ? verificaTotp(u.totp_secret, codi, Number(u.totp_ultim)) : null;

  if (!u || !pwOk || comptador === null) {
    await registraIntentFallit(ip);
    await espera(600);
    return { error: "Usuari, contrasenya o codi incorrectes." };
  }
  await executa("UPDATE panell_usuari SET totp_ultim = ? WHERE id = ?", [comptador, u.id]);
  await creaSessio(u.id, ip);
  redirect("/panell");
}

export async function sortir() {
  await tancaSessio();
  redirect("/panell/entrar");
}

/* ── Primera configuració ──────────────────────────────────────────── */
export async function configura(_: Estat, f: FormData): Promise<Estat> {
  const ip = await ipClient();
  if (await bloquejat(ip)) return { error: "Massa intents. Torna-ho a provar d'aquí a 15 minuts." };
  const token = getServerEnv().PANELL_SETUP_TOKEN;
  if (!token || token.length < 24 || (await hiHaUsuari())) return { error: "La configuració no està disponible." };

  if (!igual(txt(f, "token", 200), token)) {
    await registraIntentFallit(ip);
    await espera(600);
    return { error: "El codi de configuració no és correcte." };
  }
  const usuari = txt(f, "usuari", 80);
  const pw = String(f.get("contrasenya") ?? "");
  const pw2 = String(f.get("contrasenya2") ?? "");
  const secret = txt(f, "secret", 64);
  if (!/^[a-zA-Z0-9._-]{3,40}$/.test(usuari)) return { error: "L'usuari ha de tenir entre 3 i 40 lletres o números." };
  if (pw.length < 14) return { error: "La contrasenya ha de tenir com a mínim 14 caràcters." };
  if (pw !== pw2) return { error: "Les dues contrasenyes no coincideixen." };
  const comptador = verificaTotp(secret, txt(f, "codi", 10));
  if (comptador === null) return { error: "El codi del mòbil no és correcte. Comprova que l'hora del mòbil és automàtica." };

  await executa("INSERT INTO panell_usuari (usuari, hash, totp_secret, totp_ultim) VALUES (?, ?, ?, ?)", [
    usuari,
    await hashContrasenya(pw),
    secret,
    comptador,
  ]);
  type U = RowDataPacket & { id: number };
  const [u] = await consulta<U>("SELECT id FROM panell_usuari WHERE usuari = ?", [usuari]);
  await creaSessio(u.id, ip);
  redirect("/panell");
}

/* ── Leads ─────────────────────────────────────────────────────────── */
const dadesDe = (f: FormData): DadesLead => {
  const valor = txt(f, "valor", 20).replace(",", ".");
  const serveis = f.getAll("serveis").map(String).filter(Boolean).join(", ");
  return {
    tipus: txt(f, "tipus", 20) || "altres",
    empresa: txt(f, "empresa", 200),
    contacte: txt(f, "contacte", 200),
    email: txt(f, "email", 200),
    telefon: txt(f, "telefon", 60),
    web: txt(f, "web", 200),
    serveis: serveis.slice(0, 500),
    canal: txt(f, "canal", 100),
    estat: txt(f, "estat", 20) || "nou",
    valor: valor && !Number.isNaN(Number(valor)) ? Number(valor) : null,
    seguiment: /^\d{4}-\d{2}-\d{2}$/.test(txt(f, "seguiment", 10)) ? txt(f, "seguiment", 10) : null,
    missatge: txt(f, "missatge", 5000) || null,
  };
};

export async function nouLead(f: FormData) {
  await requereixSessio();
  const id = await creaLead({ ...dadesDe(f), origen: "Manual" });
  revalidatePath("/panell");
  redirect(`/panell/lead/${id}`);
}

export async function desaLead(id: number, f: FormData) {
  await requereixSessio();
  await actualitzaLead(id, dadesDe(f));
  revalidatePath("/panell");
  revalidatePath(`/panell/lead/${id}`);
}

export async function canviaEstat(id: number, estat: string) {
  await requereixSessio();
  await actualitzaLead(id, { estat });
  revalidatePath("/panell");
}

export async function nota(id: number, f: FormData) {
  await requereixSessio();
  const t = txt(f, "text", 5000);
  if (t) await afegeixNota(id, t);
  revalidatePath(`/panell/lead/${id}`);
}

export async function paperera(id: number, si: boolean) {
  await requereixSessio();
  await aLaPaperera(id, si);
  revalidatePath("/panell");
  revalidatePath(`/panell/lead/${id}`);
}

export async function enviaAPaperera(id: number) {
  await paperera(id, true);
  redirect("/panell");
}

export async function esborra(id: number) {
  await requereixSessio();
  await esborraLead(id);
  revalidatePath("/panell");
  redirect("/panell");
}

export async function importa(_: Estat, f: FormData): Promise<Estat> {
  await requereixSessio();
  const fitxer = f.get("fitxer");
  if (!(fitxer instanceof File) || fitxer.size === 0) return { error: "Tria un fitxer CSV." };
  if (fitxer.size > 2_000_000) return { error: "El fitxer és massa gran (màxim 2 MB)." };
  const files = llegeixCsv(await fitxer.text());
  let n = 0;
  for (const r of files) {
    if (!r.empresa && !r.email && !r.contacte) continue;
    await creaLead(r);
    n++;
  }
  revalidatePath("/panell");
  return { ok: `${n} leads importats.` };
}

/* ── Projectes ─────────────────────────────────────────────────────── */
const data = (f: FormData, k: string) => (/^\d{4}-\d{2}-\d{2}$/.test(txt(f, k, 10)) ? txt(f, k, 10) : null);
const diners = (f: FormData, k: string) => {
  const v = txt(f, k, 20).replace(",", ".");
  return v && !Number.isNaN(Number(v)) ? Number(v) : null;
};
const dadesProjecte = (f: FormData): DadesProjecte => ({
  client: txt(f, "client", 200),
  nom: txt(f, "nom", 200),
  descripcio: txt(f, "descripcio", 5000) || null,
  estat: txt(f, "estat", 20) || "actiu",
  responsable: txt(f, "responsable", 80),
  inici: data(f, "inici"),
  entrega: data(f, "entrega"),
  preu_client: diners(f, "preu_client"),
  cost_extern: diners(f, "cost_extern"),
  cost_pagat: f.get("cost_pagat") ? 1 : 0,
  cost_data_pagament: data(f, "cost_data_pagament"),
  web: txt(f, "web", 200),
});

export async function nouProjecte(f: FormData) {
  await requereixSessio();
  const id = await creaProjecte(dadesProjecte(f));
  revalidatePath("/panell/projectes");
  redirect(`/panell/projectes/${id}`);
}

export async function projecteDesDeLead(leadId: number) {
  await requereixSessio();
  const l = await obtéLead(leadId);
  if (!l) redirect("/panell");
  const id = await creaProjecte({
    client: l.empresa || l.contacte,
    nom: l.serveis ? `${l.serveis}` : "Projecte nou",
    descripcio: l.missatge,
    preu_client: l.valor,
    web: l.web,
    lead_id: l.id,
  });
  revalidatePath("/panell/projectes");
  redirect(`/panell/projectes/${id}`);
}

export async function desaProjecte(id: number, f: FormData) {
  const s = await requereixSessio();
  await actualitzaProjecte(id, dadesProjecte(f));
  void s;
  revalidatePath("/panell/projectes");
  revalidatePath(`/panell/projectes/${id}`);
}

export async function esborraProj(id: number) {
  await requereixSessio();
  await esborraProjecte(id);
  revalidatePath("/panell/projectes");
  redirect("/panell/projectes");
}

export async function novaFase(id: number, f: FormData) {
  await requereixSessio();
  const nom = txt(f, "nom", 200);
  if (nom) await afegeixFase(id, nom, data(f, "data_limit"));
  revalidatePath(`/panell/projectes/${id}`);
  revalidatePath("/panell/projectes");
}

export async function canviaFase(projecteId: number, faseId: number, canvis: { estat?: string; data_limit?: string | null; nom?: string }) {
  await requereixSessio();
  const net: { estat?: string; data_limit?: string | null; nom?: string } = {};
  if (canvis.estat) net.estat = String(canvis.estat).slice(0, 20);
  if (canvis.nom !== undefined) net.nom = String(canvis.nom).trim().slice(0, 200) || undefined;
  if (canvis.data_limit !== undefined) net.data_limit = canvis.data_limit && /^\d{4}-\d{2}-\d{2}$/.test(canvis.data_limit) ? canvis.data_limit : null;
  await actualitzaFase(faseId, net);
  revalidatePath(`/panell/projectes/${projecteId}`);
  revalidatePath("/panell/projectes");
}

export async function treuFase(projecteId: number, faseId: number) {
  await requereixSessio();
  await esborraFase(faseId);
  revalidatePath(`/panell/projectes/${projecteId}`);
}

export async function notaProj(id: number, f: FormData) {
  const s = await requereixSessio();
  const t = txt(f, "text", 5000);
  if (t) await notaProjecte(id, s.usuari, t);
  revalidatePath(`/panell/projectes/${id}`);
}

/* ── Invitacions ───────────────────────────────────────────────────── */
export type EstatInvitacio = Estat & { enllac?: string; enviat?: string };

export async function convida(_: EstatInvitacio, f: FormData): Promise<EstatInvitacio> {
  const s = await requereixSessio();
  const email = txt(f, "email", 200);
  const token = randomBytes(32).toString("base64url");
  await executa(
    "INSERT INTO panell_invitacio (id, caduca, creada_per) VALUES (?, UTC_TIMESTAMP() + INTERVAL 48 HOUR, ?)",
    [createHash("sha256").update(token).digest("hex"), s.usuari],
  );
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://altitudigital.com";
  const enllac = `${base.replace(/\/$/, "")}/panell/invitacio/${token}`;
  if (!email) return { enllac };
  const env = getServerEnv();
  if (!(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS)) return { enllac, error: "No s'ha pogut enviar el correu (SMTP no configurat). Copia l'enllaç." };
  try {
    const port = env.SMTP_PORT ?? 465;
    await nodemailer
      .createTransport({ host: env.SMTP_HOST, port, secure: port === 465, auth: { user: env.SMTP_USER, pass: env.SMTP_PASS } })
      .sendMail({
        from: `"Altitud Digital" <${env.SMTP_FROM ?? env.SMTP_USER}>`,
        to: email,
        subject: "Accés al panell d'Altitud Digital",
        text: `Hola!\n\n${s.usuari} t'ha donat accés al panell d'Altitud Digital.\n\nObre aquest enllaç per crear el teu usuari (caduca en 48 hores i només es pot fer servir una vegada):\n${enllac}\n\nNecessitaràs Google Authenticator (o una app similar) al mòbil.\n\nAltitud Digital`,
      });
    return { enllac, enviat: email };
  } catch {
    return { enllac, error: "No s'ha pogut enviar el correu. Copia l'enllaç i envia'l tu." };
  }
}

export async function acceptaInvitacio(_: Estat, f: FormData): Promise<Estat> {
  const ip = await ipClient();
  if (await bloquejat(ip)) return { error: "Massa intents. Torna-ho a provar d'aquí a 15 minuts." };
  const token = txt(f, "token", 100);
  const hash = createHash("sha256").update(token).digest("hex");
  type I = RowDataPacket & { id: string };
  const [inv] = await consulta<I>("SELECT id FROM panell_invitacio WHERE id = ? AND usada = 0 AND caduca > UTC_TIMESTAMP()", [hash]);
  if (!inv) {
    await registraIntentFallit(ip);
    return { error: "Aquesta invitació no és vàlida o ha caducat." };
  }
  const usuari = txt(f, "usuari", 80);
  const pw = String(f.get("contrasenya") ?? "");
  const pw2 = String(f.get("contrasenya2") ?? "");
  const secret = txt(f, "secret", 64);
  if (!/^[a-zA-Z0-9._-]{3,40}$/.test(usuari)) return { error: "L'usuari ha de tenir entre 3 i 40 lletres o números." };
  if (pw.length < 14) return { error: "La contrasenya ha de tenir com a mínim 14 caràcters." };
  if (pw !== pw2) return { error: "Les dues contrasenyes no coincideixen." };
  type U = RowDataPacket & { id: number };
  if ((await consulta<U>("SELECT id FROM panell_usuari WHERE usuari = ?", [usuari])).length) return { error: "Aquest usuari ja existeix. Tria'n un altre." };
  const comptador = verificaTotp(secret, txt(f, "codi", 10));
  if (comptador === null) return { error: "El codi del mòbil no és correcte. Comprova que l'hora del mòbil és automàtica." };

  await executa("UPDATE panell_invitacio SET usada = 1 WHERE id = ?", [hash]);
  await executa("INSERT INTO panell_usuari (usuari, hash, totp_secret, totp_ultim) VALUES (?, ?, ?, ?)", [
    usuari,
    await hashContrasenya(pw),
    secret,
    comptador,
  ]);
  const [u] = await consulta<U>("SELECT id FROM panell_usuari WHERE usuari = ?", [usuari]);
  await creaSessio(u.id, ip);
  redirect("/panell");
}
