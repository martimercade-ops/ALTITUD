"use client";

import { useLayoutText } from "@/i18n/layout";

export const WHATSAPP_URL =
  "https://wa.me/376670222?text=" + encodeURIComponent("Hola! Vinc de la web d'Altitud Digital i voldria més informació.");

/** Botó flotant per contactar per WhatsApp (+376 670 222) */
export const WhatsappButton = () => {
  const tx = useLayoutText();
  return (
  <a
    href={"https://wa.me/376670222?text=" + encodeURIComponent(tx("wa"))}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={tx("waLabel")}
    title={tx("waLabel")}
    className="group fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#25d366]/90 text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all hover:bg-[#25d366] md:bottom-6 md:right-6"
  >
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.62c-2 0-3.95-.54-5.65-1.55l-.4-.24-3.97 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.86 4.77-10.63 10.64-10.63 5.86 0 10.62 4.77 10.62 10.63 0 5.87-4.76 10.62-10.62 10.62Zm5.83-7.96c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.21-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.62s1.13 3.04 1.29 3.25c.16.21 2.22 3.39 5.38 4.75.75.33 1.34.52 1.8.66.75.24 1.44.2 1.98.12.6-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
    </svg>
    <span className="pointer-events-none absolute right-full mr-2 hidden whitespace-nowrap rounded-full bg-black/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 md:block">
      WhatsApp
    </span>
  </a>
);
};
