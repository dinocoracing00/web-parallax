"use client";

import Link from "next/link";
import { getProduct } from "@/data/products";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

export default function Wishlist() {
  const { wishlist, hydrated } = useStore();
  const items = wishlist.map(getProduct).filter((p) => p !== undefined);

  return (
    <div className="container-page pt-8 md:pt-14">
      <h1 className="font-serif text-4xl font-light md:text-5xl">Favoritos</h1>
      {!hydrated ? (
        <div className="min-h-[40vh]" />
      ) : items.length === 0 ? (
        <div className="flex flex-col items-start gap-6 py-16">
          <p className="max-w-md text-sm text-topo">
            Aún no tienes favoritos. Toca el corazón de cualquier prenda para guardarla aquí y encontrarla más tarde.
          </p>
          <Link href="/coleccion/novedades" className="btn-primary">Ver novedades</Link>
        </div>
      ) : (
        <>
          <p className="mt-3 text-sm text-topo">
            {items.length} {items.length === 1 ? "prenda guardada" : "prendas guardadas"}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-2 gap-y-10 md:gap-x-4 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
