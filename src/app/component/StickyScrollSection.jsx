"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Trusted Export & Import Partner",
    category: "Global Trade Services",
    description:
      "A professional export and import agency website providing global trade support, supplier sourcing, and international business solutions.",
    image: "https://i.postimg.cc/bJ5xsFD9/Chat-GPT-Image-Jan-16-2026-03-02-06-PM.png",
    bgColor: "bg-[#e0e9ff]",
    textColor: "text-blue-900",
  },
  {
    title: "Leadership Development Organization Website",
    category: "Social Organization Website",
    description:
      "An organization website dedicated to youth leadership training and community development.",
    image: "https://i.postimg.cc/dtJJXQSB/Chat-GPT-Image-Jan-16-2026-03-15-44-PM.png",
    bgColor: "bg-[#ffd1d1]",
    textColor: "text-red-900",
  },
  {
    title: "Political Portfolio Website",
    category: "Portfolio",
    description:
      "A political portfolio website showcasing vision, public service, initiatives, and engagement with the community.",
    image: "https://i.postimg.cc/R0JmfWNz/Chat-GPT-Image-Jan-16-2026-03-18-00-PM.png",
    bgColor: "bg-[#fdfab1]",
    textColor: "text-yellow-900",
  },
  {
    title: "Developer Portfolio ",
    category: "Portfolio",
    description:
      "A developer portfolio showcasing skills, projects, and professional journey.",
    image: "https://i.postimg.cc/85FHBrvT/Chat-GPT-Image-Jan-16-2026-03-31-49-PM.png",
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
          <h3 className="mt-2 text-5xl lg:text-7xl font-serif italic text-blue-600">
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
