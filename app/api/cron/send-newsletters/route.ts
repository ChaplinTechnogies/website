import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise();
    const db = client.db("newsletterDB");
    const collection = db.collection("subscribers");
    const subscribers = await collection.find().toArray();

    if (!subscribers.length) {
      return NextResponse.json({ message: "No subscribers found" }, { status: 200 });
    }

    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Loop through all subscribers and send the newsletter
    for (const user of subscribers) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your Weekly Newsletter 📰",
        text: "Hello! Here’s this week’s newsletter from our website 🎉",
      });
    }

    return NextResponse.json({ message: "Newsletter sent successfully" });
  } catch (error: any) {
    console.error("❌ Error sending newsletter:", error);
    return NextResponse.json({ error: "Failed to send newsletters" }, { status: 500 });
  }
}
