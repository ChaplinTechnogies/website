
import { NextRequest, NextResponse } from 'next/server';
import { getStaffMemberOut, updateStaffMember } from '@/lib/models/StaffMember';
import { authMiddleware, adminMiddleware } from '@/app/middleware/auth.middleware';
import { ZodError, z } from 'zod';
import { staffMemberSelfUpdateSchema, staffMemberUpdateSchema } from '@/app/schemas/user.schema';
// get staff individual staff member

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await authMiddleware(req);
  await adminMiddleware(req);

  try {
    const staff = await getStaffMemberOut(params.id);
    return NextResponse.json(staff);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
}

// Updating staff member

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
//   await authMiddleware(req);
//   await adminMiddleware(req);

  const body = await req.json();
  try {
    const parsed = staffMemberUpdateSchema.parse(JSON.parse(JSON.stringify(body)))
    // console.log("PARSED", parsed)
    // console.log("USER ID IS", params.id)
    // console.log("ROLE TYPE:", typeof body, body);
    // console.log("REQ BODY KEYS:", Object.keys(body));

    // console.log(parsed)
    const parsedBody = {
    names: body.names || "",
    email: body.email || "",
    role: body.role || "",
    isActive: body.isActive,
    phone: body.phone || "",
    };

    console.log("BODY IS:", JSON.parse(JSON.stringify(parsedBody)));

    const updatedStaff = await updateStaffMember(params.id, parsedBody);

    return NextResponse.json(updatedStaff);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
    // console.error("Zod validation errors:", err.format());  //  clearer log
    return NextResponse.json({ error: err.format() }, { status: 400 });
  }
//   console.error("Unexpected error:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

