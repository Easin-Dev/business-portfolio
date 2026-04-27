import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";

// Helper to load external scripts in the preview environment
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

const colorPalettes = [
  { bgColor: "bg-blue-50", accentColor: "text-blue-600", textColor: "text-slate-900" },
  { bgColor: "bg-rose-50", accentColor: "text-rose-600", textColor: "text-slate-900" },
  { bgColor: "bg-amber-50", accentColor: "text-amber-600", textColor: "text-slate-900" },
  { bgColor: "bg-cyan-50", accentColor: "text-cyan-600", textColor: "text-slate-900" },
];

const ProjectCard = ({ project, index }) => {
  return (
    <div
      className={`project-card w-full min-h-[60vh] md:h-[70vh] flex items-center justify-center p-6 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl border border-white/50 sticky top-[15vh] mb-[10vh] overflow-hidden ${project.bgColor} ${project.textColor}`}
      style={{ zIndex: index + 1 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white shadow-sm ${project.accentColor}`}>
              {project.category}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] mb-4">
            {project.title}
          </h2>
          <p className="text-lg md:text-xl opacity-75 leading-relaxed max-w-xl">
            {project.description}
          </p>
          <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className={`inline-block mt-8 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 bg-white shadow-md border border-slate-100 ${project.accentColor}`}>
            View Case Study
          </a>
        </div>

        {/* Image Display */}
        <div className="order-1 lg:order-2">
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl bg-white p-2 aspect-video lg:aspect-square w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out p-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StickyScrollSection() {
  const containerRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const gsapLoaded = useScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
  const scrollLoaded = useScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        
        // Filter featured projects and map colors
        const featuredProjects = (Array.isArray(data) ? data : [])
          .filter(p => p.featured)
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .slice(0, 4)
          .map((p, index) => ({
            ...p,
            bgColor: colorPalettes[index % colorPalettes.length].bgColor,
            accentColor: colorPalettes[index % colorPalettes.length].accentColor,
            textColor: colorPalettes[index % colorPalettes.length].textColor,
          }));
          
        setProjects(featuredProjects);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    }
    fetchProjects();
  }, []);

  useLayoutEffect(() => {
    if (!gsapLoaded || !scrollLoaded || !window.gsap || projects.length === 0) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            filter: "blur(2px)",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [gsapLoaded, scrollLoaded, projects]);

  return (
    <div ref={containerRef} className="bg-[#fcfcfc] min-h-screen font-sans">
      {/* Header Section */}
      <header className="relative w-full py-20 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tighter mb-6 border border-emerald-100">
            Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-2">
            Proven Success In
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-blue-600 leading-[1.1] relative inline-block mt-2">
            Every Industry
            <svg className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-blue-600/80" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
          </h2>
          <p className="mt-8 text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Exploring our portfolio of high-impact digital solutions across diverse sectors.
          </p>
        </div>
      </header>

      {/* Sticky Cards Section */}
      <section className="px-4 md:px-8 pb-32">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}