"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import FaqSection from "../component/FaqSection";
import PageHero from "../component/PageHero";

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

import { servicesData } from "../../data/servicesData";

export default function ServicesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a small delay for smoothness or just set loading false
    setLoading(false);
  }, []);

  if (loading && servicesData.length === 0) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        breadcrumb="Services"
        title="From Code to Commerce,"
        highlight="Building Your Digital Success"
        subtitle="We craft high-performance websites, data-driven marketing campaigns, and smart automation systems — tailored to grow your business."
      />

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
