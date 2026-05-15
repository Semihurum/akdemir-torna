import { FEATURES } from "@/constants";

export default function WhyUs() {
  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-20 technical-grid bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-4xl font-extrabold mb-2 sm:mb-3 text-on-surface">
            Neden Akdemirler?
          </h2>
          <p className="text-secondary opacity-70 font-medium text-[13px] sm:text-[14px]">
            Üretim standartlarımızı belirleyen temel ilkelerimiz
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="p-4 sm:p-5 bg-surface rounded-2xl border border-gray-100 hover:border-primary/50 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <span className="material-symbols-outlined text-primary text-[28px] sm:text-[32px] mb-3 sm:mb-4 block group-hover:scale-110 transition-transform">
                {feature.icon}
              </span>
              <h3 className="font-bold text-base sm:text-[18px] mb-1.5 sm:mb-2 text-on-surface">
                {feature.title}
              </h3>
              <p className="text-[12px] sm:text-[13px] text-secondary leading-[1.6]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
