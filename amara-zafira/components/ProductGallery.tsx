"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { productViews } from "@/data/site-images";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    const el = track.current;
    el?.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const alt = (i: number) => `${name}: ${productViews[i]?.label.toLowerCase() ?? `foto ${i + 1}`}`;

  return (
    <>
      {/* Móvil: carrusel deslizable */}
      <div className="relative md:hidden">
        <div
          ref={track}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          aria-roledescription="carrusel"
          aria-label={`Fotos de ${name}`}
        >
          {images.map((src, i) => (
            <div key={src} className="relative aspect-[3/4] w-full shrink-0 snap-center bg-crudo">
              <Image src={src} alt={alt(i)} fill priority={i === 0} sizes="100vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === index}
              className={`h-[3px] transition-all duration-300 ${i === index ? "w-6 bg-tinta" : "w-3 bg-tinta/30"}`}
            />
          ))}
        </div>
      </div>

      {/* Escritorio: rejilla a dos columnas, como en las fichas editoriales */}
      <div className="hidden grid-cols-2 gap-1 md:grid">
        {images.map((src, i) => (
          <div key={src} className="relative aspect-[3/4] bg-crudo">
            <Image
              src={src}
              alt={alt(i)}
              fill
              priority={i < 2}
              sizes="(min-width: 1280px) 33vw, 30vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
