"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spotlight } from "../component/ui/spotlight";
import Link from "next/link";
import { BackgroundGradient } from "../component/ui/background-gradient";
import { Plus, Minus } from "lucide-react";

// Services ডেটা
const servicesData = [
  {
    id: 1,
    title: "Landing Page Development",
    description:
      "We create high-converting, fast-loading, and SEO-friendly landing pages designed to capture leads and boost your marketing campaigns effectively.",
    image:
      "https://placehold.co/1200x600/10b981/ffffff?text=Landing+Page+Showcase",
    features: [
      {
        title: "High Conversion Design",
        content: "Designs focused on maximizing user action.",
      },
      {
        title: "Fast Loading Speed",
        content: "Optimized for the best performance and user experience.",
      },
      {
        title: "SEO Friendly",
        content: "Built with search engine best practices in mind.",
      },
      {
        title: "Payment Gateway Integration",
        content: "Securely process payments through your landing page.",
      },
    ],
  },
  {
    id: 2,
    title: "E-commerce Solution",
    description:
      "We build robust and scalable e-commerce platforms with all the features you need to run a successful online store, from product management to secure payments.",
    image:
      "https://placehold.co/1200x600/8b5cf6/ffffff?text=E-commerce+Showcase",
    features: [
      {
        title: "Secure Payment Gateway",
        content: "Integration with popular and secure payment solutions.",
      },
      {
        title: "Product Management",
        content: "Easy-to-use systems for managing your inventory.",
      },
      {
        title: "Custom API Development",
        content: "Tailored APIs to connect with third-party services.",
      },
      {
        title: "Scalable Architecture",
        content: "Solutions that grow with your business.",
      },
    ],
  },
  {
    id: 3,
    title: "Custom Web Development",
    description:
      "From complex web applications to bespoke business tools, we provide custom development solutions tailored precisely to your unique requirements.",
    image: "https://placehold.co/1200x600/3b82f6/ffffff?text=Web+App+Showcase",
    features: [
      {
        title: "Bespoke Solutions",
        content: "Web applications built from scratch for your needs.",
      },
      {
        title: "Advanced Backend",
        content: "Powerful and secure server-side development.",
      },
      {
        title: "Scalable & Secure",
        content: "Built to handle growth and protect user data.",
      },
      {
        title: "Dedicated Support",
        content: "Ongoing support and maintenance for your application.",
      },
    ],
  },
];

// Accordion Item Component
const AccordionItem = ({ feature }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h4 className="text-lg font-medium text-gray-800">{feature.title}</h4>
        {isOpen ? (
          <Minus className="text-gray-500" />
        ) : (
          <Plus className="text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-gray-600"
          >
            {feature.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ServicesPage() {
  return (
    <div className="w-full bg-white text-black">
      {/* পেইজের হেডার (Hero Section-এর মতো) */}
      <div className="relative w-full h-[60vh] md:h-[70vh] bg-black flex items-center justify-center overflow-hidden rounded-b-[40px]">
        <div className="absolute inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="hsl(158, 89%, 30%)"
        />
        <Spotlight className="top-10 left-full" fill="hsl(259, 80%, 60%)" />
        <BackgroundGradient containerClassName="hidden lg:block absolute top-20 -left-24 w-96 z-10 transform rotate-[-15deg]">
          <img
            src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758837d0dffb8e32f63_137e4404fe981fb7e0f2f0db1f9ec8e1_3.avif"
            alt="Project Mockup 1"
            className="w-full h-full object-contain rounded-lg"
          />
        </BackgroundGradient>
        <BackgroundGradient containerClassName="hidden lg:block absolute bottom-20 -right-24 w-96 z-10 transform rotate-[15deg]">
          <img
            src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758594e31e0312a925f_e0482580c600f74a17f23e4f9a90e82e_1.avif"
            alt="Project Mockup 2"
            className="w-full h-full object-contain rounded-lg"
          />
        </BackgroundGradient>

        <div className="relative z-20 text-center px-4">
          {/* UPDATED: Agency name added */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-200 tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              ScaleUp Web
            </span>
          </h2>
          <div className="text-neutral-300 mb-4  bg-white/30 backdrop-blur-none w-40 p-2 rounded-r-full rounded-l-full mx-auto mt-2">
            <Link href="/" className="hover:text-white transition-colors">
              {" "}
              Home{" "}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white max-w-5xl">
            <span className="font-bold">From Code to Commerce,</span>
            <br />
            <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Building Your Digital Success
            </span>
          </h1>
        </div>
      </div>

      {/* সার্ভিসেস কন্টেন্ট */}
      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-24 space-y-20 lg:space-y-28">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* বাম দিকের কন্টেন্ট */}
            <div className={service.id % 2 === 0 ? "lg:order-2" : ""}>
              <h2 className="text-3xl lg:text-4xl font-bold text-black">
                {service.title}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {service.description}
              </p>
              <div className="mt-8">
                {service.features.map((feature, index) => (
                  <AccordionItem key={index} feature={feature} />
                ))}
              </div>
            </div>
            {/* ডান দিকের ছবি */}
            <div className={service.id % 2 === 0 ? "lg:order-1" : ""}>
              <img
                src={service.image}
                alt={service.title}
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
