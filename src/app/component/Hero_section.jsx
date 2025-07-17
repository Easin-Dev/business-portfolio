"use client";
import React, { useState, useEffect, useId, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spotlight } from "./ui/spotlight";
import { BackgroundGradient } from "./ui/background-gradient";

// Helper Component for Text Flip Animation
const ContainerTextFlip = ({
  words = ["E-commerce", "Portfolios", "SaaS Apps", "Landing Pages"],
  interval = 2500,
  className,
}) => {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (textRef.current) {
        setWidth(textRef.current.offsetWidth + 40); // Add padding
      }
    };
    updateWidth();
  }, [currentWordIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.div
      layout
      animate={{ width }}
      transition={{ duration: 0.4, ease: "circOut" }}
      // UPDATED: Background changed to transparent with blur
      className={`relative inline-flex items-center justify-center rounded-lg px-4 py-2 text-center align-middle bg-black/20 backdrop-blur-sm border border-white/10 ${className}`}
      key={words[currentWordIndex]}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={words[currentWordIndex]}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute"
          ref={textRef}
        >
          {words[currentWordIndex]}
        </motion.div>
      </AnimatePresence>
      {/* Invisible text to maintain layout width */}
      <span className="opacity-0" ref={textRef}>{words[currentWordIndex]}</span>
    </motion.div>
  );
};


export default function Hero_section() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-start justify-center pt-28 md:pt-36 lg:pt-40 overflow-hidden bg-[#050709] text-white"
    >
      {/* Spotlights for background effect */}
      <Spotlight
        className="-top-20 left-0 md:left-40 md:-top-20"
        fill="hsl(158, 89%, 30%)"
      />
      <Spotlight className="top-1/4 left-1/2" fill="hsl(259, 80%, 60%)" />
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] select-none [background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"></div>

      {/* Floating Mockups - Hidden on mobile */}
      <BackgroundGradient containerClassName="hidden md:block absolute top-10 -left-24 md:left-5 lg:left-10 w-64 md:w-80 lg:w-96 z-10 transform rotate-[-15deg] hover:rotate-[-10deg] transition-transform duration-500">
        <img
          src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758837d0dffb8e32f63_137e4404fe981fb7e0f2f0db1f9ec8e1_3.avif"
          alt="Project Mockup 1"
          className="w-full h-full object-contain rounded-lg opacity-80"
        />
      </BackgroundGradient>
      <BackgroundGradient containerClassName="hidden md:block absolute bottom-10 -right-24 md:right-5 lg:right-10 w-64 md:w-80 lg:w-96 z-10 transform rotate-[15deg] hover:rotate-[10deg] transition-transform duration-500">
        <img
          src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758594e31e0312a925f_e0482580c600f74a17f23e4f9a90e82e_1.avif"
          alt="Project Mockup 2"
          className="w-full h-full object-contain rounded-lg opacity-80"
        />
      </BackgroundGradient>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-200 tracking-wider">
          ScaleUp Web
        </h2>
        <p className="mt-3 md:mt-4 text-emerald-400 font-medium text-sm md:text-base">
          A Full-Stack Web Studio for Ambitious Brands
        </p>

        {/* Animated H1 Tag */}
        <h1 className="mt-4 font-bold text-4xl sm:text-5xl md:text-6xl max-w-5xl leading-tight md:leading-snug">
          We build stunning
          <br className="sm:hidden" />
          <ContainerTextFlip
            words={["E-commerce", "Portfolios", "SaaS Apps", "Landing Pages"]}
            className="text-4xl sm:text-5xl md:text-6xl mx-2 md:mx-4"
          />
          <br className="sm:hidden" />
          to boost your business
        </h1>

        <div className="mt-6">
          <span className="inline-block bg-gray-800/60 border border-gray-700 rounded-full px-3 py-2 text-xs sm:text-sm text-gray-300 text-center">
            Full-Stack Web Studio • Bangladesh-based • 100% Refund Policy
          </span>
        </div>
        <div className="mt-8 md:mt-10">
          <a
            href="#contact"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300"
          >
            Book a Free Call
          </a>
        </div>

        {/* Service Marquee */}
        <div className="relative w-full max-w-4xl mx-auto mt-12 md:mt-16 overflow-hidden">
          <div className="service-marquee-container space-y-4">
            <div className="service-marquee rtl">
              <span className="shine-text">Landing Pages</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span className="shine-text">E-commerce Solutions</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span className="shine-text">Full-Stack Projects</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span className="shine-text">Business Websites</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span className="shine-text">Landing Pages</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span className="shine-text">E-commerce Solutions</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span className="shine-text">Full-Stack Projects</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
              <span className="shine-text">Business Websites</span>{" "}
              <span className="text-emerald-500 mx-3">•</span>
            </div>
            <div className="service-marquee ltr">
              <span className="shine-text">React.js Development</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span className="shine-text">Next.js Apps</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span className="shine-text">Headless CMS</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span className="shine-text">API Integration</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span className="shine-text">React.js Development</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span className="shine-text">Next.js Apps</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span className="shine-text">Headless CMS</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
              <span className="shine-text">API Integration</span>{" "}
              <span className="text-purple-400 mx-3">•</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
          .service-marquee-container {
            -webkit-mask-image: linear-gradient(
              to right,
              transparent,
              white 10%,
              white 90%,
              transparent
            );
            mask-image: linear-gradient(
              to right,
              transparent,
              white 10%,
              white 90%,
              transparent
            );
          }
          .service-marquee {
            display: flex;
            flex-shrink: 0;
            justify-content: flex-start;
            width: max-content;
          }
          .service-marquee span {
            white-space: nowrap;
            font-size: 1.125rem;
            color: #9ca3af;
          }
          /* Shine effect for the text */
          .shine-text {
            background: linear-gradient(90deg, #9ca3af, #ffffff, #9ca3af);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: text-shine-anim 5s linear infinite;
          }
          .service-marquee.rtl {
            animation: service-marquee-anim 40s linear infinite;
          }
          .service-marquee.ltr {
            animation: service-marquee-anim 55s linear infinite reverse;
          }
          @keyframes service-marquee-anim {
            from {
              transform: translateX(0%);
            }
            to {
              transform: translateX(-50%);
            }
          }
          @keyframes text-shine-anim {
            from {
              background-position: 200% center;
            }
            to {
              background-position: -200% center;
            }
          }
        `}</style>
    </section>
  );
}
