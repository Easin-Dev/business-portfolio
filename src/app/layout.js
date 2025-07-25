import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./component/SmoothScroll";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import MarqueeSection from "./component/MarqueeSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <Navbar />
        <MarqueeSection />
        <Footer />
      </body>
    </html>
  );
}
