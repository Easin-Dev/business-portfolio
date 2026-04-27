"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Linkedin, Facebook, Code, ExternalLink, Sparkles, Target, Zap, ShieldCheck } from "lucide-react";

// Helper component for scroll-reveal text animation
export const AnimatedText = ({ text, className }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.015,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0.1, y: 10, color: "#94a3b8" },
        visible: { opacity: 1, y: 0, color: "inherit" },
    };

    return (
        <motion.p
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {text.split(" ").map((word, index) => (
                <motion.span key={index} variants={wordVariants} className="inline-block mr-[0.25em]">
                    {word}
                </motion.span>
            ))}
        </motion.p>
    );
};

export function FounderSection({ members }) {
    const ceo = members[0];
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[40px] opacity-10 blur-2xl" />
                        <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                            <Image 
                                width={800} 
                                height={1000} 
                                src={ceo.image} 
                                alt={ceo.name} 
                                className="w-full h-auto object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8">
                                <h3 className="text-3xl font-black text-white">{ceo.name}</h3>
                                <p className="text-blue-400 font-bold tracking-widest uppercase text-xs mt-2">Founder & CEO, ScaleUp Web</p>
                            </div>
                        </div>
                    </motion.div>

                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6">
                                <Sparkles size={14} /> The Visionary Behind ScaleUp
                            </span>
                            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
                                Empowering Bangladesh's <span className="text-blue-600 italic">Digital Future.</span>
                            </h2>
                            <AnimatedText 
                                text={ceo.bio}
                                className="text-xl text-slate-600 leading-relaxed mb-10 font-medium"
                            />
                            
                            <div className="grid grid-cols-2 gap-8 mb-10 border-y border-slate-100 py-10">
                                <div>
                                    <p className="text-3xl font-black text-slate-900">100%</p>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">Digital Visibility</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-slate-900">Low</p>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">Operational Cost</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <a href={ceo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    <Linkedin size={22} />
                                </a>
                                <a href={ceo.socials.facebook} target="_blank" rel="noopener noreferrer" className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-700 hover:text-white transition-all duration-300">
                                    <Facebook size={22} />
                                </a>
                                <a href={ceo.socials.fiverr} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 h-14 rounded-2xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-all duration-300">
                                    Hire on Fiverr <ExternalLink size={18} />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function MissionVision({ vision, mission }) {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-10 lg:p-16 rounded-[40px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50"
                    >
                        <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-200">
                            <Target size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-6">Our Vision</h3>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">{vision}</p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-10 lg:p-16 rounded-[40px] bg-slate-900 text-white shadow-2xl"
                    >
                        <div className="h-16 w-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/20">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-3xl font-black mb-6">Our Mission</h3>
                        <p className="text-lg text-slate-300 leading-relaxed font-medium">{mission}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
