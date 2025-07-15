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
      "https://placehold.co/400x600/a7c5ff/333?text=Web+App+1",
      "https://placehold.co/400x600/c0f6ff/333?text=Web+App+2",
    ],
  },
  {
    title: "Logo & Branding",
    description:
      "Logo Design, Full Branding, Business Branding, 3d logo, Custom Logo, Visual Identity, Brand Strategy, Social Media Branding, and Brand Guidelines.",
    images: [
      "https://placehold.co/400x600/ffd1d1/333?text=Branding+1",
      "https://placehold.co/400x600/fdfab1/333?text=Branding+2",
    ],
  },
  {
    title: "Webflow & Framer",
    description:
      "Custom Webflow Websites, Webflow Plugin, Framer Prototypes, Framer Material, Framer App, CMS Integration, Rapid Development.",
    images: [
      "https://placehold.co/400x600/d1ffd3/333?text=Webflow+Site",
      "https://placehold.co/400x600/e0e9ff/333?text=Framer+Site",
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
          What We Do
        </span>
        <h2 className="mt-6 text-5xl lg:text-7xl font-bold">
          We Design{" "}
          <span className="italic font-serif text-neutral-300">Brands</span>{" "}
          That <span className="italic font-serif text-neutral-300">Speak</span>{" "}
          To Audiences
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
              <h2 className="text-5xl lg:text-7xl font-bold italic">
                {project.title}
              </h2>
              <p className="mt-6 text-lg text-neutral-400 max-w-md">
                {project.description}
              </p>
              <a
                href="#"
                className="flex items-center mt-8 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
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
