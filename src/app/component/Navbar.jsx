"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MessageCircle,
  Briefcase,
  Puzzle,
  DollarSign,
} from "lucide-react";
import ServicesMenu from "./ServicesMenu"; // ServicesMenu কম্পোনেন্ট ইম্পোর্ট করা হয়েছে
import { useRouter } from "next/navigation";

// Main Responsive Navbar Component
export default function Navbar() {
  const [isServicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

  const route = useRouter();

  // Helper component for mobile nav items
  const MobileNavItem = ({ icon: Icon, label, onClick, href }) => {
    const content = (
      <>
        <Icon size={22} />
        <span className="text-xs font-medium">{label}</span>
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className="flex flex-col items-center gap-1 text-neutral-300 hover:text-white transition-colors"
        >
          {content}
        </a>
      );
    }

    return (
      <button
        onClick={onClick}
        className="flex flex-col items-center gap-1 text-neutral-300 hover:text-white transition-colors"
      >
        {content}
      </button>
    );
  };

  // Data for the full-screen menu
  const moreMenuItems = [
    { title: "Home", description: "Home is where the monk lives", href: "/" },
    {
      title: "About us",
      description: "The journey of Design Monks",
      href: "/about",
    },
    {
      title: "Meet the team",
      description: "An overview of the Monk family",
      href: "/team",
    },
    {
      title: "Blogs",
      description: "A collection of informative blogs",
      href: "/blogs",
    },
    {
      title: "Career",
      description: "Work with top global brands, grow your skills",
      href: "/career",
    },
    {
      title: "Contact us",
      description: "Start your dream design journey from here",
      href: "/contact",
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center px-4 pb-3">
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110%] h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center justify-center rounded-full border border-white/10 bg-black/50 p-2.5 shadow-2xl shadow-black/40 backdrop-blur-md">
            <a
              href="/work"
              className="rounded-full px-5 py-2.5 text-base font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Work
            </a>
            <div
              onMouseEnter={() => setServicesMenuOpen(true)}
              onMouseLeave={() => setServicesMenuOpen(false)}
              className="relative"
            >
              <a
                href="/services"
                className="rounded-full px-5 py-2.5 text-base font-medium text-neutral-300 hover:text-white transition-colors"
              >
                Services
              </a>
              <AnimatePresence>
                {isServicesMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4"
                  >
                    <ServicesMenu />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a
              href="/pricing"
              className="rounded-full px-5 py-2.5 text-base font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="/more"
              className="rounded-full px-5 py-2.5 text-base font-medium text-neutral-300 hover:text-white transition-colors"
            >
              More
            </a>
            <a
              href="#"
              className="ml-2 rounded-full border-2 border-purple-500/50 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition-transform duration-300 hover:scale-105"
            >
              Start a Project
            </a>
          </div>

          {/* Mobile Navbar */}
          <div className="md:hidden flex items-center justify-around w-[calc(100vw-2rem)] max-w-sm h-16 rounded-full border border-white/10 bg-black/50 px-4 shadow-2xl shadow-black/40 backdrop-blur-md">
            <MobileNavItem icon={Briefcase} label="Work" href="/work" />
            <MobileNavItem icon={Puzzle} label="Services" href="/services" />
            <div className="w-12 h-12"></div> {/* Spacer for central button */}
            <MobileNavItem icon={DollarSign} label="Pricing" href="/pricing" />
            <MobileNavItem
              icon={Menu}
              label="More"
              onClick={() => setMoreMenuOpen(true)}
            />
          </div>

          {/* Mobile Central Button */}
          <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+10px)]">
            <a
              href="#"
              className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 transition-transform duration-300 hover:scale-110"
            >
              <MessageCircle size={30} />
            </a>
          </div>
        </div>
      </nav>

      {/* Pop-up Menus */}
      <AnimatePresence>
        {/* UPDATED: Card-style menu for mobile with white background */}
        {isMoreMenuOpen && (
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4"
            style={{ paddingBottom: "100px" }} // Navbar er opor uthbe
          >
            <div className="bg-white rounded-3xl p-4 pt-6 relative border border-neutral-200 shadow-2xl">
              <button
                onClick={() => setMoreMenuOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
              <div className="mt-4">
                {moreMenuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block py-3 border-b border-neutral-200 last:border-b-0"
                  >
                    <h3 className="text-lg font-semibold text-black">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {item.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blurred Background */}
      <AnimatePresence>
        {(isServicesMenuOpen || isMoreMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => {
              setServicesMenuOpen(false);
              setMoreMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
