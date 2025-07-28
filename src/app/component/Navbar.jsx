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
  ArrowRight,
} from "lucide-react";

// ServicesMenu কম্পোনেন্ট (সম্পূর্ণ কোডসহ)
function ServicesMenu() {
  const [activeService, setActiveService] = useState(0);
  const services = [
    {
      title: "Landing Page Development",
      description: "High-converting landing pages to boost your campaigns.",
      image: "https://placehold.co/600x800/10b981/ffffff?text=Landing+Page",
      path: "/services/landing-page", // Path added
    },
    {
      title: "E-commerce Solution",
      description: "Complete and scalable solutions for your online store.",
      image: "https://placehold.co/600x800/8b5cf6/ffffff?text=E-commerce",
      path: "/services/ecommerce", // Path added
    },
    {
      title: "Custom Web Development",
      description: "Bespoke web applications tailored to your business needs.",
      image: "https://placehold.co/600x800/3b82f6/ffffff?text=Web+App",
      path: "/services/custom-dev", // Path added
    },
  ];

  return (
    <div className="w-[700px] h-auto rounded-2xl bg-white p-8 shadow-2xl text-black grid grid-cols-2 gap-8">
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-black">
          Level Up <br /> <span className="text-blue-500">Your Business</span>{" "}
          and Stay one step ahead of{" "}
          <span className="text-blue-500">Everyone</span> else.
        </h2>
        <p className="mt-2 text-neutral-400">
          Our services will help you grow and boost the business success.
        </p>
        <div className="mt-6 space-y-1">
          {services.map((service, index) => (
            // UPDATED: This is now a clickable link
            <a
              key={index}
              href={service.path}
              onMouseEnter={() => setActiveService(index)}
              className="block p-3 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-neutral-100"
            >
              <h3 className="font-semibold text-neutral-800">
                {service.title}
              </h3>
              <p className="text-neutral-500 text-sm">{service.description}</p>
            </a>
          ))}
        </div>
      </div>
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeService}
            src={services[activeService].image}
            alt={services[activeService].title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* UPDATED: This arrow also links to the active service path */}
        <a
          href={services[activeService].path}
          className="absolute bottom-4 right-4 bg-white/80 text-black p-3 rounded-full hover:bg-white transition-colors"
        >
          <ArrowRight />
        </a>
      </div>
    </div>
  );
}

// "More" বাটনের হোভার মেনুর জন্য নতুন কম্পোনেন্ট
function MoreMenu() {
  const menuItems = [
    { title: "Home", description: "Home is where the monk lives", href: "/" },
    {
      title: "About us",
      description: "The journey of Design Monks",
      href: "/about-us",
    },
    {
      title: "Blogs",
      description: "A collection of informative blogs",
      href: "/blogs",
    },
    {
      title: "Contact us",
      description: "Start your dream design journey from here",
      href: "/contact",
    },
  ];

  return (
    <div className="w-[700px] rounded-2xl bg-white p-8 shadow-2xl text-black grid grid-cols-2 gap-8">
      {/* বাম দিকের কলাম */}
      <div className="flex flex-col">
        <a href="/work" className="group">
          <h3 className="font-bold text-lg flex items-center text-neutral-800 group-hover:text-purple-600 transition-colors">
            Our Latest Work
            <ArrowRight size={16} className="ml-2" />
          </h3>
          <p className="text-sm text-neutral-500 mt-2">
            We've recently worked on some amazing projects. Let's have a glance
            over the case studies.
          </p>
          <div className="rounded-lg overflow-hidden mt-4">
            <img
              src="https://cdn.dribbble.com/userupload/4022233/file/original-cb431057535138a2a9642ea45031914a.png?resize=1024x768"
              alt="Latest Work"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </a>
      </div>
      {/* ডান দিকের কলাম */}
      <div>
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block p-3 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <h4 className="font-semibold text-neutral-800">{item.title}</h4>
            <p className="text-sm text-neutral-500">{item.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

// Main Responsive Navbar Component
export default function Navbar() {
  const [isServicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [isMobileMoreMenuOpen, setMobileMoreMenuOpen] = useState(false);
  const [isDesktopMoreMenuOpen, setDesktopMoreMenuOpen] = useState(false);

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

  const moreMenuItems = [
    { title: "Home", description: "Home is where the monk lives", href: "/" },
    {
      title: "About us",
      description: "The journey of Design Monks",
      href: "/about-us",
    },
    {
      title: "Blogs",
      description: "A collection of informative blogs",
      href: "/blogs",
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
                    className="absolute bottom-12 left-[180px] -translate-x-1/2 mb-4"
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
            <div
              onMouseEnter={() => setDesktopMoreMenuOpen(true)}
              onMouseLeave={() => setDesktopMoreMenuOpen(false)}
              className="relative"
            >
              <a className="rounded-full px-5 py-2.5 text-base font-medium text-neutral-300 hover:text-white transition-colors">
                More
              </a>
              <AnimatePresence>
                {isDesktopMoreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute bottom-12 left-[30px] -translate-x-1/2 mb-4"
                  >
                    <MoreMenu />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a
              href="/contact"
              className="ml-2 rounded-full border-2 border-purple-500/50 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition-transform duration-300 hover:scale-105"
            >
              Start a Project
            </a>
          </div>

          {/* Mobile Navbar */}
          <div className="md:hidden flex items-center justify-around w-[calc(100vw-2rem)] max-w-sm h-16 rounded-full border border-white/10 bg-black/50 px-4 shadow-2xl shadow-black/40 backdrop-blur-md">
            <MobileNavItem icon={Briefcase} label="Work" href="/work" />
            <MobileNavItem icon={Puzzle} label="Services" href="/services" />
            <div className="w-12 h-12"></div>
            <MobileNavItem icon={DollarSign} label="Pricing" href="/pricing" />
            <MobileNavItem
              icon={Menu}
              label="More"
              onClick={() => setMobileMoreMenuOpen(true)}
            />
          </div>

          <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+10px)]">
            <a
              href="/contact"
              className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 transition-transform duration-300 hover:scale-110"
            >
              <MessageCircle size={30} />
            </a>
          </div>
        </div>
      </nav>

      {/* Pop-up Menus */}
      <AnimatePresence>
        {isMobileMoreMenuOpen && (
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4"
            style={{ paddingBottom: "100px" }}
          >
            <div className="bg-white rounded-3xl p-4 pt-6 relative border border-neutral-200 shadow-2xl">
              <button
                onClick={() => setMobileMoreMenuOpen(false)}
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
        {(isServicesMenuOpen ||
          isDesktopMoreMenuOpen ||
          isMobileMoreMenuOpen) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => {
                setServicesMenuOpen(false);
                setDesktopMoreMenuOpen(false);
                setMobileMoreMenuOpen(false);
              }}
            />
          )}
      </AnimatePresence>
    </>
  );
}
