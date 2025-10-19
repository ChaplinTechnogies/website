// app/api/staff/route.ts
import { NextRequest, NextResponse } from "next/server";
import { staffMemberQuery } from "@/lib/models/StaffMember";
import { authMiddleware } from "@/app/middleware/auth.middleware";

export async function GET(req: NextRequest) {
  const user = await authMiddleware(req, {
    roles: ["executive", "superadmin", "manager", "marketing", "qa-tester"],
  });
  if (user instanceof NextResponse) return user;

  const queryObj = Object.fromEntries(req.nextUrl.searchParams.entries());

  const query = {
    ...queryObj,
    isActive:
      queryObj.isActive === "true"
        ? true
        : queryObj.isActive === "false"
        ? false
        : undefined,
  };

  try {
    let staffList = await staffMemberQuery(query);

    staffList = staffList.map((staff) => ({
      ...staff,
      _id: staff._id.toString(),
    }));

    return NextResponse.json(staffList);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
