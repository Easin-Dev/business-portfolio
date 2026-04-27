import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Agreement from "@/models/Agreement";
import ClientPortal from "@/models/ClientPortal";
import Lead from "@/models/Lead";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import nodemailer from "nodemailer";
import { createPortalForAgreement, sendPortalEmail } from "@/lib/clientPortal";

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

    const portal = await ClientPortal.findOne({ agreementId: agreement._id }).select("portalHash");

    return NextResponse.json({
      ...agreement.toObject(),
      portalHash: portal?.portalHash || null,
    });
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

    if (!data.clientName || !data.clientEmail || !data.clientPhone || !data.clientCompany || !data.signatureData) {
      return NextResponse.json({ error: "Client name, email, phone, business name, and signature are required" }, { status: 400 });
    }

    // Update agreement with client-provided identity
    agreement.clientName = data.clientName;
    agreement.clientEmail = data.clientEmail;
    agreement.clientPhone = data.clientPhone;
    agreement.clientWhatsApp = data.clientWhatsApp || data.clientPhone;
    agreement.clientCompany = data.clientCompany;
    agreement.clientAddress = data.clientAddress || "";
    agreement.preferredContact = data.preferredContact || "phone";
    agreement.signatureData = data.signatureData;
    agreement.status = "signed";
    agreement.signedAt = new Date();
    await agreement.save();

    const leadDetails = [
      `Agreement signed for ${agreement.projectTitle}.`,
      agreement.projectDescription ? `Project: ${agreement.projectDescription}` : "",
      agreement.services?.length ? `Services: ${agreement.services.join(", ")}` : "",
      agreement.timeline ? `Timeline: ${agreement.timeline}` : "",
      agreement.preferredContact ? `Preferred contact: ${agreement.preferredContact}` : "",
    ].filter(Boolean).join("\n");

    const existingLead = await Lead.findOne({
      $or: [
        { agreementId: agreement._id.toString() },
        { email: agreement.clientEmail },
      ],
    });

    const leadPayload = {
      fullName: agreement.clientName,
      email: agreement.clientEmail,
      whatsapp: agreement.clientWhatsApp || agreement.clientPhone,
      company: agreement.clientCompany || "",
      address: agreement.clientAddress || "",
      source: "agreement",
      agreementId: agreement._id.toString(),
      projectTitle: agreement.projectTitle,
      services: agreement.services || [],
      timeline: agreement.timeline || "",
      budget: `৳${Number(agreement.price || 0).toLocaleString()}`,
      details: leadDetails,
      sourcePage: `/agreement/${agreement.uniqueHash}`,
      status: "customer",
    };

    if (existingLead) {
      await Lead.findByIdAndUpdate(existingLead._id, leadPayload, { runValidators: true });
    } else {
      await Lead.create(leadPayload);
    }

    const portal = await createPortalForAgreement(agreement);
    const portalUrl = `${req.nextUrl.origin}/client-portal/${portal.portalHash}`;

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
          <p><b>Client phone:</b> ${agreement.clientPhone || "N/A"}</p>
          <p><b>Business:</b> ${agreement.clientCompany || "N/A"}</p>
          <p><b>Address:</b> ${agreement.clientAddress || "N/A"}</p>
          <p>This marks the official start of our collaboration. We are thrilled to help you scale up your digital presence!</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 14px; color: #666;">You can download your copy of the agreement from the link you used for signing at any time.</p>
          <p style="font-size: 14px; color: #666;">Your client project portal is ready. Please open the portal and submit the requested project materials.</p>
          <p style="text-align: center; margin-top: 30px;">
            <a href="${req.nextUrl.origin}/agreement/${agreement.uniqueHash}" style="background: #6d28d9; color: white; padding: 12px 24px; text-decoration: none; rounded: 5px; font-weight: bold;">View Signed Agreement</a>
          </p>
          <p style="text-align: center; margin-top: 12px;">
            <a href="${portalUrl}" style="background: #111827; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Open Client Portal</a>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <div style="text-align: center;">
            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Connect with ScaleUp Web:</p>
            <div style="margin-bottom: 20px;">
              <a href="https://www.facebook.com/scaleupweb1" style="display: inline-block; margin: 0 10px; text-decoration: none; color: #1877F2; font-weight: bold;">Facebook</a>
              <a href="https://www.linkedin.com/company/scale-up-web/" style="display: inline-block; margin: 0 10px; text-decoration: none; color: #0A66C2; font-weight: bold;">LinkedIn</a>
              <a href="https://wa.me/your-number-here" style="display: inline-block; margin: 0 10px; text-decoration: none; color: #25D366; font-weight: bold;">WhatsApp</a>
            </div>
            <p style="font-size: 11px; color: #999;">&copy; ${new Date().getFullYear()} ScaleUp Web. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    await sendPortalEmail({
      to: agreement.clientEmail,
      clientName: agreement.clientName,
      projectTitle: agreement.projectTitle,
      portalUrl,
      subject: `Client portal ready: ${agreement.projectTitle}`,
      message: `Your project portal for <b>${agreement.projectTitle}</b> is ready. Please submit the requested information and files so we can move to the next step.`,
    });

    return NextResponse.json({ message: "Agreement signed, portal created, and email sent successfully!", portalHash: portal.portalHash });
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
