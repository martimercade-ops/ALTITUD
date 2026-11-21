import type { DadesLead } from "./leads";
import type { Lead } from "./tipus";

/** Parser CSV senzill (RFC 4180), amb separador , o ; */
const parseja = (text: string) => {
  const t = text.replace(/^﻿/, "");
  const primera = t.split(/\r?\n/, 1)[0] ?? "";
  const sep = (primera.match(/;/g)?.length ?? 0) > (primera.match(/,/g)?.length ?? 0) ? ";" : ",";
  const files: string[][] = [];
  let fila: string[] = [];
  let camp = "";
  let cometes = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (cometes) {
      if (c === '"' && t[i + 1] === '"') {
        camp += '"';
        i++;
      } else if (c === '"') cometes = false;
      else camp += c;
    } else if (c === '"') cometes = true;
    else if (c === sep) {
      fila.push(camp);
      camp = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && t[i + 1] === "\n") i++;
      fila.push(camp);
      files.push(fila);
      fila = [];
      camp = "";
    } else camp += c;
  }
  if (camp || fila.length) {
    fila.push(camp);
    files.push(fila);
  }
  return files.filter((f) => f.some((x) => x.trim()));
};

const ALIES: Record<string, keyof DadesLead> = {
  tipus: "tipus",
  creat: "creat",
  data: "creat",
  fecha: "creat",
  empresa: "empresa",
  contacte: "contacte",
  "persona de contacto": "contacte",
  "persona de contacte": "contacte",
  email: "email",
  correu: "email",
  telefon: "telefon",
  "telèfon": "telefon",
  "teléfono": "telefon",
  web: "web",
  serveis: "serveis",
  canal: "canal",
  origen: "origen",
  estat: "estat",
  valor: "valor",
  seguiment: "seguiment",
  missatge: "missatge",
  notes: "missatge",
};

export const llegeixCsv = (text: string): DadesLead[] => {
  const [cap, ...files] = parseja(text);
  if (!cap) return [];
  const claus = cap.map((h) => ALIES[h.trim().toLowerCase()]);
  return files.map((f) => {
    const d: Record<string, unknown> = { origen: "Importat" };
    claus.forEach((k, i) => {
      const v = (f[i] ?? "").trim();
      if (!k || !v) return;
      if (k === "valor") d.valor = Number(v.replace(",", ".")) || null;
      else if (k === "creat") d.creat = /^\d{4}-\d{2}-\d{2}/.test(v) ? v.slice(0, 19).replace("T", " ") : undefined;
      else if (k === "seguiment") d.seguiment = /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
      else d[k] = v.slice(0, k === "missatge" ? 5000 : 500);
    });
    return d as DadesLead;
  });
};

const esc = (v: unknown) => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",;\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export const aCsv = (leads: Lead[]) => {
  const cols: (keyof Lead)[] = ["id", "creat", "tipus", "empresa", "contacte", "email", "telefon", "web", "serveis", "canal", "origen", "estat", "valor", "seguiment", "missatge"];
  return "﻿" + [cols.join(";"), ...leads.map((l) => cols.map((c) => esc(l[c])).join(";"))].join("\r\n");
};
