import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { QuoteManager } from "@/features/quote/quote.manager";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ success: false, error: "Yetkisiz" }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
    const { id } = await params;
    
    const manager = new QuoteManager();
    const quote = await manager.getOne({ _id: id, user_id: decoded.id, silindi_mi: false });
    
    if (!quote) return NextResponse.json({ success: false, error: "Teklif bulunamadı" }, { status: 404 });

    return NextResponse.json({ success: true, data: quote }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Yetkisiz veya geçersiz token" }, { status: 401 });
  }
}
