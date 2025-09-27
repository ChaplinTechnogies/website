// app/api/staff/self/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { selfUpdateStaffMember } from '@/lib/models/StaffMember';
import { authMiddleware } from '@/app/middleware/auth.middleware';

export async function PATCH(req: NextRequest) {
  const userId = await authMiddleware(req);
  const body = await req.json();

  try {
    const updatedStaff = await selfUpdateStaffMember(userId, body);
    return NextResponse.json(updatedStaff);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
