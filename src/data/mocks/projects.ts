export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  name: string;
  sector: string;
  summary: string;
  about: string;
  services: string[];
  links: ProjectLink[];
  image: string;
}

const P = "/assets/altitud/projectes";

const web = (url: string): ProjectLink => ({
  label: new URL(url).hostname.replace(/^www\./, ""),
  url,
});

export const projects: Project[] = [
  {
    slug: "henkan",
    name: "Henkan Spaces",
    sector: "Interiorisme",
    summary: "Web, fotografia i SEO.",
    about: "Estudi d'interiorisme a Andorra: dissenyen amb sentit i transformen amb encant.",
    services: ["Web", "Fotografia", "SEO"],
    links: [web("https://henkan-spaces.com/")],
    image: `${P}/henkan.jpg`,
  },
  {
    slug: "enzo-poulat",
    name: "Enzo Poulat Coaching",
    sector: "Entrenador personal",
    summary: "Web.",
    about: "Entrenador personal de força i rendiment, amb coaching en línia i presencial.",
    services: ["Web"],
    links: [web("https://enzopoulatcoaching.com/")],
    image: `${P}/enzo-poulat.jpg`,
  },
  {
    slug: "perfect-home",
    name: "Perfect Home",
    sector: "Immobiliària",
    summary: "Web i chatbot amb IA.",
    about: "Agència immobiliària a Andorra: compra, venda i assessorament personalitzat. El chatbot amb IA atén els visitants a qualsevol hora.",
    services: ["Web", "Chatbot amb IA"],
    links: [web("https://perfecthomeandorra.com/")],
    image: `${P}/perfect-home.jpg`,
  },
  {
    slug: "la-rostisseria",
    name: "La Rostisseria",
    sector: "Restauració",
    summary: "Web, fotografia, xarxes socials i targetes de visita.",
    about: "Rostisseria de barri al casc antic d'Andorra la Vella: pollastres a l'ast, carns, amanides i vins.",
    services: ["Web", "Fotografia", "Xarxes socials", "Branding"],
    links: [web("https://larostisseria.ad/")],
    image: `${P}/la-rostisseria.jpg`,
  },
  {
    slug: "erf-assegurances",
    name: "ERF Assegurances",
    sector: "Assegurances",
    summary: "Web.",
    about: "Corredoria d'assegurances a Escaldes-Engordany per a particulars i empreses, amb més de 20 anys d'experiència.",
    services: ["Web"],
    links: [web("https://erfassegurances.com/")],
    image: `${P}/erf-assegurances.jpg`,
  },
  {
    slug: "la-llotja",
    name: "La Llotja",
    sector: "Restauració",
    summary: "Web, vídeo i fotografia.",
    about: "Restaurant i peixateria a Escaldes-Engordany: tries el peix o el marisc fresc i te'l preparen al moment.",
    services: ["Web", "Vídeo", "Fotografia"],
    links: [web("https://lallotjarestaurant.com/")],
    image: `${P}/la-llotja.jpg`,
  },
  {
    slug: "la-casa",
    name: "La Casa Gastrobar",
    sector: "Restauració",
    summary: "Web, fotografia, vídeo i motor de reserves.",
    about: "Gastrobar al cor del casc antic d'Andorra la Vella, amb cuina oberta i terrassa d'estiu.",
    services: ["Web", "Fotografia", "Vídeo", "Motor de reserves"],
    links: [web("https://lacasa-andorra.com/")],
    image: `${P}/la-casa.jpg`,
  },
  {
    slug: "claudia-moncau",
    name: "Clàudia Moncau",
    sector: "Ioga i benestar",
    summary: "Web i fotografia.",
    about: "Instructora de ioga i meditació a Barcelona: classes privades, ioga per a empreses i tallers vivencials.",
    services: ["Web", "Fotografia"],
    links: [web("https://claudiamoncau.com/")],
    image: `${P}/claudia-moncau.jpg`,
  },
  {
    slug: "medic-estetic",
    name: "Medic Estetic",
    sector: "Medicina estètica",
    summary: "Web i xarxes socials.",
    about: "Clínica de medicina estètica avançada a Andorra.",
    services: ["Web", "Xarxes socials"],
    links: [web("https://medicestetic.com/")],
    image: `${P}/medic-estetic.jpg`,
  },
  {
    slug: "plexifoto",
    name: "PlexiFoto",
    sector: "Comerç electrònic",
    summary: "Web per dissenyar i comprar quadres de metacrilat.",
    about: "Quadres de metacrilat amb la teva foto, impresos a Andorra.",
    services: ["Web"],
    links: [web("https://plexifoto.com/")],
    image: `${P}/plexifoto.jpg`,
  },
  {
    slug: "auro-jardiners",
    name: "Auró Jardiners",
    sector: "Jardineria",
    summary: "Web, SEO i xarxes socials.",
    about: "Empresa de jardineria a Andorra: disseny, construcció i manteniment d'espais verds.",
    services: ["Web", "SEO", "Xarxes socials"],
    links: [web("https://aurojardiners.com/")],
    image: `${P}/auro-jardiners.jpg`,
  },
  {
    slug: "federacio-andorrana-d-esqui",
    name: "Federació Andorrana d'Esquí",
    sector: "Esport",
    summary: "Web i programa de gestió de llicències.",
    about: "La federació que impulsa l'esquí i els esports de neu a Andorra.",
    services: ["Web", "Programa de llicències"],
    links: [web("https://www.fae.ad/"), { label: "llicencies.fae.ad", url: "https://llicencies.fae.ad/" }],
    image: `${P}/fae.jpg`,
  },
  {
    slug: "brainworks-center",
    name: "Brainworks Center",
    sector: "Salut i benestar",
    summary: "Web, xarxes socials i identitat corporativa.",
    about: "Centre d'Andorra per entrenar el cervell i millorar el benestar i el rendiment.",
    services: ["Web", "Xarxes socials", "Identitat corporativa"],
    links: [web("https://brainworkscenter.com/")],
    image: `${P}/brainworks.jpg`,
  },
  {
    slug: "farmacia-guitart",
    name: "Farmàcia Guitart",
    sector: "Farmàcia",
    summary: "Web amb botiga en línia.",
    about: "Farmàcia i parafarmàcia amb botiga en línia i consell farmacèutic.",
    services: ["Web"],
    links: [web("https://farmaciaguitart.com/")],
    image: `${P}/farmacia-guitart.jpg`,
  },
  {
    slug: "hotel-niu",
    name: "Hotel Niu",
    sector: "Hoteleria",
    summary: "Web.",
    about: "Hotel familiar a Encamp, a pocs passos del Funicamp.",
    services: ["Web"],
    links: [web("https://hotelniuandorra.com/")],
    image: `${P}/hotel-niu.jpg`,
  },
  {
    slug: "beta-assegurances",
    name: "Beta Assegurances",
    sector: "Assegurances",
    summary: "Web.",
    about: "Corredoria d'assegurances a Andorra, amb pressupost en línia.",
    services: ["Web"],
    links: [web("https://beta-assegurances.com/")],
    image: `${P}/beta-assegurances.jpg`,
  },
  {
    slug: "psicosalut",
    name: "Psicosalut",
    sector: "Psicologia",
    summary: "Web i fotografia corporativa.",
    about: "Centre de psicologia a Andorra.",
    services: ["Web", "Fotografia corporativa"],
    links: [web("https://psicosalut.ad/")],
    image: `${P}/psicosalut.jpg`,
  },
  {
    slug: "olympus-race",
    name: "Olympus Race",
    sector: "Esdeveniments esportius",
    summary: "Web i SEO.",
    about: "La cursa d'obstacles d'Andorra, al cor de Canillo.",
    services: ["Web", "SEO"],
    links: [web("https://olympusrace.com/")],
    image: `${P}/olympus-race.jpg`,
  },
];

export const projectHref = (slug: string) => `/projectes/${slug}`;

export const findProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectNeighbours = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
};
