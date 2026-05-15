import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { QuoteManager } from "@/features/quote/quote.manager";
import path from "path";
import { promises as fs } from "fs";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    let userId = null;

    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
        userId = decoded.id;
      } catch (e) {}
    }

    const formData = await req.formData();
    
    // Parse fields
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const companyName = formData.get("companyName") as string;
    const serviceType = formData.get("serviceType") as string;
    const projectDescription = formData.get("projectDescription") as string || formData.get("message") as string;
    const source = (formData.get("source") as string) || "quote_form";

    // Handle files
    const fileEntries = formData.getAll("files");
    const savedFiles = [];

    const uploadDir = path.join(process.cwd(), "public/uploads/quotes");
    await fs.mkdir(uploadDir, { recursive: true });

    for (const entry of fileEntries) {
      if (entry && typeof entry === "object" && entry.name) {
        const file = entry as File;
        
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
          return NextResponse.json({ success: false, error: `Geçersiz dosya türü: ${file.name}` }, { status: 400 });
        }
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json({ success: false, error: `Dosya çok büyük (Max 5MB): ${file.name}` }, { status: 400 });
        }

        const ext = path.extname(file.name);
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
        const filePath = path.join(uploadDir, fileName);
        
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);
        
        savedFiles.push({
          url: `/uploads/quotes/${fileName}`,
          name: file.name,
          type: file.type,
          size: file.size
        });
      }
    }

    const manager = new QuoteManager();
    const quoteData: any = {
      fullName, email, phone, companyName, serviceType, projectDescription,
      source: source as any,
      files: savedFiles
    };
    if (userId) quoteData.user_id = userId;

    const quote = await manager.create(quoteData);

    return NextResponse.json({
      success: true,
      message: "Talebiniz başarıyla alınmıştır.",
      data: quote,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Bilinmeyen bir hata oluştu." },
      { status: 400 }
    );
  }
}
// HMR trigger

