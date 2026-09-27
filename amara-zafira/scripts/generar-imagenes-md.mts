/*
 * Regenera IMAGENES.md a partir de data/site-images.ts y data/products.ts.
 * Uso: npm run imagenes:doc
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { products } from "../data/products.ts";
import { categories } from "../data/categories.ts";
import { siteImages, productViews, PRODUCT_IMAGE_SIZE } from "../data/site-images.ts";

const root = path.resolve(import.meta.dirname, "..");
const { width: pw, height: ph } = PRODUCT_IMAGE_SIZE;

const siteRows = siteImages
  .map((i) => `| \`public${i.path}\` | ${i.usage} | ${i.width} × ${i.height} px |`)
  .join("\n");

const productSections = categories
  .map((c) => {
    const list = products.filter((p) => p.category === c.slug);
    return `### ${c.name}\n\n${list
      .map((p) => `- **${p.name}** → \`public/images/productos/${p.slug}/\` (1.jpg … ${p.images.length}.jpg)`)
      .join("\n")}`;
  })
  .join("\n\n");

const md = `# Imágenes de Amara Zafira

Todas las imágenes están en \`public/images\`. La web las carga con \`next/image\`, que genera
automáticamente versiones AVIF/WebP en varios tamaños, así que **solo tienes que sustituir el archivo
manteniendo el mismo nombre y ruta**.

Ahora mismo hay dos opciones de imágenes provisionales:

1. **Siluetas neutras** (incluidas en el repositorio). Se regeneran con \`npm run provisionales\`.
2. **Fotos reales libres de uso** de Unsplash o Pexels. Se descargan con
   \`UNSPLASH_ACCESS_KEY=tu_clave npm run imagenes\` (o \`PEXELS_API_KEY=…\`). El script recorta cada
   foto al tamaño exacto y guarda los créditos en \`public/images/CREDITOS.md\`.

## Recomendaciones para tus fotos

- Formato **JPG** (calidad 80–85 %) o **WebP**. Peso orientativo: menos de 400 KB por foto.
- Respeta la **proporción** indicada; si no, la foto se recortará por el centro.
- Fondo neutro (blanco, crudo o gris claro) para las fotos de producto, como en Zara o COS.
- Usa siempre la misma luz y el mismo encuadre en todas las fichas para que la rejilla se vea uniforme.

## Portada, categorías y banners

| Archivo | Dónde se usa | Tamaño recomendado |
|---|---|---|
${siteRows}

## Fotos de producto

Cada producto tiene ${productViews.length} fotos de **${pw} × ${ph} px (proporción 3:4)**, en este orden:

| Archivo | Contenido | Dónde se ve |
|---|---|---|
${productViews
  .map(
    (v, i) =>
      `| \`${v.file}\` | ${v.label} | ${
        i === 0 ? "Ficha, rejillas, cesta y resultados de búsqueda" : i === 1 ? "Ficha y al pasar el ratón en la rejilla" : "Galería de la ficha"
      } |`,
  )
  .join("\n")}

Si un producto tiene menos fotos, borra las que sobren y quítalas del array \`images\` de ese
producto en \`data/products.ts\`.

${productSections}

## Otras imágenes

| Archivo | Dónde se usa |
|---|---|
| \`app/icon.svg\` | Icono de la pestaña del navegador (favicon) |
`;

await writeFile(path.join(root, "IMAGENES.md"), md);
console.log("IMAGENES.md actualizado");
