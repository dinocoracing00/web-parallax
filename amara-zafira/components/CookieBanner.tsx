"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStorageValue } from "@/lib/useStorage";

export const CONSENT_KEY = "amara-zafira:cookies";
export const OPEN_COOKIE_SETTINGS = "az:open-cookie-settings";

interface Consent {
  necesarias: true;
  analiticas: boolean;
  marketing: boolean;
  fecha: string;
}

/** Lee el consentimiento guardado (útil para cargar analítica solo si se aceptó). */
export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [stored, setStored] = useStorageValue(CONSENT_KEY);
  const [reopened, setReopened] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analiticas, setAnaliticas] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Se puede volver a abrir desde el pie de página o la política de cookies.
  useEffect(() => {
    const open = () => {
      const saved = getConsent();
      setAnaliticas(saved?.analiticas ?? false);
      setMarketing(saved?.marketing ?? false);
      setReopened(true);
      setSettings(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  const save = (a: boolean, m: boolean) => {
    const consent: Consent = { necesarias: true, analiticas: a, marketing: m, fecha: new Date().toISOString() };
    setStored(JSON.stringify(consent));
    setReopened(false);
    setSettings(false);
  };

  // undefined = aún en el servidor o hidratando; null = sin decisión guardada.
  const visible = reopened || stored === null;
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-arena bg-blanco animate-fade-up md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md md:border"
    >
      <div className="p-5 md:p-6">
        <p className="eyebrow mb-3">Cookies</p>
        <p className="text-sm leading-6">
          Usamos cookies propias necesarias para que la tienda funcione y, si nos dejas, cookies de análisis y
          marketing para mejorar tu experiencia. Más información en nuestra{" "}
          <Link href="/legal/cookies" className="link-underline">política de cookies</Link>.
        </p>

        {settings && (
          <div className="mt-5 flex flex-col divide-y divide-arena border-y border-arena text-sm">
            <label className="flex items-center justify-between gap-4 py-3">
              <span>
                Necesarias
                <span className="block text-xs text-topo">Cesta, favoritos y seguridad. Siempre activas.</span>
              </span>
              <input type="checkbox" checked disabled className="h-4 w-4 accent-tinta" />
            </label>
            <label className="flex items-center justify-between gap-4 py-3">
              <span>
                Análisis
                <span className="block text-xs text-topo">Nos ayudan a saber qué páginas funcionan mejor.</span>
              </span>
              <input
                type="checkbox"
                checked={analiticas}
                onChange={(e) => setAnaliticas(e.target.checked)}
                className="h-4 w-4 accent-tinta"
              />
            </label>
            <label className="flex items-center justify-between gap-4 py-3">
              <span>
                Marketing
                <span className="block text-xs text-topo">Publicidad personalizada en redes sociales.</span>
              </span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="h-4 w-4 accent-tinta"
              />
            </label>
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => save(false, false)} className="btn-outline h-11 px-4">
            Rechazar
          </button>
          <button type="button" onClick={() => save(true, true)} className="btn-primary h-11 px-4">
            Aceptar todas
          </button>
        </div>
        {settings ? (
          <button type="button" onClick={() => save(analiticas, marketing)} className="btn mt-2 h-10 w-full px-4">
            Guardar mi selección
          </button>
        ) : (
          <button type="button" onClick={() => setSettings(true)} className="mt-3 w-full text-center text-xs link-underline">
            Configurar
          </button>
        )}
      </div>
    </div>
  );
}
