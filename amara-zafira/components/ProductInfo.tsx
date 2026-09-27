"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { Product } from "@/data/types";
import { getCategory } from "@/data/categories";
import { shipping } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";
import Price from "@/components/Price";
import Accordion from "@/components/Accordion";
import Drawer from "@/components/Drawer";
import SizeTable, { HowToMeasure } from "@/components/SizeTable";
import { IconHeart } from "@/components/Icons";

export default function ProductInfo({ product }: { product: Product }) {
  const { addToCart, isWished, toggleWish, hydrated } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [error, setError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const closeGuide = useCallback(() => setGuideOpen(false), []);
  const category = getCategory(product.category);
  const wished = hydrated && isWished(product.slug);
  const oneSize = product.sizes.length === 1 && product.sizes[0] === "Única";

  const add = () => {
    if (!size) return setError(true);
    addToCart({ slug: product.slug, color, size, qty: 1 });
  };

  return (
    <div className="flex flex-col">
      {category && (
        <Link href={`/coleccion/${category.slug}`} className="eyebrow text-topo hover:text-tinta">
          {category.name}
        </Link>
      )}
      <h1 className="mt-3 font-serif text-3xl leading-tight font-light md:text-4xl">{product.name}</h1>
      <Price price={product.price} compareAtPrice={product.compareAtPrice} className="mt-3 text-base" />
      <p className="mt-1 text-xs text-topo">IVA incluido</p>
      <p className="mt-6 text-sm leading-6">{product.description}</p>

      {/* Color */}
      <fieldset className="mt-8">
        <legend className="eyebrow mb-3">
          Color: <span className="font-light normal-case tracking-normal">{color}</span>
        </legend>
        <div className="flex gap-3">
          {product.colors.map((c) => (
            <label key={c.name} className="cursor-pointer" title={c.name}>
              <input
                type="radio"
                name="color"
                value={c.name}
                checked={color === c.name}
                onChange={() => setColor(c.name)}
                className="peer sr-only"
              />
              <span
                className="block h-8 w-8 rounded-full border border-black/10 ring-offset-2 transition-shadow peer-checked:ring-1 peer-checked:ring-tinta peer-focus-visible:ring-1 peer-focus-visible:ring-tinta"
                style={{ backgroundColor: c.hex }}
              />
              <span className="sr-only">{c.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Talla */}
      {!oneSize && (
        <fieldset className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <legend className="eyebrow">Talla</legend>
            <button type="button" onClick={() => setGuideOpen(true)} className="text-xs link-underline">
              Guía de tallas
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {product.sizes.map((s) => (
              <label key={s} className="cursor-pointer">
                <input
                  type="radio"
                  name="talla"
                  value={s}
                  checked={size === s}
                  onChange={() => {
                    setSize(s);
                    setError(false);
                  }}
                  className="peer sr-only"
                />
                <span className="flex h-11 items-center justify-center border border-arena text-xs transition-colors hover:border-tinta peer-checked:border-tinta peer-checked:bg-tinta peer-checked:text-blanco peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2">
                  {s}
                </span>
              </label>
            ))}
          </div>
          {error && (
            <p role="alert" className="mt-3 text-xs text-rebaja">
              Elige una talla para añadir la prenda a la cesta.
            </p>
          )}
        </fieldset>
      )}
      {oneSize && <p className="mt-8 text-xs text-topo">Talla única</p>}

      <div className="mt-8 flex gap-2">
        <button type="button" onClick={add} className="btn-primary flex-1">
          Añadir a la cesta
        </button>
        <button
          type="button"
          onClick={() => toggleWish(product.slug)}
          aria-pressed={wished}
          aria-label={wished ? "Quitar de favoritos" : "Añadir a favoritos"}
          className="flex h-12 w-12 items-center justify-center border border-tinta transition-colors hover:bg-crudo"
        >
          <IconHeart filled={wished} />
        </button>
      </div>

      <p className="mt-4 text-xs text-topo">
        Envío gratis desde {formatPrice(shipping.freeFrom)} · Entrega en 2–4 días laborables
      </p>

      <div className="mt-8 border-t border-arena">
        <Accordion title="Composición">
          <p>{product.composition}</p>
          <p className="mt-2 text-topo">
            Trabajamos con proveedores que cumplen el estándar OEKO-TEX® y priorizamos fibras recicladas y naturales.
          </p>
        </Accordion>
        <Accordion title="Cuidados">
          <ul className="list-disc pl-5">
            {product.care.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Accordion>
        <Accordion title="Envíos y devoluciones">
          <p>
            Envío estándar en 2–4 días laborables por {formatPrice(shipping.standard)}, gratis en pedidos desde{" "}
            {formatPrice(shipping.freeFrom)}. Envío exprés en 24–48 h por {formatPrice(shipping.express)}.
          </p>
          <p className="mt-2">
            Tienes {shipping.returnDays} días naturales desde la entrega para devolver tu pedido.{" "}
            <Link href="/legal/envios-y-devoluciones" className="link-underline">Más información</Link>
          </p>
        </Accordion>
      </div>

      <Drawer open={guideOpen} onClose={closeGuide} title="Guía de tallas" side="center">
        <div className="flex flex-col gap-8 p-5 md:p-8">
          <SizeTable />
          <HowToMeasure />
          <p className="text-xs text-topo">
            ¿Entre dos tallas? Te recomendamos elegir la mayor en prendas ajustadas y la menor en cortes oversize.{" "}
            <Link href="/guia-de-tallas" className="link-underline" onClick={closeGuide}>Ver guía completa</Link>
          </p>
        </div>
      </Drawer>
    </div>
  );
}
