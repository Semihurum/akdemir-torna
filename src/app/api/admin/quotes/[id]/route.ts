import { NextResponse } from 'next/server';
import { QuoteManager } from '@/features/quote/quote.manager';
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const manager = new QuoteManager();
    const quote = await manager.getOne({ _id: id });
    if (!quote) return NextResponse.json({ success: false }, { status: 404 });
    
    quote.silindi_mi = true;
    await quote.save();
    return NextResponse.json({ success: true, data: quote });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}