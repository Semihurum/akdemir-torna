const fs = require('fs');
const path = require('path');

const quoteStatusContent = `import { NextResponse } from 'next/server';
import { QuoteManager } from '@/features/quote/quote.manager';
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const manager = new QuoteManager();
    const quote = await manager.getOne({ _id: id });
    if (!quote) return NextResponse.json({ success: false }, { status: 404 });
    
    quote.status = body.status;
    await quote.save();
    return NextResponse.json({ success: true, data: quote });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}`;

const quoteReadContent = `import { NextResponse } from 'next/server';
import { QuoteManager } from '@/features/quote/quote.manager';
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const manager = new QuoteManager();
    const quote = await manager.getOne({ _id: id });
    if (!quote) return NextResponse.json({ success: false }, { status: 404 });
    
    quote.isRead = body.isRead;
    await quote.save();
    return NextResponse.json({ success: true, data: quote });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}`;

const quoteArchiveContent = `import { NextResponse } from 'next/server';
import { QuoteManager } from '@/features/quote/quote.manager';
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const manager = new QuoteManager();
    const quote = await manager.getOne({ _id: id });
    if (!quote) return NextResponse.json({ success: false }, { status: 404 });
    
    quote.silindi_mi = body.archive;
    await quote.save();
    return NextResponse.json({ success: true, data: quote });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}`;

const quoteDeleteContent = `import { NextResponse } from 'next/server';
import { QuoteManager } from '@/features/quote/quote.manager';
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const manager = new QuoteManager();
    const quote = await manager.getOne({ _id: id });
    if (!quote) return NextResponse.json({ success: false }, { status: 404 });
    
    quote.silindi_mi = true;
    await quote.save();
    return NextResponse.json({ success: true, data: quote });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}`;

const quoteNoteContent = `import { NextResponse } from 'next/server';
import { QuoteManager } from '@/features/quote/quote.manager';
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const manager = new QuoteManager();
    const quote = await manager.getOne({ _id: id });
    if (!quote) return NextResponse.json({ success: false }, { status: 404 });
    
    quote.adminNote = body.adminNote;
    await quote.save();
    return NextResponse.json({ success: true, data: quote });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}`;

fs.writeFileSync('src/app/api/admin/quotes/[id]/status/route.ts', quoteStatusContent);
fs.writeFileSync('src/app/api/admin/quotes/[id]/read/route.ts', quoteReadContent);
fs.writeFileSync('src/app/api/admin/quotes/[id]/archive/route.ts', quoteArchiveContent);
fs.writeFileSync('src/app/api/admin/quotes/[id]/note/route.ts', quoteNoteContent);
fs.writeFileSync('src/app/api/admin/quotes/[id]/route.ts', quoteDeleteContent);


const notifReadContent = `import { NextResponse } from 'next/server';
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { AdminNotificationModel } = await import('@/features/admin/notification.model');
    const notif = await AdminNotificationModel.findById(id);
    if (!notif) return NextResponse.json({ success: false }, { status: 404 });
    notif.is_read = body.isRead;
    await notif.save();
    return NextResponse.json({ success: true, data: notif });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}`;

const notifArchiveContent = `import { NextResponse } from 'next/server';
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { AdminNotificationModel } = await import('@/features/admin/notification.model');
    const notif = await AdminNotificationModel.findById(id);
    if (!notif) return NextResponse.json({ success: false }, { status: 404 });
    notif.archived_at = body.archive ? new Date() : undefined;
    await notif.save();
    return NextResponse.json({ success: true, data: notif });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}`;

const notifDeleteContent = `import { NextResponse } from 'next/server';
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
}`;

const notifGetAllContent = `import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  try {
    const { AdminNotificationModel } = await import('@/features/admin/notification.model');
    const notifs = await AdminNotificationModel.find({ deleted_at: { $exists: false } }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notifs });
  } catch (e: any) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}`;


fs.writeFileSync('src/app/api/admin/notifications/[id]/read/route.ts', notifReadContent);
fs.writeFileSync('src/app/api/admin/notifications/[id]/archive/route.ts', notifArchiveContent);
fs.writeFileSync('src/app/api/admin/notifications/[id]/route.ts', notifDeleteContent);
fs.writeFileSync('src/app/api/admin/notifications/route.ts', notifGetAllContent);

console.log('Endpoints written.');
