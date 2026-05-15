import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { QuoteManager } from "@/features/quote/quote.manager";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ success: false, error: "Yetkisiz" }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
    const manager = new QuoteManager();
    const quotes = await manager.getMany({ user_id: decoded.id, silindi_mi: false });
    
    // Sort descending by date
    const sortedQuotes = quotes.sort((a: any, b: any) => 
      new Date(b.createdAt || b.olusturulma_tarihi).getTime() - new Date(a.createdAt || a.olusturulma_tarihi).getTime()
    );

    return NextResponse.json({ success: true, data: sortedQuotes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Yetkisiz veya geçersiz token" }, { status: 401 });
  }
}
