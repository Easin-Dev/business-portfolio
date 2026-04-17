import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";
import { blogsData } from "../../../data/blogsData";

const allBlogs = blogsData;

export async function generateStaticParams() {
  return allBlogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((b) => b.slug === slug);
  if (!blog) return {};
  
  const url = `https://www.scaleupweb.xyz/blogs/${slug}`;
  
  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: url,
      type: "article",
      publishedTime: new Date(blog.date).toISOString(),
      authors: [blog.author],
      images: [
        {
          url: blog.thumbnail,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.thumbnail],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  const related = allBlogs.filter((b) => b.tag === blog.tag && b.slug !== blog.slug).slice(0, 2);

  return (
    <div className="w-full bg-[#050709] min-h-screen text-white">

      {/* Hero / Thumbnail */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
        <Image 
          src={blog.thumbnail} 
          alt={blog.title} 
          fill 
          priority
          className="w-full h-full object-cover" 
        />
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
              <Link key={b.id} href={`/blogs/${b.slug}`} className="group relative block">
                <div className="overflow-hidden rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                  <div className="h-40 relative overflow-hidden">
                    <Image 
                      src={b.thumbnail} 
                      alt={b.title} 
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-5 flex-1 bg-white/5">
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
