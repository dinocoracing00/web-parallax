"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const legalPages = [
  { href: "/legal/aviso-legal", label: "Aviso legal" },
  { href: "/legal/privacidad", label: "Política de privacidad" },
  { href: "/legal/cookies", label: "Política de cookies" },
  { href: "/legal/condiciones-de-venta", label: "Condiciones de venta" },
  { href: "/legal/envios-y-devoluciones", label: "Envíos y devoluciones" },
];

export default function LegalNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Información legal" className="min-w-0">
      <ul className="no-scrollbar -mx-4 flex gap-5 overflow-x-auto px-4 md:sticky md:top-24 md:mx-0 md:flex-col md:gap-3 md:px-0">
        {legalPages.map((p) => (
          <li key={p.href} className="shrink-0">
            <Link
              href={p.href}
              aria-current={pathname === p.href ? "page" : undefined}
              className={`eyebrow ${pathname === p.href ? "underline decoration-[0.5px] underline-offset-8" : "opacity-60 hover:opacity-100"}`}
            >
              {p.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
