import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const client = await clientPromise();
    const db = client.db("newsletterDB");
    const collection = db.collection("subscribers");

    const existing = await collection.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Already subscribed" }, { status: 200 });
    }

    await collection.insertOne({ email, subscribedAt: new Date() });
    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
