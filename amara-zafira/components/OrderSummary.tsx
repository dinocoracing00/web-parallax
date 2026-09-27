"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { WELCOME_CODE } from "@/lib/site";
import { useStore } from "@/lib/store";

export function PromoCode() {
  const { promo, applyPromo, removePromo } = useStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  if (promo) {
    return (
      <div className="flex items-center justify-between text-sm">
        <span>
          Código <strong className="font-normal tracking-[0.15em]">{promo}</strong> aplicado
        </span>
        <button type="button" onClick={removePromo} className="text-xs link-underline">Quitar</button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(!applyPromo(code));
      }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-end gap-3">
        <label htmlFor="codigo" className="sr-only">Código de descuento</label>
        <input
          id="codigo"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Código de descuento"
          className="field h-10 uppercase placeholder:normal-case"
        />
        <button type="submit" className="btn-outline h-10 shrink-0 px-5">Aplicar</button>
      </div>
      {error && (
        <p role="alert" className="text-xs text-rebaja">
          Este código no es válido. Suscríbete a la newsletter para conseguir {WELCOME_CODE}.
        </p>
      )}
    </form>
  );
}

export function Totals({ shippingOverride }: { shippingOverride?: number }) {
  const { subtotal, discount, shippingCost, promo } = useStore();
  const ship = shippingOverride ?? shippingCost;
  const total = Math.max(0, subtotal - discount + ship);
  return (
    <dl className="flex flex-col gap-2 text-sm tabular-nums">
      <div className="flex justify-between">
        <dt>Subtotal</dt>
        <dd>{formatPrice(subtotal)}</dd>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-rebaja">
          <dt>Descuento ({promo})</dt>
          <dd>−{formatPrice(discount)}</dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt>Envío</dt>
        <dd>{ship === 0 ? "Gratis" : formatPrice(ship)}</dd>
      </div>
      <div className="mt-2 flex justify-between border-t border-arena pt-4 text-base">
        <dt>Total</dt>
        <dd>{formatPrice(total)}</dd>
      </div>
      <p className="text-xs text-topo">IVA incluido</p>
    </dl>
  );
}
