"use client";
import React, { useState, useEffect } from "react";
import { Plus, Search, Edit3, Trash2, ExternalLink, Briefcase, Heart, X, Loader2, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    link: "#",
    featured: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        image: project.image,
        link: project.link || "#",
        description: project.description || "",
        featured: project.featured || false
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        category: "",
        image: "",
        link: "#",
        featured: false
      });
    }
    setIsModalOpen(true);
  };

  const handleToggleFeatured = async (project) => {
    const featuredCount = projects.filter(p => p.featured && p._id !== project._id).length;
    if (!project.featured && featuredCount >= 4) {
      alert("⚠️ Capacity Reached: You can only showcase EXACTLY 4 best projects on the homepage. Please un-heart another project first.");
      return;
    }

    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !project.featured })
      });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error("Error toggling featured:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const url = editingProject ? `/api/projects/${editingProject._id}` : "/api/projects";
    const method = editingProject ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProjects();
      } else {
        const err = await res.json();
        alert(err.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Error saving project:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Portfolio</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage and feature your best work.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition-all font-bold shadow-lg shadow-purple-200"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={18} />
        <input
          type="text"
          placeholder="Search projects by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="bg-white border border-gray-100 rounded-[32px] h-64 animate-pulse shadow-sm" />
          ))
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200 shadow-sm">
            <Briefcase size={40} className="mx-auto mb-4 opacity-10 text-slate-900" />
            <p className="text-slate-400 font-bold">No projects found.</p>
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={project._id}
              className="group bg-white border border-gray-100 rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col shadow-sm"
            >
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button 
                  onClick={() => handleToggleFeatured(project)}
                  className={`absolute top-4 right-4 p-2.5 rounded-2xl backdrop-blur-md transition-all shadow-lg ${
                    project.featured 
                    ? "bg-red-500 text-white" 
                    : "bg-white/80 text-slate-400 hover:text-red-500 hover:scale-110"
                  }`}
                  title={project.featured ? "Remove from Home" : "Feature on Home"}
                >
                  <Heart size={18} fill={project.featured ? "currentColor" : "none"} strokeWidth={2.5} />
                </button>
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-purple-700 uppercase tracking-widest border border-white">
                  {project.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-slate-800 mb-6 line-clamp-1 group-hover:text-purple-600 transition-colors">
                  {project.title}
                </h3>
                
                <div className="mt-auto flex items-center justify-between pt-5 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openModal(project)}
                      className="p-2.5 bg-slate-50 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(project._id)}
                      className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <a href={project.link} target="_blank" className="text-[11px] font-black text-slate-400 hover:text-purple-600 transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                    Site <ExternalLink size={12} strokeWidth={3} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[40px] w-full max-w-xl p-8 relative z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-800">
                  {editingProject ? "Refine Project" : "New Creation"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
                    placeholder="e.g. Modern Agency Portfolio"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Category</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
                      placeholder="UI/UX Design"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Live URL</label>
                    <input
                      type="text"
                      value={formData.link}
                      onChange={(e) => setFormData({...formData, link: e.target.value})}
                      className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Thumbnail URL</label>
                  <div className="relative group">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Project Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium min-h-[100px]"
                    placeholder="Describe the impact and results of this project..."
                  />
                </div>

                <div className="flex items-center gap-2 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-5 h-5 rounded-lg border-purple-300 text-purple-600 focus:ring-purple-600/20"
                  />
                  <label htmlFor="featured" className="text-sm font-bold text-purple-700 cursor-pointer">
                    Feature on Homepage (Case Studies)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {formLoading ? <Loader2 className="animate-spin" size={20} /> : editingProject ? "Save Changes" : "Deploy Project"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
