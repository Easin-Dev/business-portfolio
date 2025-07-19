"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// প্রকল্পের জন্য ডেমো ডেটা
const featuredProjects = [
  {
    title: "Web Development",
    description:
      "Frontend Development, Backend Development, Full Stack Solutions, Mobile App Development, Custom Web Applications, API Integration.",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78084947770a14f1eb7c_Project%20Cards.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78089c9a93e810fbfa6e_Project%20Cards-1.avif",
    ],
  },
  {
    title: "E-commerce Development",
    description:
      "Custom E-commerce Stores, Payment Gateway Setup, Product Management Systems, and Secure Checkout Solutions.",
    images: [
      "https://placehold.co/400x600/7c3aed/ffffff?text=E-commerce+1",
      "https://placehold.co/400x600/a21caf/ffffff?text=E-commerce+2",
    ],
  },
  {
    title: "Landing Page Development",
    description:
      "High-Converting Landing Pages, A/B Testing, Lead Generation Forms, Fast Load Times, SEO Optimization, and Analytics Integration.",
    images: [
      "https://placehold.co/400x600/16a34a/ffffff?text=Landing+Page+1",
      "https://placehold.co/400x600/059669/ffffff?text=Landing+Page+2",
    ],
  },
];

export default function FeaturedProjects() {
  const componentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const textSections = gsap.utils.toArray(".text-section");
      const imageSections = gsap.utils.toArray(".image-section");

      gsap.set(imageSections[0], { autoAlpha: 1 });

      textSections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(imageSections, {
              autoAlpha: 0,
              duration: 0.3,
              overwrite: "auto",
            });
            gsap.to(imageSections[index], {
              autoAlpha: 1,
              duration: 0.3,
              overwrite: "auto",
            });
          },
          onEnterBack: () => {
            gsap.to(imageSections, {
              autoAlpha: 0,
              duration: 0.3,
              overwrite: "auto",
            });
            gsap.to(imageSections[index], {
              autoAlpha: 1,
              duration: 0.3,
              overwrite: "auto",
            });
          },
        });
      });
    }, componentRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={componentRef}
      className="featured-projects-section w-full rounded-t-4xl bg-black text-white py-20 lg:py-40"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center px-8 mb-20 lg:mb-32">
        <span className="inline-block border border-emerald-400 text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full">
          Our Services
        </span>
        <h2 className="mt-6 text-5xl lg:text-7xl font-bold">
          We Turn <span className="italic font-serif text-blue-500">Complex</span> Ideas Into Flawless
          <span className="italic font-serif text-blue-500">   Web Applications</span>
        </h2>
      </div>

      {/* দুই কলামের গ্রিড */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* বাম দিকের টেক্সট কন্টেইনার */}
        <div className="text-content-container space-y-48 lg:space-y-96">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className="text-section h-96 mt-20 flex flex-col justify-center px-8"
            >
              <h2 className="text-5xl lg:text-7xl font-bold italic"
              >
                {project.title}
              </h2>
              <hr className="text-blue-500 mt-3" />
              <p className="mt-6 text-lg text-neutral-400 max-w-md">
                {project.description}
              </p>
              <a
                href="#"
                className="flex items-center mt-8 text-blue-500 font-semibold hover:text-emerald-300 transition-colors"
              >
                See More <ArrowRight className="ml-2" size={20} />
              </a>
            </div>
          ))}
        </div>

        {/* ডান দিকের স্টিকি ইমেজ কন্টেইনার */}
        <div className="w-full h-screen sticky top-0 flex items-center">
          <div className="relative w-full h-full">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="image-section absolute inset-0 flex items-center justify-center gap-8 opacity-0"
              >
                {/* এই দুটি ছবির translate-y এর মান পরিবর্তন করে আপনি ছবিগুলোকে উপরে বা নিচে সরাতে পারবেন।
                  -translate-y-8: ছবি উপরে যাবে। মান বাড়ালে (যেমন: -translate-y-16) আরও উপরে যাবে।
                  translate-y-8: ছবি নিচে যাবে। মান বাড়ালে (যেমন: translate-y-16) আরও নিচে যাবে।
                */}
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-1/2 max-w-xs rounded-2xl shadow-2xl transform -translate-y-10"
                />
                <img
                  src={project.images[1]}
                  alt={project.title}
                  className="w-1/2 max-w-xs rounded-2xl shadow-2xl transform translate-y-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
