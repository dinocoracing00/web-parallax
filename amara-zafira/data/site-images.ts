/*
 * Inventario de imágenes de la web. Lo usan:
 *  - scripts/generar-provisionales.mts (crea imágenes provisionales)
 *  - scripts/descargar-imagenes.mts (descarga fotos reales de Unsplash/Pexels)
 *  - IMAGENES.md (documentación para sustituirlas por las tuyas)
 */

export interface SiteImage {
  path: string;
  usage: string;
  width: number;
  height: number;
  /** Búsqueda en inglés para el script de descarga. */
  query: string;
}

export const siteImages: SiteImage[] = [
  {
    path: "/images/hero/hero.jpg",
    usage: "Portada de inicio (escritorio)",
    width: 2400,
    height: 1350,
    query: "woman fashion editorial beige coat street",
  },
  {
    path: "/images/hero/hero-movil.jpg",
    usage: "Portada de inicio (móvil)",
    width: 1200,
    height: 2000,
    query: "woman fashion editorial portrait neutral outfit",
  },
  { path: "/images/categorias/vestidos.jpg", usage: "Bloque de categoría Vestidos", width: 1200, height: 1600, query: "woman wearing midi dress fashion" },
  { path: "/images/categorias/tops.jpg", usage: "Bloque de categoría Tops", width: 1200, height: 1600, query: "woman blouse fashion minimal" },
  { path: "/images/categorias/pantalones.jpg", usage: "Bloque de categoría Pantalones", width: 1200, height: 1600, query: "woman tailored trousers fashion" },
  { path: "/images/categorias/faldas.jpg", usage: "Bloque de categoría Faldas", width: 1200, height: 1600, query: "woman midi skirt fashion" },
  { path: "/images/categorias/abrigos.jpg", usage: "Bloque de categoría Abrigos", width: 1200, height: 1600, query: "woman long coat fashion" },
  { path: "/images/categorias/accesorios.jpg", usage: "Bloque de categoría Accesorios", width: 1200, height: 1600, query: "leather handbag woman fashion" },
  {
    path: "/images/editorial/editorial-1.jpg",
    usage: "Banner editorial de inicio (columna izquierda)",
    width: 1200,
    height: 1600,
    query: "woman linen outfit summer fashion editorial",
  },
  {
    path: "/images/editorial/editorial-2.jpg",
    usage: "Banner editorial de inicio (columna derecha, solo escritorio)",
    width: 1600,
    height: 1200,
    query: "woman fashion detail neutral tones",
  },
  {
    path: "/images/editorial/newsletter.jpg",
    usage: "Imagen del bloque de newsletter",
    width: 1200,
    height: 1500,
    query: "woman fashion portrait soft light",
  },
  {
    path: "/images/paginas/sobre-nosotros.jpg",
    usage: "Cabecera de Sobre nosotros",
    width: 2000,
    height: 1200,
    query: "fashion atelier studio clothes rack",
  },
  {
    path: "/images/paginas/estudio.jpg",
    usage: "Segunda imagen de Sobre nosotros",
    width: 1200,
    height: 1500,
    query: "fabric textile linen detail",
  },
  {
    path: "/images/og/og-default.jpg",
    usage: "Imagen al compartir en redes (Open Graph)",
    width: 1200,
    height: 630,
    query: "woman fashion editorial neutral",
  },
];

export const productViews = [
  { file: "1.jpg", label: "Modelo de frente", query: "front" },
  { file: "2.jpg", label: "Modelo de espalda", query: "back view" },
  { file: "3.jpg", label: "Detalle del tejido", query: "fabric detail" },
  { file: "4.jpg", label: "Cuerpo entero", query: "full body" },
  { file: "5.jpg", label: "Producto solo", query: "flat lay" },
  { file: "6.jpg", label: "Look completo", query: "street style" },
] as const;

export const PRODUCT_IMAGE_SIZE = { width: 1200, height: 1600 };

/** Términos de búsqueda por categoría para las fotos de producto. */
export const categoryQueries: Record<string, string> = {
  vestidos: "woman dress",
  tops: "woman blouse top",
  pantalones: "woman trousers",
  faldas: "woman skirt",
  abrigos: "woman coat",
  accesorios: "women accessories",
};
