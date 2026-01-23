"use client";
import React, { useRef, useEffect } from "react";
import { Check, ArrowRight, Bot } from "lucide-react"; // Package icon replaced with Bot

// আপনার দেওয়া নতুন প্রাইসিং প্ল্যানের ডেটা
const pricingPlans = [
  {
    price: "$100",
    title: "Landing Page",
    description: "For a powerful online presence.",
    features: [
      "All Pages Included",
      "Complete Routing System",
      "Excel Data Insertion",
      "Payment Gateway Integration",
      "Modern & Customizable Design",
    ],
    isHighlighted: false,
  },
  {
    price: "$500",
    title: "E-commerce Solution",
    description: "A complete package for your online store.",
    features: [
      "All E-commerce Features",
      "Custom API Development",
      "Product Management System",
      "Easy Dashboard Manipulation", // UPDATED
      "Secure Payments",
      "Full Technical Support",
      "Scalable Architecture",
    ],
    isHighlighted: true,
  },
  {
    price: "$1000",
    title: "Custom Web Development",
    description: "For any business, any requirement.",
    features: [
      "Bespoke Website for Any Business",
      "Unlimited Custom Features",
      "Advanced Backend Development",
      "Dedicated Project Manager",
      "Priority Support",
    ],
    isHighlighted: false,
  },
];

// আপনার দেওয়া নতুন বোনাস সেকশনের ডেটা
const bonusPackage = {
  icon: <Bot size={32} />, // UPDATED
  title: "The Super Saver AI Package", // UPDATED
  price: "$20,000",
  description:
    "Our ultimate deal that covers everything from web design to hosting, now including AI integration to automate and enhance your business.", // UPDATED
};

// নতুন প্রাইসিং কার্ড কম্পোনেন্ট
const PricingCard = ({ plan, isHighlighted }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--glow-x", `${x}px`);
      card.style.setProperty("--glow-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`pricing-card relative rounded-2xl p-px transition-all duration-300
            ${isHighlighted ? "lg:scale-110 z-10" : "lg:scale-95"}`}
    >
      {isHighlighted && (
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-2xl"></div>
      )}

      <div
        className={`relative z-10 h-full rounded-[15px] p-8 overflow-hidden flex flex-col
                ${
                  isHighlighted
                    ? "bg-black/60 backdrop-blur-sm border border-purple-500/50"
                    : "bg-[#0a0a0a] border border-white/10"
                }`}
      >
        <h3 className="text-4xl font-bold">{plan.price}</h3>
        <p className="mt-2 text-neutral-400">{plan.description}</p>
        <h4
          className={`mt-6 text-2xl font-semibold ${
            isHighlighted ? "text-green-400" : ""
          }`}
        >
          {plan.title}
        </h4>
        <ul className="mt-6 space-y-3 flex-grow">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <Check className="text-green-400" size={18} />
              <span className="text-neutral-300">{feature}</span>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="mt-8 inline-flex items-center justify-center w-full rounded-lg px-6 py-3 font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
        >
          Explore More <ArrowRight className="ml-2" size={20} />
        </a>
      </div>
    </div>
  );
};

export default function CustomPricingSection() {
  return (
    <section className="w-full bg-black text-white py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* সেকশনের শিরোনাম */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block border border-green-400 text-green-400 text-sm font-medium px-4 py-1.5 rounded-full">
            Pricing plans
          </span>
          <h2 className="mt-6 text-5xl lg:text-7xl font-bold">
            Unbeatable{" "}
            <span className="italic font-serif text-blue-300">Value</span>
          </h2>
          <h3 className="mt-2 text-5xl lg:text-7xl font-serif italic text-blue-500">
            Unmatched Quality
          </h3>
        </div>

        {/* প্রাইসিং কার্ডের গ্রিড */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              isHighlighted={plan.isHighlighted}
            />
          ))}
        </div>

        {/* বোনাস সেকশন */}
        <div className="relative mt-24 rounded-2xl p-8 border border-green-400/30 bg-black/20">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-green-400/10 flex items-center justify-center text-green-400">
              {bonusPackage.icon}
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-3xl lg:text-4xl font-bold">
                {bonusPackage.title}
              </h3>
              <p className="mt-2 text-neutral-400 max-w-2xl">
                {bonusPackage.description}
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-green-400">
                {bonusPackage.price}
              </p>
              <a
                href="#"
                className="mt-2 inline-block text-white font-semibold hover:text-green-300 transition-colors"
              >
                Get Started Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pricing-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(
            400px circle at var(--glow-x) var(--glow-y),
            rgba(132, 0, 255, 0.5),
            transparent 40%
          );
          z-index: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .pricing-card:hover::before {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
