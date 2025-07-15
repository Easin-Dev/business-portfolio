"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Lenis ইনস্ট্যান্স তৈরি করুন
    const lenis = new Lenis();

    // প্রতি ফ্রেমে Lenis-কে আপডেট করার জন্য একটি ফাংশন
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // অ্যানিমেশন ফ্রেম রিকুয়েস্ট করুন
    requestAnimationFrame(raf);

    // কম্পোনেন্ট আনমাউন্ট হলে Lenis-কে নষ্ট করে দিন
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
