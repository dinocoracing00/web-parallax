/*
 * Descarga fotos reales de moda femenina (libres de uso) desde Unsplash o
 * Pexels y las guarda en /public/images con el tamaño exacto que usa la web,
 * sustituyendo las imágenes provisionales.
 *
 * 1. Consigue una clave gratuita (tarda 2 minutos):
 *      Unsplash → https://unsplash.com/developers  (Access Key)
 *      Pexels   → https://www.pexels.com/api/      (API Key)
 * 2. Ejecuta UNA de estas órdenes:
 *      UNSPLASH_ACCESS_KEY=tu_clave npm run imagenes
 *      PEXELS_API_KEY=tu_clave npm run imagenes
 *    (En Windows PowerShell: $env:PEXELS_API_KEY="tu_clave"; npm run imagenes)
 *
 * Opciones:
 *   --solo=sitio       solo portada, categorías y banners
 *   --solo=productos   solo fotos de producto
 *   --producto=slug    solo un producto concreto
 *
 * Los créditos de cada foto se guardan en public/images/CREDITOS.md.
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- respuestas JSON de APIs externas */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { products } from "../data/products.ts";
import { siteImages, productViews, PRODUCT_IMAGE_SIZE } from "../data/site-images.ts";

const PUBLIC = path.resolve(import.meta.dirname, "../public");
const UNSPLASH = process.env.UNSPLASH_ACCESS_KEY;
const PEXELS = process.env.PEXELS_API_KEY;
const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
const only = arg("solo");
const onlyProduct = arg("producto");

if (!UNSPLASH && !PEXELS) {
  console.error(
    "\nFalta la clave de la API.\n\n" +
      "  UNSPLASH_ACCESS_KEY=tu_clave npm run imagenes\n" +
      "  PEXELS_API_KEY=tu_clave npm run imagenes\n\n" +
      "Consíguela gratis en https://unsplash.com/developers o https://www.pexels.com/api/\n",
  );
  process.exit(1);
}

/** Búsqueda en inglés para cada producto (mejores resultados que en español). */
const productQueries: Record<string, string> = {
  "vestido-midi-satinado-lia": "woman satin slip midi dress",
  "vestido-camisero-lino-noa": "woman linen shirt dress",
  "vestido-punto-canale-vera": "woman knit bodycon dress",
  "vestido-largo-estampado-alma": "woman floral maxi dress",
  "blusa-fluida-cuello-lazo-irene": "woman silk blouse",
  "camiseta-algodon-organico-basica": "woman basic t-shirt minimal",
  "top-satinado-tirantes-luna": "woman satin camisole top",
  "jersey-punto-fino-cuello-alto-clara": "woman turtleneck sweater",
  "pantalon-sastre-pinzas-marta": "woman tailored trousers",
  "vaquero-recto-tiro-alto-sara": "woman straight leg jeans",
  "pantalon-ancho-lino-greta": "woman wide leg linen pants",
  "pantalon-culotte-fluido-elena": "woman culottes outfit",
  "falda-midi-plisada-aurora": "woman pleated midi skirt",
  "falda-satinada-al-bies-nerea": "woman satin midi skirt",
  "falda-vaquera-larga-abril": "woman long denim skirt",
  "minifalda-tweed-olivia": "woman tweed mini skirt",
  "abrigo-largo-lana-carmen": "woman camel wool coat",
  "trench-clasico-ines": "woman trench coat",
  "blazer-oversize-lucia": "woman oversized blazer",
  "chaqueta-punto-cardigan-maya": "woman knit cardigan",
  "bolso-hombro-piel-ada": "leather shoulder bag",
  "panuelo-seda-estampado-rosa": "silk scarf fashion",
  "cinturon-piel-hebilla-dorada": "leather belt gold buckle",
  "pendientes-aro-dorado-sol": "gold hoop earrings",
};

interface Photo {
  id: string;
  download: (w: number, h: number) => string;
  author: string;
  authorUrl: string;
  pageUrl: string;
  source: "Unsplash" | "Pexels";
  track?: string;
}

const used = new Set<string>();
const credits: string[] = [];

async function search(query: string, orientation: "portrait" | "landscape", page = 1): Promise<Photo[]> {
  if (UNSPLASH) {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=30&page=${page}&orientation=${orientation}&content_filter=high`;
    const res = await fetch(url, { headers: { Authorization: `Client-ID ${UNSPLASH}`, "Accept-Version": "v1" } });
    if (!res.ok) throw new Error(`Unsplash respondió ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as { results: any[] };
    return data.results.map((p) => ({
      id: `u-${p.id}`,
      download: (w, h) => `${p.urls.raw}&w=${w}&h=${h}&fit=crop&crop=faces,entropy&q=80&fm=jpg`,
      author: p.user.name,
      authorUrl: `${p.user.links.html}?utm_source=amara_zafira&utm_medium=referral`,
      pageUrl: p.links.html,
      source: "Unsplash",
      track: p.links.download_location,
    }));
  }
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=40&page=${page}&orientation=${orientation}`;
  const res = await fetch(url, { headers: { Authorization: PEXELS! } });
  if (!res.ok) throw new Error(`Pexels respondió ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { photos: any[] };
  return data.photos.map((p) => ({
    id: `p-${p.id}`,
    download: (w, h) => `${p.src.original}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`,
    author: p.photographer,
    authorUrl: p.photographer_url,
    pageUrl: p.url,
    source: "Pexels",
  }));
}

/** Devuelve `count` fotos nuevas (no usadas antes) para una búsqueda. */
async function pick(query: string, orientation: "portrait" | "landscape", count: number) {
  const chosen: Photo[] = [];
  for (let page = 1; page <= 3 && chosen.length < count; page++) {
    for (const photo of await search(query, orientation, page)) {
      if (!used.has(photo.id)) {
        used.add(photo.id);
        chosen.push(photo);
        if (chosen.length === count) break;
      }
    }
  }
  if (chosen.length < count) console.warn(`  ⚠ Solo ${chosen.length} fotos para "${query}"`);
  return chosen;
}

async function save(photo: Photo, rel: string, w: number, h: number) {
  const res = await fetch(photo.download(w, h));
  if (!res.ok) throw new Error(`No se pudo descargar ${photo.pageUrl} (${res.status})`);
  const out = path.join(PUBLIC, rel);
  await mkdir(path.dirname(out), { recursive: true });
  // Recorte exacto al tamaño que espera la web.
  await sharp(Buffer.from(await res.arrayBuffer()))
    .resize(w, h, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  // Unsplash pide notificar cada descarga.
  if (photo.track && UNSPLASH) {
    await fetch(photo.track, { headers: { Authorization: `Client-ID ${UNSPLASH}` } }).catch(() => {});
  }
  credits.push(`| \`${rel}\` | [${photo.author}](${photo.authorUrl}) | [${photo.source}](${photo.pageUrl}) |`);
  console.log(`  ✓ ${rel}`);
}

async function run() {
  console.log(`\nDescargando fotos desde ${UNSPLASH ? "Unsplash" : "Pexels"}…\n`);

  if (only !== "productos" && !onlyProduct) {
    console.log("Imágenes del sitio");
    for (const img of siteImages) {
      const [photo] = await pick(img.query, img.width > img.height ? "landscape" : "portrait", 1);
      if (photo) await save(photo, img.path, img.width, img.height);
    }
  }

  if (only !== "sitio") {
    const list = onlyProduct ? products.filter((p) => p.slug === onlyProduct) : products;
    for (const p of list) {
      console.log(`\n${p.name}`);
      const photos = await pick(productQueries[p.slug] ?? p.name, "portrait", productViews.length);
      for (const [i, photo] of photos.entries()) {
        await save(photo, p.images[i], PRODUCT_IMAGE_SIZE.width, PRODUCT_IMAGE_SIZE.height);
      }
    }
  }

  await writeFile(
    path.join(PUBLIC, "images/CREDITOS.md"),
    `# Créditos de las imágenes\n\nFotos provisionales descargadas de ${UNSPLASH ? "Unsplash" : "Pexels"} (licencia libre). ` +
      `Sustitúyelas por fotografía propia antes de lanzar la tienda.\n\n| Archivo | Autor | Fuente |\n|---|---|---|\n${credits.join("\n")}\n`,
  );
  console.log(`\nListo: ${credits.length} fotos descargadas. Créditos en public/images/CREDITOS.md\n`);
}

run().catch((err) => {
  console.error(`\n✗ ${err.message}\n`);
  process.exit(1);
});
