import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { QuoteManager } from "@/features/quote/quote.manager";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function TekliflerimPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login?error=Lütfen giriş yapın");
  }

  let decoded: any;
  try {
    const jwtSecret = process.env.JWT_SECRET || "default_secret_key";
    decoded = jwt.verify(token, jwtSecret);
  } catch (error) {
    redirect("/login?error=Oturum süresi doldu");
  }

  const manager = new QuoteManager();
  const quotes = await manager.getMany({ user_id: decoded.id, silindi_mi: false });
  
  // Sort descending by created date
  const sortedQuotes = quotes.sort((a: any, b: any) => 
    new Date(b.createdAt || b.olusturulma_tarihi).getTime() - new Date(a.createdAt || a.olusturulma_tarihi).getTime()
  );

  const STATUS_COLORS: any = {
    "Yeni": "bg-blue-100 text-blue-700 border-blue-200",
    "İnceleniyor": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Cevaplandı": "bg-green-100 text-green-700 border-green-200",
    "Reddedildi": "bg-red-100 text-red-700 border-red-200",
    "Tamamlandı": "bg-gray-200 text-gray-700 border-gray-300"
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 sm:pt-32 pb-16 bg-surface">
        <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">Tekliflerim</h1>
            <span className="text-secondary text-[13px] font-bold bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              Toplam: {sortedQuotes.length}
            </span>
          </div>

          {sortedQuotes.length === 0 ? (
            <div className="bg-white rounded-[24px] sm:rounded-[32px] p-10 sm:p-16 shadow-xl border border-gray-100 text-center">
              <span className="material-symbols-outlined text-[64px] text-gray-200 mb-4 block">
                inbox
              </span>
              <h2 className="text-xl font-bold text-on-surface mb-2">Henüz Teklifiniz Yok</h2>
              <p className="text-secondary text-[14px] max-w-md mx-auto mb-6">
                Sistemimizde size ait herhangi bir teklif talebi bulunamadı. Yeni bir proje için hemen teklif isteyebilirsiniz.
              </p>
              <a href="/teklif-al" className="inline-flex items-center gap-2 bg-primary text-white px-6 h-12 rounded-xl font-bold text-[13px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Yeni Teklif İste
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedQuotes.map((q: any) => (
                <div key={q._id.toString()} className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-on-surface">{q.serviceType || "Genel Teklif / İletişim"}</h3>
                      <p className="text-[12px] text-secondary mt-1">
                        Oluşturulma: {new Date(q.createdAt || q.olusturulma_tarihi).toLocaleString("tr-TR")}
                      </p>
                    </div>
                    <div>
                      <span className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase border ${STATUS_COLORS[q.status] || 'bg-gray-100 text-gray-700'}`}>
                        {q.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[14px] text-on-surface/80 leading-relaxed whitespace-pre-wrap">
                      {q.projectDescription}
                    </p>
                  </div>

                  {q.files && q.files.length > 0 && (
                    <div className="mb-6">
                      <p className="text-[12px] font-bold text-secondary uppercase mb-3">Eklenen Dosyalar</p>
                      <div className="flex flex-wrap gap-3">
                        {q.files.map((file: any, index: number) => (
                          <a 
                            key={index} 
                            href={file.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-surface border border-gray-200 px-3 py-2 rounded-xl hover:border-primary transition-colors group"
                          >
                            <span className="material-symbols-outlined text-[16px] text-gray-400 group-hover:text-primary">description</span>
                            <span className="text-[12px] text-on-surface font-semibold max-w-[150px] truncate">{file.name}</span>
                            <span className="text-[10px] text-secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {q.public_admin_message && (
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 sm:p-5 mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">support_agent</span>
                        <p className="text-[12px] font-extrabold text-primary uppercase tracking-widest">Admin Mesajı</p>
                      </div>
                      <p className="text-[13px] text-on-surface leading-relaxed">
                        {q.public_admin_message}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
