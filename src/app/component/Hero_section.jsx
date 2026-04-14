"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Code, ShoppingBag, Globe, TrendingUp, Bot, BarChart, Rocket } from "lucide-react";
import Image from "next/image";

export default function Hero_section() {
  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col items-center pt-28 pb-20 font-sans text-slate-900 overflow-hidden">

      {/* Top Header Logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 md:top-8 z-50 flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
        <span className="text-xl md:text-2xl font-black text-slate-800 tracking-tight relative inline-block items-baseline">
          ScaleUp <span className="text-blue-600"><span className="text-2xl md:text-3xl">W</span>eb</span>
          <svg className="absolute -bottom-1 left-0 w-full h-1.5 md:h-2 text-blue-600/80" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      {/* Decorative blurred blobs background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[45vw] h-[45vw] bg-blue-400/20 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[5%] w-80 h-80 bg-slate-100/60 blur-[100px] rounded-full"></div>
      </div>

      {/* Floating 3D Tech Icons (Hidden on mobile) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-10 w-full max-w-[1400px] mx-auto">
        {/* Left Side */}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[18%] -left-[2%] lg:-left-[1%] w-16 h-16 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center p-3 pointer-events-auto hover:rotate-6 hover:scale-110 transition-all cursor-pointer">
          <Image width={800} height={800} src="https://i.postimg.cc/g0CQLXjC/wordpress.png" alt="WordPress" className="w-full h-full object-contain" draggable={false} />
        </motion.div>

        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[40%] -left-[4%] lg:-left-[5%] w-14 h-14 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center p-2.5 pointer-events-auto hover:rotate-6 hover:scale-110 transition-all cursor-pointer">
          <Image width={800} height={800} src="https://i.postimg.cc/d0bpZk3H/javascript-(1).png" alt="JavaScript" className="w-full h-full object-contain" draggable={false} />
        </motion.div>

        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[65%] -left-[1%] lg:left-[0%] w-16 h-16 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center p-3 pointer-events-auto hover:-rotate-6 hover:scale-110 transition-all cursor-pointer">
          <Image width={800} height={800} src="https://i.postimg.cc/cH82mhYY/figma.png" alt="Figma" className="w-full h-full object-contain" draggable={false} />
        </motion.div>

        {/* Right Side */}
        <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[15%] -right-[1%] lg:-right-[2%] w-16 h-16 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center p-3 pointer-events-auto hover:-rotate-6 hover:scale-110 transition-all cursor-pointer">
          <Image width={800} height={800} src="https://i.postimg.cc/ZYF20qSf/shopify.png" alt="Shopify" className="w-full h-full object-contain" draggable={false} />
        </motion.div>

        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-[42%] -right-[4%] lg:-right-[5%] w-14 h-14 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center p-2.5 pointer-events-auto hover:rotate-6 hover:scale-110 transition-all cursor-pointer">
          <Image width={800} height={800} src="https://i.postimg.cc/sfYdScp4/react-(1).png" alt="React" className="w-full h-full object-contain" draggable={false} />
        </motion.div>

        <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} className="absolute top-[60%] -right-[2%] lg:-right-[1%] w-16 h-16 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center p-3 pointer-events-auto hover:rotate-6 hover:scale-110 transition-all cursor-pointer">
          <Image width={800} height={800} src="https://i.postimg.cc/YjcdSBsw/visual-studio-code.png" alt="VS Code" className="w-full h-full object-contain" draggable={false} />
        </motion.div>

        <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute top-[78%] right-[2%] lg:right-[4%] w-12 h-12 bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1rem] shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center p-2.5 pointer-events-auto hover:-rotate-6 hover:scale-110 transition-all cursor-pointer">
          <Image width={800} height={800} src="https://i.postimg.cc/SKB3Y2RG/framer.png" alt="Framer" className="w-full h-full object-contain" draggable={false} />
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
        >
          <div className="w-5 h-5 rounded-full bg-[#1e293b] flex items-center justify-center text-white"><Rocket size={10} /></div>
          <span className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wide">Top-Rated Digital Agency</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-[#0f172a] leading-[1.1] mb-6">
            Expert Web <span className="text-[#1d4ed8] relative inline-block">
              Design
              <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 text-blue-600/80" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span> & Development <br className="hidden md:block" />
            <span className="text-[#1d4ed8] relative inline-block">
              Digital Marketing Solutions
              <svg className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-blue-600/80" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            We build high-performance websites and execute data-driven digital marketing campaigns to help your service business generate more leads and grow revenue seamlessly.
          </p>
        </motion.div>

        {/* Flowchart Section (Hidden on very small screens, displayed block on sm+) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative w-full max-w-[1100px] mt-16 mb-16 hidden sm:block h-[300px]"
        >
          {/* Connecting SVG Lines & Animated Flowing Dots */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 300" preserveAspectRatio="none">
            {/* Left side connections */}
            <path d="M 150 50 C 300 50, 300 150, 400 150" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 150 150 L 400 150" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 150 250 C 300 250, 300 150, 400 150" stroke="#e2e8f0" strokeWidth="2" fill="none" />

            {/* Right side connections */}
            <path d="M 600 150 C 700 150, 700 50, 850 50" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 600 150 L 850 150" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 600 150 C 700 150, 700 250, 850 250" stroke="#e2e8f0" strokeWidth="2" fill="none" />

            {/* Animated Dots for Left Side */}
            <circle r="4" fill="#3b82f6" filter="drop-shadow(0 0 6px rgba(59,130,246,0.8))">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 150 50 C 300 50, 300 150, 400 150" />
            </circle>
            <circle r="4" fill="#3b82f6" filter="drop-shadow(0 0 6px rgba(59,130,246,0.8))">
              <animateMotion dur="2.5s" repeatCount="indefinite" begin="1s" path="M 150 150 L 400 150" />
            </circle>
            <circle r="4" fill="#3b82f6" filter="drop-shadow(0 0 6px rgba(59,130,246,0.8))">
              <animateMotion dur="4s" repeatCount="indefinite" begin="0.5s" path="M 150 250 C 300 250, 300 150, 400 150" />
            </circle>

            {/* Animated Dots for Right Side */}
            <circle r="4" fill="#8b5cf6" filter="drop-shadow(0 0 6px rgba(139,92,246,0.8))">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 600 150 C 700 150, 700 50, 850 50" />
            </circle>
            <circle r="4" fill="#8b5cf6" filter="drop-shadow(0 0 6px rgba(139,92,246,0.8))">
              <animateMotion dur="3.2s" repeatCount="indefinite" begin="0.2s" path="M 600 150 L 850 150" />
            </circle>
            <circle r="4" fill="#8b5cf6" filter="drop-shadow(0 0 6px rgba(139,92,246,0.8))">
              <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.5s" path="M 600 150 C 700 150, 700 250, 850 250" />
            </circle>
          </svg>

          {/* Left Nodes */}
          <div className="absolute top-[26px] left-[10%] xl:left-[12%] w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-emerald-500 border border-slate-50 z-10 hover:scale-110 transition-transform">
            <Code size={20} />
          </div>
          <div className="absolute top-[126px] left-[5%] xl:left-[7%] w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-blue-500 border border-slate-50 z-10 hover:scale-110 transition-transform">
            <ShoppingBag size={24} />
          </div>
          <div className="absolute top-[226px] left-[10%] xl:left-[12%] w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-orange-500 border border-slate-50 z-10 hover:scale-110 transition-transform">
            <Globe size={20} />
          </div>


          {/* Center Big Node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] bg-white/80 backdrop-blur-md border border-white/80 rounded-[2rem] shadow-[0_15px_40px_rgb(0,0,0,0.06)] p-8 z-20 flex flex-wrap justify-center gap-3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-white to-slate-50/50">
            <span className="text-xs xl:text-sm bg-white text-slate-700 rounded-full px-4 py-2 font-medium border border-slate-200 shadow-sm hover:-translate-y-0.5 transition-transform cursor-default">Web Development</span>
            <span className="text-xs xl:text-sm bg-white text-slate-700 rounded-full px-4 py-2 font-medium border border-slate-200 shadow-sm hover:-translate-y-0.5 transition-transform cursor-default">E-Commerce</span>
            <span className="text-xs xl:text-sm bg-white text-slate-700 rounded-full px-4 py-2 font-medium border border-slate-200 shadow-sm hover:-translate-y-0.5 transition-transform cursor-default">Shopify Setup</span>
            <span className="text-xs xl:text-sm bg-white text-slate-700 rounded-full px-4 py-2 font-medium border border-slate-200 shadow-sm hover:-translate-y-0.5 transition-transform cursor-default">Landing Pages</span>
            <span className="text-xs xl:text-sm bg-white text-slate-700 rounded-full px-4 py-2 font-medium border border-slate-200 shadow-sm hover:-translate-y-0.5 transition-transform cursor-default">WordPress</span>
            <span className="text-xs xl:text-sm bg-white text-slate-700 rounded-full px-4 py-2 font-medium border border-slate-200 shadow-sm hover:-translate-y-0.5 transition-transform cursor-default">Meta & Google Ads</span>
            <span className="text-xs xl:text-sm bg-white text-slate-700 rounded-full px-4 py-2 font-medium border border-slate-200 shadow-sm hover:-translate-y-0.5 transition-transform cursor-default">SEO Optimization</span>
          </div>



          {/* Right Nodes */}
          <div className="absolute top-[26px] right-[10%] xl:right-[12%] w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-indigo-500 border border-slate-50 z-10 hover:scale-110 transition-transform">
            <TrendingUp size={20} />
          </div>
          <div className="absolute top-[126px] right-[5%] xl:right-[7%] w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-purple-500 border border-slate-50 z-10 hover:scale-110 transition-transform bg-gradient-to-br from-white to-purple-50">
            <Bot size={24} />
          </div>
          <div className="absolute top-[226px] right-[10%] xl:right-[12%] w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-sky-500 border border-slate-50 z-10 hover:scale-110 transition-transform">
            <BarChart size={20} />
          </div>
        </motion.div>

        {/* Fallback for Mobile (Instead of flowchart) */}
        <div className="sm:hidden flex flex-wrap justify-center gap-3 mt-10 mb-10 w-full px-4">
          <span className="text-xs bg-white text-slate-700 shadow-sm rounded-full px-4 py-2 font-medium border border-slate-200">Web Development</span>
          <span className="text-xs bg-white text-slate-700 shadow-sm rounded-full px-4 py-2 font-medium border border-slate-200">E-Commerce</span>
          <span className="text-xs bg-white text-slate-700 shadow-sm rounded-full px-4 py-2 font-medium border border-slate-200">Shopify Setup</span>
          <span className="text-xs bg-white text-slate-700 shadow-sm rounded-full px-4 py-2 font-medium border border-slate-200">Meta & Google Ads</span>
          <span className="text-xs bg-white text-slate-700 shadow-sm rounded-full px-4 py-2 font-medium border border-slate-200">SEO Optimization</span>
        </div>

        {/* Bottom Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="group relative overflow-hidden flex items-center justify-center sm:justify-between gap-3 px-8 py-3.5 w-full sm:w-auto rounded-full bg-gradient-to-r from-[#1d4ed8] to-blue-500 text-white font-semibold transition-all shadow-[0_8px_30px_rgba(29,78,216,0.4)] hover:shadow-[0_8px_40px_rgba(29,78,216,0.6)] border border-blue-400/20"
          >
            <span className="relative z-10">Get Started</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:translate-x-1 transition-all z-10">
              <ChevronRight size={16} className="text-white group-hover:text-blue-600 transition-colors" />
            </div>
            {/* Shimmer effect */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-700 ease-in-out z-0"></div>
          </motion.a>
          <button className="px-8 py-3.5 w-full sm:w-auto rounded-full bg-transparent border-[1.5px] border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
            Schedule a Demo
          </button>
        </motion.div>

      </div>
    </section>
  );
}