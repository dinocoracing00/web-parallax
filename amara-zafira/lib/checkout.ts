import type { CartLine } from "@/lib/store";

export interface ShippingDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  phone: string;
  method: "estandar" | "express";
}

export interface OrderSummary {
  id: string;
  email: string;
  total: number;
  items: number;
}

/*
 * Punto único de integración con la pasarela de pago.
 *
 * Ahora mismo simula el pedido (modo demostración). Para conectar Stripe:
 *   1. npm i stripe
 *   2. Crea app/api/checkout/route.ts que reciba `lines` y `details`,
 *      cree una sesión con stripe.checkout.sessions.create({...}) usando
 *      STRIPE_SECRET_KEY y devuelva { url: session.url }.
 *   3. Sustituye el cuerpo de esta función por:
 *        const res = await fetch("/api/checkout", { method: "POST", body: JSON.stringify({ lines, details }) });
 *        const { url } = await res.json();
 *        window.location.href = url;
 * El diseño del checkout no necesita cambios.
 */
export async function placeOrder(
  lines: CartLine[],
  details: ShippingDetails,
  total: number,
): Promise<OrderSummary> {
  await new Promise((r) => setTimeout(r, 900));
  const id = `AZ-${Date.now().toString().slice(-6)}`;
  return { id, email: details.email, total, items: lines.reduce((n, l) => n + l.qty, 0) };
}
