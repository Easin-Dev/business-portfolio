"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// সার্ভিসগুলোর জন্য ডেমো ডেটা (UPDATED with path)
const services = [
  {
    title: "Landing Page Development",
    description: "High-converting landing pages to boost your campaigns.",
    image: "https://placehold.co/600x800/10b981/ffffff?text=Landing+Page",
    path: "/services/landing-page",
  },
  {
    title: "E-commerce Solution",
    description: "Complete and scalable solutions for your online store.",
    image: "https://placehold.co/600x800/8b5cf6/ffffff?text=E-commerce",
    path: "/services/ecommerce",
  },
  {
    title: "Custom Web Development",
    description: "Bespoke web applications tailored to your business needs.",
    image: "https://placehold.co/600x800/3b82f6/ffffff?text=Web+App",
    path: "/services/custom-dev",
  },
];

export default function ServicesMenu() {
  const [activeService, setActiveService] = useState(0);

  return (
    // মূল কার্ড কন্টেইনার
    <div className="w-[700px] h-auto rounded-2xl bg-white p-8 shadow-2xl">
      <div className="grid grid-cols-2 gap-8">
        {/* বাম দিকের লেখা */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-black">
            Level Up Like Player 456
          </h2>
          <p className="mt-2 text-neutral-500">
            Our services will help you grow and boost the business success.
          </p>

          <div className="mt-6 space-y-2">
            {services.map((service, index) => (
              // UPDATED: div replaced with <a> tag to make it clickable
              <a
                key={index}
                href={service.path}
                onMouseEnter={() => setActiveService(index)}
                className="block p-3 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-neutral-100"
              >
                <h3 className="font-semibold text-neutral-800">
                  {service.title}
                </h3>
                <p className="text-neutral-500 text-sm">
                  {service.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* ডান দিকের ছবি */}
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
          {/* UPDATED: Dynamic link added */}
          <a
            href={`/${services[activeService].path}`}
            className="absolute bottom-4 right-4 bg-white/80 text-black p-3 rounded-full hover:bg-white transition-colors"
          >
            <ArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
}
