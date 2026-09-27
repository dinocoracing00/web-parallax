import type { Metadata } from "next";
import CartPage from "./CartPage";

export const metadata: Metadata = {
  title: "Cesta",
  description: "Revisa las prendas de tu cesta y tramita tu pedido en Amara Zafira.",
  robots: { index: false },
};

export default function Page() {
  return <CartPage />;
}
