import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "./SearchResults";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Busca vestidos, tops, pantalones, faldas, abrigos y accesorios en Amara Zafira.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <SearchResults />
    </Suspense>
  );
}
