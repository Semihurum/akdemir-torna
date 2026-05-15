import { NextResponse } from "next/server";
import { checkAdminAccess } from "@/core/utils/admin-guard";
import { QuoteManager } from "@/features/quote/quote.manager";

export async function GET(req: Request) {
  const guard = await checkAdminAccess();
  if (guard.error) return guard.error;

  try {
    const manager = new QuoteManager();
    // exclude soft deleted
    const quotes = await manager.getMany({ silindi_mi: false });
    
    // Sort by createdAt descending
    const sortedQuotes = quotes.sort((a: any, b: any) => 
      new Date(b.createdAt || b.olusturulma_tarihi).getTime() - new Date(a.createdAt || a.olusturulma_tarihi).getTime()
    );

    return NextResponse.json({ success: true, data: sortedQuotes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
