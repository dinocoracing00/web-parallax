import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory, newProducts, products, saleProducts } from "@/data/products";
import CollectionView from "@/components/CollectionView";

const special = {
  todo: {
    name: "Ver todo",
    description: "Toda la colección de Amara Zafira: prendas esenciales y novedades de temporada.",
    list: products,
  },
  novedades: {
    name: "Novedades",
    description: "Lo último en llegar. Prendas nuevas cada semana para renovar tu armario.",
    list: newProducts,
  },
  rebajas: {
    name: "Rebajas",
    description: "Prendas seleccionadas con descuento. Unidades limitadas.",
    list: saleProducts,
  },
};

function resolve(slug: string) {
  if (slug in special) return special[slug as keyof typeof special];
  const category = getCategory(slug);
  return category && { ...category, list: getProductsByCategory(slug) };
}

export function generateStaticParams() {
  return [...Object.keys(special), ...categories.map((c) => c.slug)].map((categoria) => ({ categoria }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/coleccion/[categoria]">): Promise<Metadata> {
  const { categoria } = await params;
  const data = resolve(categoria);
  if (!data) return {};
  const title = data.name === "Ver todo" ? "Toda la colección" : `${data.name} de mujer`;
  return {
    title,
    description: data.description,
    alternates: { canonical: `/coleccion/${categoria}` },
    openGraph: {
      title: `${title} | Amara Zafira`,
      description: data.description,
      url: `/coleccion/${categoria}`,
      images: data.list[0] ? [{ url: data.list[0].images[0], width: 1200, height: 1600 }] : undefined,
    },
  };
}

export default async function CollectionPage({ params }: PageProps<"/coleccion/[categoria]">) {
  const { categoria } = await params;
  const data = resolve(categoria);
  if (!data) notFound();

  return (
    <>
      <div className="container-page pt-8 pb-6 md:pt-14 md:pb-10">
        <h1 className="font-serif text-4xl font-light md:text-6xl">{data.name}</h1>
        <p className="mt-3 max-w-xl text-sm text-topo">{data.description}</p>
        <nav aria-label="Categorías" className="no-scrollbar -mx-4 mt-6 flex gap-5 overflow-x-auto px-4 md:mx-0 md:px-0">
          {[
            { slug: "todo", name: "Ver todo" },
            { slug: "novedades", name: "Novedades" },
            ...categories,
            { slug: "rebajas", name: "Rebajas" },
          ].map((c) => (
            <Link
              key={c.slug}
              href={`/coleccion/${c.slug}`}
              aria-current={c.slug === categoria ? "page" : undefined}
              className={`eyebrow shrink-0 py-1 transition-opacity ${
                c.slug === categoria ? "underline decoration-[0.5px] underline-offset-8" : "opacity-60 hover:opacity-100"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
      <CollectionView products={data.list} />
    </>
  );
}
