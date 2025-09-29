import { NextRequest, NextResponse } from "next/server";
import { getBlogPostBySlug, updateBlogPost, deleteBlogPost } from "@/lib/models/BlogPost";
import { authMiddleware } from "@/app/middleware/auth.middleware";

//  Get single blog post
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const blog = await getBlogPostBySlug(params.slug);
    if (!blog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

//  Update blog post
export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
  const user = await authMiddleware(req, { roles: ["superadmin", "executive", "cto"] });
  if (user instanceof NextResponse) return user;

  try {
    const body = await req.json();
    const updated = await updateBlogPost(params.slug, body);
    if (!updated) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Delete blog post
export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  const user = await authMiddleware(req, { roles: ["superadmin", "executive"] });
  if (user instanceof NextResponse) return user;

  try {
    const deleted = await deleteBlogPost(params.slug);
    if (!deleted) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Blog post deleted" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
