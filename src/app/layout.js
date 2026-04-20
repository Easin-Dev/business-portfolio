import "./globals.css";
import SmoothScroll from "./component/SmoothScroll";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import MarqueeSection from "./component/MarqueeSection";
import StructuredData from "./component/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import SessionWrapper from "./component/SessionWrapper";
import LoaderWrapper from "./component/loaders/LoaderWrapper";
import { AlertProvider } from "./component/AlertProvider";

export const metadata = {
  metadataBase: new URL("https://www.scaleupweb.xyz"),
  title: {
    default: "ScaleUp Web - Website Development, Digital Marketing & Automation",
    template: "%s | ScaleUp Web",
  },
  description:
    "ScaleUp Web is a premium digital agency specializing in high-converting website development, ROI-focused digital marketing, SEO, and smart WhatsApp chatbot automation.",
  keywords: [
    "ScaleUp Web",
    "digital agency",
    "website development",
    "web development",
    "digital marketing",
    "WhatsApp chatbot",
    "SEO",
    "website design",
    "business portfolio",
    "online marketing",
    "ecommerce development",
    "UI UX design",
    "social media marketing",
  ],
  authors: [{ name: "ScaleUp Web", url: "https://www.scaleupweb.xyz" }],
  creator: "ScaleUp Web",
  publisher: "ScaleUp Web",
  alternates: {
    canonical: "https://www.scaleupweb.xyz",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.scaleupweb.xyz",
    siteName: "ScaleUp Web",
    title: "ScaleUp Web - Website Development, Digital Marketing & Automation",
    description:
      "From Code to Commerce - we build your digital success with blazing-fast web apps, data-driven ads, and intelligent AI chatbots.",
    images: [
      {
        url: "/favicon.ico",
        width: 512,
        height: 512,
        alt: "ScaleUp Web - Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@scaleupweb",
    creator: "@scaleupweb",
    title: "ScaleUp Web - Digital Agency",
    description:
      "From Code to Commerce - blazing-fast web apps, data-driven ads & intelligent AI chatbots.",
    images: ["/favicon.ico"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

import LayoutWrapper from "./component/LayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-serif">
        <SessionWrapper>
          <AlertProvider>
            <LoaderWrapper>
              <StructuredData />
              <LayoutWrapper>
                <SmoothScroll>{children}</SmoothScroll>
              </LayoutWrapper>
              <Analytics />
            </LoaderWrapper>
          </AlertProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
