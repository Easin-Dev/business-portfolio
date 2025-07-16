"use client";
import React from "react";
import {
  Check,
  ArrowRight,
  Gift,
  Code,
  Bot,
  MessageSquare,
} from "lucide-react";

// প্রাইসিং প্ল্যানের জন্য ডেটা
const pricingPlans = [
  {
    price: "$2,200",
    title: "Website Design",
    description: "Ideal for Startup Owners, MVP Builders",
    features: [
      "Design Style Guide",
      "Responsive across all devices",
      "Unlimited Revisions",
      "Developer Handoff",
    ],
    isHighlighted: false,
  },
  {
    price: "$3,500",
    title: "Web/Mobile App Design",
    description: "For SaaS & fast MVP launches.",
    features: [
      "UX Research",
      "Design System with token",
      "Unlimited Revisions",
      "Developer Handoff",
      "Transparent communication",
      "Responsive across all devices",
    ],
    isHighlighted: true,
  },
  {
    price: "$2,950+",
    title: "Monthly Subscription",
    description: "Ideal for Stratup or MVP",
    features: [
      "Monthly dedicated designers",
      "Adhoc design support",
      "Right designer for right product",
      "Transparent communication",
    ],
    isHighlighted: false,
  },
];

// বোনাসের জন্য ডেটা
const bonuses = [
  {
    icon: <Gift size={28} />,
    title: "Free Design Prototype",
    description: "Experience your design in action before development.",
  },
  {
    icon: <Code size={28} />,
    title: "Developer Handoff",
    description: "We ensure what we design is exactly what gets built.",
  },
  {
    icon: <Bot size={28} />,
    title: "Project Management",
    description: "Stay on track with our expert project management.",
  },
  {
    icon: <MessageSquare size={28} />,
    title: "Project Consultation",
    description: "Get professional advice to enhance your project.",
  },
];

export default function PricingSection() {
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
            <span className="italic font-serif text-neutral-300">Value</span>
          </h2>
          <h3 className="mt-2 text-5xl lg:text-7xl font-serif italic text-neutral-400">
            Unmatched Quality
          </h3>
        </div>

        {/* প্রাইসিং কার্ডের গ্রিড */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-px transition-all duration-300
              ${plan.isHighlighted ? "lg:scale-110 z-10" : "lg:scale-95"}`}
            >
              {plan.isHighlighted && (
                <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-2xl"></div>
              )}

              <div
                className={`relative z-10 h-full rounded-[15px] p-8 overflow-hidden
                ${
                  plan.isHighlighted
                    ? "bg-black/60 backdrop-blur-sm border border-purple-500/50"
                    : "side-card-styling"
                }`}
              >
                <h3 className="text-4xl font-bold">{plan.price}</h3>
                <p className="mt-2 text-neutral-400">{plan.description}</p>
                <h4
                  className={`mt-6 text-2xl font-semibold ${
                    plan.isHighlighted ? "text-green-400" : ""
                  }`}
                >
                  {plan.title}
                </h4>
                <ul className="mt-6 space-y-3">
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
          ))}
        </div>

        {/* বোনাস সেকশন */}
        <div className="relative mt-24 rounded-2xl p-8 border border-green-400/30 bg-black/20">
          <div className="relative z-10">
            <h3 className="text-4xl font-bold">
              Bonuses Worth Over{" "}
              <span className="text-green-400">$2,500-Yours Free!</span>
            </h3>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bonuses.map((bonus, i) => (
                <div
                  key={i}
                  className="relative rounded-xl p-6 bg-[#121212] transition-all duration-300 hover:bg-white/5 border border-white/10"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                    {bonus.icon}
                  </div>
                  <h4 className="mt-4 font-semibold text-lg">{bonus.title}</h4>
                  <p className="mt-2 text-neutral-400 text-sm">
                    {bonus.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* পাশের কার্ডগুলোর জন্য কর্নার বর্ডার এবং গ্র্যাডিয়েন্ট */
        .side-card-styling {
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }
        .side-card-styling::before,
        .side-card-styling::after {
          content: "";
          position: absolute;
          width: 80px;
          height: 80px;
          background: radial-gradient(
            circle at center,
            rgba(79, 70, 229, 0.5) 0%,
            transparent 70%
          );
          z-index: -1;
        }
        .side-card-styling::before {
          top: -40px;
          left: -40px;
        }
        .side-card-styling::after {
          bottom: -40px;
          right: -40px;
        }

        /* অ্যানিমেশনের কোডগুলো সরিয়ে দেওয়া হয়েছে */
      `}</style>
    </section>
  );
}
