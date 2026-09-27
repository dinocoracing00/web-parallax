import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="container-page pt-10 pb-10 md:pt-16 md:pb-14">
      {eyebrow && <p className="eyebrow mb-4 text-topo">{eyebrow}</p>}
      <h1 className="max-w-3xl font-serif text-4xl leading-tight font-light md:text-6xl">{title}</h1>
      {children && <div className="mt-5 max-w-xl text-sm leading-7 text-topo">{children}</div>}
    </header>
  );
}
