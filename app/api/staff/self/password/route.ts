// app/api/staff/self/password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { updateStaffPassword } from '@/lib/models/StaffMember';
import { authMiddleware } from '@/app/middleware/auth.middleware';

export async function PATCH(req: NextRequest) {
  const userId = await authMiddleware(req);
  const body = await req.json();

  try {
    await updateStaffPassword(userId, body);
    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

