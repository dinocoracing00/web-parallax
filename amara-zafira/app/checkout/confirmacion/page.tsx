import type { Metadata } from "next";
import Confirmation from "./Confirmation";

export const metadata: Metadata = {
  title: "Pedido confirmado",
  description: "Gracias por tu compra en Amara Zafira.",
  robots: { index: false },
};

export default function Page() {
  return <Confirmation />;
}
