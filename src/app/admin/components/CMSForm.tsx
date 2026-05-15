"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CMSForm() {
  const [formData, setFormData] = useState({
    heroTitle: "", heroSubtitle: "", heroDescription: "", aboutTitle: "", aboutDescription: "", phone: "", email: "", address: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(d => {
      if (d.success && d.data) {
        setFormData(d.data);
      }
      setLoading(false);
    });
  }, []);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) toast.success("İçerik başarıyla güncellendi!");
      else toast.error("Hata: " + data.error);
    } catch (err) {
      toast.error("Bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-extrabold text-on-surface mb-6">İçerik Yönetimi (CMS)</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-lg mb-4 text-primary border-b border-gray-100 pb-2">Ana Sayfa (Hero)</h3>
          <div className="space-y-4">
            <div><label className="block text-[12px] font-bold text-secondary uppercase mb-1">Üst Başlık (Subtitle)</label><input name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} className="w-full h-11 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary outline-none" /></div>
            <div><label className="block text-[12px] font-bold text-secondary uppercase mb-1">Ana Başlık (Title)</label><input name="heroTitle" value={formData.heroTitle} onChange={handleChange} className="w-full h-11 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary outline-none" /></div>
            <div><label className="block text-[12px] font-bold text-secondary uppercase mb-1">Açıklama (Description)</label><textarea name="heroDescription" value={formData.heroDescription} onChange={handleChange} className="w-full h-24 bg-surface/50 border border-gray-200 rounded-xl px-4 py-3 focus:border-primary outline-none resize-y" /></div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4 text-primary border-b border-gray-100 pb-2">Hakkımızda</h3>
          <div className="space-y-4">
            <div><label className="block text-[12px] font-bold text-secondary uppercase mb-1">Başlık</label><input name="aboutTitle" value={formData.aboutTitle} onChange={handleChange} className="w-full h-11 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary outline-none" /></div>
            <div><label className="block text-[12px] font-bold text-secondary uppercase mb-1">İçerik</label><textarea name="aboutDescription" value={formData.aboutDescription} onChange={handleChange} className="w-full h-32 bg-surface/50 border border-gray-200 rounded-xl px-4 py-3 focus:border-primary outline-none resize-y" /></div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4 text-primary border-b border-gray-100 pb-2">İletişim Bilgileri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-[12px] font-bold text-secondary uppercase mb-1">Telefon</label><input name="phone" value={formData.phone} onChange={handleChange} className="w-full h-11 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary outline-none" /></div>
            <div><label className="block text-[12px] font-bold text-secondary uppercase mb-1">E-posta</label><input name="email" value={formData.email} onChange={handleChange} className="w-full h-11 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary outline-none" /></div>
            <div className="md:col-span-2"><label className="block text-[12px] font-bold text-secondary uppercase mb-1">Adres</label><input name="address" value={formData.address} onChange={handleChange} className="w-full h-11 bg-surface/50 border border-gray-200 rounded-xl px-4 focus:border-primary outline-none" /></div>
          </div>
        </div>
        <button type="submit" disabled={saving} className="w-full h-12 bg-primary text-white font-bold tracking-widest uppercase rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20">
          {saving ? "Kaydediliyor..." : "Tüm Değişiklikleri Kaydet"}
        </button>
      </form>
    </div>
  );
}
