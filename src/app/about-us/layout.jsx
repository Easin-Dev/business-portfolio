export const metadata = {
  title: "About Us \u2014 Our Story, Mission & Team",
  description:
    "Learn about ScaleUp Web \u2014 a passionate team of developers, designers, and marketers dedicated to scaling businesses online with cutting-edge digital solutions.",
  keywords: [
    "about ScaleUp Web",
    "digital agency team",
    "our mission",
    "web agency story",
  ],
  alternates: {
    canonical: "https://www.scaleupweb.xyz/about-us",
  },
  openGraph: {
    title: "About ScaleUp Web \u2014 Who We Are",
    description:
      "Meet the team behind ScaleUp Web. We\u2019re a results-driven agency building digital experiences that convert.",
    url: "https://www.scaleupweb.xyz/about-us",
    siteName: "ScaleUp Web",
    type: "website",
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
