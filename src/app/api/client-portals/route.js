import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Agreement from "@/models/Agreement";
import ClientPortal from "@/models/ClientPortal";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createPortalForAgreement } from "@/lib/clientPortal";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const portals = await ClientPortal.find({}).sort({ updatedAt: -1 });
    return NextResponse.json(portals);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch client portals" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await dbConnect();

    const agreement = await Agreement.findById(data.agreementId);
    if (!agreement) {
      return NextResponse.json({ error: "Agreement not found" }, { status: 404 });
    }

    if (agreement.status !== "signed") {
      return NextResponse.json({ error: "Agreement must be signed before creating a portal" }, { status: 400 });
    }

    const portal = await createPortalForAgreement(agreement);
    return NextResponse.json(portal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
