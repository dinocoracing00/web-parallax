"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import { useStore } from "@/lib/store";
import { IconBag, IconClose, IconHeart, IconMenu, IconSearch } from "@/components/Icons";

const primaryLinks = [
  { href: "/coleccion/novedades", label: "Novedades" },
  ...categories.slice(0, 5).map((c) => ({ href: `/coleccion/${c.slug}`, label: c.name })),
];

export default function Header() {
  const pathname = usePathname();
  const { count, setCartOpen, setSearchOpen, wishlist, hydrated } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Solo la portada tiene cabecera transparente sobre la foto.
  const overHero = pathname === "/" && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          overHero ? "bg-transparent text-blanco" : "bg-blanco/95 text-tinta backdrop-blur-sm"
        }`}
      >
        <div className="container-page grid h-14 grid-cols-[1fr_auto_1fr] items-center md:h-16">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              className="-ml-2 p-2 lg:hidden"
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
            <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
              {primaryLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`eyebrow transition-opacity hover:opacity-60 ${
                    pathname === l.href ? "underline underline-offset-8 decoration-[0.5px]" : ""
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" aria-label="Amara Zafira, ir al inicio" className="text-center font-serif text-[17px] font-light tracking-[0.22em] whitespace-nowrap sm:text-[20px] sm:tracking-[0.3em] md:text-[26px] md:tracking-[0.38em]">
            AMARA ZAFIRA
          </Link>

          <div className="flex items-center justify-end gap-1 md:gap-3">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Buscar" className="p-2">
              <IconSearch />
            </button>
            <Link href="/favoritos" aria-label="Favoritos" className="relative hidden p-2 sm:block">
              <IconHeart />
              {hydrated && wishlist.length > 0 && (
                <span className="absolute top-1 right-0.5 h-1.5 w-1.5 rounded-full bg-current" />
              )}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Cesta, ${count} ${count === 1 ? "artículo" : "artículos"}`}
              className="relative -mr-2 flex items-center gap-1 p-2"
            >
              <IconBag />
              <span className="min-w-[1ch] text-[11px] tabular-nums">{hydrated && count > 0 ? count : ""}</span>
            </button>
          </div>
        </div>
      </header>
      {/* Hueco bajo la cabecera fija (la portada va a sangre, sin hueco). */}
      {pathname !== "/" && <div aria-hidden className="h-14 md:h-16" />}

      {/* Menú móvil */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-14 z-30 overflow-y-auto bg-blanco animate-fade-in lg:hidden"
          onClick={(e) => (e.target as HTMLElement).closest("a") && setMenuOpen(false)}
        >
          <nav aria-label="Menú móvil" className="container-page flex flex-col gap-1 py-8">
            <Link href="/coleccion/novedades" className="py-2 font-serif text-3xl font-light">Novedades</Link>
            {categories.map((c) => (
              <Link key={c.slug} href={`/coleccion/${c.slug}`} className="py-2 font-serif text-3xl font-light">
                {c.name}
              </Link>
            ))}
            <Link href="/coleccion/rebajas" className="py-2 font-serif text-3xl font-light text-rebaja">Rebajas</Link>
            <Link href="/coleccion/todo" className="py-2 font-serif text-3xl font-light">Ver todo</Link>
            <div className="mt-8 flex flex-col gap-4 border-t border-arena pt-8">
              <Link href="/favoritos" className="eyebrow">Favoritos</Link>
              <Link href="/sobre-nosotros" className="eyebrow">Sobre nosotros</Link>
              <Link href="/guia-de-tallas" className="eyebrow">Guía de tallas</Link>
              <Link href="/faq" className="eyebrow">Preguntas frecuentes</Link>
              <Link href="/contacto" className="eyebrow">Contacto</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
