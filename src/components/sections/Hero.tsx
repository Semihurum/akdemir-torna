import Image from "next/image";
import Link from "next/link";
import { contentManager } from "@/features/content/content.manager";

export default async function Hero() {
  const content = await contentManager.getContent();

  return (
    <section className="bg-inverse-surface">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8 flex flex-col lg:flex-row items-center pt-20 pb-10 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-28 gap-8 lg:gap-14">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] sm:text-[11px] mb-3 sm:mb-4 md:mb-5 block">
            {content.heroSubtitle}
          </span>
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.15] md:leading-[1.1] mb-5 md:mb-7 whitespace-pre-wrap">
            {content.heroTitle}
          </h1>
          <p className="text-gray-400 text-[13px] sm:text-sm md:text-[15px] mb-6 sm:mb-8 md:mb-10 leading-6 sm:leading-7 font-light max-w-xl">
            {content.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="#hizmetler"
              className="bg-primary text-white text-center flex items-center justify-center px-5 h-11 sm:h-12 lg:h-11 rounded-xl font-bold text-[13px] sm:text-sm tracking-widest uppercase hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 w-full sm:w-auto"
            >
              Hizmetleri İncele
            </Link>
            <Link
              href="#iletisim"
              className="border border-white/20 text-white text-center flex items-center justify-center px-5 h-11 sm:h-12 lg:h-11 rounded-xl font-bold text-[13px] sm:text-sm tracking-widest uppercase hover:bg-white hover:text-inverse-surface transition-all active:scale-95 w-full sm:w-auto"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-1/2 relative h-[240px] sm:h-[350px] lg:h-[400px] xl:h-[480px] rounded-[20px] sm:rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/hero.png"
            alt="CNC Torna ve Endüstriyel Metal İşleme"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
}
