"use client";
import React, { useState, useEffect, useId, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spotlight } from "./ui/spotlight";
import { BackgroundGradient } from "./ui/background-gradient";
import { Verified, Rocket, Navigation, TrendingUp } from "lucide-react";
// Utility function for combining class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Pointer Highlight Component (Now using Lucide icon)
const PointerHighlight = ({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn("relative w-fit inline-block", containerClassName)}
      ref={containerRef}
    >
      {children}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className={cn(
              "absolute inset-0 border border-neutral-200",
              rectangleClassName
            )}
            initial={{
              width: 0,
              height: 0,
            }}
            whileInView={{
              width: dimensions.width,
              height: dimensions.height,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="pointer-events-none absolute"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              x: dimensions.width + 4,
              y: dimensions.height + 4,
            }}
            style={{
              rotate: -90,
            }}
            transition={{
              opacity: { duration: 0.1, ease: "easeInOut" },
              duration: 1,
              ease: "easeInOut",
            }}
          >
            {/* UPDATED: SVG replaced with Lucide Icon */}
            <Navigation
              className={cn("h-5 w-5 text-blue-500", pointerClassName)}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};


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
      className={`relative inline-flex items-center justify-center rounded-lg px-4 py-2 text-center align-middle bg-white/30 backdrop-blur-none border border-white/10 ${className}`}
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
      <Spotlight
        className="-top-20 left-0 md:left-40 md:-top-20"
        fill="hsl(158, 89%, 30%)"
      />
      <Spotlight className="top-1/4 left-1/2" fill="hsl(259, 80%, 60%)" />
      <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] select-none [background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"></div>

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

      <div className="relative z-20 text-center px-4 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-200 tracking-wider">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            ScaleUp Web
          </span>
        </h2>
        <p className="mt-3 md:mt-4 text-emerald-400 font-medium text-sm md:text-2xl shine-subheadline">
          Custom Web Appliction Build Agency
        </p>

        <h1 className="mt-4 font-bold text-4xl sm:text-5xl md:text-6xl max-w-5xl leading-tight md:leading-snug font-merienda">
          We Build <span className="text-transparent italic bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"> Web Application</span> for your{" "}
          <PointerHighlight>
            <span className="text-transparent italic bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Business
            </span>
          </PointerHighlight>
          <br className="sm:hidden" />
          <ContainerTextFlip
            words={["E-commerce", "Portfolios", "SaaS Apps", "Landing Pages"]}
            className="text-4xl sm:text-5xl md:text-6xl mx-2 md:mx-4"
          />
          <br className="sm:hidden" />
        </h1>
        <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl max-w-5xl leading-tight md:leading-snug">
          <span className="text-transparent italic bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Grow Your Sales
          </span>
        </h1>

        <div className="mt-6">
          <span className="inline-flex items-center gap-2 bg-gray-800/60 border border-gray-700 rounded-full px-3 py-2 text-xs sm:text-sm text-gray-300 text-center">
            <Verified size={16} className="text-emerald-400" />
            Full-Stack Web Studio •
            Bangladesh-based • 100% Refund Policy
          </span>
        </div>
        <div className="mt-8 md:mt-10">
          <a href="/contact" className="ml-2 rounded-full border-2 border-purple-500/50 flex justify-center item-center gap-4 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition-transform duration-300 hover:scale-105">
            Start a Project
            <TrendingUp />
          </a>
        </div>

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
          -webkit-mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
          mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
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
        .shine-text {
          background: linear-gradient(90deg, #9ca3af, #ffffff, #9ca3af);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shine-anim 5s linear infinite;
        }
        .shine-subheadline {
          background: linear-gradient(90deg, #34d399, #ffffff, #34d399);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shine-anim 6s linear infinite;
        }
        .service-marquee.rtl {
          animation: service-marquee-anim 40s linear infinite;
        }
        .service-marquee.ltr {
          animation: service-marquee-anim 55s linear infinite reverse;
        }
        .shining-button {
            position: relative;
            overflow: hidden;
        }
        .shining-button::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(
                transparent,
                rgba(0, 255, 255, 0.5),
                transparent 30%
            );
            animation: rotate 4s linear infinite;
        }
        @keyframes rotate {
            100% {
                transform: rotate(360deg);
            }
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
