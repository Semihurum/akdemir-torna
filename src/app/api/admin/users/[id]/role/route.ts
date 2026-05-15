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
    if (body.role !== "admin" && body.role !== "user") {
      return NextResponse.json({ success: false, error: "Geçersiz rol." }, { status: 400 });
    }

    const repository = new UserRepository();
    const user = await repository.getOne({ _id: (await params).id });
    if (!user) return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı." }, { status: 404 });

    // Prevent removing the last admin or changing own role
    if (user._id.toString() === admin._id.toString()) {
      return NextResponse.json({ success: false, error: "Kendi rolünüzü değiştiremezsiniz." }, { status: 403 });
    }

    const oldRole = user.role;
    user.role = body.role;
    await user.save();

    await AdminAuditLogModel.create({
      adminId: admin._id,
      adminName: admin.name,
      action: "CHANGE_ROLE",
      targetId: user._id,
      targetType: "User",
      details: `Rol değiştirildi: ${oldRole} -> ${body.role}`,
    });

    return NextResponse.json({ success: true, message: "Kullanıcı rolü güncellendi." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
