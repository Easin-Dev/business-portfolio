import { getFeaturedProjects } from "@/lib/projects";
import FaqSection from "./component/FaqSection";
import FeaturedProjects from "./component/FeaturedProjects";
import Hero_section from "./component/Hero_section";
import PricingSection from "./component/PricingSection";
import StickyScrollSection from "./component/StickyScrollSection";
import TestimonialSection from "./component/TestimonialSection";
import VideoWithSpinningText from "./component/VideoWithSpinningText";
import WhyChooseUs from "./component/WhyChooseUs";

export const metadata = {
  title: "ScaleUp Web | Premier Digital Agency in Bangladesh",
  description: "Empowering Bangladesh's digital future. We provide high-performance web development, SEO, and automated systems to scale your local business globally.",
  openGraph: {
    title: "ScaleUp Web | Premier Digital Agency",
    description: "Transforming offline businesses into online powerhouses with affordable, premium digital solutions.",
    url: "https://www.scaleupweb.xyz",
    siteName: "ScaleUp Web",
    images: [
      {
        url: "/og-image.png", // Make sure this exists or user adds it
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <main className="bg-[#ffffff]">
      <Hero_section />
      <VideoWithSpinningText />
      <StickyScrollSection initialProjects={featuredProjects} />
      <FeaturedProjects />
      <WhyChooseUs />
      <PricingSection />
      <TestimonialSection />
      <FaqSection />
    </main>
  );
}
