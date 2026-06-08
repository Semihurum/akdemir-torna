import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { COMPANY } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hüküm ve Koşullar | Akdemirler Tornacılık",
  description:
    "Akdemirler Tornacılık web sitesi kullanım hüküm ve koşulları. Siteyi kullanarak bu şartları kabul etmiş sayılırsınız.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 sm:pt-32 pb-16 bg-surface">
        <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-8">
          {/* Logo & Page Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo-full.png"
                alt="Akdemirler Tornacılık Logo"
                width={380}
                height={126}
                className="w-auto h-14 sm:h-16 lg:h-20 object-contain mx-auto"
                priority
              />
            </Link>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface mb-3">
              Hüküm ve Koşullar
            </h1>
            <p className="text-[13px] sm:text-[14px] text-secondary">
              Son güncelleme: 01 Haziran 2025
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-xl border border-gray-100">
            <div className="prose-custom space-y-8">
              {/* 1. Genel */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    1
                  </span>
                  Genel Bilgiler
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  Bu web sitesi, {COMPANY.name} (&quot;Şirket&quot;) tarafından
                  işletilmektedir. Siteyi kullanarak aşağıdaki hüküm ve
                  koşulları kabul etmiş sayılırsınız. Bu koşulları kabul
                  etmiyorsanız, lütfen siteyi kullanmayınız. Şirket, bu
                  koşulları herhangi bir zamanda önceden haber vermeksizin
                  güncelleme hakkını saklı tutar.
                </p>
              </section>

              {/* 2. Hizmet Tanımı */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    2
                  </span>
                  Hizmet Tanımı
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  {COMPANY.name}, CNC torna, kalıp işleme, hassas ölçüm ve özel
                  üretim alanlarında hizmet vermektedir. Web sitemiz üzerinden
                  sunulan bilgiler genel bilgilendirme amaçlıdır ve herhangi bir
                  sözleşme teklifi niteliği taşımaz. Nihai fiyatlar ve üretim
                  koşulları, müşterilerimizle birebir yapılacak görüşmeler
                  neticesinde belirlenir.
                </p>
              </section>

              {/* 3. Fikri Mülkiyet */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    3
                  </span>
                  Fikri Mülkiyet Hakları
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  Bu sitedeki tüm içerikler (metinler, görseller, logolar,
                  grafikler, tasarımlar) {COMPANY.name}&apos;nin mülkiyetindedir
                  ve Türkiye Cumhuriyeti fikri mülkiyet yasaları kapsamında
                  korunmaktadır. İçeriklerin izinsiz kopyalanması,
                  çoğaltılması, dağıtılması veya herhangi bir ticari amaçla
                  kullanılması kesinlikle yasaktır.
                </p>
              </section>

              {/* 4. Kullanıcı Sorumlulukları */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    4
                  </span>
                  Kullanıcı Sorumlulukları
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7 mb-3">
                  Siteyi kullanırken aşağıdaki kurallara uymanız gerekmektedir:
                </p>
                <ul className="space-y-2.5 ml-4">
                  <li className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-secondary leading-7">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">
                      check_circle
                    </span>
                    Siteye yüklenen dosya ve bilgilerin doğruluğundan kullanıcı
                    sorumludur.
                  </li>
                  <li className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-secondary leading-7">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">
                      check_circle
                    </span>
                    Teklif formları aracılığıyla gönderilen teknik çizim ve
                    dokümanlar gizlilik kapsamında değerlendirilir.
                  </li>
                  <li className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-secondary leading-7">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">
                      check_circle
                    </span>
                    Kötü niyetli kullanım, yetkisiz erişim girişimleri veya
                    zararlı yazılım yükleme girişimleri yasaktır.
                  </li>
                  <li className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-secondary leading-7">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">
                      check_circle
                    </span>
                    Hesap bilgilerinizin güvenliği sizin sorumluluğunuzdadır.
                  </li>
                </ul>
              </section>

              {/* 5. Teklif ve Sipariş */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    5
                  </span>
                  Teklif ve Sipariş Süreci
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  Site üzerinden gönderilen teklif talepleri bağlayıcı nitelik
                  taşımaz. Teklif, şirketimizin resmi olarak yazılı onay
                  vermesiyle bağlayıcı hale gelir. Üretim sürecine başlanan
                  siparişlerde, müşteri ile mutabık kalınan koşullar
                  geçerlidir. Siparişin iptal edilmesi durumunda, üretim
                  aşamasına göre iade koşulları belirlenir.
                </p>
              </section>

              {/* 6. Sorumluluk Sınırlaması */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    6
                  </span>
                  Sorumluluk Sınırlaması
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  {COMPANY.name}, sitede yer alan bilgilerin doğruluğu konusunda
                  azami özeni göstermekle birlikte, herhangi bir hata veya
                  eksiklikten dolayı sorumluluk kabul etmez. Site üzerinden
                  üçüncü taraf web sitelerine verilen bağlantılardan doğacak
                  herhangi bir zarardan {COMPANY.name} sorumlu tutulamaz.
                </p>
              </section>

              {/* 7. Uygulanacak Hukuk */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    7
                  </span>
                  Uygulanacak Hukuk ve Yetkili Mahkeme
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  Bu hüküm ve koşullar, Türkiye Cumhuriyeti kanunlarına tâbidir.
                  Herhangi bir uyuşmazlık durumunda İstanbul Mahkemeleri ve İcra
                  Daireleri yetkilidir.
                </p>
              </section>

              {/* 8. İletişim */}
              <section className="bg-surface rounded-2xl p-5 sm:p-6 border border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    contact_support
                  </span>
                  İletişim
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7 mb-3">
                  Bu hüküm ve koşullarla ilgili sorularınız için bizimle
                  iletişime geçebilirsiniz:
                </p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-[13px] sm:text-[14px] text-secondary">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      mail
                    </span>
                    {COMPANY.email}
                  </p>
                  <p className="flex items-center gap-2 text-[13px] sm:text-[14px] text-secondary">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      call
                    </span>
                    {COMPANY.phone}
                  </p>
                  <p className="flex items-center gap-2 text-[13px] sm:text-[14px] text-secondary">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      location_on
                    </span>
                    {COMPANY.address}
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] font-bold text-secondary hover:text-primary transition-colors uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
