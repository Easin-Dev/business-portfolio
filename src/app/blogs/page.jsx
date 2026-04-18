"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Search, TrendingUp, Code2, Megaphone, Bot, BookOpen } from "lucide-react";
import { Spotlight } from "../component/ui/spotlight";
import { blogsData } from "../../data/blogsData";
import PageHero from "../component/PageHero";

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
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                priority
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
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
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
  const [allBlogs, setAllBlogs] = useState(blogsData);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setAllBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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

      <PageHero 
        breadcrumb="Blog"
        title="The ScaleUp"
        highlight="Blog"
        subtitle="Expert insights on web development, digital marketing, SEO, and automation — to help your business grow faster online."
      />

      {/* ── SEARCH BAR ─────────────────────────────────────── */}
      <div className="relative z-30 -mt-10 mb-16 px-4">
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
              className="w-full pl-11 pr-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all duration-300 shadow-2xl backdrop-blur-xl"
            />
          </motion.div>
      </div>

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