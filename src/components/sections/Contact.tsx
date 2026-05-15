"use client";

import { useState } from "react";
import { COMPANY, SERVICE_TYPES } from "@/constants";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
    exiting: boolean;
  }>({ show: false, type: "success", message: "", exiting: false });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message, exiting: false });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, exiting: true }));
      setTimeout(() => {
        setToast({ show: false, type: "success", message: "", exiting: false });
      }, 300);
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      files.forEach((file) => formDataToSend.append("files", file));
      formDataToSend.append("source", "contact_form");

      const response = await fetch("/api/quote", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        showToast("success", data.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          serviceType: "",
          message: "",
        });
        setFiles([]);
      } else {
        showToast("error", data.error || "Bir hata oluştu.");
      }
    } catch {
      showToast("error", "Bağlantı hatası. Lütfen daha sonra tekrar deneyiniz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/${COMPANY.phone.replace(/[^0-9]/g, "")}`;

  return (
    <section id="iletisim" className="py-10 sm:py-14 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* Left - Contact Info */}
        <div className="order-2 lg:order-1 flex flex-col justify-center">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-[11px] mb-2 sm:mb-3 block">
            İletişim
          </span>
          <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-4xl font-extrabold mb-3 sm:mb-4 leading-tight text-on-surface">
            Bize Ulaşın
          </h2>
          <p className="text-[13px] sm:text-[15px] text-secondary mb-6 sm:mb-8 max-w-md leading-[1.6]">
            Detaylı bilgi veya fiyat teklifi için aşağıdaki iletişim kanallarını kullanabilirsiniz.
          </p>

          {/* WhatsApp Card is Primary Action */}
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-5 sm:p-6 rounded-[20px] sm:rounded-3xl border border-green-200/60 shadow-sm mb-6 sm:mb-8">
            <h3 className="font-bold text-base sm:text-[18px] text-green-800 mb-1.5 sm:mb-2">WhatsApp'tan Teklif Al</h3>
            <p className="text-[12px] sm:text-[13px] text-green-700/80 mb-4 sm:mb-5 leading-relaxed">
              Projenizin ölçü, görsel veya teknik detaylarını WhatsApp üzerinden doğrudan bize gönderebilirsiniz.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25d366] text-white px-5 h-10 sm:h-11 rounded-xl font-bold text-[12px] sm:text-[13px] transition-all hover:brightness-110 active:scale-95 shadow-md shadow-green-500/20"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp ile Yaz
            </a>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-10 h-10 bg-surface border border-gray-100 flex items-center justify-center rounded-2xl group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">call</span>
              </div>
              <div>
                <p className="text-[10px] md:text-[11px] font-bold uppercase opacity-50 mb-0.5 text-on-surface">
                  Telefon
                </p>
                <p className="text-[13px] sm:text-[15px] font-semibold text-on-surface">
                  {COMPANY.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-10 h-10 bg-surface border border-gray-100 flex items-center justify-center rounded-2xl group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </div>
              <div>
                <p className="text-[10px] md:text-[11px] font-bold uppercase opacity-50 mb-0.5 text-on-surface">
                  E-posta
                </p>
                <p className="text-[13px] sm:text-[15px] font-semibold text-on-surface">
                  {COMPANY.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-10 h-10 bg-surface border border-gray-100 flex items-center justify-center rounded-2xl group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
              </div>
              <div>
                <p className="text-[10px] md:text-[11px] font-bold uppercase opacity-50 mb-0.5 text-on-surface">
                  Adres
                </p>
                <p className="text-[13px] sm:text-[15px] font-semibold text-on-surface">
                  {COMPANY.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="order-1 lg:order-2 bg-white p-4 sm:p-5 lg:p-8 rounded-[20px] sm:rounded-3xl shadow-xl border border-gray-100">
          <h3 className="text-[18px] sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 text-on-surface">Mesaj Gönderin</h3>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                id="contact-fullName"
                name="fullName"
                type="text"
                placeholder="Ad Soyad"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full h-11 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[12px] sm:text-[13px] transition-all placeholder:text-gray-400"
              />
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="E-posta"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-11 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[12px] sm:text-[13px] transition-all placeholder:text-gray-400"
              />
            </div>

            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="Telefon"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full h-11 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[12px] sm:text-[13px] transition-all placeholder:text-gray-400"
            />

            <select
              id="contact-serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full h-11 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[12px] sm:text-[13px] cursor-pointer text-gray-400 [&:has(option:checked:not([value='']))]:text-on-surface appearance-none"
            >
              <option value="">Hizmet Türü Seçin</option>
              {SERVICE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <textarea
              id="contact-message"
              name="message"
              placeholder="Mesajınız..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full min-h-[90px] sm:min-h-[110px] bg-surface/50 border border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:bg-white outline-none text-[12px] sm:text-[13px] transition-all resize-y placeholder:text-gray-400"
            />
            
            <div className="flex flex-col gap-2">
              <label className="text-[12px] sm:text-[13px] font-bold text-secondary">
                <span className="material-symbols-outlined text-[16px] align-middle mr-1">attach_file</span> Dosya Ekle (İsteğe Bağlı)
              </label>
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
                className="w-full text-[12px] sm:text-[13px] text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[12px] file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
              />
              <p className="text-[10px] text-gray-400">Maksimum 5MB. Desteklenen formatlar: JPG, PNG, WEBP, PDF, DOC, DOCX</p>
            </div>

            <button
              id="contact-submit"
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-primary text-white rounded-xl font-bold text-[12px] sm:text-[13px] tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Gönderiliyor...
                </span>
              ) : (
                "Mesajı Gönder"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-[100] max-w-[calc(100vw-48px)] sm:max-w-sm ${
            toast.exiting ? "toast-exit" : "toast-enter"
          }`}
        >
          <div
            className={`flex items-start gap-4 p-4 rounded-2xl shadow-2xl border ${
              toast.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <span className="material-symbols-outlined text-xl shrink-0 mt-0.5">
              {toast.type === "success" ? "check_circle" : "error"}
            </span>
            <div>
              <p className="font-bold text-[13px] mb-1">
                {toast.type === "success" ? "Başarılı!" : "Hata!"}
              </p>
              <p className="text-[12px] leading-relaxed opacity-80">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() =>
                setToast({
                  show: false,
                  type: "success",
                  message: "",
                  exiting: false,
                })
              }
              className="shrink-0 opacity-50 hover:opacity-100 transition-opacity ml-auto"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
