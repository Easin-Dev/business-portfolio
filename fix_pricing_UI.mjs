import fs from 'fs';

let content = fs.readFileSync('src/app/pricing/page.jsx', 'utf8');

// The new detailed pricing data
const newPricingData = `const pricingData = {
  International: {
    "Web Dev": [
      {
        plan: "Landing Page",
        price: "$100",
        description: "High-converting single page for marketing campaigns.",
        features: ["Custom Design Layout", "Mobile Responsive", "Lead Capture Form", "Fast Loading < 2s"],
        isHighlighted: false,
      },
      {
        plan: "WordPress / Shopify",
        price: "$500 - $1,200",
        description: "Best for Personal blogs, Corporate sites, or E-commerce stores.",
        features: ["Everything in Landing Page", "Full Store Setup & Theme Design", "Payment Gateway Integration", "Advanced SEO Optimization", "Admin Dashboard & Control", "1 Month Free Maintenance", "Google Analytics Setup", "Premium Security Plugins"],
        isHighlighted: true,
      },
      {
        plan: "Custom Full-Stack",
        price: "$1,000+",
        description: "MERN or Next.js advanced web applications.",
        features: ["Bespoke Architecture", "Custom API Integrations", "Advanced Security", "Scalable Performance", "Dedicated Cloud Hosting"],
        isHighlighted: false,
      },
    ],
    "Marketing": [
      {
        plan: "Meta / Google Ads",
        price: "$200 / Month",
        description: "Data-driven marketing to maximize ROI.",
        features: ["Target Audience Research", "Creative Ad Copies & Banners", "Advanced Retargeting Campaigns", "Pixel & Server-Side Tracking", "Google Search & Video Ads", "A/B Testing Creatives", "Weekly Growth Reports", "Dedicated Account Manager"],
        isHighlighted: true,
      }
    ],
    "Chatbot": [
      {
        plan: "WhatsApp Automation",
        price: "$200 - $400",
        description: "24/7 smart automation for customer support & sales.",
        features: ["Interactive FAQ Bot Menu", "Official Business API Access", "Real-Time Lead Collection", "Automated Order Tracking", "Live CRM Database Syncing", "Abandoned Cart Recovery", "Secure Payment Links", "Mass Broadcasting Tools"],
        isHighlighted: true,
      }
    ]
  },
  Bangladesh: {
    "Web Dev": [
      {
        plan: "Landing Page",
        price: "৳ 5,000 - ৳ 7k",
        description: "High-converting single page for marketing campaigns.",
        features: ["Custom Design Layout", "Mobile Responsive", "Lead Capture Form", "Fast Loading < 2s"],
        isHighlighted: false,
      },
      {
        plan: "WordPress / Shopify",
        price: "৳ 15k - ৳ 20k",
        description: "Best for Personal blogs, Corporate sites, or E-commerce stores.",
        features: ["Everything in Landing Page", "Full Store Setup & Theme Design", "Payment Gateway (bKash/SSL)", "Advanced SEO Optimization", "Admin Dashboard & Control", "1 Month Free Maintenance", "Google Analytics Setup", "Premium Security Plugins"],
        isHighlighted: true,
      },
      {
        plan: "Custom Full-Stack",
        price: "৳ 30,000+",
        description: "MERN or Next.js advanced web applications.",
        features: ["Bespoke Architecture", "Custom API Integrations", "Advanced Security", "Scalable Performance", "Dedicated Cloud Hosting"],
        isHighlighted: false,
      },
    ],
    "Marketing": [
      {
        plan: "Meta / Google Ads",
        price: "৳ 2,000 / week",
        description: "Data-driven marketing to maximize ROI.",
        features: ["Target Audience Research", "Creative Ad Copies & Banners", "Advanced Retargeting Campaigns", "Pixel & Server-Side Tracking", "Google Search & Video Ads", "A/B Testing Creatives", "Weekly Growth Reports", "Dedicated Account Manager"],
        isHighlighted: true,
      }
    ],
    "Chatbot": [
      {
        plan: "WhatsApp Automation",
        price: "৳ 4,000 - ৳ 8,000",
        description: "24/7 smart automation for customer support & sales.",
        features: ["Interactive FAQ Bot Menu", "Official Business API Access", "Real-Time Lead Collection", "Automated Order Tracking", "Live CRM Database Syncing", "Abandoned Cart Recovery", "Secure Payment Links", "Mass Broadcasting Tools"],
        isHighlighted: true,
      }
    ]
  }
};`;

const pricingRegex = /const pricingData = \{[\s\S]*?\};\s*(?=const agencyBundles)/;
content = content.replace(pricingRegex, newPricingData + "\\n\\n");

// Now let's fix the `<PricingCard>` price row using Regex replace.
// We want to replace:
// <h3 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex justify-center items-end gap-1">
//   {plan.price.replace(' / Month', '').replace(' / week', '')}
// </h3>
const oldPriceHeaderRegex = /<h3 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex justify-center items-end gap-1">[\s\S]*?<\/h3>/m;

const newPriceHeader = `const cleanPrice = plan.price.replace(' / Month', '').replace(' / week', '');
        const isLongText = cleanPrice.length > 7;
        return (
          <h3 className={\`\${isLongText ? 'text-3xl lg:text-4xl' : 'text-5xl'} font-extrabold text-white tracking-tight flex flex-wrap justify-center items-end gap-1\`}>
             <span className="truncate">{cleanPrice}</span>
             {!plan.price.includes('Month') && !plan.price.includes('week') && (
                 <span className="text-lg text-neutral-500 font-medium mb-1 shrink-0">/proj</span>
             )}
          </h3>
        );
      })()}`; // Using an IIFE to keep it inline

content = content.replace(oldPriceHeaderRegex, `{(() => {
        ${newPriceHeader}`);

// Let's also make the Description text a bit bigger per request:
content = content.replace(/className="text-neutral-400 text-sm font-medium leading-relaxed mb-8 h-12 pr-4 text-left"/g, 
  'className="text-neutral-400 text-[15px] font-medium leading-relaxed mb-8 h-12 pr-4 text-left"');

fs.writeFileSync('src/app/pricing/page.jsx', content);
