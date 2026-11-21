import "server-only";
import type { RowDataPacket } from "mysql2/promise";
import { consulta, executa } from "./db";
import { ESTATS, TIPUS, type Lead, type Nota } from "./tipus";

type LeadRow = RowDataPacket & Lead;

export const llistaLeads = async () =>
  (await consulta<LeadRow>("SELECT * FROM leads ORDER BY creat DESC")).map(net);

export const obtéLead = async (id: number) => {
  const [l] = await consulta<LeadRow>("SELECT * FROM leads WHERE id = ?", [id]);
  return l ? net(l) : null;
};

export const notesDe = async (id: number) =>
  consulta<RowDataPacket & Nota>("SELECT id, quan, text FROM lead_notes WHERE lead_id = ? ORDER BY quan DESC, id DESC", [
    id,
  ]) as Promise<Nota[]>;

const net = (l: LeadRow): Lead => ({
  id: l.id,
  creat: l.creat,
  actualitzat: l.actualitzat,
  tipus: l.tipus,
  empresa: l.empresa,
  contacte: l.contacte,
  email: l.email,
  telefon: l.telefon,
  web: l.web,
  serveis: l.serveis,
  canal: l.canal,
  origen: l.origen,
  estat: l.estat,
  valor: l.valor === null ? null : Number(l.valor),
  seguiment: l.seguiment,
  missatge: l.missatge,
});

const CAMPS = ["tipus", "empresa", "contacte", "email", "telefon", "web", "serveis", "canal", "origen", "estat", "valor", "seguiment", "missatge"] as const;
export type DadesLead = Partial<Pick<Lead, (typeof CAMPS)[number]>> & { creat?: string };

const valida = (d: DadesLead): DadesLead => {
  const o: DadesLead = { ...d };
  if (o.tipus && !TIPUS.some((t) => t.id === o.tipus)) o.tipus = "altres";
  if (o.estat && !ESTATS.some((e) => e.id === o.estat)) o.estat = "nou";
  return o;
};

export const creaLead = async (d: DadesLead) => {
  const v = valida(d);
  const cols = [...CAMPS.filter((c) => v[c] !== undefined), ...(v.creat ? ["creat"] : [])];
  const vals = cols.map((c) => (v as Record<string, unknown>)[c]);
  const res = await executa(
    `INSERT INTO leads (${cols.join(",")}) VALUES (${cols.map(() => "?").join(",")})`,
    vals,
  );
  return res.insertId;
};

export const actualitzaLead = async (id: number, d: DadesLead) => {
  const v = valida(d);
  const cols = CAMPS.filter((c) => v[c] !== undefined);
  if (!cols.length) return;
  await executa(`UPDATE leads SET ${cols.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`, [
    ...cols.map((c) => v[c]),
    id,
  ]);
};

export const esborraLead = async (id: number) => {
  await executa("DELETE FROM lead_notes WHERE lead_id = ?", [id]);
  await executa("DELETE FROM leads WHERE id = ?", [id]);
};

export const afegeixNota = async (id: number, text: string) => {
  await executa("INSERT INTO lead_notes (lead_id, quan, text) VALUES (?, UTC_TIMESTAMP(), ?)", [id, text]);
  await executa("UPDATE leads SET actualitzat = UTC_TIMESTAMP() WHERE id = ?", [id]);
};
