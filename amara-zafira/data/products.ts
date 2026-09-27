import type { Product, ProductColor, Size } from "./types";

/*
 * Catálogo local. Para conectar Shopify o Stripe más adelante basta con
 * sustituir este array por los datos que devuelva su API manteniendo el
 * tipo `Product` (ver data/types.ts). El diseño no depende de dónde vengan.
 */

const C = {
  negro: { name: "Negro", hex: "#141414" },
  crudo: { name: "Crudo", hex: "#EFE8DC" },
  beige: { name: "Beige", hex: "#D8C7AE" },
  camel: { name: "Camel", hex: "#B8895A" },
  blanco: { name: "Blanco", hex: "#FAFAF7" },
  marengo: { name: "Gris marengo", hex: "#4A4A4A" },
  marino: { name: "Azul marino", hex: "#1F2A44" },
  oliva: { name: "Verde oliva", hex: "#6B6B47" },
  burdeos: { name: "Burdeos", hex: "#6B2632" },
  rosa: { name: "Rosa empolvado", hex: "#D9B8AE" },
  chocolate: { name: "Chocolate", hex: "#4E3629" },
  topo: { name: "Topo", hex: "#8A7F73" },
  cielo: { name: "Azul cielo", hex: "#A9BCCF" },
  azulMedio: { name: "Azul medio", hex: "#5D7596" },
  azulOscuro: { name: "Azul oscuro", hex: "#2E3E5C" },
  champan: { name: "Champán", hex: "#E6D5B8" },
  dorado: { name: "Dorado", hex: "#C9A96E" },
} satisfies Record<string, ProductColor>;

const ROPA: Size[] = ["XS", "S", "M", "L", "XL"];
const UNICA: Size[] = ["Única"];

const imgs = (slug: string) =>
  Array.from({ length: 6 }, (_, i) => `/images/productos/${slug}/${i + 1}.jpg`);

const LAVADO_DELICADO = [
  "Lavar a máquina a 30 °C en programa delicado",
  "No usar lejía",
  "Planchar a temperatura baja",
  "No secar en secadora",
];

const LAVADO_LANA = [
  "Limpieza en seco profesional",
  "No lavar a máquina",
  "Planchar a temperatura media con paño",
  "Guardar doblado para conservar la forma",
];

const LAVADO_ALGODON = [
  "Lavar a máquina a 30 °C",
  "Lavar con colores similares",
  "Planchar a temperatura media",
  "Secar en plano",
];

const LAVADO_LINO = [
  "Lavar a máquina a 30 °C",
  "No usar lejía",
  "Planchar en húmedo a temperatura alta",
  "El lino se arruga de forma natural: forma parte de su encanto",
];

const LAVADO_PIEL = [
  "No lavar",
  "Limpiar con un paño suave y seco",
  "Proteger de la humedad y del sol directo",
  "Guardar en su funda de algodón",
];

export const products: Product[] = [
  // ——— Vestidos ———
  {
    slug: "vestido-midi-satinado-lia",
    name: "Vestido midi satinado Lía",
    category: "vestidos",
    description:
      "Vestido midi de caída fluida con escote en pico y tirantes finos regulables. Brillo suave para el día y para la noche.",
    price: 49.95,
    isNew: true,
    colors: [C.champan, C.negro],
    sizes: ROPA,
    composition: "100 % poliéster reciclado. Forro: 100 % viscosa.",
    care: LAVADO_DELICADO,
    images: imgs("vestido-midi-satinado-lia"),
    completeTheLook: ["blazer-oversize-lucia", "pendientes-aro-dorado-sol", "bolso-hombro-piel-ada"],
  },
  {
    slug: "vestido-camisero-lino-noa",
    name: "Vestido camisero de lino Noa",
    category: "vestidos",
    description:
      "Camisero largo en lino lavado con cinturón a juego y botones de nácar. Fresco, ligero y atemporal.",
    price: 59.95,
    colors: [C.crudo, C.cielo],
    sizes: ROPA,
    composition: "100 % lino europeo.",
    care: LAVADO_LINO,
    images: imgs("vestido-camisero-lino-noa"),
    completeTheLook: ["cinturon-piel-hebilla-dorada", "bolso-hombro-piel-ada", "panuelo-seda-estampado-rosa"],
  },
  {
    slug: "vestido-punto-canale-vera",
    name: "Vestido de punto canalé Vera",
    category: "vestidos",
    description:
      "Vestido ajustado de punto canalé con cuello redondo y manga larga. Se adapta al cuerpo sin marcar.",
    price: 39.95,
    compareAtPrice: 49.95,
    colors: [C.negro, C.topo],
    sizes: ROPA,
    composition: "70 % viscosa, 25 % poliamida, 5 % elastano.",
    care: LAVADO_DELICADO,
    images: imgs("vestido-punto-canale-vera"),
    completeTheLook: ["abrigo-largo-lana-carmen", "cinturon-piel-hebilla-dorada", "pendientes-aro-dorado-sol"],
  },
  {
    slug: "vestido-largo-estampado-alma",
    name: "Vestido largo estampado Alma",
    category: "vestidos",
    description:
      "Vestido largo con estampado floral pequeño, mangas abullonadas y volante en el bajo. Romántico sin ser recargado.",
    price: 69.95,
    isNew: true,
    colors: [C.burdeos, C.oliva],
    sizes: ROPA,
    composition: "100 % viscosa LENZING™ ECOVERO™.",
    care: LAVADO_DELICADO,
    images: imgs("vestido-largo-estampado-alma"),
    completeTheLook: ["chaqueta-punto-cardigan-maya", "bolso-hombro-piel-ada", "cinturon-piel-hebilla-dorada"],
  },

  // ——— Tops ———
  {
    slug: "blusa-fluida-cuello-lazo-irene",
    name: "Blusa fluida con lazo Irene",
    category: "tops",
    description:
      "Blusa de tacto sedoso con lazo al cuello y puños abotonados. Elegante bajo una americana o sola con vaqueros.",
    price: 35.95,
    colors: [C.crudo, C.negro],
    sizes: ROPA,
    composition: "100 % poliéster reciclado.",
    care: LAVADO_DELICADO,
    images: imgs("blusa-fluida-cuello-lazo-irene"),
    completeTheLook: ["pantalon-sastre-pinzas-marta", "blazer-oversize-lucia", "pendientes-aro-dorado-sol"],
  },
  {
    slug: "camiseta-algodon-organico-basica",
    name: "Camiseta básica de algodón orgánico",
    category: "tops",
    description:
      "Camiseta de manga corta en algodón orgánico de gramaje medio. El básico que se queda en el armario años.",
    price: 19.95,
    colors: [C.blanco, C.negro, C.beige],
    sizes: ROPA,
    composition: "100 % algodón orgánico certificado GOTS.",
    care: LAVADO_ALGODON,
    images: imgs("camiseta-algodon-organico-basica"),
    completeTheLook: ["vaquero-recto-tiro-alto-sara", "trench-clasico-ines", "bolso-hombro-piel-ada"],
  },
  {
    slug: "top-satinado-tirantes-luna",
    name: "Top satinado de tirantes Luna",
    category: "tops",
    description:
      "Top lencero con escote en pico y remate de encaje. Perfecto con falda midi o bajo un cárdigan.",
    price: 25.95,
    compareAtPrice: 29.95,
    colors: [C.rosa, C.negro],
    sizes: ROPA,
    composition: "100 % poliéster. Encaje: 90 % poliamida, 10 % elastano.",
    care: LAVADO_DELICADO,
    images: imgs("top-satinado-tirantes-luna"),
    completeTheLook: ["falda-midi-plisada-aurora", "chaqueta-punto-cardigan-maya", "pendientes-aro-dorado-sol"],
  },
  {
    slug: "jersey-punto-fino-cuello-alto-clara",
    name: "Jersey de punto fino Clara",
    category: "tops",
    description:
      "Jersey de cuello alto en punto fino con mezcla de lana merino. Abriga sin abultar.",
    price: 45.95,
    isNew: true,
    colors: [C.crudo, C.camel, C.marengo],
    sizes: ROPA,
    composition: "50 % lana merino, 50 % viscosa.",
    care: LAVADO_LANA,
    images: imgs("jersey-punto-fino-cuello-alto-clara"),
    completeTheLook: ["falda-satinada-al-bies-nerea", "abrigo-largo-lana-carmen", "cinturon-piel-hebilla-dorada"],
  },

  // ——— Pantalones ———
  {
    slug: "pantalon-sastre-pinzas-marta",
    name: "Pantalón sastre con pinzas Marta",
    category: "pantalones",
    description:
      "Pantalón de tiro alto con pinzas delanteras y pernera recta. Raya marcada para un acabado impecable.",
    price: 49.95,
    colors: [C.negro, C.beige],
    sizes: ROPA,
    composition: "64 % poliéster, 33 % viscosa, 3 % elastano.",
    care: LAVADO_DELICADO,
    images: imgs("pantalon-sastre-pinzas-marta"),
    completeTheLook: ["blusa-fluida-cuello-lazo-irene", "blazer-oversize-lucia", "cinturon-piel-hebilla-dorada"],
  },
  {
    slug: "vaquero-recto-tiro-alto-sara",
    name: "Vaquero recto de tiro alto Sara",
    category: "pantalones",
    description:
      "Vaquero rígido de tiro alto y pierna recta hasta el tobillo. Denim de algodón con lavado suave.",
    price: 45.95,
    colors: [C.azulMedio, C.azulOscuro],
    sizes: ROPA,
    composition: "100 % algodón.",
    care: LAVADO_ALGODON,
    images: imgs("vaquero-recto-tiro-alto-sara"),
    completeTheLook: ["camiseta-algodon-organico-basica", "trench-clasico-ines", "bolso-hombro-piel-ada"],
  },
  {
    slug: "pantalon-ancho-lino-greta",
    name: "Pantalón ancho de lino Greta",
    category: "pantalones",
    description:
      "Pantalón de pernera amplia y cintura elástica en la espalda. Lino lavado de caída natural.",
    price: 55.95,
    compareAtPrice: 69.95,
    colors: [C.crudo, C.oliva],
    sizes: ROPA,
    composition: "100 % lino.",
    care: LAVADO_LINO,
    images: imgs("pantalon-ancho-lino-greta"),
    completeTheLook: ["top-satinado-tirantes-luna", "chaqueta-punto-cardigan-maya", "panuelo-seda-estampado-rosa"],
  },
  {
    slug: "pantalon-culotte-fluido-elena",
    name: "Pantalón culotte fluido Elena",
    category: "pantalones",
    description:
      "Culotte de largo tobillero con pliegues y bolsillos laterales. Movimiento y comodidad todo el día.",
    price: 39.95,
    isNew: true,
    colors: [C.negro, C.chocolate],
    sizes: ROPA,
    composition: "100 % viscosa.",
    care: LAVADO_DELICADO,
    images: imgs("pantalon-culotte-fluido-elena"),
    completeTheLook: ["jersey-punto-fino-cuello-alto-clara", "cinturon-piel-hebilla-dorada", "bolso-hombro-piel-ada"],
  },

  // ——— Faldas ———
  {
    slug: "falda-midi-plisada-aurora",
    name: "Falda midi plisada Aurora",
    category: "faldas",
    description:
      "Falda plisada de largo midi con cintura elástica. Se mueve contigo y combina con todo.",
    price: 45.95,
    colors: [C.beige, C.negro],
    sizes: ROPA,
    composition: "100 % poliéster reciclado.",
    care: LAVADO_DELICADO,
    images: imgs("falda-midi-plisada-aurora"),
    completeTheLook: ["jersey-punto-fino-cuello-alto-clara", "trench-clasico-ines", "bolso-hombro-piel-ada"],
  },
  {
    slug: "falda-satinada-al-bies-nerea",
    name: "Falda satinada al bies Nerea",
    category: "faldas",
    description:
      "Falda midi cortada al bies en satén mate. Cae sobre la cadera y se abre suavemente en el bajo.",
    price: 39.95,
    isNew: true,
    colors: [C.rosa, C.oliva],
    sizes: ROPA,
    composition: "100 % viscosa.",
    care: LAVADO_DELICADO,
    images: imgs("falda-satinada-al-bies-nerea"),
    completeTheLook: ["camiseta-algodon-organico-basica", "blazer-oversize-lucia", "pendientes-aro-dorado-sol"],
  },
  {
    slug: "falda-vaquera-larga-abril",
    name: "Falda vaquera larga Abril",
    category: "faldas",
    description:
      "Falda larga de denim con abertura delantera y cinco bolsillos. Un clásico que vuelve cada temporada.",
    price: 42.95,
    compareAtPrice: 49.95,
    colors: [C.azulMedio, C.crudo],
    sizes: ROPA,
    composition: "100 % algodón.",
    care: LAVADO_ALGODON,
    images: imgs("falda-vaquera-larga-abril"),
    completeTheLook: ["blusa-fluida-cuello-lazo-irene", "cinturon-piel-hebilla-dorada", "bolso-hombro-piel-ada"],
  },
  {
    slug: "minifalda-tweed-olivia",
    name: "Minifalda de tweed Olivia",
    category: "faldas",
    description:
      "Minifalda de tweed con flecos en el bajo y cremallera invisible. Textura que eleva cualquier básico.",
    price: 35.95,
    colors: [C.crudo, C.negro],
    sizes: ROPA,
    composition: "58 % poliéster, 30 % algodón, 12 % acrílico. Forro: 100 % poliéster.",
    care: LAVADO_LANA,
    images: imgs("minifalda-tweed-olivia"),
    completeTheLook: ["jersey-punto-fino-cuello-alto-clara", "abrigo-largo-lana-carmen", "pendientes-aro-dorado-sol"],
  },

  // ——— Abrigos ———
  {
    slug: "abrigo-largo-lana-carmen",
    name: "Abrigo largo de lana Carmen",
    category: "abrigos",
    description:
      "Abrigo largo de corte recto con solapa ancha y bolsillos de ribete. Mezcla de lana con tacto suave.",
    price: 89.95,
    isNew: true,
    colors: [C.camel, C.negro],
    sizes: ROPA,
    composition: "50 % lana, 45 % poliéster, 5 % otras fibras. Forro: 100 % viscosa.",
    care: LAVADO_LANA,
    images: imgs("abrigo-largo-lana-carmen"),
    completeTheLook: ["jersey-punto-fino-cuello-alto-clara", "pantalon-sastre-pinzas-marta", "bolso-hombro-piel-ada"],
  },
  {
    slug: "trench-clasico-ines",
    name: "Trench clásico Inés",
    category: "abrigos",
    description:
      "Gabardina cruzada con cinturón, charreteras y forro de cuadros. La prenda de entretiempo por excelencia.",
    price: 79.95,
    colors: [C.beige, C.negro],
    sizes: ROPA,
    composition: "65 % algodón, 35 % poliéster. Tratamiento repelente al agua.",
    care: LAVADO_LANA,
    images: imgs("trench-clasico-ines"),
    completeTheLook: ["camiseta-algodon-organico-basica", "vaquero-recto-tiro-alto-sara", "panuelo-seda-estampado-rosa"],
  },
  {
    slug: "blazer-oversize-lucia",
    name: "Blazer oversize Lucía",
    category: "abrigos",
    description:
      "Americana de hombros marcados y largo cadera con un botón. Estructura sastre con aire relajado.",
    price: 69.95,
    compareAtPrice: 79.95,
    colors: [C.negro, C.marengo, C.beige],
    sizes: ROPA,
    composition: "68 % poliéster, 28 % viscosa, 4 % elastano. Forro: 100 % poliéster.",
    care: LAVADO_LANA,
    images: imgs("blazer-oversize-lucia"),
    completeTheLook: ["blusa-fluida-cuello-lazo-irene", "pantalon-sastre-pinzas-marta", "pendientes-aro-dorado-sol"],
  },
  {
    slug: "chaqueta-punto-cardigan-maya",
    name: "Cárdigan de punto Maya",
    category: "abrigos",
    description:
      "Cárdigan de punto grueso con botones dorados y bolsillos de parche. Acogedor y muy fácil de llevar.",
    price: 49.95,
    colors: [C.crudo, C.chocolate],
    sizes: ROPA,
    composition: "40 % algodón, 30 % acrílico, 20 % lana, 10 % alpaca.",
    care: LAVADO_LANA,
    images: imgs("chaqueta-punto-cardigan-maya"),
    completeTheLook: ["top-satinado-tirantes-luna", "falda-midi-plisada-aurora", "bolso-hombro-piel-ada"],
  },

  // ——— Accesorios ———
  {
    slug: "bolso-hombro-piel-ada",
    name: "Bolso de hombro de piel Ada",
    category: "accesorios",
    description:
      "Bolso de piel lisa con asa corta, cierre magnético y bolsillo interior. Cabe todo lo que necesitas a diario.",
    price: 79.95,
    isNew: true,
    colors: [C.negro, C.camel],
    sizes: UNICA,
    composition: "Exterior: 100 % piel de vacuno. Forro: 100 % algodón. Medidas: 28 × 18 × 9 cm.",
    care: LAVADO_PIEL,
    images: imgs("bolso-hombro-piel-ada"),
    completeTheLook: ["trench-clasico-ines", "vaquero-recto-tiro-alto-sara", "panuelo-seda-estampado-rosa"],
  },
  {
    slug: "panuelo-seda-estampado-rosa",
    name: "Pañuelo de seda estampado Rosa",
    category: "accesorios",
    description:
      "Pañuelo cuadrado de seda con estampado de cadenas y bordes enrollados a mano. Al cuello, en el pelo o en el bolso.",
    price: 25.95,
    colors: [C.burdeos, C.marino],
    sizes: UNICA,
    composition: "100 % seda. Medidas: 70 × 70 cm.",
    care: ["Limpieza en seco", "No lavar a máquina", "Planchar a temperatura baja por el revés"],
    images: imgs("panuelo-seda-estampado-rosa"),
    completeTheLook: ["trench-clasico-ines", "camiseta-algodon-organico-basica", "bolso-hombro-piel-ada"],
  },
  {
    slug: "cinturon-piel-hebilla-dorada",
    name: "Cinturón de piel con hebilla dorada",
    category: "accesorios",
    description:
      "Cinturón fino de piel con hebilla metálica de acabado dorado mate. Marca la cintura en vestidos y abrigos.",
    price: 29.95,
    compareAtPrice: 35.95,
    colors: [C.negro, C.chocolate],
    sizes: ["XS", "S", "M", "L"],
    composition: "100 % piel de vacuno. Hebilla de zamak con baño dorado. Ancho: 2,5 cm.",
    care: LAVADO_PIEL,
    images: imgs("cinturon-piel-hebilla-dorada"),
    completeTheLook: ["vestido-camisero-lino-noa", "pantalon-sastre-pinzas-marta", "abrigo-largo-lana-carmen"],
  },
  {
    slug: "pendientes-aro-dorado-sol",
    name: "Pendientes de aro Sol",
    category: "accesorios",
    description:
      "Aros medianos de latón con baño de oro de 18 quilates y cierre de presión. Ligeros para llevar todo el día.",
    price: 19.95,
    colors: [C.dorado],
    sizes: UNICA,
    composition: "Latón con baño de oro de 18 k. Sin níquel. Diámetro: 3 cm.",
    care: ["Evitar el contacto con agua y perfume", "Limpiar con un paño suave", "Guardar en su bolsa individual"],
    images: imgs("pendientes-aro-dorado-sol"),
    completeTheLook: ["vestido-midi-satinado-lia", "blazer-oversize-lucia", "bolso-hombro-piel-ada"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export const newProducts = products.filter((p) => p.isNew);
export const saleProducts = products.filter((p) => p.compareAtPrice);

export function getRelated(product: Product, limit = 4) {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .concat(products.filter((p) => p.category !== product.category && p.isNew))
    .slice(0, limit);
}
