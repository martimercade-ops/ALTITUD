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
  /** Eines amb què treballem en aquest servei */
  tools?: string[];
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
  title: p.name,
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
    slug: "consultoria",
    group: "marketing",
    name: "Consultoria estratègica",
    prefix: "Consultoria",
    suffix: "estratègica",
    short: "Saber on posar el temps i els diners.",
    headline: "Abans de fer, decidim bé què fer.",
    intro:
      "Ens asseiem amb tu, mirem com està el teu negoci i et diem amb claredat què funciona, què no i per on començar. Pots quedar-te amb el pla i executar-lo tu, o fer-lo amb nosaltres.",
    image: `${A}/oficina.jpg`,
    includes: [
      { title: "Auditoria digital", text: "Web, xarxes, anuncis i posicionament, revisats amb lupa." },
      { title: "Anàlisi de competència", text: "Què fan els altres a Andorra i on tens espai per destacar." },
      { title: "Pla de màrqueting", text: "Objectius, canals, pressupost i calendari en un document clar." },
      { title: "Digitalització i IA", text: "Quins processos val la pena automatitzar i quins no." },
      { title: "Sessions de seguiment", text: "Revisem els números amb tu cada mes i ajustem." },
      { title: "Ajuts PDE", text: "T'orientem per aprofitar les subvencions del Govern." },
    ],
    tools: ["Google Analytics", "Semrush", "Notion", "Google Workspace"],
    steps: STEPS_MARKETING,
  },
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
    tools: ["WordPress", "Elementor", "WooCommerce", "Shopify", "PrestaShop", "Figma"],
    steps: STEPS_MARKETING,
    projectTags: ["Web"],
  },
  {
    slug: "disseny-ux-ui",
    group: "marketing",
    name: "Disseny UX/UI",
    prefix: "Disseny",
    suffix: "UX/UI",
    short: "Interfícies clares que la gent sap fer servir.",
    headline: "Webs i apps fàcils i agradables de fer servir.",
    intro:
      "Dissenyem l'experiència i la interfície de webs, botigues online i aplicacions: com hi navega l'usuari, què veu primer i com arriba a comprar o a contactar-te, abans d'escriure una sola línia de codi.",
    image: `${A}/disseny.jpg`,
    includes: [
      { title: "Recerca d'usuari", text: "Entenem qui fa servir el teu web i què hi busca." },
      { title: "Arquitectura i fluxos", text: "Ordenem continguts i camins perquè res costi de trobar." },
      { title: "Wireframes", text: "L'esquelet de cada pantalla, per validar-lo ràpid." },
      { title: "Disseny d'interfície", text: "Pantalles cuidades, coherents amb la teva marca." },
      { title: "Prototips", text: "Un model clicable per provar-lo abans de desenvolupar." },
      { title: "Sistema de disseny", text: "Components i estils reutilitzables per créixer amb ordre." },
    ],
    tools: ["Figma", "FigJam", "Maze", "Hotjar"],
    steps: STEPS_MARKETING,
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
    tools: ["Google Ads", "Meta Ads", "Semrush", "Google Search Console", "Google Analytics", "Google Business Profile"],
    steps: STEPS_MARKETING,
    projectTags: ["SEO"],
  },
  {
    slug: "cro-growth",
    group: "marketing",
    name: "CRO i growth",
    prefix: "CRO i",
    suffix: "growth",
    short: "Treure més clients del trànsit que ja tens.",
    headline: "Més vendes sense haver de pagar més anuncis.",
    intro:
      "Mirem on es perden les visites de la teva web o botiga, provem canvis i ens quedem amb els que funcionen. Pas a pas, amb dades, perquè cada visita valgui més.",
    image: `${A}/seo.jpg`,
    includes: [
      { title: "Analítica ben muntada", text: "Saber d'on venen les vendes i on s'encallen els usuaris." },
      { title: "Optimització de la conversió", text: "Formularis, fitxes de producte i checkout més fàcils." },
      { title: "Tests A/B", text: "Provem dues versions i decidim amb números, no per intuïció." },
      { title: "Embuts de venda", text: "Del primer clic a la compra, i de la compra a repetir." },
      { title: "Email màrqueting", text: "Automatitzacions per recuperar carrets i fidelitzar clients." },
      { title: "Creixement continu", text: "Una llista d'experiments ordenada per impacte, cada mes." },
    ],
    tools: ["Google Analytics", "Hotjar", "Google Tag Manager", "Mailchimp", "Shopify", "WooCommerce"],
    steps: STEPS_MARKETING,
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
    tools: ["Instagram", "TikTok", "Meta Business Suite", "Meta Ads", "CapCut", "Canva"],
    steps: STEPS_MARKETING,
    projectTags: ["Xarxes socials"],
  },
  {
    slug: "audiovisual",
    group: "marketing",
    name: "Producció audiovisual",
    prefix: "Producció i",
    suffix: "edició audiovisual",
    short: "Vídeo, foto i creativitat amb impacte.",
    headline: "Imatges que expliquen la teva història.",
    intro:
      "Produïm vídeo i fotografia professional per a la teva marca: des de reels per a xarxes fins a vídeos corporatius i sessions de producte, amb edició i postproducció incloses.",
    image: `${A}/cafe-balanzen.jpg`,
    gallery: [ROSTISSERIA],
    includes: [
      { title: "Vídeo corporatiu", text: "Presenta la teva empresa i el teu equip amb qualitat." },
      { title: "Reels per a xarxes", text: "Gravació i edició en format vertical, llestes per publicar." },
      { title: "Fotografia de producte", text: "Imatges que venen a la web, al catàleg i a les xarxes." },
      { title: "Fotografia corporativa", text: "Retrats d'equip i espais que transmeten professionalitat." },
      { title: "Edició i postproducció", text: "Muntatge, color, so i subtítols." },
      { title: "Contingut per a anuncis", text: "Peces pensades per rendir a les campanyes de pagament." },
    ],
    tools: ["Premiere Pro", "After Effects", "Lightroom", "CapCut", "DaVinci Resolve"],
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
    image: `${A}/rostisseria-cap-de-carrera.jpg`,
    includes: [
      { title: "Logotip", text: "Un símbol propi, versàtil i fàcil de recordar." },
      { title: "Identitat visual", text: "Paleta de colors, tipografies i estil gràfic." },
      { title: "Manual de marca", text: "Les normes per aplicar la marca sempre igual de bé." },
      { title: "Papereria i retolació", text: "Targetes, cartells, aparadors i senyalització." },
      { title: "Disseny per a xarxes", text: "Plantilles i peces coherents amb la identitat." },
      { title: "Packaging", text: "Envasos i etiquetes que destaquen al punt de venda." },
    ],
    tools: ["Illustrator", "Photoshop", "Figma", "InDesign"],
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
    tools: ["Claude", "ChatGPT", "n8n", "Make", "Google Workspace"],
    steps: STEPS_IA,
  },
  {
    slug: "video-ia",
    group: "ia",
    name: "Vídeo amb IA",
    prefix: "Vídeo",
    suffix: "amb IA",
    short: "Més vídeos, en menys temps.",
    headline: "Vídeos per a xarxes i anuncis, més ràpid.",
    intro:
      "Combinem la nostra producció amb eines d'intel·ligència artificial per crear més vídeos en menys temps: versions per a cada xarxa, subtítols, veus en off en diversos idiomes i peces per a campanyes.",
    image: `${A}/camera.jpg`,
    includes: [
      { title: "Reels i vídeos curts", text: "Adaptats a cada xarxa i a cada format." },
      { title: "Subtítols automàtics", text: "En català, castellà, francès o anglès." },
      { title: "Veu en off", text: "Locucions en diversos idiomes sense estudi de gravació." },
      { title: "Versions per a anuncis", text: "Diverses variants per provar quina funciona millor." },
      { title: "Edició i postproducció", text: "Retoc, color i so amb acabat professional." },
      { title: "Imatges de suport", text: "Recursos visuals quan no hi ha material gravat." },
    ],
    tools: ["Premiere Pro", "CapCut", "Runway", "ElevenLabs", "Descript"],
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
    tools: ["Claude", "ChatGPT", "WhatsApp Business", "WordPress", "Shopify"],
    steps: STEPS_IA,
  },
  {
    slug: "crm-erp-a-mida",
    group: "ia",
    name: "CRM i ERP a mida",
    prefix: "CRM i ERP",
    suffix: "a mida",
    short: "Eines fetes per al teu negoci.",
    headline: "El programa que el teu negoci necessita, fet a mida.",
    intro:
      "Creem eines de gestió a mida per a la teva empresa: CRM per seguir clients i vendes, ERP per tenir-ho tot connectat i un sistema d'estoc automàtic amb IA que ja fem servir a botigues d'Andorra.",
    image: `${A}/codi.jpg`,
    includes: [
      { title: "CRM a mida", text: "Clients, oportunitats i seguiment comercial en un sol lloc." },
      { title: "ERP a mida", text: "Facturació, compres i operativa connectades entre si." },
      { title: "Estoc automàtic amb IA", text: "L'inventari al dia amb cada venda i avisos de reposició." },
      { title: "Botiga física i online", text: "Un sol estoc i unes mateixes dades per a tots els canals." },
      { title: "Integracions", text: "Connectem el programa amb la web, la botiga i les eines que ja fas servir." },
      { title: "Implantació acompanyada", text: "Ho configurem i formem el teu equip." },
    ],
    tools: ["Claude", "OpenAI", "Notion", "Google Workspace", "Shopify", "WooCommerce"],
    steps: STEPS_IA,
  },
  {
    slug: "formacions-ia",
    group: "ia",
    name: "Formacions d'IA i màrqueting",
    prefix: "Formacions",
    suffix: "d'IA i màrqueting",
    short: "Equips que treuen partit a les eines digitals.",
    headline: "Formació pràctica perquè el teu equip ho faci sol.",
    intro:
      "Tallers presencials de màrqueting digital i d'intel·ligència artificial, adaptats al nivell de l'equip i amb casos reals del vostre sector: xarxes socials, Google, anuncis i eines d'IA per a la feina de cada dia.",
    image: `${A}/equip.jpg`,
    includes: [
      { title: "Diagnòstic inicial", text: "Analitzem on la IA pot aportar més a la teva empresa." },
      { title: "Tallers presencials", text: "Sessions pràctiques a les teves oficines o a les nostres." },
      { title: "Màrqueting digital", text: "Xarxes socials, Google i anuncis explicats de manera pràctica." },
      { title: "Eines d'IA", text: "Aprèn a fer servir Claude o ChatGPT amb criteri i seguretat." },
      { title: "Casos del teu sector", text: "Exercicis amb tasques reals del teu dia a dia." },
      { title: "Seguiment", text: "Resolem dubtes després de la formació perquè l'ús arreli." },
    ],
    tools: ["Claude", "ChatGPT", "Google Workspace", "Canva"],
    steps: STEPS_IA,
  },
];

export const SERVICE_GROUP_LABEL: Record<ServiceGroup, string> = {
  marketing: "Màrqueting i creativitat",
  ia: "Intel·ligència artificial",
};

export const serviceHref = (slug: string) => `/serveis/${slug}`;

export const findService = (slug: string) => services.find((s) => s.slug === slug);
