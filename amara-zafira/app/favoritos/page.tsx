import type { Metadata } from "next";
import Wishlist from "./Wishlist";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Tus prendas favoritas de Amara Zafira, guardadas para más tarde.",
  robots: { index: false },
};

export default function Page() {
  return <Wishlist />;
}
