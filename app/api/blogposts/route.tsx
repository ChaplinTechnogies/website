import { NextRequest, NextResponse } from "next/server";
import { createBlogPost, getAllBlogPosts } from "@/lib/models/BlogPost";
import { authMiddleware } from "@/app/middleware/auth.middleware";

// Create new blog post
export async function POST(req: NextRequest) {
  const user = await authMiddleware(req, { roles: ["superadmin", "executive", "cto"] });
  if (user instanceof NextResponse ) return user;

  try {
    const body = await req.json();
    const blog = await createBlogPost(body);
    return NextResponse.json({blog, message:"Blog Created"}, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

//  Get all blog posts
export async function GET(req: NextRequest) {
  try {
    const blogs = await getAllBlogPosts();
    return NextResponse.json(blogs, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

