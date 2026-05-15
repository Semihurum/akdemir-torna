"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.");
      } else {
        setError(data.error || "İşlem sırasında bir hata oluştu.");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyiniz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 sm:pt-32 pb-16 flex items-center justify-center bg-surface">
        <div className="w-full max-w-md px-4 sm:px-6">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-[48px] text-primary mb-4 block">
                lock_reset
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-2">
                Şifremi Unuttum
              </h1>
              <p className="text-[13px] text-secondary">
                Hesabınıza bağlı e-posta adresini girin, size güvenli bir sıfırlama bağlantısı gönderelim.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-[13px] p-4 rounded-xl mb-6 flex items-center gap-2 border border-red-100">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 text-green-700 text-[13px] p-4 rounded-xl mb-6 flex items-center gap-2 border border-green-200">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                {message}
              </div>
            )}

            {!message && (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1"
                  >
                    E-posta
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
                    placeholder="ornek@sirket.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 sm:h-14 bg-primary text-white rounded-xl font-bold text-[13px] sm:text-[14px] tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin">
                      progress_activity
                    </span>
                  ) : (
                    <>
                      Bağlantı Gönder
                      <span className="material-symbols-outlined text-[18px]">
                        send
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-8 text-center text-[13px] text-secondary">
              <Link
                href="/login"
                className="text-primary font-bold hover:underline flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Giriş sayfasına dön
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
