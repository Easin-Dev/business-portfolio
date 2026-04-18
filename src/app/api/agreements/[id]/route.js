import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Agreement from "@/models/Agreement";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import nodemailer from "nodemailer";

// GET individual agreement (Public or Admin)
export async function GET(req, { params }) {
  try {
    const { id } = await params; // This can be the uniqueHash or the MongoDB ID
    await dbConnect();

    // Try finding by hash first (for public access)
    let agreement = await Agreement.findOne({ uniqueHash: id });
    
    // If not found by hash, try finding by ID (for admin/dashboard access)
    if (!agreement && id.match(/^[0-9a-fA-F]{24}$/)) {
      agreement = await Agreement.findById(id);
    }

    if (!agreement) {
      return NextResponse.json({ error: "Agreement not found" }, { status: 404 });
    }

    return NextResponse.json(agreement);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch agreement" }, { status: 500 });
  }
}

// PUT sign agreement (Public)
export async function PUT(req, { params }) {
  try {
    const { id } = await params; // Hash
    const data = await req.json(); // { signatureData: "..." }

    await dbConnect();
    const agreement = await Agreement.findOne({ uniqueHash: id });

    if (!agreement) {
      return NextResponse.json({ error: "Agreement not found" }, { status: 404 });
    }

    if (agreement.status === "signed") {
      return NextResponse.json({ error: "Agreement already signed" }, { status: 400 });
    }

    // Update agreement with client-provided identity
    agreement.clientName = data.clientName;
    agreement.clientEmail = data.clientEmail;
    agreement.signatureData = data.signatureData;
    agreement.status = "signed";
    agreement.signedAt = new Date();
    await agreement.save();

    // Send Confirmation Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"ScaleUp Web" <${process.env.EMAIL_USER}>`,
      to: agreement.clientEmail,
      subject: `Project Agreement Signed: ${agreement.projectTitle} 🎉`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #6d28d9; text-align: center;">Congratulations!</h2>
          <p>Hi <b>${agreement.clientName || "Client"}</b>,</p>
          <p>We are excited to confirm that the project agreement for <b>"${agreement.projectTitle}"</b> has been successfully signed.</p>
          <p>This marks the official start of our collaboration. We are thrilled to help you scale up your digital presence!</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 14px; color: #666;">You can download your copy of the agreement from the link you used for signing at any time.</p>
          <p style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXTAUTH_URL}/agreement/${agreement.uniqueHash}" style="background: #6d28d9; color: white; padding: 12px 24px; text-decoration: none; rounded: 5px; font-weight: bold;">View Signed Agreement</a>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Agreement signed and email sent successfully!" });
  } catch (error) {
    console.error("Signing Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE agreement (Admin Only)
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    await Agreement.findByIdAndDelete(id);

    return NextResponse.json({ message: "Agreement deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
