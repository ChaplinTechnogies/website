// /app/api/reply/route.ts
import { NextRequest, NextResponse } from "next/server";
import  getClientPromise  from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { sendEmail } from "@/lib/email";
import { authMiddleware } from "@/app/middleware/auth.middleware";

const COLLECTIONS: Record<string, string> = {
  contact: "contacts",
  subscriber: "subscribers",
};

export async function POST(req: NextRequest) {
  const auth = await authMiddleware(req, {roles: ['executive', "marketing"]});
  if (!auth) return NextResponse.json({ success: false, message: "No Authrized" }, { status: 401 });

  try {
    const { type, id, subject, message } = await req.json();
    if (!type || !id || !subject || !message) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const collectionName = COLLECTIONS[type];
    if (!collectionName) return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });

    const client = await getClientPromise();
    const db = client.db();

    const record = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    if (!record) return NextResponse.json({ success: false, message: `${type} not found` }, { status: 404 });


    const emailResult = await sendEmail({
      receiver: record.email,
      subject,
      message,
      name: "Sybella Support Team",
      company: record.company || "Sybella Systems",
      phone: record.phone || "+254 715 410 009",
    });

    if (!emailResult.success) return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });

    await db.collection("replies").insertOne({
      type,
      recordId: new ObjectId(id),
      email: record.email,
      subject,
      message,
      sentAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Reply sent successfully" });
  } catch (err) {
    console.error("Global reply error:", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
