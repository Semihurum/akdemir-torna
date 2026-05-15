import { NextResponse } from 'next/server';
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { AdminNotificationModel } = await import('@/features/admin/notification.model');
    const notif = await AdminNotificationModel.findById(id);
    if (!notif) return NextResponse.json({ success: false }, { status: 404 });
    notif.deleted_at = new Date();
    await notif.save();
    return NextResponse.json({ success: true, data: notif });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}