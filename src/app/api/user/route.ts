import { NextResponse } from "next/server";
import { UserManager } from "@/features/user/user.manager";

export async function GET(req: Request) {
  try {
    const manager = new UserManager();
    const users = await manager.getAllUsers(); 

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Bilinmeyen bir hata oluştu." },
      { status: 400 }
    );
  }
}
