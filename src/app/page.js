"use client";

import FaqSection from "./component/FaqSection";
import FeaturedProjects from "./component/FeaturedProjects";
import Hero_section from "./component/Hero_section";
import PricingSection from "./component/PricingSection";
import StickyScrollSection from "./component/StickyScrollSection";
import TestimonialSection from "./component/TestimonialSection";
import VideoWithSpinningText from "./component/VideoWithSpinningText";
import WhyChooseUs from "./component/WhyChooseUs";

export default function Home() {
  return (
    <main className="bg-[#ffffff]">
      <Hero_section />
      <VideoWithSpinningText />
      <StickyScrollSection />
      <FeaturedProjects />
      <WhyChooseUs />
      <PricingSection />
      <TestimonialSection />
      <FaqSection />
    </main>
  );
}
