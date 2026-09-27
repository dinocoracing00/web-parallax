"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { provinces } from "@/data/provinces";
import { placeOrder, type ShippingDetails } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { shipping } from "@/lib/site";
import { useStore } from "@/lib/store";
import { PromoCode, Totals } from "@/components/OrderSummary";

type Errors = Partial<Record<keyof ShippingDetails | "terms", string>>;

const empty: ShippingDetails = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  postalCode: "",
  city: "",
  province: "",
  phone: "",
  method: "estandar",
};

function validate(d: ShippingDetails, terms: boolean): Errors {
  const e: Errors = {};
  if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Escribe un email válido.";
  if (!d.firstName.trim()) e.firstName = "Escribe tu nombre.";
  if (!d.lastName.trim()) e.lastName = "Escribe tus apellidos.";
  if (d.address.trim().length < 5) e.address = "Escribe la dirección completa (calle, número y piso).";
  if (!/^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(d.postalCode)) e.postalCode = "El código postal tiene 5 cifras, por ejemplo 28001.";
  if (!d.city.trim()) e.city = "Escribe tu localidad.";
  if (!d.province) e.province = "Elige tu provincia.";
  if (!/^(\+34\s?)?[6-9]\d{2}\s?\d{3}\s?\d{3}$/.test(d.phone.trim())) e.phone = "Escribe un teléfono de 9 cifras.";
  if (!terms) e.terms = "Tienes que aceptar las condiciones de venta para continuar.";
  return e;
}

function Field({
  id,
  label,
  error,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; error?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow text-topo">{label}</label>
      <input id={id} name={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className="field" {...props} />
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-rebaja">{error}</p>}
    </div>
  );
}

export default function CheckoutForm() {
  const router = useRouter();
  const { lines, subtotal, discount, shippingCost, clearCart, hydrated } = useStore();
  const [data, setData] = useState<ShippingDetails>(empty);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const shipCost = data.method === "express" ? shipping.express : shippingCost;
  const total = Math.max(0, subtotal - discount + shipCost);

  const set = (key: keyof ShippingDetails) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(data, terms);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setSending(true);
    const order = await placeOrder(lines, data, total);
    try {
      sessionStorage.setItem("amara-zafira:ultimo-pedido", JSON.stringify({ ...order, name: data.firstName }));
    } catch {}
    clearCart();
    router.push("/checkout/confirmacion");
  };

  if (!hydrated) return <div className="min-h-[60vh]" />;

  if (lines.length === 0 && !sending) {
    return (
      <div className="container-page flex min-h-[50vh] flex-col items-start justify-center gap-6 py-16">
        <h1 className="font-serif text-4xl font-light">Tu cesta está vacía</h1>
        <p className="text-sm text-topo">Añade alguna prenda para poder finalizar la compra.</p>
        <Link href="/coleccion/todo" className="btn-primary">Ver colección</Link>
      </div>
    );
  }

  return (
    <div className="container-page pt-8 md:pt-14">
      <h1 className="font-serif text-4xl font-light md:text-5xl">Finalizar compra</h1>
      <form onSubmit={submit} noValidate className="mt-10 grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
        <div className="flex flex-col gap-12">
          <section aria-labelledby="contacto-titulo">
            <h2 id="contacto-titulo" className="eyebrow mb-6">1. Contacto</h2>
            <Field id="email" label="Email" type="email" autoComplete="email" value={data.email} onChange={set("email")} error={errors.email} />
          </section>

          <section aria-labelledby="envio-titulo">
            <h2 id="envio-titulo" className="eyebrow mb-6">2. Dirección de envío</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              <Field id="firstName" label="Nombre" autoComplete="given-name" value={data.firstName} onChange={set("firstName")} error={errors.firstName} />
              <Field id="lastName" label="Apellidos" autoComplete="family-name" value={data.lastName} onChange={set("lastName")} error={errors.lastName} />
              <Field id="address" label="Dirección" autoComplete="street-address" value={data.address} onChange={set("address")} error={errors.address} className="col-span-2" />
              <Field id="postalCode" label="Código postal" inputMode="numeric" maxLength={5} autoComplete="postal-code" value={data.postalCode} onChange={set("postalCode")} error={errors.postalCode} />
              <Field id="city" label="Localidad" autoComplete="address-level2" value={data.city} onChange={set("city")} error={errors.city} />
              <div>
                <label htmlFor="province" className="eyebrow text-topo">Provincia</label>
                <select
                  id="province"
                  value={data.province}
                  onChange={set("province")}
                  aria-invalid={!!errors.province}
                  className="field cursor-pointer"
                >
                  <option value="">Elige…</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.province && <p className="mt-1 text-xs text-rebaja">{errors.province}</p>}
              </div>
              <Field id="phone" label="Teléfono" type="tel" autoComplete="tel" value={data.phone} onChange={set("phone")} error={errors.phone} />
            </div>
          </section>

          <section aria-labelledby="metodo-titulo">
            <h2 id="metodo-titulo" className="eyebrow mb-6">3. Método de envío</h2>
            <div className="flex flex-col gap-2">
              {[
                { id: "estandar", label: "Estándar", time: "2–4 días laborables", price: shippingCost },
                { id: "express", label: "Exprés", time: "24–48 horas", price: shipping.express },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center justify-between border p-4 text-sm transition-colors ${
                    data.method === m.id ? "border-tinta" : "border-arena"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="method"
                      value={m.id}
                      checked={data.method === m.id}
                      onChange={() => setData((d) => ({ ...d, method: m.id as ShippingDetails["method"] }))}
                      className="h-4 w-4 accent-tinta"
                    />
                    <span>
                      {m.label}
                      <span className="block text-xs text-topo">{m.time}</span>
                    </span>
                  </span>
                  <span className="tabular-nums">{m.price === 0 ? "Gratis" : formatPrice(m.price)}</span>
                </label>
              ))}
            </div>
          </section>

          <section aria-labelledby="pago-titulo">
            <h2 id="pago-titulo" className="eyebrow mb-6">4. Pago</h2>
            <div className="border border-dashed border-topo bg-crudo p-5 text-sm">
              <p className="font-normal">Tienda en modo demostración</p>
              <p className="mt-2 text-topo">
                No se realizará ningún cargo. Cuando conectes Stripe, aquí aparecerá el pago seguro con tarjeta,
                Bizum, Apple Pay y Google Pay.
              </p>
            </div>
          </section>

          <div>
            <label className="flex items-start gap-3 text-sm">
              <input
                id="terms"
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-tinta"
              />
              <span>
                He leído y acepto las <Link href="/legal/condiciones-de-venta" className="link-underline" target="_blank">condiciones de venta</Link>{" "}
                y la <Link href="/legal/privacidad" className="link-underline" target="_blank">política de privacidad</Link>.
              </span>
            </label>
            {errors.terms && <p className="mt-2 text-xs text-rebaja">{errors.terms}</p>}
          </div>

          <button type="submit" disabled={sending} className="btn-primary w-full lg:hidden">
            {sending ? "Procesando…" : `Realizar pedido · ${formatPrice(total)}`}
          </button>
        </div>

        <aside className="order-first h-fit bg-crudo p-6 md:p-8 lg:sticky lg:top-24 lg:order-none">
          <h2 className="eyebrow mb-6">Resumen del pedido</h2>
          <ul className="flex flex-col gap-4 border-b border-arena pb-6">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-4 text-[13px]">
                <div className="relative h-24 w-18 shrink-0 bg-arena">
                  <Image src={l.product.images[0]} alt={l.product.name} fill sizes="72px" className="object-cover" />
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-tinta text-[10px] text-blanco">
                    {l.qty}
                  </span>
                </div>
                <div className="flex flex-1 justify-between gap-3">
                  <div>
                    <p>{l.product.name}</p>
                    <p className="text-topo">{l.color} · {l.size}</p>
                  </div>
                  <p className="tabular-nums">{formatPrice(l.lineTotal)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6 pt-6">
            <PromoCode />
            <Totals shippingOverride={shipCost} />
            <button type="submit" disabled={sending} className="btn-primary hidden w-full lg:flex">
              {sending ? "Procesando…" : "Realizar pedido"}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
