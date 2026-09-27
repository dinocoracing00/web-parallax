"use client";

import { OPEN_COOKIE_SETTINGS } from "@/components/CookieBanner";

export default function CookieSettingsButton({
  className,
  label = "Configurar cookies",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}>
      {label}
    </button>
  );
}
