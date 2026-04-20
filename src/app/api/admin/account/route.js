import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id).select("name email role createdAt");
    if (!user) {
      return NextResponse.json({ error: "Admin account not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch account" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim().toLowerCase();
    const currentPassword = String(data.currentPassword || "");
    const newPassword = String(data.newPassword || "");

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "Admin account not found" }, { status: 404 });
    }

    if (email !== user.email) {
      const existing = await User.findOne({ email, _id: { $ne: user._id } });
      if (existing) {
        return NextResponse.json({ error: "This email is already used" }, { status: 400 });
      }
    }

    user.name = name;
    user.email = email;

    if (newPassword) {
      if (newPassword.length < 8) {
        return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
      }

      const passwordOk = await bcrypt.compare(currentPassword, user.password);
      if (!passwordOk) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    return NextResponse.json({
      message: "Account updated",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update account" }, { status: 500 });
  }
}
