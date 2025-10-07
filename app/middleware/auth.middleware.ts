import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || "";

type MiddlewareOptions = {
  roles?: string[];
};

export async function authMiddleware(req: NextRequest, options?: MiddlewareOptions) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };


    if (options?.roles && !options.roles.includes("*") && !options.roles.includes(decoded.role)) {
      return NextResponse.json({ error: "Forbidden: Insufficient role" }, { status: 403 });
    }


    (req as any).user = decoded;


    return { id: decoded.id, role: decoded.role };
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
  }
}
