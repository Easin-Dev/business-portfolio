import Link from "next/link";
import { ArrowLeft, Clock, Tag, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";

// Same data (later will come from MongoDB)
const allBlogs = [
  {
    id: 1,
    slug: "how-to-rank-on-google-first-page",
    category: "SEO",
    tag: "seo",
    title: "How to Rank on Google's First Page in 2025 — Complete Roadmap",
    excerpt: "Google-এর 1st page-এ rank করতে হলে শুধু keyword দিলেই হয় না। Technical SEO, content authority, এবং backlink strategy সব মিলিয়ে একটা complete roadmap দরকার।",
    thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80",
    author: "Easin Arafat",
    readTime: "8 min read",
    date: "Apr 10, 2025",
    accentColor: "#3b82f6",
    content: `
## Google 1st Page Rank করার সম্পূর্ণ গাইড

২০২৫ সালে Google 1st page-এ rank করা কঠিন, কিন্তু অসম্ভব নয়। সঠিক strategy follow করলে যে কোনো niche-এ organic traffic পাওয়া সম্ভব।

### ১. Technical SEO Foundation

প্রথমে নিশ্চিত করতে হবে আপনার website technically sound কিনা:

- **Page Speed:** Google PageSpeed score 90+ রাখুন
- **Core Web Vitals:** LCP, FID, CLS — সবগুলো green zone এ রাখুন
- **Mobile Friendly:** 60%+ traffic mobile থেকে আসে
- **HTTPS:** SSL certificate mandatory
- **Sitemap & Robots.txt:** সঠিকভাবে configure করুন

### ২. Keyword Research Strategy

Random keyword target করলে কাজ হবে না। Smart approach:

- **Search Intent:** Informational, Navigational, Transactional — কোনটা target করছেন?
- **Long-tail Keywords:** Competition কম, conversion rate বেশি
- **Keyword Difficulty:** নতুন site হলে KD 30 এর নিচে দিয়ে শুরু করুন
- **Tools:** Ahrefs, Semrush, Google Keyword Planner

### ৩. On-Page SEO

প্রতিটি page এর জন্য:

- **Title Tag:** Primary keyword প্রথমে রাখুন (60 character এর মধ্যে)
- **Meta Description:** Compelling copy, 155 character এর মধ্যে
- **H1, H2, H3:** Proper heading hierarchy
- **Image Alt Text:** Descriptive, keyword-rich
- **Internal Linking:** Related content এ link করুন

### ৪. Content Authority

Google এখন E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) এ বেশি focus করে:

- **Long-form Content:** 1,500+ word article rank করে বেশি
- **Original Research:** Data, statistics, case study যোগ করুন
- **Regular Updates:** পুরনো content update করুন
- **Author Credibility:** Author bio এবং social proof

### ৫. Link Building

Backlinks এখনও Google ranking এর সবচেয়ে important factor:

- **Guest Posting:** High authority site এ article লিখুন
- **Resource Page Links:** Useful resources হলে link পাওয়া সহজ
- **Broken Link Building:** Broken link find করে replacement offer করুন
- **Digital PR:** News যোগ্য content তৈরি করুন

এই ৫টি step properly follow করলে ৩-৬ মাসের মধ্যে significant ranking improvement দেখতে পাবেন।
    `,
  },
  {
    id: 2,
    slug: "meta-ads-strategy-2025",
    category: "Digital Marketing",
    tag: "marketing",
    title: "Meta Ads Strategy That Converts — Stop Wasting Your Budget",
    excerpt: "অনেকেই Meta Ads-এ টাকা ঢালেন কিন্তু result পান না। Proper audience targeting, creative testing এবং pixel tracking দিয়ে ROAS 5x করার complete guide।",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80",
    author: "Easin Arafat",
    readTime: "6 min read",
    date: "Apr 5, 2025",
    accentColor: "#6366f1",
    content: `
## Meta Ads দিয়ে High ROAS অর্জনের Strategy

Meta (Facebook + Instagram) Ads এখনও সবচেয়ে cost-effective paid advertising platform। সঠিকভাবে use করলে ROAS 5x-10x পাওয়া সম্ভব।

### ১. Proper Pixel Setup

সবার আগে Meta Pixel সঠিকভাবে setup করুন। Server-Side Tracking (CAPI) যোগ করলে iOS 14 এর পরেও accurate data পাবেন।

### ২. Audience Targeting

- **Cold Audience:** Interest + Behavior targeting
- **Warm Audience:** Website visitors, Video viewers
- **Hot Audience:** Add to cart, Checkout abandons
- **Lookalike:** Existing customers এর মতো users

### ৩. Creative Testing

Week latest per ad set এ minimum 3-4 creative test করুন। যেটা জিতবে সেটা scale করুন।
    `,
  },
  {
    id: 3,
    slug: "nextjs-vs-wordpress-2025",
    category: "Web Dev",
    tag: "webdev",
    title: "Next.js vs WordPress — Which Should Your Business Choose?",
    excerpt: "WordPress simple মনে হলেও performance এবং scalability-তে Next.js অনেক এগিয়ে। কোনটা আপনার business-এর জন্য সঠিক? সঠিক decision নিতে পড়ুন।",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    author: "Easin Arafat",
    readTime: "7 min read",
    date: "Mar 28, 2025",
    accentColor: "#0ea5e9",
    content: `## Next.js vs WordPress Complete Comparison\n\nBoth platforms have their place. The right choice depends on your business needs, budget, and technical team.\n\n### WordPress: Best For\n- Non-technical users who need CMS\n- Blogs and content-heavy sites\n- Quick launch with minimal budget\n\n### Next.js: Best For\n- Performance-critical applications\n- Custom functionality requirements\n- Scalable enterprise solutions\n- SEO-optimized React applications`,
  },
  {
    id: 4,
    slug: "whatsapp-chatbot-for-ecommerce",
    category: "Automation",
    tag: "automation",
    title: "WhatsApp Chatbot দিয়ে E-Commerce Sales 3x বাড়ানোর কৌশল",
    excerpt: "WhatsApp Business API ব্যবহার করে automated order tracking, abandoned cart recovery, এবং 24/7 customer support implement করার step by step guide।",
    thumbnail: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&q=80",
    author: "Easin Arafat",
    readTime: "9 min read",
    date: "Mar 20, 2025",
    accentColor: "#10b981",
    content: `## WhatsApp Chatbot E-Commerce Guide\n\nWhatsApp has 2+ billion active users. For e-commerce in Bangladesh and South Asia, it's the #1 customer communication channel.\n\n### Key Features to Implement\n- Automated order confirmation\n- Live shipping tracking\n- Abandoned cart reminders\n- 24/7 FAQ responses\n- Payment link sharing`,
  },
  {
    id: 5,
    slug: "website-speed-optimization-guide",
    category: "Web Dev",
    tag: "webdev",
    title: "Website Speed Optimization — 100/100 PageSpeed Guide",
    excerpt: "Slow website মানে হারানো customer। Image optimization, lazy loading, CDN setup, এবং Core Web Vitals improve করার complete technical guide।",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    author: "Easin Arafat",
    readTime: "10 min read",
    date: "Mar 12, 2025",
    accentColor: "#f59e0b",
    content: `## Website Speed Optimization Complete Guide\n\nA 1-second delay in page load time can reduce conversions by 7%. Here's how to fix it.\n\n### Image Optimization\n- Convert to WebP format\n- Implement lazy loading\n- Use proper image dimensions\n\n### Code Optimization\n- Minify CSS, JS, HTML\n- Remove unused code\n- Implement code splitting`,
  },
  {
    id: 6,
    slug: "google-ads-keyword-strategy",
    category: "Digital Marketing",
    tag: "marketing",
    title: "Google Ads Keyword Strategy — Winning Keywords Fast",
    excerpt: "Correct keyword selection can make or break your Google Ads campaign. Learn how competitor research, negative keywords, and smart bidding reduces CPA dramatically.",
    thumbnail: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80",
    author: "Easin Arafat",
    readTime: "5 min read",
    date: "Mar 5, 2025",
    accentColor: "#ec4899",
    content: `## Google Ads Keyword Strategy\n\nWinning at Google Ads starts with finding the right keywords at the right price.\n\n### Keyword Match Types\n- Broad Match: Maximum reach, less control\n- Phrase Match: Balanced approach\n- Exact Match: Maximum control, less reach\n\n### Negative Keywords\nAdd irrelevant search terms as negatives to save budget.`,
  },
];

export async function generateStaticParams() {
  return allBlogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const blog = allBlogs.find((b) => b.slug === params.slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: { title: blog.title, description: blog.excerpt, images: [blog.thumbnail] },
  };
}

export default function BlogDetailPage({ params }) {
  const blog = allBlogs.find((b) => b.slug === params.slug);
  if (!blog) notFound();

  const related = allBlogs.filter((b) => b.tag === blog.tag && b.slug !== blog.slug).slice(0, 2);

  return (
    <div className="w-full bg-[#050709] min-h-screen text-white">

      {/* Hero / Thumbnail */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
        <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050709] via-[#050709]/60 to-[#050709]/20" />

        {/* Back button */}
        <Link
          href="/blogs"
          className="absolute top-8 left-6 md:left-10 flex items-center gap-2 text-sm text-white/70 hover:text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 z-10"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Category badge */}
        <div className="absolute bottom-10 left-6 md:left-10 z-10">
          <span
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ background: blog.accentColor + "25", color: blog.accentColor, border: `1px solid ${blog.accentColor}40` }}
          >
            {blog.category}
          </span>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-5 text-neutral-500 text-sm mb-6">
          <span className="flex items-center gap-1.5"><User size={13} /> {blog.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={13} /> {blog.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> {blog.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-8">
          {blog.title}
        </h1>

        {/* Excerpt highlight */}
        <div
          className="border-l-4 pl-5 py-2 mb-10 rounded-r-lg"
          style={{ borderColor: blog.accentColor, background: blog.accentColor + "10" }}
        >
          <p className="text-neutral-300 text-base leading-relaxed italic">{blog.excerpt}</p>
        </div>

        {/* Content — Markdown-style rendered */}
        <div className="prose prose-invert prose-lg max-w-none">
          {blog.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{line.replace("## ", "")}</h2>;
            if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3" style={{ color: blog.accentColor }}>{line.replace("### ", "")}</h3>;
            if (line.startsWith("- **")) {
              const match = line.match(/- \*\*(.+?)\*\*:? ?(.*)/);
              return match ? (
                <li key={i} className="text-neutral-300 text-base leading-relaxed mb-2 flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: blog.accentColor }} />
                  <span><strong className="text-white">{match[1]}:</strong> {match[2]}</span>
                </li>
              ) : null;
            }
            if (line.startsWith("- ")) return <li key={i} className="text-neutral-400 text-base mb-2 flex gap-2 items-start"><span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 bg-neutral-600" />{line.replace("- ", "")}</li>;
            if (line.trim() === "") return <br key={i} />;
            return <p key={i} className="text-neutral-400 text-base leading-loose mb-4">{line}</p>;
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 mt-14 mb-10" />

        {/* Author Card */}
        <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-14 h-14 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 font-bold text-lg flex-shrink-0">
            EA
          </div>
          <div>
            <p className="text-white font-bold">Easin Arafat</p>
            <p className="text-neutral-400 text-sm">Founder & Lead Developer at ScaleUp Web — Expert in web development, digital marketing & automation.</p>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 lg:px-8 pb-24">
          <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((b) => (
              <Link key={b.id} href={`/blogs/${b.slug}`} className="group">
                <div className="overflow-hidden rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-300">
                  <div className="h-40 overflow-hidden">
                    <img src={b.thumbnail} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: b.accentColor }}>{b.category}</span>
                    <h3 className="text-white font-bold mt-2 leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">{b.title}</h3>
                    <p className="text-neutral-500 text-xs mt-2">{b.readTime} · {b.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
