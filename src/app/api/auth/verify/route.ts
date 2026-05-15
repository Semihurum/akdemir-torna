import { NextResponse } from "next/server";
import { UserManager } from "@/features/user/user.manager";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login?error=Token bulunamadı", req.url));
    }

    const userManager = new UserManager();
    const result = await userManager.verifyEmail(token);

    if (result.success) {
      return NextResponse.redirect(new URL("/login?verified=true", req.url));
    }

    return NextResponse.redirect(new URL("/login?error=Bilinmeyen Hata", req.url));
  } catch (error: any) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, req.url));
  }
}
