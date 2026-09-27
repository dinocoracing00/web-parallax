"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { newProducts } from "@/data/products";
import { popularSearches, searchProducts } from "@/lib/search";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { IconClose, IconSearch } from "@/components/Icons";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const close = useCallback(() => setSearchOpen(false), [setSearchOpen]);

  const results = useMemo(() => searchProducts(query), [query]);

  useEffect(() => {
    if (!searchOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, close]);

  if (!searchOpen) return null;

  const shown = query.trim() ? results : newProducts;

  return (
    <div role="dialog" aria-modal="true" aria-label="Buscar" className="fixed inset-0 z-50 overflow-y-auto bg-blanco animate-fade-in">
      <div className="container-page">
        <div className="flex h-14 items-center justify-end md:h-16">
          <button type="button" onClick={close} aria-label="Cerrar buscador" className="-mr-2 p-2">
            <IconClose />
          </button>
        </div>
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            if (!query.trim()) return;
            close();
            router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
          }}
          className="mx-auto mt-4 flex max-w-3xl items-center gap-3 border-b border-tinta pb-3 md:mt-10"
        >
          <IconSearch width={22} height={22} />
          <label htmlFor="buscador" className="sr-only">Buscar productos</label>
          <input
            ref={inputRef}
            id="buscador"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué estás buscando?"
            autoComplete="off"
            className="w-full bg-transparent font-serif text-2xl font-light outline-none placeholder:text-topo md:text-4xl"
          />
        </form>

        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap gap-2">
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

        <div className="py-10 md:py-14">
          <p className="eyebrow mb-6" aria-live="polite">
            {query.trim()
              ? `${results.length} ${results.length === 1 ? "resultado" : "resultados"} para «${query.trim()}»`
              : "Novedades"}
          </p>
          {query.trim() && results.length === 0 ? (
            <p className="max-w-md text-sm text-topo">
              No encontramos prendas con esa búsqueda. Prueba con otra palabra, como «vestido», «lino» o «negro», o{" "}
              <Link href="/coleccion/todo" onClick={close} className="link-underline text-tinta">mira toda la colección</Link>.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 lg:grid-cols-6" onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) close();
            }}>
              {shown.slice(0, 12).map((p) => (
                <ProductCard key={p.slug} product={p} sizes="(min-width: 1024px) 16vw, 50vw" showColors={false} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
