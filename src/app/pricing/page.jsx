"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
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

// Dual-Market Pricing Data
const pricingData = {
  International: {
    "Web Dev": [
      {
        plan: "Landing Page",
        price: "$100",
        description: "High-converting single page for marketing campaigns.",
        features: ["Custom Design Layout", "Mobile Responsive", "Lead Capture Form", "Fast Loading < 2s"],
        isHighlighted: false,
      },
      {
        plan: "WordPress / Shopify",
        price: "$500 - $1,200",
        description: "Best for Personal blogs, Corporate sites, or E-commerce stores.",
        features: ["Everything in Landing Page", "Full Store Setup & Theme Design", "Payment Gateway Integration", "Advanced SEO Optimization", "Admin Dashboard & Control", "1 Month Free Maintenance", "Google Analytics Setup", "Premium Security Plugins"],
        isHighlighted: true,
      },
      {
        plan: "Custom Full-Stack",
        price: "$1,000+",
        description: "MERN or Next.js advanced web applications.",
        features: ["Bespoke Architecture", "Custom API Integrations", "Advanced Security", "Scalable Performance", "Dedicated Cloud Hosting"],
        isHighlighted: false,
      },
    ],
    "Marketing": [
      {
        plan: "Meta / Google Ads",
        price: "$200 / Month",
        description: "Data-driven marketing to maximize ROI.",
        features: ["Target Audience Research", "Creative Ad Copies & Banners", "Advanced Retargeting Campaigns", "Pixel & Server-Side Tracking", "Google Search & Video Ads", "A/B Testing Creatives", "Weekly Growth Reports", "Dedicated Account Manager"],
        isHighlighted: true,
      }
    ],
    "Chatbot": [
      {
        plan: "WhatsApp Automation",
        price: "$200 - $400",
        description: "24/7 smart automation for customer support & sales.",
        features: ["Interactive FAQ Bot Menu", "Official Business API Access", "Real-Time Lead Collection", "Automated Order Tracking", "Live CRM Database Syncing", "Abandoned Cart Recovery", "Secure Payment Links", "Mass Broadcasting Tools"],
        isHighlighted: true,
      }
    ]
  },
  Bangladesh: {
    "Web Dev": [
      {
        plan: "Landing Page",
        price: "৳ 5,000 - ৳ 7k",
        description: "High-converting single page for marketing campaigns.",
        features: ["Custom Design Layout", "Mobile Responsive", "Lead Capture Form", "Fast Loading < 2s"],
        isHighlighted: false,
      },
      {
        plan: "WordPress / Shopify",
        price: "৳ 15k - ৳ 20k",
        description: "Best for Personal blogs, Corporate sites, or E-commerce stores.",
        features: ["Everything in Landing Page", "Full Store Setup & Theme Design", "Payment Gateway (bKash/SSL)", "Advanced SEO Optimization", "Admin Dashboard & Control", "1 Month Free Maintenance", "Google Analytics Setup", "Premium Security Plugins"],
        isHighlighted: true,
      },
      {
        plan: "Custom Full-Stack",
        price: "৳ 30,000+",
        description: "MERN or Next.js advanced web applications.",
        features: ["Bespoke Architecture", "Custom API Integrations", "Advanced Security", "Scalable Performance", "Dedicated Cloud Hosting"],
        isHighlighted: false,
      },
    ],
    "Marketing": [
      {
        plan: "Meta / Google Ads",
        price: "৳ 2,000 / week",
        description: "Data-driven marketing to maximize ROI.",
        features: ["Target Audience Research", "Creative Ad Copies & Banners", "Advanced Retargeting Campaigns", "Pixel & Server-Side Tracking", "Google Search & Video Ads", "A/B Testing Creatives", "Weekly Growth Reports", "Dedicated Account Manager"],
        isHighlighted: true,
      }
    ],
    "Chatbot": [
      {
        plan: "WhatsApp Automation",
        price: "৳ 4,000 - ৳ 8,000",
        description: "24/7 smart automation for customer support & sales.",
        features: ["Interactive FAQ Bot Menu", "Official Business API Access", "Real-Time Lead Collection", "Automated Order Tracking", "Live CRM Database Syncing", "Abandoned Cart Recovery", "Secure Payment Links", "Mass Broadcasting Tools"],
        isHighlighted: true,
      }
    ]
  }
};

const agencyBundles = [
  {
    title: "Startup Kickstart",
    description: "Perfect for quick launches.",
    features: ["Landing Page Development", "Meta Ads Setup", "Basic FAQ Chatbot"],
    icon: "🚀"
  },
  {
    title: "E-commerce Pro",
    description: "Ready-to-sell machine.",
    features: ["Shopify Store Setup", "Google Ads Management", "WhatsApp Order Bot"],
    icon: "🛍️"
  },
  {
    title: "Enterprise Digital",
    description: "The ultimate 360 solution.",
    features: ["Full-Stack Web App", "360 Degree Marketing", "Advanced API Bot"],
    icon: "👑"
  }
];

const categoryTabs = ["Web Dev", "Marketing", "Chatbot"];

// FAQ ডেটা
const faqData = [
  {
    question: "How can I start a project with ScaleUp Web?",
    answer:
      'Starting a project is easy! Just click the "Start a Project" button on our navigation bar or contact us through our form. We\'ll schedule a free consultation to discuss your needs and goals.',
  },
  {
    question: "Why is ScaleUp Web different?",
    answer:
      "Our focus is on a collaborative partnership. We don't just build what you ask for; we challenge assumptions and provide creative input to ensure the final product exceeds your expectations and drives real results.",
  },
  {
    question: "How Long Does a Design Project Take?",
    answer:
      "The timeline for a project varies depending on its scope and complexity. A typical website design project can take anywhere from 4 to 8 weeks, while larger web/mobile app projects may take longer. We provide a detailed timeline after our initial consultation.",
  },
  {
    question: "Is ScaleUp Web a start-up-friendly agency?",
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
        <h3 className="text-lg font-medium text-white">{item.question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown
            className={`h-6 w-6 transition-colors ${isOpen ? "text-purple-600" : "text-gray-500"}`}
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
          <span className="inline-block border border-blue-500 bg-blue-500/10 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-6xl">
            Your Questions{" "}
            <span className="italic font-serif text-blue-600">Answered!</span>
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
// Pricing Card Component
// Pricing Card Component
const PricingCard = ({ plan }) => {
  return (
    <div
      className={`relative rounded-[32px] p-8 mt-4 flex flex-col text-left transition-all duration-300
            ${plan.isHighlighted 
               ? "bg-[#0d1020] border border-blue-600/50 shadow-[0_0_80px_rgba(37,99,235,0.2)] scale-[1.04] z-10 py-12" 
               : "bg-[#14151a] border border-white/5 py-8"}`}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-4">
         <h4 className="text-lg font-bold text-white tracking-wide">{plan.plan}</h4>
         {plan.isHighlighted && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/10">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>
               Popular
            </div>
         )}
      </div>

      {/* Price Row */}
      <div className="flex items-baseline gap-1 mb-4 flex-wrap">
        {(() => {
           const cleanPrice = plan.price.replace(' / Month', '').replace(' / week', '');
           const isLong = cleanPrice.length > 7;
           return (
             <h3 className={`font-extrabold text-white tracking-tight ${isLong ? 'text-3xl' : 'text-5xl'}`}>
               {cleanPrice}
             </h3>
           )
        })()}
        <span className="text-sm font-medium text-neutral-400 shrink-0">
           {plan.price.includes('Month') ? '/ month' : plan.price.includes('week') ? '/ week' : '/ proj'}
        </span>
      </div>

      {/* Description */}
      <p className="text-neutral-400 text-[15px] font-medium leading-relaxed mb-8 h-12 pr-4 text-left">
         {plan.description}
      </p>

      {/* Get Started Button (Moved Up according to new design) */}
      <a
        href="/contact"
        className={`w-full flex items-center justify-center rounded-full py-3.5 px-6 font-bold text-sm tracking-wide transition-all duration-300 mb-8
          ${plan.isHighlighted 
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:shadow-[0_0_40px_rgba(79,70,229,0.7)] hover:scale-[1.02]" 
            : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"}`}
      >
        {plan.isHighlighted ? "Upgrade Now" : "Get Started"}
      </a>

      {/* Features List */}
      <ul className="space-y-4 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <CheckCircle2 className={`flex-shrink-0 w-4 h-4 ${plan.isHighlighted ? "text-white" : "text-neutral-300"}`} />
            <span className={`text-sm font-medium ${plan.isHighlighted ? "text-neutral-200" : "text-neutral-400"}`}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
import PageHero from "../component/PageHero";

export default function PricingPage() {
  const [market, setMarket] = useState("International");
  const [activeCategory, setActiveCategory] = useState("Web Dev");
  
  // IP Geolocation Auto-Detect
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if(data.country_code === 'BD') {
          setMarket("Bangladesh");
        } else {
          setMarket("International");
        }
      })
      .catch(err => {
        console.error('IP fetch error:', err);
        setMarket("International");
      });
  }, []);

  const plans = pricingData[market]?.[activeCategory] || [];

  return (
    <div className="w-full bg-[#050709]">
      {/* Shared Page Hero */}
      <PageHero
        breadcrumb="Pricing"
        title="Transparent Pricing,"
        highlight="For Your Growth"
        subtitle="Guaranteed quality and measurable results — custom-tailored for your market and business goals. No hidden fees."
      />

      {/* Toggles + Cards section */}
      <div className="relative z-10 w-full pb-20">
        <div className="relative z-20 text-center px-4 w-full flex flex-col items-center">

          <div className="mt-12 space-y-8 w-full max-w-4xl flex flex-col items-center">
            {/* Market Toggle */}
            <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              {['International', 'Bangladesh'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMarket(m)}
                  className={`px-6 py-2.5 text-sm rounded-full transition-all duration-300 font-medium ${
                    market === m
                      ? "bg-blue-600 text-white font-bold shadow-[0_0_25px_rgba(37,99,235,0.6)] border border-blue-400"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {m === 'International' ? '🌍 International (USD)' : '🇧🇩 Bangladesh (BDT)'}
                </button>
              ))}
            </div>
            
            {/* Category Toggle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={market}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap justify-center gap-3 w-full"
              >
                {categoryTabs.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 text-sm rounded-lg transition-all duration-300 border ${
                      activeCategory === cat
                        ? "bg-white/10 border-blue-500/50 text-white font-semibold backdrop-blur-md"
                        : "bg-transparent border-white/5 text-neutral-500 hover:text-neutral-300 hover:border-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 px-4 items-center">
            <AnimatePresence mode="wait">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.plan + market}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  }}
                  exit={{ opacity: 0, y: -30 }}
                >
                  <PricingCard plan={plan} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Special Agency Bundles */}
          <div className="w-full max-w-7xl mx-auto mt-32 px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 tracking-tight">Special Agency <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500">Bundles</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agencyBundles.map((bundle, idx) => (
                <div key={idx} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl flex flex-col items-center group hover:border-blue-600/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[50px] -mr-16 -mt-16 rounded-full group-hover:bg-blue-600/20 transition-colors"></div>
                  <div className="text-5xl mb-6 relative z-10 transform transition-transform group-hover:scale-110">{bundle.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{bundle.title}</h3>
                  <p className="text-neutral-400 mb-8 relative z-10">{bundle.description}</p>
                  <ul className="text-left space-y-4 mb-8 w-full relative z-10 flex-grow">
                    {bundle.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-300">
                        <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className="mt-auto px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg font-semibold transition-all hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] w-full text-center relative z-10">Select Bundle</a>
                </div>
              ))}
            </div>
            
            {/* Pro-Tips Note */}
            <div className="mt-20 bg-blue-950/30 border border-blue-500/20 p-8 rounded-2xl max-w-4xl mx-auto text-left flex flex-col md:flex-row gap-6 items-start shadow-2xl relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <div className="bg-blue-500/20 p-4 rounded-xl flex-shrink-0">
                <Bot className="text-blue-400" size={32} />
              </div>
              <div>
                <h4 className="text-blue-400 font-bold text-xl mb-3 flex items-center gap-2">ScaleUp Web Pro-Tips</h4>
                <div className="text-neutral-300 space-y-3">
                  <p className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span> 
                    <span><strong>Ad Spend Not Included:</strong> Our marketing management fee covers strategy, execution, and optimization. You provide the ad budget directly to Google/Meta.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span> 
                    <span><strong>3 Months Free Maintenance:</strong> Every Website Development project includes complete support and updates for 3 months post-launch, guaranteeing absolute peace of mind.</span>
                  </p>
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
