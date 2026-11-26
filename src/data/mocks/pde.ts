export interface PdeSolution {
  id: string;
  name: string;
  text: string;
  /** Import màxim de l'ajut, en euros */
  max: number;
  /** Percentatge del cost subvencionat */
  pct: number;
  featured?: boolean;
  /** Solucions que comparteixen el mateix ajut (no se sumen dues vegades) */
  pack?: string;
}

/** Solucions del PDE que fem a Altitud Digital (font: andorra-digital.com/pde/solucions-digitalitzacio) */
export const pdeSolutions: PdeSolution[] = [
  { id: "ia", name: "Intel·ligència artificial", text: "Chatbots, assistents i automatització de tasques.", max: 3000, pct: 50, featured: true, pack: "ia" },
  { id: "xarxes-ia", name: "Xarxes socials amb IA", text: "Contingut i gestió de xarxes fets amb IA, dins el paquet d'IA.", max: 3000, pct: 50, featured: true, pack: "ia" },
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

/** Límits per mida d'empresa (font: andorra-digital.com/pde/solucions-digitalitzacio, novembre 2026) */
export const PDE_MIDES = [
  { id: "micro", ca: "Microempresa", es: "Microempresa", treb: "1–5", max: 6000, sol: 6 },
  { id: "petita", ca: "Petita empresa", es: "Pequeña empresa", treb: "6–25", max: 5500, sol: 5 },
  { id: "mitjana", ca: "Mitjana empresa", es: "Mediana empresa", treb: "26–100", max: 4000, sol: 4 },
  { id: "gran", ca: "Gran empresa", es: "Gran empresa", treb: "+100", max: 3000, sol: 3 },
] as const;

/** Totes les solucions oficials del PDE, amb percentatge i import màxim (mateixa font) */
export const PDE_SOLUCIONS: { grup: { ca: string; es: string }; items: { ca: string; es: string; pct: number; max: number; nou?: boolean }[] }[] = [
  {
    grup: { ca: "Per a qualsevol sector", es: "Para cualquier sector" },
    items: [
      { ca: "Intel·ligència artificial", es: "Inteligencia artificial", pct: 50, max: 3000 },
      { ca: "Ciberseguretat", es: "Ciberseguridad", pct: 50, max: 1000 },
      { ca: "Emmagatzematge i serveis al núvol", es: "Almacenamiento y servicios en la nube", pct: 45, max: 3000, nou: true },
      { ca: "Anàlisi de dades (BI)", es: "Análisis de datos (BI)", pct: 45, max: 2000 },
      { ca: "Gestió electrònica dels pagaments", es: "Gestión electrónica de pagos", pct: 30, max: 2000, nou: true },
      { ca: "Pàgina web", es: "Página web", pct: 30, max: 1500 },
      { ca: "Formació en digitalització", es: "Formación en digitalización", pct: 30, max: 1500 },
      { ca: "Posicionament web (SEO i SEM)", es: "Posicionamiento web (SEO y SEM)", pct: 30, max: 500 },
    ],
  },
  { grup: { ca: "Comerç", es: "Comercio" }, items: [{ ca: "Botiga online", es: "Tienda online", pct: 30, max: 1500 }] },
  {
    grup: { ca: "Hostaleria", es: "Hostelería" },
    items: [
      { ca: "Programari de gestió", es: "Software de gestión", pct: 30, max: 3000 },
      { ca: "Gestió d'ingressos i anàlisi de preus", es: "Gestión de ingresos y precios", pct: 30, max: 2500 },
      { ca: "Reserva online", es: "Reserva online", pct: 30, max: 2000 },
      { ca: "Atenció al client", es: "Atención al cliente", pct: 30, max: 1500 },
    ],
  },
  {
    grup: { ca: "Restauració", es: "Restauración" },
    items: [
      { ca: "Programari de gestió", es: "Software de gestión", pct: 30, max: 3000 },
      { ca: "Reserva online", es: "Reserva online", pct: 30, max: 1500 },
      { ca: "Carta i menú digital", es: "Carta y menú digital", pct: 30, max: 1000 },
    ],
  },
  {
    grup: { ca: "Despatxos professionals", es: "Despachos profesionales" },
    items: [
      { ca: "Gestió digital (ERP i CRM)", es: "Gestión digital (ERP y CRM)", pct: 30, max: 3000 },
      { ca: "Digitalització de processos", es: "Digitalización de procesos", pct: 30, max: 2500 },
      { ca: "Documents digitals i eines col·laboratives", es: "Documentos digitales y herramientas colaborativas", pct: 30, max: 500 },
    ],
  },
];
