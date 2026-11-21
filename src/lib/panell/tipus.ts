/** Tipus i constants del panell (es poden fer servir al client) */
export interface Lead {
  id: number;
  creat: string;
  actualitzat: string;
  tipus: string;
  empresa: string;
  contacte: string;
  email: string;
  telefon: string;
  web: string;
  serveis: string;
  canal: string;
  origen: string;
  estat: string;
  valor: number | null;
  seguiment: string | null;
  missatge: string | null;
}

export interface Nota {
  id: number;
  quan: string;
  text: string;
}

export const ESTATS = [
  { id: "nou", nom: "Nou", color: "#2b72e2" },
  { id: "contactat", nom: "Contactat", color: "#7c5cd6" },
  { id: "pas1", nom: "Pas 1 fet", color: "#0f9aa8" },
  { id: "reunio", nom: "Reunió", color: "#d48a1c" },
  { id: "pressupost", nom: "Pressupost enviat", color: "#c2410c" },
  { id: "guanyat", nom: "Guanyat", color: "#15803d" },
  { id: "perdut", nom: "Perdut", color: "#9ca3af" },
] as const;

export const TIPUS = [
  { id: "ajuts", nom: "Ajuts PDE" },
  { id: "altres", nom: "Altres" },
] as const;

export const SERVEIS = ["Web", "SEO / SEM", "IA", "Botiga online", "Ciberseguretat", "Xarxes socials", "Publicitat", "Identitat"];

export const nomEstat = (id: string) => ESTATS.find((e) => e.id === id)?.nom ?? id;
export const colorEstat = (id: string) => ESTATS.find((e) => e.id === id)?.color ?? "#9ca3af";
export const nomTipus = (id: string) => TIPUS.find((t) => t.id === id)?.nom ?? id;

export interface Projecte {
  id: number;
  creat: string;
  actualitzat: string;
  client: string;
  nom: string;
  descripcio: string | null;
  estat: string;
  responsable: string;
  inici: string | null;
  entrega: string | null;
  preu_client: number | null;
  cost_extern: number | null;
  cost_pagat: number;
  cost_data_pagament: string | null;
  web: string;
  lead_id: number | null;
  fases_total?: number;
  fases_fetes?: number;
}

export interface Fase {
  id: number;
  projecte_id: number;
  ordre: number;
  nom: string;
  estat: string;
  data_limit: string | null;
}

export interface NotaProjecte {
  id: number;
  quan: string;
  autor: string;
  text: string;
}

export const ESTATS_PROJECTE = [
  { id: "actiu", nom: "En curs", color: "#2b72e2" },
  { id: "pausa", nom: "En pausa", color: "#d48a1c" },
  { id: "entregat", nom: "Entregat", color: "#15803d" },
  { id: "cancellat", nom: "Cancel·lat", color: "#9ca3af" },
] as const;

export const ESTATS_FASE = [
  { id: "pendent", nom: "Pendent", color: "#9ca3af" },
  { id: "en_curs", nom: "En curs", color: "#2b72e2" },
  { id: "fet", nom: "Fet", color: "#15803d" },
] as const;

export const FASES_PER_DEFECTE = ["Briefing i proposta", "Disseny", "Desenvolupament", "Revisió amb el client", "Entrega i formació"];

export const nomEstatProjecte = (id: string) => ESTATS_PROJECTE.find((e) => e.id === id)?.nom ?? id;
export const colorEstatProjecte = (id: string) => ESTATS_PROJECTE.find((e) => e.id === id)?.color ?? "#9ca3af";
