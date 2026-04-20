"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Search } from "lucide-react";
import PageHero from "../component/PageHero";

function BlogCard({ blog, index, featured = false }) {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="group relative md:col-span-2"
      >
        <Link href={`/blogs/${blog.slug}`}>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0f1015] transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)]">
            <div className="relative h-[320px] overflow-hidden md:h-[420px]">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />

              <div className="absolute left-5 top-5 rounded-full bg-blue-600/90 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                Featured
              </div>

              <div
                className="absolute right-5 top-5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
                style={{
                  background: `${blog.accentColor}30`,
                  color: blog.accentColor,
                  border: `1px solid ${blog.accentColor}40`,
                }}
              >
                {blog.category}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-4 flex items-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> {blog.readTime}
                </span>
                <span>{blog.date}</span>
              </div>

              <h2 className="mb-3 text-2xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-blue-300 md:text-3xl">
                {blog.title}
              </h2>

              <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-neutral-400 md:text-base">
                {blog.excerpt}
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-all duration-300 group-hover:gap-3">
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
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0f1015] transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.04)]">
          <div className="relative h-[200px] overflow-hidden">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015] via-transparent to-transparent" />

            <div
              className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-widest"
              style={{
                background: `${blog.accentColor}25`,
                color: blog.accentColor,
                border: `1px solid ${blog.accentColor}35`,
              }}
            >
              {blog.category}
            </div>
          </div>

          <div className="flex flex-grow flex-col p-5">
            <div className="mb-3 flex items-center gap-3 text-xs text-neutral-600">
              <span className="flex items-center gap-1">
                <Clock size={11} /> {blog.readTime}
              </span>
              <span>{blog.date}</span>
            </div>

            <h3 className="mb-2 flex-grow line-clamp-2 text-base font-bold leading-snug text-white transition-colors duration-300 group-hover:text-blue-300">
              {blog.title}
            </h3>

            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-neutral-500">
              {blog.excerpt}
            </p>

            <span
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
              style={{ color: blog.accentColor }}
            >
              Read More <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
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

  const showFeatured = filtered.find((blog) => blog.featured);
  const nonFeatured = filtered.filter((blog) => blog._id !== showFeatured?._id);

  return (
    <div className="min-h-screen w-full bg-[#050709] text-white">
      <PageHero
        breadcrumb="Blog"
        title="The ScaleUp"
        highlight="Blog"
        subtitle="Expert insights on web development, digital marketing, SEO, and automation to help your business grow faster online."
      />

      <div className="relative z-30 -mt-10 mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mx-auto max-w-md"
        >
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-full border border-white/10 bg-white/5 py-3.5 pl-11 pr-5 text-sm text-white placeholder:text-neutral-500 shadow-2xl backdrop-blur-xl transition-all duration-300 focus:border-blue-500/60 focus:bg-white/8 focus:outline-none"
          />
        </motion.div>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-14 flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category.value
                    ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                    : "border border-white/8 bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[360px] animate-pulse rounded-3xl border border-white/8 bg-white/5"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
            <p className="text-lg text-neutral-500">
              {allBlogs.length === 0
                ? "No published blogs yet."
                : "No articles found. Try a different search."}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {showFeatured && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <BlogCard blog={showFeatured} featured={true} index={0} />
              </div>
            )}

            {nonFeatured.length > 0 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {nonFeatured.map((blog, index) => (
                  <BlogCard key={blog._id || blog.slug} blog={blog} index={index} />
                ))}
              </div>
            )}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 blur opacity-30" />
            <div className="relative max-w-2xl rounded-3xl border border-white/10 bg-[#0f1015] px-8 py-10">
              <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                Want to Scale Your Business?
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-neutral-400">
                Our team helps businesses grow with websites, SEO, paid marketing, and automation that actually convert.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]"
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
