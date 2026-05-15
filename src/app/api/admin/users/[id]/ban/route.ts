import { NextResponse } from "next/server";
import { checkAdminAccess } from "@/core/utils/admin-guard";
import { UserRepository } from "@/features/user/user.repository";
import { AdminAuditLogModel } from "@/features/admin/audit-log.model";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await checkAdminAccess();
  if (guard.error) return guard.error;
  const admin = guard.admin;

  try {
    const body = await req.json();
    const repository = new UserRepository();
    const user = await repository.getOne({ _id: (await params).id });
    if (!user) return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı." }, { status: 404 });

    if (user._id.toString() === admin._id.toString()) {
      return NextResponse.json({ success: false, error: "Kendi hesabınızı banlayamazsınız." }, { status: 403 });
    }

    user.is_banned = true;
    user.ban_reason = body.reason || "Belirtilmedi";
    user.ban_until = undefined; // Kalıcı
    user.status = "inactive";
    await user.save();

    await AdminAuditLogModel.create({
      adminId: admin._id,
      adminName: admin.name,
      action: "BAN_USER",
      targetId: user._id,
      targetType: "User",
      details: `Kalıcı ban: ${user.ban_reason}`,
    });

    return NextResponse.json({ success: true, message: "Kullanıcı kalıcı olarak banlandı." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
