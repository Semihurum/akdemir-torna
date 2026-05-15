import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserRepository } from "@/features/user/user.repository";

export async function checkAdminAccess() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: NextResponse.json({ success: false, error: "Yetkisiz erişim. Token bulunamadı." }, { status: 401 }) };
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
    
    // Check if user is actually admin in DB, not just token payload (security measure)
    const repository = new UserRepository();
    const user = await repository.getOne({ _id: decoded.id });

    if (!user || user.role !== "admin" || user.silindi_mi) {
      return { error: NextResponse.json({ success: false, error: "Erişim reddedildi. Admin yetkisi gerekiyor." }, { status: 403 }) };
    }

    return { admin: user };
  } catch (error) {
    return { error: NextResponse.json({ success: false, error: "Geçersiz veya süresi dolmuş oturum." }, { status: 401 }) };
  }
}
