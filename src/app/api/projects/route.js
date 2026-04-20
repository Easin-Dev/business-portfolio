import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const publicProjectFields = "title category image featured link description createdAt updatedAt";

function normalizeProjectPayload(data) {
  const payload = { ...data };

  if (payload.status === "completed" && !payload.completedAt) {
    payload.completedAt = new Date();
  }

  if (payload.status && payload.status !== "completed") {
    payload.completedAt = null;
  }

  if (Array.isArray(payload.tasks)) {
    payload.tasks = payload.tasks.map((task) => ({
      ...task,
      completedAt: task.done ? task.completedAt || new Date() : null,
    }));
  }

  return payload;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    await dbConnect();
    const isAdmin = session?.user?.role === "admin";
    const query = Project.find({}).sort({ createdAt: -1 });
    const projects = isAdmin ? await query : await query.select(publicProjectFields);

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const data = normalizeProjectPayload(await req.json());

    if (data.featured) {
      const featuredCount = await Project.countDocuments({ featured: true });
      if (featuredCount >= 4) {
        return NextResponse.json({ error: "Homepage limit reached (Max 4 featured projects)" }, { status: 400 });
      }
    }

    const project = await Project.create(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
