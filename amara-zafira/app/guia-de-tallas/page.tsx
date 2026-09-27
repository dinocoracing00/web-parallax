import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SizeTable, { HowToMeasure } from "@/components/SizeTable";

export const metadata: Metadata = {
  title: "Guía de tallas",
  description: "Encuentra tu talla en Amara Zafira: tabla de medidas de pecho, cintura y cadera, equivalencias y consejos para medirte.",
  alternates: { canonical: "/guia-de-tallas" },
  openGraph: { title: "Guía de tallas | Amara Zafira", url: "/guia-de-tallas" },
};

const bottoms = [
  { size: "XS", es: "34", waist: "62–66", hip: "88–92", inseam: "78" },
  { size: "S", es: "36", waist: "66–70", hip: "92–96", inseam: "79" },
  { size: "M", es: "38", waist: "70–74", hip: "96–100", inseam: "80" },
  { size: "L", es: "40", waist: "74–80", hip: "100–106", inseam: "81" },
  { size: "XL", es: "42", waist: "80–86", hip: "106–112", inseam: "82" },
];

export default function SizeGuidePage() {
  return (
    <>
      <PageHeader eyebrow="Ayuda" title="Guía de tallas">
        Nuestras prendas siguen el tallaje español. Si estás entre dos tallas, elige la mayor en prendas ajustadas y la
        menor en cortes oversize.
      </PageHeader>
      <div className="container-page flex max-w-4xl flex-col gap-16 md:mx-0">
        <section>
          <h2 className="mb-6 font-serif text-2xl font-light md:text-3xl">Vestidos, tops y abrigos</h2>
          <SizeTable />
        </section>

        <section>
          <h2 className="mb-6 font-serif text-2xl font-light md:text-3xl">Pantalones y faldas</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm tabular-nums">
              <caption className="sr-only">Medidas en centímetros para pantalones y faldas</caption>
              <thead>
                <tr className="border-b border-tinta text-left">
                  {["Talla", "España", "Cintura", "Cadera", "Largo de pierna"].map((h) => (
                    <th key={h} scope="col" className="eyebrow py-3 pr-4 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bottoms.map((r) => (
                  <tr key={r.size} className="border-b border-arena">
                    <th scope="row" className="py-3 pr-4 text-left font-normal">{r.size}</th>
                    <td className="py-3 pr-4">{r.es}</td>
                    <td className="py-3 pr-4">{r.waist}</td>
                    <td className="py-3 pr-4">{r.hip}</td>
                    <td className="py-3">{r.inseam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-topo">Medidas en centímetros. Largo de pierna de la prenda, desde la entrepierna.</p>
        </section>

        <section>
          <h2 className="mb-6 font-serif text-2xl font-light md:text-3xl">Cómo medirte</h2>
          <p className="mb-8 max-w-xl text-sm leading-7">
            Usa una cinta métrica flexible y mídete con ropa interior ligera. La cinta debe quedar ajustada pero sin
            apretar.
          </p>
          <HowToMeasure />
        </section>

        <section className="bg-crudo p-6 md:p-10">
          <h2 className="font-serif text-2xl font-light">Equivalencias internacionales</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm tabular-nums">
              <thead>
                <tr className="border-b border-tinta text-left">
                  {["Amara Zafira", "España / Francia", "Italia", "Reino Unido", "EE. UU."].map((h) => (
                    <th key={h} scope="col" className="eyebrow py-3 pr-4 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["XS", "34", "38", "6", "2"],
                  ["S", "36", "40", "8", "4"],
                  ["M", "38", "42", "10", "6"],
                  ["L", "40", "44", "12", "8"],
                  ["XL", "42", "46", "14", "10"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-arena">
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="py-3 pr-4 text-left font-normal">{cell}</th>
                      ) : (
                        <td key={i} className="py-3 pr-4">{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm">
            ¿Sigues con dudas? <Link href="/contacto" className="link-underline">Escríbenos</Link> y te ayudamos a elegir.
          </p>
        </section>
      </div>
    </>
  );
}
