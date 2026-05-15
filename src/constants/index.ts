/**
 * Site genelinde kullanılan sabit değerler.
 * WhatsApp numarası .env.local'den okunur,
 * diğer sabitler burada merkezi olarak yönetilir.
 */

// ─── Firma Bilgileri ──────────────────────────────────────────────
export const COMPANY = {
  name: "Akdemirler Tornacılık",
  shortName: "AKDEMİRLER",
  phone: "+90 (212) 555 12 34",
  email: "bilgi@akdemirler.com",
  address: "Başakşehir, İstanbul",
  foundedYear: 2000,
  experienceYears: "25+",
} as const;

// ─── Navigasyon Linkleri ──────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetler", href: "/#hizmetler" },
  { label: "Hakkımızda", href: "/#hakkimizda" },
  { label: "Üretim Parkuru", href: "/#galeri" },
  { label: "SSS", href: "/#sss" },
  { label: "İletişim", href: "/#iletisim" },
] as const;

// ─── Hizmetler ────────────────────────────────────────────────────
export const SERVICES = [
  {
    title: "Torna İşleri",
    slug: "torna-isleri",
    description:
      "Yüksek hassasiyetli CNC ve manuel torna sistemleri ile mil, flanş ve özel parça üretimi gerçekleştiriyoruz.",
    content: "Akdemirler Tornacılık olarak, en son teknolojiye sahip CNC ve manuel torna parkurumuzla, endüstriyel standartlara uygun yüksek hassasiyetli parçalar üretiyoruz. Mil, flanş, pim, somun ve dişli gibi silindirik ve karmaşık yapıdaki metal parçaların işlenmesinde uzmanız. İster tekil prototip üretimi olsun ister yüksek hacimli seri üretim, alanında deneyimli mühendis ve operatör kadromuzla projelerinizi en kısa sürede ve sıfır hata toleransıyla teslim ediyoruz. Çelik, paslanmaz çelik, alüminyum, pirinç ve plastik türevi malzemeleri kusursuz bir yüzey kalitesiyle işliyor, projenize değer katıyoruz.",
    image: "/service-torna.png",
  },
  {
    title: "Kalıp ve Parça İşleme",
    slug: "kalip-ve-parca-isleme",
    description:
      "Karmaşık geometrili kalıplar ve özel makine parçaları için profesyonel işleme çözümleri sunuyoruz.",
    content: "Makine yedek parçaları, otomotiv, havacılık ve genel endüstri uygulamaları için karmaşık geometrilere sahip kalıpların ve özel parçaların işlenmesi, yüksek mühendislik ve hassasiyet gerektirir. Üretim parkurumuzda yer alan gelişmiş işleme merkezlerimizle, en zorlu toleranslara sahip kalıp ve yedek parçaların imalatını üstleniyoruz. Teknik resimlerinize sadık kalarak, kullanılacak spesifik materyale en uygun kesici takımlar ve işleme stratejileri ile parça üretimini gerçekleştiriyoruz. Aşınmış veya kırılmış makine parçalarınızın numunelerinden tersine mühendislik yaparak birebir üretimini de sağlıyor, üretim hatlarınızın duraksamadan çalışmasına destek oluyoruz.",
    image: "/service-kalip.png",
  },
  {
    title: "Hassas Ölçüm",
    slug: "hassas-olcum",
    description:
      "Mikron seviyesinde hassas ölçüm cihazlarımızla üretim kalitesini garanti altına alıyoruz.",
    content: "Kaliteli üretimin temel şartı, parçaların doğru ve eksiksiz şekilde ölçümlenmesidir. Ürettiğimiz her parçanın, müşterilerimizin belirlediği teknik spesifikasyonlara mikron seviyesinde uyumlu olduğundan emin olmak için kalite kontrol süreçlerimizde en güncel ekipmanları kullanıyoruz. Üretim sürecinin her aşamasında gerçekleştirdiğimiz ara kontroller ve nihai ürün kalite testleri ile hataya yer bırakmıyoruz. Mikrometreler, özel kumpaslar ve diğer hassas ölçüm cihazlarımızla her zaman 'ilk seferde doğru' prensibiyle hareket ediyoruz.",
    image: "/service-olcum.png",
  },
  {
    title: "Özel Üretim",
    slug: "ozel-uretim",
    description:
      "Prototipten seri üretime kadar her ölçekte özel parça ve komponent üretimi yapıyoruz.",
    content: "Endüstriyel sektördeki her proje kendi içerisinde benzersiz ihtiyaçlar barındırır. Standart parçaların yetersiz kaldığı durumlarda veya yenilikçi Ar-Ge projelerinizde, size özel spesifikasyonlarla tamamen size ait olan üretim çözümleri sunuyoruz. İster sadece bir fikriniz olsun, ister detaylı teknik çiziminiz; fikirden nihai ürüne kadar olan tüm süreçte tecrübemizle destek sağlıyoruz. Esnek üretim yeteneğimiz sayesinde, malzeme türü fark etmeksizin en yenilikçi prototiplerinizi üretiyor, test süreçleriniz için parçalarınızı hazır hale getiriyor ve onay sonrası büyük ölçekli seri üretimlere hızlıca geçiş yapabiliyoruz.",
    image: "/service-ozel.png",
  },
] as const;

// ─── Neden Biz Özellikleri ────────────────────────────────────────
export const FEATURES = [
  {
    icon: "precision_manufacturing",
    title: "Hassas İşçilik",
    description:
      "Milimetrenin yüzde biri oranında toleranslarla hatasız üretim sağlıyoruz.",
  },
  {
    icon: "schedule",
    title: "Zamanında Teslim",
    description:
      "Söz verdiğimiz tarihte, üretim bandınızın aksamaması için teslimat yapıyoruz.",
  },
  {
    icon: "verified_user",
    title: "Kalite Güvencesi",
    description:
      "Tüm parçalarımız sevkiyat öncesi titiz kalite kontrol süreçlerinden geçer.",
  },
  {
    icon: "handshake",
    title: "Şeffaf İletişim",
    description:
      "Projenin her aşamasında müşterilerimize detaylı teknik raporlama sunarız.",
  },
] as const;

// ─── Üretim Adımları ──────────────────────────────────────────────
export const ROADMAP_STEPS = [
  {
    number: "01",
    title: "Analiz & Teknik Çizim",
    description:
      "Teknik resimleriniz incelenir, malzeme ve işçilik maliyetleri hesaplanarak en uygun teklif sunulur.",
  },
  {
    number: "02",
    title: "Planlama",
    description:
      "Üretim süreci simüle edilir, en hızlı ve verimli işleme yöntemleri belirlenir.",
  },
  {
    number: "03",
    title: "Üretim",
    description:
      "CNC parkurumuzda, uzman operatörlerimiz tarafından parçalarınız milimetrik hassasiyetle işlenir.",
  },
  {
    number: "04",
    title: "Kalite & Teslimat",
    description:
      "Üretilen parçalar ölçülür, raporlanır ve koruyucu ambalajlarla tarafınıza sevk edilir.",
  },
] as const;

// ─── Galeri ───────────────────────────────────────────────────────
export const GALLERY_ITEMS = [
  { src: "/gallery-1.png", alt: "CNC Torna Atölyesi", span: "col-span-1" },
  { src: "/gallery-2.png", alt: "Metal İşleme Kıvılcımları", span: "col-span-1 md:col-span-2" },
  { src: "/gallery-3.png", alt: "Hassas İşlenmiş Parçalar", span: "col-span-1 md:col-span-2" },
  { src: "/gallery-4.png", alt: "CNC Freze Makinesi", span: "col-span-1" },
] as const;

// ─── SSS ──────────────────────────────────────────────────────────
export const FAQ_DATA = [
  {
    question: "Hangi torna işlemlerini yapıyorsunuz?",
    answer:
      "Yüksek hassasiyetli CNC ve manuel torna sistemlerimizle mil, flanş, somun ve özel aparat işleme, diş açma, delik delme ve raybalama gibi çok çeşitli tornalama işlemlerini gerçekleştiriyoruz.",
  },
  {
    question: "Özel ölçüye göre parça üretimi yapıyor musunuz?",
    answer:
      "Evet, tamamen müşterilerimizin spesifikasyonlarına ve teknik çizimlerine uygun olarak prototipten seri üretime kadar özel ölçülü parça imalatı yapıyoruz.",
  },
  {
    question: "Teklif almak için hangi bilgileri göndermeliyim?",
    answer:
      "Doğru bir teklif sunabilmemiz için; üretilecek parçanın teknik çizimi (2D veya 3D), istenen malzeme cinsi, üretim adedi ve varsa özel tolerans veya yüzey işlemi gereksinimlerinizi bize iletmeniz yeterlidir.",
  },
  {
    question: "Numune parçaya göre üretim yapılabilir mi?",
    answer:
      "Evet, teknik çiziminiz olmasa dahi, elinizdeki numune parçayı bize ulaştırdığınızda tersine mühendislik yöntemleriyle ölçülendirip birebir üretimini yapabiliriz.",
  },
  {
    question: "Teslim süresi nasıl belirlenir?",
    answer:
      "Teslim süremiz, parçanın karmaşıklığına, talep edilen üretim adedine ve hammadde temin durumuna göre değişiklik gösterir. Standart işlemler için 3-7 iş günü, daha kapsamlı projeler için ise 7-15 iş günü öngörüyoruz.",
  },
  {
    question: "WhatsApp üzerinden iletişim kurulabilir mi?",
    answer:
      "Kesinlikle. Hızlı teklif almak, teknik detayları görüşmek veya fotoğraf göndermek için sayfamızdaki WhatsApp butonuna tıklayarak uzman ekibimizle anında iletişime geçebilirsiniz.",
  },
] as const;

// ─── Hizmet Türleri (Form Select) ────────────────────────────────
export const SERVICE_TYPES = [
  "Torna İşleri",
  "Kalıp ve Parça İşleme",
  "Hassas Ölçüm",
  "Özel Üretim",
  "Diğer",
] as const;
