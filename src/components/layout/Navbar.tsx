"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NAV_LINKS, COMPANY } from "@/constants";

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        // Ignored
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const whatsappUrl = `https://wa.me/${COMPANY.phone.replace(/[^0-9]/g, "")}`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-gray-100"
          : "bg-white/90 backdrop-blur-lg border-transparent"
      }`}
    >
      <div className="w-full pl-2 sm:pl-4 pr-4 sm:pr-5 md:pr-8 lg:pr-12 xl:pr-16 h-16 sm:h-16 lg:h-[68px] flex items-center justify-between">
        <Link href="/" className="flex items-center group z-[60] shrink-0 mr-8 lg:mr-24 xl:mr-32">
          <Image
            src="/logo-full.png"
            alt="Akdemirler Tornacılık Logo"
            width={380}
            height={126}
            className="w-auto h-12 sm:h-14 lg:h-[60px] object-contain scale-[1.35] sm:scale-[1.55] lg:scale-[1.85] origin-left transition-transform duration-300 group-hover:scale-[1.4] sm:group-hover:scale-[1.6] lg:group-hover:scale-[1.9]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-secondary hover:text-primary transition-colors font-semibold text-[13px] uppercase tracking-wider relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/tekliflerim"
              className="text-secondary hover:text-primary transition-colors font-semibold text-[13px] uppercase tracking-wider relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
            >
              TEKLİFLERİM
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md font-bold text-[12px] uppercase tracking-wider hover:bg-red-100 transition-colors"
            >
              ADMIN
            </Link>
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/teklif-al"
            className="bg-primary text-white px-5 py-2.5 rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-primary-dark transition-all active:scale-95 shadow-md shadow-primary/20"
          >
            Teklif Al
          </Link>

          {!loadingUser && !user && (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-primary px-3 py-2 font-bold text-[12px] uppercase tracking-widest hover:text-primary-dark transition-all"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="border-2 border-primary text-primary px-4 py-2 rounded-full font-bold text-[12px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95"
              >
                Kayıt Ol
              </Link>
            </div>
          )}

          {!loadingUser && user && (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 border-2 border-gray-100 hover:border-primary transition-colors rounded-full p-1 pr-3"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 relative">
                  <Image src={user.profileImage || "/profiles/default-1.png"} alt="Profile" fill sizes="32px" className="object-cover" />
                </div>
                <span className="text-[12px] font-bold text-on-surface max-w-[100px] truncate">{user.name}</span>
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  expand_more
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link 
                    href="/profile" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-secondary hover:text-primary hover:bg-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    Profilim
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden relative z-[60] p-2 -mr-2 flex flex-col justify-center items-center gap-[5px]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menüyü Aç/Kapat"
        >
          <span
            className={`block w-6 h-[2px] bg-on-surface rounded-full transition-transform duration-300 origin-center ${
              isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-on-surface rounded-full transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-on-surface rounded-full transition-transform duration-300 origin-center ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-[80vw] max-w-sm bg-white z-[55] lg:hidden shadow-2xl flex flex-col pt-20 transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto px-6 py-6 pb-12">
          {user && (
            <div className="flex items-center gap-3 mb-6 p-4 bg-surface rounded-2xl border border-gray-100">
              <div className="w-12 h-12 rounded-full overflow-hidden relative bg-white border border-gray-200">
                 <Image src={user.profileImage || "/profiles/default-1.png"} alt="Profile" fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-on-surface">{user.name}</p>
                <p className="text-[11px] text-secondary truncate max-w-[150px]">{user.email}</p>
              </div>
            </div>
          )}

          <nav className="flex flex-col space-y-1 mb-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-on-surface hover:text-primary transition-colors font-semibold text-[15px] py-3 border-b border-gray-50 uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={handleLinkClick}
                className="text-red-600 font-bold text-[15px] py-3 border-b border-gray-50 uppercase tracking-wider flex items-center gap-2"
              >
                <span className="material-symbols-outlined">admin_panel_settings</span>
                Admin Panel
              </Link>
            )}
            {user && (
              <Link
                href="/tekliflerim"
                onClick={handleLinkClick}
                className="text-on-surface hover:text-primary transition-colors font-semibold text-[15px] py-3 border-b border-gray-50 uppercase tracking-wider"
              >
                TEKLİFLERİM
              </Link>
            )}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            {user && (
              <>
                <Link
                  href="/profile"
                  onClick={handleLinkClick}
                  className="w-full flex items-center justify-center gap-2 bg-surface text-on-surface px-5 py-3.5 rounded-xl font-bold text-[14px] transition-all hover:bg-gray-100 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  Profilim
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-5 py-3.5 rounded-xl font-bold text-[14px] transition-all hover:bg-red-100 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Çıkış Yap
                </button>
              </>
            )}
            
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25d366] text-white px-5 py-3.5 rounded-xl font-bold text-[14px] transition-all hover:brightness-110 active:scale-95 shadow-sm mt-4"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp'tan Yaz
            </a>
            
            <Link
              href="/teklif-al"
              onClick={handleLinkClick}
              className="w-full flex items-center justify-center gap-2 bg-inverse-surface text-white px-5 py-3.5 rounded-xl font-bold text-[14px] uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-sm mt-2"
            >
              Teklif Al
            </Link>

            {!user && !loadingUser && (
              <Link
                href="/register"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center border-2 border-primary text-primary px-4 py-3 rounded-xl font-bold text-[13px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 mt-2"
              >
                GİRİŞ / KAYIT OL
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
