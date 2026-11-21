/** Logos en color (es mostren tal qual, sense passar-los a negre) */
export const LOGOS_COLOR: Record<string, string> = {
  "la-rostisseria": "la-rostisseria",
  "el-rato": "el-rato",
  "espai-dor": "espai-dor",
};

export const LOGOS: Record<string, string> = {
  "perfect-home": "perfect-home",
  "la-llotja": "restaurante-la-llotja",
  "claudia-moncau": "claudia-moncau-yoga",
  "medic-estetic": "medic-estetic",
  "auro-jardiners": "auro-jardiners",
  "federacio-andorrana-d-esqui": "fae",
  "brainworks-center": "brainworks",
  "hotel-niu": "hotel-niu",
  "olympus-race": "olympus-race-andorra",
  "la-casa": "la-casa-gastrobar",
  "projecte-vida": "projecte-vida",
  "enzo-poulat": "enzo-poulat",
  "farmacia-guitart": "farmacia-guitart",
  "henkan": "henkan",
  "erf-assegurances": "erf-assegurances",
  "beta-assegurances": "beta-assegurances",
  "psicosalut": "psicosalut",
};

/** Logo del client (en color) per a un projecte, si en tenim */
export const logoDe = (slug: string): string | undefined => {
  const l = LOGOS_COLOR[slug] || LOGOS[slug];
  return l ? `/assets/altitud/clients/color/${l}.webp` : undefined;
};

/** Projecte -> reel del mateix client (quan els slugs no coincideixen) */
export const REEL_DE: Record<string, string> = { "brainworks-center": "brainworks" };
