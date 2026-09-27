import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { shipping, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Envíos y devoluciones",
  description: `Plazos y precios de envío a toda España, envío gratis desde 50 € y ${shipping.returnDays} días para devolver tu pedido en Amara Zafira.`,
  alternates: { canonical: "/legal/envios-y-devoluciones" },
};

export default function Page() {
  return (
    <>
      <h1 className="mb-8 font-serif text-4xl font-light md:text-5xl">Envíos y devoluciones</h1>
      <p className="text-topo">Última actualización: 1 de septiembre de 2026</p>

      <h2>Envíos</h2>
      <table>
        <thead>
          <tr><th scope="col">Destino y método</th><th scope="col">Plazo</th><th scope="col">Precio</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Península · Estándar</td>
            <td>2–4 días laborables</td>
            <td>{formatPrice(shipping.standard)} · Gratis desde {formatPrice(shipping.freeFrom)}</td>
          </tr>
          <tr>
            <td>Península · Exprés</td>
            <td>24–48 horas laborables</td>
            <td>{formatPrice(shipping.express)}</td>
          </tr>
          <tr>
            <td>Baleares</td>
            <td>3–5 días laborables</td>
            <td>{formatPrice(shipping.express)} · Gratis desde {formatPrice(shipping.freeFrom)}</td>
          </tr>
          <tr>
            <td>Canarias, Ceuta y Melilla</td>
            <td>4–7 días laborables</td>
            <td>9,95 € (pueden aplicarse impuestos locales)</td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li>Preparamos los pedidos de lunes a viernes. Los pedidos hechos antes de las 13:00 salen el mismo día.</li>
        <li>Cuando tu pedido salga recibirás un email con el número de seguimiento.</li>
        <li>Si no estás en casa, la empresa de transporte hará un segundo intento o dejará el paquete en un punto de recogida cercano.</li>
      </ul>

      <h2>Devoluciones</h2>
      <p>
        Tienes <strong className="font-normal">{shipping.returnDays} días naturales</strong> desde la entrega para
        devolver cualquier prenda, sin dar explicaciones. Es tu derecho de desistimiento, reconocido en el artículo
        102 del TRLGDCU.
      </p>
      <h3>Cómo devolver un pedido</h3>
      <ol>
        <li>
          Comunícanos tu decisión escribiendo a <a href={`mailto:${site.email}`}>{site.email}</a> o desde la página
          de <Link href="/contacto">contacto</Link>, indicando tu número de pedido. Puedes usar el formulario de más
          abajo, aunque no es obligatorio.
        </li>
        <li>Te enviaremos una etiqueta de devolución para dejar el paquete en un punto de recogida.</li>
        <li>Envía las prendas sin usar, con sus etiquetas y, si es posible, en su embalaje original, en un plazo de 14 días desde que nos lo comuniques.</li>
        <li>Cuando recibamos y revisemos la devolución, te reembolsaremos el importe por el mismo método de pago en un máximo de 14 días.</li>
      </ol>
      <h3>Coste de la devolución</h3>
      <p>
        La devolución por punto de recogida con nuestra etiqueta cuesta 2,95 €, que se descuentan del reembolso.
        También puedes enviarla por tu cuenta, asumiendo el coste. Si la prenda es defectuosa o te enviamos un
        artículo equivocado, la devolución es gratuita.
      </p>
      <h3>Excepciones</h3>
      <p>Por motivos de higiene, no se admite la devolución de pendientes si se ha abierto su precinto.</p>

      <h2>Cambios</h2>
      <p>
        Para cambiar una talla o un color, devuelve la prenda y haz un nuevo pedido. Así te aseguras de que la talla
        que quieres no se agote mientras tanto.
      </p>

      <h2>Modelo de formulario de desistimiento</h2>
      <p className="text-topo">
        (Solo debes cumplimentar y enviar este formulario si deseas desistir del contrato. Anexo B del TRLGDCU.)
      </p>
      <div className="border border-arena bg-crudo p-6 text-sm">
        <p>A la atención de {site.legalName}, {site.address}, {site.email}:</p>
        <p>
          Por la presente le comunico que desisto de mi contrato de venta del siguiente bien: ____________________
        </p>
        <p>Pedido el / recibido el: ____________________</p>
        <p>Nombre de la persona consumidora: ____________________</p>
        <p>Domicilio de la persona consumidora: ____________________</p>
        <p>Firma (solo si el formulario se presenta en papel): ____________________</p>
        <p className="mb-0">Fecha: ____________________</p>
      </div>
    </>
  );
}
