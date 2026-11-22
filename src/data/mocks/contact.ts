export interface ContactContent {
  labelId: string;
  heading: string;
  fields: { name: string; phone: string; email: string };
  cta: string;
  to: string;
  subject: string;
  sentMessage: string;
}

export const contactContent: ContactContent = {
  labelId: "contact-title",
  heading:
    "Tens un projecte? Fem-lo realitat. Explica'ns la teva idea i t'assessorem sense compromís.",
  fields: { name: "Nom", phone: "Telèfon", email: "Correu electrònic" },
  cta: "Demana pressupost",
  to: "info@altitudigital.com",
  subject: "Demanda de pressupost",
  sentMessage: "Hem obert el teu correu amb el missatge preparat.",
};

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterNavGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  tagline: string;
  labelId: string;
  heading: string;
  image: string;
  office: { src: string; alt: string; width: number; height: number };
  cta: FooterLink;
  backToTop: FooterLink;
  linksLabel: string;
  sitemap: FooterNavGroup;
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
    /** Horari d'oficina */
    hours: string;
  };
  social: FooterNavGroup;
  copyright: string;
  credit: string;
}

export const footerContent: FooterContent = {
  tagline: "Agència de màrqueting 360° a Andorra.",
  labelId: "footer-title",
  heading: "Vine a fer un cafè a l'oficina.",
  image: "/assets/altitud/nevado-3.jpg",
  office: {
    src: "/assets/altitud/oficina-altitud.jpg",
    alt: "Façana de l'oficina d'Altitud Digital al carrer Ciutat de Valls, 24, d'Andorra la Vella",
    width: 512,
    height: 340,
  },
  cta: {
    label: "Com arribar",
    href: "https://www.google.com/maps/search/?api=1&query=Altitud+Digital+Ag%C3%A8ncia+de+Marketing+Andorra",
    external: true,
  },
  backToTop: { label: "Tornar a dalt", href: "#top" },
  linksLabel: "Enllaços",
  sitemap: {
    title: "Mapa del lloc",
    links: [
      { label: "Qui som", href: "/equip" },
      { label: "Metodologia", href: "/metodologia" },
      { label: "Serveis", href: "/serveis" },
      { label: "Projectes", href: "/projectes" },
      { label: "Ajuts PDE", href: "/ajuts-pde" },
      { label: "Blog", href: "/es/blog" },
      { label: "Parlem", href: "/parlem" },
    ],
  },
  contact: {
    title: "Contacte",
    address: "Carrer Ciutat de Valls, 24\nAD500 Andorra la Vella",
    phone: "+376 670 222",
    email: "info@altitudigital.com",
    hours: "Dl–Dj · 9–14 h i 15–18 h\nOficina amb cita prèvia",
  },
  social: {
    title: "Segueix-nos",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/altitudigital", external: true },
      { label: "Facebook", href: "https://www.facebook.com/people/Altitud-Digital/61563871467106/", external: true },
    ],
  },
  copyright: "© 2026 Altitud Digital.",
  credit: "Altitud Digital",
};
