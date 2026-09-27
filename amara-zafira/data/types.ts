export type CategorySlug =
  | "vestidos"
  | "tops"
  | "pantalones"
  | "faldas"
  | "abrigos"
  | "accesorios";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "Única";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  /** Precio actual en euros. */
  price: number;
  /** Precio anterior en euros; si existe, el producto está rebajado. */
  compareAtPrice?: number;
  isNew?: boolean;
  colors: ProductColor[];
  sizes: Size[];
  composition: string;
  care: string[];
  /** Rutas dentro de /public. Orden: frente, espalda, detalle, cuerpo entero, producto solo, look. */
  images: string[];
  /** Slugs de productos que completan el look. */
  completeTheLook: string[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}
