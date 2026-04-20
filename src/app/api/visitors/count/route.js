import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/db";
import { authOptions } from "@/lib/auth";
import Visitor from "@/models/Visitor";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const total = await Visitor.countDocuments({});
    const knownLeads = await Visitor.countDocuments({ "lead.email": { $exists: true, $ne: "" } });

    return NextResponse.json({ total, knownLeads });
  } catch (error) {
    console.error("Visitor count error:", error);
    return NextResponse.json({ error: "Failed to fetch visitor count" }, { status: 500 });
  }
}
