"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Spotlight } from "../component/ui/spotlight";
import Link from "next/link";
import { BackgroundGradient } from "../component/ui/background-gradient";
import { Linkedin, Facebook, Code, Lightbulb, Handshake, Rocket } from "lucide-react";
import Image from "next/image";
import PageHero from "../component/PageHero";

// Helper component for scroll-reveal text animation
const AnimatedText = ({ text, className }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0.2, color: "#6b7280" }, // gray-500
        visible: { opacity: 1, color: "#1f2937" }, // gray-800
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


// Main About Us Page Component
export default function AboutUsPage() {
    const teamMembers = [
        {
            name: "Easin Arafat",
            role: "Founder, Web Design & Full-Stack Developer",
            image: "https://i.ibb.co.com/PsHs5gk5/WIN-20250731-13-56-16-Pro.jpg",
            bio: "With a passion for creating seamless digital experiences, Easin leads ScaleUp Web with a vision to merge cutting-edge technology with user-centric design. His expertise in both front-end and back-end development ensures that every project is not only beautiful but also robust and scalable.",
            socials: {
                linkedin: "https://www.linkedin.com/in/easinarafatdev/",
                fiverr: "https://www.fiverr.com/easin_dev",
                facebook: "https://www.facebook.com/easin.arafat.dev",
            },
        },
        {
            name: "Ali Hashan Mashrafi",
            role: "Co-founder & Full-Stack Web Developer",
            image: "https://placehold.co/400x400/10b981/ffffff?text=AM",
            bio: "Ali is a master of complex problem-solving and backend architecture. As a co-founder, he drives the technical excellence of our projects, ensuring every web application is secure, efficient, and built on a foundation that can grow with our clients' businesses.",
            socials: {
                linkedin: "#",
                fiverr: "#",
                facebook: "#",
            },
        },
    ];

    const values = [
        { icon: <Handshake size={28} />, title: "Client Partnership", description: "We believe in collaboration. Your vision is our guide, and we work with you at every step to ensure we achieve it together." },
        { icon: <Lightbulb size={28} />, title: "Innovation", description: "We constantly explore new technologies and creative solutions to build web applications that are modern, efficient, and future-proof." },
        { icon: <Rocket size={28} />, title: "Quality First", description: "From code to design, we are committed to the highest standards of quality, ensuring your project is robust, scalable, and secure." },
    ];

    const processSteps = [
        { title: "Discovery & Strategy", description: "We start by understanding your goals, audience, and project requirements to build a solid strategic foundation." },
        { title: "Design & Prototyping", description: "Our team creates intuitive UI/UX designs and interactive prototypes to visualize the final product." },
        { title: "Development & Testing", description: "We write clean, efficient code and conduct rigorous testing to ensure a bug-free, high-performance application." },
        { title: "Launch & Support", description: "After a successful launch, we provide ongoing support to ensure your application runs smoothly." },
    ];

    return (
        <div className="w-full bg-[#050709] text-white">
            <PageHero 
                breadcrumb="About Us"
                title="The Story Behind The Code,"
                highlight="The Team Behind The Success"
                subtitle="ScaleUp Web started with a simple mission: to build web applications that are not just functional, but also beautiful and user-friendly."
                spotlightColor="hsl(200, 80%, 50%)"
            />

            {/* About Us Content Section */}
            <div className="w-full bg-white text-black py-20 lg:py-24 rounded-t-[40px] -mt-10 relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Our Journey Section */}
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full">
                            Our Journey
                        </span>
                        <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-black">
                            From a Simple Idea to a Full-Stack Powerhouse
                        </h2>
                        <AnimatedText
                            text="ScaleUp Web started with a simple mission: to build web applications that are not just functional, but also beautiful and user-friendly. We are a team of passionate developers and designers who believe in the power of technology to transform businesses."
                            className="mt-6 text-xl text-gray-800 leading-relaxed"
                        />
                    </div>

                    {/* Founders Section */}
                    <div className="mt-20 lg:mt-28 space-y-20">
                        {/* Founder */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <Image width={800} height={800} src={teamMembers[0].image} alt={teamMembers[0].name} className="rounded-2xl shadow-2xl w-full h-auto object-cover" />
                            </motion.div>
                            <div>
                                <h3 className="text-4xl font-bold">{teamMembers[0].name}</h3>
                                <p className="mt-2 text-xl font-semibold text-purple-600">{teamMembers[0].role}</p>
                                <AnimatedText
                                    text={teamMembers[0].bio}
                                    className="mt-4 text-lg text-gray-800 leading-relaxed"
                                />
                                <div className="flex items-center gap-4 mt-6">
                                    <a href={teamMembers[0].socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors"><Linkedin size={24} /></a>
                                    <a href={teamMembers[0].socials.fiverr} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors"><Code size={24} /></a>
                                    <a href={teamMembers[0].socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors"><Facebook size={24} /></a>
                                </div>
                            </div>
                        </div>

                        {/* Co-founder */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <div className="lg:order-2">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <Image width={800} height={800} src={teamMembers[1].image} alt={teamMembers[1].name} className="rounded-2xl shadow-2xl w-full h-auto object-cover" />
                                </motion.div>
                            </div>
                            <div className="lg:order-1">
                                <h3 className="text-4xl font-bold">{teamMembers[1].name}</h3>
                                <p className="mt-2 text-xl font-semibold text-teal-600">{teamMembers[1].role}</p>
                                <AnimatedText
                                    text={teamMembers[1].bio}
                                    className="mt-4 text-lg text-gray-800 leading-relaxed"
                                />
                                <div className="flex items-center gap-4 mt-6">
                                    <a href={teamMembers[1].socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors"><Linkedin size={24} /></a>
                                    <a href={teamMembers[1].socials.fiverr} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors"><Code size={24} /></a>
                                    <a href={teamMembers[1].socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors"><Facebook size={24} /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our Core Values Section */}
                    <div className="mt-20 lg:mt-28 text-center">
                        <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-4 py-1.5 rounded-full">
                            Our Values
                        </span>
                        <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-black">The Principles That Guide Us</h2>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    className="p-8 bg-gray-50 rounded-2xl border border-gray-200"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white mx-auto">
                                        {value.icon}
                                    </div>
                                    <h3 className="mt-6 text-2xl font-bold">{value.title}</h3>
                                    <p className="mt-2 text-gray-600">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Our Process Section */}
                    <div className="mt-20 lg:mt-28">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="inline-block bg-teal-100 text-teal-800 text-sm font-medium px-4 py-1.5 rounded-full">
                                Our Process
                            </span>
                            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-black">A Proven Path to Success</h2>
                        </div>
                        <div className="mt-16 relative">
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-gray-200 hidden lg:block"></div>
                            <div className="space-y-12 lg:space-y-0">
                                {processSteps.map((step, index) => (
                                    <div key={index} className="relative lg:flex lg:items-center my-8 lg:my-0">
                                        <motion.div
                                            className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:order-3 lg:text-left'}`}
                                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        >
                                            <h3 className="text-2xl font-bold text-purple-600">Step {index + 1}</h3>
                                            <h4 className="text-3xl font-bold mt-1">{step.title}</h4>
                                        </motion.div>

                                        <motion.div
                                            className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8 lg:order-1'}`}
                                            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                                        >
                                            <p className="mt-4 lg:mt-0 p-6 bg-gray-50 rounded-lg border border-gray-200 text-gray-600">{step.description}</p>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
