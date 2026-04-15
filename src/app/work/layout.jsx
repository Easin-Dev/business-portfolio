export const metadata = {
  title: "Our Work \u2014 Portfolio of Digital Projects & Case Studies",
  description:
    "Explore ScaleUp Web\u2019s portfolio of successful projects \u2014 websites, marketing campaigns, and automation solutions that delivered real business results for our clients.",
  keywords: [
    "portfolio",
    "web development projects",
    "digital marketing case studies",
    "client work",
    "ScaleUp Web projects",
  ],
  alternates: {
    canonical: "https://www.scaleupweb.xyz/work",
  },
  openGraph: {
    title: "Our Work \u2014 ScaleUp Web Portfolio",
    description:
      "Real projects, real results. Explore our portfolio of websites, ads, and chatbot solutions.",
    url: "https://www.scaleupweb.xyz/work",
    siteName: "ScaleUp Web",
    type: "website",
  },
};

export default function WorkLayout({ children }) {
  return <>{children}</>;
}
