"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/types";
import { useStore } from "@/lib/store";
import Price from "@/components/Price";
import { IconHeart } from "@/components/Icons";

export default function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
  showColors = true,
}: {
  product: Product;
  sizes?: string;
  priority?: boolean;
  showColors?: boolean;
}) {
  const { isWished, toggleWish, hydrated } = useStore();
  const wished = hydrated && isWished(product.slug);

  const href = `/producto/${product.slug}`;

  return (
    <article className="group relative">
      <Link href={href} className="relative block aspect-[3/4] overflow-hidden bg-crudo" tabIndex={-1} aria-hidden>
        <Image
          src={product.images[0]}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
        />
        {/* Segunda foto al pasar el ratón */}
        <Image
          src={product.images[1]}
          alt=""
          fill
          sizes={sizes}
          className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
        />
        <span className="absolute top-2 left-2 flex flex-col items-start gap-1">
          {product.isNew && <span className="eyebrow bg-blanco/90 px-2 py-1 text-[10px]">Nuevo</span>}
          {product.compareAtPrice && (
            <span className="eyebrow bg-blanco/90 px-2 py-1 text-[10px] text-rebaja">Rebaja</span>
          )}
        </span>
      </Link>
      <div className="mt-3 flex items-start justify-between gap-2 text-[13px]">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="font-normal leading-snug">
            <Link href={href} className="hover:opacity-60">{product.name}</Link>
          </h3>
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
          {showColors && product.colors.length > 1 && (
            <ul className="mt-1 flex gap-1.5" aria-label="Colores disponibles">
              {product.colors.map((c) => (
                <li
                  key={c.name}
                  title={c.name}
                  className="h-2.5 w-2.5 rounded-full border border-black/10"
                  style={{ backgroundColor: c.hex }}
                >
                  <span className="sr-only">{c.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="button"
          onClick={() => toggleWish(product.slug)}
          aria-pressed={wished}
          aria-label={wished ? `Quitar ${product.name} de favoritos` : `Añadir ${product.name} a favoritos`}
          className="-mt-1 -mr-1.5 shrink-0 p-1.5 transition-opacity hover:opacity-60"
        >
          <IconHeart filled={wished} width={18} height={18} />
        </button>
      </div>
    </article>
  );
}
