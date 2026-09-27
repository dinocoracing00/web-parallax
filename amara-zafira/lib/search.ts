import { products } from "@/data/products";
import { categories } from "@/data/categories";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Búsqueda sin tildes por nombre, categoría, color y descripción. */
export function searchProducts(query: string) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return products
    .map((p) => {
      const category = categories.find((c) => c.slug === p.category)?.name ?? "";
      const name = normalize(p.name);
      const haystack = normalize(
        [p.name, category, p.colors.map((c) => c.name).join(" "), p.description, p.composition].join(" "),
      );
      if (!terms.every((t) => haystack.includes(t))) return null;
      const score = terms.reduce((n, t) => n + (name.includes(t) ? 2 : 1), 0);
      return { p, score };
    })
    .filter((r): r is { p: (typeof products)[number]; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}

export const popularSearches = ["Vestido", "Lino", "Blazer", "Satinado", "Abrigo", "Bolso"];
