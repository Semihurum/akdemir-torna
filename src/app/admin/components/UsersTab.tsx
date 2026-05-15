"use client";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function UsersTab({ initialData, setStats }: any) {
  const [users, setUsers] = useState(initialData || []);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const updateStats = (data: any) => {
    setStats((prev: any) => ({ ...prev, userCount: data.filter((u: any) => !u.silindi_mi).length }));
  };

  const updateRole = async (id: string, role: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role })
      });
      if (res.ok) {
        const newData = users.map((u: any) => u._id === id ? { ...u, role } : u);
        setUsers(newData);
        if(selectedUser?._id === id) setSelectedUser({ ...selectedUser, role });
        toast.success("Kullanıcı rolü güncellendi");
        setOpenDropdownId(null);
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const newData = users.map((u: any) => u._id === id ? { ...u, status } : u);
        setUsers(newData);
        if(selectedUser?._id === id) setSelectedUser({ ...selectedUser, status });
        toast.success(status === 'active' ? "Hesap aktifleştirildi" : "Hesap pasifleştirildi");
        setOpenDropdownId(null);
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  const banUser = async (id: string, isPermanent: boolean, hours?: number) => {
    const endpoint = isPermanent ? `/api/admin/users/${id}/ban` : `/api/admin/users/${id}/temp-ban`;
    const body = isPermanent ? { reason: "Kural İhlali" } : { hours, reason: "Geçici Ban" };
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        const d = await res.json();
        const banData = isPermanent ? { is_banned: true, ban_reason: body.reason, ban_until: null } : { is_banned: true, ban_reason: body.reason, ban_until: new Date(Date.now() + (hours||1) * 3600000).toISOString() };
        const newData = users.map((u: any) => u._id === id ? { ...u, ...banData } : u);
        setUsers(newData);
        if(selectedUser?._id === id) setSelectedUser({ ...selectedUser, ...banData });
        toast.success("Kullanıcı yasaklandı");
        setOpenDropdownId(null);
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  const unbanUser = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}/unban`, { method: "POST" });
      if (res.ok) {
        const newData = users.map((u: any) => u._id === id ? { ...u, is_banned: false, ban_reason: null, ban_until: null } : u);
        setUsers(newData);
        if(selectedUser?._id === id) setSelectedUser({ ...selectedUser, is_banned: false, ban_reason: null, ban_until: null });
        toast.success("Kullanıcı yasağı kaldırıldı");
        setOpenDropdownId(null);
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        const newData = users.map((u: any) => u._id === id ? { ...u, silindi_mi: true } : u);
        setUsers(newData);
        updateStats(newData);
        toast.success("Kullanıcı silindi");
        setOpenDropdownId(null);
      } else toast.error("İşlem başarısız");
    } catch { toast.error("Bağlantı hatası"); }
  };

  const activeUsers = users.filter((u: any) => !u.silindi_mi);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
       <h2 className="text-2xl font-extrabold text-on-surface mb-6">Kullanıcı Yönetimi</h2>
       <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-visible">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-surface/50 text-secondary uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4 rounded-tl-2xl">Kullanıcı</th>
                <th className="px-6 py-4">Rol / Durum</th>
                <th className="px-6 py-4">Güvenlik</th>
                <th className="px-6 py-4 text-right rounded-tr-2xl">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeUsers.length === 0 ? <tr><td colSpan={4} className="p-6 text-center text-secondary">Kullanıcı bulunamadı.</td></tr> : activeUsers.map((u: any) => (
                <tr key={u._id} className={`hover:bg-gray-50/50 ${u.is_banned ? 'bg-red-50/30' : ''}`}>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative bg-gray-100"><Image src={u.profileImage || "/profiles/default-1.png"} alt="" fill className="object-cover"/></div>
                    <div><p className="font-bold text-on-surface">{u.name}</p><p className="text-[11px] text-secondary">{u.email}</p></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{u.role}</span>
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{u.status === 'active' ? 'Aktif' : 'Pasif'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     {u.is_banned ? <span className="text-[11px] font-bold text-red-600 bg-red-100 px-2 py-1 rounded-md uppercase">Yasaklı</span> : <span className="text-[11px] text-secondary">Temiz</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block text-left">
                      <button className="text-secondary hover:text-primary transition-colors p-1" onClick={() => setOpenDropdownId(openDropdownId === u._id ? null : u._id)}>
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                      {openDropdownId === u._id && (
                        <>
                          <div className="fixed inset-0 z-[9998]" onClick={() => setOpenDropdownId(null)}></div>
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-[9999] text-left">
                            <button onClick={() => { setSelectedUser(u); setOpenDropdownId(null); }} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-surface text-on-surface">Detay Gör</button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button onClick={() => updateRole(u._id, u.role === 'admin' ? 'user' : 'admin')} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-surface text-on-surface">{u.role === 'admin' ? 'Kullanıcı Yap' : 'Admin Yap'}</button>
                            <button onClick={() => updateStatus(u._id, u.status === 'active' ? 'inactive' : 'active')} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-surface text-on-surface">{u.status === 'active' ? 'Hesabı Pasifleştir' : 'Hesabı Aktifleştir'}</button>
                            <div className="border-t border-gray-100 my-1"></div>
                            {u.is_banned ? (
                              <button onClick={() => unbanUser(u._id)} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-green-50 text-green-600">Yasağı Kaldır</button>
                            ) : (
                              <>
                                <button onClick={() => banUser(u._id, false, 24)} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-orange-50 text-orange-600">Geçici Yasakla (24s)</button>
                                <button onClick={() => banUser(u._id, true)} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-red-50 text-red-600">Kalıcı Yasakla</button>
                              </>
                            )}
                            <button onClick={() => remove(u._id)} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-red-50 text-red-600">Kullanıcıyı Sil</button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>

       {selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><span className="material-symbols-outlined">close</span></button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden relative bg-gray-100 border border-gray-200">
                <Image src={selectedUser.profileImage || "/profiles/default-1.png"} alt="" fill className="object-cover"/>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-on-surface">{selectedUser.name}</h3>
                <p className="text-[13px] text-secondary">{selectedUser.email}</p>
              </div>
            </div>
            
            <div className="space-y-4 text-[13px] bg-surface p-6 rounded-2xl">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <strong className="text-secondary">Rol:</strong> 
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${selectedUser.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-white text-gray-700 border border-gray-200'}`}>{selectedUser.role}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <strong className="text-secondary">Hesap Durumu:</strong> 
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${selectedUser.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{selectedUser.status === 'active' ? 'Aktif' : 'Pasif'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <strong className="text-secondary">E-posta Doğrulaması:</strong> 
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${selectedUser.isVerified ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{selectedUser.isVerified ? 'Doğrulandı' : 'Bekliyor'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <strong className="text-secondary">Kayıt Tarihi:</strong> 
                <span className="font-bold text-on-surface">{new Date(selectedUser.createdAt).toLocaleDateString("tr-TR")}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <strong className="text-secondary">Son Giriş:</strong> 
                <span className="font-bold text-on-surface">{selectedUser.last_login_at ? new Date(selectedUser.last_login_at).toLocaleString("tr-TR") : '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <strong className="text-secondary">Yasak Durumu:</strong> 
                {selectedUser.is_banned ? (
                  <div className="text-right">
                    <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-red-100 text-red-700 block mb-1">YASAKLI</span>
                    {selectedUser.ban_until && <span className="text-[10px] text-red-600 block">Bitiş: {new Date(selectedUser.ban_until).toLocaleString("tr-TR")}</span>}
                    {selectedUser.ban_reason && <span className="text-[10px] text-red-600 block">Sebep: {selectedUser.ban_reason}</span>}
                  </div>
                ) : (
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-green-100 text-green-700">TEMİZ</span>
                )}
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
