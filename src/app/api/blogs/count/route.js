import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await dbConnect();
    const count = await Blog.countDocuments({ status: "published" });
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch count" }, { status: 500 });
  }
}
