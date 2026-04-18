import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Agreement from "@/models/Agreement";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import crypto from "crypto";
// Force reload schema check

// GET all agreements (Admin Only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const agreements = await Agreement.find({}).sort({ createdAt: -1 });
    return NextResponse.json(agreements);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch agreements" }, { status: 500 });
  }
}

// POST create agreement (Admin Only)
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    // Generate a unique hash for the client link
    const uniqueHash = crypto.randomBytes(16).toString("hex");
    
    const agreement = await Agreement.create({
      ...data,
      uniqueHash,
      status: "pending_signature",
    });

    return NextResponse.json(agreement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
