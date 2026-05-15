import { ROADMAP_STEPS } from "@/constants";

export default function Roadmap() {
  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-20 bg-inverse-surface text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8">
        <div className="mb-8 sm:mb-10 md:mb-14">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] sm:text-[11px] mb-2 sm:mb-3 block">
            İş Akışımız
          </span>
          <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-4xl font-extrabold leading-tight">
            Üretim Yol Haritası
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-white/10" />

          {ROADMAP_STEPS.map((step) => (
            <div key={step.number} className="relative group">
              <div className="text-[42px] sm:text-5xl md:text-6xl font-black text-white/5 group-hover:text-primary/20 transition-colors duration-500 leading-none mb-2.5 sm:mb-3 md:mb-4">
                {step.number}
              </div>
              <h4 className="text-base sm:text-[18px] font-bold text-primary mb-1.5 sm:mb-2">
                {step.title}
              </h4>
              <p className="text-[12px] sm:text-[13px] text-gray-400 leading-[1.6]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
