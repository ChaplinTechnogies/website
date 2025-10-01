import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getStaffMemberOut } from "@/lib/models/StaffMember";

export async function GET(req: NextRequest) {
  try {
    const token = localStorage.getItem("adminToken");

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const staff = await getStaffMemberOut(payload.id);

    if (!staff) return NextResponse.json({ error: "Staff not found" }, { status: 404 });

    return NextResponse.json({
      id: staff.id,
      name: staff.names,
      email: staff.email,
      role: staff.role,
    });
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
