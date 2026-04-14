/**
 * Robots.txt configuration for ScaleUp Web
 * Auto-generates /robots.txt at build time
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://scaleupweb.xyz/sitemap.xml",
    host: "https://scaleupweb.xyz",
  };
}
