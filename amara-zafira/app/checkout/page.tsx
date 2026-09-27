import type { Metadata } from "next";
import CheckoutForm from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Finalizar compra",
  description: "Introduce tus datos de envío y finaliza tu pedido en Amara Zafira.",
  robots: { index: false },
};

export default function Page() {
  return <CheckoutForm />;
}
