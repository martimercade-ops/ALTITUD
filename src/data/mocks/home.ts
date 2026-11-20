import type { LogoMarqueeContent } from "@/views/logo-marquee";
import type { HeroContent } from "@/views/hero";
import type { AboutContent } from "@/views/about";
import type { StatsContent } from "@/views/stats";
import type { ShowcaseContent } from "@/views/showcase";
import type { WorksContent } from "@/views/works";
import type { ChainContent } from "@/views/chain";
import type { SiteNavContent } from "@/views/site-nav";
import type { ReviewsContent } from "@/views/reviews";
import type { TeamContent } from "@/views/team";
import { projectHref, projects } from "@/data/mocks/projects";
import { serviceHref, services } from "@/data/mocks/services";

export interface HomeContent {
  nav: SiteNavContent;
  hero: HeroContent;
  logos: LogoMarqueeContent;
  about: AboutContent & { labelId: string };
  stats: StatsContent;
  showcase: ShowcaseContent;
  works: WorksContent;
  chain: ChainContent;
  reviews: ReviewsContent;
  team: TeamContent;
}

const A = "/assets/altitud";

/** Serveis que surten com a columnes a la portada; la resta, com a enllaços «També». */
const SHOWCASE = ["web-ecommerce", "seo-sem", "xarxes-socials", "audiovisual", "branding", "ia-automatitzacions"];
export const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Altitud+Digital+Ag%C3%A8ncia+de+Marketing+Andorra";

/** Fitxa de Google Business d'Altitud Digital */
export const GOOGLE_REVIEWS = "https://www.google.com/maps?cid=16031392341318370555";

export const PARLEM_HREF = "/parlem";
const contacte = { label: "Parlem", href: PARLEM_HREF };

const siteNav: SiteNavContent = {
  brand: "Altitud Digital",
  items: [
    { label: "Inici", href: "#top" },
    { label: "Qui som", href: "/equip" },
    { label: "Metodologia", href: "/metodologia" },
    {
      label: "Serveis",
      href: "/serveis",
      children: services.map((s) => ({ label: s.name, href: serviceHref(s.slug), group: s.group })),
    },
    { label: "Projectes", href: "/projectes" },
    { label: "PDE", href: "/ajuts-pde" },
  ],
  cta: contacte,
};

/** Els enllaços d'àncora (#…) apunten a la portada quan som en una altra pàgina. */
const toHome = (href: string) => (href === "#top" ? "/" : href.startsWith("#") ? `/${href}` : href);

export const homeNav: SiteNavContent = {
  ...siteNav,
  items: siteNav.items.map((item) => ({
    ...item,
    href: toHome(item.href),
    children: item.children?.map((child) => ({ ...child, href: toHome(child.href) })),
  })),
};

export const homeContent: HomeContent = {
  nav: siteNav,
  hero: {
    titleLines: ["Generem negoci a", "empreses d'Andorra."],
    sectionLabel: "Inici",
    image: { src: `${A}/nevado-hero.jpg`, alt: "Cim nevat al capvespre, protagonista al centre de la imatge" },
    cta: { label: "Parlem del teu projecte", href: PARLEM_HREF },
    secondaryCta: { label: "Veure serveis", href: "/serveis" },
    insightTitle: "Agència de màrqueting 360° a Andorra.",
    insightBody:
      "Estratègia, creativitat i tecnologia per atraure clients, fer créixer la teva marca i convertir oportunitats en resultats reals.",
  },
  logos: {
    label: "Marques que confien en Altitud Digital",
    badge: { strong: "+100", text: "clients satisfets" },
    heading: { text: "Empreses que ja creixen amb la nostra agència de", strong: "màrqueting digital" },
    items: [
      { name: "Maisons du Monde", src: `${A}/clients/mono/maisons-du-monde.webp`, width: 804, height: 240 },
      { name: "Princiesport", src: `${A}/clients/mono/princiesport.webp`, width: 2102, height: 240 },
      { name: "ARK Real Estate", src: `${A}/clients/mono/ark-real-estate.webp`, width: 208, height: 240 },
      { name: "Ateci", src: `${A}/clients/mono/ateci.webp`, width: 228, height: 240 },
      { name: "Auró Jardiners", src: `${A}/clients/mono/auro-jardiners.webp`, width: 286, height: 240 },
      { name: "Balanzen", src: `${A}/clients/mono/balanzen.webp`, width: 1414, height: 240 },
      { name: "Brainworks", src: `${A}/clients/mono/brainworks.webp`, width: 350, height: 240 },
      { name: "Ciutadans Compromesos", src: `${A}/clients/mono/ciutadans-compromesos.webp`, width: 262, height: 240 },
      { name: "Claudia Moncau Yoga", src: `${A}/clients/mono/claudia-moncau-yoga.webp`, width: 330, height: 240 },
      { name: "Constructora Carracedo", src: `${A}/clients/mono/constructora-carracedo.webp`, width: 412, height: 240 },
      { name: "El Rato Barre House", src: `${A}/clients/mono/el-rato-barre-house.webp`, width: 724, height: 240 },
      { name: "El Rollo - Café Andorra", src: `${A}/clients/mono/el-rollo-cafe-andorra.webp`, width: 802, height: 240 },
      { name: "Mobalpa", src: `${A}/clients/mono/mobalpa.webp`, width: 1072, height: 240 },
      { name: "FAE", src: `${A}/clients/mono/fae.webp`, width: 600, height: 240 },
      { name: "Federació Andorrana d'Handbol", src: `${A}/clients/mono/federacio-andorrana-d-handbol.webp`, width: 410, height: 240 },
      { name: "Ferreteria Principat", src: `${A}/clients/mono/ferreteria-principat.webp`, width: 258, height: 240 },
      { name: "Hotel Niu", src: `${A}/clients/mono/hotel-niu.webp`, width: 252, height: 240 },
      { name: "Unique Pink Collagen", src: `${A}/clients/mono/unique.webp`, width: 826, height: 240 },
      { name: "Kantar", src: `${A}/clients/mono/kantar.webp`, width: 1216, height: 240 },
      { name: "Magnesi Arquitectes", src: `${A}/clients/mono/magnesi-arquitectes.webp`, width: 256, height: 240 },
      { name: "Maison Carne", src: `${A}/clients/mono/maison-carne.webp`, width: 238, height: 240 },
      { name: "MCA Assessors", src: `${A}/clients/mono/mca-assessors.webp`, width: 508, height: 240 },
      { name: "Medic Estetic", src: `${A}/clients/mono/medic-estetic.webp`, width: 412, height: 240 },
      { name: "Sicoris Gestoria", src: `${A}/clients/mono/sicoris-gestoria.webp`, width: 960, height: 240 },
      { name: "Nou Aire", src: `${A}/clients/mono/nou-aire.webp`, width: 1001, height: 240 },
      { name: "Orada Real Estate", src: `${A}/clients/mono/orada.webp`, width: 318, height: 240 },
      { name: "La Casa Cafe & GastroBar", src: `${A}/clients/mono/la-casa-gastrobar.webp`, width: 240, height: 240 },
      { name: "Olympus Race Andorra", src: `${A}/clients/mono/olympus-race-andorra.webp`, width: 220, height: 240 },
      { name: "Patronat Dames de Meritxell", src: `${A}/clients/mono/patronat-dames-de-meritxell.webp`, width: 292, height: 240 },
      { name: "Perfect Home", src: `${A}/clients/mono/perfect-home.webp`, width: 198, height: 240 },
      { name: "Projecte Vida", src: `${A}/clients/mono/projecte-vida.webp`, width: 332, height: 240 },
      { name: "Relaxia Andorra", src: `${A}/clients/mono/relaxia-andorra.webp`, width: 762, height: 240 },
      { name: "Restaurante La Llotja", src: `${A}/clients/mono/restaurante-la-llotja.webp`, width: 240, height: 240 },
      { name: "Via Moda", src: `${A}/clients/mono/via-moda.webp`, width: 1318, height: 240 },
    ],
  },
  about: {
    labelId: "about-title",
    eyebrow: "Per què Altitud Digital",
    lead: "Més que una agència, un equip",
    mutedLead: "compromès amb el teu creixement",
  },
  stats: {
    label: "Resultats",
    brand: "L'agència nº1 d'Andorra",
    image: `${A}/oficina-altitud.jpg`,
    imagePosition: "object-[22%_50%]",
    collab: {
      value: "+100",
      desc: "Més de 100 clients a Andorra ja confien en nosaltres.",
    },
    commitment: {
      eyebrow: "Ressenyes a Google",
      value: "98",
      quote: "Sin duda, un equipo muy profesional.",
      author: "Cristiana Fernandes Magalhaes",
      avatars: [`${A}/google/esther.png`, `${A}/google/balanzen.png`, `${A}/google/cristiana.png`, `${A}/google/beatriz.png`],
    },
    data: {
      label: "Projectes",
      value: "+200",
      desc: "A Andorra, França, Espanya i Llatinoamèrica.",
      tags: ["Màrqueting", "Digitalització", "Web i IA", "Formació"],
    },
    reach: { label: "d'experiència", value: "+6 anys" },
  },
  chain: {
    heading: "Coneixement del mercat local",
    tagline: "Som d'Andorra i entenem el teu entorn.",
    aside: "Andorra / Barcelona / Global",
    image: { src: `${A}/andorra-la-vella.jpg`, alt: "Vista d'Andorra la Vella i Escaldes-Engordany entre muntanyes nevades" },
  },
  showcase: {
    heading: "Tot el que la teva empresa necessita per créixer, en un sol equip.",
    cta: contacte,
    items: services
      .filter((s) => SHOWCASE.includes(s.slug))
      .map((s) => ({
        id: `servei-${s.slug}`,
        href: serviceHref(s.slug),
        prefix: s.prefix,
        name: s.suffix,
        description: s.short,
        image: s.image,
      })),
    extra: {
      label: "També",
      items: services
        .filter((s) => !SHOWCASE.includes(s.slug))
        .map((s) => ({ label: s.name, href: serviceHref(s.slug) })),
    },
  },
  works: {
    eyebrow: "Casos d'èxit",
    heading: "Empreses d'Andorra que ja han fet créixer el seu negoci.",
    viewLabel: "Tots els projectes",
    viewHref: "/projectes",
    // Només els 5 projectes destacats; la resta, a /projectes
    items: ["federacio-andorrana-d-esqui", "brainworks-center", "olympus-race", "hotel-niu", "la-casa"]
      .map((slug) => projects.find((p) => p.slug === slug)!)
      .map((p) => ({
      name: p.name,
      sector: p.sector,
      description: p.summary,
      href: projectHref(p.slug),
      image: p.image,
    })),
  },
  reviews: {
    eyebrow: "Valoracions",
    heading: "El que diuen els nostres clients",
    basis: "98 ressenyes a Google",
    link: { label: "Veure totes les ressenyes a Google", href: GOOGLE_REVIEWS },
    items: [
      { name: "Merce Cami", text: "Gran professionalitat i un tracte exquisit. Gràcies especialment a en Martí per la seva dedicació, atenció i facilitat de comunicació. Dóna molta tranquil·litat treballar amb gent tan seriosa i compromesa." },
      { name: "Xavier Bardina", text: "El Martí i tot el seu equip d’Altitud Digital són uns cracs! Molt bon servei i molta predisposició per ajudar en tot el que els demanem. Els recomanem al 100%!" },
      { name: "Esther Lostes", avatar: `${A}/google/esther.png`, text: "Llegué a Altitud Digital con muchas ganas de sacar adelante mis proyectos, pero bastante perdida. Me ayudaron a poner orden y a ver por dónde empezar. He valorado mucho que hayan entendido mis ideas y sepan cómo conectar la web, la plataforma de formación y el marketing en una propuesta coherente." },
      { name: "Adrià Pifarré Ros", avatar: `${A}/google/adria.png`, text: "Treballar amb Altitud Digital ha estat una experiència molt positiva per a la Federació Andorrana d’Handbol. Valorem especialment la seva capacitat per aportar idees fresques, creatives i adaptades a la realitat del nostre esport." },
      { name: "Hotel NIU", text: "Volem destacar l’excel·lent feina que Altitud Digital ha fet amb el nostre hotel, encarregant-se de crear la nostra pàgina web i d’alguns dels vídeos i reels per a les xarxes socials. Han sabut captar perfectament l’essència de l’hotel." },
      { name: "Cristian Gonzalez", text: "Estem construint la nostra identitat digital amb Altitud Digital i el procés està sent una molt bona experiència. Escolten de veritat, van al ritme que necessitem i cada pas es nota pensat i cuidat." },
      { name: "balanzen pilates & coffee", avatar: `${A}/google/balanzen.png`, text: "Trabajar con ellos fue increíble. Desde el primer momento demostraron muchísima iniciativa y talento, aportando ideas que elevaron el proyecto desde el inicio. El resultado final fue espectacular." },
      { name: "Rollo Coffee", text: "Desde el primer momento entendieron perfectamente lo que necesitaba y el estilo que quería transmitir. El resultado final quedó genial, con una calidad de imagen y edición increíble, de cine." },
      { name: "Cristiana Fernandes Magalhaes", avatar: `${A}/google/cristiana.png`, text: "Desde el primer momento, Altitud Digital nos ha ayudado en todo y nos ha asesorado de la mejor manera. Además, los vídeos que realizan tienen una calidad increíble y el contenido que crean es muy original." },
      { name: "Pilar Aguareles", text: "És un gran equip, amb una gran professionalitat. A Nou Aire Imm. estem molt contents amb la feina que fan. Els vídeos agraden molt i el resultat és excel·lent." },
      { name: "Clinica MedicEstetic", text: "Excel.lent experiència treballar amb Altitud Digital. El Martí, gran professional. Ha gestionat les nostres campanyes d'Ads amb gran professionalitat. Tracte molt personalitzat, experiència molt enriquidora i recomanable." },
      { name: "Jaime Ribolleda", text: "Des del primer moment han demostrat un gran nivell d’acompanyament i proximitat, entenent perfectament les nostres necessitats. Un partner de confiança en el sector del màrqueting digital." },
      { name: "Beatriz Santos", avatar: `${A}/google/beatriz.png`, text: "Como restaurante, valoramos muchísimo este tipo de trato y la implicación que le habéis puesto. Nos ha encantado la experiencia y ojalá podamos seguir trabajando juntos." },
      { name: "EL RATO - BARRE HOUSE", text: "Ens han fet uns videos molt top!! El Martí es un crack. Ràpids, simpàtics i profesionals ;)" },
      { name: "Gonzalo Acha", text: "Agència molt professional. Gran equip, menció especial al Martí que està sempre disposat a donar un punt més sense que ho demanis. Empresa molt recomanable!" },
      { name: "Uxio Garcia Presas", text: "Fabulosa experiència, un equip molt professional. L’atenció des del primer moment ha estat personalitzada i molt agradable. Experiència 10/10." },
      { name: "Copa Colegial Andorra", text: "El Martí i el seu equip són un tret segur quan es tracta de treballar amb algú que cuida el teu producte com t'agradaria. S'agraeix molt la seva atenció en tot moment i la transparència!" },
      { name: "Ainoa Almacellas", text: "Cuando empecé Almacellas Nutrition, Altitud Digital se encargó de todo: el diseño gráfico, la página web desde cero y una estrategia SEO que ha hecho crecer mi negocio." },
      { name: "Projecte Vida Andorra", text: "Ha estat un treball molt professional, fet amb molta paciència i escoltant-nos en tot moment. Ha sabut captar l'essència del nostre projecte i transformar-la en una proposta visual que ens representa." },
      { name: "Laura Guitart Estany", text: "Super professionals, eficients i tracte fàcil. S’adapten al client i entenen les necessitats particulars." },
      { name: "Ilaria Fontana", text: "Altitud Digital ha estat clau en la transformació del meu negoci a Barcelona: SEO, una web espectacular i un logotip que captura perfectament la meva marca." },
      { name: "Anna Gt", text: "Estoy MUY contenta con el trabajo de Altitud Digital. Me han ayudado a optimizar mi web y potenciar mi presencia digital. ¡Totalmente recomendados!" },
      { name: "Sílvia Palau Garcia", text: "Gran servei i professionalitat. De seguida van captar la meva essència per traslladar-la a la meva web. Eficàcia, rapidesa, serietat… totalment recomanable!" },
      { name: "Edu Michelena Busquets", text: "Grans professionals tot l'equip! Ens han fet créixer a les xarxes socials y ens han donat un impuls a les millores de la nostre web." },
    ],
  },
  team: {
    eyebrow: "Equip",
    heading: "Un equip creatiu, proper i compromès amb el teu creixement.",
    members: [
      {
        name: "Martí Mercadé",
        role: "CEO",
        image: `${A}/equip/marti.jpg`,
        bio: "Fundador d'Altitud Digital. Lidera l'estratègia de l'agència i acompanya cada client des del primer cafè fins als resultats.",
        highlights: [
          "Doble grau en Màrqueting i Negocis Digitals a ESIC",
          "Diversos premis en projectes universitaris",
          "Experiència a Havas Media amb clients com UNICEF, JDE i Banca March",
        ],
        focus: ["Estratègia", "Desenvolupament de negoci", "IA"],
      },
      {
        name: "Eric Carrera",
        role: "CTO",
        image: `${A}/equip/eric.jpg`,
        bio: "Responsable de la tecnologia: webs, automatitzacions i solucions d'IA que funcionen de veritat.",
        focus: ["Desenvolupament web", "Automatitzacions", "IA"],
      },
      {
        name: "Andrea Ramos",
        role: "Project Manager",
        image: `${A}/equip/andrea.jpg`,
        bio: "Coordina els projectes perquè tot arribi a temps, amb ordre i comunicació clara amb cada client.",
        highlights: ["Màster en màrqueting"],
        focus: ["Gestió de projectes", "Atenció al client", "Planificació"],
      },
      {
        name: "Maria Socias",
        role: "Content Creator",
        image: `${A}/equip/maria.jpg`,
        bio: "Crea el contingut que connecta: idees, reels i publicacions amb la veu de cada marca.",
        focus: ["Xarxes socials", "Reels", "Copywriting"],
      },
      {
        name: "Armando Arenea",
        role: "Disseny web i gràfic",
        image: `${A}/equip/armando.jpg`,
        bio: "Dona forma visual a les marques: identitats, webs i peces gràfiques amb personalitat.",
        focus: ["Branding", "Disseny web", "Disseny gràfic"],
      },
    ],
  },
};

export const preloaderContent = {
  cards: [
    { src: `${A}/andorra-la-vella-petita.jpg`, tilt: -12 },
    { src: `${A}/equip.jpg`, tilt: 9 },
    { src: `${A}/nevado-3.jpg`, tilt: -5 },
    { src: `${A}/seo.jpg`, tilt: 14 },
    { src: `${A}/oficina.jpg`, tilt: -8 },
  ],
  finale: { src: `${A}/nevado-hero.jpg` },
};
