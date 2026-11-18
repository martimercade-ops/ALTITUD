export interface PdeSolution {
  id: string;
  name: string;
  text: string;
  /** Import màxim de l'ajut, en euros */
  max: number;
  featured?: boolean;
}

export const pdeSolutions: PdeSolution[] = [
  {
    id: "ia",
    name: "Intel·ligència artificial",
    text: "Chatbots i assistents virtuals, automatització de tasques repetitives i anàlisi de dades.",
    max: 3000,
    featured: true,
  },
  {
    id: "web",
    name: "Desenvolupament web",
    text: "Creació o renovació del web, moderna i adaptada al mòbil.",
    max: 1500,
    featured: true,
  },
  {
    id: "seo-sem",
    name: "Posicionament web (SEO i SEM)",
    text: "Millorar la posició a Google i campanyes d'anuncis.",
    max: 500,
    featured: true,
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    text: "Botiga online i millora de l'experiència de compra.",
    max: 1500,
  },
  {
    id: "ciberseguretat",
    name: "Ciberseguretat",
    text: "Auditoria de seguretat i protecció contra ciberatacs.",
    max: 1000,
  },
  {
    id: "bi",
    name: "Anàlisi de dades (BI)",
    text: "Quadres de comandament amb els KPI del negoci.",
    max: 2000,
  },
];

export const PDE_HREF = "/ajuts-pde";

/** 3000 → «3.000 €» (igual al servidor i al navegador) */
export const formatEuros = (n: number) =>
  `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
