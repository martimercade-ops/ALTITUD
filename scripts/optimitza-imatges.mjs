// Genera versions WebP de cada imatge (jpg/png) de public/assets a diverses amplades.
// El carregador d'imatges (src/lib/image-loader.ts) serveix la versió adequada
// sense que el servidor hagi de processar res. Executa: yarn imatges
import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

export const AMPLADES = [480, 960, 1440, 1920, 2560];
const ARREL = new URL("../public/assets/", import.meta.url).pathname;

async function* fitxers(dir) {
  for (const nom of await readdir(dir)) {
    const ruta = join(dir, nom);
    if ((await stat(ruta)).isDirectory()) yield* fitxers(ruta);
    else if ([".jpg", ".jpeg", ".png"].includes(extname(nom).toLowerCase())) yield ruta;
  }
}

let total = 0;
for await (const ruta of fitxers(ARREL)) {
  const base = ruta.slice(0, -extname(ruta).length);
  const { width } = await sharp(ruta).metadata();
  for (const w of AMPLADES) {
    const desti = `${base}-${w}.webp`;
    try {
      const [orig, gen] = await Promise.all([stat(ruta), stat(desti)]);
      if (gen.mtimeMs > orig.mtimeMs) continue;
    } catch {}
    await sharp(ruta)
      .resize({ width: Math.min(w, width), withoutEnlargement: true })
      .webp({ quality: w >= 1920 ? 60 : w >= 1440 ? 66 : 72, effort: 6 })
      .toFile(desti);
    total++;
  }
}
console.log(`Imatges generades: ${total}`);
