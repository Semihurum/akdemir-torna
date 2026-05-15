"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const STATUSES = ["Yeni", "İnceleniyor", "Cevaplandı", "Reddedildi", "Tamamlandı"];
const STATUS_COLORS: any = {
  "Yeni": "bg-blue-100 text-blue-700",
  "İnceleniyor": "bg-yellow-100 text-yellow-700",
  "Cevaplandı": "bg-green-100 text-green-700",
  "Reddedildi": "bg-red-100 text-red-700",
  "Tamamlandı": "bg-gray-200 text-gray-700"
};

export default function QuotesTab({ initialData, setStats }: any) {
  const [quotes, setQuotes] = useState(initialData || []);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const updateStats = (data: any) => {
    setStats((prev: any) => ({ ...prev, quoteCount: data.length }));
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/quotes/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const newData = quotes.map((q: any) => q._id === id ? { ...q, status } : q);
        setQuotes(newData);
        if(selectedQuote?._id === id) setSelectedQuote({ ...selectedQuote, status });
        toast.success("Durum güncellendi");
        setOpenDropdownId(null);
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  const updateNote = async (id: string, adminNote: string) => {
    try {
      const res = await fetch(`/api/admin/quotes/${id}/note`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNote })
      });
      if (res.ok) {
        const newData = quotes.map((q: any) => q._id === id ? { ...q, adminNote } : q);
        setQuotes(newData);
        if(selectedQuote?._id === id) setSelectedQuote({ ...selectedQuote, adminNote });
        toast.success("Not güncellendi");
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  const updatePublicMessage = async (id: string, message: string) => {
    try {
      const res = await fetch(`/api/admin/quotes/${id}/public-message`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_admin_message: message })
      });
      if (res.ok) {
        const newData = quotes.map((q: any) => q._id === id ? { ...q, public_admin_message: message } : q);
        setQuotes(newData);
        if(selectedQuote?._id === id) setSelectedQuote({ ...selectedQuote, public_admin_message: message });
        toast.success("Kullanıcıya mesaj iletildi");
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  const archive = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/quotes/${id}/archive`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archive: true })
      });
      if (res.ok) {
        const newData = quotes.filter((q: any) => q._id !== id);
        setQuotes(newData);
        updateStats(newData);
        toast.success("Teklif arşivlendi");
        setOpenDropdownId(null);
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Bu teklifi tamamen silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/quotes/${id}`, { method: "DELETE" });
      if (res.ok) {
        const newData = quotes.filter((q: any) => q._id !== id);
        setQuotes(newData);
        updateStats(newData);
        toast.success("Teklif silindi");
        setOpenDropdownId(null);
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-extrabold text-on-surface mb-6">Teklif Talepleri</h2>
      <div className="space-y-4">
        {quotes.length === 0 ? <p className="text-secondary text-[13px]">Henüz teklif yok.</p> : quotes.map((q: any) => (
          <div key={q._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative group">
            <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-3">
              <div>
                <p className="font-bold text-[14px] text-on-surface">{q.fullName} <span className="text-secondary font-normal ml-2">{q.email} • {q.phone}</span></p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[11px] text-primary font-bold uppercase tracking-wider">{q.serviceType || "Genel"}</p>
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-gray-100 text-gray-500">{q.source === 'contact_form' ? 'Mesaj Formu' : 'Teklif Formu'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${STATUS_COLORS[q.status] || 'bg-gray-100 text-gray-700'}`}>{q.status}</span>
                <span className="text-[11px] text-secondary">{new Date(q.createdAt || q.olusturulma_tarihi).toLocaleDateString("tr-TR")}</span>
                
                {/* Actions Dropdown */}
                <div className="relative">
                  <button className="text-secondary hover:text-primary transition-colors p-1" onClick={() => setOpenDropdownId(openDropdownId === q._id ? null : q._id)}>
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                  {openDropdownId === q._id && (
                    <>
                      <div className="fixed inset-0 z-[9998]" onClick={() => setOpenDropdownId(null)}></div>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-[9999]">
                        <button onClick={() => { setSelectedQuote(q); setOpenDropdownId(null); }} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-surface text-on-surface">Detay Gör</button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <div className="px-4 py-1 text-[10px] text-secondary font-bold uppercase tracking-wider">Durum:</div>
                        {STATUSES.map(s => (
                          <button key={s} onClick={() => updateStatus(q._id, s)} className={`w-full text-left px-4 py-1.5 text-[12px] hover:bg-surface ${q.status === s ? 'text-primary font-bold' : 'text-on-surface'}`}>{s}</button>
                        ))}
                        <div className="border-t border-gray-100 my-1"></div>
                        <button onClick={() => archive(q._id)} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-surface text-on-surface">Arşivle</button>
                        <button onClick={() => remove(q._id)} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-red-50 text-red-600">Sil</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <p className="text-[13px] text-on-surface/80 leading-relaxed whitespace-pre-wrap">{q.projectDescription}</p>
          </div>
        ))}
      </div>

      {selectedQuote && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedQuote(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><span className="material-symbols-outlined">close</span></button>
            <h3 className="text-xl font-extrabold mb-6 flex items-center gap-3">
              Teklif Detayı 
              <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${STATUS_COLORS[selectedQuote.status]}`}>{selectedQuote.status}</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-[13px] mb-6">
              <div><strong className="text-secondary block mb-1">Ad Soyad:</strong> {selectedQuote.fullName}</div>
              <div><strong className="text-secondary block mb-1">E-posta:</strong> {selectedQuote.email}</div>
              <div><strong className="text-secondary block mb-1">Telefon:</strong> {selectedQuote.phone}</div>
              <div><strong className="text-secondary block mb-1">Firma:</strong> {selectedQuote.companyName || '-'}</div>
              <div><strong className="text-secondary block mb-1">Hizmet Türü:</strong> {selectedQuote.serviceType || '-'}</div>
              <div><strong className="text-secondary block mb-1">Kaynak:</strong> {selectedQuote.source === 'contact_form' ? 'Mesaj Gönderin Formu' : 'Teklif Al Formu'}</div>
              <div><strong className="text-secondary block mb-1">Tarih:</strong> {new Date(selectedQuote.createdAt || selectedQuote.olusturulma_tarihi).toLocaleString("tr-TR")}</div>
            </div>

            <div className="mb-6">
              <strong className="text-secondary block mb-2">Mesaj/Proje Detayı:</strong>
              <div className="bg-surface p-4 rounded-xl whitespace-pre-wrap text-[13px] text-on-surface">{selectedQuote.projectDescription}</div>
            </div>

            {selectedQuote.files && selectedQuote.files.length > 0 && (
              <div className="mb-6">
                <strong className="text-secondary block mb-2">Eklenen Dosyalar:</strong>
                <div className="flex flex-wrap gap-2">
                  {selectedQuote.files.map((f: any, i: number) => (
                    <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-surface border border-gray-200 px-3 py-2 rounded-xl hover:border-primary transition-colors">
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span className="text-[12px] font-bold">{f.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <strong className="text-secondary block mb-2">Admin Notu (Gizli):</strong>
                <textarea 
                  className="w-full h-24 bg-surface/50 border border-gray-200 rounded-xl p-3 text-[13px] focus:border-primary outline-none resize-y"
                  defaultValue={selectedQuote.adminNote}
                  onBlur={(e) => updateNote(selectedQuote._id, e.target.value)}
                  placeholder="Diğer adminlerin görebileceği özel not..."
                />
              </div>
              <div>
                <strong className="text-primary block mb-2">Kullanıcıya Görünecek Mesaj:</strong>
                <textarea 
                  className="w-full h-24 bg-primary/5 border border-primary/20 rounded-xl p-3 text-[13px] focus:border-primary outline-none resize-y"
                  defaultValue={selectedQuote.public_admin_message}
                  onBlur={(e) => updatePublicMessage(selectedQuote._id, e.target.value)}
                  placeholder="Kullanıcının 'Tekliflerim' sayfasında göreceği mesaj..."
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <span className="text-[12px] font-bold text-secondary mr-2">Durum Değiştir:</span>
              {STATUSES.map(s => (
                <button key={s} onClick={() => updateStatus(selectedQuote._id, s)} className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${selectedQuote.status === s ? 'bg-primary text-white shadow-md' : 'bg-surface text-secondary hover:bg-gray-200'}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
