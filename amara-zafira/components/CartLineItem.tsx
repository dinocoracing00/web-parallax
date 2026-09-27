"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { useStore, type CartLine } from "@/lib/store";
import { IconMinus, IconPlus } from "@/components/Icons";

export default function CartLineItem({ line, compact = false }: { line: CartLine; compact?: boolean }) {
  const { setQty, removeFromCart, setCartOpen } = useStore();
  const { product } = line;

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/producto/${product.slug}`}
        onClick={() => setCartOpen(false)}
        className={`relative shrink-0 overflow-hidden bg-crudo ${compact ? "h-32 w-24" : "h-40 w-30 md:h-48 md:w-36"}`}
      >
        <Image src={product.images[0]} alt={product.name} fill sizes="150px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col text-[13px]">
        <div className="flex justify-between gap-3">
          <Link href={`/producto/${product.slug}`} onClick={() => setCartOpen(false)} className="font-normal hover:opacity-60">
            {product.name}
          </Link>
          <p className="shrink-0 tabular-nums">{formatPrice(line.lineTotal)}</p>
        </div>
        <p className="mt-1 text-topo">
          {line.color} · Talla {line.size}
        </p>
        {product.compareAtPrice && (
          <p className="mt-1 text-rebaja tabular-nums">
            {formatPrice(product.price)} <s className="text-topo">{formatPrice(product.compareAtPrice)}</s>
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-arena">
            <button
              type="button"
              onClick={() => setQty(line.key, line.qty - 1)}
              aria-label="Quitar una unidad"
              className="flex h-9 w-9 items-center justify-center hover:bg-crudo"
            >
              <IconMinus width={14} height={14} />
            </button>
            <span className="w-8 text-center tabular-nums" aria-live="polite">{line.qty}</span>
            <button
              type="button"
              onClick={() => setQty(line.key, line.qty + 1)}
              aria-label="Añadir una unidad"
              disabled={line.qty >= 10}
              className="flex h-9 w-9 items-center justify-center hover:bg-crudo disabled:opacity-30"
            >
              <IconPlus width={14} height={14} />
            </button>
          </div>
          <button type="button" onClick={() => removeFromCart(line.key)} className="text-xs link-underline">
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
}
