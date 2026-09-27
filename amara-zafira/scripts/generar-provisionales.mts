/*
 * Genera imágenes provisionales (siluetas en tonos neutros) para que la web
 * funcione completa sin fotos reales. Uso:
 *
 *   npm run provisionales            → crea solo las que faltan
 *   npm run provisionales -- --todas → las regenera todas
 *
 * Para sustituirlas por fotos reales: npm run imagenes (ver IMAGENES.md).
 */
import { mkdir, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { products } from "../data/products.ts";
import { siteImages, productViews, PRODUCT_IMAGE_SIZE } from "../data/site-images.ts";

const PUBLIC = path.resolve(import.meta.dirname, "../public");
const force = process.argv.includes("--todas");

const INK = "#141414";
const CRUDO = "#F5F1EA";
const ARENA = "#E4DACB";

// ——— utilidades de color ———
const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgbToHex = (c: number[]) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const mix = (a: string, b: string, t: number) => {
  const A = hexToRgb(a), B = hexToRgb(b);
  return rgbToHex(A.map((v, i) => v + (B[i] - v) * t));
};
const luminance = (h: string) => {
  const [r, g, b] = hexToRgb(h);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

// ——— siluetas (viewBox 300×400) ———
const SHAPES: Record<string, string> = {
  vestido: "M122 62 Q150 80 178 62 L190 112 L182 165 L228 372 L72 372 L118 165 L110 112 Z",
  top: "M96 112 L130 90 Q150 106 170 90 L204 112 L232 178 L206 188 L196 156 L196 290 L104 290 L104 156 L94 188 L68 178 Z",
  pantalon: "M104 64 L196 64 L208 372 L166 372 L150 150 L134 372 L92 372 Z",
  falda: "M114 104 L186 104 L228 336 L72 336 Z",
  abrigo: "M110 58 L150 82 L190 58 L232 110 L248 332 L216 338 L206 184 L206 376 L94 376 L94 184 L84 338 L52 332 L68 110 Z",
  bolso: "M84 176 L216 176 L226 330 L74 330 Z M112 176 Q112 104 150 104 Q188 104 188 176 L178 176 Q178 116 150 116 Q122 116 122 176 Z",
  panuelo: "M150 70 L280 200 L150 330 L20 200 Z",
  cinturon: "M20 188 L280 188 L280 212 L20 212 Z M190 178 L226 178 L226 222 L190 222 Z",
  pendientes: "M105 200 m-45 0 a45 45 0 1 0 90 0 a45 45 0 1 0 -90 0 M105 200 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0 Z M195 200 m-45 0 a45 45 0 1 0 90 0 a45 45 0 1 0 -90 0 M195 200 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0 Z",
};

function shapeFor(slug: string, category: string) {
  if (category === "accesorios") {
    if (slug.includes("bolso")) return "bolso";
    if (slug.includes("panuelo")) return "panuelo";
    if (slug.includes("cinturon")) return "cinturon";
    return "pendientes";
  }
  return (
    { vestidos: "vestido", tops: "top", pantalones: "pantalon", faldas: "falda", abrigos: "abrigo" } as Record<string, string>
  )[category];
}

// Figura estilizada (cabeza, cuello, piernas) sobre la que va la prenda.
const figure = (tone: string) => `
  <g fill="${tone}">
    <ellipse cx="150" cy="30" rx="17" ry="21"/>
    <rect x="143" y="46" width="14" height="18" rx="5"/>
    <path d="M128 300 L142 300 L140 398 L130 398 Z M158 300 L172 300 L170 398 L160 398 Z"/>
  </g>`;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function caption(w: number, h: number, title: string, subtitle: string, ink: string) {
  const fs = Math.round(Math.min(w, h) * 0.026);
  return `
  <text x="${w / 2}" y="${h * 0.075}" text-anchor="middle" font-family="Georgia, 'DejaVu Serif', serif"
    font-size="${fs * 1.1}" letter-spacing="${fs * 0.45}" fill="${ink}" opacity="0.75">AMARA ZAFIRA</text>
  <text x="${w / 2}" y="${h - h * 0.07}" text-anchor="middle" font-family="Georgia, 'DejaVu Serif', serif"
    font-style="italic" font-size="${fs * 1.2}" fill="${ink}" opacity="0.85">${esc(title)}</text>
  <text x="${w / 2}" y="${h - h * 0.07 + fs * 1.9}" text-anchor="middle" font-family="'DejaVu Sans', Arial, sans-serif"
    font-size="${fs * 0.72}" letter-spacing="${fs * 0.25}" fill="${ink}" opacity="0.55">${esc(subtitle.toUpperCase())}</text>`;
}

function productSvg(p: (typeof products)[number], viewIndex: number) {
  const { width: w, height: h } = PRODUCT_IMAGE_SIZE;
  const garment = p.colors[0].hex;
  const alt = p.colors[1]?.hex ?? mix(garment, INK, 0.3);
  const light = luminance(garment) > 0.7;
  let bgTop = light ? mix(ARENA, "#B9AC99", 0.35) : CRUDO;
  let bgBottom = light ? mix(ARENA, "#9F9383", 0.5) : ARENA;
  const shape = SHAPES[shapeFor(p.slug, p.category)];
  const isAccessory = p.category === "accesorios";
  const figureTone = light ? mix(bgBottom, INK, 0.25) : mix(ARENA, "#A8998A", 0.6);

  // Encaje del viewBox 300×400 dentro de la imagen.
  let scale = Math.min(w / 300, h / 400) * 0.78;
  const cx = w / 2;
  let cy = h / 2;
  let mirror = false;
  let showFigure = !isAccessory;
  let texture = false;
  let fill = garment;

  switch (viewIndex) {
    case 1: // espalda
      mirror = true;
      bgTop = mix(bgTop, "#FFFFFF", 0.3);
      break;
    case 2: // detalle
      scale *= 2.7;
      cy = h * 0.72;
      showFigure = false;
      texture = true;
      break;
    case 3: // cuerpo entero
      scale *= 0.82;
      break;
    case 4: // producto solo
      showFigure = false;
      scale *= 0.7;
      bgTop = "#FBF9F5";
      bgBottom = CRUDO;
      break;
    case 5: // look en color alternativo
      fill = alt;
      bgTop = mix(garment, "#FFFFFF", light ? 0.1 : 0.72);
      bgBottom = mix(garment, "#FFFFFF", light ? 0 : 0.55);
      break;
  }

  const ink = luminance(bgBottom) > 0.5 ? INK : "#F5F1EA";
  const tx = cx - 150 * scale * (mirror ? -1 : 1);
  const ty = cy - 200 * scale;
  const transform = `translate(${tx} ${ty}) scale(${mirror ? -scale : scale} ${scale})`;
  const stroke = mix(fill, luminance(fill) > 0.5 ? INK : "#FFFFFF", 0.18);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${bgTop}"/><stop offset="1" stop-color="${bgBottom}"/>
    </linearGradient>
    <pattern id="tex" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="${stroke}" stroke-width="1.4"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  ${viewIndex === 4 ? `<ellipse cx="${w / 2}" cy="${h * 0.8}" rx="${w * 0.28}" ry="${h * 0.018}" fill="${INK}" opacity="0.06"/>` : ""}
  <g transform="${transform}">
    ${showFigure ? figure(figureTone) : ""}
    <path d="${shape}" fill="${fill}" fill-rule="evenodd"/>
    ${texture ? `<path d="${shape}" fill="url(#tex)" fill-rule="evenodd" opacity="0.5"/>` : ""}
  </g>
  ${caption(w, h, p.name, productViews[viewIndex].label, ink)}
</svg>`;
}

const SITE_SHAPES: Record<string, string> = {
  vestidos: "vestido",
  tops: "top",
  pantalones: "pantalon",
  faldas: "falda",
  accesorios: "bolso",
  "editorial-1": "vestido",
  newsletter: "top",
};

function siteSvg(w: number, h: number, imagePath: string, seed: number) {
  const key = path.basename(imagePath, ".jpg");
  const shape = SHAPES[SITE_SHAPES[key] ?? "abrigo"];
  const isBag = SITE_SHAPES[key] === "bolso";
  const tones = [
    ["#EDE5D8", "#CDBEA8", "#8A6A4F"],
    ["#F2EEE7", "#D9CFC0", "#2A2622"],
    ["#E8DED0", "#BFAE98", "#5B4636"],
    ["#F0E9DF", "#D6C8B5", "#6B6B47"],
  ][seed % 4];
  const landscape = w > h;
  const figScale = (h / 400) * (landscape ? 0.92 : 0.8);
  const fx = landscape ? w * 0.66 : w / 2;
  const tx = fx - 150 * figScale;
  const ty = h - 400 * figScale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${tones[0]}"/><stop offset="1" stop-color="${tones[1]}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="${fx - h * 0.28}" y="${h * 0.12}" width="${h * 0.56}" height="${h}" rx="${h * 0.28}" fill="#FFFFFF" opacity="0.28"/>
  <g transform="translate(${tx} ${ty}) scale(${figScale})">
    ${isBag ? "" : figure(mix(tones[2], tones[1], 0.35))}
    <path d="${shape}" fill="${tones[2]}" fill-rule="evenodd"/>
  </g>
</svg>`;
}

async function exists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function write(rel: string, svg: string) {
  const out = path.join(PUBLIC, rel);
  if (!force && (await exists(out))) return false;
  await mkdir(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  return true;
}

let created = 0;
for (const [i, img] of siteImages.entries()) {
  if (await write(img.path, siteSvg(img.width, img.height, img.path, i))) created++;
}
for (const p of products) {
  for (let v = 0; v < productViews.length; v++) {
    if (await write(p.images[v], productSvg(p, v))) created++;
  }
}
console.log(`Imágenes provisionales creadas: ${created}`);
