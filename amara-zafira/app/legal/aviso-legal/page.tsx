import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal de Amara Zafira: datos del titular de la web, condiciones de uso y propiedad intelectual.",
  alternates: { canonical: "/legal/aviso-legal" },
};

export default function Page() {
  return (
    <>
      <h1 className="mb-8 font-serif text-4xl font-light md:text-5xl">Aviso legal</h1>
      <p className="text-topo">Última actualización: 1 de septiembre de 2026</p>

      <h2>1. Datos del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
        Información y de Comercio Electrónico (LSSI-CE), te informamos de que este sitio web es titularidad de:
      </p>
      <table>
        <tbody>
          <tr><th scope="row">Titular</th><td>{site.legalName}</td></tr>
          <tr><th scope="row">NIF</th><td>{site.cif}</td></tr>
          <tr><th scope="row">Domicilio</th><td>{site.address}</td></tr>
          <tr><th scope="row">Email</th><td>{site.email}</td></tr>
          <tr><th scope="row">Teléfono</th><td>{site.phone}</td></tr>
          <tr><th scope="row">Registro</th><td>Inscrita en el Registro Mercantil de Madrid</td></tr>
        </tbody>
      </table>

      <h2>2. Objeto</h2>
      <p>
        Este aviso regula el acceso y uso del sitio web {site.url.replace("https://", "")} (en adelante, «la web»),
        a través del cual {site.name} ofrece información sobre sus productos y permite su compra en línea. Acceder a la
        web te atribuye la condición de usuaria o usuario e implica la aceptación de este aviso.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>Te comprometes a hacer un uso adecuado de la web y, en particular, a no:</p>
      <ul>
        <li>Utilizarla con fines ilícitos o contrarios a la buena fe.</li>
        <li>Introducir virus o sistemas que puedan dañar la web o los equipos de terceros.</li>
        <li>Intentar acceder a áreas restringidas o a datos de otras personas usuarias.</li>
        <li>Reproducir o distribuir sus contenidos sin autorización.</li>
      </ul>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos de la web (textos, fotografías, diseños, logotipos, código y la marca {site.name}) son
        propiedad de {site.legalName} o de terceros que han autorizado su uso, y están protegidos por la normativa de
        propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o transformación sin
        autorización expresa.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        Trabajamos para que la información de la web sea exacta y esté actualizada, pero no garantizamos la ausencia
        de errores puntuales. No nos hacemos responsables de los daños derivados de interrupciones técnicas ajenas a
        nuestra voluntad ni de los contenidos de webs de terceros enlazadas desde la nuestra.
      </p>

      <h2>6. Legislación aplicable</h2>
      <p>
        Este aviso se rige por la legislación española. Para cualquier controversia serán competentes los juzgados y
        tribunales que correspondan conforme a la normativa de consumidores y usuarios, que en el caso de personas
        consumidoras serán los de su domicilio.
      </p>
    </>
  );
}
