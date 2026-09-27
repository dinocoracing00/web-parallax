import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "vestidos",
    name: "Vestidos",
    description:
      "Vestidos midi, camiseros y de punto para ir de la oficina a la cena sin cambiarte.",
    image: "/images/categorias/vestidos.jpg",
  },
  {
    slug: "tops",
    name: "Tops",
    description:
      "Blusas fluidas, básicos de algodón orgánico y punto fino para combinar a diario.",
    image: "/images/categorias/tops.jpg",
  },
  {
    slug: "pantalones",
    name: "Pantalones",
    description:
      "Sastre, vaqueros de tiro alto y líneas amplias en lino. Cortes que estilizan.",
    image: "/images/categorias/pantalones.jpg",
  },
  {
    slug: "faldas",
    name: "Faldas",
    description:
      "Plisadas, satinadas al bies y vaqueras largas. Movimiento en cada paso.",
    image: "/images/categorias/faldas.jpg",
  },
  {
    slug: "abrigos",
    name: "Abrigos",
    description:
      "Abrigos de lana, trench y blazers oversize. Las capas que definen tu silueta.",
    image: "/images/categorias/abrigos.jpg",
  },
  {
    slug: "accesorios",
    name: "Accesorios",
    description:
      "Bolsos de piel, pañuelos de seda y joyería dorada para terminar el look.",
    image: "/images/categorias/accesorios.jpg",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
