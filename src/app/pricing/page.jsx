"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spotlight } from "../component/ui/spotlight";
import Link from "next/link";
import { BackgroundGradient } from "../component/ui/background-gradient";
// UPDATED: নতুন আইকন যোগ করা হয়েছে
import { CheckCircle2, Gift, Code, Bot, MessageSquare, ChevronDown } from "lucide-react";

// Pricing ডেটা
const pricingData = {
    Website: {
        "1-4 Pages": [
            {
                plan: "Basic Package",
                price: "$1,850",
                delivery: "15-day delivery",
                features: ["UX Research", "UI Design", "Prototyping", "2 Revisions"],
            },
            {
                plan: "Standard Package",
                price: "$2,800",
                delivery: "22-day delivery",
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
                price: "$3,950",
                delivery: "30-day delivery",
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
            { plan: "Basic Plus", price: "$4,500", delivery: "35-day delivery", features: ["UX Research & UI Design", "5-9 Pages", "Design System"] },
            { plan: "Standard Plus", price: "$6,200", delivery: "45-day delivery", popular: true, features: ["All Basic Plus Features", "Advanced Prototyping", "Interaction Design"] },
            { plan: "Premium Plus", price: "$8,000", delivery: "60-day delivery", features: ["All Standard Plus Features", "Full Style Guide", "Motion Design"] },
        ],
        "10-15 Pages": [
            { plan: "Pro", price: "$9,500", delivery: "65-day delivery", features: ["UX Research & UI Design", "10-15 Pages", "Component Library"] },
            { plan: "Pro Max", price: "$12,800", delivery: "75-day delivery", popular: true, features: ["All Pro Features", "User Testing", "Full Design System"] },
            { plan: "Enterprise Lite", price: "$15,000", delivery: "90-day delivery", features: ["All Pro Max Features", "Dedicated Project Manager", "Brand Guidelines"] },
        ],
        "16-25 Pages": [
            { plan: "Business", price: "$16,500", delivery: "100-day delivery", features: ["Extensive UX Research", "16-25 Pages", "Comprehensive UI/UX"] },
            { plan: "Enterprise", price: "$22,000", delivery: "120-day delivery", popular: true, features: ["All Business Features", "Full Scale Design & Dev Support", "API Design"] },
        ],
    },
    "Web App": [
        { plan: "Web App Basic", price: "$7,000", delivery: "60-day delivery", features: ["Core Features", "Database Setup", "Basic UI/UX"] },
        { plan: "Web App Pro", price: "$12,000", delivery: "90-day delivery", popular: true, features: ["All Basic Features", "API Integration", "Admin Panel"] },
    ],
    "Mobile App": [
        { plan: "Mobile App Basic", price: "$8,000", delivery: "70-day delivery", features: ["iOS or Android", "UI/UX Design"] },
        { plan: "Mobile App Pro", price: "$15,000", delivery: "100-day delivery", popular: true, features: ["iOS & Android", "Backend Integration"] },
    ],
    "Branding": [
        { plan: "Logo & Style", price: "$3,500", delivery: "20-day delivery", features: ["Logo Design", "Color Palette", "Typography"] },
        { plan: "Full Branding Kit", price: "$6,000", delivery: "40-day delivery", popular: true, features: ["Logo & Style", "Brand Guidelines", "Social Media Kit"] },
    ],
    "Subscription": [
        { plan: "Monthly Design", price: "$4,995/mo", delivery: "Ongoing", features: ["Unlimited Requests", "Pause or Cancel Anytime", "Dedicated Designer"] },
    ],
};

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

const mainCategories = ["Website", "Web App", "Mobile App", "Branding", "Subscription"];
const pageCategories = ["1-4 Pages", "5-9 Pages", "10-15 Pages", "16-25 Pages"];

// FAQ ডেটা
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

export default function PricingPage() {
    const [activeMainCat, setActiveMainCat] = useState("Website");
    const [activePageCat, setActivePageCat] = useState("1-4 Pages");

    const plans = pricingData[activeMainCat]?.[activePageCat] || pricingData[activeMainCat] || [];

    return (
        <div className="w-full bg-[#050709]">
            {/* পেইজের হেডার */}
            <div className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
                <div className="absolute inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="hsl(259, 80%, 50%)"
                />
                <Spotlight
                    className="top-20 right-full"
                    fill="hsl(190, 80%, 50%)"
                />
                {/* UPDATED: Floating images with hover effect */}
                <BackgroundGradient containerClassName="hidden lg:block absolute top-20 -left-24 w-96 z-10 transform -rotate-[25deg] transition-transform duration-500 hover:rotate-[-15deg] hover:scale-105">
                    <img
                        src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758837d0dffb8e32f63_137e4404fe981fb7e0f2f0db1f9ec8e1_3.avif"
                        alt="Project Mockup 1"
                        className="w-full h-full object-contain rounded-lg"
                    />
                </BackgroundGradient>
                <BackgroundGradient containerClassName="hidden lg:block absolute bottom-20 -right-24 w-96 z-10 transform rotate-[25deg] transition-transform duration-500 hover:rotate-[15deg] hover:scale-105">
                    <img
                        src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758594e31e0312a925f_e0482580c600f74a17f23e4f9a90e82e_1.avif"
                        alt="Project Mockup 2"
                        className="w-full h-full object-contain rounded-lg"
                    />
                </BackgroundGradient>

                <div className="relative z-20 text-center px-4 w-full flex flex-col items-center">
                    <h2 className="text-xl font-semibold tracking-widest uppercase text-white mb-2">
                        ScaleUp Web
                    </h2>
                    <div className="text-neutral-300 mb-4 text-sm bg-white/30 backdrop-blur-sm p-2 rounded-r-full rounded-l-full">
                        <Link href="/" className="hover:text-white transition-colors"> Home </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">Pricing</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mt-2">
                        Premium Quality With <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                            Affordability & Flexibility
                        </span>
                    </h1>
                    <p className="mt-6 text-neutral-300 max-w-2xl">
                        Personalize your plan for custom solutions according to your business needs
                    </p>

                    <div className="mt-12 space-y-6 w-full max-w-4xl">
                        <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
                            {mainCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveMainCat(category)}
                                    className={`px-4 py-2 text-sm rounded-md transition-colors duration-300
                            ${activeMainCat === category ? "bg-white text-black font-semibold" : "bg-white/10 text-neutral-300 hover:bg-white/20"}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <AnimatePresence>
                            {activeMainCat === 'Website' && (
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
                                ${activePageCat === category ? "bg-purple-600 text-white font-semibold" : "bg-white/10 text-neutral-300 hover:bg-white/20"}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 px-4">
                        <AnimatePresence>
                            {plans.map((plan, index) => (
                                <motion.div
                                    key={plan.plan}
                                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: index * 0.1 } }}
                                    exit={{ opacity: 0, y: 30, scale: 0.95 }}
                                    className="relative w-full bg-[#110E1A]/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-left flex flex-col"
                                >
                                    {plan.popular && (
                                        <div className="absolute top-0 right-6 -translate-y-1/2 bg-green-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.78l.24.02c.27.04.54.1.8.18l.25.08.26.08c.27.09.53.2.79.32l.24.1c.5.24 1 .54 1.48.9l.25.18.24.18a4 4 0 0 1 1.36 1.36l.18.24.18.25c.36.48.66.98.9 1.48l.1.24c.12.26.23.52.32.79l.08.26.08.25c.08.26.14.53.18.8l.02.24a4 4 0 0 1-4.78 4.78l-.24-.02a3.5 3.5 0 0 0-.8-.18l-.25-.08-.26-.08a4.5 4.5 0 0 1-1.1-1.1l-.18-.24-.18-.25a4.5 4.5 0 0 1-1.1-1.1l-.08-.26-.08-.25a3.5 3.5 0 0 0-.18-.8l-.02-.24Z" /><path d="m12 15-1.9-1.9a2.2 2.2 0 0 1 0-3.2A2.3 2.3 0 0 1 12 9.9a2.3 2.3 0 0 1 1.6 1.6 2.2 2.2 0 0 1 0 3.2L12 15Z" /></svg>
                                            Popular
                                        </div>
                                    )}
                                    <p className="text-4xl font-bold text-white">{plan.price}</p>
                                    <p className="text-sm text-neutral-400 mt-1">{plan.delivery}</p>
                                    <p className="mt-4 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-300">{plan.plan}</p>
                                    <div className="border-t border-purple-500/20 my-6"></div>
                                    <ul className="space-y-3 text-neutral-300 flex-grow">
                                        {plan.features.map(feature => (
                                            <li key={feature} className="flex items-center gap-3">
                                                <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full mt-8 bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-colors">
                                        Start a Project
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="w-full max-w-6xl mx-auto mt-24">
                        <div className="relative rounded-2xl p-8 border border-green-400/30 bg-black/20">
                            <div className="relative z-10 text-left">
                                <h3 className="text-3xl md:text-4xl font-bold">
                                    Bonuses Worth Over{" "}
                                    <span className="text-green-400">$2,500-Yours Free!</span>
                                </h3>
                                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {bonuses.map((bonus, i) => (
                                        <div
                                            key={i}
                                            className="relative rounded-xl p-6 bg-[#121212] transition-all duration-300 hover:bg-white/5 border border-white/10"
                                        >
                                            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-green-400">
                                                {bonus.icon}
                                            </div>
                                            <h4 className="mt-4 font-semibold text-lg text-white">{bonus.title}</h4>
                                            <p className="mt-2 text-neutral-400 text-sm">
                                                {bonus.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* UPDATED: FAQ সেকশন যোগ করা হয়েছে */}
            <FaqSection />
        </div>
    );
}
