"use client";

import { useEffect } from "react";

const DOMINIOS = ["altitudigital.com", "www.altitudigital.com", "localhost", "127.0.0.1"];
const ORIGEN = process.env.NEXT_PUBLIC_SITE_URL;
const MEDIOS = "img,picture,video,canvas,svg";

if (typeof window !== "undefined" && ORIGEN) {
  const { hostname } = window.location;
  if (hostname !== new URL(ORIGEN).hostname && !DOMINIOS.includes(hostname)) {
    window.location.replace(ORIGEN);
  }
}

export const Guardia = () => {
  useEffect(() => {
    const bloquear = (evento: Event) => {
      if (evento.target instanceof Element && evento.target.closest(MEDIOS)) {
        evento.preventDefault();
      }
    };
    document.addEventListener("contextmenu", bloquear);
    document.addEventListener("dragstart", bloquear);
    return () => {
      document.removeEventListener("contextmenu", bloquear);
      document.removeEventListener("dragstart", bloquear);
    };
  }, []);

  return null;
};
