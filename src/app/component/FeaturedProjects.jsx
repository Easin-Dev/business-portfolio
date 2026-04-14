import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";

// External Script Loader for GSAP
const useScript = (url) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
  return loaded;
};

const featuredProjects = [
  {
    title: "Web Development",
    category: "Full-Stack Solutions",
    description:
      "Crafting high-performance digital experiences with cutting-edge technologies. From frontend aesthetics to robust backend architectures.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    ],
  },
  {
    title: "E-commerce Pro",
    category: "Retail Tech",
    description:
      "Scalable online stores designed to convert. Integrated payment systems, lightning-fast product filtering, and seamless checkouts.",
    images: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1522204538344-922f76efe0f9?auto=format&fit=crop&q=80&w=600",
    ],
  },
  {
    title: "Landing Pages",
    category: "Marketing Focus",
    description:
      "High-converting landing pages built for growth. Optimized for SEO, speed, and maximum user engagement.",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=600",
    ],
  },
];

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default function FeaturedProjects() {
  const componentRef = useRef(null);
  const gsapLoaded = useScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
  const scrollLoaded = useScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");

  useLayoutEffect(() => {
    if (!gsapLoaded || !scrollLoaded || !window.gsap) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const textSections = gsap.utils.toArray(".text-section");
      const imageSections = gsap.utils.toArray(".image-group");

      // Initial state: first image visible
      gsap.set(imageSections[0], { autoAlpha: 1, scale: 1 });

      textSections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              // Fade in active group
              gsap.to(imageSections[index], {
                autoAlpha: 1,
                duration: 0.5,
                ease: "none",
                overwrite: "auto",
              });
              // Sublte scale effect inside images
              gsap.to(imageSections[index].querySelectorAll('.img-item'), {
                scale: 1,
                duration: 0.7,
                ease: "power2.out"
              });
            } else {
              // Fade out inactive groups
              gsap.to(imageSections[index], {
                autoAlpha: 0,
                duration: 0.3,
                overwrite: "auto",
              });
              gsap.to(imageSections[index].querySelectorAll('.img-item'), {
                scale: 0.95,
                duration: 0.4
              });
            }
          },
        });
      });
    }, componentRef);

    return () => ctx.revert();
  }, [gsapLoaded, scrollLoaded]);

  return (
    <div ref={componentRef} className="w-full bg-[#050505] text-white selection:bg-blue-500/30 font-sans">
      {/* --- Section Header --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-32 text-center">
        <div className="inline-flex items-center gap-2 border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] md:text-xs font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-6 md:mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Our Portfolio
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white">
          Featured <span className="text-blue-600 italic font-serif relative inline-block">
            Web Development
            <svg className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-blue-600/80" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
          </span> <br className="hidden md:block" />
          <span className="text-neutral-600">& Digital Marketing</span>
          <span className="text-blue-600 italic font-serif relative inline-block ml-3">
            Projects
            <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 text-blue-600/80" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
          </span>
        </h2>
      </div>

      {/* --- Interactive Content Grid --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 px-6 relative">

        {/* Left Side: Scrolling Content */}
        <div className="space-y-[20vh] lg:space-y-[50vh] py-[5vh] lg:py-[20vh] z-10">
          {featuredProjects.map((project, index) => (
            <div key={index} className="text-section min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center max-w-lg group">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-blue-500 font-mono text-lg">0{index + 1}</span>
                <div className="h-[1px] w-8 md:w-12 bg-blue-500/50 group-hover:w-16 transition-all duration-500" />
                <span className="text-neutral-500 text-[10px] uppercase tracking-widest">{project.category}</span>
              </div>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 group-hover:text-blue-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                {project.description}
              </p>

              {/* Mobile Only: Inline Image for better responsiveness */}
              <div className="lg:hidden w-full mb-8 grid grid-cols-2 gap-4">
                <Image width={800} height={800} src={project.images[0]} className="w-full aspect-[3/4] object-cover rounded-xl border border-white/10" alt="Work" />
                <Image width={800} height={800} src={project.images[1]} className="w-full aspect-[3/4] object-cover rounded-xl border border-white/10 mt-4" alt="Work" />
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-3 text-blue-500 font-bold hover:gap-5 transition-all duration-300 text-sm md:text-base"
              >
                EXPLORE CASE STUDY <ArrowIcon />
              </a>
            </div>
          ))}
        </div>

        {/* Right Side: Fixed Visuals (Desktop Only) */}
        <div className="hidden lg:flex w-full h-screen sticky top-0 items-center justify-center overflow-hidden pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="image-group absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
              >
                <div className="relative w-full max-w-lg flex items-center justify-center">
                  {/* Image 1 - Top Leftish */}
                  <div className="img-item absolute w-[240px] xl:w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10 -translate-x-20 -translate-y-16 rotate-[-6deg] scale-95 origin-bottom">
                    <Image width={800} height={800} src={project.images[0]} className="w-full h-full object-cover" alt="Work" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Image 2 - Bottom Rightish */}
                  <div className="img-item absolute w-[260px] xl:w-[300px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10 translate-x-20 translate-y-16 rotate-[6deg] scale-95 origin-top">
                    <Image width={800} height={800} src={project.images[1]} className="w-full h-full object-cover" alt="Work" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}