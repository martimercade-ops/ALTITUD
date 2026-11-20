export type Reel = {
  slug: string;
  client: string;
  sector: string;
  /** vídeo vertical 9:16 */
  video: string;
  /** millor fotograma del vídeo */
  poster: string;
  /** logo en color (public/assets/altitud/clients/color) */
  logo?: string;
};

const R = "/assets/altitud/reels";

export const reels: Reel[] = [
  { slug: "balanzen", client: "Balanzen", sector: "Nutrició i esport", video: `${R}/balanzen.mp4`, poster: `${R}/balanzen.webp`, logo: "balanzen-b" },
  { slug: "nou-aire", client: "Nou Aire", sector: "Immobiliària", video: `${R}/nou-aire.mp4`, poster: `${R}/nou-aire.webp`, logo: "nou-aire" },
  { slug: "sicoris-gestoria", client: "Sicoris Gestoria", sector: "Gestoria", video: `${R}/sicoris-gestoria.mp4`, poster: `${R}/sicoris-gestoria.webp`, logo: "sicoris-gestoria-s" },
  { slug: "erf-assegurances", client: "ERF Assegurances", sector: "Assegurances", video: `${R}/erf-assegurances.mp4`, poster: `${R}/erf-assegurances.webp`, logo: "erf-assegurances" },
  { slug: "tass-glass", client: "Tass Glass", sector: "Vidres d'automòbil", video: `${R}/tass-glass.mp4`, poster: `${R}/tass-glass.webp` },
  { slug: "auro-jardiners", client: "Auró Jardiners", sector: "Jardineria", video: `${R}/auro-jardiners.mp4`, poster: `${R}/auro-jardiners.webp`, logo: "auro-jardiners" },
  { slug: "relaxia", client: "Relaxia", sector: "Descans i matalassos", video: `${R}/relaxia.mp4`, poster: `${R}/relaxia.webp`, logo: "relaxia-r" },
  { slug: "ferreteria-principat", client: "Ferreteria Principat", sector: "Ferreteria", video: `${R}/ferreteria-principat.mp4`, poster: `${R}/ferreteria-principat.webp`, logo: "ferreteria-principat" },
  { slug: "unique-pink-collagen", client: "Unique Pink Collagen", sector: "Meritxell Martí", video: `${R}/unique-pink-collagen.mp4`, poster: `${R}/unique-pink-collagen.webp` },
  { slug: "ciutadans-compromesos", client: "Ciutadans Compromesos", sector: "Partit polític", video: `${R}/ciutadans-compromesos.mp4`, poster: `${R}/ciutadans-compromesos.webp`, logo: "ciutadans-compromesos-cc" },
  { slug: "tribeca", client: "Tribeca Andorra", sector: "Cosmètica professional", video: `${R}/tribeca.mp4`, poster: `${R}/tribeca.webp` },
  { slug: "pedro-martinez", client: "Pedro Martínez", sector: "Tennista", video: `${R}/pedro-martinez.mp4`, poster: `${R}/pedro-martinez.webp` },
  { slug: "fah", client: "Federació Andorrana d'Handbol", sector: "Esport", video: `${R}/fah.mp4`, poster: `${R}/fah.webp`, logo: "fah-icon" },
  { slug: "magnesi-arquitectes", client: "Magnesi Arquitectes", sector: "Arquitectura", video: `${R}/magnesi-arquitectes.mp4`, poster: `${R}/magnesi-arquitectes.webp`, logo: "magnesi-arquitectes" },
  { slug: "orada", client: "Orada Real Estate", sector: "Immobiliària", video: `${R}/orada.mp4`, poster: `${R}/orada.webp`, logo: "orada-o" },
  { slug: "mobalpa", client: "Mobalpa", sector: "Cuines i interiorisme", video: `${R}/mobalpa.mp4`, poster: `${R}/mobalpa.webp`, logo: "mobalpa" },
  { slug: "brainworks", client: "Brainworks Center", sector: "Salut i benestar", video: `${R}/brainworks.mp4`, poster: `${R}/brainworks.webp`, logo: "brainworks" },
  { slug: "perfect-home", client: "Perfect Home", sector: "Immobiliària", video: `${R}/perfect-home.mp4`, poster: `${R}/perfect-home.webp`, logo: "perfect-home" },
  { slug: "farmacia-guitart", client: "Farmàcia Guitart", sector: "Farmàcia", video: `${R}/farmacia-guitart.mp4`, poster: `${R}/farmacia-guitart.webp`, logo: "farmacia-guitart-g" },
];
