import crypto from "crypto";
import nodemailer from "nodemailer";
import ClientPortal from "@/models/ClientPortal";

export function getDefaultRequirements(agreement) {
  const serviceText = (agreement.services || []).join(" ").toLowerCase();
  const titleText = `${agreement.projectTitle || ""} ${agreement.projectDescription || ""}`.toLowerCase();
  const text = `${serviceText} ${titleText}`;

  if (text.includes("marketing") || text.includes("ads") || text.includes("meta") || text.includes("facebook")) {
    return [
      { title: "Facebook page link", description: "Share the official Facebook page URL.", type: "url" },
      { title: "Meta Business access", description: "Invite us to your Business Manager or share access instructions.", type: "access" },
      { title: "Ad account access", description: "Provide ad account access or the ad account ID.", type: "access" },
      { title: "Offer and target audience", description: "Tell us the offer, target location, audience, and campaign goal.", type: "text" },
      { title: "Creative assets", description: "Upload product images, videos, logos, and previous ad creatives.", type: "file" },
    ];
  }

  if (text.includes("whatsapp") || text.includes("chatbot") || text.includes("bot")) {
    return [
      { title: "WhatsApp Business number", description: "Share the number that will be used for automation.", type: "text" },
      { title: "Facebook Business access", description: "Invite us to the connected Business Manager if required.", type: "access" },
      { title: "FAQ list", description: "Submit common questions and the exact answers customers should receive.", type: "text" },
      { title: "Conversation flow", description: "Describe menus, booking flow, order flow, or support handoff rules.", type: "text" },
      { title: "Product or service list", description: "Upload or write the products/services the bot should know.", type: "file" },
    ];
  }

  return [
    { title: "Business name and contact info", description: "Submit business name, phone, email, address, and social links.", type: "text" },
    { title: "Logo and brand assets", description: "Upload logo, brand colors, fonts, and any existing brand guideline.", type: "file" },
    { title: "Website pages and content", description: "List required pages and provide content for each page.", type: "text" },
    { title: "Images and banners", description: "Upload hero images, product photos, team photos, or banners.", type: "image" },
    { title: "Domain and hosting access", description: "Share access instructions or invite our email where possible.", type: "access" },
    { title: "Reference websites", description: "Share 2-5 websites you like and what you like about them.", type: "url" },
  ];
}

export async function createPortalForAgreement(agreement) {
  const existing = await ClientPortal.findOne({ agreementId: agreement._id });
  if (existing) return existing;

  const totalAmount = Number(agreement.price || 0);
  const portalHash = crypto.randomBytes(18).toString("hex");

  return ClientPortal.create({
    agreementId: agreement._id,
    portalHash,
    clientName: agreement.clientName || "",
    clientEmail: agreement.clientEmail || "",
    clientPhone: agreement.clientPhone || "",
    clientCompany: agreement.clientCompany || "",
    clientAddress: agreement.clientAddress || "",
    clientWhatsApp: agreement.clientWhatsApp || "",
    projectTitle: agreement.projectTitle,
    projectDescription: agreement.projectDescription || "",
    services: agreement.services || [],
    totalAmount,
    advancePaid: 0,
    dueAmount: totalAmount,
    paymentStatus: totalAmount > 0 ? "unpaid" : "paid",
    requirements: getDefaultRequirements(agreement),
    updates: [
      {
        title: "Project portal created",
        message: "Please submit the requested information so we can move to the next step.",
        visibility: "client",
      },
    ],
  });
}

export async function sendPortalEmail({ to, clientName, projectTitle, portalUrl, subject, message }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !to) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ScaleUp Web" <${process.env.EMAIL_USER}>`,
    to,
    subject: subject || `Project portal update: ${projectTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #1f2937; max-width: 620px; margin: auto; border: 1px solid #eee; padding: 24px; border-radius: 14px;">
        <h2 style="color: #6d28d9; margin-top: 0;">Project Portal Update</h2>
        <p>Hi <b>${clientName || "Client"}</b>,</p>
        <p>${message || `Your project portal for <b>${projectTitle}</b> has a new update.`}</p>
        <p style="text-align: center; margin: 28px 0;">
          <a href="${portalUrl}" style="background: #6d28d9; color: white; padding: 13px 22px; text-decoration: none; border-radius: 10px; font-weight: bold;">Open Client Portal</a>
        </p>
        <p style="font-size: 12px; color: #64748b;">If the button does not work, open this link: ${portalUrl}</p>
      </div>
    `,
  });
}
