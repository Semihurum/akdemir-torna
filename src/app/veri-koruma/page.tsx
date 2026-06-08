import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { COMPANY } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veri Koruma Politikası (KVKK) | Akdemirler Tornacılık",
  description:
    "Akdemirler Tornacılık kişisel verilerin korunması kanunu (KVKK) kapsamında veri koruma ve gizlilik politikası.",
};

export default function DataProtectionPage() {
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
              Veri Koruma Politikası
            </h1>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-[11px] sm:text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">
                  verified_user
                </span>
                KVKK Uyumlu
              </span>
            </div>
            <p className="text-[13px] sm:text-[14px] text-secondary">
              6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında
              Aydınlatma Metni
            </p>
            <p className="text-[11px] sm:text-[12px] text-secondary/60 mt-1">
              Son güncelleme: 01 Haziran 2025
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-xl border border-gray-100">
            <div className="prose-custom space-y-8">
              {/* 1. Amaç */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    1
                  </span>
                  Amaç ve Kapsam
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin
                  Korunması Kanunu (&quot;KVKK&quot;) gereğince, {COMPANY.name}{" "}
                  (&quot;Veri Sorumlusu&quot;) olarak kişisel verilerinizin
                  hangi amaçlarla işleneceği, kimlere ve hangi amaçlarla
                  aktarılabileceği, veri toplama yöntemlerimiz ve hukuki
                  sebeplerimiz ile KVKK kapsamındaki haklarınız hakkında sizleri
                  bilgilendirmek amacıyla hazırlanmıştır.
                </p>
              </section>

              {/* 2. Toplanan Veriler */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    2
                  </span>
                  Toplanan Kişisel Veriler
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7 mb-3">
                  Web sitemiz üzerinden aşağıdaki kişisel veriler
                  toplanabilmektedir:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: "person",
                      title: "Kimlik Bilgileri",
                      desc: "Ad, soyad, firma unvanı",
                    },
                    {
                      icon: "mail",
                      title: "İletişim Bilgileri",
                      desc: "E-posta adresi, telefon numarası",
                    },
                    {
                      icon: "description",
                      title: "Proje Bilgileri",
                      desc: "Teknik çizimler, proje detayları",
                    },
                    {
                      icon: "devices",
                      title: "Teknik Veriler",
                      desc: "IP adresi, tarayıcı bilgisi, çerezler",
                    },
                    {
                      icon: "key",
                      title: "Hesap Bilgileri",
                      desc: "Kullanıcı adı, şifre (şifreli)",
                    },
                    {
                      icon: "history",
                      title: "İşlem Bilgileri",
                      desc: "Teklif geçmişi, oturum kayıtları",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 bg-surface rounded-xl p-3 border border-gray-50"
                    >
                      <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-[12px] sm:text-[13px] font-bold text-on-surface">
                          {item.title}
                        </p>
                        <p className="text-[11px] sm:text-[12px] text-secondary">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. İşleme Amaçları */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    3
                  </span>
                  Kişisel Verilerin İşlenme Amaçları
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7 mb-3">
                  Toplanan kişisel verileriniz aşağıdaki amaçlarla
                  işlenmektedir:
                </p>
                <ul className="space-y-2.5 ml-4">
                  {[
                    "Teklif taleplerinizin değerlendirilmesi ve fiyatlandırma yapılması",
                    "Üretim süreçlerinin yönetimi ve takibi",
                    "Müşteri ilişkilerinin yürütülmesi ve iletişim sağlanması",
                    "Yasal yükümlülüklerin yerine getirilmesi",
                    "Hizmet kalitesinin iyileştirilmesi ve site güvenliğinin sağlanması",
                    "Kullanıcı hesaplarının oluşturulması ve yönetilmesi",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-secondary leading-7"
                    >
                      <span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* 4. Hukuki Sebepler */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    4
                  </span>
                  Hukuki Sebepler
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  Kişisel verileriniz; KVKK&apos;nın 5. ve 6. maddesinde
                  belirtilen açık rıza, sözleşmenin ifası, hukuki yükümlülük,
                  meşru menfaat gibi hukuki sebeplere dayalı olarak
                  işlenmektedir. Teklif formu doldurulması, üyelik oluşturulması
                  veya iletişim kurulması halinde açık rızanız alınmış
                  sayılmaktadır.
                </p>
              </section>

              {/* 5. Veri Aktarımı */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    5
                  </span>
                  Kişisel Verilerin Aktarılması
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  Kişisel verileriniz, KVKK&apos;nın 8. ve 9. maddelerinde
                  belirtilen koşullar çerçevesinde; yasal zorunluluklar
                  kapsamında yetkili kamu kurum ve kuruluşlarına, hizmet
                  süreçlerinin yürütülmesi amacıyla iş ortaklarımıza ve
                  hizmet aldığımız üçüncü taraflara (hosting, e-posta servisi
                  vb.) aktarılabilmektedir. Verileriniz yurt dışına
                  aktarılması halinde KVKK&apos;nın 9. maddesindeki güvenceler
                  sağlanır.
                </p>
              </section>

              {/* 6. Saklama Süresi */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    6
                  </span>
                  Verilerin Saklanma Süresi
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  Kişisel verileriniz, işleme amacının gerektirdiği süre
                  boyunca ve ilgili yasal düzenlemelerin öngördüğü zamanaşımı
                  süreleri kadar saklanmaktadır. Sürenin sona ermesi veya
                  işleme amacının ortadan kalkması halinde verileriniz
                  silinmekte, yok edilmekte veya anonim hale getirilmektedir.
                </p>
              </section>

              {/* 7. Çerezler */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    7
                  </span>
                  Çerez Politikası
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  Web sitemiz, kullanıcı deneyimini iyileştirmek ve site
                  performansını analiz etmek amacıyla çerezler
                  kullanmaktadır. Zorunlu çerezler sitenin düzgün çalışması
                  için gereklidir. Analitik ve tercih çerezleri ise sizin
                  onayınızla kullanılır. Tarayıcı ayarlarınızdan çerezleri
                  kontrol edebilir veya silebilirsiniz; ancak bu durumda
                  sitenin bazı özellikleri düzgün çalışmayabilir.
                </p>
              </section>

              {/* 8. Güvenlik */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    8
                  </span>
                  Veri Güvenliği
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7">
                  {COMPANY.name}, kişisel verilerinizin hukuka aykırı olarak
                  işlenmesini, erişilmesini önlemek ve muhafazasını sağlamak
                  amacıyla uygun güvenlik düzeyini temin etmeye yönelik gerekli
                  her türlü teknik ve idari tedbirleri almaktadır. Verileriniz
                  SSL şifreleme, güvenlik duvarları ve erişim kontrolleri ile
                  korunmaktadır.
                </p>
              </section>

              {/* 9. Haklar */}
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    9
                  </span>
                  KVKK Kapsamındaki Haklarınız
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7 mb-3">
                  KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara
                  sahipsiniz:
                </p>
                <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-gray-100">
                  <ul className="space-y-2.5">
                    {[
                      "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
                      "Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme",
                      "Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme",
                      "Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme",
                      "Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme",
                      "KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme",
                      "İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
                      "Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
                    ].map((right) => (
                      <li
                        key={right}
                        className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-secondary leading-7"
                      >
                        <span className="material-symbols-outlined text-primary text-[16px] mt-1 shrink-0">
                          gavel
                        </span>
                        {right}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 10. Başvuru */}
              <section className="bg-surface rounded-2xl p-5 sm:p-6 border border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    contact_support
                  </span>
                  Başvuru ve İletişim
                </h2>
                <p className="text-[13px] sm:text-[14px] text-secondary leading-7 mb-3">
                  Yukarıda sayılan haklarınızı kullanmak için aşağıdaki
                  kanallardan bizimle iletişime geçebilirsiniz. Başvurunuz en
                  geç 30 gün içinde ücretsiz olarak sonuçlandırılacaktır.
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
