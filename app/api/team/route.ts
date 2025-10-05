import { NextRequest, NextResponse } from "next/server";
import {
  createTeamMember,
  getAllTeamMembers,
} from "@/lib/models/TeamMember";
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
    const authResponse = await authMiddleware(req, { roles: ["executive"] });

    if (authResponse) return authResponse;

    const body = await req.json();
    const { name, role, image, linkedin, twitter, github } = body;

    if (!name || !role || !image) {
      return NextResponse.json(
        { success: false, message: "name, role, and image are required" },
        { status: 400 }
      );
    }

    const id = await createTeamMember({ name, role, image, linkedin, twitter, github });
    return NextResponse.json({ success: true, id, message: "Team member created" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
