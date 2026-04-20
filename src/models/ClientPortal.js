import mongoose from "mongoose";

const PortalAttachmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "application/octet-stream",
  },
  size: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    enum: ["image", "file"],
    default: "file",
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: true });

const PortalRequirementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["text", "file", "image", "url", "access"],
    default: "text",
  },
  status: {
    type: String,
    enum: ["requested", "submitted", "approved", "needs_changes"],
    default: "requested",
  },
  clientResponse: {
    type: String,
    default: "",
  },
  adminNote: {
    type: String,
    default: "",
  },
  attachments: {
    type: [PortalAttachmentSchema],
    default: [],
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  submittedAt: {
    type: Date,
    default: null,
  },
  reviewedAt: {
    type: Date,
    default: null,
  },
}, { _id: true });

const PortalUpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  visibility: {
    type: String,
    enum: ["client", "internal"],
    default: "client",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: true });

const PortalPaymentSchema = new mongoose.Schema({
  label: {
    type: String,
    default: "Payment",
  },
  amount: {
    type: Number,
    default: 0,
  },
  note: {
    type: String,
    default: "",
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: true });

const ClientPortalSchema = new mongoose.Schema({
  agreementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agreement",
    required: true,
    unique: true,
  },
  portalHash: {
    type: String,
    unique: true,
    required: true,
  },
  clientName: {
    type: String,
    default: "",
  },
  clientEmail: {
    type: String,
    default: "",
  },
  projectTitle: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    default: "",
  },
  services: {
    type: [String],
    default: [],
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  advancePaid: {
    type: Number,
    default: 0,
  },
  dueAmount: {
    type: Number,
    default: 0,
  },
  paymentStatus: {
    type: String,
    enum: ["unpaid", "partial", "paid"],
    default: "unpaid",
  },
  paymentHistory: {
    type: [PortalPaymentSchema],
    default: [],
  },
  progressStage: {
    type: String,
    enum: ["requirements", "planning", "design", "development", "review", "revision", "delivery", "completed"],
    default: "requirements",
  },
  progressPercent: {
    type: Number,
    min: 0,
    max: 100,
    default: 5,
  },
  status: {
    type: String,
    enum: ["active", "waiting_client", "in_progress", "completed", "paused"],
    default: "waiting_client",
  },
  requirements: {
    type: [PortalRequirementSchema],
    default: [],
  },
  updates: {
    type: [PortalUpdateSchema],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.ClientPortal || mongoose.model("ClientPortal", ClientPortalSchema);
