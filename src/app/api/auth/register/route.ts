import { NextResponse } from "next/server";
import { UserManager } from "@/features/user/user.manager";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userManager = new UserManager();

    const result = await userManager.register(body);

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Bilinmeyen bir hata oluştu." },
      { status: 400 }
    );
  }
}
