/**
 * Carregador d'imatges estàtic: en lloc de demanar al servidor que redimensioni
 * cada imatge (lent a Hostinger), serveix les versions WebP ja generades amb
 * `yarn imatges` (scripts/optimitza-imatges.mjs).
 */
const AMPLADES = [480, 960, 1440, 1920, 2560];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const m = src.match(/^(\/assets\/.+)\.(jpe?g|png)$/i);
  if (!m) return src;
  const w = AMPLADES.find((a) => a >= width) ?? AMPLADES[AMPLADES.length - 1];
  return `${m[1]}-${w}.webp`;
}
