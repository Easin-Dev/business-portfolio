"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// প্রশ্ন এবং উত্তরের জন্য ডেমো ডেটা
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

// একটি অ্যাকর্ডিয়ন আইটেমের জন্য কম্পোনেন্ট
function AccordionItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-neutral-800 py-6">
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
            className={`h-6 w-6 transition-colors ${
              isOpen ? "text-purple-400" : "text-neutral-500"
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
            <p className="pt-4 text-neutral-400">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  // কোন প্রশ্নটি খোলা আছে তা ট্র্যাক করার জন্য
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-black rounded-t-4xl text-white py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* সেকশনের শিরোনাম */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block border border-teal-500 text-teal-400 text-xs font-medium px-3 py-1 rounded-full">
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Your Questions{" "}
            <span className="italic font-serif text-teal-400">Answered!</span>
          </h2>
        </div>

        {/* FAQ অ্যাকর্ডিয়ন */}
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
