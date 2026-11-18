import { methodContent } from "@/data/mocks/method";

export type ServiceGroup = "marketing" | "ia";

export interface ServiceStep {
  title: string;
  text: string;
}

export interface Service {
  slug: string;
  group: ServiceGroup;
  /** Nom curt per al menú i les targetes */
  name: string;
  /** Línia de la targeta de la portada: «Web &» + «e-commerce» */
  prefix: string;
  suffix: string;
  /** Frase curta de la targeta */
  short: string;
  /** Titular de la pàgina del servei */
  headline: string;
  intro: string;
  image: string;
  includes: { title: string; text: string }[];
  steps: ServiceStep[];
  /** Etiquetes dels projectes relacionats (projects.ts → services) */
  projectTags?: string[];
  /** Fotos de feina recent feta per l'equip */
  gallery?: { src: string; alt: string; client: string; caption: string }[];
}

const BALANZEN = {
  src: `/assets/altitud/cafe-balanzen.jpg`,
  alt: "Croissants, matcha i cafè amb gel sobre una taula negra a Balanzen",
  client: "Balanzen pilates & coffee",
  caption: "Fotografia de producte per a la carta i les xarxes",
};
const ROSTISSERIA = {
  src: `/assets/altitud/rostisseria-cap-de-carrera.jpg`,
  alt: "Pollastre a l'ast, patates i bossa amb el logo de La Rostisseria",
  client: "La Rostisseria · Cap de Carrera",
  caption: "Fotos per al web i targetes de visita",
};

const A = "/assets/altitud";

const STEPS_MARKETING: ServiceStep[] = methodContent.phases.map((p) => ({
  title: `${p.name} · ${p.stage}`,
  text: p.text,
}));

const STEPS_IA: ServiceStep[] = [
  { title: "Diagnòstic", text: "Detectem les tasques repetitives i on la IA pot aportar més valor." },
  { title: "Disseny", text: "Proposem la solució a mida, connectada a les eines que ja fas servir." },
  { title: "Implantació", text: "La posem en marxa, la provem amb casos reals i formem l'equip." },
  { title: "Acompanyament", text: "Revisem el rendiment i la fem evolucionar amb el teu negoci." },
];

export const services: Service[] = [
  {
    slug: "web-ecommerce",
    group: "marketing",
    name: "Web & e-commerce",
    prefix: "Web &",
    suffix: "e-commerce",
    short: "Webs que converteixen visites en clients.",
    headline: "Webs que treballen per al teu negoci.",
    intro:
      "Dissenyem i desenvolupem webs i botigues online ràpides, fàcils de gestionar i pensades per convertir. Des d'una web corporativa fins a un e-commerce complet, amb manteniment inclòs perquè no t'hagis de preocupar de res.",
    image: `${A}/codi.jpg`,
    includes: [
      { title: "Webs corporatives", text: "Una imatge professional que transmet confiança des del primer clic." },
      { title: "Botigues online", text: "E-commerce preparat per vendre, amb pagaments i gestió d'estoc." },
      { title: "Disseny a mida", text: "Res de plantilles genèriques: cada web reflecteix la teva marca." },
      { title: "Optimització i velocitat", text: "Webs ràpides, adaptades al mòbil i preparades per al SEO." },
      { title: "Manteniment", text: "Actualitzacions, seguretat i canvis quan els necessitis." },
      { title: "Analítica", text: "Mesurem visites i conversions per saber què funciona." },
    ],
    steps: STEPS_MARKETING,
    projectTags: ["Web"],
  },
  {
    slug: "seo-sem",
    group: "marketing",
    name: "SEO, SEM & publicitat digital",
    prefix: "SEO, SEM &",
    suffix: "publicitat digital",
    short: "Més visibilitat, més oportunitats.",
    headline: "Que et trobin quan et busquen.",
    intro:
      "Posicionem la teva empresa a Google i gestionem campanyes de publicitat online a Google i Meta perquè arribis als clients adequats en el moment adequat, amb cada euro invertit sota control.",
    image: `${A}/seo.jpg`,
    includes: [
      { title: "SEO", text: "Auditoria, optimització tècnica, continguts i posicionament local." },
      { title: "Google Ads", text: "Campanyes de cerca, display i Shopping orientades a resultats." },
      { title: "Meta Ads", text: "Publicitat a Instagram i Facebook amb segmentació precisa." },
      { title: "Posicionament local", text: "Fitxa de Google optimitzada perquè et trobin a Andorra." },
      { title: "Landing pages", text: "Pàgines de destí pensades per convertir el trànsit en contactes." },
      { title: "Informes clars", text: "Saps què s'inverteix, què s'obté i què millorarem." },
    ],
    steps: STEPS_MARKETING,
    projectTags: ["SEO"],
  },
  {
    slug: "xarxes-socials",
    group: "marketing",
    name: "Gestió de xarxes socials",
    prefix: "Gestió de",
    suffix: "xarxes socials",
    short: "Contingut que connecta i genera resultat.",
    headline: "Xarxes socials que fan créixer la teva marca.",
    intro:
      "Creem i gestionem el contingut de les teves xarxes amb una estratègia clara: reels, publicacions i campanyes que connecten amb la teva audiència i la converteixen en clients.",
    image: `${A}/xarxes.jpg`,
    includes: [
      { title: "Estratègia de contingut", text: "Calendari editorial alineat amb els objectius del negoci." },
      { title: "Reels i vídeo curt", text: "Peces creatives pensades per a Instagram i TikTok." },
      { title: "Disseny de publicacions", text: "Una línia visual coherent i reconeixible." },
      { title: "Community management", text: "Gestió de comentaris i missatges amb el to de la teva marca." },
      { title: "Configuració de comptes", text: "Creem i optimitzem els perfils i el Business Manager de Meta." },
      { title: "Resultats", text: "Informes mensuals amb el creixement i el que funciona millor." },
    ],
    steps: STEPS_MARKETING,
    projectTags: ["Xarxes socials"],
  },
  {
    slug: "audiovisual",
    group: "marketing",
    name: "Producció i edició audiovisual",
    prefix: "Producció i",
    suffix: "edició audiovisual",
    short: "Vídeo, foto i creativitat amb impacte.",
    headline: "Imatges que expliquen la teva història.",
    intro:
      "Produïm vídeo i fotografia professional per a la teva marca: des de reels per a xarxes fins a vídeos corporatius i sessions de producte, amb edició i postproducció incloses.",
    image: `${A}/camera.jpg`,
    gallery: [BALANZEN, ROSTISSERIA],
    includes: [
      { title: "Vídeo corporatiu", text: "Presenta la teva empresa i el teu equip amb qualitat." },
      { title: "Reels per a xarxes", text: "Gravació i edició en format vertical, llestes per publicar." },
      { title: "Fotografia de producte", text: "Imatges que venen a la web, al catàleg i a les xarxes." },
      { title: "Fotografia corporativa", text: "Retrats d'equip i espais que transmeten professionalitat." },
      { title: "Edició i postproducció", text: "Muntatge, color, so i subtítols." },
      { title: "Contingut per a anuncis", text: "Peces pensades per rendir a les campanyes de pagament." },
    ],
    steps: STEPS_MARKETING,
    projectTags: ["Fotografia corporativa"],
  },
  {
    slug: "branding",
    group: "marketing",
    name: "Branding & disseny gràfic",
    prefix: "Branding &",
    suffix: "disseny gràfic",
    short: "Marques amb identitat que destaquen.",
    headline: "Una marca que es recorda.",
    intro:
      "Creem o renovem la identitat visual de la teva empresa: logotip, colors, tipografia i aplicacions, perquè la teva marca sigui coherent i reconeixible a tot arreu.",
    image: `${A}/disseny.jpg`,
    gallery: [ROSTISSERIA],
    includes: [
      { title: "Logotip", text: "Un símbol propi, versàtil i fàcil de recordar." },
      { title: "Identitat visual", text: "Paleta de colors, tipografies i estil gràfic." },
      { title: "Manual de marca", text: "Les normes per aplicar la marca sempre igual de bé." },
      { title: "Papereria i retolació", text: "Targetes, cartells, aparadors i senyalització." },
      { title: "Disseny per a xarxes", text: "Plantilles i peces coherents amb la identitat." },
      { title: "Packaging", text: "Envasos i etiquetes que destaquen al punt de venda." },
    ],
    steps: STEPS_MARKETING,
    projectTags: ["Identitat corporativa"],
  },
  {
    slug: "ia-automatitzacions",
    group: "ia",
    name: "IA & automatitzacions",
    prefix: "IA &",
    suffix: "automatitzacions",
    short: "Solucions per estalviar temps i vendre més.",
    headline: "Deixa que la feina repetitiva es faci sola.",
    intro:
      "Connectem les eines del teu negoci i automatitzem processos amb intel·ligència artificial: menys tasques manuals, menys errors i més temps per al que de debò aporta valor.",
    image: `${A}/ia.jpg`,
    includes: [
      { title: "Automatització de processos", text: "Fluxos que connecten correu, CRM, fulls de càlcul i més." },
      { title: "Gestió de leads", text: "Cada contacte arriba al lloc correcte i rep resposta a temps." },
      { title: "Informes automàtics", text: "Dades actualitzades sense haver de copiar i enganxar." },
      { title: "Assistents interns", text: "IA que ajuda l'equip a redactar, resumir i cercar informació." },
      { title: "Integracions a mida", text: "Fem parlar entre elles les eines que ja fas servir." },
      { title: "Seguretat i control", text: "Solucions supervisades, documentades i fàcils de mantenir." },
    ],
    steps: STEPS_IA,
  },
  {
    slug: "chatbots-ia",
    group: "ia",
    name: "Chatbots amb IA",
    prefix: "Chatbots",
    suffix: "amb IA",
    short: "Atenció al client les 24 hores.",
    headline: "Respon els teus clients a qualsevol hora.",
    intro:
      "Implantem chatbots amb intel·ligència artificial a webs i botigues online: responen dubtes, recomanen productes i capten contactes les 24 hores, amb el to de la teva marca. Ja en funcionen a molts e-commerce.",
    image: `${A}/ia.jpg`,
    includes: [
      { title: "Chatbot per a la web", text: "Respon preguntes freqüents amb la informació del teu negoci." },
      { title: "Chatbot per a e-commerce", text: "Ajuda a triar producte, resol dubtes de comandes i enviaments." },
      { title: "WhatsApp i xarxes", text: "Atenció automàtica als canals on ja parlen els teus clients." },
      { title: "Captació de contactes", text: "Recull dades dels interessats i les envia al teu equip." },
      { title: "Multilingüe", text: "Català, castellà, francès, anglès… segons el teu públic." },
      { title: "Millora contínua", text: "Revisem les converses per fer-lo cada vegada més útil." },
    ],
    steps: STEPS_IA,
  },
  {
    slug: "estoc-automatic-ia",
    group: "ia",
    name: "Estoc automàtic amb IA",
    prefix: "Estoc automàtic",
    suffix: "amb IA",
    short: "L'inventari al dia, sense esforç.",
    headline: "L'estoc de la teva botiga, sempre al dia.",
    intro:
      "Un sistema de gestió d'estoc automàtic amb intel·ligència artificial que ja fem servir a botigues d'Andorra: controla l'inventari, avisa abans que s'acabi un producte i t'estalvia hores de feina manual.",
    image: `${A}/codi.jpg`,
    includes: [
      { title: "Inventari automàtic", text: "Les existències s'actualitzen soles amb cada venda i entrada." },
      { title: "Alertes de reposició", text: "Avisos abans que un producte es quedi sense estoc." },
      { title: "Botiga física i online", text: "Un sol estoc sincronitzat entre tots els canals." },
      { title: "Previsió de demanda", text: "La IA t'ajuda a decidir què i quan comprar." },
      { title: "Informes", text: "Productes més venuts, rotació i valor de l'estoc d'un cop d'ull." },
      { title: "Implantació acompanyada", text: "Ho configurem i formem el teu equip." },
    ],
    steps: STEPS_IA,
  },
  {
    slug: "formacions-ia",
    group: "ia",
    name: "Formacions d'IA",
    prefix: "Formacions",
    suffix: "d'IA",
    short: "Equips que treuen partit a la IA.",
    headline: "Que el teu equip domini la intel·ligència artificial.",
    intro:
      "Formem equips perquè facin servir la IA a la feina de cada dia, amb casos pràctics del seu sector. Comencem amb un diagnòstic i fem tallers presencials adaptats al nivell i a les necessitats de l'empresa.",
    image: `${A}/equip.jpg`,
    includes: [
      { title: "Diagnòstic inicial", text: "Analitzem on la IA pot aportar més a la teva empresa." },
      { title: "Tallers presencials", text: "Sessions pràctiques a les teves oficines o a les nostres." },
      { title: "Eines com Claude i ChatGPT", text: "Aprèn a fer-les servir bé, amb criteri i amb seguretat." },
      { title: "Casos del teu sector", text: "Exercicis amb tasques reals del teu dia a dia." },
      { title: "Per a tots els nivells", text: "Des de primers passos fins a usos avançats." },
      { title: "Seguiment", text: "Resolem dubtes després de la formació perquè l'ús arreli." },
    ],
    steps: STEPS_IA,
  },
];

export const SERVICE_GROUP_LABEL: Record<ServiceGroup, string> = {
  marketing: "Màrqueting i creativitat",
  ia: "Intel·ligència artificial",
};

export const serviceHref = (slug: string) => `/serveis/${slug}`;

export const findService = (slug: string) => services.find((s) => s.slug === slug);
