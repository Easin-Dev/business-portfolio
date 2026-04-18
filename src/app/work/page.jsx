"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../component/PageHero";
import { ProjectSkeleton } from "../component/loaders/Skeleton";
import { ExternalLink, Heart } from "lucide-react";

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
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setAllProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setTimeout(() => setLoading(false), 800); // Small delay for aesthetic effect
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "Explore All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full bg-[#050709] text-white selection:bg-purple-500/30">
      <PageHero 
        breadcrumb="Work"
        title="Building Digital Experiences,"
        highlight="That Drive Engagement"
        subtitle="Explore our latest projects across web development, app design, and digital marketing."
        spotlightColor="hsl(158, 89%, 30%)"
      />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* ফিল্টার বাটন */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 text-sm lg:text-base rounded-full transition-all duration-300 font-bold border
                ${activeCategory === category
                  ? "bg-purple-600 text-white border-purple-600 shadow-xl shadow-purple-600/20"
                  : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* প্রজেক্ট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {loading ? (
            [1, 2, 3, 4].map((i) => <ProjectSkeleton key={i} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative rounded-[32px] overflow-hidden bg-white/5 border border-white/5 aspect-[4/3] group-hover:border-purple-600/30 transition-all duration-500">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-purple-400 text-xs font-black uppercase tracking-widest mb-2">{project.category}</p>
                          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-gray-400 text-sm max-w-xs line-clamp-2 italic mb-4">
                            {project.description}
                          </p>
                        </div>
                        <a 
                          href={project.link} 
                          target="_blank"
                          className="bg-white text-black p-4 rounded-2xl hover:bg-purple-600 hover:text-white transition-all shadow-xl"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-6 right-6 p-2 bg-red-500 text-white rounded-xl shadow-lg">
                        <Heart size={16} fill="white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500 italic">
            No projects found in this category yet.
          </div>
        )}
      </main>
    </div>
  );
}
