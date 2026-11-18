import type { LegalSection } from "@/views/legal/legal-document";

export interface LegalPage {
  slug: string;
  href: string;
  /** Nom curt per a les pestanyes i el peu */
  short: string;
  title: string;
  intro: string;
  sections: readonly LegalSection[];
}

export const LEGAL_UPDATED = "Darrera actualització: 18 de novembre de 2026";

/** Dades del titular */
export const TITULAR = {
  name: "Altitud Digital",
  nrt: "F-222591-D",
  address: "Carrer Roureda de Sansa, 30, 4t 3a, AD500 Andorra la Vella (Principat d'Andorra)",
  office: "Carrer Ciutat de Valls, 24, AD500 Andorra la Vella",
  email: "info@altitudigital.com",
  phone: "+376 670 222",
  web: "altitudigital.com",
};

const T = TITULAR;

export const avisLegal: LegalPage = {
  slug: "avis-legal",
  href: "/avis-legal",
  short: "Avís legal",
  title: "Avís legal",
  intro:
    "Aquest avís regula l'accés i l'ús del web altitudigital.com. Navegar-hi implica acceptar-ne les condicions.",
  sections: [
    {
      heading: "Titular del web",
      body: [
        `Titular: ${T.name}.`,
        `NRT: ${T.nrt}.`,
        `Domicili: ${T.address}.`,
        `Oficina d'atenció al client: ${T.office}.`,
        `Contacte: ${T.email} · ${T.phone}.`,
      ],
    },
    {
      heading: "Objecte del web",
      body: [
        "Aquest web presenta els serveis d'Altitud Digital: desenvolupament web i e-commerce, SEO, SEM i publicitat digital, xarxes socials, producció audiovisual, branding i disseny gràfic, intel·ligència artificial, automatitzacions i formació.",
        "El contingut és informatiu i no constitueix una oferta vinculant. Les condicions de cada servei es fixen en el pressupost o contracte corresponent.",
        "La informació sobre ajuts públics, com el Programa de Digitalització d'Empreses (PDE), és orientativa. Les condicions, els imports i els terminis vigents són els que publiqui el Govern d'Andorra en cada convocatòria, i la concessió de l'ajut depèn de l'organisme que el gestiona.",
      ],
    },
    {
      heading: "Propietat intel·lectual i industrial",
      body: [
        "Els textos, el logotip, el disseny, les fotografies i els vídeos del web pertanyen a Altitud Digital o als seus titulars, i no es poden reproduir, distribuir ni transformar sense autorització.",
        "Tampoc es permet copiar-los o extreure'ls amb eines automatitzades (scraping, clonadors de webs o robots) ni fer-los servir per entrenar sistemes d'intel·ligència artificial: ens reservem expressament aquests usos, inclosa la mineria de textos i dades.",
        "Les marques, els logotips i els treballs de clients que s'hi mostren pertanyen als seus propietaris i s'hi inclouen amb finalitat de portafoli.",
      ],
    },
    {
      heading: "Ús del web",
      body: [
        "T'has de comprometre a fer servir el web de manera lícita, sense fer res que en pugui danyar el funcionament o la seguretat, i a no enviar dades falses o de tercers sense el seu consentiment a través dels formularis.",
      ],
    },
    {
      heading: "Responsabilitat",
      body: [
        "Procurem que la informació sigui correcta i que el web estigui disponible, però no podem garantir que no hi hagi errors o interrupcions. Els resultats de casos anteriors no garanteixen resultats futurs.",
        "El web pot contenir enllaços i continguts de tercers, com Google Maps o les xarxes socials. No som responsables del seu contingut ni de les seves polítiques.",
      ],
    },
    {
      heading: "Llei aplicable i jurisdicció",
      body: [
        "Aquestes condicions es regeixen per la legislació del Principat d'Andorra. Per a qualsevol conflicte, i sempre que la llei ho permeti, són competents els batllies i tribunals d'Andorra.",
      ],
    },
  ],
};

export const privacyPolicy: LegalPage = {
  slug: "privacy-policy",
  href: "/privacy-policy",
  short: "Privacitat",
  title: "Política de privacitat",
  intro:
    "Aquesta política explica quines dades personals tractem quan visites aquest web o ens contactes, per a què les fem servir i quins drets tens, d'acord amb la Llei 29/2021, del 28 d'octubre, qualificada de protecció de dades personals del Principat d'Andorra.",
  sections: [
    {
      heading: "Responsable del tractament",
      body: [
        `${T.name}, amb NRT ${T.nrt} i domicili a ${T.address}.`,
        `Per a qualsevol qüestió sobre les teves dades pots escriure'ns a ${T.email}.`,
      ],
    },
    {
      heading: "Quines dades tractem",
      body: [
        "Formularis de contacte i de pressupost: nom, cognoms, correu electrònic, telèfon, web de l'empresa, serveis que t'interessen, inversió orientativa i el missatge que ens escriguis.",
        "Llista d'espera dels ajuts PDE: nom, empresa, correu electrònic, telèfon, les solucions que hagis triat i el comentari opcional.",
        "Dades tècniques: el servidor on s'allotja el web registra informació habitual de cada visita, com l'adreça IP, el navegador, la pàgina demanada i la data i l'hora.",
        "Et demanem que no ens enviïs dades especialment protegides (com dades de salut) a través dels formularis.",
      ],
    },
    {
      heading: "Per a què les fem servir i amb quina base",
      body: [
        "Respondre la teva consulta, preparar-te un pressupost i, si ens contractes, prestar-te el servei. Base: la teva sol·licitud i, si escau, el contracte.",
        "Avisar-te quan s'obri una nova convocatòria del PDE i ajudar-te a preparar la sol·licitud. Base: el teu consentiment en apuntar-te a la llista d'espera.",
        "Enviar-te novetats, casos d'èxit i consells de màrqueting, només si ho marques expressament al formulari. Base: el teu consentiment, que pots retirar en qualsevol moment.",
        "Mantenir el web segur i en funcionament. Base: el nostre interès legítim.",
        "No venem les teves dades ni prenem decisions automatitzades que et puguin afectar.",
      ],
    },
    {
      heading: "Amb qui compartim les dades",
      body: [
        "Només amb els proveïdors que necessitem per funcionar, que les tracten per compte nostre i amb les garanties adequades: l'allotjament del web (Hostinger) i el correu electrònic (Google Workspace).",
        "No cedim dades a altres tercers, tret que una llei ens hi obligui. Si algun proveïdor tracta dades fora d'Andorra, ho fem amb les garanties que exigeix la normativa per a les transferències internacionals.",
      ],
    },
    {
      heading: "Quant de temps les conservem",
      body: [
        "Consultes i pressupostos: el temps necessari per respondre-les i fer-ne el seguiment, i com a màxim dos anys si no esdevenen un encàrrec.",
        "Llista d'espera del PDE: fins que es resolgui la convocatòria següent o fins que ens demanis sortir-ne.",
        "Clients: mentre duri la relació i, després, durant els terminis que marqui la llei.",
        "Newsletter: fins que et donis de baixa.",
      ],
    },
    {
      heading: "Ressenyes de Google",
      body: [
        "Les opinions que mostrem, amb el nom públic, la foto de perfil i el text, provenen de la nostra fitxa pública de Google. Si n'ets l'autor i vols que la retirem d'aquest web, escriu-nos i ho farem.",
      ],
    },
    {
      heading: "Els teus drets",
      body: [
        `Pots demanar l'accés a les teves dades, rectificar-les, suprimir-les, oposar-te al tractament, limitar-lo o sol·licitar-ne la portabilitat, i retirar el consentiment que ens hagis donat, escrivint a ${T.email}. Et respondrem en el termini que fixa la llei.`,
        "Si consideres que no hem atès correctament la teva sol·licitud, pots presentar una reclamació davant l'Agència Andorrana de Protecció de Dades (APDA).",
      ],
    },
    {
      heading: "Galetes",
      body: [
        "Sobre les galetes i l'emmagatzematge que fa servir el web, consulta la política de galetes.",
      ],
    },
  ],
};

export const cookiePolicy: LegalPage = {
  slug: "politica-de-galetes",
  href: "/politica-de-galetes",
  short: "Galetes",
  title: "Política de galetes",
  intro:
    "Les galetes (cookies) són petits fitxers que un web desa al teu navegador. Aquest web en fa servir molt poques: cap d'analítica ni de publicitat.",
  sections: [
    {
      heading: "Galetes necessàries",
      body: [
        "Són imprescindibles perquè el web funcioni i no es poden desactivar. No identifiquen la teva persona.",
        "cookie-consent-v1 (emmagatzematge local del navegador, propi): recorda la teva elecció sobre les galetes. Es conserva fins que l'esborris.",
        "Galetes tècniques que pot fer servir el servei d'allotjament (Hostinger) per a la seguretat i el bon funcionament del web, com la protecció contra atacs.",
      ],
    },
    {
      heading: "Galetes de tercers: Google Maps",
      body: [
        "Per mostrar el mapa de la nostra oficina fem servir Google Maps. Quan el mapa es carrega, Google pot desar galetes al teu navegador (per exemple NID o AEC) per recordar preferències i amb finalitats estadístiques i publicitàries pròpies.",
        "Per això el mapa només es carrega si ho acceptes al banner de galetes o si prems «Mostra el mapa». Si no ho acceptes, veuràs una imatge de l'oficina en lloc del mapa.",
        "Més informació a la política de privacitat de Google: policies.google.com/technologies/cookies.",
      ],
    },
    {
      heading: "Galetes d'analítica i publicitat",
      body: [
        "Ara mateix no en fem servir cap. Si en el futur les afegim, t'ho demanarem abans i actualitzarem aquesta política.",
      ],
    },
    {
      heading: "Com canviar la teva elecció",
      body: [
        "Pots canviar d'opinió quan vulguis amb l'enllaç «Configurar galetes» del peu de pàgina. També pots esborrar o bloquejar les galetes des de la configuració del teu navegador (Chrome, Safari, Firefox o Edge).",
      ],
    },
  ],
};

export const legalPages = [avisLegal, privacyPolicy, cookiePolicy] as const;
