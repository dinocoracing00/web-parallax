"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WELCOME_CODE } from "@/lib/site";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Escribe un email válido, por ejemplo nombre@correo.com.");
    if (!accepted) return setError("Para suscribirte tienes que aceptar la política de privacidad.");
    setError("");
    // Conecta aquí tu herramienta de email (Klaviyo, Mailchimp, Brevo…).
    setDone(true);
  };

  return (
    <section className="grid bg-crudo md:grid-cols-2" aria-labelledby="newsletter-titulo">
      <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[560px]">
        <Image
          src="/images/editorial/newsletter.jpg"
          alt="Modelo con look de la nueva colección"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-center px-6 py-14 md:px-16 lg:px-24">
        <div className="w-full max-w-md">
          <p className="eyebrow mb-4 text-topo">Newsletter</p>
          <h2 id="newsletter-titulo" className="font-serif text-4xl leading-tight font-light md:text-5xl">
            10 % en tu primera compra
          </h2>
          {done ? (
            <div className="mt-8" aria-live="polite">
              <p className="text-sm">Gracias por unirte. Este es tu código de bienvenida:</p>
              <p className="mt-4 inline-block border border-tinta px-5 py-3 font-normal tracking-[0.25em]">{WELCOME_CODE}</p>
              <p className="mt-4 text-xs text-topo">Aplícalo en la cesta. Válido en tu primer pedido.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-5">
              <p className="text-sm">
                Suscríbete y sé la primera en conocer las novedades, los lanzamientos exclusivos y los adelantos de
                rebajas.
              </p>
              <div className="flex items-end gap-3">
                <label htmlFor="newsletter-email" className="sr-only">Email</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  autoComplete="email"
                  className="field"
                />
                <button type="submit" className="btn-primary shrink-0 px-6">
                  Suscribirme
                </button>
              </div>
              <label className="flex items-start gap-3 text-xs text-topo">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-tinta"
                />
                <span>
                  He leído y acepto la <Link href="/legal/privacidad" className="link-underline">política de privacidad</Link>{" "}
                  y quiero recibir comunicaciones comerciales.
                </span>
              </label>
              {error && <p role="alert" className="text-xs text-rebaja">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
