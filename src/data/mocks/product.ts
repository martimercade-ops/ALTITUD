export interface ProductContent {
  labelId: string;
  heading: string;
  cta: { label: string; href: string };
  description: string;
  cards: {
    grow: { title: string; body: string; image: string };
    liquid: { title: string; body: string };
    hands: { title: string; body: string };
  };
}

export const productContent: ProductContent = {
  labelId: "product-title",
  heading: "Més que una agència",
  cta: { label: "Coneix el nostre equip", href: "#team" },
  description: "Un equip compromès amb el teu creixement.",
  cards: {
    grow: {
      title: "Equip multidisciplinari",
      body: "Experts en màrqueting, disseny, desenvolupament i intel·ligència artificial.",
      image: "/assets/altitud/oficina.jpg",
    },
    liquid: {
      title: "Estratègia a mida",
      body: "Ens adaptem al teu sector, objectius i realitat.",
    },
    hands: {
      title: "Resultats mesurables",
      body: "Ens enfoquem en el que realment importa: el teu negoci.",
    },
  },
};
