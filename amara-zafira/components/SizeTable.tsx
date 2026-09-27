export const sizeRows = [
  { size: "XS", es: "34", bust: "80–84", waist: "62–66", hip: "88–92" },
  { size: "S", es: "36", bust: "84–88", waist: "66–70", hip: "92–96" },
  { size: "M", es: "38", bust: "88–92", waist: "70–74", hip: "96–100" },
  { size: "L", es: "40", bust: "92–98", waist: "74–80", hip: "100–106" },
  { size: "XL", es: "42", bust: "98–104", waist: "80–86", hip: "106–112" },
];

export default function SizeTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-sm tabular-nums">
        <caption className="sr-only">Medidas en centímetros por talla</caption>
        <thead>
          <tr className="border-b border-tinta text-left">
            <th scope="col" className="eyebrow py-3 pr-4 font-normal">Talla</th>
            <th scope="col" className="eyebrow py-3 pr-4 font-normal">España</th>
            <th scope="col" className="eyebrow py-3 pr-4 font-normal">Pecho</th>
            <th scope="col" className="eyebrow py-3 pr-4 font-normal">Cintura</th>
            <th scope="col" className="eyebrow py-3 font-normal">Cadera</th>
          </tr>
        </thead>
        <tbody>
          {sizeRows.map((r) => (
            <tr key={r.size} className="border-b border-arena">
              <th scope="row" className="py-3 pr-4 text-left font-normal">{r.size}</th>
              <td className="py-3 pr-4">{r.es}</td>
              <td className="py-3 pr-4">{r.bust}</td>
              <td className="py-3 pr-4">{r.waist}</td>
              <td className="py-3">{r.hip}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-topo">Medidas del cuerpo en centímetros.</p>
    </div>
  );
}

export function HowToMeasure() {
  return (
    <dl className="grid gap-5 text-sm sm:grid-cols-3">
      <div>
        <dt className="eyebrow mb-1">Pecho</dt>
        <dd className="text-topo">Mide el contorno por la parte más prominente, con la cinta horizontal.</dd>
      </div>
      <div>
        <dt className="eyebrow mb-1">Cintura</dt>
        <dd className="text-topo">Mide la parte más estrecha del torso, por encima del ombligo.</dd>
      </div>
      <div>
        <dt className="eyebrow mb-1">Cadera</dt>
        <dd className="text-topo">Mide la parte más ancha, con los pies juntos.</dd>
      </div>
    </dl>
  );
}
