export const metadata = {
  title: "Blog \u2014 Digital Marketing, Web Dev & Business Growth Tips",
  description:
    "Stay ahead with ScaleUp Web blog \u2014 expert insights on web development, digital marketing strategies, WhatsApp automation, and growing your business online.",
  keywords: [
    "digital marketing blog",
    "web development tips",
    "SEO tips",
    "business growth",
    "WhatsApp automation tips",
    "ScaleUp Web blog",
  ],
  alternates: {
    canonical: "https://www.scaleupweb.xyz/blogs",
  },
  openGraph: {
    title: "Blog \u2014 ScaleUp Web Digital Insights",
    description:
      "Expert tips on web dev, digital marketing & automation to scale your business.",
    url: "https://www.scaleupweb.xyz/blogs",
    siteName: "ScaleUp Web",
    type: "website",
  },
};

export default function BlogsLayout({ children }) {
  return <>{children}</>;
}
