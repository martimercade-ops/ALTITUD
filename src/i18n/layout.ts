"use client";

import { usePathname } from "next/navigation";
import { langFromPath, type Lang } from "@/i18n/config";

/** Textos dels components del layout (fora del LangProvider de la pàgina) */
const S = {
  wa: { ca: "Hola! Vinc de la web d'Altitud Digital i voldria més informació.", es: "¡Hola! Vengo de la web de Altitud Digital y me gustaría más información.", fr: "Bonjour ! Je viens du site d'Altitud Digital et j'aimerais plus d'informations.", en: "Hi! I'm coming from the Altitud Digital website and would like more information." },
  waLabel: { ca: "Contactar per WhatsApp", es: "Contactar por WhatsApp", fr: "Contacter par WhatsApp", en: "Contact us on WhatsApp" },
  galetes: { ca: "Galetes", es: "Cookies", fr: "Cookies", en: "Cookies" },
  banner: {
    ca: "Fem servir només les galetes necessàries. Si ho acceptes, també carregarem el mapa de Google, que en pot desar de pròpies.",
    es: "Solo usamos las cookies necesarias. Si aceptas, también cargaremos el mapa de Google, que puede guardar las suyas.",
    fr: "Nous n'utilisons que les cookies nécessaires. Si vous acceptez, nous chargerons aussi la carte Google, qui peut enregistrer les siens.",
    en: "We only use essential cookies. If you accept, we'll also load the Google map, which may set its own.",
  },
  mes: { ca: "Més informació", es: "Más información", fr: "En savoir plus", en: "Learn more" },
  nomes: { ca: "Només necessàries", es: "Solo necesarias", fr: "Nécessaires uniquement", en: "Essential only" },
  acceptar: { ca: "Acceptar", es: "Aceptar", fr: "Accepter", en: "Accept" },
  configurar: { ca: "Configurar galetes", es: "Configurar cookies", fr: "Gérer les cookies", en: "Cookie settings" },
} satisfies Record<string, Record<Lang, string>>;

export const useLayoutText = () => {
  const lang = langFromPath(usePathname() ?? "/");
  return (k: keyof typeof S) => S[k][lang];
};
