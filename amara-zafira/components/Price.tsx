import { discountPercent, formatPrice } from "@/lib/format";

export default function Price({
  price,
  compareAtPrice,
  className = "",
}: {
  price: number;
  compareAtPrice?: number;
  className?: string;
}) {
  const off = discountPercent(price, compareAtPrice);
  return (
    <p className={`flex flex-wrap items-baseline gap-x-2 tabular-nums ${className}`}>
      {off > 0 ? (
        <>
          <span className="text-rebaja">{formatPrice(price)}</span>
          <s className="text-topo">
            <span className="sr-only">Antes </span>
            {formatPrice(compareAtPrice!)}
          </s>
          <span className="text-rebaja">−{off} %</span>
        </>
      ) : (
        <span>{formatPrice(price)}</span>
      )}
    </p>
  );
}
