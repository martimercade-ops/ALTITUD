/**
 * Blog en català: guies per a empreses d'Andorra.
 * L'article "pilar" de màrqueting de continguts té ruta pròpia (/marqueting-de-continguts-andorra).
 */
export interface ArticleCa {
  slug: string;
  /** Ruta pròpia (si no, /blog/slug) */
  ruta?: string;
  title: string;
  description: string;
  h1: string;
  date: string;
  minuts: number;
  categoria: string;
  intro: string;
  seccions: { h2: string; p: string[]; li?: string[] }[];
  crida: { href: string; label: string };
  faqs?: { q: string; a: string }[];
}

export const articlesCa: ArticleCa[] = [
  {
    slug: "marqueting-de-continguts-andorra",
    ruta: "/marqueting-de-continguts-andorra",
    title: "Màrqueting de continguts a Andorra: agència, estratègia i exemples | Altitud Digital",
    description:
      "Agència de màrqueting de continguts a Andorra: blog, SEO, reels, vídeo i newsletters en català, castellà i francès. Com fer contingut que porta clients i qui us hi pot ajudar.",
    h1: "Màrqueting de continguts a Andorra: com fer que el teu contingut porti clients",
    date: "2026-11-26",
    minuts: 8,
    categoria: "Màrqueting de continguts",
    intro:
      "El màrqueting de continguts és crear articles, vídeos, reels, guies o newsletters que responen el que busquen els teus clients, perquè et trobin a Google, a les xarxes i a la IA. A Altitud Digital ho fem cada dia per a empreses de totes les parròquies, en català, castellà i francès.",
    seccions: [
      {
        h2: "Què és el màrqueting de continguts (i què no ho és)",
        p: [
          "No és publicar per publicar. És tenir un pla: saber què pregunta el teu client abans de comprar i respondre-ho millor que ningú, al lloc on ho busca. Un article que explica quant costa reformar un pis a Andorra, un reel que ensenya com treballes o una guia sobre els ajuts PDE són contingut que ven sense semblar publicitat.",
          "La diferència amb la publicitat és que el contingut es queda. Un bon article pot portar visites durant anys; un anunci deixa de funcionar el dia que deixes de pagar.",
        ],
      },
      {
        h2: "Per què a Andorra funciona tan bé",
        p: [
          "A Andorra hi ha poca competència en contingut de qualitat i molta cerca en tres o quatre idiomes. Això vol dir que una empresa que publica bé en català, castellà i francès pot ocupar les primeres posicions molt més ràpid que a Barcelona o Tolosa.",
          "A més, el client andorrà compra per confiança. Veure qui hi ha darrere, com treballes i què opinen altres clients pesa més que qualsevol eslògan.",
        ],
      },
      {
        h2: "Els formats que més resultats donen",
        p: ["No cal fer-ho tot. Triem els formats segons el teu sector i el teu client:"],
        li: [
          "Articles de blog i guies pensades per a Google i per a la IA (ChatGPT, Gemini, Perplexity).",
          "Reels i vídeos curts per a Instagram i TikTok, gravats per nosaltres.",
          "Fitxes i casos d'èxit que demostren el que fas, amb fotos reals.",
          "Newsletters per mantenir el contacte amb qui ja et coneix.",
          "Contingut per a Google Maps: fotos, publicacions i respostes a ressenyes.",
        ],
      },
      {
        h2: "Com ho fem a Altitud Digital",
        p: [
          "Seguim el nostre mètode de quatre fases. Primer fem el diagnòstic: què busca la gent del teu sector i què fa la teva competència a Andorra. Després definim l'estratègia: temes, formats, idiomes i calendari. A l'execució escrivim, gravem i publiquem nosaltres. I als resultats mesurem visites, posicions i contactes cada mes per ajustar.",
          "Ho combinem amb [SEO](/serveis/seo-sem), [xarxes socials](/serveis/xarxes-socials) i [vídeo](/serveis/audiovisual), perquè el contingut no es quedi en un calaix: ha d'arribar a la gent.",
        ],
      },
      {
        h2: "Errors que veiem sovint",
        p: ["Aquests són els motius més habituals pels quals el contingut no funciona:"],
        li: [
          "Escriure només sobre l'empresa en lloc de respondre preguntes del client.",
          "Publicar només en un idioma quan els clients en parlen tres.",
          "Copiar textos d'altres webs o fer-los amb IA sense revisar: Google ho detecta.",
          "No mesurar res i no saber quin contingut porta contactes.",
          "Començar amb força i deixar-ho al cap de dos mesos.",
        ],
      },
      {
        h2: "Quant costa",
        p: [
          "Depèn de quants continguts vols al mes i de quins formats. Hi ha empreses que comencen amb dos articles al mes i d'altres que combinen articles, reels i newsletter. T'ho pressupostem sense compromís després d'una primera reunió, i si la teva empresa encaixa, part de la inversió pot entrar als [ajuts PDE](/ajuts-pde).",
        ],
      },
    ],
    crida: { href: "/parlem", label: "Demana el teu pla de continguts" },
    faqs: [
      { q: "Què fa una agència de màrqueting de continguts?", a: "Planifica, crea i publica contingut útil (articles, vídeos, reels, newsletters) perquè la teva empresa aparegui a Google, a les xarxes i a la IA quan els teus clients busquen el que vens." },
      { q: "En quant de temps es veuen resultats?", a: "A les xarxes, de seguida. A Google, normalment entre tres i sis mesos, segons la competència del sector. A Andorra sol anar més ràpid perquè hi ha menys contingut de qualitat." },
      { q: "Feu contingut en diversos idiomes?", a: "Sí. Escrivim en català, castellà i francès, i en anglès si cal." },
      { q: "Puc fer el contingut jo i que vosaltres el reviseu?", a: "Sí. Podem fer només l'estratègia i la revisió, o encarregar-nos de tot." },
    ],
  },
  {
    slug: "com-triar-agencia-marketing-digital-andorra",
    title: "Com triar una agència de màrqueting digital a Andorra (guia 2026) | Altitud Digital",
    description:
      "Què has de mirar abans de contractar una agència de màrqueting digital a Andorra: resultats, equip, idiomes, preus, contractes i preguntes clau per no equivocar-te.",
    h1: "Com triar una agència de màrqueting digital a Andorra",
    date: "2026-11-26",
    minuts: 6,
    categoria: "Agència",
    intro:
      "Hi ha moltes agències i freelances que ofereixen màrqueting a Andorra. Aquesta és la llista del que miraríem nosaltres si haguéssim de contractar-ne una.",
    seccions: [
      {
        h2: "1. Que ensenyi feina real a Andorra",
        p: [
          "Demana webs, comptes de xarxes i campanyes de clients que puguis visitar. Si una agència no pot ensenyar res fet aquí, no coneix el mercat: els horaris, els idiomes, la temporada d'hivern o com compra el client andorrà.",
        ],
      },
      {
        h2: "2. Que sàpiga qui farà la feina",
        p: [
          "Pregunta qui escriurà, qui gravarà i qui portarà els anuncis. Hi ha agències que ho subcontracten tot fora. Un equip a prop vol dir reunions en persona, rapidesa i algú que coneix el teu negoci.",
        ],
      },
      {
        h2: "3. Que treballi en diversos idiomes",
        p: [
          "A Andorra el client busca en català, castellà, francès i, segons el sector, en anglès. Una estratègia en un sol idioma deixa diners sobre la taula.",
        ],
      },
      {
        h2: "4. Que parli de resultats, no de likes",
        p: ["Els informes han de dir coses que importen al teu negoci:"],
        li: [
          "Quants contactes, trucades o reserves has rebut.",
          "En quina posició surts a Google per a les cerques importants.",
          "Quant et costa cada client que arriba amb publicitat.",
        ],
      },
      {
        h2: "5. Que el contracte sigui clar",
        p: [
          "Mira la permanència, de qui són els comptes i la web, i què passa si ho deixes. Els comptes de Google, Meta i el domini han de ser sempre teus.",
        ],
      },
      {
        h2: "6. Que t'ajudi amb els ajuts",
        p: [
          "Si vas a fer web, botiga online, SEO o IA, pregunta si és proveïdor del Programa de Digitalització d'Empreses. Et pot cobrir entre el 30% i el 50% del cost: ho expliquem a la nostra [pàgina dels ajuts PDE](/ajuts-pde).",
        ],
      },
      {
        h2: "Per què Altitud Digital",
        p: [
          "Som un equip jove d'Andorra la Vella que ha treballat per a més de cent empreses de totes les parròquies. Fem web, xarxes, SEO, publicitat, vídeo i IA amb el mateix equip, i ens trobaràs a l'oficina del carrer Ciutat de Valls. Pots veure la nostra feina a [projectes](/projectes).",
        ],
      },
    ],
    crida: { href: "/parlem", label: "Parlem del teu projecte" },
    faqs: [
      { q: "Quant costa una agència de màrqueting a Andorra?", a: "Depèn dels serveis. Una gestió de xarxes sol anar de pocs centenars a més de mil euros al mes, i una web es pressuposta per projecte. Demana sempre un pressupost tancat." },
      { q: "És millor una agència o un freelance?", a: "Un freelance pot anar bé per a una sola tasca. Si necessites web, xarxes, vídeo i anuncis alhora, una agència et dona un equip coordinat amb un sol interlocutor." },
    ],
  },
  {
    slug: "posicionament-seo-andorra",
    title: "Posicionament SEO a Andorra: com sortir primer a Google (guia pràctica) | Altitud Digital",
    description:
      "Guia de posicionament SEO per a empreses d'Andorra: SEO local i Google Maps, cerques en quatre idiomes, SEO tècnic, contingut i enllaços. Què pots fer tu i què fem nosaltres.",
    h1: "Posicionament SEO a Andorra: com sortir primer a Google",
    date: "2026-11-26",
    minuts: 7,
    categoria: "SEO",
    intro:
      "Sortir primer a Google a Andorra és més assequible que en un mercat gran, però cal fer bé quatre coses. T'expliquem quines.",
    seccions: [
      {
        h2: "SEO local: Google Maps primer",
        p: [
          "Quan algú busca «restaurant a Escaldes» o «gestoria Andorra la Vella», el primer que veu és el mapa. Per sortir-hi cal la fitxa de Google Business completa, fotos reals, horaris correctes i, sobretot, ressenyes recents. Respondre-les totes també compta.",
        ],
      },
      {
        h2: "Una pàgina per a cada cerca i cada idioma",
        p: [
          "Google no posiciona webs, posiciona pàgines. Si vols sortir per «disseny web Andorra» i per «diseño web Andorra», necessites una pàgina pensada per a cada cerca, ben escrita en cada idioma, no una traducció automàtica.",
        ],
      },
      {
        h2: "SEO tècnic: una web ràpida i neta",
        p: ["Aquests punts els revisem a totes les webs que fem:"],
        li: [
          "Que carregui ràpid, també al mòbil.",
          "Títols i descripcions únics a cada pàgina.",
          "Dades estructurades (empresa, ressenyes, preguntes freqüents).",
          "Sitemap enviat a Search Console i sense errors d'indexació.",
          "Accés obert als cercadors d'IA com ChatGPT i Perplexity.",
        ],
      },
      {
        h2: "Contingut que respon preguntes",
        p: [
          "Les guies i articles que responen el que pregunten els teus clients són el que més posicions guanya amb el temps. És el que anomenem [màrqueting de continguts](/marqueting-de-continguts-andorra).",
        ],
      },
      {
        h2: "Enllaços des d'altres webs",
        p: [
          "Que altres webs d'Andorra parlin de tu i t'enllacin (premsa, associacions, proveïdors, clients) és un dels senyals més forts per a Google. Millor pocs i de qualitat que molts i dolents.",
        ],
      },
      {
        h2: "Quant triga",
        p: [
          "Les primeres millores es veuen en setmanes, i les posicions difícils, entre tres i sis mesos. Si vols que ho portem nosaltres, mira el nostre [servei de SEO](/serveis/seo-sem).",
        ],
      },
    ],
    crida: { href: "/serveis/seo-sem", label: "Veure el servei de SEO" },
    faqs: [
      { q: "Quant costa el SEO a Andorra?", a: "Depèn del sector i de la competència. Hi ha projectes puntuals d'optimització i serveis mensuals. Fem un diagnòstic gratuït abans de pressupostar." },
      { q: "El SEO entra als ajuts PDE?", a: "Sí, el posicionament web (SEO i SEM) és una de les solucions del PDE, amb un 30% d'ajut fins a 500 €." },
    ],
  },
  {
    slug: "xarxes-socials-empreses-andorra",
    title: "Xarxes socials per a empreses a Andorra: què publicar i on (guia) | Altitud Digital",
    description:
      "Instagram, TikTok, Facebook o LinkedIn? Què publicar, cada quan i en quins idiomes perquè les xarxes socials portin clients a una empresa d'Andorra.",
    h1: "Xarxes socials per a empreses a Andorra: què publicar i on",
    date: "2026-11-26",
    minuts: 6,
    categoria: "Xarxes socials",
    intro:
      "Gestionem les xarxes de restaurants, immobiliàries, centres d'estètica, botigues i despatxos d'Andorra. Això és el que hem après.",
    seccions: [
      {
        h2: "On ha de ser la teva empresa",
        p: ["No cal ser a totes. Depèn de qui és el teu client:"],
        li: [
          "Instagram: imprescindible per a restauració, estètica, comerç, immobiliàries i turisme.",
          "TikTok: per arribar a públic jove i a turistes que planifiquen el viatge.",
          "Facebook: encara útil per a públic més gran i per als anuncis.",
          "LinkedIn: per a despatxos, consultories i empreses que venen a altres empreses.",
        ],
      },
      {
        h2: "El reel és el rei",
        p: [
          "Els vídeos curts són el format que més abast dona. No cal una gran producció: un reel ben pensat, amb un bon ganxo els primers segons i gravat al teu local, funciona millor que un disseny perfecte.",
        ],
      },
      {
        h2: "Cada quan publicar",
        p: [
          "La constància importa més que la quantitat. Dos o tres publicacions setmanals sostingudes durant mesos donen més resultat que deu en una setmana i res el mes següent.",
        ],
      },
      {
        h2: "Idiomes",
        p: [
          "A Andorra és habitual combinar català, castellà i francès. Es pot fer amb subtítols, amb textos a la descripció o alternant publicacions segons el públic de cada campanya.",
        ],
      },
      {
        h2: "Xarxes i publicitat, de la mà",
        p: [
          "El contingut orgànic genera confiança i la publicitat a Meta fa que arribi a qui toca, a Andorra i a la frontera. Junts, multipliquen els resultats. Ho expliquem al nostre [servei de xarxes socials](/serveis/xarxes-socials).",
        ],
      },
    ],
    crida: { href: "/serveis/xarxes-socials", label: "Veure el servei de xarxes" },
  },
  {
    slug: "intel-ligencia-artificial-empreses-andorra",
    title: "Intel·ligència artificial per a empreses d'Andorra: usos reals i ajuts | Altitud Digital",
    description:
      "Com fan servir la IA les empreses d'Andorra: xatbots que reserven cites, automatitzacions, estoc amb IA i formacions. Exemples reals i com finançar-ho amb el PDE.",
    h1: "Intel·ligència artificial per a empreses d'Andorra: usos reals",
    date: "2026-11-26",
    minuts: 6,
    categoria: "IA",
    intro:
      "La IA ja no és cosa de grans empreses. Aquests són usos que hem posat en marxa en negocis d'Andorra i que estalvien hores cada setmana.",
    seccions: [
      {
        h2: "Xatbots que atenen i reserven",
        p: [
          "Un xatbot ben entrenat respon dubtes a la web, a WhatsApp o a Instagram a qualsevol hora, en diversos idiomes, i pot reservar cites o passar el contacte a l'equip. Ho fem amb els nostres [xatbots amb IA](/serveis/chatbots-ia).",
        ],
      },
      {
        h2: "Automatitzacions que estalvien feina",
        p: ["Algunes de les que més demanen els nostres clients:"],
        li: [
          "Contactes de la web que entren directament al CRM.",
          "Respostes automàtiques a correus i missatges freqüents.",
          "Informes setmanals que es fan sols.",
          "Control d'estoc amb IA per a botigues.",
        ],
      },
      {
        h2: "Formació per al teu equip",
        p: [
          "La IA dona el màxim quan l'equip la sap fer servir. Fem [formacions d'IA](/serveis/formacions-ia) pràctiques, adaptades a la feina de cada empresa.",
        ],
      },
      {
        h2: "Ajuts per a la IA",
        p: [
          "La intel·ligència artificial és la solució més demanada del Programa de Digitalització d'Empreses, amb un 50% d'ajut fins a 3.000 €. T'ho expliquem tot a la [pàgina dels ajuts PDE](/ajuts-pde).",
        ],
      },
    ],
    crida: { href: "/serveis/ia-automatitzacions", label: "Veure el servei d'IA" },
  },
];

export const articleCaHref = (a: ArticleCa) => a.ruta ?? `/blog/${a.slug}`;
export const findArticleCa = (slug: string) => articlesCa.find((a) => a.slug === slug);
