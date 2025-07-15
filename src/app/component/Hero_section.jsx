"use client";

import React from "react";
import { Spotlight } from "./ui/spotlight";
import { BackgroundGradient } from "./ui/background-gradient";

export default function Hero_section() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-start justify-center pt-32 md:pt-40 overflow-hidden bg-[#050709] text-white"
    >
      {/* ... আপনার বাকি কম্পোনেন্টের কোড এখানে থাকবে ... */}
      {/* Spotlight, BackgroundGrid, Floating Mockups, Main Content */}
      <Spotlight
        className="top-0 left-0 md:left-20 md:-top-20"
        fill="hsl(158, 89%, 30%)"
      />
      <Spotlight className="top-1/2 left-1/2" fill="hsl(259, 80%, 60%)" />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] select-none [background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"></div>
      <BackgroundGradient containerClassName="absolute top-10 -left-24 md:left-5 lg:left-10 w-64 md:w-80 lg:w-96 z-10 transform rotate-[-15deg] hover:rotate-[-10deg] transition-transform duration-500">
        <img
          src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758837d0dffb8e32f63_137e4404fe981fb7e0f2f0db1f9ec8e1_3.avif"
          alt="Project Mockup 1"
          className="w-full h-full object-contain rounded-lg opacity-80"
        />
      </BackgroundGradient>
      <BackgroundGradient containerClassName="absolute bottom-10 -right-24 md:right-5 lg:right-10 w-64 md:w-80 lg:w-96 z-10 transform rotate-[15deg] hover:rotate-[10deg] transition-transform duration-500">
        <img
          src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758594e31e0312a925f_e0482580c600f74a17f23e4f9a90e82e_1.avif"
          alt="Project Mockup 2"
          className="w-full h-full object-contain rounded-lg opacity-80"
        />
      </BackgroundGradient>
      <div className="relative z-20 text-center px-4 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-200 tracking-wider">
          ScaleUp Web
        </h2>
        <p className="mt-4 text-emerald-400 font-medium">
          A Full-Stack Web Studio for Ambitious Brands
        </p>
        <h1 className="mt-4 font-bold text-3xl sm:text-5xl md:text-6xl max-w-4xl">
          We Build Web Experiences That Drive{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            Growth
          </span>{" "}
          &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            Results
          </span>
        </h1>
        <div className="mt-6">
          <span className="inline-block bg-gray-800/60 border border-gray-700 rounded-full px-4 py-2 text-sm text-gray-300">
            Full-Stack Web Studio • Bangladesh-based • 100% Refund Policy
          </span>
        </div>
        <div className="mt-10">
          <a
            href="#contact"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300"
          >
            Book a Free Call
          </a>
        </div>
        <div className="relative w-full max-w-4xl mx-auto mt-16 overflow-hidden">
          <div className="service-marquee-container space-y-4">
            <div className="service-marquee rtl">
              <span>Landing Pages</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span>E-commerce Solutions</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span>Full-Stack Projects</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span>Business Websites</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span>Landing Pages</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span>E-commerce Solutions</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span>Full-Stack Projects</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span>Business Websites</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
            </div>
            <div className="service-marquee ltr">
              <span>React.js Development</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span>Next.js Apps</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span>Headless CMS</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span>API Integration</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span>React.js Development</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span>Next.js Apps</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span>Headless CMS</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span>API Integration</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
            </div>
          </div>
        </div>
      </div>

      {/* =============================================== */}
      {/* UPDATED: CSS for the Service Marquee Animation */}
      {/* =============================================== */}
      <style jsx global>{`
        .service-marquee-container {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            white 10%,
            white 90%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            white 10%,
            white 90%,
            transparent
          );
        }
        .service-marquee {
          display: flex;
          flex-shrink: 0;
          /* অ্যানিমেশনকে মসৃণ করার জন্য এই দুটি লাইন যোগ করা হয়েছে */
          justify-content: flex-start;
          width: max-content;
        }
        .service-marquee span {
          white-space: nowrap;
          font-size: 1rem;
          color: #9ca3af;
        }
        .service-marquee.rtl {
          animation: service-marquee-anim 40s linear infinite;
        }
        .service-marquee.ltr {
          /* একই অ্যানিমেশনдом উল্টো দিকে চালানোর জন্য reverse ব্যবহার করা হয়েছে */
          animation: service-marquee-anim 55s linear infinite reverse;
        }
        /* একটি কীফ্রেম দিয়েই এখন দুটি অ্যানিমেশন চলবে */
        @keyframes service-marquee-anim {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-20%);
          }
        }
      `}</style>
    </section>
  );
}
