import type { ClientLogo } from "@/views/logo-marquee";
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

export interface HomeContent {
  nav: SiteNavContent;
  hero: HeroContent;
  logos: {
    label: string;
    items: ClientLogo[];
  };
  about: AboutContent & { labelId: string };
  stats: StatsContent;
  showcase: ShowcaseContent;
  works: WorksContent;
  chain: ChainContent;
  reviews: ReviewsContent;
  team: TeamContent;
}

const A = "/assets/altitud";
export const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Altitud+Digital+Ag%C3%A8ncia+de+Marketing+Andorra";

const contacte = { label: "Parlem", href: "#contact" };

const siteNav: SiteNavContent = {
  brand: "Altitud Digital",
  items: [
    { label: "Serveis", href: "#services" },
    { label: "Projectes", href: "#projects" },
    { label: "Sobre nosaltres", href: "#about" },
    { label: "Equip", href: "#team" },
  ],
  cta: contacte,
};

export const homeNav: SiteNavContent = {
  ...siteNav,
  items: siteNav.items.map((item) => ({ ...item, href: `/${item.href}` })),
};

export const homeContent: HomeContent = {
  nav: siteNav,
  hero: {
    titleLines: ["Generem negoci a", "empreses d'Andorra."],
    sectionLabel: "Inici",
    image: { src: `${A}/nevado-hero.jpg`, alt: "Cim nevat al capvespre, protagonista al centre de la imatge" },
    cta: { label: "Parlem del teu projecte", href: "#contact" },
    secondaryCta: { label: "Veure serveis", href: "#services" },
    insightTitle: "Agència de màrqueting 360° a Andorra.",
    insightBody:
      "Estratègia, creativitat i tecnologia per atraure clients, fer créixer la teva marca i convertir oportunitats en resultats reals.",
  },
  logos: {
    label: "Marques que confien en Altitud Digital",
    items: [
      { name: "Princiesport", src: `${A}/clients/princiesport.webp`, width: 376, height: 160 },
      { name: "ARK Real Estate", src: `${A}/clients/ark-real-estate.webp`, width: 160, height: 160 },
      { name: "Ateci", src: `${A}/clients/ateci.webp`, width: 167, height: 160 },
      { name: "Auró Jardiners", src: `${A}/clients/auro-jardiners.webp`, width: 196, height: 160 },
      { name: "Balanzen", src: `${A}/clients/balanzen.webp`, width: 376, height: 160 },
      { name: "Brainworks", src: `${A}/clients/brainworks.webp`, width: 227, height: 160 },
      { name: "Ciutadans Compromesos", src: `${A}/clients/ciutadans-compromesos.webp`, width: 184, height: 160 },
      { name: "Claudia Moncau Yoga", src: `${A}/clients/claudia-moncau-yoga.webp`, width: 217, height: 160 },
      { name: "Constructora Carracedo", src: `${A}/clients/constructora-carracedo.webp`, width: 252, height: 160 },
      { name: "El Rato Barre House", src: `${A}/clients/el-rato-barre-house.webp`, width: 376, height: 160 },
      { name: "El Rollo - Café Andorra", src: `${A}/clients/el-rollo-cafe-andorra.webp`, width: 376, height: 160 },
      { name: "FAE", src: `${A}/clients/fae.webp`, width: 352, height: 160 },
      { name: "Federació Andorrana d'Handbol", src: `${A}/clients/federacio-andorrana-d-handbol.webp`, width: 255, height: 160 },
      { name: "Ferreteria Principat", src: `${A}/clients/ferreteria-principat.webp`, width: 181, height: 160 },
      { name: "Hotel Niu", src: `${A}/clients/hotel-niu.webp`, width: 178, height: 160 },
      { name: "Kantar", src: `${A}/clients/kantar.webp`, width: 376, height: 160 },
      { name: "Magnesi Arquitectes", src: `${A}/clients/magnesi-arquitectes.webp`, width: 180, height: 160 },
      { name: "Maison Carne", src: `${A}/clients/maison-carne.webp`, width: 171, height: 160 },
      { name: "MCA Assessors", src: `${A}/clients/mca-assessors.webp`, width: 306, height: 160 },
      { name: "Medic Estetic", src: `${A}/clients/medic-estetic.webp`, width: 258, height: 160 },
      { name: "Nou Aire", src: `${A}/clients/nou-aire.webp`, width: 172, height: 160 },
      { name: "Olympus Race Andorra", src: `${A}/clients/olympus-race-andorra.webp`, width: 162, height: 160 },
      { name: "Patronat Dames de Meritxell", src: `${A}/clients/patronat-dames-de-meritxell.webp`, width: 200, height: 160 },
      { name: "Perfect Home", src: `${A}/clients/perfect-home.webp`, width: 160, height: 160 },
      { name: "Projecte Vida", src: `${A}/clients/projecte-vida.webp`, width: 233, height: 160 },
      { name: "Relaxia Andorra", src: `${A}/clients/relaxia-andorra.webp`, width: 376, height: 160 },
      { name: "Restaurante La Llotja", src: `${A}/clients/restaurante-la-llotja.webp`, width: 172, height: 160 },
      { name: "Via Moda", src: `${A}/clients/via-moda.webp`, width: 376, height: 160 },
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
    items: [
      { prefix: "Web &", name: "e-commerce", description: "Webs que converteixen visites en clients.", image: `${A}/codi.jpg` },
      { prefix: "SEO, SEM &", name: "publicitat digital", description: "Més visibilitat, més oportunitats.", image: `${A}/seo.jpg` },
      { prefix: "Gestió de", name: "xarxes socials", description: "Contingut que connecta i genera resultat.", image: `${A}/xarxes.jpg` },
      { prefix: "Producció i", name: "edició audiovisual", description: "Vídeo, foto i creativitat amb impacte.", image: `${A}/camera.jpg` },
      { prefix: "Branding &", name: "disseny gràfic", description: "Marques amb identitat que destaquen.", image: `${A}/disseny.jpg` },
      { prefix: "IA &", name: "automatitzacions", description: "Solucions per estalviar temps i vendre més.", image: `${A}/ia.jpg` },
    ],
  },
  works: {
    eyebrow: "Casos d'èxit",
    heading: "Empreses d'Andorra que ja han fet créixer el seu negoci.",
    viewLabel: "Parlem",
    viewHref: "#contact",
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
