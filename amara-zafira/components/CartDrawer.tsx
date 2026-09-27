"use client";

import Link from "next/link";
import { useCallback } from "react";
import { formatPrice } from "@/lib/format";
import { shipping } from "@/lib/site";
import { useStore } from "@/lib/store";
import Drawer from "@/components/Drawer";
import CartLineItem from "@/components/CartLineItem";

export function FreeShippingBar({ amount }: { amount: number }) {
  const left = shipping.freeFrom - amount;
  const pct = Math.min(100, (amount / shipping.freeFrom) * 100);
  return (
    <div className="text-xs">
      <p>
        {left > 0 ? (
          <>Te faltan <strong className="font-normal tabular-nums">{formatPrice(left)}</strong> para el envío gratis</>
        ) : (
          "Tu pedido tiene envío gratis"
        )}
      </p>
      <div className="mt-2 h-px w-full bg-arena">
        <div className="h-px bg-tinta transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { cartOpen, setCartOpen, lines, count, subtotal, discount } = useStore();
  const close = useCallback(() => setCartOpen(false), [setCartOpen]);

  return (
    <Drawer
      open={cartOpen}
      onClose={close}
      title={`Cesta (${count})`}
      footer={
        lines.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatPrice(subtotal - discount)}</span>
            </div>
            <p className="-mt-3 text-xs text-topo">Impuestos incluidos. Gastos de envío calculados en el checkout.</p>
            <Link href="/checkout" onClick={close} className="btn-primary w-full">
              Tramitar pedido
            </Link>
            <Link href="/cesta" onClick={close} className="btn-outline w-full">
              Ver cesta
            </Link>
          </div>
        )
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="font-serif text-2xl font-light">Tu cesta está vacía</p>
          <p className="text-sm text-topo">Descubre las novedades de la temporada y encuentra tu próxima prenda favorita.</p>
          <Link href="/coleccion/novedades" onClick={close} className="btn-primary">
            Ver novedades
          </Link>
        </div>
      ) : (
        <div className="px-5 md:px-6">
          <div className="pt-5">
            <FreeShippingBar amount={subtotal - discount} />
          </div>
          <ul className="divide-y divide-arena">
            {lines.map((line) => (
              <CartLineItem key={line.key} line={line} compact />
            ))}
          </ul>
        </div>
      )}
    </Drawer>
  );
}
