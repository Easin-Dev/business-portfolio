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
    title: "Scalable Architecture",
    description:
      "We build applications on a solid foundation, ensuring they can grow and adapt with your business needs without compromising performance.",
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
    <section className="w-full bg-white dark:bg-[#f0f0f0] rounded-t-4xl text-black py-20 lg:py-32 relative">
      {/* Dotted background added */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* সেকশনের শিরোনাম */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-3 py-1 rounded-full">
            Why Choose Us
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            We Design for the{" "}
            <span className="italic font-serif text-blue-500">Future</span> to
            Drive Today’s{" "}
            <span className="italic font-serif text-blue-500">Success</span>
          </h2>
        </div>

        {/* ফিচার কার্ডের গ্রিড - UPDATED */}
        <div className="mt-20 space-y-8">
          {/* First Row - 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.slice(0, 2).map((feature, index) => (
              <div
                key={index}
                className="relative rounded-2xl p-8 bg-white shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* UPDATED: Glow color changed to purple */}
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.15),transparent_30%)] pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="h-24 w-24 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{feature.title}</h3>
                  <p className="mt-4 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Second Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.slice(2).map((feature, index) => (
              <div
                key={index + 2}
                className="relative rounded-2xl p-8 bg-white shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* UPDATED: Glow color changed to purple */}
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.15),transparent_30%)] pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="h-24 w-24 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{feature.title}</h3>
                  <p className="mt-4 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
