"use client";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Volume2, VolumeX, Sparkles } from "lucide-react";
import PageHero from "../component/PageHero";

// Dynamic imports for heavy components
const WorldMapSection = dynamic(() => import("./components/WorldMapSection"), {
    ssr: false,
    loading: () => (
        <div className="w-full bg-[#050709] py-20 lg:py-24 animate-pulse">
            <div className="max-w-7xl mx-auto px-4">
                <div className="h-8 w-32 bg-gray-800 rounded-full mx-auto mb-6"></div>
                <div className="h-12 w-3/4 bg-gray-800 rounded-lg mx-auto mb-12"></div>
                <div className="w-full aspect-[2/1] bg-gray-800 rounded-lg"></div>
            </div>
        </div>
    ),
});

const FaqSection = dynamic(() => import("./components/FaqSection"), {
    ssr: false,
    loading: () => (
        <div className="w-full bg-white py-20 lg:py-24 animate-pulse">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="h-6 w-48 bg-gray-200 rounded-full mx-auto mb-6"></div>
                <div className="h-10 w-2/3 bg-gray-200 rounded-lg mx-auto mb-16"></div>
                <div className="space-y-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-16 w-full bg-gray-100 rounded-lg"></div>
                    ))}
                </div>
            </div>
        </div>
    ),
});

// Budget options
const budgetOptions = [
    "Less than $2K",
    "$2K - $5K",
    "$5K - $10K",
    "$10K - $20K",
    "$20K - $50K",
    "More than $50K",
];

export default function ContactPage() {
    const [selectedBudget, setSelectedBudget] = useState(null);
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [formData, setFormData] = useState({
        fullName: "",
        whatsapp: "",
        email: "",
        details: "",
    });
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const toggleMute = () => {
        if (videoRef.current) {
            const newMutedState = !videoRef.current.muted;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
        }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
        }),
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmissionStatus(null);
        setShowSuccessAlert(false);

        const dataToSend = {
            ...formData,
            budget: selectedBudget,
        };

        if (!dataToSend.fullName || !dataToSend.email || !dataToSend.budget || !dataToSend.details) {
            setSubmissionStatus('error');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setShowSuccessAlert(true);
                setFormData({ fullName: "", whatsapp: "", email: "", details: "" });
                setSelectedBudget(null);

                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 5000); // 5 seconds

            } else {
                setSubmissionStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmissionStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full bg-[#050709] text-white overflow-x-hidden">
            <PageHero 
                breadcrumb="Contact Us"
                title="Have A Question Or"
                highlight="Just Want To Chat?"
                subtitle="Tell us about your project or just say hi. We're here to help you scale your business to the next level."
                spotlightColor="hsl(259, 80%, 50%)"
            />
            
            <div className="relative z-10 -mt-20 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="rounded-[32px] p-8 md:p-12 lg:p-16 bg-white shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 border border-gray-100">
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-blue-600 mb-6">
                                    <Sparkles size={18} />
                                    <span className="text-sm font-semibold tracking-wider uppercase">Let's Team Up</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15] text-black">
                                    Tell Us Your{" "}
                                    <span className="relative inline-block text-blue-600">
                                        Amazing Project
                                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/80" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                                        </svg>
                                    </span>{" "}
                                    Here
                                </h1>
                                <ul className="mt-10 space-y-6">
                                    {[
                                        "Expect a response from us within 24 hours",
                                        "We're happy to sign an NDA upon request",
                                        "Get access to a team of dedicated product specialists"
                                    ].map((item, i) => (
                                        <motion.li 
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="mt-1 bg-blue-50 p-1 rounded-full border border-blue-100">
                                                <CheckCircle2 size={18} className="text-blue-600" />
                                            </div>
                                            <span className="text-neutral-600 text-base md:text-lg leading-snug">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="relative mt-12 rounded-2xl overflow-hidden group cursor-pointer aspect-video bg-neutral-50 border border-gray-200 shadow-lg" onClick={toggleMute}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-[1]"></div>
                                <video 
                                    ref={videoRef} 
                                    src="https://www.w3schools.com/html/mov_bbb.mp4" 
                                    autoPlay 
                                    loop 
                                    muted 
                                    playsInline 
                                    preload="none"
                                    className="w-full h-full object-cover"
                                ></video>
                                <div className="absolute bottom-4 right-4 bg-white/20 text-white p-2.5 rounded-full z-[2] opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md border border-white/30 hover:scale-110">
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </div>
                                <div className="absolute top-4 left-4 z-[2] flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/70">Scale Up Visualization</span>
                                </div>
                            </div>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={0} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label htmlFor="fullName" className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-blue-600">Full Name</label>
                                    <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full bg-neutral-50 border border-gray-200 rounded-xl px-5 py-4 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                                </div>
                                <div className="group">
                                    <label htmlFor="whatsapp" className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-blue-600">Whatsapp <span className="opacity-50">(Optional)</span></label>
                                    <input type="text" id="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="1123 1234567" className="w-full bg-neutral-50 border border-gray-200 rounded-xl px-5 py-4 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                                </div>
                            </motion.div>

                            <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={1}>
                                <label htmlFor="email" className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Your Email</label>
                                <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="yourmail@gmail.com" className="w-full bg-neutral-50 border border-gray-200 rounded-xl px-5 py-4 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                            </motion.div>

                            <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={2}>
                                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Project Budget</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {budgetOptions.map((option) => (
                                        <button 
                                            key={option} 
                                            type="button" 
                                            onClick={() => setSelectedBudget(option)} 
                                            className={`px-4 py-3 text-xs rounded-xl transition-all duration-300 font-semibold border ${
                                                selectedBudget === option 
                                                ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20" 
                                                : "bg-neutral-50 border-gray-100 text-neutral-500 hover:border-blue-200 hover:bg-white"
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={3}>
                                <label htmlFor="details" className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Project Details</label>
                                <textarea id="details" value={formData.details} onChange={handleChange} rows="5" placeholder="I want to redesign my website..." className="w-full bg-neutral-50 border border-gray-200 rounded-2xl px-5 py-4 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none font-medium"></textarea>
                            </motion.div>

                            <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={4}>
                                <button 
                                    type="submit" 
                                    disabled={isLoading} 
                                    className={`w-full group relative flex items-center justify-center font-bold py-5 px-8 rounded-2xl transition-all duration-500 overflow-hidden ${
                                        isLoading 
                                        ? 'bg-neutral-200 cursor-not-allowed opacity-50' 
                                        : 'bg-blue-600 text-white hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)]'
                                    }`}
                                >
                                    <span className={`relative z-10 flex items-center gap-2 transition-colors duration-500`}>
                                        {isLoading ? 'Sending...' : 'Let\'s Connect'}
                                        {!isLoading && <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />}
                                    </span>
                                    {!isLoading && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    )}
                                </button>
                            </motion.div>

                            {submissionStatus === 'error' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-red-500 text-sm font-semibold tracking-wide py-3 bg-red-50 rounded-lg border border-red-100">
                                    There was an error sending your message. Please try again.
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* Animated Success Alert */}
            <AnimatePresence>
                {showSuccessAlert && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="fixed bottom-10 right-10 z-[100] p-5 rounded-[24px] bg-white border border-gray-100 text-black shadow-2xl flex items-center gap-5 max-w-sm"
                    >
                        <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
                            <CheckCircle2 size={24} className="text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-black text-lg leading-none tracking-tight">Sent Successfully!</span>
                            <span className="text-sm text-neutral-500 mt-1.5 font-medium">We'll respond within 24 hours.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <WorldMapSection />
            <FaqSection />
        </div>
    );
}