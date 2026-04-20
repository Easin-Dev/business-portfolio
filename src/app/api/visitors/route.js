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
    const visitors = await Visitor.find(query).sort({ lastSeenAt: -1 }).limit(500).lean();
    const groupedVisitors = Array.from(
      visitors.reduce((groups, visitor) => {
        const ipAddress = visitor.ipAddress || "Unknown";
        const current = groups.get(ipAddress) || {
          _id: ipAddress,
          ipAddress,
          visitorIds: [],
          sessionCount: 0,
          visitCount: 0,
          pageViews: [],
          sessions: [],
          lead: {},
          firstSeenAt: visitor.firstSeenAt || visitor.createdAt,
          lastSeenAt: visitor.lastSeenAt || visitor.updatedAt,
          landingPage: visitor.landingPage || "",
          lastPage: visitor.lastPage || "",
          deviceType: visitor.deviceType || "",
          screen: visitor.screen || "",
          language: visitor.language || "",
          timezone: visitor.timezone || "",
          userAgent: visitor.userAgent || "",
        };

        current.visitorIds.push(visitor.visitorId);
        current.sessionCount += 1;
        current.visitCount += Number(visitor.visitCount || 1);
        current.pageViews.push(...(visitor.pageViews || []));
        current.sessions.push({
          visitorId: visitor.visitorId,
          deviceType: visitor.deviceType || "",
          screen: visitor.screen || "",
          lastPage: visitor.lastPage || "",
          lastSeenAt: visitor.lastSeenAt || visitor.updatedAt,
        });

        if (visitor.lead?.email && !current.lead?.email) {
          current.lead = visitor.lead;
        }

        if (new Date(visitor.firstSeenAt || visitor.createdAt) < new Date(current.firstSeenAt)) {
          current.firstSeenAt = visitor.firstSeenAt || visitor.createdAt;
          current.landingPage = visitor.landingPage || current.landingPage;
        }

        if (new Date(visitor.lastSeenAt || visitor.updatedAt) > new Date(current.lastSeenAt)) {
          current.lastSeenAt = visitor.lastSeenAt || visitor.updatedAt;
          current.lastPage = visitor.lastPage || current.lastPage;
          current.deviceType = visitor.deviceType || current.deviceType;
          current.screen = visitor.screen || current.screen;
          current.language = visitor.language || current.language;
          current.timezone = visitor.timezone || current.timezone;
          current.userAgent = visitor.userAgent || current.userAgent;
        }

        groups.set(ipAddress, current);
        return groups;
      }, new Map()).values()
    )
      .map((visitor) => ({
        ...visitor,
        pageViews: visitor.pageViews
          .sort((a, b) => new Date(b.visitedAt) - new Date(a.visitedAt))
          .slice(0, 20),
        sessions: visitor.sessions
          .sort((a, b) => new Date(b.lastSeenAt) - new Date(a.lastSeenAt))
          .slice(0, 8),
      }))
      .sort((a, b) => new Date(b.lastSeenAt) - new Date(a.lastSeenAt))
      .slice(0, 200);

    return NextResponse.json(groupedVisitors);
  } catch (error) {
    console.error("Visitor fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch visitors" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const ipAddress = cleanText(searchParams.get("ipAddress"));

    if (!ipAddress) {
      return NextResponse.json({ error: "IP address is required" }, { status: 400 });
    }

    await dbConnect();
    const result = await Visitor.deleteMany({ ipAddress });

    return NextResponse.json({
      message: "Visitor records deleted",
      deletedCount: result.deletedCount || 0,
    });
  } catch (error) {
    console.error("Visitor delete error:", error);
    return NextResponse.json({ error: "Failed to delete visitor records" }, { status: 500 });
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
