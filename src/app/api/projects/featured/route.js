import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";

export async function GET() {
  try {
    await dbConnect();
    // Fetch only featured projects, limit to 4, sorted by newest
    const projects = await Project.find({ featured: true })
      .sort({ updatedAt: -1 })
      .limit(4)
      .select("title category image featured link description createdAt updatedAt");
    
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch featured projects" }, { status: 500 });
  }
}
