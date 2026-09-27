import type { Metadata } from "next";
import { site } from "@/lib/site";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies usa Amara Zafira, para qué sirven y cómo puedes configurarlas o rechazarlas.",
  alternates: { canonical: "/legal/cookies" },
};

export default function Page() {
  return (
    <>
      <h1 className="mb-8 font-serif text-4xl font-light md:text-5xl">Política de cookies</h1>
      <p className="text-topo">Última actualización: 1 de septiembre de 2026</p>
      <p>
        Esta política explica qué son las cookies, cuáles usamos en {site.name} y cómo puedes gestionarlas, conforme
        al artículo 22.2 de la LSSI-CE y a la Guía sobre el uso de cookies de la Agencia Española de Protección de
        Datos.
      </p>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Son pequeños archivos que la web guarda en tu navegador. Sirven, por ejemplo, para recordar lo que tienes en
        la cesta o para saber qué páginas se visitan más. También usamos tecnologías similares, como el almacenamiento
        local del navegador (localStorage).
      </p>

      <h2>2. Cookies que usamos</h2>
      <table>
        <thead>
          <tr><th scope="col">Nombre</th><th scope="col">Tipo y finalidad</th><th scope="col">Duración</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>amara-zafira:v1</td>
            <td>Técnica (propia). Guarda tu cesta, tus favoritos y el código de descuento aplicado.</td>
            <td>Persistente, hasta que la borres</td>
          </tr>
          <tr>
            <td>amara-zafira:cookies</td>
            <td>Técnica (propia). Recuerda tus preferencias de cookies.</td>
            <td>Persistente, hasta que la borres</td>
          </tr>
          <tr>
            <td>Cookies de análisis</td>
            <td>Análisis (terceros). Miden de forma agregada cómo se usa la web. Solo se activan si las aceptas.</td>
            <td>Hasta 13 meses</td>
          </tr>
          <tr>
            <td>Cookies de marketing</td>
            <td>Publicidad (terceros, como Meta o TikTok). Muestran anuncios relevantes en redes sociales. Solo se activan si las aceptas.</td>
            <td>Hasta 13 meses</td>
          </tr>
        </tbody>
      </table>
      <p>Las cookies técnicas son necesarias para que la tienda funcione y no requieren tu consentimiento.</p>

      <h2>3. Cómo gestionar las cookies</h2>
      <p>
        Puedes aceptar, rechazar o configurar las cookies opcionales en cualquier momento desde el panel de
        preferencias. Rechazarlas no te impide comprar.
      </p>
      <p>
        <CookieSettingsButton className="btn-outline" label="Configurar cookies" />
      </p>
      <p>También puedes borrarlas o bloquearlas desde la configuración de tu navegador:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>4. Cambios en esta política</h2>
      <p>
        Si añadimos nuevas cookies actualizaremos esta página y, cuando sea necesario, te volveremos a pedir el
        consentimiento. Para cualquier duda escríbenos a <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
