import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserManager } from "@/features/user/user.manager";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userManager = new UserManager();

    const result = await userManager.login(body);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Bilinmeyen bir hata oluştu." },
      { status: 400 }
    );
  }
}
