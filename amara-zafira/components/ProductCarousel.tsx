"use client";

import { useRef } from "react";
import type { Product } from "@/data/types";
import ProductCard from "@/components/ProductCard";
import { IconChevronLeft, IconChevronRight } from "@/components/Icons";

export default function ProductCarousel({ products, label }: { products: Product[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={track}
        aria-label={label}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 md:scroll-px-8 md:gap-4 md:px-8"
      >
        {products.map((p) => (
          <li key={p.slug} className="w-[62%] shrink-0 snap-start sm:w-[40%] md:w-[28%] lg:w-[22%]">
            <ProductCard product={p} sizes="(min-width: 1024px) 22vw, (min-width: 768px) 28vw, 62vw" />
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute inset-x-0 top-[38%] hidden justify-between px-3 md:flex">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Anterior"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center bg-blanco/90 transition-opacity hover:opacity-70"
        >
          <IconChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Siguiente"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center bg-blanco/90 transition-opacity hover:opacity-70"
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}
