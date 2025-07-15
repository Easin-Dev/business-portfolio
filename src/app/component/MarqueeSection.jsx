"use client";
import React from "react";

export default function MarqueeSection() {
  const marqueeText =
    "Get 100% Value And Guarantee. • Don’t Miss Out - Secure Your Brand’s Future Today. • Why Risk It With The Wrong Partner? • ";

  return (
    <div className="w-full bg-black py-20">
      <div className="relative rounded-full bg-gradient-to-r from-green-300 via-lime-300 to-green-400 p-4 shadow-[0_0_40px_theme(colors.lime.400)] overflow-hidden">
        <div className="marquee-wrapper">
          <p className="marquee-text text-2xl font-bold italic text-black">
            {marqueeText.repeat(5)}
          </p>
        </div>
      </div>
      <style jsx>{`
        .marquee-wrapper {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 40s linear infinite;
        }
        .marquee-text {
          will-change: transform;
          display: inline-block;
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
