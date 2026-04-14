"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BackgroundGradient } from "../component/ui/background-gradient";
import { Spotlight } from "../component/ui/spotlight";
import { Briefcase, ArrowRight, Minus, Plus } from "lucide-react";
import FaqSection from "../component/FaqSection";
import { servicesData } from "../../data/servicesData";

// Accordion Item Component
const AccordionItem = ({ feature }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h4 className="text-lg font-medium text-gray-800">{feature.title}</h4>
        {isOpen ? (
          <Minus className="text-gray-500" />
        ) : (
          <Plus className="text-gray-500" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 mt-2" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 pb-2">{feature.description}</p>
      </div>
    </div>
  );
};

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* হিরো সেকশন */}
      <div className="relative w-full bg-[#050709] min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="hsl(210, 80%, 50%)"
        />

        <div className="relative z-20 text-center px-4 w-full flex flex-col items-center">
          <div className="text-neutral-300 mb-6 mt-4 text-sm bg-white/10 backdrop-blur-md px-4 py-1.5 border border-white/10 rounded-full flex items-center justify-center">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white max-w-5xl font-bold tracking-tight">
            From Code to Commerce,
            <br />
            <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
              Building Your Digital Success
            </span>
          </h1>
        </div>
      </div>

      {/* সার্ভিসেস কন্টেন্ট */}
      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24 space-y-24 lg:space-y-32">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* বাম দিকের কন্টেন্ট */}
            <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
              <h2 className="text-3xl lg:text-5xl font-bold text-black tracking-tight leading-tight">
                {service.title}
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-8">
                {service.features.map((feature, idx) => (
                  <AccordionItem key={idx} feature={feature} />
                ))}
              </div>
              <div className="mt-10">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all"
                >
                  Explore Details <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            {/* ডান দিকের ছবি বা ভিডিও */}
            <div className={index % 2 !== 0 ? "lg:order-1" : ""}>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-square flex items-center justify-center bg-gray-50">
                {service.image.endsWith('.mp4') ? (
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src={service.image} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={800} height={800}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
