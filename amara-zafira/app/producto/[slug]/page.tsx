import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getRelated, products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { site } from "@/lib/site";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.description} Disponible en ${product.colors.map((c) => c.name.toLowerCase()).join(" y ")}.`,
    alternates: { canonical: `/producto/${slug}` },
    openGraph: {
      title: `${product.name} | Amara Zafira`,
      description: product.description,
      url: `/producto/${slug}`,
      images: product.images.slice(0, 2).map((url) => ({ url, width: 1200, height: 1600, alt: product.name })),
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/producto/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const look = product.completeTheLook.map(getProduct).filter((p) => p !== undefined);
  const related = getRelated(product, 8);

  // Datos estructurados para que Google muestre precio y disponibilidad.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => `${site.url}${i}`),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${site.url}/producto/${product.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <nav aria-label="Ruta de navegación" className="container-page hidden py-4 text-xs text-topo md:block">
        <ol className="flex gap-2">
          <li><Link href="/" className="hover:text-tinta">Inicio</Link></li>
          <li aria-hidden>/</li>
          {category && (
            <>
              <li><Link href={`/coleccion/${category.slug}`} className="hover:text-tinta">{category.name}</Link></li>
              <li aria-hidden>/</li>
            </>
          )}
          <li aria-current="page" className="text-tinta">{product.name}</li>
        </ol>
      </nav>

      <div className="md:container-page grid md:grid-cols-[1fr_380px] md:gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />
        <div className="container-page pt-6 md:px-0 md:pt-0">
          <div className="md:sticky md:top-24">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      {look.length > 0 && (
        <section className="container-page pt-20 md:pt-28" aria-labelledby="look-titulo">
          <h2 id="look-titulo" className="mb-8 font-serif text-3xl font-light md:text-4xl">Completa el look</h2>
          <div className="grid grid-cols-2 gap-x-2 gap-y-10 md:grid-cols-4 md:gap-x-4">
            {[product, ...look].slice(0, 4).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="pt-20 md:pt-28" aria-labelledby="relacionados-titulo">
        <h2 id="relacionados-titulo" className="container-page mb-8 font-serif text-3xl font-light md:text-4xl">
          También te puede gustar
        </h2>
        <ProductCarousel products={related} label="Productos relacionados" />
      </section>
    </>
  );
}
