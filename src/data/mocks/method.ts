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
      name: "Diagnòstic",
      stage: "",
      text: "Ens asseiem amb tu, mirem la teva web, les xarxes i la competència, i decidim junts on vols arribar.",
      at: [78, 87],
    },
    {
      name: "Estratègia",
      stage: "",
      text: "Preparem un pla fet per a tu: a qui parlem, què diem, on ho diem i quant hi invertim.",
      at: [31, 80],
    },
    {
      name: "Execució",
      stage: "",
      text: "Ens posem mans a la feina: xarxes, web, Google, anuncis i, si t'ajuda, eines d'IA.",
      at: [63, 61],
    },
    {
      name: "Resultats",
      stage: "",
      text: "Et mostrem els números amb claredat i anem ajustant. El cim d'avui és el punt de partida de demà.",
      at: [49.6, 46.6],
    },
  ] as MethodPhase[],
};
