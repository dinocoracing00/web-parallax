import type { ReactNode } from "react";
import { IconPlus } from "@/components/Icons";

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border-b border-arena" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
        <span className="eyebrow">{title}</span>
        <IconPlus width={16} height={16} className="transition-transform duration-300 group-open:rotate-45" />
      </summary>
      <div className="pb-5 text-sm leading-6 text-[#3a3a3a]">{children}</div>
    </details>
  );
}
