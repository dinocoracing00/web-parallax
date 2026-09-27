import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { shipping, site } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Envíos, devoluciones, pagos, tallas y cuidado de las prendas: resolvemos tus dudas sobre comprar en Amara Zafira.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "Preguntas frecuentes | Amara Zafira", url: "/faq" },
};

const groups: { title: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    title: "Pedidos y envíos",
    items: [
      {
        q: "¿Cuánto tarda en llegar mi pedido?",
        a: `El envío estándar tarda de 2 a 4 días laborables en la península. El exprés llega en 24–48 horas. Baleares, Canarias, Ceuta y Melilla pueden tardar de 4 a 7 días laborables.`,
      },
      {
        q: "¿Cuánto cuesta el envío?",
        a: `El envío estándar cuesta ${formatPrice(shipping.standard)} y es gratis en pedidos desde ${formatPrice(shipping.freeFrom)}. El envío exprés cuesta ${formatPrice(shipping.express)}.`,
      },
      {
        q: "¿Puedo seguir mi pedido?",
        a: "Sí. Cuando tu pedido salga de nuestro almacén te enviaremos un email con el número de seguimiento y el enlace de la empresa de transporte.",
      },
      {
        q: "¿Puedo modificar o cancelar un pedido?",
        a: (
          <>
            Si todavía no se ha enviado, sí. Escríbenos cuanto antes a{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> indicando el número de pedido.
          </>
        ),
      },
    ],
  },
  {
    title: "Cambios y devoluciones",
    items: [
      {
        q: "¿Cuánto tiempo tengo para devolver una prenda?",
        a: `Tienes ${shipping.returnDays} días naturales desde que recibes el pedido. La prenda debe estar sin usar y con sus etiquetas.`,
      },
      {
        q: "¿Cómo hago una devolución?",
        a: (
          <>
            Escríbenos desde la página de <Link href="/contacto">contacto</Link> con tu número de pedido y te enviaremos
            la etiqueta de devolución. Cuando recibamos la prenda te devolvemos el dinero en un plazo máximo de 14 días
            por el mismo método de pago.
          </>
        ),
      },
      {
        q: "¿La devolución tiene coste?",
        a: "La devolución a través de punto de recogida cuesta 2,95 €, que se descuentan del reembolso. Si la prenda llegó defectuosa o nos equivocamos, la devolución es gratuita.",
      },
      {
        q: "¿Puedo cambiar una talla?",
        a: "Sí. Haz la devolución de la prenda y realiza un nuevo pedido con la talla que necesites; así te aseguras de que no se agote mientras tanto.",
      },
    ],
  },
  {
    title: "Pagos",
    items: [
      { q: "¿Qué métodos de pago aceptáis?", a: "Tarjeta de crédito o débito (Visa, Mastercard, American Express), Bizum, PayPal, Apple Pay y Google Pay." },
      { q: "¿Es seguro pagar en la web?", a: "Sí. Los pagos se procesan con cifrado y autenticación 3D Secure. Nunca guardamos los datos de tu tarjeta." },
      { q: "¿Cómo uso mi código de descuento?", a: "Escribe el código en la cesta o en el checkout y pulsa «Aplicar». Solo se puede usar un código por pedido." },
    ],
  },
  {
    title: "Tallas y prendas",
    items: [
      {
        q: "¿Cómo sé qué talla elegir?",
        a: (
          <>
            Consulta nuestra <Link href="/guia-de-tallas">guía de tallas</Link>. En cada ficha también indicamos si la
            prenda tiene un corte ajustado u oversize.
          </>
        ),
      },
      { q: "¿Repondréis una prenda agotada?", a: "Muchas de nuestras prendas esenciales se reponen cada temporada. Síguenos en Instagram o suscríbete a la newsletter para enterarte." },
      { q: "¿Cómo cuido mis prendas?", a: "En cada ficha de producto encontrarás las instrucciones de lavado. En general, lavar a 30 °C y secar en plano alarga mucho la vida de la ropa." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="Ayuda" title="Preguntas frecuentes">
        ¿No encuentras lo que buscas? <Link href="/contacto" className="link-underline text-tinta">Escríbenos</Link>.
      </PageHeader>
      <div className="container-page grid gap-12 md:grid-cols-[220px_1fr] md:gap-20">
        <nav aria-label="Temas" className="hidden md:block">
          <ul className="sticky top-24 flex flex-col gap-3">
            {groups.map((g, i) => (
              <li key={g.title}>
                <a href={`#tema-${i}`} className="eyebrow hover:opacity-60">{g.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex max-w-3xl flex-col gap-14">
          {groups.map((g, i) => (
            <section key={g.title} id={`tema-${i}`} className="scroll-mt-24">
              <h2 className="mb-4 font-serif text-2xl font-light md:text-3xl">{g.title}</h2>
              <div className="border-t border-arena [&_a]:link-underline">
                {g.items.map((item) => (
                  <Accordion key={item.q} title={item.q}>
                    {item.a}
                  </Accordion>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
