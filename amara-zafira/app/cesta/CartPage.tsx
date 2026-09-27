"use client";

import Link from "next/link";
import { newProducts } from "@/data/products";
import { useStore } from "@/lib/store";
import CartLineItem from "@/components/CartLineItem";
import { FreeShippingBar } from "@/components/CartDrawer";
import { PromoCode, Totals } from "@/components/OrderSummary";
import ProductCarousel from "@/components/ProductCarousel";

export default function CartPage() {
  const { lines, count, subtotal, discount, hydrated } = useStore();

  if (!hydrated) return <div className="min-h-[60vh]" />;

  return (
    <>
      <div className="container-page pt-8 md:pt-14">
        <h1 className="font-serif text-4xl font-light md:text-5xl">Cesta</h1>
        {lines.length === 0 ? (
          <div className="flex flex-col items-start gap-6 py-16">
            <p className="text-sm text-topo">Tu cesta está vacía. Te dejamos algunas novedades por si te inspiran.</p>
            <Link href="/coleccion/novedades" className="btn-primary">Ver novedades</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-20">
            <div>
              <p className="eyebrow border-b border-arena pb-4">
                {count} {count === 1 ? "artículo" : "artículos"}
              </p>
              <ul className="divide-y divide-arena border-b border-arena">
                {lines.map((line) => (
                  <CartLineItem key={line.key} line={line} />
                ))}
              </ul>
            </div>
            <aside className="flex h-fit flex-col gap-6 bg-crudo p-6 md:p-8 lg:sticky lg:top-24">
              <h2 className="eyebrow">Resumen</h2>
              <FreeShippingBar amount={subtotal - discount} />
              <PromoCode />
              <Totals />
              <Link href="/checkout" className="btn-primary w-full">Tramitar pedido</Link>
              <p className="text-center text-xs text-topo">Tarjeta · Bizum · PayPal · Apple Pay</p>
            </aside>
          </div>
        )}
      </div>
      <section className="pt-20">
        <h2 className="container-page mb-8 font-serif text-3xl font-light">Novedades</h2>
        <ProductCarousel products={newProducts} label="Novedades" />
      </section>
    </>
  );
}
