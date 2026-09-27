"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { newProducts } from "@/data/products";
import { popularSearches, searchProducts } from "@/lib/search";
import ProductCard from "@/components/ProductCard";
import { IconSearch } from "@/components/Icons";

export default function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(params.get("q") ?? "");

  // Resultados en directo mientras escribes; la URL se actualiza para poder compartirla.
  useEffect(() => {
    const t = setTimeout(() => {
      const q = query.trim();
      router.replace(q ? `${pathname}?q=${encodeURIComponent(q)}` : pathname, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [query, pathname, router]);

  const results = useMemo(() => searchProducts(query), [query]);
  const q = query.trim();

  return (
    <div className="container-page pt-8 md:pt-14">
      <h1 className="sr-only">Buscar</h1>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="flex max-w-3xl items-center gap-3 border-b border-tinta pb-3">
        <IconSearch width={22} height={22} />
        <label htmlFor="buscar-q" className="sr-only">Buscar productos</label>
        <input
          id="buscar-q"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Qué estás buscando?"
          autoFocus
          autoComplete="off"
          className="w-full bg-transparent font-serif text-3xl font-light outline-none placeholder:text-topo md:text-5xl"
        />
      </form>
      <div className="mt-5 flex flex-wrap gap-2">
        {popularSearches.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setQuery(s)}
            className="border border-arena px-3 py-1.5 text-xs transition-colors hover:border-tinta"
          >
            {s}
          </button>
        ))}
      </div>

      <p className="eyebrow mt-12 mb-6" aria-live="polite">
        {q ? `${results.length} ${results.length === 1 ? "resultado" : "resultados"} para «${q}»` : "Te puede interesar"}
      </p>
      {q && results.length === 0 ? (
        <p className="max-w-md py-10 text-sm text-topo">
          No hemos encontrado nada con «{q}». Revisa la ortografía o prueba con términos más generales como «falda» o
          «negro».
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-2 gap-y-10 md:gap-x-4 lg:grid-cols-4">
          {(q ? results : newProducts).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
