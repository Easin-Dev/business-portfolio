import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getRequestMeta } from "@/lib/requestMeta";
import Visitor from "@/models/Visitor";

function cleanText(value, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim().slice(0, 500);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = cleanText(searchParams.get("search"));
    const safeSearch = escapeRegex(search);
    const query = search
      ? {
          $or: [
            { ipAddress: { $regex: safeSearch, $options: "i" } },
            { lastPage: { $regex: safeSearch, $options: "i" } },
            { "lead.fullName": { $regex: safeSearch, $options: "i" } },
            { "lead.email": { $regex: safeSearch, $options: "i" } },
            { "lead.phone": { $regex: safeSearch, $options: "i" } },
          ],
        }
      : {};

    await dbConnect();
    const visitors = await Visitor.find(query).sort({ lastSeenAt: -1 }).limit(200);
    return NextResponse.json(visitors);
  } catch (error) {
    console.error("Visitor fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch visitors" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { ipAddress, userAgent, referrer: requestReferrer } = getRequestMeta(req);

    const visitorId = cleanText(body.visitorId, `visitor-${Date.now()}`);
    const path = cleanText(body.path, "/");
    const referrer = cleanText(body.referrer, requestReferrer);
    const now = new Date();

    await dbConnect();
    const visitor = await Visitor.findOneAndUpdate(
      { visitorId },
      {
        $set: {
          ipAddress,
          userAgent,
          language: cleanText(body.language),
          timezone: cleanText(body.timezone),
          screen: cleanText(body.screen),
          deviceType: cleanText(body.deviceType),
          lastPage: path,
          lastSeenAt: now,
        },
        $setOnInsert: {
          visitorId,
          landingPage: path,
          referrer,
          firstSeenAt: now,
        },
        $inc: { visitCount: 1 },
        $push: {
          pageViews: {
            $each: [{ path, referrer, visitedAt: now }],
            $slice: -20,
          },
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: false }
    );

    return NextResponse.json({ ok: true, visitorId: visitor.visitorId });
  } catch (error) {
    console.error("Visitor tracking error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
