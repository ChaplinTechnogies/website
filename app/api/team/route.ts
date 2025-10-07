import { NextRequest, NextResponse } from "next/server";
import { createTeamMember, getAllTeamMembers } from "@/lib/models/TeamMember";
import { authMiddleware } from "@/app/middleware/auth.middleware";

export async function GET() {
  try {
    const members = await getAllTeamMembers();
    return NextResponse.json({ success: true, members }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req, { roles: ["executive"] });

    // 🔒 If middleware returned a NextResponse, it means auth failed
    if (authResult instanceof NextResponse) return authResult;

    // ✅ Otherwise, authResult contains user info
    const { id: userId, role: userRole } = authResult;
    console.log("Authenticated as:", userId, userRole);

    const body = await req.json();
    const { name, role, image, linkedin, twitter, github } = body;

    if (!name || !role || !image) {
      return NextResponse.json(
        { success: false, message: "name, role, and image are required" },
        { status: 400 }
      );
    }

    const newMemberId = await createTeamMember({
      name,
      role,
      image,
      linkedin,
      twitter,
      github,
    });

    return NextResponse.json(
      {
        success: true,
        createdBy: userId,
        id: newMemberId,
        message: "Team member created successfully",
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
