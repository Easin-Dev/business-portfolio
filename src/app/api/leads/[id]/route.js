import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/db";
import { authOptions } from "@/lib/auth";
import Lead from "@/models/Lead";

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();
    await dbConnect();

    const allowedFields = ["fullName", "email", "whatsapp", "company", "address", "source", "agreementId", "projectTitle", "services", "timeline", "budget", "details", "status"];
    const patch = {};

    allowedFields.forEach((field) => {
      if (data[field] !== undefined) {
        patch[field] = typeof data[field] === "string" ? data[field].trim() : data[field];
      }
    });

    if (patch.fullName === "") {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }

    const lead = await Lead.findByIdAndUpdate(id, patch, { new: true, runValidators: true });
    if (!lead) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Customer deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}
