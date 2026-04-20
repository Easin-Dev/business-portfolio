import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

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

// UPDATE Project
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const data = normalizeProjectPayload(await req.json());

    // Check featured limit
    if (data.featured === true) {
      const currentProject = await Project.findById(id);
      if (!currentProject) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }

      if (!currentProject.featured) {
        const featuredCount = await Project.countDocuments({ featured: true });
        if (featuredCount >= 4) {
          return NextResponse.json({ error: "Homepage limit reached (Max 4 featured projects)" }, { status: 400 });
        }
      }
    }

    const project = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE Project
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
