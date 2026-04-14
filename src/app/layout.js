import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./component/SmoothScroll";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import MarqueeSection from "./component/MarqueeSection";
import StructuredData from "./component/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://scaleupweb.xyz"),
  title: {
    default: "ScaleUp Web — Premium Digital Agency",
    template: "%s | ScaleUp Web",
  },
  description:
    "ScaleUp Web is a premium digital agency specializing in high-converting website development, ROI-focused digital marketing, and smart WhatsApp chatbot automation. We scale your business online.",
  keywords: [
    "digital agency",
    "web development",
    "digital marketing",
    "WhatsApp chatbot",
    "SEO",
    "website design",
    "ScaleUp Web",
    "business portfolio",
    "online marketing",
    "ecommerce development",
    "UI UX design",
    "social media marketing",
  ],
  authors: [{ name: "ScaleUp Web", url: "https://scaleupweb.xyz" }],
  creator: "ScaleUp Web",
  publisher: "ScaleUp Web",
  alternates: {
    canonical: "https://scaleupweb.xyz",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scaleupweb.xyz",
    siteName: "ScaleUp Web",
    title: "ScaleUp Web — Premium Digital Agency",
    description:
      "From Code to Commerce — we build your digital success with blazing-fast web apps, data-driven ads, and intelligent AI chatbots.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ScaleUp Web — Premium Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@scaleupweb",
    creator: "@scaleupweb",
    title: "ScaleUp Web — Premium Digital Agency",
    description:
      "From Code to Commerce — blazing-fast web apps, data-driven ads & intelligent AI chatbots.",
    images: ["/og-image.png"],
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        <SmoothScroll>{children}</SmoothScroll>
        <Navbar />
        <MarqueeSection />
        <Footer />
      </body>
    </html>
  );
}
