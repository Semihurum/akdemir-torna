import { NextResponse } from "next/server";
import { checkAdminAccess } from "@/core/utils/admin-guard";
import { UserRepository } from "@/features/user/user.repository";
import { AdminAuditLogModel } from "@/features/admin/audit-log.model";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await checkAdminAccess();
  if (guard.error) return guard.error;
  const admin = guard.admin;

  try {
    const body = await req.json();
    if (body.status !== "active" && body.status !== "inactive") {
      return NextResponse.json({ success: false, error: "Geçersiz durum." }, { status: 400 });
    }

    const repository = new UserRepository();
    const user = await repository.getOne({ _id: (await params).id });
    if (!user) return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı." }, { status: 404 });

    if (user._id.toString() === admin._id.toString() && body.status === "inactive") {
      return NextResponse.json({ success: false, error: "Kendi hesabınızı pasifleştiremezsiniz." }, { status: 403 });
    }

    const oldStatus = user.status;
    user.status = body.status;
    await user.save();

    await AdminAuditLogModel.create({
      adminId: admin._id,
      adminName: admin.name,
      action: "CHANGE_STATUS",
      targetId: user._id,
      targetType: "User",
      details: `Durum değiştirildi: ${oldStatus} -> ${body.status}`,
    });

    return NextResponse.json({ success: true, message: "Kullanıcı durumu güncellendi." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
