export interface PdeSolution {
  id: string;
  name: string;
  text: string;
  /** Import màxim de l'ajut, en euros */
  max: number;
  /** Percentatge del cost subvencionat */
  pct: number;
  featured?: boolean;
}

/** Solucions del PDE que fem a Altitud Digital (font: andorra-digital.com/pde/solucions-digitalitzacio) */
export const pdeSolutions: PdeSolution[] = [
  { id: "ia", name: "Intel·ligència artificial", text: "Chatbots, assistents i automatització de tasques.", max: 3000, pct: 50, featured: true },
  { id: "web", name: "Pàgina web", text: "Web nova o renovada, amb el teu catàleg i adaptada al mòbil.", max: 1500, pct: 30, featured: true },
  { id: "seo-sem", name: "Posicionament (SEO i SEM)", text: "Sortir més amunt a Google i campanyes d'anuncis.", max: 500, pct: 30, featured: true },
  { id: "botiga", name: "Botiga online", text: "Vendre els teus productes a internet.", max: 1500, pct: 30 },
  { id: "bi", name: "Anàlisi de dades (BI)", text: "Un quadre amb els números clau del negoci.", max: 2000, pct: 45 },
  { id: "reserves", name: "Reserva online", text: "Reserves i pagament des del mòbil. Hotels fins a 2.000 €; restaurants, 1.500 €.", max: 2000, pct: 30 },
  { id: "carta", name: "Carta i menú digital", text: "Per a restaurants: la carta sempre al dia, amb QR.", max: 1000, pct: 30 },
  { id: "ciberseguretat", name: "Ciberseguretat", text: "Protegir l'empresa davant d'atacs informàtics.", max: 1000, pct: 50 },
  { id: "formacio", name: "Formació digital", text: "Que el teu equip aprengui a fer servir les noves eines.", max: 1500, pct: 30 },
];

export const PDE_HREF = "/ajuts-pde";

/** 3000 → «3.000 €» (igual al servidor i al navegador) */
export const formatEuros = (n: number) =>
  `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
