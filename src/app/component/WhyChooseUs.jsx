"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Infinity,
  UserCheck,
  CircleDollarSign,
  PieChart,
  Star,
  Zap
} from "lucide-react";

const features = [
  {
    icon: <Infinity size={28} />,
    title: "Unlimited Revisions",
    description: "We're committed to your satisfaction with unlimited revisions at every step to make your vision come to life.",
  },
  {
    icon: <UserCheck size={28} />,
    title: "Lifetime Support",
    description: "With our lifetime support, you're never alone. We'll be there for you at every stage with necessary guidance.",
  },
  {
    icon: <CircleDollarSign size={28} />,
    title: "Personalised Plans",
    description: "Get top-quality service without breaking the bank. Our rates are designed to fit your budget perfectly.",
  },
  {
    icon: <PieChart size={28} />,
    title: "Scalable Architecture",
    description: "We build applications on a solid foundation, ensuring they can grow and adapt with your business needs.",
  },
  {
    icon: <Star size={28} />,
    title: "24/7 Customer Support",
    description: "Benefit from the expertise of our carefully chosen resources designed to make your journey effortless.",
  },
  {
    icon: <Zap size={28} />,
    title: "Lightning Fast Delivery",
    description: "We value your time. Our structured agile workflows ensure fast and reliable delivery of your projects.",
  }
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="w-full bg-white rounded-t-[3rem] text-black py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 h-full w-full bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
      
      {/* Cool decorative glowing orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full border border-blue-100"
          >
            <Star size={14} className="text-blue-500 fill-blue-500" />
            Why Choose Us
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]"
          >
            Why Choose Our{" "}
            <span className="italic font-serif text-blue-600 font-light relative inline-block">
              Web Development
              <svg className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-blue-600/80" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
            </span> <br className="hidden md:block"/> & Digital{" "}
            <span className="italic font-serif text-blue-600 font-light relative inline-block mt-2">
              Marketing
              <svg className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-blue-600/80" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
            </span> Services
          </motion.h2>
        </div>

        {/* Feature Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="group relative rounded-[2rem] p-8 lg:p-10 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-16 w-16 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-blue-100 group-hover:border-blue-600 group-hover:shadow-blue-200 group-hover:shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="mt-8 text-2xl font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                <p className="mt-4 text-slate-500 leading-relaxed font-medium flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
