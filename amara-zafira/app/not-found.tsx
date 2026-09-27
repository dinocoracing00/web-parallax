import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow text-topo">Error 404</p>
      <h1 className="mt-4 font-serif text-4xl font-light md:text-6xl">Esta página no existe</h1>
      <p className="mt-4 max-w-md text-sm text-topo">
        Puede que el enlace esté mal escrito o que la prenda ya no esté disponible.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Ir al inicio</Link>
        <Link href="/coleccion/novedades" className="btn-outline">Ver novedades</Link>
      </div>
    </div>
  );
}
