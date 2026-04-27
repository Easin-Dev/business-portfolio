import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

function renderListItemContent(line, accentColor) {
  const match = line.match(/^- \*\*(.+?)\*\*:? ?(.*)/);

  if (match) {
    return (
      <span>
        <strong className="text-white">{match[1]}:</strong>{" "}
        <span>{match[2]}</span>
      </span>
    );
  }

  return line.replace(/^- /, "");
}

function parseContent(content = "") {
  const lines = content.split("\n");
  const blocks = [];
  let unorderedList = [];
  let orderedList = [];

  const flushLists = () => {
    if (unorderedList.length > 0) {
      blocks.push({ type: "ul", items: unorderedList });
      unorderedList = [];
    }

    if (orderedList.length > 0) {
      blocks.push({ type: "ol", items: orderedList });
      orderedList = [];
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushLists();
      blocks.push({ type: "space" });
      return;
    }

    if (line.startsWith("## ")) {
      flushLists();
      blocks.push({ type: "h2", text: line.replace("## ", "") });
      return;
    }

    if (line.startsWith("### ")) {
      flushLists();
      blocks.push({ type: "h3", text: line.replace("### ", "") });
      return;
    }

    if (line.startsWith("- ")) {
      unorderedList.push(line);
      return;
    }

    if (/^\d+\.\s/.test(line)) {
      orderedList.push(line.replace(/^\d+\.\s/, ""));
      return;
    }

    flushLists();
    blocks.push({ type: "p", text: line });
  });

  flushLists();
  return blocks;
}

function getAuthorInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "AU";
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

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
      url,
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
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allPublishedBlogs = await getBlogs({ status: "published" });
  const related = allPublishedBlogs
    .filter((item) => item.tag === blog.tag && item.slug !== blog.slug)
    .slice(0, 2);
  const contentBlocks = parseContent(blog.content);
  const authorInitials = getAuthorInitials(blog.author);

  return (
    <div className="min-h-screen w-full bg-[#050709] text-white">
      <div className="relative h-[55vh] w-full overflow-hidden md:h-[65vh]">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050709] via-[#050709]/60 to-[#050709]/20" />

        <Link
          href="/blogs"
          className="absolute left-6 top-8 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:text-white md:left-10"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <div className="absolute bottom-10 left-6 z-10 md:left-10">
          <span
            className="rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{
              background: `${blog.accentColor}25`,
              color: blog.accentColor,
              border: `1px solid ${blog.accentColor}40`,
            }}
          >
            {blog.category}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-5 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <User size={13} /> {blog.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} /> {blog.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} /> {blog.readTime}
          </span>
        </div>

        <h1 className="mb-8 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
          {blog.title}
        </h1>

        <div
          className="mb-10 rounded-r-lg border-l-4 py-2 pl-5"
          style={{
            borderColor: blog.accentColor,
            background: `${blog.accentColor}10`,
          }}
        >
          <p className="text-base italic leading-relaxed text-neutral-300">
            {blog.excerpt}
          </p>
        </div>

        <div className="max-w-none space-y-4 blog-content-wrapper">
          {blog.content.trim().startsWith("<") ? (
            <div 
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />
          ) : (
            contentBlocks.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2 key={index} className="mb-4 mt-10 text-2xl font-bold text-white">
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "h3") {
                return (
                  <h3
                    key={index}
                    className="mb-3 mt-8 text-xl font-bold"
                    style={{ color: blog.accentColor }}
                  >
                    {block.text}
                  </h3>
                );
              }

              if (block.type === "ul") {
                return (
                  <ul key={index} className="space-y-3">
                    {block.items.map((item, itemIndex) => (
                      <li
                        key={`${index}-${itemIndex}`}
                        className="flex gap-3 text-base leading-relaxed text-neutral-300"
                      >
                        <span
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: blog.accentColor }}
                        />
                        <span>{renderListItemContent(item, blog.accentColor)}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === "ol") {
                return (
                  <ol key={index} className="space-y-3 pl-5 text-base leading-relaxed text-neutral-300">
                    {block.items.map((item, itemIndex) => (
                      <li key={`${index}-${itemIndex}`} className="list-decimal pl-2">
                        {item}
                      </li>
                    ))}
                  </ol>
                );
              }

              if (block.type === "space") {
                return <div key={index} className="h-2" />;
              }

              return (
                <p key={index} className="text-base leading-loose text-neutral-400">
                  {block.text}
                </p>
              );
            })
          )}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .rich-text-content {
            color: #9ca3af;
            line-height: 1.8;
            font-size: 1.1rem;
          }
          .rich-text-content h1, .rich-text-content h2, .rich-text-content h3 {
            color: white;
            font-weight: 800;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            line-height: 1.2;
          }
          .rich-text-content h1 { font-size: 2.25rem; }
          .rich-text-content h2 { font-size: 1.875rem; }
          .rich-text-content h3 { font-size: 1.5rem; color: ${blog.accentColor}; }
          
          .rich-text-content p {
            margin-bottom: 1.5rem;
          }
          
          .rich-text-content ul, .rich-text-content ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          
          .rich-text-content ul { list-style-type: disc; }
          .rich-text-content ol { list-style-type: decimal; }
          
          .rich-text-content li {
            margin-bottom: 0.5rem;
          }

          .rich-text-content b, .rich-text-content strong {
            color: white;
            font-weight: 700;
          }

          .rich-text-content img {
            max-width: 100%;
            height: auto;
            border-radius: 1.5rem;
            margin: 2.5rem 0;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .rich-text-content a {
            color: ${blog.accentColor};
            text-decoration: underline;
            text-underline-offset: 4px;
            font-weight: 600;
          }

          .rich-text-content blockquote {
            border-left: 4px solid ${blog.accentColor};
            background: rgba(255, 255, 255, 0.03);
            padding: 1.5rem 2rem;
            font-style: italic;
            border-radius: 0 1rem 1rem 0;
            margin: 2rem 0;
          }
        ` }} />

        <div className="mb-10 mt-14 border-t border-white/8" />

        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600/30 text-lg font-bold text-blue-400">
            {authorInitials}
          </div>
          <div>
            <p className="font-bold text-white">{blog.author}</p>
            <p className="text-sm text-neutral-400">
              Published from the ScaleUp Web admin content panel.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 pb-24 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-white">Related Articles</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item._id || item.slug}
                href={`/blogs/${item.slug}`}
                className="group relative block"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 transition-all duration-300 hover:border-white/20">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 bg-white/5 p-5">
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: item.accentColor }}
                    >
                      {item.category}
                    </span>
                    <h3 className="mt-2 line-clamp-2 font-bold leading-snug text-white transition-colors group-hover:text-blue-300">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-500">
                      {item.readTime} · {item.date}
                    </p>
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
