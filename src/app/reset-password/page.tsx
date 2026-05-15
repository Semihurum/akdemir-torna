"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.passwordConfirm) {
      setError("Şifreler uyuşmuyor.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: formData.password }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login?reset=success");
        }, 3000);
      } else {
        setError(data.error || "Şifre sıfırlanırken bir hata oluştu.");
      }
    } catch (err) {
      setError("Bir bağlantı hatası oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
          Geçersiz veya eksik sıfırlama bağlantısı.
        </div>
        <Link href="/forgot-password" className="text-primary font-bold hover:underline">
          Yeni bağlantı iste
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <span className="material-symbols-outlined text-[48px] text-primary mb-4 block">
          password
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-2">
          Yeni Şifre Belirle
        </h1>
        <p className="text-[13px] text-secondary">
          Lütfen hesabınız için yeni ve güvenli bir şifre girin.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-[13px] p-4 rounded-xl mb-6 flex items-center gap-2 border border-red-100">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-700 text-[13px] p-4 rounded-xl mb-6 flex items-center gap-2 border border-green-200">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          Şifreniz başarıyla sıfırlandı! Giriş sayfasına yönlendiriliyorsunuz...
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1"
            >
              Yeni Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1"
            >
              Yeni Şifre Tekrar
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
              placeholder="••••••••"
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
                Şifreyi Güncelle
                <span className="material-symbols-outlined text-[18px]">
                  save
                </span>
              </>
            )}
          </button>
        </form>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 sm:pt-32 pb-16 flex items-center justify-center bg-surface">
        <div className="w-full max-w-md px-4 sm:px-6">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-xl border border-gray-100">
            <Suspense fallback={<div className="flex justify-center"><span className="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span></div>}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
