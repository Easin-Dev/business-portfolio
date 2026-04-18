import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    await dbConnect();
    const total = await Lead.countDocuments({});
    return NextResponse.json({ total });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch lead count" }, { status: 500 });
  }
}
