// app/api/staff/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createStaffMember } from '@/lib/models/StaffMember';
import { authMiddleware, adminMiddleware } from '@/app/middleware/auth.middleware';
import { ZodError } from 'zod';
export async function POST(req: NextRequest) {
  await authMiddleware(req);
  await adminMiddleware(req);

  const body = await req.json();

  try {
    const staff = await createStaffMember(body);
    return NextResponse.json(staff, { status: 201 });
  } catch (err: any) {

    if (err instanceof ZodError) {
      const errors = err.format();
      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

