// app/api/staff/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { staffMemberQuery } from '@/lib/models/StaffMember';
import { authMiddleware} from '@/app/middleware/auth.middleware';

export async function GET(req: NextRequest) {
  const user = await authMiddleware(req, { roles: ["executive","superadmin", "manager"] });
  if (user instanceof NextResponse) return user;

  const queryObj = Object.fromEntries(req.nextUrl.searchParams.entries());

  const query = {
    ...queryObj,
    isActive: queryObj.isActive === "true" ? true : queryObj.isActive === "false" ? false : undefined,
  }

  try {
    const staffList = await staffMemberQuery(query);
    return NextResponse.json(staffList);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
