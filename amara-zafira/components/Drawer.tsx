"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { IconClose } from "@/components/Icons";

/** Panel lateral o modal con fondo oscurecido, cierre con Escape y bloqueo de scroll. */
export default function Drawer({
  open,
  onClose,
  title,
  side = "right",
  children,
  footer,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: "right" | "left" | "center" | "top";
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const position = {
    right: "inset-y-0 right-0 w-full max-w-[440px] animate-slide-in",
    left: "inset-y-0 left-0 w-full max-w-[440px] animate-slide-in-left",
    center:
      "inset-x-0 bottom-0 max-h-[90dvh] w-full animate-fade-up md:inset-auto md:top-1/2 md:left-1/2 md:w-[min(720px,92vw)] md:-translate-x-1/2 md:-translate-y-1/2",
    top: "inset-x-0 top-0 max-h-dvh w-full animate-fade-in",
  }[side];

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-tinta/30 animate-fade-in" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`absolute flex flex-col bg-blanco outline-none ${position} ${className}`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-arena px-5 md:h-16 md:px-6">
          <h2 className="eyebrow">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="-mr-2 p-2">
            <IconClose />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && <div className="shrink-0 border-t border-arena p-5 md:p-6">{footer}</div>}
      </div>
    </div>
  );
}
