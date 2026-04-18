"use client";
import React from "react";

import { usePathname } from "next/navigation";

export default function MarqueeSection() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const marqueeText =
    "UNCOMPROMISING QUALITY • 100% VALUE GUARANTEE • SCALE YOUR BUSINESS TODAY • DATA-DRIVEN STRATEGIES • PREMIUM DIGITAL SOLUTIONS • ";

  return (
    <div className="w-full bg-[#050710] py-12 md:py-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-[120%] -rotate-1 py-4 md:py-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 shadow-[0_0_60px_rgba(37,99,235,0.2)] border-y border-white/10 flex items-center overflow-hidden">
        <div className="marquee-wrapper">
          <p className="marquee-text text-xl md:text-3xl font-black tracking-[0.15em] text-white uppercase italic">
            {marqueeText.repeat(8)}
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .marquee-wrapper {
          display: flex;
          white-space: nowrap;
          animation: marquee 60s linear infinite;
        }
        .marquee-text {
          will-change: transform;
          display: inline-block;
          padding-right: 2rem;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
