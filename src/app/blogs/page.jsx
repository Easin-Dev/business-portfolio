"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Search, Mail, Sparkles, Send, CheckCircle2, TrendingUp } from "lucide-react";
import PageHero from "../component/PageHero";

function BlogCard({ blog, index, featured = false }) {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="group relative md:col-span-3 mb-10"
      >
        <Link href={`/blogs/${blog.slug}`}>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0f1015] transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_80px_rgba(59,130,246,0.15)] flex flex-col lg:flex-row min-h-[450px]">
            <div className="relative w-full lg:w-[55%] h-[300px] lg:h-auto overflow-hidden">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f1015] via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015] via-transparent to-transparent lg:hidden" />
              
              <div className="absolute left-6 top-6 flex gap-3">
                <div className="rounded-full bg-blue-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-500/20">
                  Featured
                </div>
                <div className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                  {blog.category}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6 flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-blue-500" /> {blog.readTime}
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <span>{blog.date}</span>
              </div>

              <h2 className="mb-6 text-3xl md:text-5xl font-black leading-[1.1] text-white transition-colors duration-300 group-hover:text-blue-400">
                {blog.title}
              </h2>

              <p className="mb-8 line-clamp-3 text-lg leading-relaxed text-neutral-400">
                {blog.excerpt}
              </p>

              <div className="mt-auto">
                <span className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-blue-400 transition-all duration-300 group-hover:gap-5">
                  Explore Article <ArrowRight size={18} />
                </span>
              </div>
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
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/blogs/${blog.slug}`}>
        <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-white/5 bg-[#0f1015]/50 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-2">
          <div className="relative h-[240px] overflow-hidden">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015] via-transparent to-transparent opacity-60" />
            <div className="absolute left-5 top-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-white">
              {blog.category}
            </div>
          </div>

          <div className="flex flex-grow flex-col p-6 lg:p-8">
            <div className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-blue-500" /> {blog.readTime}
              </span>
              <span className="w-1 h-1 rounded-full bg-neutral-800" />
              <span>{blog.date}</span>
            </div>

            <h3 className="mb-4 flex-grow line-clamp-2 text-xl font-black leading-tight text-white transition-colors duration-300 group-hover:text-blue-400">
              {blog.title}
            </h3>

            <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-neutral-500 font-medium">
              {blog.excerpt}
            </p>

            <span
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 group-hover:gap-4 text-blue-500"
            >
              Read More <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative mt-24 overflow-hidden rounded-[40px] bg-blue-600 p-8 md:p-16 text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-xl">
            <Mail className="text-white" size={32} />
          </div>
        </div>
        
        <h2 className="mb-4 text-3xl md:text-5xl font-black tracking-tight text-white">
          Join 5,000+ Subscribers
        </h2>
        <p className="mb-10 text-lg md:text-xl font-medium text-blue-100/80">
          Get weekly expert insights on scaling your digital business, website optimizations, and marketing trends delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubscribe} className="relative mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
          <div className="relative flex-grow">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-2xl border-none bg-white py-5 pl-14 pr-5 text-black placeholder:text-neutral-400 focus:ring-4 focus:ring-white/20 outline-none transition-all font-bold"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`flex items-center justify-center gap-2 rounded-2xl px-8 py-5 font-black uppercase tracking-widest text-white transition-all duration-300 ${
              status === "success" 
              ? "bg-emerald-500 shadow-lg shadow-emerald-500/40" 
              : "bg-black hover:bg-neutral-900 shadow-xl shadow-black/20 hover:scale-105 active:scale-95"
            }`}
          >
            {status === "loading" ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : status === "success" ? (
              <>Subscribed <CheckCircle2 size={18} /></>
            ) : (
              <>Subscribe <Send size={18} /></>
            )}
          </button>
        </form>
        
        {status === "error" && (
          <p className="mt-4 text-sm font-bold text-red-200">Something went wrong. Please try again.</p>
        )}
        
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-[11px] font-black uppercase tracking-widest text-blue-100/50">
          <div className="flex items-center gap-2"><Sparkles size={14} /> New Article Every Week</div>
          <div className="flex items-center gap-2"><TrendingUp size={14} /> Growth Strategies</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={14} /> No Spam, Ever</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogsPage() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs", { cache: "no-store" });
        const data = await res.json();
        setAllBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setAllBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = [
    { label: "All Posts", value: "all" },
    ...allBlogs
      .map((blog) => ({
        label: blog.category,
        value: blog.tag || blog.category.toLowerCase(),
      }))
      .filter(
        (category, index, array) =>
          array.findIndex((item) => item.value === category.value) === index
      ),
  ];

  const filtered = allBlogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "all" ||
      (blog.tag || blog.category.toLowerCase()) === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredPost = filtered.find((blog) => blog.featured) || filtered[0];
  const remainingPosts = filtered.filter((blog) => blog._id !== featuredPost?._id);

  return (
    <div className="min-h-screen w-full bg-[#050709] text-white selection:bg-blue-500/30">
      <PageHero
        breadcrumb="Blog & Insights"
        title="Fuel Your Digital"
        highlight="Growth"
        subtitle="Expert insights on high-performance web development, SEO strategies, and automated systems designed to scale your business."
      />

      <div className="relative z-30 -mt-12 mb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mx-auto max-w-xl"
        >
          <div className="relative group">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-blue-500"
            />
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-[24px] border border-white/10 bg-[#0f1015]/80 py-5 pl-14 pr-6 text-base text-white placeholder:text-neutral-500 shadow-2xl backdrop-blur-2xl transition-all duration-300 focus:border-blue-500/60 focus:bg-[#0f1015] focus:outline-none focus:ring-4 focus:ring-blue-500/5"
            />
          </div>
        </motion.div>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-32 lg:px-8">
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16 flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === category.value
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/30"
                    : "border border-white/10 bg-white/5 text-neutral-500 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="space-y-12">
            <div className="h-[450px] animate-pulse rounded-[40px] bg-white/5 border border-white/5" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] animate-pulse rounded-[32px] bg-white/5 border border-white/5" />
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center">
            <Sparkles className="mx-auto mb-6 text-neutral-700" size={48} />
            <h3 className="text-2xl font-bold text-neutral-400">No articles match your search</h3>
            <button onClick={() => {setSearchQuery(""); setActiveCategory("all");}} className="mt-6 text-blue-500 font-bold hover:underline underline-offset-4">Reset filters</button>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {featuredPost && (
              <BlogCard blog={featuredPost} featured={true} index={0} />
            )}

            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((blog, index) => (
                  <BlogCard key={blog._id || blog.slug} blog={blog} index={index} />
                ))}
              </div>
            )}
          </div>
        )}

        <NewsletterSection />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 text-center"
        >
          <div className="relative inline-block group">
            <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-r from-blue-600 to-purple-600 blur opacity-25 group-hover:opacity-40 transition-opacity" />
            <div className="relative max-w-4xl rounded-[40px] border border-white/10 bg-[#0f1015] px-8 py-16 md:px-20">
              <h2 className="mb-6 text-4xl md:text-6xl font-black leading-tight text-white tracking-tighter">
                Ready to take your<br />business to the <span className="text-blue-500 italic">next level?</span>
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg font-medium leading-relaxed text-neutral-500">
                Stop guessing and start growing. Our team built systems for companies that actually want to scale.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-sm font-black uppercase tracking-widest text-black transition-all duration-500 hover:bg-blue-500 hover:text-white hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:-translate-y-1"
              >
                Start a Conversation <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
