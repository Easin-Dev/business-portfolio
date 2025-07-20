"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spotlight } from "../component/ui/spotlight";
import Link from "next/link";
import { BackgroundGradient } from "../component/ui/background-gradient";
import {
  CheckCircle2,
  Bot,
  ChevronDown,
  ArrowRight,
  Check,
} from "lucide-react";

// Pricing ডেটা (UPDATED)
const pricingData = {
  "Regular Plan": [
    {
      plan: "Landing Page",
      price: "$5,000",
      description: "High-impact pages to convert visitors into customers.",
      features: [
        "Custom, Responsive Design",
        "Lead Capture Form Integration",
        "Blazing Fast Load Speed",
        "A/B Testing Setup",
        "SEO On-Page Optimization",
        "Analytics Integration",
        "Interactive Animations",
        "Social Media Integration",
      ],
      isHighlighted: false,
    },
    {
      plan: "E-commerce Solution",
      price: "$12,000",
      description: "A complete, feature-rich package for your online store.",
      features: [
        "Custom Storefront Design",
        "Full Product Catalogue System",
        "Secure Shopping Cart & Checkout",
        "Multiple Payment Gateways (Stripe, PayPal)",
        "User Account & Order History",
        "Advanced Inventory Management",
        "Discount & Coupon Code Engine",
        "Customer Reviews & Ratings",
        "Easy-to-use Admin Dashboard",
        "Product & Category SEO",
        "Third-Party API Integration",
        "Automated Email Notifications",
        "SSL Security Setup",
        "Mobile & Tablet Responsive",
        "Full Technical Support",
      ],
      isHighlighted: true,
    },
    {
      plan: "Custom Web Application",
      price: "$15,000+",
      description: "Bespoke solutions for unique business challenges.",
      features: [
        "In-depth Requirement Analysis",
        "Custom UI/UX Design & Prototyping",
        "Scalable Backend Architecture (Node.js/Python)",
        "Secure Database Management (SQL/NoSQL)",
        "User Authentication (OAuth, JWT)",
        "Real-time Features (WebSockets)",
        "Admin Dashboard & Analytics",
        "Third-party API Integrations",
        "Cloud Deployment (AWS/Vercel)",
        "CI/CD Pipeline Setup",
        "Unit & Integration Testing",
        "Dedicated Project Manager",
      ],
      isHighlighted: false,
    },
  ],
  Website: {
    "1-4 Pages": [
      {
        plan: "Basic Package",
        price: "$2,000",
        delivery: "4-day delivery",
        features: ["UX Research", "UI Design", "Prototyping", "2 Revisions"],
      },
      {
        plan: "Standard Package",
        price: "$4,800",
        delivery: "7-day delivery",
        popular: true,
        features: [
          "UX Research & Analysis",
          "UI Design",
          "Interactive Prototyping",
          "Design System",
          "4 Revisions",
        ],
      },
      {
        plan: "Premium Package",
        price: "$5,950",
        delivery: "10-day delivery",
        features: [
          "Everything in Standard",
          "Advanced Animations",
          "Mobile & Tablet Design",
          "Style Guide",
          "Unlimited Revisions",
        ],
      },
    ],
    "5-9 Pages": [
      {
        plan: "Basic Plus",
        price: "$6,500",
        delivery: "12-day delivery",
        features: ["UX Research & UI Design", "5-9 Pages", "Design System"],
      },
      {
        plan: "Standard Plus",
        price: "$8,200",
        delivery: "15-day delivery",
        popular: true,
        features: [
          "All Basic Plus Features",
          "Advanced Prototyping",
          "Interaction Design",
        ],
      },
      {
        plan: "Premium Plus",
        price: "$10,000",
        delivery: "17-day delivery",
        features: [
          "All Standard Plus Features",
          "Full Style Guide",
          "Motion Design",
        ],
      },
    ],
    "10-15 Pages": [
      {
        plan: "Pro",
        price: "$12,500",
        delivery: "20-day delivery",
        features: [
          "UX Research & UI Design",
          "10-15 Pages",
          "Component Library",
        ],
      },
      {
        plan: "Pro Max",
        price: "$12,800",
        delivery: "75-day delivery",
        popular: true,
        features: ["All Pro Features", "User Testing", "Full Design System"],
      },
      {
        plan: "Enterprise Lite",
        price: "$15,000",
        delivery: "90-day delivery",
        features: [
          "All Pro Max Features",
          "Dedicated Project Manager",
          "Brand Guidelines",
        ],
      },
    ],
    "16-25 Pages": [
      {
        plan: "Business",
        price: "$16,500",
        delivery: "100-day delivery",
        features: [
          "Extensive UX Research",
          "16-25 Pages",
          "Comprehensive UI/UX",
        ],
      },
      {
        plan: "Enterprise",
        price: "$22,000",
        delivery: "120-day delivery",
        popular: true,
        features: [
          "All Business Features",
          "Full Scale Design & Dev Support",
          "API Design",
        ],
      },
    ],
  },
};

// UPDATED: Bonus package data
const bonusPackage = {
  icon: <Bot size={32} />,
  title: "The Super Saver AI Package",
  price: "$20,000",
  description: "Our ultimate deal that covers everything from web design to hosting, now including AI integration to automate and enhance your business."
};

const mainCategories = ["Regular Plan", "Website"];
const pageCategories = ["1-4 Pages", "5-9 Pages", "10-15 Pages", "16-25 Pages"];

// FAQ ডেটা (UPDATED)
const faqData = [
  {
    question: "How can I start a project with Design Monks?",
    answer:
      'Starting a project is easy! Just click the "Start a Project" button on our navigation bar or contact us through our form. We\'ll schedule a free consultation to discuss your needs and goals.',
  },
  {
    question: "Why is Design Monks different?",
    answer:
      "Our focus is on a collaborative partnership. We don't just build what you ask for; we challenge assumptions and provide creative input to ensure the final product exceeds your expectations and drives real results.",
  },
  {
    question: "How Long Does a Design Project Take?",
    answer:
      "The timeline for a project varies depending on its scope and complexity. A typical website design project can take anywhere from 4 to 8 weeks, while larger web/mobile app projects may take longer. We provide a detailed timeline after our initial consultation.",
  },
  {
    question: "Is Design Monks a start-up-friendly agency?",
    answer:
      "Absolutely! We love working with startups and MVP builders. Our pricing plans are flexible, and we offer dedicated support to help new businesses grow and succeed.",
  },
  {
    question: "What design tools do you use?",
    answer:
      "We primarily use industry-standard tools like Figma for UI/UX design, Adobe Illustrator for branding, and various prototyping tools to bring your vision to life.",
  },
];

// FAQ Accordion Item Component
function AccordionItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-medium text-black">{item.question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown
            className={`h-6 w-6 transition-colors ${isOpen ? "text-purple-600" : "text-gray-500"
              }`}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// FAQ Section Component
function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white text-black py-20 lg:py-32 rounded-t-[40px] -mt-10 relative z-10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block border border-teal-500 bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1 rounded-full">
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-6xl">
            Your Questions{" "}
            <span className="italic font-serif text-teal-600">Answered!</span>
          </h2>
        </div>
        <div className="mt-16">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Card Component
const PricingCard = ({ plan }) => {
  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col text-white
            ${plan.isHighlighted ? "bg-black/60 backdrop-blur-sm border border-purple-500/50 scale-105 z-10" : "bg-[#0a0a0a] border border-white/10"}`}
    >
      {plan.isHighlighted && (
        <div className="absolute top-0 right-6 -translate-y-1/2 bg-green-400 text-black text-xs font-bold px-3 py-1 rounded-full">
          Popular
        </div>
      )}
      <h3 className="text-4xl font-bold">{plan.price}</h3>
      <p className="mt-2 text-neutral-400">{plan.description}</p>
      <h4
        className={`mt-6 text-2xl font-semibold ${plan.isHighlighted ? "text-green-400" : "text-white"
          }`}
      >
        {plan.plan}
      </h4>
      <div className="border-t border-purple-500/20 my-6"></div>
      <ul className="space-y-3 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="text-green-400 flex-shrink-0 mt-1" size={18} />
            <span className="text-neutral-300">{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="mt-8 inline-flex items-center justify-center w-full rounded-lg px-6 py-3 font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
      >
        Start a Project <ArrowRight className="ml-2" size={20} />
      </a>
    </div>
  );
};


export default function PricingPage() {
  const [activeMainCat, setActiveMainCat] = useState("Regular Plan");
  const [activePageCat, setActivePageCat] = useState("1-4 Pages");

  const plans =
    activeMainCat === "Website"
      ? pricingData[activeMainCat]?.[activePageCat] || []
      : pricingData[activeMainCat] || [];

  return (
    <div className="w-full bg-[#050709]">
      {/* পেইজের হেডার */}
      <div className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="hsl(259, 80%, 50%)"
        />
        <Spotlight className="top-20 right-full" fill="hsl(190, 80%, 50%)" />
        <BackgroundGradient containerClassName="hidden lg:block absolute top-20 -left-24 w-96 z-10 transform -rotate-[25deg] transition-transform duration-500 hover:rotate-[-15deg] hover:scale-105">
          <img
            src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758837d0dffb8e32f63_137e4404fe981fb7e0f2f0db1f9ec8e1_3.avif"
            alt="Project Mockup 1"
            className="w-full h-full object-contain rounded-lg"
          />
        </BackgroundGradient>
        <BackgroundGradient containerClassName="hidden lg:block absolute bottom-20 -right-24 w-96 z-10 transform rotate-[25deg] transition-transform duration-500 hover:rotate-[-15deg] hover:scale-105">
          <img
            src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758594e31e0312a925f_e0482580c600f74a17f23e4f9a90e82e_1.avif"
            alt="Project Mockup 2"
            className="w-full h-full object-contain rounded-lg"
          />
        </BackgroundGradient>

        <div className="relative z-20 text-center px-4 w-full flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-200 tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              ScaleUp Web
            </span>
          </h2>
          <div className="text-neutral-300 mb-4 mt-4 text-sm bg-white/30 backdrop-blur-sm p-2 rounded-r-full rounded-l-full">
            <Link href="/" className="hover:text-white transition-colors">
              {" "}
              Home{" "}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Pricing</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mt-2">
            Pricing That Fits Your Needs,
            <br />
            <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Solutions That Exceed Them
            </span>
          </h1>
          <p className="mt-6 text-neutral-300 max-w-2xl">
            Let's find the perfect package to bring your ideas to life.
          </p>

          <div className="mt-12 space-y-6 w-full max-w-4xl">
            <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
              {mainCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveMainCat(category)}
                  className={`px-4 py-2 text-sm rounded-md transition-colors duration-300
                            ${activeMainCat === category
                      ? "bg-white text-black font-semibold"
                      : "bg-white/10 text-neutral-300 hover:bg-white/20"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {activeMainCat === "Website" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-wrap justify-center gap-2 lg:gap-3"
                >
                  {pageCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActivePageCat(category)}
                      className={`px-4 py-2 text-sm rounded-md transition-colors duration-300
                                ${activePageCat === category
                          ? "bg-purple-600 text-white font-semibold"
                          : "bg-white/10 text-neutral-300 hover:bg-white/20"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 px-4 items-center">
            <AnimatePresence>
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.plan}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { delay: index * 0.1 },
                  }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                >
                  <PricingCard plan={plan} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="w-full max-w-6xl mx-auto mt-24">
            <div className="relative rounded-2xl p-8 border border-green-400/30 bg-black/20">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-green-400/10 flex items-center justify-center text-green-400">
                  {bonusPackage.icon}
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-3xl lg:text-4xl text-white font-bold">
                    {bonusPackage.title}
                  </h3>
                  <p className="mt-2 text-neutral-400 max-w-2xl">{bonusPackage.description}</p>
                </div>
                <div className="text-center flex flex-col justify-center item-center">
                  <p className="text-4xl lg:text-5xl font-bold text-green-400">{bonusPackage.price}</p>
                  <a
                    href="/contact"
                    className=" border-2 border-purple-500/50 bg-gradient-to-r from-purple-600 mt-5 to-indigo-600 px-5 rounded-sm py-1 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition-transform duration-300 hover:scale-105"
                  >
                    Start a Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FaqSection />
    </div>
  );
}
