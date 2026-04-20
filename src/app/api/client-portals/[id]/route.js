import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ClientPortal from "@/models/ClientPortal";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sendPortalEmail } from "@/lib/clientPortal";

function findPortal(id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return ClientPortal.findOne({ $or: [{ _id: id }, { portalHash: id }] });
  }

  return ClientPortal.findOne({ portalHash: id });
}

function getPaymentStatus(totalAmount, advancePaid) {
  if (advancePaid >= totalAmount) return "paid";
  if (advancePaid > 0) return "partial";
  return "unpaid";
}

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const portal = await findPortal(id);
    if (!portal) {
      return NextResponse.json({ error: "Portal not found" }, { status: 404 });
    }

    return NextResponse.json(portal);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch portal" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === "admin";

    await dbConnect();
    const portal = await findPortal(id);

    if (!portal) {
      return NextResponse.json({ error: "Portal not found" }, { status: 404 });
    }

    if (!isAdmin) {
      if (data.action !== "submit_requirement") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const requirement = portal.requirements.id(data.requirementId);
      if (!requirement) {
        return NextResponse.json({ error: "Requirement not found" }, { status: 404 });
      }

      requirement.clientResponse = data.clientResponse || "";
      requirement.attachments = data.attachments || [];
      requirement.status = "submitted";
      requirement.submittedAt = new Date();
      portal.status = "in_progress";
      portal.updates.unshift({
        title: "Client submitted a requirement",
        message: `${requirement.title} has been submitted by the client.`,
        visibility: "internal",
      });

      await portal.save();
      return NextResponse.json(portal);
    }

    if (data.action === "add_payment") {
      const payment = {
        label: data.label || "Payment",
        amount: Number(data.amount || 0),
        note: data.note || "",
        paidAt: data.paidAt || new Date(),
      };

      portal.paymentHistory.unshift(payment);
      portal.advancePaid = Number(portal.advancePaid || 0) + payment.amount;
      portal.dueAmount = Math.max(Number(portal.totalAmount || 0) - Number(portal.advancePaid || 0), 0);
      portal.paymentStatus = getPaymentStatus(Number(portal.totalAmount || 0), Number(portal.advancePaid || 0));
    } else if (data.action === "notify_client") {
      portal.updates.unshift({
        title: data.title || "Project update",
        message: data.message || "",
        visibility: "client",
      });

      await sendPortalEmail({
        to: portal.clientEmail,
        clientName: portal.clientName,
        projectTitle: portal.projectTitle,
        portalUrl: `${req.nextUrl.origin}/client-portal/${portal.portalHash}`,
        subject: data.subject || `Project portal update: ${portal.projectTitle}`,
        message: data.message,
      });
    } else {
      const allowedFields = [
        "clientName",
        "clientEmail",
        "projectTitle",
        "projectDescription",
        "services",
        "totalAmount",
        "advancePaid",
        "dueAmount",
        "paymentStatus",
        "paymentHistory",
        "progressStage",
        "progressPercent",
        "status",
        "requirements",
        "updates",
      ];

      allowedFields.forEach((field) => {
        if (data[field] !== undefined) {
          portal[field] = data[field];
        }
      });

      if (data.advancePaid !== undefined || data.totalAmount !== undefined) {
        portal.dueAmount = Math.max(Number(portal.totalAmount || 0) - Number(portal.advancePaid || 0), 0);
        portal.paymentStatus = getPaymentStatus(Number(portal.totalAmount || 0), Number(portal.advancePaid || 0));
      }
    }

    await portal.save();
    return NextResponse.json(portal);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
