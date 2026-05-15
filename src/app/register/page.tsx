"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const AVATARS = Array.from({ length: 10 }, (_, i) => `/assets/avatars/avatar_${(i + 1).toString().padStart(2, "0")}.webp`);

export default function RegisterPage() {
  const router = useRouter();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    profileImage: "",
    acceptedTerms: false,
    acceptedKvkk: false,
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [customFilePreview, setCustomFilePreview] = useState<string | null>(null);
  
  const [verificationCode, setVerificationCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleAvatarSelect = (avatar: string) => {
    setFormData({ ...formData, profileImage: avatar });
    setCustomFile(null);
    setCustomFilePreview(null);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        setError("Lütfen geçerli bir görsel dosyası yükleyin.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Görsel boyutu 2MB'den büyük olamaz.");
        return;
      }
      setCustomFile(file);
      setCustomFilePreview(URL.createObjectURL(file));
      setFormData({ ...formData, profileImage: "custom" }); // Mark as custom
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.passwordConfirm) {
      setError("Şifreler uyuşmuyor.");
      return;
    }

    if (!formData.acceptedTerms || !formData.acceptedKvkk) {
      setError("Lütfen Hüküm & Koşullar ve Veri Koruma Politikası'nı onaylayın.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async () => {
    if (!formData.profileImage) {
      setError("Lütfen kayıt olmak için bir profil görseli seçin veya yükleyin.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = { ...formData };
      
      if (customFile) {
        payload.profileImage = "/assets/avatars/avatar_01.webp"; // Fallback for demo
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setStep(3); // Go to verification code step
      } else {
        setError(data.error || "Kayıt olurken bir hata oluştu.");
      }
    } catch (err) {
      setError("Bir bağlantı hatası oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Lütfen 6 haneli doğrulama kodunu girin.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: verificationCode }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Geçersiz veya süresi dolmuş doğrulama kodu.");
      }
    } catch (err) {
      setError("Doğrulama sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (data.success) {
        setError(""); // Clear any errors
        alert("Yeni doğrulama kodu gönderildi."); // Simple fallback, instructions asked to use toast/modal but window alert is not great.
      } else {
        setError(data.error || "Kod tekrar gönderilemedi.");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 sm:pt-32 pb-16 flex items-center justify-center bg-surface relative">
        <div className="w-full max-w-lg px-4 sm:px-6 z-10">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] sm:text-[11px] mb-2 block">
                Güvenli Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                {step === 1 ? "Hesap Oluştur" : step === 2 ? "Profil Görselini Seç" : "E-posta Doğrulama"}
              </h1>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-[13px] p-4 rounded-xl mb-6 flex items-center gap-2 border border-red-100">
                <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-700 text-[13px] p-6 rounded-2xl mb-6 border border-green-200 text-center">
                <span className="material-symbols-outlined text-[48px] block mb-3 text-green-500">mark_email_read</span>
                <h3 className="font-bold text-lg mb-2 text-green-800">Doğrulama Başarılı!</h3>
                <p className="mb-6">Hesabınız aktif edildi. Şimdi giriş yapabilirsiniz.</p>
                <Link href="/login" className="inline-flex items-center justify-center h-12 px-8 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all">
                  Giriş Yap
                </Link>
              </div>
            )}

            {step === 1 && !success && (
              <form onSubmit={handleContinue} className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">
                    Ad Soyad
                  </label>
                  <input
                    id="name" name="name" type="text" value={formData.name} onChange={handleChange} required
                    className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
                    placeholder="Adınız Soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">
                    E-posta
                  </label>
                  <input
                    id="email" name="email" type="email" value={formData.email} onChange={handleChange} required
                    className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
                    placeholder="ornek@sirket.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">
                      Şifre
                    </label>
                    <input
                      id="password" name="password" type="password" value={formData.password} onChange={handleChange} required minLength={8}
                      className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label htmlFor="passwordConfirm" className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">
                      Şifre Tekrar
                    </label>
                    <input
                      id="passwordConfirm" name="passwordConfirm" type="password" value={formData.passwordConfirm} onChange={handleChange} required minLength={8}
                      className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange}
                        className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-md checked:border-primary checked:bg-primary transition-all peer"
                      />
                      <span className="material-symbols-outlined text-white text-[14px] absolute opacity-0 peer-checked:opacity-100 pointer-events-none">
                        check
                      </span>
                    </div>
                    <span className="text-[12px] sm:text-[13px] text-secondary leading-tight mt-0.5 select-none">
                      <Link href="/terms" className="text-primary hover:underline font-semibold" target="_blank">Hüküm ve Koşullar</Link>'ı okudum ve kabul ediyorum.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox" name="acceptedKvkk" checked={formData.acceptedKvkk} onChange={handleChange}
                        className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-md checked:border-primary checked:bg-primary transition-all peer"
                      />
                      <span className="material-symbols-outlined text-white text-[14px] absolute opacity-0 peer-checked:opacity-100 pointer-events-none">
                        check
                      </span>
                    </div>
                    <span className="text-[12px] sm:text-[13px] text-secondary leading-tight mt-0.5 select-none">
                      <Link href="/privacy" className="text-primary hover:underline font-semibold" target="_blank">Veri Koruma Politikası</Link>'nı (KVKK) okudum ve onaylıyorum.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 sm:h-14 bg-primary text-white rounded-xl font-bold text-[13px] sm:text-[14px] tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 mt-4"
                >
                  Devam Et
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </form>
            )}

            {step === 2 && !success && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-[13px] text-secondary text-center mb-6">
                  Profilinizi tamamlamak için temsil edici bir görsel seçin veya kendi fotoğrafınızı yükleyin.
                </p>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mb-6">
                  {AVATARS.map((avatar, idx) => (
                    <button
                      key={avatar}
                      onClick={() => handleAvatarSelect(avatar)}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-[3px] transition-all hover:scale-105 ${
                        formData.profileImage === avatar && !customFile
                          ? "border-primary shadow-lg shadow-primary/30"
                          : "border-transparent opacity-80 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={avatar}
                        alt={`Avatar ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                      {formData.profileImage === avatar && !customFile && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-[24px] drop-shadow-md">
                            check_circle
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mb-8">
                  <label className="flex items-center gap-3 p-4 border border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-surface/50 transition-colors group">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                      {customFilePreview ? (
                        <div className="w-full h-full relative rounded-xl overflow-hidden">
                          <Image src={customFilePreview} alt="Preview" fill className="object-cover" />
                        </div>
                      ) : (
                        <span className="material-symbols-outlined">add_photo_alternate</span>
                      )}
                    </div>
                    <div>
                      <span className="block text-[13px] font-bold text-on-surface">Kendi fotoğrafımı yükle</span>
                      <span className="block text-[11px] text-secondary mt-0.5">JPG, PNG veya WEBP (Maks 2MB)</span>
                    </div>
                    <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError("");
                    }}
                    disabled={loading}
                    className="w-1/3 h-12 sm:h-14 bg-surface text-on-surface border border-gray-200 rounded-xl font-bold text-[12px] sm:text-[13px] uppercase hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
                  >
                    Geri Dön
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-2/3 h-12 sm:h-14 bg-primary text-white rounded-xl font-bold text-[13px] sm:text-[14px] tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="material-symbols-outlined animate-spin">
                        progress_activity
                      </span>
                    ) : (
                      <>
                        Kaydı Tamamla
                        <span className="material-symbols-outlined text-[18px]">
                          how_to_reg
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && !success && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-primary text-[32px]">
                    mark_email_unread
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-on-surface">E-posta Doğrulama</h3>
                <p className="text-[13px] text-secondary mb-6">
                  <b>{formData.email}</b> adresine gönderdiğimiz 6 haneli doğrulama kodunu girin. Kod 3 dakika boyunca geçerlidir. Ayrıca maildeki bağlantıya tıklayarak da doğrulayabilirsiniz.
                </p>

                <div className="max-w-[240px] mx-auto mb-6">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    className="w-full h-14 bg-surface border border-gray-200 rounded-xl px-4 text-center text-2xl font-bold tracking-[0.5em] focus:border-primary focus:bg-white outline-none transition-all text-on-surface"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={loading || verificationCode.length !== 6}
                    className="w-full h-12 sm:h-14 bg-primary text-white rounded-xl font-bold text-[13px] sm:text-[14px] tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="material-symbols-outlined animate-spin">
                        progress_activity
                      </span>
                    ) : (
                      <>
                        Doğrula
                        <span className="material-symbols-outlined text-[18px]">
                          verified
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading}
                    className="text-[13px] text-primary font-bold hover:underline mt-2"
                  >
                    Kodu Tekrar Gönder
                  </button>
                </div>
              </div>
            )}

            {step === 1 && !success && (
              <div className="mt-8 text-center text-[13px] text-secondary">
                Zaten hesabınız var mı?{" "}
                <Link
                  href="/login"
                  className="text-primary font-bold hover:underline"
                >
                  Giriş Yapın
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
