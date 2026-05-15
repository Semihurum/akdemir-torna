import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  try {
    const { AdminNotificationModel } = await import('@/features/admin/notification.model');
    const notifs = await AdminNotificationModel.find({ deleted_at: { $exists: false } }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notifs });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}