import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { getBlogs, normalizeBlogPayload } from "@/lib/blogs";

// GET all blogs
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const status = searchParams.get("status") || "published";
    const slug = searchParams.get("slug");

    const blogs = await getBlogs({
      status,
      slug,
      featured: featured === null ? undefined : featured === "true",
    });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST new blog (Protected)
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    const payload = normalizeBlogPayload(data);
    const blog = await Blog.create(payload);
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
