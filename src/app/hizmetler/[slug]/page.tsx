import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24 min-h-[80vh]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8">
          <Link
            href="/#hizmetler"
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-semibold text-sm mb-8 group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Hizmetlere Dön
          </Link>

          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 md:p-12 shadow-sm border border-gray-100/50">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden shadow-lg shadow-black/5">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-[11px] mb-3 sm:mb-4 block">
                  Hizmet Detayı
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface leading-tight mb-6">
                  {service.title}
                </h1>
                <p className="text-lg sm:text-xl font-medium text-on-surface leading-relaxed mb-4">
                  {service.description}
                </p>
                {"content" in service && (
                  <div className="text-[15px] sm:text-base text-secondary leading-[1.8] mb-8 space-y-4">
                    <p>{service.content as string}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 mt-auto">
                  <Link
                    href="/#iletisim"
                    className="bg-primary text-white px-8 py-4 rounded-full font-bold text-[14px] uppercase tracking-widest hover:bg-primary-dark transition-all active:scale-95 shadow-xl shadow-primary/20 flex items-center gap-2"
                  >
                    Teklif İste
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
