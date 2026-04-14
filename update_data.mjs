import fs from 'fs';

let content = fs.readFileSync('src/app/services/page.jsx', 'utf8');

const match = content.match(/const servicesData = \[[\s\S]*?\];/);

if (match) {
  const newServices = `const servicesData = [
  {
    id: 1,
    title: "Website Development",
    description: "Amra protiti website-ke responsive, fast, ebong SEO-friendly kore toiri kori. We craft technical solutions tailored to drive business growth.",
    image: "https://cdn.dribbble.com/userupload/16467705/file/original-fc58292a73b9ea8abf6f37f68d793ea6.mp4",
    features: [
      { title: "Landing Page Design", content: "Marketing campaign-er jonno high-converting single page solutions designed for maximum ROI." },
      { title: "WordPress Website", content: "Personal blog, Corporate site, ba News portal-er jonno best CMS solution." },
      { title: "Shopify & Wix Store", content: "E-commerce business-er jonno ready-to-sell store setup." },
      { title: "E-commerce Custom Website", content: "Personalized shopping experience with custom features." },
      { title: "Full-Stack Web Development", content: "MERN stack ba Next.js diye advanced web applications." },
      { title: "Domain & Hosting Setup", content: "Server configuration, SSL integration, ebong security hardening." }
    ]
  },
  {
    id: 2,
    title: "Digital Marketing",
    description: "Data-driven marketing-er madhyome amra brand-er reach ebong sales briddhi kori.",
    image: "https://cdn.dribbble.com/userupload/10640472/file/original-c81c56245856e105c75424cf9a958366.mp4",
    features: [
      { title: "Meta Ads (Facebook & Instagram)", content: "Target audience research, Creative Ad copies, Retargeting campaigns, ebong Pixel setup." },
      { title: "Google Ads (SEM/PPC)", content: "Google Search, Display, ebong Video ads-er madhyome targeted traffic generate kora." }
    ]
  },
  {
    id: 3,
    title: "WhatsApp Chatbots (Automation)",
    description: "Customer support ebong sales-ke 24/7 active rakhar jonno smart automation.",
    image: "https://cdn.dribbble.com/userupload/45750789/file/9b848a9a9bd01412135ca833731b40ad.mp4",
    features: [
      { title: "Basic FAQ Bot", content: "Sadharon jiggasar uttor deyar jonno responsive menu-based bot." },
      { title: "Advanced AI Chatbot", content: "WhatsApp Business API bebohar kore lead collect, order tracking, ebong live CRM sync." }
    ]
  }
];`;
  content = content.replace(match[0], newServices);
  fs.writeFileSync('src/app/services/page.jsx', content);
  console.log('Successfully updated servicesData');
} else {
  console.log('Failed to match servicesData');
}
