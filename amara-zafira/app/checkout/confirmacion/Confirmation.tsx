"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStorageValue } from "@/lib/useStorage";
import { formatPrice } from "@/lib/format";
import { IconCheck } from "@/components/Icons";

interface LastOrder {
  id: string;
  email: string;
  total: number;
  items: number;
  name: string;
}

export default function Confirmation() {
  const [raw] = useStorageValue("amara-zafira:ultimo-pedido", "session");
  const order = useMemo<LastOrder | null>(() => {
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [raw]);

  if (raw === undefined) return <div className="min-h-[60vh]" />;

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-tinta">
        <IconCheck width={24} height={24} />
      </span>
      {order ? (
        <>
          <h1 className="mt-8 font-serif text-4xl font-light md:text-5xl">Gracias, {order.name}</h1>
          <p className="mt-4 max-w-md text-sm text-topo">
            Hemos recibido tu pedido <strong className="font-normal text-tinta">{order.id}</strong> con {order.items}{" "}
            {order.items === 1 ? "prenda" : "prendas"} por {formatPrice(order.total)}. Te enviaremos la confirmación
            a {order.email}.
          </p>
          <p className="mt-2 text-xs text-topo">Pedido de demostración: no se ha realizado ningún cargo.</p>
        </>
      ) : (
        <>
          <h1 className="mt-8 font-serif text-4xl font-light">No hay ningún pedido reciente</h1>
          <p className="mt-4 text-sm text-topo">Si acabas de comprar, revisa tu email para ver la confirmación.</p>
        </>
      )}
      <Link href="/" className="btn-primary mt-10">Seguir comprando</Link>
    </div>
  );
}
