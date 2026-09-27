import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" | "yearly" = "weekly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("", 1, "daily"),
    ...["novedades", "todo", "rebajas", ...categories.map((c) => c.slug)].map((c) => page(`/coleccion/${c}`, 0.9, "daily")),
    ...products.map((p) => ({ ...page(`/producto/${p.slug}`, 0.8), images: p.images.slice(0, 2).map((i) => `${site.url}${i}`) })),
    page("/sobre-nosotros", 0.5, "monthly"),
    page("/contacto", 0.5, "monthly"),
    page("/faq", 0.5, "monthly"),
    page("/guia-de-tallas", 0.5, "monthly"),
    ...["aviso-legal", "privacidad", "cookies", "condiciones-de-venta", "envios-y-devoluciones"].map((l) =>
      page(`/legal/${l}`, 0.2, "yearly"),
    ),
  ];
}
