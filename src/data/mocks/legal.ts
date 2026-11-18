import type { LegalSection } from "@/views/legal/legal-document";

interface LegalPage {
  title: string;
  intro: string;
  sections: readonly LegalSection[];
}

export const LEGAL_UPDATED = "Darrera actualització: 7 de novembre de 2026";

export const privacyPolicy: LegalPage = {
  "title": "Avís legal i privacitat",
  "intro": "Aquesta política explica quines dades personals tracta Altitud Digital quan visites aquest web o ens contactes, per a què les fem servir i quins drets tens, d'acord amb la Llei 29/2021, qualificada de protecció de dades personals del Principat d'Andorra.",
  "sections": [
    {
      "heading": "Titular del web",
      "body": [
        "Altitud Digital, agència de màrqueting 360°.",
        "Carrer Ciutat de Valls, 24, AD500 Andorra la Vella, Andorra. Telèfon: +376 670 222. Correu electrònic: info@altitudigital.com."
      ]
    },
    {
      "heading": "Objecte del web",
      "body": [
        "Aquest web presenta els serveis d'Altitud Digital: desenvolupament web i e-commerce, SEO, SEM i publicitat digital, xarxes socials, producció audiovisual, branding i disseny gràfic, i intel·ligència artificial i automatitzacions.",
        "El contingut és informatiu i no constitueix una oferta vinculant. Les condicions de cada servei es fixen en el pressupost o contracte corresponent."
      ]
    },
    {
      "heading": "Propietat intel·lectual",
      "body": [
        "Els textos, el logotip i el disseny del web pertanyen a Altitud Digital o als seus titulars, i no es poden reproduir sense autorització. Tampoc es permet copiar-los o extreure'ls amb eines automatitzades (scraping, clonadors de webs o robots) ni fer-los servir per entrenar sistemes d'intel·ligència artificial: ens reservem expressament aquests usos, inclosa la mineria de textos i dades. Les marques i els treballs de clients que s'hi mostren pertanyen als seus propietaris."
      ]
    },
    {
      "heading": "Ús del web",
      "body": [
        "T'has de comprometre a fer servir el web de manera lícita i a no fer res que en pugui danyar el funcionament o la seguretat."
      ]
    },
    {
      "heading": "Responsabilitat",
      "body": [
        "Procurem que la informació sigui correcta i que el web estigui disponible, però no podem garantir que no hi hagi errors o interrupcions. Els resultats de casos anteriors no garanteixen resultats futurs."
      ]
    },
    {
      "heading": "Enllaços externs",
      "body": [
        "El web pot contenir enllaços a serveis de tercers, com Google Maps. No som responsables del seu contingut ni de les seves polítiques."
      ]
    },
    {
      "heading": "Llei aplicable",
      "body": [
        "Aquestes condicions es regeixen per la legislació del Principat d'Andorra. Per a qualsevol conflicte, i sempre que la llei ho permeti, són competents els tribunals d'Andorra."
      ]
    },
    {
      "heading": "Quines dades tractem",
      "body": [
        "Dades que ens envies: el formulari d'aquest web no desa res al servidor, sinó que obre el teu programa de correu amb el missatge preparat. Rebem només el que decideixis enviar-nos per correu o per telèfon: normalment nom, telèfon, correu electrònic, població i la descripció del teu projecte.",
        "Dades tècniques: el servidor on s'allotja el web registra informació habitual de cada visita, com l'adreça IP, el navegador, la pàgina demanada i la data i l'hora."
      ]
    },
    {
      "heading": "Per a què les fem servir i amb quina base",
      "body": [
        "Fem servir les dades que ens envies per respondre la teva consulta, preparar-te un pressupost i, si ens contractes, prestar-te el servei. La base és la teva sol·licitud i, si escau, el contracte.",
        "Fem servir les dades tècniques per mantenir el web segur i en funcionament, que és el nostre interès legítim.",
        "No venem les teves dades ni les fem servir per enviar-te publicitat si no ens hi has autoritzat."
      ]
    },
    {
      "heading": "Cookies",
      "body": [
        "Aquest web només utilitza les cookies i l'emmagatzematge tècnics necessaris per funcionar i per recordar les teves preferències. No hi ha cookies d'analítica ni de publicitat actives."
      ]
    },
    {
      "heading": "Amb qui compartim les dades",
      "body": [
        "Només amb els proveïdors que necessitem per funcionar, com els d'allotjament web i de correu electrònic, que les tracten per compte nostre. No cedim dades a altres tercers, tret que una llei ens hi obligui.",
        "Si algun d'aquests proveïdors tracta dades fora d'Andorra, ho fem amb les garanties que exigeix la normativa."
      ]
    },
    {
      "heading": "Quant de temps les conservem",
      "body": [
        "Conservem les consultes el temps necessari per respondre-les i fer-ne el seguiment. Si ens contractes, conservem les dades mentre duri la relació i durant els terminis que marqui la llei."
      ]
    },
    {
      "heading": "Ressenyes de Google",
      "body": [
        "Les opinions que mostrem, amb el nom públic, la foto de perfil i el text, provenen de la nostra fitxa pública de Google. Si n'ets l'autor i vols que la retirem d'aquest web, escriu-nos a info@altitudigital.com i ho farem."
      ]
    },
    {
      "heading": "Els teus drets",
      "body": [
        "Pots demanar l'accés a les teves dades, rectificar-les, suprimir-les, oposar-te al tractament, limitar-lo o sol·licitar-ne la portabilitat escrivint a info@altitudigital.com.",
        "Si consideres que no hem atès correctament la teva sol·licitud, pots presentar una reclamació davant l'Agència Andorrana de Protecció de Dades."
      ]
    }
  ]
};
