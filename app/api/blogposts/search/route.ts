import { NextRequest, NextResponse } from "next/server";
import { searchBlogPosts } from "@/lib/models/BlogPost";
import { authMiddleware } from "@/app/middleware/auth.middleware";

export async function GET(req: NextRequest) {
//   await authMiddleware(req);

  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q") || "";
  const author = searchParams.get("author") || undefined;
  const tags = searchParams.get("tags")?.split(",") || [];

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const blogs = await searchBlogPosts(query, { tags, author }, page, limit);

  return NextResponse.json(blogs);
}
