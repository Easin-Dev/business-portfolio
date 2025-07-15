"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

// প্রশংসাপত্রের জন্য ডেমো ডেটা
const testimonials = [
  {
    quote:
      "Design Monks was a pleasure to work with. They were proactive, and efficient, and never hesitated to challenge me in my assumptions. The design they built for me was beautiful, and I would not hesitate to retain them again in the future.",
    name: "Jenna Carvalho",
    title: "Principal @ Guardian Estate Company",
    image: "https://placehold.co/300x300/c7d2fe/333?text=Jenna",
    logo: "https://placehold.co/150x50/e0e7ff/333?text=GUARDIAN",
  },
  {
    quote:
      "The team's attention to detail is second to none. They delivered a product that exceeded our expectations and our users love the new interface. A truly remarkable experience from start to finish.",
    name: "John Doe",
    title: "CEO @ Tech Innovators",
    image: "https://placehold.co/300x300/fecaca/333?text=John",
    logo: "https://placehold.co/150x50/fee2e2/333?text=INNOVATE",
  },
  {
    quote:
      "Working with them felt like a true partnership. Their creative input and technical expertise were invaluable. We saw a significant increase in user engagement after the redesign.",
    name: "Emily Smith",
    title: "Marketing Head @ Creative Solutions",
    image: "https://placehold.co/300x300/bbf7d0/333?text=Emily",
    logo: "https://placehold.co/150x50/dcfce7/333?text=CREATIVE",
  },
];

// স্লাইড পরিবর্তনের জন্য অ্যানিমেশন ভ্যারিয়েন্ট
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export default function TestimonialSection() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    let newPage = page + newDirection;
    if (newPage < 0) {
      newPage = testimonials.length - 1;
    } else if (newPage >= testimonials.length) {
      newPage = 0;
    }
    setPage([newPage, newDirection]);
  };

  const testimonial = testimonials[page];

  return (
    <section className="w-full bg-white dark:bg-[#f0f0f0] text-black rounded-t-4xl py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* সেকশনের শিরোনাম */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-3 py-1 rounded-full">
            Client Stories
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Our Clients Love to{" "}
            <span className="italic font-serif text-teal-600">
              Recommend Us
            </span>
          </h2>
        </div>

        {/* টেস্টিমোনিয়াল স্লাইডার */}
        <div className="relative mt-16 h-96 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full max-w-4xl mx-auto"
            >
              <div className="relative bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-yellow-300 to-green-300 blur-2xl opacity-50"></div>

                {/* বাম দিকের ছবি */}
                <div className="md:col-span-1">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </div>

                {/* ডান দিকের লেখা */}
                <div className="md:col-span-2 space-y-4">
                  <Quote className="text-gray-300" size={32} />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.title}</p>
                  </div>
                  <img
                    src={testimonial.logo}
                    alt="Company Logo"
                    className="h-8 w-auto opacity-50"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* নেভিগেশন বাটন */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-3 shadow-md transition-colors z-20"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-3 shadow-md transition-colors z-20"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
