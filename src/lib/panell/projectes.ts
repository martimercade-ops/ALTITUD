import "server-only";
import type { RowDataPacket } from "mysql2/promise";
import { consulta, executa } from "./db";
import { ESTATS_FASE, ESTATS_PROJECTE, FASES_PER_DEFECTE, type Fase, type NotaProjecte, type Projecte } from "./tipus";

const num = (v: unknown) => (v === null || v === undefined ? null : Number(v));
const net = (p: RowDataPacket): Projecte => ({
  ...(p as Projecte),
  preu_client: num(p.preu_client),
  cost_extern: num(p.cost_extern),
  cost_pagat: Number(p.cost_pagat),
  fases_total: p.fases_total === undefined ? undefined : Number(p.fases_total),
  fases_fetes: p.fases_fetes === undefined ? undefined : Number(p.fases_fetes),
});

export const llistaProjectes = async () =>
  (
    await consulta<RowDataPacket>(
      `SELECT p.*, COUNT(f.id) fases_total, COALESCE(SUM(f.estat = 'fet'), 0) fases_fetes
       FROM projectes p LEFT JOIN projecte_fases f ON f.projecte_id = p.id
       GROUP BY p.id ORDER BY (p.estat = 'actiu') DESC, p.entrega IS NULL, p.entrega, p.id DESC`,
    )
  ).map(net);

export const obtéProjecte = async (id: number) => {
  const [p] = await consulta<RowDataPacket>("SELECT * FROM projectes WHERE id = ?", [id]);
  return p ? net(p) : null;
};

export const fasesDe = async (id: number) =>
  (await consulta<RowDataPacket>("SELECT * FROM projecte_fases WHERE projecte_id = ? ORDER BY ordre, id", [id])) as unknown as Fase[];

export const notesProjecte = async (id: number) =>
  (await consulta<RowDataPacket>(
    "SELECT id, quan, autor, text FROM projecte_notes WHERE projecte_id = ? ORDER BY quan DESC, id DESC",
    [id],
  )) as unknown as NotaProjecte[];

const CAMPS = ["client", "nom", "descripcio", "estat", "responsable", "inici", "entrega", "preu_client", "cost_extern", "cost_pagat", "cost_data_pagament", "web", "lead_id"] as const;
export type DadesProjecte = Partial<Record<(typeof CAMPS)[number], unknown>>;

const valida = (d: DadesProjecte) => {
  const o = { ...d };
  if (o.estat && !ESTATS_PROJECTE.some((e) => e.id === o.estat)) o.estat = "actiu";
  return o;
};

export const creaProjecte = async (d: DadesProjecte) => {
  const v = valida(d);
  const cols = CAMPS.filter((c) => v[c] !== undefined);
  const res = await executa(
    `INSERT INTO projectes (${cols.join(",")}) VALUES (${cols.map(() => "?").join(",")})`,
    cols.map((c) => v[c]),
  );
  const id = res.insertId;
  for (const [i, nom] of FASES_PER_DEFECTE.entries()) {
    await executa("INSERT INTO projecte_fases (projecte_id, ordre, nom) VALUES (?, ?, ?)", [id, i, nom]);
  }
  return id;
};

export const actualitzaProjecte = async (id: number, d: DadesProjecte) => {
  const v = valida(d);
  const cols = CAMPS.filter((c) => v[c] !== undefined);
  if (!cols.length) return;
  await executa(`UPDATE projectes SET ${cols.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`, [...cols.map((c) => v[c]), id]);
};

export const esborraProjecte = async (id: number) => {
  await executa("DELETE FROM projecte_fases WHERE projecte_id = ?", [id]);
  await executa("DELETE FROM projecte_notes WHERE projecte_id = ?", [id]);
  await executa("DELETE FROM projectes WHERE id = ?", [id]);
};

export const afegeixFase = async (id: number, nom: string, data: string | null) => {
  const [r] = await consulta<RowDataPacket & { m: number }>("SELECT COALESCE(MAX(ordre), -1) m FROM projecte_fases WHERE projecte_id = ?", [id]);
  await executa("INSERT INTO projecte_fases (projecte_id, ordre, nom, data_limit) VALUES (?, ?, ?, ?)", [id, Number(r.m) + 1, nom, data]);
  await executa("UPDATE projectes SET actualitzat = UTC_TIMESTAMP() WHERE id = ?", [id]);
};

export const actualitzaFase = async (faseId: number, d: { nom?: string; estat?: string; data_limit?: string | null }) => {
  if (d.estat && !ESTATS_FASE.some((e) => e.id === d.estat)) return;
  const cols = (["nom", "estat", "data_limit"] as const).filter((c) => d[c] !== undefined);
  if (!cols.length) return;
  await executa(`UPDATE projecte_fases SET ${cols.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`, [...cols.map((c) => d[c]), faseId]);
};

export const esborraFase = async (faseId: number) => executa("DELETE FROM projecte_fases WHERE id = ?", [faseId]);

export const notaProjecte = async (id: number, autor: string, text: string) => {
  await executa("INSERT INTO projecte_notes (projecte_id, quan, autor, text) VALUES (?, UTC_TIMESTAMP(), ?, ?)", [id, autor, text]);
  await executa("UPDATE projectes SET actualitzat = UTC_TIMESTAMP() WHERE id = ?", [id]);
};
