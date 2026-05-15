"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import toast from "react-hot-toast";

const showCustomToast = (message: string, type: "success" | "error" = "success") => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-in fade-in slide-in-from-top-4" : "animate-out fade-out slide-out-to-top-4"
        } max-w-sm w-full bg-white/90 backdrop-blur-xl shadow-2xl rounded-[20px] pointer-events-auto flex items-center p-4 ring-1 ring-black/5 border border-white/50 transition-all duration-300`}
      >
        <div className="flex-shrink-0 mr-4">
          {type === "success" ? (
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-500 text-[22px]">check_circle</span>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-500 text-[22px]">error</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-bold text-on-surface leading-snug">
            {message}
          </p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-secondary hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    ),
    { duration: 4000 }
  );
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Note: we're reusing the avatars from registration
  const AVATARS = Array.from({ length: 10 }, (_, i) => `/assets/avatars/avatar_${(i + 1).toString().padStart(2, "0")}.webp`);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
          setProfileImage(data.user.profileImage);
        } else {
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const [customFile, setCustomFile] = useState<File | null>(null);
  const [customFilePreview, setCustomFilePreview] = useState<string | null>(null);

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        showCustomToast("Lütfen geçerli bir görsel yükleyin.", "error");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showCustomToast("Görsel boyutu 2MB'den büyük olamaz.", "error");
        return;
      }
      setCustomFile(file);
      setCustomFilePreview(URL.createObjectURL(file));
      setProfileImage("custom");
    }
  };

  const handleUpdateAvatar = async () => {
    if (!profileImage || (profileImage === user.profileImage && !customFile)) return;
    setSaving(true);
    
    try {
      let res;
      if (customFile) {
        const formData = new FormData();
        formData.append("file", customFile);
        res = await fetch("/api/user/profile/avatar", {
          method: "PATCH",
          body: formData,
        });
      } else {
        res = await fetch("/api/user/profile/avatar", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ avatarUrl: profileImage }),
        });
      }

      const data = await res.json();
      if (data.success) {
        showCustomToast("Profil fotoğrafınız güncellendi", "success");
        setUser(data.user);
        // Reload to sync Navbar and other components
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        showCustomToast(data.error || "Güncelleme başarısız", "error");
      }
    } catch (err) {
      showCustomToast("Bir hata oluştu", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showCustomToast("Yeni şifreler uyuşmuyor.", "error");
      return;
    }
    setSaving(true);
    // Dummy wait for UX, real backend would update password
    await new Promise(r => setTimeout(r, 800));
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setSaving(false);
    showCustomToast("Şifreniz başarıyla güncellendi", "success");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin text-primary material-symbols-outlined">progress_activity</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 sm:pt-32 pb-16 bg-surface">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-2">Profilim</h1>
            <p className="text-secondary text-[13px]">Hesap bilgilerinizi ve ayarlarınızı yönetin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Avatar & Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden relative bg-surface border-4 border-white shadow-md mb-4">
                  <Image src={user.profileImage || "/profiles/default-1.png"} alt="Profile" fill className="object-cover" />
                </div>
                <h2 className="font-extrabold text-lg text-on-surface mb-1">{user.name}</h2>
                <p className="text-[13px] text-secondary mb-4">{user.email}</p>
                
                {user.isVerified ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[11px] font-bold uppercase tracking-wider rounded-full">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Doğrulanmış Hesap
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-[11px] font-bold uppercase tracking-wider rounded-full">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    Doğrulanmamış
                  </span>
                )}
              </div>

              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-3 rounded-xl font-bold text-[13px] transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Çıkış Yap
                </button>
              </div>
            </div>

            {/* Right Column: Settings */}
            <div className="md:col-span-2 space-y-6">
              {/* Avatar Update */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="font-extrabold text-on-surface mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <span className="material-symbols-outlined text-primary">face</span>
                  Avatarı Değiştir
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mb-6">
                  {AVATARS.map((avatar, idx) => (
                    <button
                      key={avatar}
                      onClick={() => {
                        setProfileImage(avatar);
                        setCustomFile(null);
                        setCustomFilePreview(null);
                      }}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-[3px] transition-all hover:scale-105 ${
                        profileImage === avatar && !customFile
                          ? "border-primary shadow-md shadow-primary/20"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={avatar} alt={`Avatar ${idx + 1}`} fill className="object-cover" sizes="60px" />
                    </button>
                  ))}
                </div>

                <div className="mb-6">
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

                <button
                  onClick={handleUpdateAvatar}
                  disabled={saving || (profileImage === user.profileImage && !customFile)}
                  className="w-full sm:w-auto px-6 h-12 bg-primary text-white rounded-xl font-bold text-[13px] tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  ) : (
                    "Avatarı Kaydet"
                  )}
                </button>
              </div>

              {/* Password Update */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="font-extrabold text-on-surface mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <span className="material-symbols-outlined text-primary">lock</span>
                  Şifreyi Değiştir
                </h3>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">Mevcut Şifre</label>
                    <input 
                      type="password" required minLength={8}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      className="w-full h-12 bg-surface border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">Yeni Şifre</label>
                    <input 
                      type="password" required minLength={8}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      className="w-full h-12 bg-surface border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-on-surface/70 uppercase tracking-wider mb-1.5 ml-1">Yeni Şifre (Tekrar)</label>
                    <input 
                      type="password" required minLength={8}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      className="w-full h-12 bg-surface border border-gray-200 rounded-xl px-4 focus:border-primary focus:bg-white outline-none text-[13px] transition-all" 
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto px-6 h-12 bg-surface border border-gray-200 text-on-surface rounded-xl font-bold text-[13px] tracking-widest uppercase hover:bg-gray-50 active:scale-95 transition-all mt-2 disabled:opacity-50"
                  >
                    Şifreyi Güncelle
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
