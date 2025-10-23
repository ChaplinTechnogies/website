import { NextResponse } from "next/server";
import { createUpdate, getAllUpdates } from "@/lib/models/Update";

export async function GET() {
  try {
    const updates = await getAllUpdates();
    return NextResponse.json(updates, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const update = await createUpdate(data);
    return NextResponse.json(update, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
