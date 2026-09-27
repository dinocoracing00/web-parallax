import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "¿Tienes dudas sobre un pedido, una talla o una devolución? Escríbenos y te respondemos en menos de 24 horas laborables.",
  alternates: { canonical: "/contacto" },
  openGraph: { title: "Contacto | Amara Zafira", url: "/contacto" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Atención al cliente" title="Hablemos">
        Te respondemos en menos de 24 horas laborables. Antes de escribirnos, quizá encuentres tu respuesta en las{" "}
        <Link href="/faq" className="link-underline text-tinta">preguntas frecuentes</Link>.
      </PageHeader>
      <div className="container-page grid gap-16 md:grid-cols-[1.3fr_1fr] md:gap-24">
        <ContactForm />
        <aside className="flex flex-col gap-10 text-sm">
          <div>
            <h2 className="eyebrow mb-3">Email</h2>
            <a href={`mailto:${site.email}`} className="link-underline">{site.email}</a>
          </div>
          <div>
            <h2 className="eyebrow mb-3">Teléfono y WhatsApp</h2>
            <p>{site.phone}</p>
            <p className="text-topo">Lunes a viernes, de 9:00 a 18:00</p>
          </div>
          <div>
            <h2 className="eyebrow mb-3">Estudio</h2>
            <p>{site.address}</p>
            <p className="text-topo">Solo con cita previa</p>
          </div>
          <div>
            <h2 className="eyebrow mb-3">Redes</h2>
            <ul className="flex gap-5">
              <li><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">Instagram</a></li>
              <li><a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="link-underline">TikTok</a></li>
              <li><a href={site.pinterest} target="_blank" rel="noopener noreferrer" className="link-underline">Pinterest</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
