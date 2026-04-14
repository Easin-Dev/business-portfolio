"use client";
import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Star, Zap, Globe, Megaphone, Bot } from "lucide-react";

// 3টা Service-এর Popular Plan — Pricing Page থেকে নেওয়া
const popularPlans = [
  {
    service: "Website Development",
    icon: <Globe size={22} />,
    plan: "WordPress / Shopify",
    priceUSD: "$500 – $1,200",
    priceBDT: "৳ 15k – ৳ 20k",
    description: "Best for Personal blogs, Corporate sites, or E-commerce stores.",
    features: [
      "Everything in Landing Page",
      "Full Store Setup & Theme Design",
      "Payment Gateway Integration",
      "Advanced SEO Optimization",
      "Admin Dashboard & Control",
      "1 Month Free Maintenance",
      "Google Analytics Setup",
      "Premium Security Plugins",
    ],
    href: "/services/website-development",
    isHighlighted: false,
    accent: "#3b82f6",
  },
  {
    service: "Digital Marketing",
    icon: <Megaphone size={22} />,
    plan: "Meta / Google Ads",
    priceUSD: "$200 / Month",
    priceBDT: "৳ 2,000 / week",
    description: "Data-driven marketing to maximize ROI and scale your brand.",
    features: [
      "Target Audience Research",
      "Creative Ad Copies & Banners",
      "Advanced Retargeting Campaigns",
      "Pixel & Server-Side Tracking",
      "Google Search & Video Ads",
      "A/B Testing Creatives",
      "Weekly Growth Reports",
      "Dedicated Account Manager",
    ],
    href: "/services/digital-marketing",
    isHighlighted: true,
    accent: "#6366f1",
  },
  {
    service: "WhatsApp Chatbots",
    icon: <Bot size={22} />,
    plan: "WhatsApp Automation",
    priceUSD: "$200 – $400",
    priceBDT: "৳ 4,000 – ৳ 8,000",
    description: "24/7 smart automation for customer support & sales.",
    features: [
      "Interactive FAQ Bot Menu",
      "Official Business API Access",
      "Real-Time Lead Collection",
      "Automated Order Tracking",
      "Live CRM Database Syncing",
      "Abandoned Cart Recovery",
      "Secure Payment Links",
      "Mass Broadcasting Tools",
    ],
    href: "/services/whatsapp-chatbots",
    isHighlighted: false,
    accent: "#0ea5e9",
  },
];

const PricingCard = ({ plan }) => {
  return (
    <div
      className={`relative flex flex-col rounded-[28px] p-8 transition-all duration-300 group
        ${plan.isHighlighted
          ? "bg-[#0d1020] border border-blue-600/50 shadow-[0_0_80px_rgba(37,99,235,0.18)] lg:scale-[1.05] z-10"
          : "bg-[#0f1015] border border-white/8 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.04)]"
        }`}
    >
      {/* Popular Badge */}
      {plan.isHighlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)]">
          <Star size={11} fill="currentColor" />
          Most Popular
        </div>
      )}

      {/* Service Label + Icon */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className="p-2 rounded-xl"
          style={{ background: plan.accent + "22", color: plan.accent }}
        >
          {plan.icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
          {plan.service}
        </span>
      </div>

      {/* Plan Name */}
      <h3 className="text-xl font-bold text-white mb-2">{plan.plan}</h3>

      {/* Price */}
      <div className="mb-3">
        <p className={`text-3xl font-extrabold tracking-tight ${plan.isHighlighted ? "text-white" : "text-white"}`}>
          {plan.priceUSD}
        </p>
        <p className="text-sm text-neutral-500 mt-0.5">{plan.priceBDT}</p>
      </div>

      {/* Description */}
      <p className="text-neutral-400 text-sm leading-relaxed mb-6 min-h-[40px]">
        {plan.description}
      </p>

      {/* CTA Button */}
      <Link
        href="/contact"
        className={`w-full flex items-center justify-center gap-2 rounded-full py-3.5 px-6 font-bold text-sm tracking-wide transition-all duration-300 mb-7
          ${plan.isHighlighted
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] hover:scale-[1.02]"
            : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
          }`}
      >
        {plan.isHighlighted ? "Get Started Now" : "Start a Project"}
        <ArrowRight size={15} />
      </Link>

      {/* Features */}
      <ul className="space-y-3 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check
              className={`flex-shrink-0 mt-0.5 ${plan.isHighlighted ? "text-blue-400" : "text-neutral-400"}`}
              size={14}
            />
            <span className={`text-sm ${plan.isHighlighted ? "text-neutral-200" : "text-neutral-400"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Explore Service Link */}
      <Link
        href={plan.href}
        className="mt-8 flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 group-hover:gap-2.5"
        style={{ color: plan.accent }}
      >
        Explore {plan.service} <ArrowRight size={13} />
      </Link>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section className="w-full bg-[#050709] text-white py-24 lg:py-32 overflow-hidden relative">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      {/* Glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <Zap size={12} />
            Transparent Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Transparent{" "}
            <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 relative inline-block pb-2">
              Pricing
              <svg className="absolute -bottom-1 left-0 w-full h-3 md:h-4 text-blue-400" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none">
                <path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold italic font-serif text-blue-400/80 mt-3 mb-8 relative inline-block pb-2">
            For Your Growth
            <svg className="absolute -bottom-1 left-0 w-full h-3 md:h-4 text-blue-400/60" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none">
              <path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </h3>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            No hidden fees. Guaranteed quality and measurable results — custom-tailored for your market and business goals.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {popularPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-neutral-500 text-sm mb-4">
            Need a custom quote or see all plans?
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300"
          >
            View All Pricing Plans <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
