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
