"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Loader2,
  X,
  Image as ImageIcon,
  FileText,
  Type,
} from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-[320px] w-full animate-pulse rounded-3xl bg-slate-50" />,
});

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];

const getTodayInputValue = () => new Date().toISOString().split("T")[0];

const createEmptyFormData = () => ({
  title: "",
  slug: "",
  category: "",
  tag: "",
  excerpt: "",
  thumbnail: "",
  author: "Easin Arafat",
  readTime: "",
  date: getTodayInputValue(),
  accentColor: "#3b82f6",
  featured: false,
  status: "published",
  content: "",
});

const toDateInputValue = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return getTodayInputValue();
  }

  return date.toISOString().split("T")[0];
};

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(createEmptyFormData());

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs?status=all", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch blogs");
      }

      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setErrorMessage(error.message || "Blogs load করা যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (blog = null) => {
    setErrorMessage("");

    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        category: blog.category || "",
        tag: blog.tag || "",
        excerpt: blog.excerpt || "",
        thumbnail: blog.thumbnail || "",
        author: blog.author || "Easin Arafat",
        readTime: blog.readTime || "",
        date: toDateInputValue(blog.date),
        accentColor: blog.accentColor || "#3b82f6",
        featured: Boolean(blog.featured),
        status: blog.status || "published",
        content: blog.content || "",
      });
    } else {
      setEditingBlog(null);
      setFormData(createEmptyFormData());
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setFormData(createEmptyFormData());
    setErrorMessage("");
  };

  const handleDelete = async (id) => {
    if (!confirm("এই blog delete করতে চাও?")) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Blog delete করা যায়নি");
      }

      await fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      setErrorMessage(error.message || "Blog delete করা যায়নি।");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormLoading(true);
    setErrorMessage("");

    const url = editingBlog ? `/api/blogs/${editingBlog._id}` : "/api/blogs";
    const method = editingBlog ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Blog save করা যায়নি");
      }

      closeModal();
      await fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      setErrorMessage(error.message || "Blog save করা যায়নি।");
    } finally {
      setFormLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesStatus = activeStatus === "all" || blog.status === activeStatus;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      query === "" ||
      blog.title?.toLowerCase().includes(query) ||
      blog.category?.toLowerCase().includes(query) ||
      blog.slug?.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Manage Blogs</h1>
          <p className="text-slate-500 mt-1 font-medium">
            এখান থেকে নতুন blog লিখতে, edit করতে আর publish করতে পারবে।
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition-all font-bold shadow-lg shadow-purple-200"
        >
          <Plus size={20} />
          Write New Blog
        </button>
      </div>

      {errorMessage && !isModalOpen && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by title, slug or category..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
          {["all", "published", "draft"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition-all ${
                activeStatus === status
                  ? "bg-purple-600 text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-[0.18em] text-slate-400">
                <th className="px-6 py-5 font-black">Article</th>
                <th className="px-6 py-5 font-black">Category</th>
                <th className="px-6 py-5 font-black">Status</th>
                <th className="px-6 py-5 font-black">Date</th>
                <th className="px-6 py-5 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-5" colSpan={5}>
                      <div className="h-16 animate-pulse rounded-2xl bg-slate-50" />
                    </td>
                  </tr>
                ))
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td className="px-6 py-16 text-center" colSpan={5}>
                    <FileText size={34} className="mx-auto mb-4 text-slate-200" />
                    <p className="font-bold text-slate-400">No blogs found.</p>
                  </td>
                </tr>
              ) : (
                <AnimatePresence initial={false}>
                  {filteredBlogs.map((blog, index) => (
                    <motion.tr
                      key={blog._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 overflow-hidden rounded-2xl border border-gray-100 bg-slate-50 shrink-0">
                            {blog.thumbnail ? (
                              <img
                                src={blog.thumbnail}
                                alt={blog.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-300">
                                <ImageIcon size={18} />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="line-clamp-1 font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                              {blog.title}
                            </p>
                            <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                              /blogs/{blog.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-2">
                          <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                            {blog.category}
                          </span>
                          <span className="text-xs text-slate-400">#{blog.tag}</span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-2">
                          <span
                            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${
                              blog.status === "published"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {blog.status}
                          </span>
                          {blog.featured && (
                            <span className="text-xs font-semibold text-purple-600">
                              Featured on blog page
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-slate-500">
                        {blog.date}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/blogs/${blog.slug}`}
                            target="_blank"
                            className="rounded-xl bg-slate-50 p-2.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700"
                          >
                            <ExternalLink size={18} />
                          </Link>

                          <button
                            onClick={() => openModal(blog)}
                            className="rounded-xl bg-slate-50 p-2.5 text-slate-400 transition-all hover:bg-purple-50 hover:text-purple-600"
                          >
                            <Edit3 size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="rounded-xl bg-slate-50 p-2.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[36px] bg-white p-8 shadow-2xl"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-800">
                    {editingBlog ? "Edit Blog" : "Write New Blog"}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    `## Heading`, `### Subheading`, `- list item` এই format-এ content লিখলে সুন্দরভাবে render হবে।
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700"
                >
                  <X size={22} />
                </button>
              </div>

              {errorMessage && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(event) =>
                        setFormData({ ...formData, title: event.target.value })
                      }
                      className="w-full rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 font-medium text-slate-700 transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/10"
                      placeholder="e.g. How to grow a business website with SEO"
                    />
                  </div>

                  <div>
                    <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(event) =>
                        setFormData({ ...formData, slug: event.target.value })
                      }
                      className="w-full rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 font-medium text-slate-700 transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/10"
                      placeholder="leave blank to auto-generate"
                    />
                  </div>

                  <div>
                    <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Author
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(event) =>
                        setFormData({ ...formData, author: event.target.value })
                      }
                      className="w-full rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 font-medium text-slate-700 transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Category
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(event) =>
                        setFormData({ ...formData, category: event.target.value })
                      }
                      className="w-full rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 font-medium text-slate-700 transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/10"
                      placeholder="SEO"
                    />
                  </div>

                  <div>
                    <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Tag
                    </label>
                    <input
                      type="text"
                      value={formData.tag}
                      onChange={(event) =>
                        setFormData({ ...formData, tag: event.target.value })
                      }
                      className="w-full rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 font-medium text-slate-700 transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/10"
                      placeholder="seo"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Excerpt
                    </label>
                    <textarea
                      required
                      value={formData.excerpt}
                      onChange={(event) =>
                        setFormData({ ...formData, excerpt: event.target.value })
                      }
                      className="min-h-[100px] w-full rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 font-medium text-slate-700 transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/10"
                      placeholder="Short summary for the blogs listing page..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Thumbnail URL
                    </label>
                    <div className="relative">
                      <ImageIcon
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        type="text"
                        required
                        value={formData.thumbnail}
                        onChange={(event) =>
                          setFormData({ ...formData, thumbnail: event.target.value })
                        }
                        className="w-full rounded-2xl border border-gray-100 bg-slate-50 py-3 pl-12 pr-4 font-medium text-slate-700 transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/10"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(event) =>
                        setFormData({ ...formData, date: event.target.value })
                      }
                      className="w-full rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 font-medium text-slate-700 transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(event) =>
                        setFormData({ ...formData, readTime: event.target.value })
                      }
                      className="w-full rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 font-medium text-slate-700 transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/10"
                      placeholder="leave blank to auto-calculate"
                    />
                  </div>

                  <div>
                    <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Accent Color
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={formData.accentColor}
                        onChange={(event) =>
                          setFormData({ ...formData, accentColor: event.target.value })
                        }
                        className="h-12 w-16 rounded-2xl border border-gray-100 bg-slate-50 p-1"
                      />
                      <input
                        type="text"
                        value={formData.accentColor}
                        onChange={(event) =>
                          setFormData({ ...formData, accentColor: event.target.value })
                        }
                        className="flex-1 rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 font-medium text-slate-700 transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(event) =>
                        setFormData({ ...formData, status: event.target.value })
                      }
                      className="w-full rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 font-medium text-slate-700 transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/10"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                  <label className="flex items-center gap-3 text-sm font-bold text-purple-700">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(event) =>
                        setFormData({ ...formData, featured: event.target.checked })
                      }
                      className="h-5 w-5 rounded-lg border-purple-300 text-purple-600 focus:ring-purple-600/20"
                    />
                    Make this a featured article on the blogs page
                  </label>
                </div>

                <div className="quill-editor-wrapper">
                  <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Type size={14} className="text-purple-600" /> Blog Content
                  </label>
                  <div className="rounded-3xl border border-gray-100 bg-slate-50 overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(content) => setFormData({ ...formData, content })}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Write your amazing blog content here..."
                      className="admin-quill-editor"
                    />
                  </div>
                  <p className="mt-2 ml-1 text-[10px] font-bold text-slate-400">
                    * You can directly paste images, add links, and format text using the toolbar above.
                  </p>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                  .admin-quill-editor .ql-toolbar {
                    border: none !important;
                    background: #f8fafc !important;
                    border-bottom: 1px solid #f1f5f9 !important;
                    padding: 12px 20px !important;
                  }
                  .admin-quill-editor .ql-container {
                    border: none !important;
                    min-height: 400px !important;
                    font-size: 16px !important;
                    font-family: inherit !important;
                  }
                  .admin-quill-editor .ql-editor {
                    padding: 24px 20px !important;
                    line-height: 1.7 !important;
                  }
                  .admin-quill-editor .ql-editor.ql-blank::before {
                    color: #94a3b8 !important;
                    font-style: normal !important;
                  }
                ` }} />

                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 py-4 font-black text-white shadow-xl shadow-purple-100 transition-all hover:bg-purple-700 disabled:opacity-70"
                >
                  {formLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : editingBlog ? (
                    "Update Blog"
                  ) : (
                    "Publish Blog"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
