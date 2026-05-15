import { NextResponse } from "next/server";
import { checkAdminAccess } from "@/core/utils/admin-guard";
import { UserRepository } from "@/features/user/user.repository";
import { AdminAuditLogModel } from "@/features/admin/audit-log.model";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await checkAdminAccess();
  if (guard.error) return guard.error;
  const admin = guard.admin;

  try {
    const repository = new UserRepository();
    const user = await repository.getOne({ _id: (await params).id });
    if (!user) return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı." }, { status: 404 });

    user.is_banned = false;
    user.ban_reason = undefined;
    user.ban_until = undefined;
    user.status = "active";
    await user.save();

    await AdminAuditLogModel.create({
      adminId: admin._id,
      adminName: admin.name,
      action: "UNBAN_USER",
      targetId: user._id,
      targetType: "User",
      details: "Kullanıcı yasaklaması kaldırıldı.",
    });

    return NextResponse.json({ success: true, message: "Kullanıcı yasağı kaldırıldı." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
