"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MarqueeSection from "./MarqueeSection";
import VisitorTracker from "./VisitorTracker";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Hide Navbar and Footer on Agreement and Admin pages
  const isCleanPage = pathname?.startsWith("/agreement/") || pathname?.startsWith("/admin");

  if (isCleanPage) {
    return <>{children}</>;
  }

  return (
    <>
      <VisitorTracker />
      <Navbar />
      {children}
      <MarqueeSection />
      <Footer />
    </>
  );
}
