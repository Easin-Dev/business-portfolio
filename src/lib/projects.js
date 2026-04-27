import dbConnect from "./db";
import Project from "@/models/Project";

export async function getFeaturedProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({ featured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(4)
      .lean();
      
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export async function getAllProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();
      
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Error fetching all projects:", error);
    return [];
  }
}
