const siteUrl = "https://www.scaleupweb.xyz";

const mainPages = [
  { name: "Home", url: siteUrl },
  { name: "Services", url: `${siteUrl}/services` },
  { name: "Pricing", url: `${siteUrl}/pricing` },
  { name: "Portfolio", url: `${siteUrl}/work` },
  { name: "Blog", url: `${siteUrl}/blogs` },
  { name: "About ScaleUp Web", url: `${siteUrl}/about-us` },
  { name: "Contact ScaleUp Web", url: `${siteUrl}/contact` },
];

export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "ScaleUp Web",
        alternateName: ["ScaleUp Web Agency", "Scaleup Web"],
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteUrl}/#organization`,
        name: "ScaleUp Web",
        alternateName: ["ScaleUp Web Agency", "Scaleup Web"],
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/favicon.ico`,
        },
        image: `${siteUrl}/favicon.ico`,
        description:
          "ScaleUp Web is a digital agency offering website development, digital marketing, SEO, and WhatsApp chatbot automation for growing businesses.",
        email: "contact.scaleupweb@gmail.com",
        telephone: "+8801645650504",
        priceRange: "$$",
        foundingDate: "2024",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jhalokathi",
          addressLocality: "Jhalokathi",
          addressRegion: "Barisal",
          addressCountry: "BD",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 23.8103,
          longitude: 90.4125,
        },
        areaServed: [
          { "@type": "Country", name: "Bangladesh" },
          { "@type": "Place", name: "Worldwide" },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+8801645650504",
            email: "contact.scaleupweb@gmail.com",
            contactType: "customer service",
            areaServed: "BD",
            availableLanguage: ["English", "Bengali"],
          },
        ],
        sameAs: [
          "https://www.facebook.com/scaleupweb",
          "https://www.linkedin.com/company/scaleupweb",
          "https://twitter.com/scaleupweb",
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#sitelinks`,
        name: "ScaleUp Web important pages",
        itemListElement: mainPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.name,
          url: page.url,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumbs`,
        itemListElement: mainPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.name,
          item: page.url,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
