import type { LangAlt } from "@/i18n/config";

type M = Record<LangAlt, { title: string; description: string }>;

/** Títols i descripcions de Google de les pàgines traduïdes */
export const META: Record<"/" | "/serveis" | "/equip" | "/parlem", M> = {
  "/": {
    es: {
      title: "Agencia de marketing en Andorra: digital, online y redes | Altitud Digital",
      description:
        "Agencia de marketing digital y online en Andorra la Vella: diseño web, SEO, redes sociales, publicidad e IA. Más de 100 empresas de todas las parroquias confían en nosotros. 4,9★ en Google.",
    },
    fr: {
      title: "Agence web et de marketing digital en Andorre | Altitud Digital",
      description:
        "Agence de marketing digital à Andorre-la-Vieille : sites web, SEO, réseaux sociaux, publicité en ligne et IA pour les entreprises d'Andorre. Plus de 100 clients.",
    },
    en: {
      title: "Digital marketing agency in Andorra | Altitud Digital",
      description:
        "Digital marketing agency in Andorra la Vella: websites, SEO, social media, online advertising and AI for businesses in Andorra. Over 100 clients.",
    },
  },
  "/serveis": {
    es: { title: "Servicios de marketing digital, web e IA en Andorra | Altitud Digital", description: "Consultoría, webs, SEO, redes sociales, vídeo, branding, IA, chatbots y formaciones. Todo lo que hacemos en Altitud Digital para que tu negocio crezca en Andorra." },
    fr: { title: "Services de marketing digital, web et IA en Andorre | Altitud Digital", description: "Conseil, sites web, SEO, réseaux sociaux, vidéo, branding, IA, chatbots et formations : tout ce que fait Altitud Digital pour développer votre entreprise en Andorre." },
    en: { title: "Digital marketing, web and AI services in Andorra | Altitud Digital", description: "Consulting, websites, SEO, social media, video, branding, AI, chatbots and training: everything Altitud Digital does to grow your business in Andorra." },
  },
  "/equip": {
    es: { title: "Quiénes somos: agencia de marketing en Andorra la Vella | Altitud Digital", description: "Conoce al equipo de Altitud Digital: un equipo creativo y comprometido que hace crecer tu negocio desde Andorra. Ven a tomar un café a nuestra oficina de Andorra la Vella." },
    fr: { title: "Qui sommes-nous : agence de marketing à Andorre-la-Vieille | Altitud Digital", description: "Découvrez l'équipe d'Altitud Digital : une équipe créative et engagée qui fait grandir votre entreprise depuis l'Andorre. Passez prendre un café à notre bureau." },
    en: { title: "About us: marketing agency in Andorra la Vella | Altitud Digital", description: "Meet the Altitud Digital team: a creative, committed team growing businesses from Andorra. Come and have a coffee at our office in Andorra la Vella." },
  },
  "/parlem": {
    es: { title: "Contacto: hablemos de tu proyecto | Altitud Digital, Andorra", description: "Cuéntanos tu proyecto y te asesoramos sin compromiso. Agencia de marketing digital en Andorra la Vella. Te respondemos en 24 h." },
    fr: { title: "Contact : parlons de votre projet | Altitud Digital, Andorre", description: "Parlez-nous de votre projet, nous vous conseillons sans engagement. Agence de marketing digital à Andorre-la-Vieille. Réponse sous 24 h." },
    en: { title: "Contact: let's talk about your project | Altitud Digital, Andorra", description: "Tell us about your project and we'll advise you with no strings attached. Digital marketing agency in Andorra la Vella. We reply within 24 hours." },
  },
};

export const META_SERVEI: Record<LangAlt, (name: string) => string> = {
  es: (n) => `${n} en Andorra | Altitud Digital`,
  fr: (n) => `${n} en Andorre | Altitud Digital`,
  en: (n) => `${n} in Andorra | Altitud Digital`,
};
