"use client";

import { useCallback, useMemo, useState } from "react";
import type { Product } from "@/data/types";
import ProductCard from "@/components/ProductCard";
import Drawer from "@/components/Drawer";
import { IconFilter, IconGrid2, IconGrid4 } from "@/components/Icons";

const SORTS = {
  recomendados: "Recomendados",
  novedades: "Novedades",
  "precio-asc": "Precio: de menor a mayor",
  "precio-desc": "Precio: de mayor a menor",
} as const;
type Sort = keyof typeof SORTS;

const PRICE_RANGES = [
  { id: "hasta-30", label: "Hasta 30 €", test: (p: number) => p < 30 },
  { id: "30-50", label: "De 30 € a 50 €", test: (p: number) => p >= 30 && p < 50 },
  { id: "50-70", label: "De 50 € a 70 €", test: (p: number) => p >= 50 && p < 70 },
  { id: "desde-70", label: "Más de 70 €", test: (p: number) => p >= 70 },
];

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "Única"];

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function CollectionView({ products }: { products: Product[] }) {
  const [large, setLarge] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("recomendados");
  const closeFilters = useCallback(() => setFiltersOpen(false), []);

  const available = useMemo(() => {
    const sizeSet = new Set<string>();
    const colorMap = new Map<string, string>();
    products.forEach((p) => {
      p.sizes.forEach((s) => sizeSet.add(s));
      p.colors.forEach((c) => colorMap.set(c.name, c.hex));
    });
    return {
      sizes: SIZE_ORDER.filter((s) => sizeSet.has(s)),
      colors: [...colorMap].map(([name, hex]) => ({ name, hex })).sort((a, b) => a.name.localeCompare(b.name, "es")),
    };
  }, [products]);

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (sizes.length === 0 || p.sizes.some((s) => sizes.includes(s))) &&
        (colors.length === 0 || p.colors.some((c) => colors.includes(c.name))) &&
        (prices.length === 0 || PRICE_RANGES.some((r) => prices.includes(r.id) && r.test(p.price))),
    );
    switch (sort) {
      case "novedades":
        return [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
      case "precio-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "precio-desc":
        return [...list].sort((a, b) => b.price - a.price);
      default:
        return list;
    }
  }, [products, sizes, colors, prices, sort]);

  const activeCount = sizes.length + colors.length + prices.length;
  const clear = () => {
    setSizes([]);
    setColors([]);
    setPrices([]);
  };

  return (
    <>
      <div className="sticky top-14 z-20 border-y border-arena bg-blanco/95 backdrop-blur-sm md:top-16">
        <div className="container-page flex h-12 items-center justify-between gap-4">
          <button type="button" onClick={() => setFiltersOpen(true)} className="eyebrow flex shrink-0 items-center gap-2">
            <IconFilter width={18} height={18} />
            Filtrar{activeCount > 0 && ` (${activeCount})`}
          </button>
          <p className="hidden text-xs text-topo sm:block" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "prenda" : "prendas"}
          </p>
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <label className="flex items-center gap-2">
              <span className="sr-only">Ordenar por</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="eyebrow max-w-[8.5rem] cursor-pointer appearance-none truncate bg-transparent pr-1 text-right outline-none sm:max-w-none"
              >
                {Object.entries(SORTS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex shrink-0 items-center gap-1 border-l border-arena pl-2 sm:pl-3" role="group" aria-label="Vista">
              <button
                type="button"
                onClick={() => setLarge(true)}
                aria-pressed={large}
                aria-label="Vista grande"
                className={`p-1 transition-opacity ${large ? "" : "opacity-35"}`}
              >
                <IconGrid2 width={18} height={18} />
              </button>
              <button
                type="button"
                onClick={() => setLarge(false)}
                aria-pressed={!large}
                aria-label="Vista compacta"
                className={`p-1 transition-opacity ${large ? "opacity-35" : ""}`}
              >
                <IconGrid4 width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page pt-6 md:pt-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-24 text-center">
            <p className="font-serif text-2xl font-light">No hay prendas con estos filtros</p>
            <button type="button" onClick={clear} className="btn-outline">Quitar filtros</button>
          </div>
        ) : (
          <div
            className={`grid gap-x-2 gap-y-10 md:gap-x-4 md:gap-y-14 ${
              large ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {filtered.map((p, i) => (
              <ProductCard
                key={p.slug}
                product={p}
                priority={i < 4}
                sizes={large ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
              />
            ))}
          </div>
        )}
      </div>

      <Drawer
        open={filtersOpen}
        onClose={closeFilters}
        title="Filtrar"
        side="left"
        footer={
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={clear} className="btn-outline px-4" disabled={activeCount === 0}>
              Borrar
            </button>
            <button type="button" onClick={closeFilters} className="btn-primary px-4">
              Ver {filtered.length}
            </button>
          </div>
        }
      >
        <div className="flex flex-col divide-y divide-arena px-5 md:px-6">
          <fieldset className="py-6">
            <legend className="eyebrow mb-4">Talla</legend>
            <div className="flex flex-wrap gap-2">
              {available.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSizes((v) => toggle(v, s))}
                  aria-pressed={sizes.includes(s)}
                  className={`h-10 min-w-12 border px-3 text-xs transition-colors ${
                    sizes.includes(s) ? "border-tinta bg-tinta text-blanco" : "border-arena hover:border-tinta"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="py-6">
            <legend className="eyebrow mb-4">Color</legend>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {available.colors.map((c) => (
                <label key={c.name} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={colors.includes(c.name)}
                    onChange={() => setColors((v) => toggle(v, c.name))}
                    className="peer sr-only"
                  />
                  <span
                    className="h-5 w-5 shrink-0 rounded-full border border-black/10 ring-offset-2 peer-checked:ring-1 peer-checked:ring-tinta peer-focus-visible:ring-1 peer-focus-visible:ring-tinta"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="py-6">
            <legend className="eyebrow mb-4">Precio</legend>
            <div className="flex flex-col gap-3">
              {PRICE_RANGES.map((r) => (
                <label key={r.id} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={prices.includes(r.id)}
                    onChange={() => setPrices((v) => toggle(v, r.id))}
                    className="h-4 w-4 accent-tinta"
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </Drawer>
    </>
  );
}
