import { NextResponse } from "next/server";
import { checkAdminAccess } from "@/core/utils/admin-guard";
import { UserRepository } from "@/features/user/user.repository";
import { AdminAuditLogModel } from "@/features/admin/audit-log.model";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await checkAdminAccess();
  if (guard.error) return guard.error;

  try {
    const repository = new UserRepository();
    const user = await repository.getOne({ _id: (await params).id });
    if (!user) return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı." }, { status: 404 });

    const { password, ...safeUser } = user.toObject();
    return NextResponse.json({ success: true, user: safeUser });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await checkAdminAccess();
  if (guard.error) return guard.error;
  const admin = guard.admin;

  try {
    const body = await req.json();
    const repository = new UserRepository();
    const user = await repository.getOne({ _id: (await params).id });
    if (!user) return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı." }, { status: 404 });

    // Sadece belirli alanların güncellenmesine izin ver
    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;

    await user.save();

    await AdminAuditLogModel.create({
      adminId: admin._id,
      adminName: admin.name,
      action: "UPDATE_USER",
      targetId: user._id,
      targetType: "User",
      details: "Kullanıcı bilgileri güncellendi.",
    });

    return NextResponse.json({ success: true, message: "Kullanıcı güncellendi." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await checkAdminAccess();
  if (guard.error) return guard.error;
  const admin = guard.admin;

  try {
    const repository = new UserRepository();
    const user = await repository.getOne({ _id: (await params).id });
    if (!user) return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı." }, { status: 404 });

    // Admin cannot delete themselves
    if (user._id.toString() === admin._id.toString()) {
      return NextResponse.json({ success: false, error: "Kendi hesabınızı silemezsiniz." }, { status: 403 });
    }

    // Soft delete
    user.silindi_mi = true;
    user.status = "inactive";
    await user.save();

    await AdminAuditLogModel.create({
      adminId: admin._id,
      adminName: admin.name,
      action: "DELETE_USER",
      targetId: user._id,
      targetType: "User",
      details: "Kullanıcı silindi (soft delete).",
    });

    return NextResponse.json({ success: true, message: "Kullanıcı başarıyla silindi." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
