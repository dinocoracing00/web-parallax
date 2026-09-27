import LegalNav from "./LegalNav";

export default function LegalLayout({ children }: LayoutProps<"/legal">) {
  return (
    <div className="container-page grid gap-10 pt-10 md:grid-cols-[220px_1fr] md:gap-20 md:pt-16">
      <LegalNav />
      <article className="prose-az min-w-0">{children}</article>
    </div>
  );
}
