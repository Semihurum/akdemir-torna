import Image from "next/image";
import { GALLERY_ITEMS } from "@/constants";

export default function Gallery() {
  return (
    <section id="galeri" className="py-10 sm:py-14 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 md:mb-14 gap-4">
          <div>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-[11px] mb-2 sm:mb-3 block">
              Portfolyo
            </span>
            <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-on-surface">
              Üretim Parkurumuz
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.alt}
              className={`${item.span} aspect-[4/3] md:aspect-auto md:h-56 lg:h-64 rounded-[20px] sm:rounded-2xl overflow-hidden group relative shadow-sm`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-bold text-[12px] sm:text-[13px] tracking-wider uppercase">
                  {item.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
