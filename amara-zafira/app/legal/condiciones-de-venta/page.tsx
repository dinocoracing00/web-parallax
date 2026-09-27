import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { shipping, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Condiciones de venta",
  description: "Condiciones generales de contratación de Amara Zafira: pedidos, precios, pagos, entrega, desistimiento y garantía.",
  alternates: { canonical: "/legal/condiciones-de-venta" },
};

export default function Page() {
  return (
    <>
      <h1 className="mb-8 font-serif text-4xl font-light md:text-5xl">Condiciones de venta</h1>
      <p className="text-topo">Última actualización: 1 de septiembre de 2026</p>
      <p>
        Estas condiciones regulan la compra de productos en la tienda en línea de {site.name}, operada por{" "}
        {site.legalName} (NIF {site.cif}, {site.address}). Se aplican el Real Decreto Legislativo 1/2007, texto
        refundido de la Ley General para la Defensa de los Consumidores y Usuarios (TRLGDCU), y la LSSI-CE.
      </p>

      <h2>1. Quién puede comprar</h2>
      <p>
        Pueden comprar personas mayores de 18 años con capacidad legal para contratar. Enviamos a toda España
        (península, Baleares, Canarias, Ceuta y Melilla).
      </p>

      <h2>2. Proceso de compra</h2>
      <ol>
        <li>Elige la prenda, el color y la talla y añádela a la cesta.</li>
        <li>Revisa la cesta y pulsa «Tramitar pedido».</li>
        <li>Introduce tus datos de contacto y de envío y elige el método de envío.</li>
        <li>Acepta estas condiciones y realiza el pago.</li>
        <li>Recibirás un email con la confirmación y el resumen del pedido. El contrato se entiende celebrado en ese momento.</li>
      </ol>
      <p>
        Antes de confirmar el pedido puedes corregir cualquier dato. El contrato se formaliza en español y lo
        archivamos electrónicamente; puedes solicitarnos una copia cuando quieras.
      </p>

      <h2>3. Precios e impuestos</h2>
      <p>
        Los precios se muestran en euros e incluyen el IVA vigente en la península y Baleares. En los envíos a
        Canarias, Ceuta y Melilla, los pedidos pueden estar sujetos a impuestos locales (IGIC o IPSI) y trámites de
        aduana que se indicarán antes del pago. Los gastos de envío se muestran por separado en el checkout.
      </p>
      <p>
        Nos esforzamos por que todos los precios sean correctos. Si detectamos un error evidente en el precio de un
        producto, te avisaremos para que decidas si quieres mantener el pedido al precio correcto o cancelarlo.
      </p>

      <h2>4. Formas de pago</h2>
      <p>
        Aceptamos tarjeta de crédito o débito (Visa, Mastercard, American Express), Bizum, PayPal, Apple Pay y Google
        Pay. El cargo se realiza al confirmar el pedido. Los pagos se procesan con cifrado y autenticación reforzada
        (3D Secure).
      </p>

      <h2>5. Entrega</h2>
      <p>
        El envío estándar cuesta {formatPrice(shipping.standard)} (gratis desde {formatPrice(shipping.freeFrom)}) y
        tarda de 2 a 4 días laborables en la península. El envío exprés cuesta {formatPrice(shipping.express)}. En
        cualquier caso, entregaremos tu pedido en un plazo máximo de 30 días naturales. Consulta todos los detalles
        en <Link href="/legal/envios-y-devoluciones">Envíos y devoluciones</Link>.
      </p>

      <h2>6. Derecho de desistimiento</h2>
      <p>
        Conforme a los artículos 102 y siguientes del TRLGDCU, tienes derecho a desistir del contrato en un plazo de{" "}
        {shipping.returnDays} días naturales desde que tú, o una persona que indiques, recibe el pedido, sin
        necesidad de justificarlo. Te devolveremos el importe pagado, incluidos los gastos de envío estándar, en un
        plazo máximo de 14 días naturales desde que nos comuniques tu decisión, usando el mismo medio de pago.
        Podemos retener el reembolso hasta recibir la prenda o una prueba de su envío.
      </p>
      <p>
        Las prendas deben devolverse sin usar y con sus etiquetas. Por motivos de higiene, no se admite la devolución
        de pendientes si se ha abierto su precinto. El procedimiento y el formulario de desistimiento están en{" "}
        <Link href="/legal/envios-y-devoluciones">Envíos y devoluciones</Link>.
      </p>

      <h2>7. Garantía</h2>
      <p>
        Todos nuestros productos tienen una garantía legal de 3 años desde la entrega frente a faltas de conformidad,
        conforme a los artículos 114 y siguientes del TRLGDCU. Si una prenda tiene un defecto, escríbenos a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> con fotos y la repararemos, sustituiremos o te
        devolveremos el dinero sin coste para ti.
      </p>

      <h2>8. Atención al cliente y reclamaciones</h2>
      <p>
        Puedes contactarnos en <a href={`mailto:${site.email}`}>{site.email}</a> o en el {site.phone}. Tenemos hojas
        de reclamaciones a tu disposición. También puedes acudir a la Junta Arbitral de Consumo de tu comunidad
        autónoma.
      </p>

      <h2>9. Legislación y jurisdicción</h2>
      <p>
        Estas condiciones se rigen por la ley española. Si eres consumidora o consumidor, serán competentes los
        juzgados de tu domicilio.
      </p>
    </>
  );
}
