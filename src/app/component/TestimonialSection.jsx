"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

// প্রশংসাপত্রের জন্য ডেমো ডেটা
const testimonials = [
  {
    quote:
      "Scaleup web was a pleasure to work with. They were proactive, and efficient, and never hesitated to challenge me in my assumptions. The design they built for me was beautiful, and I would not hesitate to retain them again in the future.",
    name: "Kishor Chandra Bala",
    title: "co-founder of Salinnyo",
    image: "https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/577497509_1160500629620545_8555406647823235800_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ZOMRNbIIHkEQ7kNvwHO6ThA&_nc_oc=AdmIKBnoR7ciwTf2hsXFEjRssmBFnmlIg1JwiW3ydvMvtZdWr5iFilUWxBUp8ykILW8&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=FrSyYEJYaZ7CIpyKq2p4fg&oh=00_Afow3pjKOGREexl1wUTdAcLPDWJs2Kvef-JGcnEd3AqHmw&oe=696FDD33",
    logo: "https://placehold.co/150x50/e0e7ff/333?text=salinnyo",
  },
  {
    quote:
      "The team's attention to detail is second to none. They delivered a product that exceeded our expectations and our users love the new interface. A truly remarkable experience from start to finish.",
    name: "Mahadi Hasan",
    title: "Founder & CEO of Dinabitt",
    image: "https://i.postimg.cc/yxdbKY3K/Generated-Image-September-20-2025-10-44-PM.png",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWkGCqfMUd-q_ZnTFIKidr6zoGUT3LQyD1hQ&s",
  },
  {
    quote:
      "Working with them felt like a true partnership. Their creative input and technical expertise were invaluable. We saw a significant increase in user engagement after the redesign.",
    name: "Ahads Hikder",
    title: "",
    image: "https://i.postimg.cc/RZv3dLtR/aha-da-sa-kada-ra.png",
    logo: "https://placehold.co/150x50/dcfce7/333?text=NCP",
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
    <section className="w-full bg-white dark:bg-[#f0f0f0] text-black rounded-t-4xl pb-62 pt-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* সেকশনের শিরোনাম */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-3 py-1 rounded-full">
            Client Stories
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Our Clients Love to{" "}
            <span className="italic font-serif text-blue-600">
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
