"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Spotlight } from "../component/ui/spotlight";
import Link from "next/link";
import { BackgroundGradient } from "../component/ui/background-gradient";
import Image from "next/image";
import PageHero from "../component/PageHero";

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
    <div className="w-full bg-[#050709] text-white">
      <PageHero 
        breadcrumb="Work"
        title="Building Digital Experiences,"
        highlight="That Drive Engagement"
        subtitle="Explore our latest projects across web development, app design, and digital marketing."
        spotlightColor="hsl(158, 89%, 30%)"
      />

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
