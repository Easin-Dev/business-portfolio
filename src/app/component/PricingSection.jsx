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
    <section className="w-full bg-black text-white rounded-t-4xl py-20 lg:py-32 overflow-hidden">
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
              {/* হাইলাইটেড কার্ডের জন্য ঘোরানো বর্ডার এবং গ্লো */}
              {plan.isHighlighted ? (
                <>
                  <div className="animated-border"></div>
                  <div className="absolute top-0 left-0 w-48 h-48 bg-purple-600/30 blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
                </>
              ) : (
                // পাশের কার্ডগুলোর জন্য কর্নার বর্ডার
                <div className="side-card-borders"></div>
              )}

              {/* কার্ডের মূল কন্টেন্ট */}
              <div
                className={`relative z-10 h-full rounded-[15px] p-8
                ${
                  plan.isHighlighted
                    ? "bg-black/60 backdrop-blur-sm" // ফ্রস্টেড গ্লাস ইফেক্ট
                    : "bg-gradient-to-b from-[#121212] to-black"
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
        <div className="relative mt-24 rounded-2xl p-px bg-black/20">
          <div className="animated-border-bonus"></div>
          <div className="relative z-10 rounded-[15px] p-8 bg-black">
            <h3 className="text-4xl font-bold">
              Bonuses Worth Over{" "}
              <span className="text-green-400">$2,500-Yours Free!</span>
            </h3>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bonuses.map((bonus, i) => (
                <div
                  key={i}
                  className="relative rounded-xl p-6 bg-[#121212] transition-all duration-300 hover:bg-white/5"
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
        .animated-border {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1rem; /* 16px */
          padding: 1px; /* বর্ডারের প্রস্থ */
          background: conic-gradient(
            from 180deg at 50% 50%,
            #8b5cf6,
            #4f46e5,
            #d946ef,
            #8b5cf6
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          /* অ্যানিমেশন রিমুভ করা হয়েছে */
        }

        .side-card-borders {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          background: linear-gradient(
              135deg,
              rgba(79, 70, 229, 0.4) 0%,
              transparent 25%
            ),
            linear-gradient(315deg, rgba(79, 70, 229, 0.4) 0%, transparent 25%);
          pointer-events: none;
        }

        .animated-border-bonus {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1rem; /* 16px */
          padding: 2px; /* বর্ডারের প্রস্থ */
          background: conic-gradient(
            from 180deg at 50% 50%,
            #10b981,
            #34d399,
            #6ee7b7,
            #10b981,
            #10b981
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          /* অ্যানিমেশন রিমুভ করা হয়েছে */
        }

        /* @keyframes spin এখন আর দরকার নেই */
      `}</style>
    </section>
  );
}
