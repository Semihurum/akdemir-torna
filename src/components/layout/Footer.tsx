import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-white pt-10 sm:pt-14 md:pt-16 lg:pt-20 pb-8 md:pb-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
        {/* Logo & Description */}
        <div className="sm:col-span-2 lg:col-span-1 -ml-4 sm:-ml-6 md:-ml-12 lg:-ml-16">
          <Image
            src="/logo-full.png"
            alt="Akdemirler Tornacılık Logo"
            width={380}
            height={126}
            className="w-auto h-[50px] sm:h-[60px] lg:h-[70px] mb-6 sm:mb-8 brightness-0 invert origin-left object-contain scale-[1.35] sm:scale-[1.55] lg:scale-[1.85]"
          />
          <p className="text-gray-400 text-[12px] sm:text-[13px] leading-6 mb-4 sm:mb-5">
            {COMPANY.experienceYears} yıllık sektör tecrübemizle, endüstriyel çözüm ortağınız olmaya
            devam ediyoruz.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="w-8 h-8 sm:w-9 sm:h-9 border border-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
            >
              <span className="material-symbols-outlined text-[14px] sm:text-[15px]">share</span>
            </Link>
          </div>
        </div>

        {/* Hızlı Menü */}
        <div>
          <h4 className="font-bold text-[12px] sm:text-[13px] uppercase tracking-widest mb-4 sm:mb-5 text-primary">
            Hızlı Menü
          </h4>
          <ul className="space-y-2.5 sm:space-y-3 text-[12px] sm:text-[13px] text-gray-400 font-medium">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link
                href="/#hizmetler"
                className="hover:text-white transition-colors"
              >
                Hizmetler
              </Link>
            </li>
            <li>
              <Link
                href="/#hakkimizda"
                className="hover:text-white transition-colors"
              >
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link
                href="/#iletisim"
                className="hover:text-white transition-colors"
              >
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        {/* Uzmanlıklar */}
        <div>
          <h4 className="font-bold text-[12px] sm:text-[13px] uppercase tracking-widest mb-4 sm:mb-5 text-primary">
            Hizmetler
          </h4>
          <ul className="space-y-2.5 sm:space-y-3 text-[12px] sm:text-[13px] text-gray-400 font-medium">
            <li>CNC Torna &amp; Freze</li>
            <li>Kalıp Tasarım</li>
            <li>Hassas İşleme</li>
            <li>Prototip Üretimi</li>
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h4 className="font-bold text-[12px] sm:text-[13px] uppercase tracking-widest mb-4 sm:mb-5 text-primary">
            Bize Ulaşın
          </h4>
          <ul className="space-y-2.5 sm:space-y-3 text-[12px] sm:text-[13px] text-gray-400 font-medium">
            <li className="flex items-center gap-2.5 sm:gap-3">
              <span className="material-symbols-outlined text-primary text-[14px] sm:text-[16px]">
                call
              </span>
              {COMPANY.phone}
            </li>
            <li className="flex items-center gap-2.5 sm:gap-3">
              <span className="material-symbols-outlined text-primary text-[14px] sm:text-[16px]">
                mail
              </span>
              {COMPANY.email}
            </li>
            <li className="flex items-start gap-2.5 sm:gap-3">
              <span className="material-symbols-outlined text-primary text-[14px] sm:text-[16px] mt-0.5">
                location_on
              </span>
              {COMPANY.address}
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8 pt-5 sm:pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold opacity-40">
        <p className="text-center md:text-left">© 2025 {COMPANY.name}. Tüm Hakları Saklıdır.</p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          <Link href="#" className="hover:text-white transition-colors">
            Gizlilik
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            KVKK
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Çerezler
          </Link>
        </div>
      </div>
    </footer>
  );
}
