import Link from "next/link";
import { categories } from "@/data/categories";
import { site } from "@/lib/site";
import CookieSettingsButton from "@/components/CookieSettingsButton";

const columns = [
  {
    title: "Comprar",
    links: [
      { href: "/coleccion/novedades", label: "Novedades" },
      ...categories.map((c) => ({ href: `/coleccion/${c.slug}`, label: c.name })),
      { href: "/coleccion/rebajas", label: "Rebajas" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { href: "/faq", label: "Preguntas frecuentes" },
      { href: "/guia-de-tallas", label: "Guía de tallas" },
      { href: "/legal/envios-y-devoluciones", label: "Envíos y devoluciones" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
  {
    title: "Amara Zafira",
    links: [
      { href: "/sobre-nosotros", label: "Sobre nosotros" },
      { href: "/favoritos", label: "Favoritos" },
      { href: site.instagram, label: "Instagram" },
      { href: site.tiktok, label: "TikTok" },
      { href: site.pinterest, label: "Pinterest" },
    ],
  },
];

const legal = [
  { href: "/legal/aviso-legal", label: "Aviso legal" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/condiciones-de-venta", label: "Condiciones de venta" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-arena bg-blanco">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <p className="font-serif text-2xl font-light tracking-[0.3em]">AMARA ZAFIRA</p>
          <p className="mt-4 text-sm text-topo">
            Moda femenina urbana y elegante, pensada en Madrid para el día a día.
          </p>
          <p className="mt-6 text-sm">
            Envío gratis en pedidos desde 50 €<br />
            Devoluciones en 14 días
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="eyebrow mb-5">{col.title}</h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="transition-opacity hover:opacity-60">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-page flex flex-col gap-4 border-t border-arena py-6 text-xs text-topo md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}. Todos los derechos reservados.</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-tinta">{l.label}</Link>
            </li>
          ))}
          <li>
            <CookieSettingsButton className="hover:text-tinta" />
          </li>
        </ul>
      </div>
    </footer>
  );
}
