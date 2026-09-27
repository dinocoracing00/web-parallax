import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Amara Zafira nace en Madrid con una idea sencilla: moda femenina elegante para el día a día, con tejidos nobles y precios justos.",
  alternates: { canonical: "/sobre-nosotros" },
  openGraph: { title: "Sobre nosotros | Amara Zafira", url: "/sobre-nosotros", images: ["/images/paginas/sobre-nosotros.jpg"] },
};

const values = [
  {
    title: "Menos, pero mejor",
    text: "Diseñamos colecciones cortas de prendas que se combinan entre sí, para que construyas un armario que dure.",
  },
  {
    title: "Tejidos con criterio",
    text: "Lino europeo, algodón orgánico, viscosa certificada y poliéster reciclado. Elegimos cada fibra por su tacto y su impacto.",
  },
  {
    title: "Cerca de ti",
    text: "Trabajamos con talleres de España y Portugal que conocemos en persona, y enviamos desde nuestro almacén en Madrid.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[70svh] min-h-[420px] w-full overflow-hidden bg-arena">
        <Image src="/images/paginas/sobre-nosotros.jpg" alt="Estudio de diseño de Amara Zafira" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-tinta/25" />
        <div className="absolute inset-x-0 bottom-0 container-page pb-12 text-blanco md:pb-16">
          <p className="eyebrow mb-4">Sobre nosotros</p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1] font-light md:text-7xl">Vestir bien, cada día</h1>
        </div>
      </section>

      <section className="container-page grid gap-10 py-20 md:grid-cols-2 md:gap-20 md:py-28">
        <Reveal>
          <h2 className="font-serif text-3xl leading-tight font-light md:text-4xl">
            Amara Zafira nace en Madrid en 2024 de una conversación entre amigas.
          </h2>
        </Reveal>
        <Reveal delay={150} className="flex flex-col gap-5 text-sm leading-7">
          <p>
            Queríamos ropa que funcionara igual de bien un lunes en la oficina que un sábado de terrazas. Prendas con
            cortes limpios, tejidos agradables y colores que no pasan de moda, a un precio razonable.
          </p>
          <p>
            No lo encontrábamos, así que decidimos hacerlo nosotras. Cada temporada dibujamos una colección corta y
            pensada para mezclarse: vestidos que admiten una americana, pantalones que van con todo y abrigos que
            quieres llevar durante años.
          </p>
          <p>
            Hoy enviamos a toda España desde nuestro estudio en Madrid, y cada pedido lo prepara a mano nuestro
            pequeño equipo.
          </p>
        </Reveal>
      </section>

      <section className="bg-crudo">
        <div className="container-page grid gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-20 md:py-28">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-arena">
            <Image src="/images/paginas/estudio.jpg" alt="Detalle de tejidos de lino en el estudio" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </Reveal>
          <div className="flex flex-col gap-10">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 120}>
                <h3 className="font-serif text-2xl font-light md:text-3xl">{v.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-[#3a3a3a]">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page flex flex-col items-center py-20 text-center md:py-28">
        <p className="max-w-2xl font-serif text-3xl leading-snug font-light md:text-4xl">
          «Queremos que abras el armario y todo combine.»
        </p>
        <p className="eyebrow mt-6 text-topo">El equipo de Amara Zafira</p>
        <Link href="/coleccion/novedades" className="btn-primary mt-10">Descubrir la colección</Link>
      </section>
    </>
  );
}
