"use client";

import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

// Tabs
import UsersTab from "./components/UsersTab";
import QuotesTab from "./components/QuotesTab";
import NotifsTab from "./components/NotifsTab";
import CMSForm from "./components/CMSForm";

export default function AdminDashboard({ user, stats: initialStats, users, notifs, quotes }: any) {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Local state for stats so tabs can update them
  const [stats, setStats] = useState(initialStats);

  return (
    <div className="flex h-screen bg-surface">
      <Toaster position="top-center" />
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <span className="font-extrabold text-xl text-primary tracking-widest uppercase">Admin</span>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <button onClick={() => window.location.href="/"} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 mb-4 rounded-xl font-bold text-[12px] bg-surface text-on-surface hover:bg-gray-100 transition-all border border-gray-200">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> Siteye Dön
          </button>
          <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[13px] transition-all ${activeTab === "dashboard" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary hover:bg-surface"}`}>
            <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
          </button>
          <button onClick={() => setActiveTab("users")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[13px] transition-all ${activeTab === "users" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary hover:bg-surface"}`}>
            <span className="material-symbols-outlined text-[20px]">group</span> Üyeler ({stats.userCount})
          </button>
          <button onClick={() => setActiveTab("messages")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[13px] transition-all ${activeTab === "messages" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary hover:bg-surface"}`}>
            <span className="material-symbols-outlined text-[20px]">notifications</span> Bildirimler ({stats.messageCount})
          </button>
          <button onClick={() => setActiveTab("quotes")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[13px] transition-all ${activeTab === "quotes" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary hover:bg-surface"}`}>
            <span className="material-symbols-outlined text-[20px]">request_quote</span> Teklifler ({stats.quoteCount})
          </button>
          <button onClick={() => setActiveTab("cms")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[13px] transition-all ${activeTab === "cms" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary hover:bg-surface"}`}>
            <span className="material-symbols-outlined text-[20px]">edit_document</span> İçerik Yönt.
          </button>
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative border border-gray-200">
               <Image src={user.profileImage || "/profiles/default-1.png"} alt="Admin" fill className="object-cover" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[13px] font-bold text-on-surface truncate">{user.name}</p>
              <p className="text-[11px] text-secondary truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = "/login";
          }} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-[12px] bg-red-50 text-red-600 hover:bg-red-100 transition-all">
            <span className="material-symbols-outlined text-[16px]">logout</span> Çıkış Yap
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 relative">
        {activeTab === "dashboard" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-extrabold text-on-surface mb-6">Sistem Özeti</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined">group</span></div>
                <div><p className="text-[12px] font-bold text-secondary uppercase tracking-wider">Toplam Üye</p><p className="text-2xl font-extrabold text-on-surface">{stats.userCount}</p></div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined">notifications</span></div>
                <div><p className="text-[12px] font-bold text-secondary uppercase tracking-wider">Okunmamış Bildirim</p><p className="text-2xl font-extrabold text-on-surface">{stats.messageCount}</p></div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined">request_quote</span></div>
                <div><p className="text-[12px] font-bold text-secondary uppercase tracking-wider">Aktif Teklif</p><p className="text-2xl font-extrabold text-on-surface">{stats.quoteCount}</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && <UsersTab initialData={users} setStats={setStats} />}
        {activeTab === "messages" && <NotifsTab initialData={notifs} setStats={setStats} onGoToQuote={() => setActiveTab("quotes")} />}
        {activeTab === "quotes" && <QuotesTab initialData={quotes} setStats={setStats} />}
        {activeTab === "cms" && <CMSForm />}
      </div>
    </div>
  );
}
