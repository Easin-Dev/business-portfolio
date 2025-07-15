"use client";
import React from "react";
// প্রয়োজনীয় আইকনগুলো ইম্পোর্ট করুন
import { Briefcase, Settings, Tag, Menu, MessageSquare } from "lucide-react";

// Navbar-এর লিংকগুলোর জন্য ডেটা, সাথে আইকনও যোগ করা হয়েছে
const navItems = [
  { name: "Work", href: "#", icon: <Briefcase size={24} /> },
  { name: "Services", href: "#", icon: <Settings size={24} /> },
  { name: "Pricing", href: "#", icon: <Tag size={24} /> },
  { name: "More", href: "#", icon: <Menu size={24} /> },
];

export default function Navbar() {
  return (
    // মূল কন্টেইনার, যা স্ক্রিনের নিচে থাকবে
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center px-4 pb-3">
      <div className="relative">
        {/* উপরের দিকে গ্লোয়িং লাইন (শুধুমাত্র বড় স্ক্রিনে দেখা যাবে) */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[110%] h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>

        {/* মূল নেভিগেশন বার */}
        <div className="mx-auto flex items-center justify-center rounded-full border border-white/10 bg-black/50 p-2.5 shadow-2xl shadow-black/40 backdrop-blur-md">
          {/* ======================= বড় স্ক্রিনের জন্য (Desktop View) ======================= */}
          <div className="hidden sm:flex items-center space-x-2">
            {navItems.slice(0, 2).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-full px-5 py-2.5 text-base font-medium text-neutral-300 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#"
              className="rounded-full border-2 border-purple-500/50 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition-transform duration-300 hover:scale-105"
            >
              Start a Project
            </a>
            {navItems.slice(2, 4).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-full px-5 py-2.5 text-base font-medium text-neutral-300 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* ======================= ছোট স্ক্রিনের জন্য (Mobile View) - UPDATED ======================= */}
          <div className="flex sm:hidden items-center justify-center gap-x-6 px-2">
            {/* প্রথম দুটি আইকন */}
            {navItems.slice(0, 2).map((item) => (
              <a
                href={item.href}
                key={item.name}
                className="flex flex-col items-center space-y-1 text-neutral-300"
              >
                {item.icon}
                <span className="text-xs">{item.name}</span>
              </a>
            ))}

            {/* মাঝখানের বিশেষ বাটন */}
            <a
              href="#"
              className="relative -top-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white shadow-lg shadow-purple-500/30"
            >
              <MessageSquare size={28} />
            </a>

            {/* শেষ দুটি আইকন */}
            {navItems.slice(2, 4).map((item) => (
              <a
                href={item.href}
                key={item.name}
                className="flex flex-col items-center space-y-1 text-neutral-300"
              >
                {item.icon}
                <span className="text-xs">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
