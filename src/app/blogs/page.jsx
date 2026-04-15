"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Tag, ArrowRight, Search, TrendingUp, Code2, Megaphone, Bot, BookOpen } from "lucide-react";
import { Spotlight } from "../component/ui/spotlight";

// ── Static Blog Data ──────────────────────────────────────────────────────────
const allBlogs = [
  {
    id: 1,
    slug: "how-to-rank-on-google-first-page",
    category: "SEO",
    tag: "seo",
    title: "How to Rank on Google's First Page in 2025 — Complete Roadmap",
    excerpt:
      "Google-এর 1st page-এ rank করতে হলে শুধু keyword দিলেই হয় না। Technical SEO, content authority, এবং backlink strategy সব মিলিয়ে একটা complete roadmap দরকার।",
    thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    author: "Easin Arafat",
    authorAvatar: "https://i.ibb.co.com/xPS3xYC/scaleup-web-logo.png",
    readTime: "8 min read",
    date: "Apr 10, 2025",
    featured: true,
    accentColor: "#3b82f6",
  },
  {
    id: 2,
    slug: "meta-ads-strategy-2025",
    category: "Digital Marketing",
    tag: "marketing",
    title: "Meta Ads Strategy That Converts — Stop Wasting Your Budget",
    excerpt:
      "অনেকেই Meta Ads-এ টাকা ঢালেন কিন্তু result পান না। এই blog-এ দেখাব কীভাবে proper audience targeting, creative testing এবং pixel tracking দিয়ে ROAS 5x করা যায়।",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    author: "Easin Arafat",
    authorAvatar: "https://i.ibb.co.com/xPS3xYC/scaleup-web-logo.png",
    readTime: "6 min read",
    date: "Apr 5, 2025",
    featured: false,
    accentColor: "#6366f1",
  },
  {
    id: 3,
    slug: "nextjs-vs-wordpress-2025",
    category: "Web Dev",
    tag: "webdev",
    title: "Next.js vs WordPress — Which Should Your Business Choose in 2025?",
    excerpt:
      "WordPress simple মনে হলেও performance এবং scalability-তে Next.js অনেক এগিয়ে। কিন্তু কোনটা আপনার business-এর জন্য সঠিক? সঠিক decision নিতে পড়ুন।",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    author: "Easin Arafat",
    authorAvatar: "https://i.ibb.co.com/xPS3xYC/scaleup-web-logo.png",
    readTime: "7 min read",
    date: "Mar 28, 2025",
    featured: false,
    accentColor: "#0ea5e9",
  },
  {
    id: 4,
    slug: "whatsapp-chatbot-for-ecommerce",
    category: "Automation",
    tag: "automation",
    title: "WhatsApp Chatbot দিয়ে E-Commerce Sales 3x বাড়ানোর গোপন কৌশল",
    excerpt:
      "WhatsApp Business API ব্যবহার করে কীভাবে automated order tracking, abandoned cart recovery, এবং 24/7 customer support implement করবেন — step by step guide।",
    thumbnail: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
    author: "Easin Arafat",
    authorAvatar: "https://i.ibb.co.com/xPS3xYC/scaleup-web-logo.png",
    readTime: "9 min read",
    date: "Mar 20, 2025",
    featured: false,
    accentColor: "#10b981",
  },
  {
    id: 5,
    slug: "website-speed-optimization-guide",
    category: "Web Dev",
    tag: "webdev",
    title: "Website Speed Optimization — How to Get 100/100 on PageSpeed",
    excerpt:
      "Slow website মানে হারানো customer। Image optimization, lazy loading, CDN setup, এবং Core Web Vitals improve করার complete technical guide — beginners থেকে experts সবার জন্য।",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    author: "Easin Arafat",
    authorAvatar: "https://i.ibb.co.com/xPS3xYC/scaleup-web-logo.png",
    readTime: "10 min read",
    date: "Mar 12, 2025",
    featured: false,
    accentColor: "#f59e0b",
  },
  {
    id: 6,
    slug: "google-ads-keyword-strategy",
    category: "Digital Marketing",
    tag: "marketing",
    title: "Google Ads Keyword Strategy — How to Find Winning Keywords Fast",
    excerpt:
      "Google Ads-এ সঠিক keyword বাছাই না করলে বাজেট নষ্ট হবে। এই guide-এ দেখাব কীভাবে competitor research, negative keywords, এবং smart bidding দিয়ে CPA কমানো যায়।",
    thumbnail: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
    author: "Easin Arafat",
    authorAvatar: "https://i.ibb.co.com/xPS3xYC/scaleup-web-logo.png",
    readTime: "5 min read",
    date: "Mar 5, 2025",
    featured: false,
    accentColor: "#ec4899",
  },
];

const categories = [
  { label: "All Posts", value: "all", icon: <BookOpen size={14} /> },
  { label: "SEO", value: "seo", icon: <TrendingUp size={14} /> },
  { label: "Web Dev", value: "webdev", icon: <Code2 size={14} /> },
  { label: "Marketing", value: "marketing", icon: <Megaphone size={14} /> },
  { label: "Automation", value: "automation", icon: <Bot size={14} /> },
];

// ── Blog Card Component ───────────────────────────────────────────────────────
function BlogCard({ blog, index, featured = false }) {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="md:col-span-2 group relative"
      >
        <Link href={`/blogs/${blog.slug}`}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f1015] hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)]">
            {/* Thumbnail */}
            <div className="relative h-[320px] md:h-[420px] overflow-hidden">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />
              {/* Featured badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest">
                <TrendingUp size={11} /> Featured
              </div>
              {/* Category badge */}
              <div
                className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
                style={{ background: blog.accentColor + "30", color: blog.accentColor, border: `1px solid ${blog.accentColor}40` }}
              >
                {blog.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 text-neutral-500 text-xs mb-4">
                <span className="flex items-center gap-1.5"><Clock size={12} /> {blog.readTime}</span>
                <span>{blog.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-blue-300 transition-colors duration-300">
                {blog.title}
              </h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed line-clamp-2 mb-6">
                {blog.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                Read Article <ArrowRight size={15} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <Link href={`/blogs/${blog.slug}`}>
        <div className="relative h-full flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0f1015] hover:border-white/20 transition-all duration-400 hover:shadow-[0_0_40px_rgba(255,255,255,0.04)]">
          {/* Thumbnail */}
          <div className="relative h-[200px] overflow-hidden flex-shrink-0">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015] via-transparent to-transparent" />
            {/* Category */}
            <div
              className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: blog.accentColor + "25", color: blog.accentColor, border: `1px solid ${blog.accentColor}35` }}
            >
              {blog.category}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-5">
            <div className="flex items-center gap-3 text-neutral-600 text-xs mb-3">
              <span className="flex items-center gap-1"><Clock size={11} /> {blog.readTime}</span>
              <span>{blog.date}</span>
            </div>
            <h3 className="text-base font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300 flex-grow">
              {blog.title}
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4">
              {blog.excerpt}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-300" style={{ color: blog.accentColor }}>
              Read More <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredBlog = allBlogs.find((b) => b.featured);
  const filtered = allBlogs.filter((b) => {
    const matchCat = activeCategory === "all" || b.tag === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const nonFeatured = filtered.filter((b) => !b.featured);
  const showFeatured = filtered.find((b) => b.featured);

  return (
    <div className="w-full bg-[#050709] min-h-screen text-white">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-indigo-500/8 rounded-full blur-[100px] pointer-events-none" />

        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="hsl(220, 80%, 60%)" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </div>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            <BookOpen size={12} /> Insights & Guides
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
          >
            The ScaleUp{" "}
            <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
              Blog
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
          >
            Expert insights on web development, digital marketing, SEO, and automation — to help your business grow faster online.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-md mx-auto"
          >
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all duration-300"
            />
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.value
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                  : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/8"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-neutral-500 text-lg">No articles found. Try a different search.</p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Featured post row */}
            {showFeatured && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BlogCard blog={showFeatured} featured={true} index={0} />
              </div>
            )}

            {/* Regular grid */}
            {nonFeatured.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nonFeatured.map((blog, i) => (
                  <BlogCard key={blog.id} blog={blog} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-30" />
            <div className="relative border border-white/10 bg-[#0f1015] rounded-3xl px-8 py-10 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Want to Scale Your Business?
              </h2>
              <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
                আমাদের expert team আপনার business-কে digitally scale করতে ready। আজই একটি free consultation নিন।
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all duration-300"
              >
                Get Free Consultation <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}