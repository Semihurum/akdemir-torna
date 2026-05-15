"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    projectDescription: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      files.forEach((file) => formDataToSend.append("files", file));
      formDataToSend.append("source", "quote_form");

      const res = await fetch("/api/quote", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          projectDescription: "",
        });
        setFiles([]);
      } else {
        setError(data.error || "Bir hata oluştu.");
      }
    } catch (err) {
      setError("Bağlantı hatası. Lütfen tekrar deneyiniz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 sm:pt-32 pb-16 bg-surface">
        <div className="max-w-[800px] mx-auto px-4 sm:px-5 md:px-8">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-[48px] text-primary mb-4 block">
                request_quote
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-2">
                Teklif Talebi
              </h1>
              <p className="text-[13px] sm:text-[15px] text-secondary">
                Projenizin detaylarını bizimle paylaşın, uzman ekibimiz en kısa sürede size özel bir fiyat teklifi sunsun.
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
                Teklif talebiniz başarıyla alındı! En kısa sürede iletişime geçeceğiz.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">
                    Ad Soyad
                  </label>
                  <input
                    id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} required
                    className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">
                    Firma Adı (Opsiyonel)
                  </label>
                  <input
                    id="companyName" name="companyName" type="text" value={formData.companyName} onChange={handleChange}
                    className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">
                    E-posta
                  </label>
                  <input
                    id="email" name="email" type="email" value={formData.email} onChange={handleChange} required
                    className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">
                    Telefon
                  </label>
                  <input
                    id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required
                    className="w-full h-12 sm:h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectDescription" className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">
                  Proje / İhtiyaç Detayları
                </label>
                <textarea
                  id="projectDescription" name="projectDescription" value={formData.projectDescription} onChange={handleChange} required
                  className="w-full min-h-[120px] bg-surface/50 border border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:bg-white outline-none text-[13px] sm:text-[14px] transition-all resize-y"
                  placeholder="Üretilecek parçaların sayısı, malzemesi, teknik resim varlığı vb. detayları yazınız."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1 ml-1">
                  <span className="material-symbols-outlined text-[16px] align-middle mr-1">attach_file</span> Dosya Ekle (Teknik Resim vb.)
                </label>
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  className="w-full h-14 bg-surface/50 border border-gray-200 rounded-xl px-4 py-2 text-[13px] text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[12px] file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
                />
                <p className="text-[10px] text-gray-400 ml-1">Maksimum 5MB. Desteklenen formatlar: JPG, PNG, WEBP, PDF, DOC, DOCX</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 sm:h-14 bg-primary text-white rounded-xl font-bold text-[13px] sm:text-[14px] tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <>
                    Teklif İste
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
