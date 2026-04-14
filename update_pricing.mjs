import fs from 'fs';

let content = fs.readFileSync('src/app/pricing/page.jsx', 'utf8');

// The replacement code that includes everything up to the PricingPage component start.
const replacementData = `// Pricing ডেটা (UPDATED WITH DUAL MARKET)
const pricingData = {
  International: {
    "Web Dev": [
      {
        plan: "Landing Page",
        price: "$100",
        description: "High-converting single page for marketing campaigns.",
        features: ["Custom Design", "Mobile Responsive", "Lead Capture Form", "Fast Loading"],
        isHighlighted: false,
      },
      {
        plan: "WordPress/Wix/Shopify",
        price: "$500 - $1,200",
        description: "Best for Personal blogs, Corporate sites, or E-commerce stores.",
        features: ["Store Setup", "Payment Gateway Integration", "SEO Optimized", "Admin Dashboard"],
        isHighlighted: true,
      },
      {
        plan: "Full-Stack / Custom E-com",
        price: "$1,000+",
        description: "MERN or Next.js advanced web applications.",
        features: ["Bespoke Architecture", "Custom API Integrations", "Advanced Security", "Scalable Performance"],
        isHighlighted: false,
      },
    ],
    "Marketing": [
      {
        plan: "Meta/Google Ads",
        price: "$200 / Month",
        description: "Data-driven marketing to maximize ROI.",
        features: ["Target Audience Research", "Creative Ad Copies", "Retargeting Campaigns", "Pixel Setup", "Video Ads"],
        isHighlighted: true,
      }
    ],
    "Chatbot": [
      {
        plan: "WhatsApp Automation",
        price: "$200 - $400",
        description: "24/7 smart automation for customer support & sales.",
        features: ["Basic FAQ Bot", "WhatsApp Business API", "Lead Collection", "Order Tracking", "CRM Sync"],
        isHighlighted: true,
      }
    ]
  },
  Bangladesh: {
    "Web Dev": [
      {
        plan: "Landing Page",
        price: "৳ 5,000 - ৳ 7,000",
        description: "High-converting single page for marketing campaigns.",
        features: ["Custom Design", "Mobile Responsive", "Lead Capture Form", "Fast Loading"],
        isHighlighted: false,
      },
      {
        plan: "WordPress/Wix/Shopify",
        price: "৳ 15,000 - ৳ 20,000",
        description: "Best for Personal blogs, Corporate sites, or E-commerce stores.",
        features: ["Store Setup", "Payment Gateway Integration", "SEO Optimized", "Admin Dashboard"],
        isHighlighted: true,
      },
      {
        plan: "Full-Stack / Custom E-com",
        price: "৳ 30,000 - ৳ 50,000",
        description: "MERN or Next.js advanced web applications.",
        features: ["Bespoke Architecture", "Custom API Integrations", "Advanced Security", "Scalable Performance"],
        isHighlighted: false,
      },
    ],
    "Marketing": [
      {
        plan: "Meta/Google Ads",
        price: "৳ 2,000 - ৳ 3,000 / week",
        description: "Data-driven marketing to maximize ROI.",
        features: ["Target Audience Research", "Creative Ad Copies", "Retargeting Campaigns", "Pixel Setup", "Video Ads"],
        isHighlighted: true,
      }
    ],
    "Chatbot": [
      {
        plan: "WhatsApp Automation",
        price: "৳ 1,000 - ৳ 2,000",
        description: "24/7 smart automation for customer support & sales.",
        features: ["Basic FAQ Bot", "WhatsApp Business API", "Lead Collection", "Order Tracking", "CRM Sync"],
        isHighlighted: true,
      }
    ]
  }
};

const agencyBundles = [
  {
    title: "Startup Kickstart",
    description: "Perfect for quick launches.",
    features: ["Landing Page Development", "Meta Ads Setup", "Basic FAQ Chatbot"],
    icon: "🚀"
  },
  {
    title: "E-commerce Pro",
    description: "Ready-to-sell machine.",
    features: ["Shopify Store Setup", "Google Ads Management", "WhatsApp Order Bot"],
    icon: "🛍️"
  },
  {
    title: "Enterprise Digital",
    description: "The ultimate 360 solution.",
    features: ["Full-Stack Web App", "360 Degree Marketing", "Advanced API Bot"],
    icon: "👑"
  }
];

const categoryTabs = ["Web Dev", "Marketing", "Chatbot"];`;

// We use string replacement to inject the new data block.
const oldDataStart = content.indexOf('// Pricing ডেটা');
const mainCatIndex = content.indexOf('const mainCategories');
if (oldDataStart !== -1 && mainCatIndex !== -1) {
  const afterOldData = content.substring(content.indexOf('// FAQ ডেটা', mainCatIndex));
  content = content.substring(0, oldDataStart) + replacementData + "\n\n" + afterOldData;
}

// Next we update PricingPage component.
const pricingPageMatch = content.match(/export default function PricingPage\(\) \{[\s\S]*?\n\n/);

if(pricingPageMatch) {
  const newPricingPage = \`export default function PricingPage() {
  const [market, setMarket] = useState("International");
  const [activeCategory, setActiveCategory] = useState("Web Dev");
  
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if(data.country_code === 'BD') {
          setMarket("Bangladesh");
        } else {
          setMarket("International");
        }
      })
      .catch(err => console.error('IP fetch error:', err));
  }, []);

  const plans = pricingData[market][activeCategory] || [];\n\n\`;
  content = content.replace(pricingPageMatch[0], newPricingPage);
}

// Replace the old toggles with the new Market and Category toggles.
content = content.replace(
  /\{mainCategories\.map\(\(category\) => \([\s\S]*?<\/button>\s*\)\)\}/,
  \`{['International', 'Bangladesh'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMarket(m)}
                  className={\\\`px-6 py-2 text-sm rounded-full transition-all duration-300 border \\\${
                    market === m
                      ? "bg-purple-600 border-purple-500 text-white font-semibold shadow-lg shadow-purple-500/30"
                      : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                  }\\\`}
                >
                  {m === 'International' ? '🌍 International (USD)' : '🇧🇩 Bangladesh (BDT)'}
                </button>
              ))}\`
);

content = content.replace(
  /\{activeMainCat === "Website" && \([\s\S]*?<\/AnimatePresence>/,
  \`<AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap justify-center gap-2 lg:gap-3 w-full"
              >
                {categoryTabs.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={\\\`px-4 py-2 text-sm rounded-md transition-colors duration-300 \\\${
                      activeCategory === cat
                        ? "bg-blue-600 text-white font-semibold"
                        : "bg-white/10 text-neutral-300 hover:bg-white/20"
                    }\\\`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>\`
);

// We must also update the bonus package specifically or inject bundles.
// Find the <div className="w-full max-w-6xl mx-auto mt-24"> containing bonus package and replace it.
const bonusStart = content.indexOf('<div className="w-full max-w-6xl mx-auto mt-24">');
if(bonusStart !== -1) {
  const endingDiv = content.indexOf('</div>', content.indexOf('</div>', content.indexOf('</div>', content.indexOf('</div>', bonusStart) + 1) + 1) + 1); // rough approach, let's use regex instead
}

const bonusRegex = /<div className="w-full max-w-6xl mx-auto mt-24">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;
const newBundles = \`{/* Special Agency Bundles */}
          <div className="w-full max-w-7xl mx-auto mt-32 text-center">
            <h2 className="text-3xl font-bold text-white mb-10">Special Agency <span className="text-blue-500">Bundles</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agencyBundles.map((bundle, idx) => (
                <div key={idx} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl flex flex-col items-center hover:border-purple-500/50 transition-colors">
                  <div className="text-5xl mb-4">{bundle.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{bundle.title}</h3>
                  <p className="text-neutral-400 mb-6">{bundle.description}</p>
                  <ul className="text-left space-y-3 mb-8 w-full">
                    {bundle.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-neutral-300">
                        <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className="mt-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 w-full text-center">Get Started</a>
                </div>
              ))}
            </div>
            
            {/* Pro-Tips Note */}
            <div className="mt-16 bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl max-w-4xl mx-auto text-left flex gap-4 items-start">
              <Bot className="text-blue-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h4 className="text-blue-400 font-bold text-lg mb-1">ScaleUp Web Pro-Tips:</h4>
                <ul className="text-neutral-300 space-y-2 list-disc list-inside">
                  <li><strong>Ad Spend:</strong> Marketing management fees do not include actual "Ad Spend". The client provides the ad budget directly to Google/Meta.</li>
                  <li><strong>Maintenance:</strong> All Website Development projects include <strong>3 Months of Free Maintenance</strong> after launch to ensure total trustworthiness.</li>
                </ul>
              </div>
            </div>
          </div>\`;

content = content.replace(bonusRegex, newBundles);

fs.writeFileSync('src/app/pricing/page.jsx', content);
console.log('Successfully updated pricing page');
