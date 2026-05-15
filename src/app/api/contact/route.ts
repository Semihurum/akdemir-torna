/**
 * Contact API Route — sadece HTTP katmanı (controller).
 * İş mantığı, DB erişimi veya model import'u burada YOKTUR.
 *
 * Sorumlulukları:
 * 1. Request body'yi al
 * 2. DTO validation yap
 * 3. Manager'ı çağır
 * 4. Response dön
 */

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { ContactCreateDto } from "@/features/contact/contact.dto";
import { QuoteManager } from "@/features/quote/quote.manager";
import type { ApiResponse } from "@/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Request body'yi al
    const body = await request.json();

    // 2. DTO validation (Zod)
    const validatedData = ContactCreateDto.parse(body);

    // 3. Manager'ı çağır (iş mantığı + DB)
    const quoteManager = new QuoteManager();
    const quoteData = {
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      serviceType: validatedData.serviceType,
      projectDescription: validatedData.message,
      source: "contact_form" as const,
    };
    
    const quote = await quoteManager.create(quoteData);

    // 4. Başarılı response
    return NextResponse.json(
      {
        success: true,
        message:
          "Mesajınız başarıyla gönderildi. Teklif taleplerinize eklenmiştir.",
        data: quote,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Zod validation hatası
    if (error instanceof ZodError) {
      const messages = (error as any).errors.map((e: any) => e.message);
      return NextResponse.json(
        {
          success: false,
          message: "Doğrulama hatası.",
          error: messages.join(", "),
        },
        { status: 400 }
      );
    }

    // Genel sunucu hatası
    console.error("[Contact Route] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Sunucu hatası.",
        error: "Lütfen daha sonra tekrar deneyiniz.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const quoteManager = new QuoteManager();
    const contacts = await quoteManager.getMany({ source: "contact_form" });
    return NextResponse.json({ success: true, data: contacts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Bilinmeyen bir hata oluştu." },
      { status: 400 }
    );
  }
}
