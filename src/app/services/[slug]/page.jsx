"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { servicesData } from "../../../data/servicesData";
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Check, 
  Zap, 
  Star, 
  Shield, 
  Plus, 
  Minus,
  Code2,
  Users2,
  HelpCircle,
  Cpu,
  Trophy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CurvedUnderline = ({ className = "" }) => (
  <svg 
    className={`absolute -bottom-2 left-0 w-full h-3 text-blue-500/80 pointer-events-none ${className}`} 
    viewBox="0 0 200 9" 
    fill="none" 
    preserveAspectRatio="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round"
    />
  </svg>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
          {question}
        </span>
        <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-blue-500/10 transition-colors ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <Minus size={18} className="text-blue-400" /> : <Plus size={18} className="text-neutral-500" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-400 leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const otherServices = servicesData.filter((s) => s.slug !== slug);

  return (
    <div className="w-full min-h-screen overflow-x-hidden selection:bg-blue-500/30">
      
      {/* =========================================================================
          TOP SECTION (DARK - Simple Media Hero)
          ========================================================================= */}
      <section className="relative bg-[#05070a] text-white pt-28 pb-48 overflow-hidden">
        {/* Background Decorators */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -translate-x-1/4 -translate-y-1/2" />
          <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-neutral-500 mb-12"
          >
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight size={14} className="text-neutral-600" />
            <Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link>
            <ChevronRight size={14} className="text-neutral-600" />
            <span className="text-white font-medium">{service.title}</span>
          </motion.nav>

          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8">
                <Zap size={14} className="animate-pulse" />
                Verified Premium Service
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                {service.title.split(" ")[0]} <br />
                <span className="relative inline-block text-transparent italic bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  {service.title.split(" ").slice(1).join(" ")}
                  <CurvedUnderline />
                </span>
              </h1>

              <p className="text-xl text-neutral-400 mb-10 leading-relaxed border-l-[3px] border-blue-500/50 pl-6 py-2">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-5">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black text-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 font-sans">Start Project</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white/[0.03] border border-white/10 text-white rounded-full font-bold text-lg transition-all duration-300 hover:bg-white/10 hover:border-blue-500/50 active:scale-95"
                >
                  View Plans
                </Link>
              </div>
            </motion.div>

            {/* Media (Image/Video) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative rounded-[32px] overflow-hidden border border-white/10 aspect-square flex items-center justify-center bg-white/[0.02] backdrop-blur-sm shadow-2xl">
                {service.image && service.image.endsWith(".mp4") ? (
                  <video
                    src={service.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-blue-950/20">
                    <Star size={80} className="text-blue-500/20" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MIDDLE SECTION (WHITE)
          ========================================================================= */}
      <section className="bg-[#fcfcfc] text-slate-900 py-40 relative overflow-hidden rounded-t-[4rem] md:rounded-t-[6rem] -mt-16 lg:-mt-24 z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.2)]">
        {/* Localized Grid Background */}
        <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none">
           <div className="absolute top-0 left-0 w-[500px] h-[500px] [background-size:25px_25px] [background-image:linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_75%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Tech Timeline Stack */}
          {service.technologies && (
            <div className="mb-40">
              <div className="text-center mb-24">
                <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs mb-6 block font-sans">Our Arsenal</span>
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
                  Modern Tech <span className="relative inline-block text-blue-600 italic">Stack <CurvedUnderline /></span>
                </h2>
              </div>
              
              <div className="relative max-w-5xl mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-1/2 hidden lg:block" />
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 relative">
                  {service.technologies.map((tech, idx) => (
                    <motion.div key={idx} whileHover={{ y: -5 }} className="group flex flex-col items-center gap-5">
                      <div className="relative">
                        <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shadow-lg">{idx + 1}</div>
                        <div className="w-24 h-24 rounded-[32px] bg-white border border-slate-100 shadow-sm flex items-center justify-center group-hover:shadow-2xl group-hover:border-blue-500/30 transition-all duration-500">
                          <img src={tech.icon} alt={tech.name} className="w-12 h-12" />
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <div className="mb-40">
              <div className="text-center mb-24">
                <span className="text-cyan-600 font-black uppercase tracking-[0.4em] text-xs mb-6 block font-sans">Comprehensive Features</span>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tighter">
                  Solutions Designed to <br />
                  <span className="relative inline-block text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                    Scale Your Brand <CurvedUnderline className="text-blue-500" />
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {service.features.map((feature, idx) => (
                  <motion.div key={idx} whileHover={{ y: -8 }} className="relative group p-12 lg:p-16 rounded-[48px] bg-white border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700">
                    <div className="flex items-center gap-8 mb-10">
                      <div className="p-5 bg-blue-50 rounded-[24px] text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        <Code2 size={32} />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{feature.title}</h3>
                    </div>
                    <p className="text-slate-500 text-xl leading-relaxed mb-10 font-medium">{feature.description}</p>
                    {feature.bullets && (
                      <div className="space-y-4 pt-10 border-t border-slate-100">
                        {feature.bullets.map((bullet, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <div className="mt-2 p-1 rounded-full bg-blue-100 text-blue-600"><Check size={14} /></div>
                            <span className="text-slate-700 font-bold text-lg leading-tight">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM SECTION (DARK)
          ========================================================================= */}
      <section className="bg-[#05070a] text-white py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* FAQ */}
          {service.faqs && (
            <div className="max-w-4xl mx-auto mb-56">
              <div className="flex items-center gap-6 mb-16">
                <div className="p-4 bg-blue-500/10 rounded-[24px] text-blue-400 border border-blue-500/20 shadow-2xl shadow-blue-500/10">
                  <HelpCircle size={32} />
                </div>
                <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
                  Common <span className="relative inline-block text-blue-500 italic">Queries <CurvedUnderline /></span>
                </h2>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-[48px] p-10 lg:p-16 shadow-2xl">
                {service.faqs.map((faq, idx) => (
                  <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <section className="relative w-full rounded-[64px] overflow-hidden mb-48 shadow-2xl border border-white/5">
            {/* Soft, deep background instead of bright gradient */}
            <div className="absolute inset-0 bg-[#0a0d14]" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10" />
            
            {/* Much subtler grid */}
            <div className="absolute inset-0 [background-size:30px_30px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
            
            {/* Decorative soft glow */}
            <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-blue-500/10 blur-[120px] rounded-full" />
            
            <div className="relative z-10 px-10 py-24 lg:py-32 text-center max-w-5xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[1.1] tracking-tighter">
                Ready to Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic">Digital Legacy?</span>
              </h2>
              <Link
                href="/contact"
                className="px-14 py-7 bg-blue-600 text-white text-2xl font-black rounded-full hover:bg-blue-500 hover:shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all inline-block active:scale-95"
              >
                Start Your Journey Now
              </Link>
            </div>
          </section>
        </div>
      </section>

    </div>
  );
}
