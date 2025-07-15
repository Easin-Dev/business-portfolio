"use client";
import React from "react";
// 3D-এর পরিবর্তে 2D আইকন ইম্পোর্ট করা হচ্ছে
import {
  Infinity,
  UserCheck,
  CircleDollarSign,
  PieChart,
  Star,
} from "lucide-react";

// প্রতিটি ফিচার কার্ডের জন্য ডেটা (আইকনসহ)
const features = [
  {
    icon: <Infinity size={40} className="text-white" />,
    title: "Unlimited Revisions",
    description:
      "We're committed to your satisfaction with unlimited revisions at every step. Our mission is to make your vision come to life exactly as you imagine.",
  },
  {
    icon: <UserCheck size={40} className="text-white" />,
    title: "Lifetime Support",
    description:
      "With our lifetime support, you're never alone. We'll be there for you at every stage with necessary guidance and assistance whenever you need it.",
  },
  {
    icon: <CircleDollarSign size={40} className="text-white" />,
    title: "Personalised Plans",
    description:
      "Get top-quality service without breaking the bank. Our rates are designed to fit your budget so that you can get the best value for your investment.",
  },
  {
    icon: <PieChart size={40} className="text-white" />,
    title: "Custom Design Solutions",
    description:
      "Our easy payment options are completely flexible. So, you can invest in your success while staying within your budget.",
  },
  {
    icon: <Star size={40} className="text-white" />,
    title: "24/7 Customer Support",
    description:
      "Benefit from the expertise of our carefully chosen resources that are designed to make your journey smooth and effortless with outstanding results.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white dark:bg-[#f0f0f0] text-black py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* সেকশনের শিরোনাম */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-3 py-1 rounded-full">
            Why Choose Us
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            We Design for the{" "}
            <span className="italic font-serif text-teal-600">Future</span> to
            Drive Today’s{" "}
            <span className="italic font-serif text-teal-600">Success</span>
          </h2>
        </div>

        {/* ফিচার কার্ডের গ্রিড */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 bg-white shadow-lg border border-gray-100 ${
                index === 2 || index === 3 ? "lg:col-span-1" : ""
              } ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              {/* UPDATED: 3D Canvas-এর পরিবর্তে 2D আইকন কন্টেইনার */}
              <div className="h-24 w-24 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-2xl font-bold">{feature.title}</h3>
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
