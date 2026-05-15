import { NextResponse } from "next/server";
import { UserManager } from "@/features/user/user.manager";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    const userManager = new UserManager();

    const result = await userManager.resetPassword(token, password);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Bilinmeyen bir hata oluştu." },
      { status: 400 }
    );
  }
}
