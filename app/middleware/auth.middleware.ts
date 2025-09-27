import { NextRequest } from "next/server";
import dotenv from 'dotenv'

import  jwt from "jsonwebtoken";

dotenv.config()

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || "";
const ADMIN_ROLES = ['executive', 'superadmin', 'cto'];

export async function authMiddleware(req: NextRequest) {
    const authHeader = req.headers.get("Authorization");

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error ("Unauthorized: Missing Token")
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {id: string, role: string}
        return decoded.id;
    } catch (err) {
        throw new Error ("Invalid or Expred Token")
    }
}


export async function adminMiddleware(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized: Missing token');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    if (!ADMIN_ROLES.includes(decoded.role)) {
      throw new Error('Forbidden: Admins only');
    }
    return decoded.id;
  } catch (err) {
    throw new Error('Unauthorized: Invalid token');
  }
}