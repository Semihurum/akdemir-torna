import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { UserManager } from "@/features/user/user.manager";
import { QuoteManager } from "@/features/quote/quote.manager";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let decoded: any;
  try {
    const jwtSecret = process.env.JWT_SECRET || "default_secret_key";
    decoded = jwt.verify(token, jwtSecret);
    
    if (decoded.role !== "admin") {
      redirect("/login?error=Yetkisiz Erişim");
    }
  } catch (error) {
    redirect("/login?error=Oturum Süresi Doldu");
  }

  // Sadece ilk render için DB'den çek
  const userManager = new UserManager();
  const quoteManager = new QuoteManager();
  
  const users = await userManager.getAllUsers();
  const quotes = await quoteManager.getMany({ silindi_mi: false });
  
  let notifs: any[] = [];
  try {
    const { AdminNotificationModel } = await import("@/features/admin/notification.model");
    notifs = await AdminNotificationModel.find({ deleted_at: { $exists: false } }).sort({ createdAt: -1 }).lean();
  } catch(e) {}

  const currentUser = users.find((u: any) => u._id.toString() === decoded.id) || decoded;

  const stats = {
    userCount: users.filter((u: any) => !u.silindi_mi).length,
    messageCount: notifs.filter((n: any) => !n.is_read).length,
    quoteCount: quotes.length,
  };

  return (
    <AdminDashboard 
      user={JSON.parse(JSON.stringify(currentUser))} 
      stats={stats} 
      users={JSON.parse(JSON.stringify(users))} 
      notifs={JSON.parse(JSON.stringify(notifs))} 
      quotes={JSON.parse(JSON.stringify(quotes))} 
    />
  );
}
