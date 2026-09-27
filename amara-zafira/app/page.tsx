import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { newProducts, products } from "@/data/products";
import Reveal from "@/components/Reveal";
import ProductCarousel from "@/components/ProductCarousel";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: { absolute: "Amara Zafira | Moda femenina urbana y elegante" },
  description:
    "Descubre la nueva colección de Amara Zafira: vestidos, tops, pantalones, faldas, abrigos y accesorios para el día a día. Envío gratis desde 50 €.",
  openGraph: { title: "Amara Zafira | Nueva colección", url: "/" },
};

const heroAlt = "Modelo con abrigo camel de la nueva colección";
const {
  props: { srcSet: heroDesktop },
} = getImageProps({ alt: heroAlt, sizes: "100vw", width: 2400, height: 1350, src: "/images/hero/hero.jpg", priority: true });
const { props: heroMobile } = getImageProps({
  alt: heroAlt,
  sizes: "100vw",
  width: 1200,
  height: 2000,
  src: "/images/hero/hero-movil.jpg",
  priority: true,
});

export default function Home() {
  const novedades = [...newProducts, ...products.filter((p) => !p.isNew)].slice(0, 10);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-arena">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroDesktop} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- el alt viene en heroMobile */}
          <img {...heroMobile} className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-tinta/45 via-tinta/5 to-tinta/20" />
        <div className="absolute inset-x-0 bottom-0 container-page pb-14 text-blanco md:pb-20">
          <p className="eyebrow mb-4 animate-fade-up">Otoño · Invierno</p>
          <h1 className="max-w-3xl font-serif text-[52px] leading-[0.95] font-light animate-fade-up [animation-delay:120ms] md:text-[96px]">
            Nueva colección
          </h1>
          <p className="mt-5 max-w-sm text-sm animate-fade-up [animation-delay:240ms] md:text-base">
            Tejidos nobles, cortes limpios y tonos que se combinan entre sí. Prendas para vivir la ciudad.
          </p>
          <Link href="/coleccion/novedades" className="btn-light mt-8 animate-fade-up [animation-delay:360ms]">
            Descubrir
          </Link>
        </div>
      </section>

      {/* Categorías */}
      <section className="container-page pt-20 md:pt-28" aria-labelledby="categorias-titulo">
        <Reveal className="mb-10 flex items-end justify-between md:mb-14">
          <h2 id="categorias-titulo" className="font-serif text-3xl font-light md:text-5xl">Comprar por categoría</h2>
          <Link href="/coleccion/todo" className="eyebrow link-underline hidden sm:inline">Ver todo</Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 120}>
              <Link href={`/coleccion/${c.slug}`} className="group relative block aspect-[3/4] overflow-hidden bg-crudo">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tinta/35 to-transparent to-50%" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-blanco md:p-6">
                  <span className="font-serif text-2xl font-light md:text-4xl">{c.name}</span>
                  <span className="eyebrow hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:inline">
                    Ver
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Novedades */}
      <section className="pt-20 md:pt-28" aria-labelledby="novedades-titulo">
        <Reveal className="container-page mb-8 flex items-end justify-between md:mb-12">
          <div>
            <p className="eyebrow mb-3 text-topo">Recién llegado</p>
            <h2 id="novedades-titulo" className="font-serif text-3xl font-light md:text-5xl">Novedades</h2>
          </div>
          <Link href="/coleccion/novedades" className="eyebrow link-underline">Ver todo</Link>
        </Reveal>
        <Reveal>
          <ProductCarousel products={novedades} label="Novedades" />
        </Reveal>
      </section>

      {/* Banner editorial a dos columnas */}
      <section className="container-page pt-20 md:pt-28" aria-labelledby="editorial-titulo">
        <div className="grid gap-8 md:grid-cols-2 md:gap-4">
          <Reveal className="relative aspect-[3/4] overflow-hidden bg-crudo">
            <Image
              src="/images/editorial/editorial-1.jpg"
              alt="Look de lino en tonos crudos"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={150} className="flex flex-col justify-between gap-8">
            <div className="relative hidden aspect-[4/3] overflow-hidden bg-crudo md:block">
              <Image
                src="/images/editorial/editorial-2.jpg"
                alt="Detalle de tejido y accesorios dorados"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="max-w-md md:px-8 md:pb-8 lg:px-16 lg:pb-16">
              <p className="eyebrow mb-4 text-topo">Editorial</p>
              <h2 id="editorial-titulo" className="font-serif text-4xl leading-tight font-light md:text-5xl">
                El arte de vestir sin esfuerzo
              </h2>
              <p className="mt-5 text-sm leading-7">
                Lino lavado, satén con caída y punto que abraza. Piezas pensadas para mezclarse entre sí y acompañarte
                de la mañana a la noche, temporada tras temporada.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/coleccion/vestidos" className="btn-primary">Ver vestidos</Link>
                <Link href="/coleccion/abrigos" className="btn-outline">Ver abrigos</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ventajas */}
      <section className="container-page pt-20 md:pt-28">
        <ul className="grid grid-cols-1 gap-8 border-y border-arena py-10 text-center sm:grid-cols-3">
          <li>
            <p className="eyebrow">Envío gratis</p>
            <p className="mt-2 text-sm text-topo">En pedidos desde 50 € a toda la península</p>
          </li>
          <li>
            <p className="eyebrow">Devoluciones fáciles</p>
            <p className="mt-2 text-sm text-topo">Tienes 14 días para cambiar de opinión</p>
          </li>
          <li>
            <p className="eyebrow">Pago seguro</p>
            <p className="mt-2 text-sm text-topo">Tarjeta, Bizum y PayPal</p>
          </li>
        </ul>
      </section>

      {/* Newsletter */}
      <div className="pt-20 md:pt-28">
        <Newsletter />
      </div>
    </>
  );
}
