"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Spotlight } from "../component/ui/spotlight";
import Link from "next/link";
import { BackgroundGradient } from "../component/ui/background-gradient"; // <-- BackgroundGradient ইম্পোর্ট করুন

// প্রকল্পের জন্য ডেমো ডেটা
const allProjects = [
  {
    id: 1,
    title: "Plenty Pay: Redefining Smart Personal Finance",
    category: "Landing-Page",
    image: "https://i.postimg.cc/K8pZMYgn/Chat-GPT-Image-Jan-16-2026-07-25-20-PM.png",
  },
  {
    id: 2,
    title: "Skillophy: Smarter Learning Experience",
    category: "Portfolio",
    image: "https://i.postimg.cc/85FHBrvT/Chat-GPT-Image-Jan-16-2026-03-31-49-PM.png",
  },
  {
    id: 3,
    title: "Luxury Car Showcase",
    category: "Automotive",
    image: "https://i.postimg.cc/R0JmfWNz/Chat-GPT-Image-Jan-16-2026-03-18-00-PM.png",
  },
  {
    id: 4,
    title: "Organic Beauty Line",
    category: "Agency",
    image: "https://i.postimg.cc/dtJJXQSB/Chat-GPT-Image-Jan-16-2026-03-15-44-PM.png",
  },
  {
    id: 5,
    title: "Modern Real Estate Platform",
    category: "Agency",
    image: "https://i.postimg.cc/bJ5xsFD9/Chat-GPT-Image-Jan-16-2026-03-02-06-PM.png",
  },
  {
    id: 6,
    title: "Interactive E-Learning Hub",
    category: "EdTech",
    image: "https://i.postimg.cc/gjr9dVgd/Chat-GPT-Image-Jan-16-2026-07-41-02-PM.png",
  },
  {
    id: 7,
    title: "Gourmet Food Delivery",
    category: "Entertainment",
    image: "https://i.postimg.cc/90PL6rhj/Chat-GPT-Image-Jan-16-2026-07-46-27-PM.png",
  },
];

const categories = [
  "Explore All",
  "Landing-Page",
  "Agency",
  "Portfolio",
  "EdTech",
  "Entertainment",
  "Fashion & Apparel",
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("Explore All");

  const filteredProjects =
    activeCategory === "Explore All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full bg-white text-black">
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
          <h2 className="text-xl md:text-2xl font-semibold text-gray-200 tracking-wider">
            <img
              src="https://i.ibb.co.com/xPS3xYC/scaleup-web-logo.png"
              alt="Project Mockup 1"
              className="w-[300px] h-[100px] mx-auto"
            />
          </h2>
          <div className="text-neutral-300 mt-4 bg-white/30 backdrop-blur-none w-40 p-2 rounded-r-full rounded-l-full mx-auto">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Work</span>
          </div>
          bg-clip-text
          <h1 className="text-5xl lg:text-7xl mt-2 text-white">
            <span className="font-bold"> Building Digital Experiences,</span>
            <br />{" "}
            <span className="italic  font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              That Drive Engagement
            </span>
          </h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* ফিল্টার বাটন */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-sm lg:text-base rounded-full transition-colors duration-300
                ${activeCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* প্রজেক্ট গ্রিড */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
