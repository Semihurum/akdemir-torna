import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserRepository } from "@/features/user/user.repository";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Yetkisiz erişim" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
    const repository = new UserRepository();
    const user = await repository.getOne({ _id: decoded.id });

    if (!user) {
      return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
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
    return NextResponse.json(
      { success: false, error: "Geçersiz veya süresi dolmuş token" },
      { status: 401 }
    );
  }
}
