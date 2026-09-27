"use client";

import Link from "next/link";
import { useState } from "react";

const topics = ["Mi pedido", "Tallas y prendas", "Cambios y devoluciones", "Pagos", "Otro tema"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (!String(form.get("nombre")).trim()) return setError("Escribe tu nombre.");
    if (!/^\S+@\S+\.\S+$/.test(String(form.get("email")))) return setError("Escribe un email válido.");
    if (String(form.get("mensaje")).trim().length < 10) return setError("Cuéntanos un poco más en el mensaje.");
    if (!form.get("privacidad")) return setError("Tienes que aceptar la política de privacidad.");
    setError("");
    // Conecta aquí tu servicio de formularios (Resend, Formspree, email…).
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col gap-4" aria-live="polite">
        <p className="font-serif text-3xl font-light">Mensaje enviado</p>
        <p className="text-sm text-topo">Gracias por escribirnos. Te responderemos en menos de 24 horas laborables.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="eyebrow text-topo">Nombre</label>
          <input id="nombre" name="nombre" autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow text-topo">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className="field" />
        </div>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="tema" className="eyebrow text-topo">Tema</label>
          <select id="tema" name="tema" className="field cursor-pointer">
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pedido" className="eyebrow text-topo">Nº de pedido (opcional)</label>
          <input id="pedido" name="pedido" placeholder="AZ-000000" className="field" />
        </div>
      </div>
      <div>
        <label htmlFor="mensaje" className="eyebrow text-topo">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows={5} className="field h-auto resize-none py-3" />
      </div>
      <label className="flex items-start gap-3 text-xs text-topo">
        <input type="checkbox" name="privacidad" className="mt-0.5 h-4 w-4 shrink-0 accent-tinta" />
        <span>
          He leído y acepto la <Link href="/legal/privacidad" className="link-underline">política de privacidad</Link>.
        </span>
      </label>
      {error && <p role="alert" className="text-xs text-rebaja">{error}</p>}
      <button type="submit" className="btn-primary self-start">Enviar mensaje</button>
    </form>
  );
}
