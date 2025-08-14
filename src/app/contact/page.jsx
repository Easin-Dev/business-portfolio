"use client";
import React, { useState, useRef, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spotlight } from "../component/ui/spotlight";
import Link from "next/link";
import { BackgroundGradient } from "../component/ui/background-gradient";
import { CheckCircle2, ArrowRight, Volume2, VolumeX, ChevronDown } from "lucide-react";
import DottedMap from "dotted-map";

// Budget options
const budgetOptions = [
    "Less than $2K",
    "$2K - $5K",
    "$5K - $10K",
    "$10K - $20K",
    "$20K - $50K",
    "More than $50K",
];

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
];

// World Map Component
const WorldMapSection = memo(() => {
    const locations = [
        {
            lat: 33.8323,
            lng: -118.2851,
            title: "USA",
            address: "17700 Avalon BLVD Carson California, USA",
            phone: "+1(714) 903-6333",
        },
        {
            lat: 23.8103,
            lng: 90.4125,
            title: "Bangladesh",
            address: "Ventura Iconia, Level 3, Plot 37, Road 11, Banani 1213, Dhaka, Bangladesh",
            phone: "+880179 815 5521",
        },
    ];

    const { svgMap } = useMemo(() => {
        const map = new DottedMap({ height: 100, grid: "diagonal" });
        const svgMapData = map.getSVG({
            radius: 0.22,
            color: "#4C4C4C",
            shape: "circle",
            backgroundColor: "transparent",
        });
        return { svgMap: svgMapData };
    }, []);

    const projectPoint = (lat, lng) => {
        const x = (lng + 180) * (800 / 360);
        const y = (90 - lat) * (400 / 180);
        return { x, y };
    };

    return (
        <div className="w-full bg-[#050709] py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <span className="inline-block border border-blue-400 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                    Connect Now
                </span>
                <h2 className="mt-6 text-4xl md:text-5xl text-white">
                  <span className="font-bold">  Get In Touch Now For Business Or</span>
                    <br />
                    <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Career Opportunities!
                    </span>
                </h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div>
                        <p className="font-semibold text-neutral-300">Project Inquiries? Let's Team Up</p>
                        <a href="mailto:hello@designmonks.co" className="text-purple-400 hover:text-purple-300 transition-colors break-all">
                            hello@designmonks.co
                        </a>
                    </div>
                    <div>
                        <p className="font-semibold text-neutral-300">Be a Monk! Be a Part of the Leading Team!</p>
                        <a href="mailto:career@designmonks.co" className="text-purple-400 hover:text-purple-300 transition-colors break-all">
                            career@designmonks.co
                        </a>
                    </div>
                </div>
                <div className="mt-12 w-full aspect-[2/1] rounded-lg relative font-sans">
                    <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
                        alt="world map"
                        draggable={false}
                    />
                    <svg
                        viewBox="0 0 800 400"
                        className="w-full h-full absolute inset-0 pointer-events-none select-none"
                    >
                        {locations.map((loc, i) => {
                            const point = projectPoint(loc.lat, loc.lng);
                            return (
                                <g key={`marker-group-${i}`} className="group">
                                    <circle cx={point.x} cy={point.y} r="8" fill="rgba(168, 85, 247, 0.2)" />
                                    <circle cx={point.x} cy={point.y} r="4" fill="rgba(168, 85, 247, 0.5)" />
                                    <circle cx={point.x} cy={point.y} r="2" fill="rgb(168, 85, 247)" />
                                    <foreignObject x={point.x - 128} y={point.y + 20} width="256" height="150" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/50 p-4 rounded-lg shadow-lg text-left">
                                            <h3 className="text-base font-bold text-white">{loc.title}</h3>
                                            <p className="text-neutral-300 text-xs mt-1">{loc.address}</p>
                                            <p className="text-purple-400 text-xs mt-2">{loc.phone}</p>
                                        </div>
                                    </foreignObject>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>
        </div>
    );
});
WorldMapSection.displayName = 'WorldMapSection';

// FAQ Accordion Item Component
function AccordionItem({ item, isOpen, onClick }) {
    return (
        <div className="border-b border-gray-200 py-6">
            <button onClick={onClick} className="w-full flex justify-between items-center text-left">
                <h3 className="text-lg font-medium text-black">{item.question}</h3>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className={`h-6 w-6 transition-colors ${isOpen ? "text-purple-600" : "text-gray-500"}`} />
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
        <section className="w-full bg-white text-black py-20 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="inline-block border border-blue-500 bg-teal-50 text-blue-400 text-xs font-medium px-3 py-1 rounded-full">
                        Frequently Asked Questions
                    </span>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-6xl">
                        Your Questions <span className="italic font-serif text-blue-600">Answered!</span>
                    </h2>
                </div>
                <div className="mt-16">
                    {faqData.map((item, index) => (
                        <AccordionItem key={index} item={item} isOpen={openIndex === index} onClick={() => handleToggle(index)} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function ContactPage() {
    const [selectedBudget, setSelectedBudget] = useState(null);
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            const newMutedState = !videoRef.current.muted;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
        }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
        }),
    };

    return (
        <div className="w-full bg-[#050709] text-white">
            <div className="relative w-full min-h-[70vh] flex items-start justify-center overflow-hidden pt-28 md:pt-32">
                <div className="absolute inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="hsl(259, 80%, 50%)" />
                <Spotlight className="top-20 right-full" fill="hsl(190, 80%, 50%)" />
                <BackgroundGradient containerClassName="hidden lg:block absolute top-20 -left-24 w-96 z-10 transform -rotate-[15deg] transition-transform duration-500 hover:rotate-[-10deg] hover:scale-105">
                    <img src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758837d0dffb8e32f63_137e4404fe981fb7e0f2f0db1f9ec8e1_3.avif" alt="Project Mockup 1" className="w-full h-full object-contain rounded-lg" />
                </BackgroundGradient>
                <BackgroundGradient containerClassName="hidden lg:block absolute bottom-20 -right-24 w-96 z-10 transform rotate-[15deg] transition-transform duration-500 hover:rotate-[10deg] hover:scale-105">
                    <img src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758594e31e0312a925f_e0482580c600f74a17f23e4f9a90e82e_1.avif" alt="Project Mockup 2" className="w-full h-full object-contain rounded-lg" />
                </BackgroundGradient>
                <div className="relative z-20 text-center px-4 w-full flex flex-col items-center">
                   <h2 className="text-xl md:text-2xl font-semibold text-gray-200 tracking-wider">
          <img
            src="https://i.ibb.co.com/xPS3xYC/scaleup-web-logo.png"
            alt="Project Mockup 1"
            className="w-[300px] h-[100px]"
          />
        </h2>
                    <div className="text-neutral-300 mt-4 bg-white/30 backdrop-blur-none w-44 p-2 rounded-r-full rounded-l-full mx-auto">
                        <Link href="/" className="hover:text-white transition-colors"> Home </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">Contact Us</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl  text-white max-w-4xl mt-2">
                       <span className="font-bold"> Have A Question Or</span> <br />
                        <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Just Want To Chat?</span>
                    </h1>
                </div>
            </div>
            <div className="relative z-10 -mt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto bg-white text-black rounded-3xl shadow-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-black">Tell Us Your Amazing Project Here</h2>
                            <ul className="mt-6 space-y-3 text-gray-600">
                                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-purple-600" /><span>Expect a response from us within 24 hours</span></li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-purple-600" /><span>We're happy to sign an NDA upon request</span></li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-purple-600" /><span>Get access to a team of dedicated product specialists</span></li>
                            </ul>
                        </div>
                        <div className="relative mt-8 rounded-2xl overflow-hidden group cursor-pointer" onClick={toggleMute}>
                            <video ref={videoRef} src="https://www.w3schools.com/html/mov_bbb.mp4" autoPlay loop muted playsInline className="w-full h-auto object-cover"></video>
                            <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </div>
                        </div>
                    </div>
                    <form className="space-y-6">
                        <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} custom={0} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="full-name" placeholder="John Doe" className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-purple-600 transition" />
                            </div>
                            <div>
                                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">Whatsapp Number <span className="text-gray-400">(Optional)</span></label>
                                <input type="text" id="whatsapp" placeholder="1123 1234567" className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-purple-600 transition" />
                            </div>
                        </motion.div>
                        <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} custom={1}>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                            <input type="email" id="email" placeholder="yourmail@gmail.com" className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-purple-600 transition" />
                        </motion.div>
                        <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} custom={2}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Budget</label>
                            <div className="flex flex-wrap gap-2">
                                {budgetOptions.map((option) => (
                                    <button key={option} type="button" onClick={() => setSelectedBudget(option)} className={`px-4 py-2 text-sm rounded-full transition-colors duration-200 ${selectedBudget === option ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} custom={3}>
                            <label htmlFor="details" className="block text-sm font-medium text-gray-700">Project Details</label>
                            <textarea id="details" rows="4" placeholder="I want to redesign my website..." className="mt-1 block p-5 w-full bg-gray-100 border-transparent rounded-lg focus:ring-purple-600 focus:border-purple-600 transition"></textarea>
                        </motion.div>
                        <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} custom={4}>
                            <button type="submit" className="w-full flex items-center justify-center bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                                Let's Connect <ArrowRight className="ml-2" size={20} />
                            </button>
                        </motion.div>
                    </form>
                </div>
            </div>
            <WorldMapSection />
            <FaqSection />
        </div>
    );
}
