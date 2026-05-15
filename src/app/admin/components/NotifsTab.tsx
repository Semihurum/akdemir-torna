"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NotifsTab({ initialData, setStats, onGoToQuote }: any) {
  const [notifs, setNotifs] = useState(initialData || []);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const updateStats = (data: any) => {
    setStats((prev: any) => ({ ...prev, messageCount: data.filter((n: any) => !n.is_read).length }));
  };

  const markRead = async (id: string, isRead: boolean) => {
    try {
      const res = await fetch(`/api/admin/notifications/${id}/read`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead })
      });
      if (res.ok) {
        const newData = notifs.map((n: any) => n._id === id ? { ...n, is_read: isRead } : n);
        setNotifs(newData);
        updateStats(newData);
        toast.success(isRead ? "Okundu işaretlendi" : "Okunmadı işaretlendi");
        setOpenDropdownId(null);
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  const archive = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/notifications/${id}/archive`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archive: true })
      });
      if (res.ok) {
        const newData = notifs.filter((n: any) => n._id !== id);
        setNotifs(newData);
        updateStats(newData);
        toast.success("Bildirim arşivlendi");
        setOpenDropdownId(null);
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Bu bildirimi tamamen silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/notifications/${id}`, { method: "DELETE" });
      if (res.ok) {
        const newData = notifs.filter((n: any) => n._id !== id);
        setNotifs(newData);
        updateStats(newData);
        toast.success("Bildirim silindi");
        setOpenDropdownId(null);
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-extrabold text-on-surface mb-6">Bildirimler & Mesajlar</h2>
      <div className="space-y-4">
        {notifs.length === 0 ? <p className="text-secondary text-[13px]">Henüz bildirim yok.</p> : notifs.map((n: any) => (
          <div key={n._id} className={`bg-white p-5 rounded-2xl border ${n.is_read ? 'border-gray-100' : 'border-primary/30 bg-primary/5'} shadow-sm relative group`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {!n.is_read && <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>}
                <p className="font-bold text-[14px] text-on-surface">{n.title}</p>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-gray-100 text-gray-500">{n.source === 'contact_form' ? 'Mesaj' : n.source === 'quote_form' ? 'Teklif' : 'Sistem'}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-secondary">{new Date(n.createdAt).toLocaleDateString("tr-TR")}</span>
                
                {/* Actions Dropdown */}
                <div className="relative">
                  <button className="text-secondary hover:text-primary transition-colors p-1" onClick={() => setOpenDropdownId(openDropdownId === n._id ? null : n._id)}>
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                  {openDropdownId === n._id && (
                    <>
                      <div className="fixed inset-0 z-[9998]" onClick={() => setOpenDropdownId(null)}></div>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-[9999]">
                        <button onClick={() => { setSelectedNotif(n); setOpenDropdownId(null); }} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-surface text-on-surface">Detay Gör</button>
                        {n.related_quote_id && (
                          <button onClick={() => { setOpenDropdownId(null); onGoToQuote(); }} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-surface text-on-surface">İlgili Teklife Git</button>
                        )}
                        <button onClick={() => markRead(n._id, !n.is_read)} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-surface text-on-surface">
                          {n.is_read ? 'Okunmadı Yap' : 'Okundu Yap'}
                        </button>
                        <button onClick={() => archive(n._id)} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-surface text-on-surface">Arşivle</button>
                        <button onClick={() => remove(n._id)} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-red-50 text-red-600">Sil</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <p className="text-[13px] text-on-surface/80 leading-relaxed ml={n.is_read ? 0 : 5}">{n.message}</p>
          </div>
        ))}
      </div>

      {selectedNotif && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedNotif(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><span className="material-symbols-outlined">close</span></button>
            <h3 className="text-xl font-extrabold mb-4">{selectedNotif.title}</h3>
            <div className="space-y-4 text-[13px]">
              <div><strong className="text-secondary block mb-1">Kaynak:</strong> {selectedNotif.source === 'contact_form' ? 'Mesaj Gönderin Formu' : selectedNotif.source === 'quote_form' ? 'Teklif Al Formu' : 'Sistem'}</div>
              <div><strong className="text-secondary block mb-1">Tarih:</strong> {new Date(selectedNotif.createdAt).toLocaleString("tr-TR")}</div>
              <div><strong className="text-secondary block mb-1">İçerik:</strong><p className="bg-surface p-3 rounded-xl whitespace-pre-wrap">{selectedNotif.message}</p></div>
              {selectedNotif.related_quote_id && (
                <div className="pt-4 border-t border-gray-100">
                  <button onClick={() => { setSelectedNotif(null); onGoToQuote(); }} className="w-full h-10 bg-primary text-white font-bold rounded-xl text-[12px]">İlgili Teklife Git</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
