export interface MethodPhase {
  /** Nom de la fase dins la metàfora de muntanya */
  name: string;
  /** Què fem en aquesta fase */
  stage: string;
  text: string;
  /** Posició de la bandera sobre la imatge, en % (x, y) */
  at: [number, number];
}

export const methodContent = {
  eyebrow: "La nostra metodologia",
  heading: { text: "Com ho fem a", strong: "Altitud Digital?" },
  image: "/assets/altitud/nevado-hero.jpg",
  /** Punt de sortida de la ruta (fora del primer camp), en % */
  start: [97, 99] as [number, number],
  phases: [
    {
      name: "Camp base",
      stage: "Diagnòstic",
      text: "Revisem la teva web, les teves xarxes, el teu posicionament i la competència a Andorra, i fixem objectius i KPI.",
      at: [78, 87],
    },
    {
      name: "La ruta",
      stage: "Estratègia",
      text: "Un pla de màrqueting a mida: públic, missatges, canals, calendari de continguts i pressupost.",
      at: [31, 80],
    },
    {
      name: "L'ascens",
      stage: "Execució",
      text: "Xarxes socials, web, SEO i publicitat online, a més de chatbots i automatitzacions amb IA.",
      at: [63, 61],
    },
    {
      name: "El cim",
      stage: "Resultats",
      text: "Informes clars i optimització contínua per continuar creixent. El cim d'avui és el camp base de demà.",
      at: [49.6, 46.6],
    },
  ] as MethodPhase[],
};
