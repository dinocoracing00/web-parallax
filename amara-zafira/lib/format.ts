const eur = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

/** 49.95 → "49,95 €" */
export function formatPrice(value: number) {
  return eur.format(value);
}

export function discountPercent(price: number, compareAt?: number) {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round((1 - price / compareAt) * 100);
}
