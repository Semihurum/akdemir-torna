import { NextResponse } from "next/server";
import { UserManager } from "@/features/user/user.manager";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "E-posta gereklidir." }, { status: 400 });
    }

    const userManager = new UserManager();
    const result = await userManager.resendVerificationCode(email);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Bilinmeyen bir hata oluştu." },
      { status: 400 }
    );
  }
}
