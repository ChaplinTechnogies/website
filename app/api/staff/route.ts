// app/api/staff/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { staffMemberQuery } from '@/lib/models/StaffMember';
import { authMiddleware, adminMiddleware } from '@/app/middleware/auth.middleware';

export async function GET(req: NextRequest) {
  await authMiddleware(req);
  await adminMiddleware(req);

  const query = Object.fromEntries(req.nextUrl.searchParams.entries());

  try {
    const staffList = await staffMemberQuery(query);
    return NextResponse.json(staffList);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
