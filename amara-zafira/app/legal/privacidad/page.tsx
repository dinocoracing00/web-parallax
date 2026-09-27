import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata Amara Zafira tus datos personales conforme al RGPD y la LOPDGDD, y cómo ejercer tus derechos.",
  alternates: { canonical: "/legal/privacidad" },
};

export default function Page() {
  return (
    <>
      <h1 className="mb-8 font-serif text-4xl font-light md:text-5xl">Política de privacidad</h1>
      <p className="text-topo">Última actualización: 1 de septiembre de 2026</p>
      <p>
        En {site.name} respetamos tu privacidad. Esta política explica qué datos personales tratamos, para qué y cuáles
        son tus derechos, conforme al Reglamento (UE) 2016/679 General de Protección de Datos (RGPD) y a la Ley
        Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <table>
        <tbody>
          <tr><th scope="row">Responsable</th><td>{site.legalName}</td></tr>
          <tr><th scope="row">NIF</th><td>{site.cif}</td></tr>
          <tr><th scope="row">Dirección</th><td>{site.address}</td></tr>
          <tr><th scope="row">Contacto</th><td>{site.email}</td></tr>
        </tbody>
      </table>

      <h2>2. Qué datos tratamos, para qué y con qué base legal</h2>
      <table>
        <thead>
          <tr><th scope="col">Finalidad</th><th scope="col">Datos</th><th scope="col">Base legal</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Gestionar tus pedidos, pagos, envíos y devoluciones</td>
            <td>Nombre, email, teléfono, dirección, datos del pedido</td>
            <td>Ejecución del contrato (art. 6.1.b RGPD)</td>
          </tr>
          <tr>
            <td>Atender tus consultas por email, teléfono o formulario</td>
            <td>Nombre, email y contenido del mensaje</td>
            <td>Consentimiento e interés legítimo (art. 6.1.a y f)</td>
          </tr>
          <tr>
            <td>Enviarte la newsletter y ofertas</td>
            <td>Email</td>
            <td>Consentimiento (art. 6.1.a)</td>
          </tr>
          <tr>
            <td>Cumplir obligaciones fiscales y contables</td>
            <td>Datos de facturación</td>
            <td>Obligación legal (art. 6.1.c)</td>
          </tr>
          <tr>
            <td>Analizar el uso de la web (solo si lo aceptas)</td>
            <td>Datos de navegación</td>
            <td>Consentimiento (art. 6.1.a)</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Cuánto tiempo conservamos tus datos</h2>
      <ul>
        <li>Datos de pedidos y facturación: durante la relación comercial y, después, el plazo legal de 6 años (Código de Comercio) o 4 años (normativa tributaria).</li>
        <li>Newsletter: hasta que te des de baja.</li>
        <li>Consultas: el tiempo necesario para resolverlas y, como máximo, un año después.</li>
      </ul>

      <h2>4. Con quién compartimos tus datos</h2>
      <p>No vendemos tus datos. Solo los compartimos con proveedores que nos ayudan a prestar el servicio, con los que tenemos firmado un contrato de encargo del tratamiento:</p>
      <ul>
        <li>Empresas de transporte, para entregar tus pedidos.</li>
        <li>Pasarelas de pago (por ejemplo, Stripe o PayPal), para procesar los cobros de forma segura.</li>
        <li>Proveedores de alojamiento web y de envío de emails.</li>
        <li>Administraciones públicas, cuando la ley lo exija.</li>
      </ul>
      <p>
        Algunos de estos proveedores pueden estar fuera del Espacio Económico Europeo. En ese caso, las transferencias
        se realizan con garantías adecuadas, como las cláusulas contractuales tipo de la Comisión Europea o el Marco
        de Privacidad de Datos UE-EE. UU.
      </p>

      <h2>5. Tus derechos</h2>
      <p>Puedes ejercer en cualquier momento tus derechos de:</p>
      <ul>
        <li>Acceso, rectificación y supresión de tus datos.</li>
        <li>Oposición y limitación del tratamiento.</li>
        <li>Portabilidad de los datos.</li>
        <li>Retirar tu consentimiento, sin que afecte a la licitud del tratamiento anterior.</li>
      </ul>
      <p>
        Escríbenos a <a href={`mailto:${site.email}`}>{site.email}</a> indicando el derecho que quieres ejercer. Si
        consideras que no hemos atendido correctamente tu solicitud, puedes reclamar ante la Agencia Española de
        Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
      </p>

      <h2>6. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas para proteger tus datos: conexión cifrada (HTTPS), acceso restringido
        y proveedores que cumplen el RGPD. Nunca almacenamos los datos completos de tu tarjeta.
      </p>

      <h2>7. Cookies</h2>
      <p>
        Consulta cómo usamos las cookies en nuestra <Link href="/legal/cookies">política de cookies</Link>.
      </p>
    </>
  );
}
