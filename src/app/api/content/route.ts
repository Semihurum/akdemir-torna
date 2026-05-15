import { NextResponse } from "next/server";
import { contentManager } from "@/features/content/content.manager";

export async function GET() {
  try {
    const content = await contentManager.getContent();
    return NextResponse.json({ success: true, data: content }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Bilinmeyen bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const content = await contentManager.updateContent(body);
    return NextResponse.json({ success: true, message: "İçerik başarıyla güncellendi.", data: content }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Bilinmeyen bir hata oluştu." },
      { status: 400 }
    );
  }
}
