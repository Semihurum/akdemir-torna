"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  const urlError = searchParams.get("error");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(urlError || "");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect to admin panel if user is admin, else maybe dashboard or home
        if (data.user.role === "admin") {
          router.push("/");
        } else {
          router.push("/");
        }
        router.refresh();
      } else {
        setError(data.error || "Giriş başarısız.");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyiniz.");
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
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] sm:text-[11px] mb-2 block">
                Akdemirler Tornacılık
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                Giriş Yap
              </h1>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-[13px] p-4 rounded-xl mb-6 flex items-center gap-2 border border-red-100">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            {verified === "true" && (
              <div className="bg-green-50 text-green-700 text-[13px] p-4 rounded-xl mb-6 flex items-center gap-2 border border-green-200">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                E-posta adresiniz başarıyla doğrulandı. Şimdi giriş yapabilirsiniz.
              </div>
            )}

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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
                  placeholder="ornek@sirket.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1"
                >
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between mt-2 mb-6">
                <Link
                  href="/forgot-password"
                  className="text-[12px] font-semibold text-primary hover:underline"
                >
                  Şifremi Unuttum
                </Link>
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
                    Giriş Yap
                    <span className="material-symbols-outlined text-[18px]">
                      login
                    </span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-[13px] text-secondary">
              Hesabınız yok mu?{" "}
              <Link
                href="/register"
                className="text-primary font-bold hover:underline"
              >
                Kayıt Olun
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center"><div className="animate-spin text-primary material-symbols-outlined">progress_activity</div></div>}>
      <LoginForm />
    </Suspense>
  );
}
