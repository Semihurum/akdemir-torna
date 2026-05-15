import { NextResponse } from "next/server";
import { checkAdminAccess } from "@/core/utils/admin-guard";
import { UserRepository } from "@/features/user/user.repository";

export async function GET(req: Request) {
  const guard = await checkAdminAccess();
  if (guard.error) return guard.error;

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";
    const status = searchParams.get("status") || "";

    const query: any = { silindi_mi: false };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }
    if (role) query.role = role;
    if (status) {
      if (status === "banned") query.is_banned = true;
      else if (status === "active" || status === "inactive") query.status = status;
    }

    const repository = new UserRepository();
    // In a real app we would paginate, but for now fetch all matches
    const users = await repository.getMany(query);
    
    // Omit passwords
    const safeUsers = users.map(u => {
      const { password, ...safeUser } = u.toObject();
      return safeUser;
    });

    return NextResponse.json({ success: true, users: safeUsers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
