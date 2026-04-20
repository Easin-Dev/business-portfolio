import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

const BLOG_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function cleanText(value = "") {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeAccentColor(value) {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) ? value : "#3b82f6";
}

export function slugifyBlogText(value = "") {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatBlogDate(value) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return BLOG_DATE_FORMATTER.format(new Date());
  }

  return BLOG_DATE_FORMATTER.format(date);
}

export function estimateReadTime(content = "") {
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

export function normalizeBlogPayload(input = {}, existing = {}) {
  const title = cleanText(input.title || existing.title);
  const category = cleanText(input.category || existing.category);
  const content = cleanText(input.content || existing.content).replace(/\r\n/g, "\n");
  const providedDate = cleanText(input.date || existing.date);
  const slug = slugifyBlogText(cleanText(input.slug) || title || existing.slug || "");
  const tag = slugifyBlogText(cleanText(input.tag) || category || existing.tag || "");

  return {
    title,
    slug,
    category,
    tag,
    excerpt: cleanText(input.excerpt || existing.excerpt),
    thumbnail: cleanText(input.thumbnail || existing.thumbnail),
    author: cleanText(input.author || existing.author) || "Easin Arafat",
    readTime: cleanText(input.readTime || existing.readTime) || estimateReadTime(content),
    date: formatBlogDate(providedDate || new Date()),
    featured: Boolean(input.featured),
    accentColor: normalizeAccentColor(
      cleanText(input.accentColor || existing.accentColor) || "#3b82f6"
    ),
    content,
    status: input.status === "draft" ? "draft" : "published",
  };
}

function serializeBlog(blog) {
  if (!blog) return null;

  return {
    ...blog,
    _id: blog._id?.toString?.() || blog._id,
    createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : null,
    updatedAt: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : null,
  };
}

export async function getBlogs({ status = "published", featured, slug } = {}) {
  await dbConnect();

  const query = {};

  if (status && status !== "all") {
    query.status = status;
  }

  if (typeof featured === "boolean") {
    query.featured = featured;
  }

  if (slug) {
    query.slug = slug;
  }

  const blogs = await Blog.find(query).sort({ createdAt: -1 }).lean();
  return blogs.map(serializeBlog);
}

export async function getBlogById(id) {
  await dbConnect();
  const blog = await Blog.findById(id).lean();
  return serializeBlog(blog);
}

export async function getBlogBySlug(slug, { status = "published" } = {}) {
  await dbConnect();

  const query = { slug };

  if (status && status !== "all") {
    query.status = status;
  }

  const blog = await Blog.findOne(query).lean();
  return serializeBlog(blog);
}
