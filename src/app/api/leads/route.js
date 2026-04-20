import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Lead from "@/models/Lead";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const fullName = String(data.fullName || "").trim();

    if (!fullName) {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }

    await dbConnect();
    const lead = await Lead.create({
      fullName,
      email: String(data.email || "").trim(),
      whatsapp: String(data.whatsapp || "").trim(),
      company: String(data.company || "").trim(),
      address: String(data.address || "").trim(),
      source: String(data.source || "manual").trim(),
      budget: String(data.budget || "").trim(),
      details: String(data.details || "").trim(),
      status: data.status || "customer",
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}
