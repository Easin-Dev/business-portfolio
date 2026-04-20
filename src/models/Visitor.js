import mongoose from "mongoose";

const PageViewSchema = new mongoose.Schema(
  {
    path: String,
    referrer: String,
    visitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const VisitorSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      index: true,
    },
    ipAddress: String,
    userAgent: String,
    language: String,
    timezone: String,
    screen: String,
    deviceType: String,
    referrer: String,
    landingPage: String,
    lastPage: String,
    visitCount: {
      type: Number,
      default: 1,
    },
    pageViews: {
      type: [PageViewSchema],
      default: [],
    },
    lead: {
      fullName: String,
      email: String,
      phone: String,
      submittedAt: Date,
    },
    firstSeenAt: {
      type: Date,
      default: Date.now,
    },
    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

VisitorSchema.index({ visitorId: 1, ipAddress: 1 });
VisitorSchema.index({ lastSeenAt: -1 });

export default mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);
