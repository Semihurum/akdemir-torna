import Image from "next/image";
import { contentManager } from "@/features/content/content.manager";

export default async function About() {
  const content = await contentManager.getContent();

  return (
    <section id="hakkimizda" className="py-10 sm:py-14 md:py-16 lg:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Image Side */}
        <div className="relative order-2 lg:order-1 mt-4 lg:mt-0">
          <div className="relative h-[240px] sm:h-[350px] lg:h-[440px] w-full rounded-[20px] sm:rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/about.png"
              alt="Hassas Ölçüm ve Kalite Kontrol"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center">
            <p className="text-3xl sm:text-4xl lg:text-4xl font-black text-primary mb-0.5 sm:mb-1">25+</p>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-widest uppercase opacity-60 text-center">
              Yıllık Tecrübe
            </p>
          </div>
        </div>

        {/* Text Side */}
        <div className="order-1 lg:order-2">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-[11px] mb-2 sm:mb-3 block">
            Kurumsal Vizyon
          </span>
          <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-4xl font-extrabold mb-4 sm:mb-5 lg:mb-6 leading-tight text-on-surface whitespace-pre-wrap">
            {content.aboutTitle}
          </h2>
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <p className="text-[13px] sm:text-sm lg:text-base text-secondary leading-[1.6] whitespace-pre-wrap">
              {content.aboutDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] sm:text-[22px] mt-0.5">
                  check_circle
                </span>
                <div>
                  <h4 className="font-bold text-[13px] sm:text-[14px] lg:text-[15px] mb-1 text-on-surface">
                    Modern Parkur
                  </h4>
                  <p className="text-[12px] sm:text-[13px] text-secondary leading-normal">
                    En yeni CNC teknolojileri ile donatılmış üretim tesisi.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] sm:text-[22px] mt-0.5">
                  verified
                </span>
                <div>
                  <h4 className="font-bold text-[13px] sm:text-[14px] lg:text-[15px] mb-1 text-on-surface">
                    ISO Sertifikalı
                  </h4>
                  <p className="text-[12px] sm:text-[13px] text-secondary leading-normal">
                    Uluslararası kalite standartlarına uygun üretim.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] sm:text-[22px] mt-0.5">
                  groups
                </span>
                <div>
                  <h4 className="font-bold text-[13px] sm:text-[14px] lg:text-[15px] mb-1 text-on-surface">
                    Uzman Kadro
                  </h4>
                  <p className="text-[12px] sm:text-[13px] text-secondary leading-normal">
                    Alanında deneyimli mühendis ve teknisyenler.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] sm:text-[22px] mt-0.5">
                  workspace_premium
                </span>
                <div>
                  <h4 className="font-bold text-[13px] sm:text-[14px] lg:text-[15px] mb-1 text-on-surface">
                    Müşteri Odaklı
                  </h4>
                  <p className="text-[12px] sm:text-[13px] text-secondary leading-normal">
                    Her projede kişiye özel çözüm yaklaşımı.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
