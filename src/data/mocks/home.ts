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

export const PARLEM_HREF = "/parlem";
const contacte = { label: "Parlem", href: PARLEM_HREF };

const siteNav: SiteNavContent = {
  brand: "Altitud Digital",
  items: [
    {
      label: "Serveis",
      href: "#services",
      children: services.map((s) => ({ label: s.name, href: serviceHref(s.slug), group: s.group })),
    },
    { label: "Projectes", href: "#projects" },
    { label: "Sobre nosaltres", href: "#about" },
    { label: "Equip", href: "#team" },
  ],
  cta: contacte,
};

/** Els enllaços d'àncora (#…) apunten a la portada quan som en una altra pàgina. */
const toHome = (href: string) => (href.startsWith("#") ? `/${href}` : href);

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
    secondaryCta: { label: "Veure serveis", href: "#services" },
    insightTitle: "Agència de màrqueting 360° a Andorra.",
    insightBody:
      "Estratègia, creativitat i tecnologia per atraure clients, fer créixer la teva marca i convertir oportunitats en resultats reals.",
  },
  logos: {
    label: "Marques que confien en Altitud Digital",
    badge: { strong: "+100", text: "clients satisfets" },
    heading: { text: "Empreses que ja creixen amb la nostra agència de", strong: "màrqueting digital" },
    items: [
      { name: "Princiesport", src: `${A}/clients/mono/princiesport.webp`, width: 1051, height: 120 },
      { name: "ARK Real Estate", src: `${A}/clients/mono/ark-real-estate.webp`, width: 104, height: 120 },
      { name: "Ateci", src: `${A}/clients/mono/ateci.webp`, width: 114, height: 120 },
      { name: "Auró Jardiners", src: `${A}/clients/mono/auro-jardiners.webp`, width: 143, height: 120 },
      { name: "Balanzen", src: `${A}/clients/mono/balanzen.webp`, width: 707, height: 120 },
      { name: "Brainworks", src: `${A}/clients/mono/brainworks.webp`, width: 175, height: 120 },
      { name: "Ciutadans Compromesos", src: `${A}/clients/mono/ciutadans-compromesos.webp`, width: 131, height: 120 },
      { name: "Claudia Moncau Yoga", src: `${A}/clients/mono/claudia-moncau-yoga.webp`, width: 165, height: 120 },
      { name: "Constructora Carracedo", src: `${A}/clients/mono/constructora-carracedo.webp`, width: 206, height: 120 },
      { name: "El Rato Barre House", src: `${A}/clients/mono/el-rato-barre-house.webp`, width: 362, height: 120 },
      { name: "El Rollo - Café Andorra", src: `${A}/clients/mono/el-rollo-cafe-andorra.webp`, width: 401, height: 120 },
      { name: "FAE", src: `${A}/clients/mono/fae.webp`, width: 300, height: 120 },
      { name: "Federació Andorrana d'Handbol", src: `${A}/clients/mono/federacio-andorrana-d-handbol.webp`, width: 205, height: 120 },
      { name: "Ferreteria Principat", src: `${A}/clients/mono/ferreteria-principat.webp`, width: 129, height: 120 },
      { name: "Hotel Niu", src: `${A}/clients/mono/hotel-niu.webp`, width: 126, height: 120 },
      { name: "Kantar", src: `${A}/clients/mono/kantar.webp`, width: 608, height: 120 },
      { name: "Magnesi Arquitectes", src: `${A}/clients/mono/magnesi-arquitectes.webp`, width: 128, height: 120 },
      { name: "Maison Carne", src: `${A}/clients/mono/maison-carne.webp`, width: 119, height: 120 },
      { name: "MCA Assessors", src: `${A}/clients/mono/mca-assessors.webp`, width: 254, height: 120 },
      { name: "Medic Estetic", src: `${A}/clients/mono/medic-estetic.webp`, width: 206, height: 120 },
      { name: "Nou Aire", src: `${A}/clients/mono/nou-aire.webp`, width: 120, height: 120 },
      { name: "Olympus Race Andorra", src: `${A}/clients/mono/olympus-race-andorra.webp`, width: 110, height: 120 },
      { name: "Patronat Dames de Meritxell", src: `${A}/clients/mono/patronat-dames-de-meritxell.webp`, width: 146, height: 120 },
      { name: "Perfect Home", src: `${A}/clients/mono/perfect-home.webp`, width: 99, height: 120 },
      { name: "Projecte Vida", src: `${A}/clients/mono/projecte-vida.webp`, width: 166, height: 120 },
      { name: "Relaxia Andorra", src: `${A}/clients/mono/relaxia-andorra.webp`, width: 381, height: 120 },
      { name: "Restaurante La Llotja", src: `${A}/clients/mono/restaurante-la-llotja.webp`, width: 120, height: 120 },
      { name: "Via Moda", src: `${A}/clients/mono/via-moda.webp`, width: 659, height: 120 },
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
    brand: "Altitud Digital",
    image: `${A}/equip.jpg`,
    collab: {
      value: "+150",
      desc: "Més de 150 empreses ja confien en nosaltres.",
    },
    commitment: {
      eyebrow: "95 ressenyes a Google",
      value: "4,9",
      quote: "Sin duda, un equipo muy profesional.",
      author: "Cristiana Fernandes Magalhaes",
      avatars: [`${A}/google/esther.png`, `${A}/google/balanzen.png`, `${A}/google/cristiana.png`, `${A}/google/beatriz.png`],
    },
    data: {
      label: "Renovació",
      value: "98%",
      desc: "Resultats reals que fan que els clients es quedin.",
    },
    reach: { label: "d'experiència", value: "+2 anys" },
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
    viewLabel: "Parlem",
    viewHref: PARLEM_HREF,
    items: projects.map((p) => ({
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
    score: "4,9",
    basis: "95 ressenyes a Google",
    link: { label: "Veure-les totes a Google", href: MAPS },
    items: [
      {
        name: "Esther Lostes",
        avatar: `${A}/google/esther.png`,
        date: "Fa 4 setmanes",
        text: "Llegué a Altitud Digital con muchas ganas de sacar adelante mis proyectos, pero bastante perdida. Me ayudaron a poner orden y a ver por dónde empezar. Para mí, eso ha sido una AYUDA ENORME. He valorado mucho que hayan entendido mis ideas y sepan cómo conectar la web, la plataforma de formación y el marketing en una propuesta coherente.",
      },
      {
        name: "Cristiana Fernandes Magalhaes",
        avatar: `${A}/google/cristiana.png`,
        date: "Fa 3 mesos",
        text: "Desde el primer momento, Altitud Digital nos ha ayudado en todo y nos ha asesorado de la mejor manera. Además, los vídeos que realizan tienen una calidad increíble y el contenido que crean es muy original. Sin duda, un equipo muy profesional. Los recomendamos al 100%!",
      },
      {
        name: "balanzen pilates & coffee",
        avatar: `${A}/google/balanzen.png`,
        date: "Fa 6 mesos",
        text: "Trabajar con ellos fue increíble. Desde el primer momento demostraron muchísima iniciativa y talento, aportando ideas que elevaron el proyecto desde el inicio. Además, todo el proceso fue muy fluido y divertido, lo que hizo que se disfrutara aún más. El resultado final fue espectacular, superando totalmente nuestras expectativas.",
      },
      {
        name: "Beatriz Santos",
        avatar: `${A}/google/beatriz.png`,
        date: "Fa 6 mesos",
        text: "Queríamos decir que el servicio ha sido súper top. Todo ha ido genial y la atención ha sido muy cercana, de esas que se agradecen un montón. Como restaurante, valoramos muchísimo este tipo de trato y la implicación que le habéis puesto.",
      },
      {
        name: "adria socias",
        avatar: `${A}/google/adria.png`,
        date: "Fa 7 mesos",
        text: "Martí y su equipo han realizado un trabajo excelente. Destacan por su alto nivel de compromiso, implicación constante y atención al detalle en cada fase del proyecto. Sin duda, una opción altamente recomendable para quienes buscan profesionalidad y resultados de calidad.",
      },
    ],
  },
  team: {
    eyebrow: "Equip",
    heading: "Persones reals, d'Andorra, compromeses amb el teu creixement.",
    members: [
      { name: "Martí Mercadé", role: "CEO", image: `${A}/equip/marti.jpg` },
      { name: "Eric Carrera", role: "CTO", image: `${A}/equip/eric.jpg` },
      { name: "Andrea Ramos", role: "Project Manager", image: `${A}/equip/andrea.jpg` },
      { name: "Maria Socias", role: "Content Creator", image: `${A}/equip/maria.jpg` },
      { name: "Armando Arenea", role: "Disseny web i gràfic", image: `${A}/equip/armando.jpg` },
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
