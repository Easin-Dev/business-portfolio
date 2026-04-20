export function getClientIp(req) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const vercelIp = req.headers.get("x-vercel-forwarded-for");
  const cfIp = req.headers.get("cf-connecting-ip");

  const rawIp = forwardedFor || vercelIp || realIp || cfIp || "";
  return rawIp.split(",")[0].trim() || "Unknown";
}

export function getRequestMeta(req) {
  return {
    ipAddress: getClientIp(req),
    userAgent: req.headers.get("user-agent") || "Unknown",
    referrer: req.headers.get("referer") || "",
  };
}
