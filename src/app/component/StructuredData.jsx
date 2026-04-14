/**
 * StructuredData Component
 * Injects JSON-LD schema for Google Sitelinks, Organization & WebSite
 * Helps Google understand site structure faster → Sitelinks appear in search
 */
export default function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ScaleUp Web",
    alternateName: "ScaleUp Web Agency",
    url: "https://scaleupweb.xyz",
    description:
      "ScaleUp Web is a premium digital agency specializing in high-converting website development, ROI-focused digital marketing, and smart WhatsApp chatbot automation.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://scaleupweb.xyz/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ScaleUp Web",
    url: "https://scaleupweb.xyz",
    logo: "https://scaleupweb.xyz/logo.png",
    description:
      "Premium digital agency offering web development, digital marketing, and WhatsApp chatbot automation services.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Bengali"],
    },
    sameAs: [
      "https://www.facebook.com/scaleupweb",
      "https://www.linkedin.com/company/scaleupweb",
      "https://twitter.com/scaleupweb",
    ],
  };

  // Sitelinks Navigation Schema — tells Google about all important pages
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ScaleUp Web Main Navigation",
    itemListElement: [
      {
        "@type": "SiteLinksSearchBox",
        target: "https://scaleupweb.xyz",
      },
      {
        "@type": "ListItem",
        position: 1,
        name: "Services",
        description:
          "Explore our expert digital services including Website Development, Digital Marketing & WhatsApp Chatbot Automation.",
        url: "https://scaleupweb.xyz/services",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Work",
        description:
          "Portfolio of successful projects — websites, marketing campaigns, and automation solutions.",
        url: "https://scaleupweb.xyz/work",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pricing",
        description:
          "Transparent, flexible pricing plans for web development, digital marketing, and chatbot services.",
        url: "https://scaleupweb.xyz/pricing",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "About Us",
        description:
          "Learn about ScaleUp Web — our story, mission, and the passionate team behind your digital success.",
        url: "https://scaleupweb.xyz/about-us",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Blog",
        description:
          "Expert insights on web development, digital marketing, and business growth strategies.",
        url: "https://scaleupweb.xyz/blogs",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Contact Us",
        description:
          "Get in touch with ScaleUp Web for a free consultation on your digital project.",
        url: "https://scaleupweb.xyz/contact",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavigationSchema),
        }}
      />
    </>
  );
}
