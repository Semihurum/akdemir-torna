import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/constants";

export default function Services() {
  return (
    <section id="hizmetler" className="py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-2 sm:mb-3 block">
            Uzmanlık Alanlarımız
          </span>
          <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-on-surface leading-tight">
            Endüstriyel Üretim <br className="md:hidden" /> Çözümleri
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col"
            >
              <div className="h-36 sm:h-40 overflow-hidden relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 text-on-surface group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-[13px] lg:text-sm text-secondary leading-[1.6] mb-4 sm:mb-5 flex-grow">
                  {service.description}
                </p>
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="text-primary font-bold text-[12px] sm:text-[13px] tracking-widest uppercase flex items-center gap-1.5 group/link w-fit"
                >
                  Detayları Gör
                  <span className="material-symbols-outlined text-[15px] sm:text-[16px] group-hover/link:translate-x-1.5 transition-transform">
                    east
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
