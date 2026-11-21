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
  /** La imatge ja és un muntatge (cartell, foto…): es mostra tal qual, sense portàtil */
  foto?: boolean;
  /** Fotos de la feina feta (fotografia, plats, rodatges…) */
  gallery?: { src: string; alt: string }[];
  /** Cas d'estudi (tot opcional: si no hi és, la pàgina fa servir textos per defecte) */
  /** Quin era el repte del client, en una o dues frases */
  repte?: string;
  /** Com ho hem resolt, en una o dues frases */
  enfoc?: string;
  /** Text propi per a un servei concret (clau = nom del servei, p. ex. "Web") */
  capitols?: Record<string, string>;
  /** Pantalles de disseny UX/UI (de Figma). format: "mobil" (pantalla de mòbil) o "web" (pàgina d'escriptori) */
  ux?: { src: string; alt: string; format?: "mobil" | "web" }[];
  /** Detalls destacats del projecte (funcionalitats concretes, amb captura) */
  destacats?: { etiqueta?: string; titol: string; text: string; imatge: string; alt: string; punts?: string[]; /** imatge sense marc de navegador (fotos, mockups) */ foto?: boolean }[];
  /** Color d'accent de la marca (si el que s'extreu de la captura no és bo) */
  color?: string;
  /** On és el client (si no hi és: "Andorra") */
  lloc?: string;
  /** Any del projecte */
  any?: string;
  /** Paleta pròpia de la marca (si no, s'extreu de la captura) */
  paleta?: string[];
  /** Arquitectura del web: cada branca del menú, què hi passa i les seves seccions */
  arquitectura?: { nom: string; text: string; seccions?: string[] }[];
  /** Tipografies del sistema de disseny */
  tipografies?: { nom: string; us: string; serif?: boolean }[];
  /** Captures de mòbil (es mostren dins d'un telèfon) */
  mobils?: { src: string; alt: string }[];
}

const P = "/assets/altitud/projectes";

const web = (url: string): ProjectLink => ({
  label: new URL(url).hostname.replace(/^www\./, ""),
  url,
});

const llista: Project[] = [
  {
    slug: "el-rato",
    lloc: "Andorra la Vella",
    color: "#d9572b",
    ux: [{ src: "/assets/altitud/projectes/ux/el-rato-1.webp", alt: "Disseny de la pàgina d'inici d'El Rato a Figma", format: "web" }, { src: "/assets/altitud/projectes/ux/el-rato-2.webp", alt: "Disseny de la pàgina Barre House d'El Rato", format: "web" }, { src: "/assets/altitud/projectes/ux/el-rato-3.webp", alt: "Disseny de la pàgina de tarifes d'El Rato", format: "web" }],
    name: "El Rato Barre House",
    sector: "Fitness i benestar",
    summary: "Web, xarxes socials i motor de reserves.",
    about: "El primer estudi boutique de barre d'Andorra, al carrer Antic Carrer Major d'Andorra la Vella. Web amb reserva de classes i compra de bons en línia, i gestió de les xarxes socials.",
    services: ["Web", "Xarxes socials", "Motor de reserves", "Disseny UX/UI"],
    links: [web("https://elratobarrehouse.com/")],
    image: `${P}/el-rato.jpg`,
  },
  {
    slug: "projecte-vida",
    lloc: "Andorra la Vella i Escaldes-Engordany",
    name: "Projecte Vida",
    sector: "Salut i prevenció",
    summary: "Campanya de publicitat exterior a Andorra la Vella i Escaldes-Engordany.",
    about: "Dues campanyes de cartells al carrer per a Projecte Vida, amb el Govern d'Andorra i el Comú d'Escaldes-Engordany: «El temps vola» (#modeavióandorra) i «L'addicció no té una cara concreta» (#trencalestigma).",
    services: ["Publicitat exterior"],
    links: [],
    image: `${P}/projecte-vida.jpg`,
    foto: true,
  },
  {
    slug: "espai-dor",
    lloc: "Andorra la Vella",
    color: "#c9a227",
    name: "Espai d'Or",
    sector: "Perruqueria i estètica",
    summary: "Web amb botiga online, chatbot amb IA que reserva cites i SEO.",
    about: "Perruqueria, barberia i estètica a Andorra la Vella, amb botiga online i un assistent amb IA que reserva cites.",
    services: ["Web", "Botiga online", "Chatbot amb IA", "SEO"],
    links: [web("https://espaidor.com/")],
    image: `${P}/espai-dor.jpg`,
  },
  {
    slug: "henkan",
    lloc: "La Massana",
    color: "#9a7452",
    ux: [{ src: "/assets/altitud/projectes/ux/henkan-1.webp", alt: "Disseny de la pàgina d'inici de Henkan a Figma", format: "web" }, { src: "/assets/altitud/projectes/ux/henkan-2.webp", alt: "Disseny de la pàgina de projectes de Henkan", format: "web" }, { src: "/assets/altitud/projectes/ux/henkan-3.webp", alt: "Disseny de la pàgina Nosaltres de Henkan", format: "web" }],
    name: "Henkan Spaces",
    sector: "Interiorisme",
    summary: "Web, fotografia i SEO.",
    about: "Estudi d'interiorisme a La Massana: dissenyen amb sentit i transformen amb encant.",
    services: ["Web", "Fotografia", "SEO", "Disseny UX/UI"],
    links: [web("https://henkan-spaces.com/")],
    image: `${P}/henkan.jpg`,
  },
  {
    slug: "enzo-poulat",
    lloc: "França",
    name: "Enzo Poulat Coaching",
    sector: "Entrenador personal",
    summary: "Web.",
    about: "Entrenador personal de força i rendiment, amb coaching en línia i presencial.",
    services: ["Web"],
    links: [web("https://enzopoulatcoaching.com/")],
    image: `${P}/enzo-poulat.jpg`,
  },
  {
    slug: "paula-ayet",
    name: "Paula Ayet Yoga",
    sector: "Ioga i mentoria",
    summary: "Web, arquitectura i disseny UX/UI.",
    about: "Professora de Jivamukti Yoga i mentora a Andorra: mentories per a professores de ioga, retirs, un curs online i un estudi creatiu.",
    repte: "La Paula no és només una professora de ioga: és mentora, organitza retirs a Andorra i a l'estranger, té un curs online i un estudi creatiu. Necessitava un web que ho expliqués tot sense perdre la calma que transmet ella.",
    enfoc: "Vam dissenyar-lo com una revista: una portada que fa d'índex, un sistema de colors on cada camí té el seu to, dues tipografies que conversen i molt d'aire. Tot pensat primer al mòbil, a Figma, abans d'escriure codi.",
    services: ["Web", "Disseny UX/UI"],
    color: "#e48fb5",
    any: "2026",
    capitols: {
      Web: "Un web a mida, ràpid i amb selector d'idioma, amb molt més que pàgines: landing per a cada retir, un curs online amb compra, una àrea privada per a les alumnes i un formulari que li arriba directe. Tot animat amb subtilesa: textos que apareixen línia a línia, marquesines i vídeo de fons.",
      "Disseny UX/UI": "Abans de programar res, vam dibuixar cada pantalla a Figma començant pel mòbil. L'objectiu: que qualsevol persona trobi en dos tocs el que busca, sigui una mentoria, un retir o una classe, i que en cap moment se senti dins d'una botiga.",
    },
    paleta: ["#e9ebd6", "#f5ef8f", "#45975f", "#937463", "#bcc9ce", "#b7a4e0", "#e095c0", "#101010"],
    tipografies: [
      { nom: "ABC Oracle", us: "Titulars, menú i text. Una grotesca neta i lleugera que deixa respirar la pàgina." },
      { nom: "ABC Otto", us: "Preguntes, programes i cursives. El to editorial i càlid de la marca.", serif: true },
    ],
    arquitectura: [
      { nom: "Inici", text: "Una portada que fa d'índex i guia cap a cada camí.", seccions: ["Índex de quatre mons", "Mentoria", "Sobre mi", "Tria el teu camí", "Retirs", "Contacte"] },
      { nom: "Mentorship", text: "Tres programes en acordió, cadascun amb el seu color.", seccions: ["Visionary Practice", "The Aligned CEO", "The Nest"] },
      { nom: "Retreats", text: "Calendari de retirs i una landing pròpia per a cada un.", seccions: ["Andorra", "Normandia", "Noruega", "Edicions passades"] },
      { nom: "Online", text: "Curs Daily Practice: tràiler, testimonis, pràctiques i compra.", seccions: ["Tràiler", "Testimonis", "7 pràctiques", "Compra"] },
      { nom: "AW!ARE", text: "L'estudi creatiu de la Paula: direcció creativa, foto i vídeo.", seccions: ["Galeria", "Serveis"] },
      { nom: "Login", text: "Àrea privada amb els programes, materials i vídeos de cada alumna.", seccions: ["Accés", "Programes", "Materials"] },
    ],
    destacats: [
      {
        etiqueta: "Portada",
        titol: "Un índex, no un bàner",
        text: "En lloc d'una gran foto amb un eslògan, la portada s'obre com l'índex d'una revista: quatre mons de la Paula, cadascun amb una imatge i dues etiquetes. Qui entra entén en un segon tot el que hi trobarà.",
        imatge: "/assets/altitud/projectes/detalls/paula-index.webp",
        alt: "Portada del web de Paula Ayet amb un índex de quatre seccions il·lustrades amb fotos",
        punts: ["About", "Online space", "Natural wonder", "AW!ARE studio"],
      },
      {
        etiqueta: "Missatge",
        titol: "Una frase, un botó",
        text: "Just després, el missatge principal sobre un degradat amb gra, com una foto analògica. Una marquesina anuncia que la mentoria és oberta i un sol botó porta a descobrir-la. Res més competeix per l'atenció.",
        imatge: "/assets/altitud/projectes/detalls/paula-mentoria.webp",
        alt: "Bloc de mentoria amb degradat rosa i verd, text gran i botó Descubre más",
        punts: ["Degradat amb gra", "Marquesina animada", "Una sola crida a l'acció"],
      },
      {
        etiqueta: "Sobre mi",
        titol: "To editorial",
        text: "La història de la Paula es llegeix com una entrevista: foto a mida completa, una línia d'etiquetes en versaletes i el titular que barreja cursiva serif i romana. És on més es nota el diàleg entre les dues tipografies.",
        imatge: "/assets/altitud/projectes/detalls/paula-sobre.webp",
        alt: "Secció Sobre mí amb foto de la Paula fent ioga i text amb titular en cursiva",
        punts: ["Serif + grotesca", "Foto protagonista", "Lectura còmoda"],
      },
      {
        etiqueta: "Pausa",
        titol: "Respira abans de triar",
        text: "Abans de demanar res, el web proposa una pausa: una papallona desenfocada que es mou lentament i una frase curta. És un detall pensat per a una marca de ioga, i funciona com a transició entre conèixer la Paula i triar un camí.",
        imatge: "/assets/altitud/projectes/detalls/paula-respira.webp",
        alt: "Papallona lila desenfocada amb el text Para un momento. Respira.",
        punts: ["Forma animada", "Microcopy amb intenció"],
      },
      {
        etiqueta: "Tria el teu camí",
        titol: "Sis preguntes, sis colors",
        text: "La navegació principal es converteix en preguntes: vols donar forma a la teva visió? Busques una comunitat? Vols uns dies per parar? Cada resposta té el seu color, i aquest color l'acompanya a la pàgina on porta. És el cor del sistema.",
        imatge: "/assets/altitud/projectes/detalls/paula-camins.webp",
        alt: "Sis franges de colors amb preguntes que porten a cada servei de Paula Ayet",
        punts: ["Navegació per intenció", "Color = camí"],
      },
      {
        etiqueta: "Mentorship",
        titol: "Tres programes, un acordió",
        text: "La pàgina de mentories obre amb un vídeo de muntanya i ordena els tres programes en un acordió de colors que es desplega. Així la persona compara sense perdre's i arriba directe a la mentoria que li toca.",
        imatge: "/assets/altitud/projectes/detalls/paula-visionary.webp",
        alt: "Pàgina Let's work together amb vídeo de muntanyes i acordió amb el programa Visionary Practice obert",
        punts: ["Vídeo de fons", "Acordió de colors", "Visionary Practice · Aligned CEO · The Nest"],
      },
      {
        etiqueta: "Retirs",
        titol: "Cada retir, en una fitxa",
        text: "Els retirs s'ordenen per data en franges desplegables. En obrir-ne una apareix una galeria lliscant, la descripció i el botó per anar a la landing. Les dates van en una càpsula blanca perquè es vegin d'un cop d'ull.",
        imatge: "/assets/altitud/projectes/detalls/paula-retirs.webp",
        alt: "Pàgina de retirs amb el retir d'Andorra obert, galeria de fotos i descripció",
        punts: ["Galeria amb fletxes", "Dates en càpsula", "Andorra · Normandia · Noruega"],
      },
      {
        etiqueta: "Edicions passades",
        titol: "El mateix patró, una altra història",
        text: "Les edicions anteriors reprenen el disseny de l'índex de la portada: foto al centre i el nom del lloc a cada costat. Repetir patrons fa que el web se senti coherent i que l'usuari ja sàpiga com llegir-lo.",
        imatge: "/assets/altitud/projectes/detalls/paula-edicions.webp",
        alt: "Llista d'edicions passades de retirs: Natsu, Empordà, Begur i Monells",
        punts: ["Patró reutilitzat", "Natsu · Empordà · Begur · Monells"],
      },
      {
        etiqueta: "Landing de retir",
        titol: "Between Breaths",
        text: "Cada retir té la seva pàgina de venda: capçalera partida entre una foto i un vídeo del llac, marquesina amb el nom de la marca i, a sota, tot el que cal per decidir: el programa, l'allotjament, el dia a dia, qui el guia i la informació pràctica.",
        imatge: "/assets/altitud/projectes/detalls/paula-between-breaths.webp",
        alt: "Landing del retir Between Breaths amb capçalera partida entre foto i vídeo d'un llac",
        punts: ["Capçalera foto + vídeo", "Programa", "Dia a dia", "Info pràctica"],
      },
      {
        etiqueta: "Allotjament",
        titol: "Informació clara, sense soroll",
        text: "Imatges a sang amb el títol en majúscules i, després, el detall en blocs numerats que es despleguen: tipus d'habitació, què inclou, com arribar. La informació hi és tota, però només apareix quan la busques.",
        imatge: "/assets/altitud/projectes/detalls/paula-allotjament.webp",
        alt: "Secció d'allotjament del retir amb foto de muntanyes nevades i blocs numerats",
        punts: ["Imatge a sang", "Blocs numerats", "Revelació progressiva"],
      },
      {
        etiqueta: "Curs online",
        titol: "Daily Practice",
        text: "El curs de set pràctiques es ven des del mateix web: tràiler, preu clar al botó, testimonis en targetes amb els colors de la marca i la llista de pràctiques amb durada i material. Tot el que necessita qui practica des de casa.",
        imatge: "/assets/altitud/projectes/detalls/paula-curs.webp",
        alt: "Testimonis del curs Daily Practice en targetes de colors amb fotos dels alumnes",
        punts: ["Compra directa", "Testimonis", "7 pràctiques"],
      },
      {
        etiqueta: "Àrea privada",
        titol: "Un espai per a les alumnes",
        text: "Les alumnes entren amb el seu compte i hi troben el programa, els materials i els vídeos. El formulari d'accés manté l'estètica del web: fons crema, camps grans i el mateix botó en degradat.",
        imatge: "/assets/altitud/projectes/detalls/paula-area-privada.webp",
        alt: "Finestra d'accés a l'àrea privada amb camps de correu i contrasenya",
        punts: ["Comptes d'alumna", "Programes i vídeos", "Recuperar contrasenya"],
      },
    ],
    mobils: [
      { src: "/assets/altitud/projectes/detalls/paula-mobil-index.webp", alt: "Portada del web de Paula Ayet al mòbil" },
      { src: "/assets/altitud/projectes/detalls/paula-mobil-camins.webp", alt: "Secció Tria el teu camí al mòbil" },
    ],
    ux: [{ src: "/assets/altitud/projectes/ux/paula-ayet-1.webp", alt: "Disseny mòbil de la pàgina d'inici de Paula Ayet Yoga a Figma", format: "mobil" }, { src: "/assets/altitud/projectes/ux/paula-ayet-2.webp", alt: "Disseny mòbil de la pàgina Let's work together", format: "mobil" }, { src: "/assets/altitud/projectes/ux/paula-ayet-3.webp", alt: "Disseny mòbil d'una pàgina de curs de Paula Ayet Yoga", format: "mobil" }],
    links: [web("https://www.paulaayet.com/")],
    image: `${P}/paula-ayet.jpg`,
  },
  {
    slug: "blue-ozone",
    lloc: "Escaldes-Engordany",
    name: "Blue Ozone",
    sector: "Clínica de longevitat",
    summary: "Web.",
    about: "Clínica mèdica de longevitat a Escaldes-Engordany, centrada en la prevenció: programes de salut, endocrinologia, exercici físic i estètica regenerativa.",
    services: ["Web"],
    links: [web("https://blueozone.net/")],
    image: `${P}/blue-ozone.jpg`,
  },
  {
    slug: "hostel-andes",
    lloc: "Escaldes-Engordany",
    name: "Hostel Andes",
    sector: "Alberg",
    summary: "Web.",
    about: "Alberg cèntric a Escaldes-Engordany, amb allotjament econòmic per a viatgers, esquiadors i temporers.",
    services: ["Web"],
    links: [web("https://www.hostelandes.com/")],
    image: `${P}/hostel-andes.jpg`,
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
    lloc: "Andorra la Vella",
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
    lloc: "Escaldes-Engordany",
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
    lloc: "Escaldes-Engordany",
    name: "La Llotja",
    sector: "Restauració",
    summary: "Web, vídeo i fotografia.",
    about: "Restaurant i peixateria a Escaldes-Engordany: tries el peix o el marisc fresc i te'l preparen al moment.",
    services: ["Web", "Vídeo", "Fotografia"],
    links: [web("https://lallotjarestaurant.com/")],
    image: `${P}/la-llotja.jpg`,
    gallery: [{ src: `${P}/galeria/la-llotja-musclos.jpg`, alt: "Musclos a la marinera servits en un plat negre a La Llotja" }],
  },
  {
    slug: "la-casa",
    lloc: "Andorra la Vella",
    name: "La Casa Gastrobar",
    sector: "Restauració",
    summary: "Web, fotografia, vídeo i motor de reserves.",
    about: "Gastrobar al cor del casc antic d'Andorra la Vella, amb cuina oberta i terrassa d'estiu.",
    services: ["Web", "Fotografia", "Vídeo", "Motor de reserves"],
    color: "#b89a5e",
    repte: "Un gastrobar amb ànima, en un edifici amb molta història al casc antic, i una cuina d'autor que mereixia ser vista. Calia un web que transmetés tot això i que omplís taules.",
    enfoc: "Vam explicar la història de la casa, vam fotografiar els plats i l'espai, i vam connectar un motor de reserves perquè reservar fos qüestió de segons.",
    capitols: {
      Fotografia: "Sessions a la cuina i a la sala: els plats del xef Ignacio Lostao, l'equip treballant i els racons del local. Imatges pròpies que fan venir gana i que es fan servir al web i a les xarxes.",
    },
    destacats: [
      {
        etiqueta: "Storytelling",
        titol: "La història de la casa",
        text: "L'Edifici Primavera, on abans els veïns compraven pa i dolços, és part del relat. Vam escriure la història de l'edifici amb fotos antigues, perquè qui reserva sàpiga que no és un restaurant qualsevol.",
        imatge: "/assets/altitud/projectes/detalls/lacasa-historia.webp",
        alt: "Secció El edificio del web de La Casa Gastrobar amb una fotografia antiga del carrer",
        punts: ["Història de l'edifici", "Fotografia d'arxiu", "Cuina d'autor catalana i andalusa"],
      },
      {
        etiqueta: "Fotografia gastronòmica",
        titol: "Plats que entren pels ulls",
        text: "Figues amb burrata, vieires, sopa de ceba gratinada… Cada plat fotografiat amb la llum del local, i també el xef i l'equip a la cuina oberta.",
        imatge: "/assets/altitud/projectes/detalls/lacasa-plats.webp",
        alt: "Mosaic de fotografies de plats, de la cuina i del xef de La Casa Gastrobar",
        punts: ["Plats de la carta", "Equip i cuina oberta", "Ambient de sala"],
      },
      {
        etiqueta: "Motor de reserves",
        titol: "Reservar en tres clics",
        text: "Calendari, comensals i hora, dins del mateix web i amb el disseny de La Casa. El client tria dinar o sopar, veu les hores lliures i confirma, sense trucar.",
        imatge: "/assets/altitud/projectes/detalls/lacasa-reserves.webp",
        alt: "Motor de reserves integrat al web de La Casa Gastrobar amb calendari i hores de dinar i sopar",
        punts: ["Dinar i sopar", "Hores lliures en temps real", "Integrat al web"],
      },
    ],
    links: [web("https://lacasa-andorra.com/")],
    image: `${P}/la-casa.jpg`,
  },
  {
    slug: "claudia-moncau",
    lloc: "Barcelona",
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
    lloc: "Santa Coloma, Andorra la Vella",
    color: "#3f6b3a",
    name: "Auró Jardiners",
    sector: "Jardineria",
    summary: "Web, SEO i xarxes socials.",
    about: "Empresa de jardineria a Andorra: disseny, construcció i manteniment d'espais verds.",
    services: ["Web", "SEO", "Xarxes socials"],
    repte: "Un centre de jardineria amb més d'un centenar d'espècies i obres arreu del país, però amb una web que no ho ensenyava. Volien que el client pogués consultar les plantes des de casa i veure la feina que fan cada dia.",
    enfoc: "Vam convertir el web en una eina: una biblioteca de plantes amb fitxa per a cada espècie i una secció de projectes que explica les obres, fins i tot fase a fase.",
    capitols: {
      Web: "Hem redissenyat el web d'Auró perquè faci de botiga i d'aparador alhora: biblioteca de plantes, botiga online, serveis i un portfoli d'obres reals per parròquia.",
    },
    destacats: [
      {
        etiqueta: "Biblioteca de plantes",
        titol: "113 espècies, a un clic",
        text: "Una cosa poc habitual en un centre de jardineria d'Andorra: tot el catàleg viu, consultable des del mòbil. Cada planta té la seva imatge, nom comú i científic, i es pot filtrar entre exterior i interior o buscar pel nom.",
        imatge: "/assets/altitud/projectes/detalls/auro-cataleg.webp",
        alt: "Biblioteca de plantes del web d'Auró Jardiners amb una graella de plantes en test",
        punts: ["Filtres exterior / interior", "Cercador instantani", "Nom comú i científic"],
      },
      {
        etiqueta: "Fitxa de cada planta",
        titol: "Tot el que cal saber abans de comprar",
        text: "En clicar una planta s'obre la seva fitxa: descripció, alçada, floració, sol, reg, resistència al fred i creixement, amb consells de cura. I un botó per demanar-la directament per WhatsApp.",
        imatge: "/assets/altitud/projectes/detalls/auro-fitxa.webp",
        alt: "Fitxa del cirerer japonès al web d'Auró Jardiners amb dades de cultiu i consells de cura",
        punts: ["Alçada, floració, sol i reg", "Resistència al fred", "Consells de cura", "Consulta per WhatsApp"],
      },
      {
        etiqueta: "Projectes",
        titol: "La feina del dia a dia, explicada",
        text: "Parcs, places, jardins privats i cobertes vegetals de tot Andorra, cadascun amb la seva fitxa: on és, què s'hi ha fet i les fotos de l'obra. Les obres en marxa també hi surten.",
        imatge: "/assets/altitud/projectes/detalls/auro-projectes.webp",
        alt: "Pàgina de projectes del web d'Auró Jardiners amb obres a Encamp i Andorra la Vella",
        punts: ["Obres públiques i privades", "Localització de cada obra", "Projectes en curs"],
      },
      {
        etiqueta: "Línia del temps",
        titol: "Una obra, fase a fase",
        text: "Per a les obres llargues, com els jardins de Casa de la Vall, hem creat una línia del temps: el client i els veïns poden seguir l'evolució des del moviment de terres fins al resultat final.",
        imatge: "/assets/altitud/projectes/detalls/auro-timeline.webp",
        alt: "Línia del temps de l'obra dels jardins de Casa de la Vall al web d'Auró Jardiners",
        punts: ["Fases amb data i estat", "Galeria de cada fase", "S'actualitza a mesura que avança l'obra"],
      },
    ],
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
    lloc: "Escaldes-Engordany",
    ux: [{ src: "/assets/altitud/projectes/ux/brainworks-1.webp", alt: "Disseny mòbil de la pàgina de serveis de Brainworks a Figma", format: "mobil" }, { src: "/assets/altitud/projectes/ux/brainworks-2.webp", alt: "Disseny mòbil del blog de Brainworks", format: "mobil" }, { src: "/assets/altitud/projectes/ux/brainworks-3.webp", alt: "Disseny mòbil de la pàgina de contacte de Brainworks", format: "mobil" }],
    name: "Brainworks Center",
    sector: "Salut i benestar",
    summary: "Web, xarxes socials i identitat corporativa.",
    about: "Centre d'Andorra per entrenar el cervell i millorar el benestar i el rendiment.",
    services: ["Web", "Xarxes socials", "Identitat corporativa", "Disseny UX/UI"],
    links: [web("https://brainworkscenter.com/")],
    image: `${P}/brainworks.jpg`,
  },
  {
    slug: "farmacia-guitart",
    name: "Farmàcia Guitart",
    sector: "Farmàcia",
    summary: "Web amb botiga en línia i identitat corporativa.",
    about: "Farmàcia i parafarmàcia amb botiga en línia i consell farmacèutic.",
    services: ["Web", "Botiga online", "Identitat corporativa"],
    color: "#1f5134",
    repte: "La farmàcia tenia un logo genèric, una creu vermella com la de qualsevol altra. Volien una marca pròpia, que transmetés confiança i proximitat i que es pogués aplicar a tot: rètol, bates, bosses i botiga online.",
    enfoc: "Vam crear una G que amaga una creu de farmàcia, en un verd profund i elegant, i la vam portar a tots els suports.",
    destacats: [
      {
        etiqueta: "El canvi",
        titol: "D'una creu qualsevol a una marca pròpia",
        text: "La nova G integra la creu de farmàcia dins la inicial de Guitart: es reconeix d'un cop d'ull i no es confon amb cap altra. El verd substitueix el vermell per transmetre calma, salut i confiança.",
        imatge: "/assets/altitud/projectes/detalls/guitart-abans-despres.webp",
        alt: "Logotip antic de la Farmàcia Guitart, una creu vermella de punts, al costat del logotip nou amb la G verda",
        foto: true,
        punts: ["Símbol propi", "Verd corporatiu", "Tipografia neta i espaiada"],
      },
      {
        etiqueta: "Al punt de venda",
        titol: "La marca, dins la farmàcia",
        text: "El logotip en volum darrere el taulell, i la marca aplicada a les bates, les bosses, les targetes i els necessers: tot parla el mateix idioma.",
        imatge: "/assets/altitud/projectes/detalls/guitart-retol.webp",
        alt: "Taulell de la Farmàcia Guitart amb el logotip verd a la paret, una bata, una bossa, una targeta i un neceser amb la marca",
        foto: true,
        punts: ["Rètol en volum", "Bates i uniformes", "Neceser i bossa"],
      },
      {
        etiqueta: "Papereria i packaging",
        titol: "Cada peça parla igual",
        text: "Bosses, carpeta, targetes, sobres, caixes i etiquetes amb el mateix sistema: el símbol sol sobre verd, o la marca completa sobre crema.",
        imatge: "/assets/altitud/projectes/detalls/guitart-papereria.webp",
        alt: "Papereria i packaging de la Farmàcia Guitart: bossa, carpeta, targetes, sobres, caixa i pot amb el logotip",
        foto: true,
        punts: ["Bossa i carpeta", "Targetes i sobres", "Caixes i etiquetes"],
      },
    ],
    links: [web("https://farmaciaguitart.com/")],
    image: `${P}/farmacia-guitart.jpg`,
  },
  {
    slug: "hotel-niu",
    lloc: "Encamp",
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
    lloc: "La Massana",
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
    lloc: "Canillo",
    name: "Olympus Race",
    sector: "Esdeveniments esportius",
    summary: "Web i SEO.",
    about: "La cursa d'obstacles d'Andorra, al cor de Canillo.",
    services: ["Web", "SEO"],
    links: [web("https://olympusrace.com/")],
    image: `${P}/olympus-race.jpg`,
  },
];

/** Projectes per ordre alfabètic */
export const projects: Project[] = [...llista].sort((a, b) => a.name.localeCompare(b.name, "ca", { sensitivity: "base" }));

export const projectHref = (slug: string) => `/projectes/${slug}`;

export const findProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectNeighbours = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
};
