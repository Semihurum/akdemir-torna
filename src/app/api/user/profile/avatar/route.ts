import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserRepository } from "@/features/user/user.repository";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Yetkisiz erişim." }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
    const repository = new UserRepository();
    const user = await repository.getOne({ _id: decoded.id });

    if (!user) {
      return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı." }, { status: 404 });
    }

    // Check content type to handle JSON (avatar preset) vs FormData (custom upload)
    const contentType = req.headers.get("content-type") || "";
    let finalAvatarUrl = user.profileImage;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json({ success: false, error: "Dosya bulunamadı." }, { status: 400 });
      }

      // Validasyon
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        return NextResponse.json({ success: false, error: "Sadece JPG, PNG veya WEBP yükleyebilirsiniz." }, { status: 400 });
      }

      if (file.size > 2 * 1024 * 1024) { // 2MB
        return NextResponse.json({ success: false, error: "Görsel boyutu 2MB'den büyük olamaz." }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads/profile");
      
      // Ensure directory exists
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // Ignored
      }

      const ext = path.extname(file.name) || ".jpg";
      const randomName = crypto.randomBytes(16).toString("hex") + ext;
      const filePath = path.join(uploadDir, randomName);
      
      await writeFile(filePath, buffer);
      
      finalAvatarUrl = `/uploads/profile/${randomName}`;
    } else {
      // JSON (predefined avatar)
      const body = await req.json();
      if (!body.avatarUrl) {
        return NextResponse.json({ success: false, error: "Avatar URL sağlanmadı." }, { status: 400 });
      }
      finalAvatarUrl = body.avatarUrl;
    }

    // Update User
    user.profileImage = finalAvatarUrl;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Profil fotoğrafınız güncellendi",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        isVerified: user.isVerified
      }
    }, { status: 200 });

  } catch (error: any) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return NextResponse.json({ success: false, error: "Oturum süresi doldu." }, { status: 401 });
    }
    return NextResponse.json(
      { success: false, error: error.message || "Bilinmeyen bir hata oluştu." },
      { status: 500 }
    );
  }
}
