"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// প্রকল্পের জন্য ডেমো ডেটা
const projects = [
  {
    title: "Easy Booking for Dream Trips",
    category: "Travel",
    description:
      "Triply is a hassle-free & effective tour solution for travelers. It's an all-inclusive booking and planning website that helps people make their dream trips easier.",
    image: "https://placehold.co/600x400/a7c5ff/333?text=Travel+App",
    bgColor: "bg-[#e0e9ff]",
    textColor: "text-blue-900",
  },
  {
    title: "Transform Your Dining",
    category: "Restaurant",
    description:
      "At Plate, we bring you a handpicked selection of premium restaurants that offer not just meals, but memorable dining experiences you'll cherish.",
    image: "https://placehold.co/600x400/ffd1d1/333?text=Food+App",
    bgColor: "bg-[#ffd1d1]",
    textColor: "text-red-900",
  },
  {
    title: "Reducing Carbon Footprints",
    category: "SaaS",
    description:
      "Yenex is a smart and sustainable energy platform. It empowers users with distributed energy solutions to reduce carbon footprints effortlessly.",
    image: "https://placehold.co/600x400/fdfab1/333?text=SaaS+App",
    bgColor: "bg-[#fdfab1]",
    textColor: "text-yellow-900",
  },
  {
    title: "Revolutionize Fitness Goals",
    category: "Healthcare",
    description:
      "Fitmate transforms fitness in Australia with flexible gym access, personalised schedules, and AI-driven insights to solve common workout limitations for users.",
    image: "https://placehold.co/600x400/c0f6ff/333?text=Fitness+App",
    bgColor: "bg-[#c0f6ff]",
    textColor: "text-cyan-900",
  },
];

// একটি কার্ডের জন্য কম্পোনেন্ট
function ProjectCard({ project }) {
  return (
    <div
      className={`w-full h-screen flex items-center rounded-t-4xl justify-center p-8 lg:p-16 ${project.bgColor} ${project.textColor}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* বাম দিকের লেখা */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest">
            {project.category}
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mt-4">
            {project.title}
          </h2>
          <p className="mt-6 text-lg opacity-80">{project.description}</p>
        </div>
        {/* ডান দিকের ছবি */}
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function StickyScrollSection() {
  const componentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const details = gsap.utils.toArray(".desktop-content-section");

      details.forEach((detail, index) => {
        ScrollTrigger.create({
          trigger: detail,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: index === details.length - 1,
          scrub: 1,
        });
      });
    }, componentRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="bg-white dark:bg-[#f0f0f0]">
      {/* ADDED: Section Header */}
      <div className="w-full text-black pt-20 pb-10 lg:pt-24 lg:pb-16">
        <div className="max-w-7xl mx-auto text-center px-8">
          <span className="inline-block border border-green-400 text-green-600 text-sm font-medium px-4 py-1.5 rounded-full">
            Industry Wins
          </span>
          <h2 className="mt-6 text-5xl lg:text-7xl font-bold">
            Proven Success In
          </h2>
          <h3 className="mt-2 text-5xl lg:text-7xl font-serif italic text-neutral-600">
            Every Industry
          </h3>
        </div>
      </div>

      {/* Project cards will follow the header */}
      {projects.map((project, index) => (
        <div key={index} className="desktop-content-section">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
