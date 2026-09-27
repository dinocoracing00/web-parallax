"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "az:storage";

type Area = "local" | "session";

function area(kind: Area) {
  return kind === "local" ? window.localStorage : window.sessionStorage;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

/**
 * Lee un valor de localStorage/sessionStorage de forma segura para SSR.
 * Devuelve `undefined` en el servidor y durante la hidratación, y `null` si no existe.
 */
export function useStorageValue(key: string, kind: Area = "local") {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return area(kind).getItem(key);
      } catch {
        return null;
      }
    },
    () => undefined,
  );

  const set = useCallback(
    (next: string | null) => {
      try {
        if (next === null) area(kind).removeItem(key);
        else area(kind).setItem(key, next);
      } catch {}
      window.dispatchEvent(new Event(EVENT));
    },
    [key, kind],
  );

  return [value, set] as const;
}
