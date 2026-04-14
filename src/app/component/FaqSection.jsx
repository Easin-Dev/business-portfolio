"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// UPDATED: প্রশ্ন এবং উত্তরের জন্য নতুন ডেটা
const faqData = [
  {
    question: "How do I start a project with you?",
    answer:
      "Starting a project with us is very easy! You can click the 'Start a Project' button to fill out our form, or email us directly. We will then schedule a free consultation meeting to discuss your project in detail.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "We typically require a 30% to 20% upfront payment to start the project. For larger projects, we are flexible and can divide the payment into several milestones. We accept bank transfers, credit cards, and other popular payment methods.",
  },
  {
    question: "Do you provide support after the project is completed?",
    answer:
      "Absolutely! We provide 30 days of free technical support after each project's completion. If you need further assistance, we also offer affordable maintenance packages.",
  },
  {
    question: "Do I need to buy a domain and hosting?",
    answer:
      "Yes, a domain and hosting are required for your website. If you'd like, we can assist you in finding and setting up the best providers. We also include domain and hosting in our 'All-in-One Ultimate Package'.",
  },
  {
    question: "Do you offer SEO (Search Engine Optimization) services?",
    answer:
      "We include basic on-page SEO, such as titles, meta descriptions, and image optimization, with all our web development packages. For advanced SEO services, we can provide them through our partner agencies.",
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
            className={`h-6 w-6 transition-colors ${isOpen ? "text-purple-400" : "text-neutral-500"
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
          <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white">
            Your Questions{" "}
            <span className="italic font-serif text-blue-600 relative inline-block">
              Answered!
              <svg className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-blue-600/80" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00035 7.15346C55.0746 -1.04258 135.807 -1.82103 198.051 5.92215" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
            </span>
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
