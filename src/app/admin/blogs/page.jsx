"use client";
import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Search, ExternalLink, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs?status=all");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Manage Blogs</h1>
          <p className="text-gray-400">Create, edit, and manage your articles.</p>
        </div>
        <Link 
          href="/admin/blogs/new"
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20 font-semibold"
        >
          <Plus size={20} />
          Create Blog
        </Link>
      </div>

      <div className="bg-[#0c0f14] border border-white/5 rounded-[40px] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-sm transition-all border border-white/5">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-gray-500 border-b border-white/5">
                <th className="px-8 py-5 font-semibold">Article</th>
                <th className="px-8 py-5 font-semibold">Category</th>
                <th className="px-8 py-5 font-semibold">Status</th>
                <th className="px-8 py-5 font-semibold">Date</th>
                <th className="px-8 py-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredBlogs.map((blog, index) => (
                  <motion.tr 
                    key={blog._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                          <img src={blog.thumbnail} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1">{blog.title}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1"><Edit2 size={10} /> {blog.author}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${blog.status === 'published' ? 'bg-green-500' : 'bg-gray-500'}`} />
                        <span className="text-sm text-gray-300 capitalize">{blog.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-500">
                      {blog.date}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/blogs/${blog.slug}`} target="_blank" className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all">
                          <ExternalLink size={18} />
                        </Link>
                        <button className="p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-400 transition-all">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredBlogs.length === 0 && !loading && (
            <div className="p-20 text-center">
              <div className="text-gray-500 mb-2 italic">No articles found matching your criteria.</div>
              <button 
                onClick={() => setSearchTerm("")}
                className="text-purple-400 text-sm font-medium hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
          {loading && (
            <div className="p-20 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
