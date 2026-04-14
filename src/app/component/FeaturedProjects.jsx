"use client";
import React, { useRef, useState, useEffect } from "react";

const featuredProjects = [
  {
    title: "Landing Pages",
    category: "High-Converting Design",
    tag: "Service 01",
    description:
      "We design laser-focused landing pages built to convert visitors into customers. Optimized for speed, SEO, and compelling calls-to-action that drive real business results.",
    serviceLink: "/services/landing-page",
    images: [
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    accent: "#3b82f6",
    stats: [
      { label: "Avg. Conversion Boost", value: "+85%" },
      { label: "Pages Delivered", value: "40+" },
    ],
  },
  {
    title: "E-commerce Solutions",
    category: "Retail & Online Store",
    tag: "Service 02",
    description:
      "Scalable, feature-rich online stores built to sell. From seamless checkout flows and product management to integrated payment gateways — we build stores that perform.",
    serviceLink: "/services/ecommerce",
    images: [
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    accent: "#6366f1",
    stats: [
      { label: "Revenue Generated", value: "$2M+" },
      { label: "Stores Launched", value: "25+" },
    ],
  },
  {
    title: "Custom Web Development",
    category: "Full-Stack Applications",
    tag: "Service 03",
    description:
      "Bespoke web applications engineered to your exact specifications. From complex dashboards to SaaS platforms — modern architecture, clean code, exceptional performance.",
    serviceLink: "/services/custom-dev",
    images: [
      "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    accent: "#0ea5e9",
    stats: [
      { label: "Projects Completed", value: "60+" },
      { label: "Client Satisfaction", value: "98%" },
    ],
  },
  {
    title: "Digital Marketing",
    category: "Growth & Visibility",
    tag: "Service 04",
    description:
      "Data-driven digital marketing strategies that amplify your brand presence. SEO, social media campaigns, and targeted advertising to grow your audience and revenue.",
    serviceLink: "/services",
    images: [
      "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/67112/pexels-photo-67112.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    accent: "#8b5cf6",
    stats: [
      { label: "Avg. Traffic Growth", value: "+120%" },
      { label: "Campaigns Run", value: "80+" },
    ],
  },
];

const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Single project image pair shown on the right sticky panel
function ImagePair({ project, visible }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: "420px", height: "480px" }}>
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "240px",
            height: "240px",
            borderRadius: "9999px",
            background: project.accent,
            filter: "blur(80px)",
            opacity: 0.12,
          }}
        />

        {/* Image 1 — top-left */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "20px",
            width: "230px",
            aspectRatio: "3/4",
            borderRadius: "24px",
            overflow: "hidden",
            border: "6px solid white",
            boxShadow: "0 25px 50px -15px rgba(0,0,0,0.15)",
            transform: "rotate(-6deg)",
            background: "white",
            transition: "transform 0.5s ease",
            transform: visible ? "rotate(-6deg) scale(1)" : "rotate(-6deg) scale(0.95)",
          }}
        >
          <img
            src={project.images[0]}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Image 2 — bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "250px",
            aspectRatio: "3/4",
            borderRadius: "24px",
            overflow: "hidden",
            border: "6px solid white",
            boxShadow: "0 25px 50px -15px rgba(0,0,0,0.15)",
            transform: visible ? "rotate(6deg) scale(1)" : "rotate(6deg) scale(0.95)",
            background: "white",
            transition: "transform 0.5s ease 0.1s",
          }}
        >
          <img
            src={project.images[1]}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    sectionRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          root: null,
          rootMargin: "-30% 0px -30% 0px", // trigger when element is in the middle 40% of viewport
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 font-sans rounded-[3rem] relative overflow-hidden py-10">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 border-t border-slate-200 pointer-events-none" />

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 text-center relative z-10">
        <div className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-6 md:mb-10 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          Our Work
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900">
          Featured{" "}
          <span className="text-blue-600 italic font-serif relative inline-block">
            Web Development
            <svg
              className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-blue-600/80"
              viewBox="0 0 200 9"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          <br className="hidden md:block" />
          <span className="text-slate-500">&amp; Digital Marketing</span>{" "}
          <span className="text-blue-600 italic font-serif relative inline-block">
            Projects
            <svg
              className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 text-blue-600/80"
              viewBox="0 0 200 9"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>

        <p className="mt-6 text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          A curated look at the services we are most passionate about — blending
          creative design with performance-driven engineering.
        </p>
      </div>

      {/* ── Interactive Content Grid ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 px-6 relative z-10">

        {/* Left: Scrolling text sections */}
        <div className="space-y-[20vh] lg:space-y-[50vh] py-[5vh] lg:py-[20vh] z-10">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="min-h-[45vh] md:min-h-[55vh] flex flex-col justify-center max-w-lg group"
            >
              {/* Tag + Category row */}
              <div className="mb-4 flex items-center gap-3 flex-wrap">
                <span
                  className="text-[10px] font-mono font-bold px-3 py-1 rounded-full border"
                  style={{
                    color: project.accent,
                    borderColor: project.accent + "44",
                    background: project.accent + "18",
                  }}
                >
                  {project.tag}
                </span>
                <div
                  className="h-[2px] w-8 md:w-12 rounded-full transition-all duration-500 group-hover:w-16"
                  style={{ background: project.accent }}
                />
                <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 text-slate-800 transition-colors duration-300 group-hover:text-blue-600">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-5 font-medium">
                {project.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-8 mb-7">
                {project.stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-2xl font-bold" style={{ color: project.accent }}>
                      {stat.value}
                    </p>
                    <p className="text-slate-400 text-xs font-medium mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Mobile: inline images */}
              <div className="lg:hidden w-full mb-8 grid grid-cols-2 gap-4">
                <img
                  src={project.images[0]}
                  className="w-full aspect-[3/4] object-cover rounded-2xl border border-slate-200 shadow-md"
                  alt={project.title}
                />
                <img
                  src={project.images[1]}
                  className="w-full aspect-[3/4] object-cover rounded-2xl border border-slate-200 shadow-md mt-6"
                  alt={project.title}
                />
              </div>

              {/* CTA */}
              <a
                href={project.serviceLink}
                className="inline-flex items-center gap-3 font-bold hover:gap-5 transition-all duration-300 text-sm md:text-base"
                style={{ color: project.accent }}
              >
                EXPLORE THIS SERVICE <ArrowIcon />
              </a>
            </div>
          ))}
        </div>

        {/* Right: Sticky image panel — Desktop only */}
        <div className="hidden lg:block w-full relative">
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Accent color indicator bar */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "0px",
                transform: "translateY(-50%)",
                width: "4px",
                height: "80px",
                borderRadius: "9999px",
                background: featuredProjects[activeIndex].accent,
                transition: "background 0.4s ease",
              }}
            />

            {/* Image pairs — only the active one is visible */}
            <div style={{ position: "relative", width: "100%", height: "500px" }}>
              {featuredProjects.map((project, index) => (
                <ImagePair
                  key={index}
                  project={project}
                  visible={index === activeIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 text-center pb-20 pt-4">
        <a
          href="/services"
          className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-blue-600 transition-all duration-300 shadow-xl hover:shadow-blue-500/30 hover:scale-105"
        >
          View All Services <ArrowIcon />
        </a>
      </div>
    </div>
  );
}