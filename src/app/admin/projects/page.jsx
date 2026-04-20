"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Briefcase,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  Flag,
  Heart,
  Image as ImageIcon,
  Link2,
  ListChecks,
  Loader2,
  Paperclip,
  Plus,
  RefreshCcw,
  Search,
  StickyNote,
  Trash2,
  UploadCloud,
  UserRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MAX_FILE_SIZE = 2.5 * 1024 * 1024;

const emptyFormData = {
  title: "",
  category: "",
  image: "",
  link: "#",
  description: "",
  clientName: "",
  status: "planning",
  priority: "medium",
  deadline: "",
  featured: false,
};

const statusOptions = [
  { value: "planning", label: "Planning", classes: "bg-sky-50 text-sky-700 border-sky-100" },
  { value: "in-progress", label: "In Progress", classes: "bg-amber-50 text-amber-700 border-amber-100" },
  { value: "review", label: "Review", classes: "bg-violet-50 text-violet-700 border-violet-100" },
  { value: "completed", label: "Completed", classes: "bg-emerald-50 text-emerald-700 border-emerald-100" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

function getStatusMeta(status) {
  return statusOptions.find((item) => item.value === status) || statusOptions[0];
}

function formatDate(date) {
  if (!date) return "No deadline";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toDateInputValue(date) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

function getDueState(project) {
  if (!project?.deadline) return { label: "No deadline", classes: "text-slate-400 bg-slate-50 border-slate-100" };
  if (project.status === "completed") {
    return { label: "Completed", classes: "text-emerald-700 bg-emerald-50 border-emerald-100" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(project.deadline);
  deadline.setHours(0, 0, 0, 0);
  const days = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

  if (days < 0) return { label: `${Math.abs(days)} days overdue`, classes: "text-red-700 bg-red-50 border-red-100" };
  if (days === 0) return { label: "Due today", classes: "text-orange-700 bg-orange-50 border-orange-100" };
  if (days <= 3) return { label: `${days} days left`, classes: "text-amber-700 bg-amber-50 border-amber-100" };
  return { label: `${days} days left`, classes: "text-slate-600 bg-slate-50 border-slate-100" };
}

function getProgress(project) {
  const tasks = project?.tasks || [];
  if (project?.status === "completed") return 100;
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter((task) => task.done).length / tasks.length) * 100);
}

function formatFileSize(size = 0) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);
  const [formLoading, setFormLoading] = useState(false);
  const [workspaceLoading, setWorkspaceLoading] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      const nextProjects = Array.isArray(data) ? data : [];

      setProjects(nextProjects);
      setActiveProject((current) => {
        if (!current) return null;
        return nextProjects.find((project) => project._id === current._id) || null;
      });
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const summary = useMemo(() => {
    const completed = projects.filter((project) => project.status === "completed").length;
    const overdue = projects.filter((project) => getDueState(project).label.includes("overdue")).length;
    const active = projects.length - completed;

    return { total: projects.length, active, completed, overdue };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return projects.filter((project) => {
      const matchesSearch =
        project.title?.toLowerCase().includes(term) ||
        project.category?.toLowerCase().includes(term) ||
        project.clientName?.toLowerCase().includes(term);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && project.status !== "completed") ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || "",
        category: project.category || "",
        image: project.image || "",
        link: project.link || "#",
        description: project.description || "",
        clientName: project.clientName || "",
        status: project.status || "planning",
        priority: project.priority || "medium",
        deadline: toDateInputValue(project.deadline),
        featured: Boolean(project.featured),
      });
    } else {
      setEditingProject(null);
      setFormData(emptyFormData);
    }

    setIsModalOpen(true);
  };

  const updateLocalProject = (updatedProject) => {
    setProjects((current) => current.map((project) => (project._id === updatedProject._id ? updatedProject : project)));
    setActiveProject((current) => (current?._id === updatedProject._id ? updatedProject : current));
  };

  const saveProjectPatch = async (project, patch) => {
    setWorkspaceLoading(true);

    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Could not update project");
        return null;
      }

      updateLocalProject(data);
      return data;
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Could not update project");
      return null;
    } finally {
      setWorkspaceLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const url = editingProject ? `/api/projects/${editingProject._id}` : "/api/projects";
    const method = editingProject ? "PUT" : "POST";
    const payload = {
      ...formData,
      deadline: formData.deadline || null,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        if (editingProject) {
          updateLocalProject(data);
        } else {
          setProjects((current) => [data, ...current]);
          setActiveProject(data);
        }
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Could not save project");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((current) => current.filter((project) => project._id !== id));
        setActiveProject((current) => (current?._id === id ? null : current));
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleToggleFeatured = async (project) => {
    const featuredCount = projects.filter((item) => item.featured && item._id !== project._id).length;
    if (!project.featured && featuredCount >= 4) {
      alert("Capacity reached: You can only feature 4 projects on the homepage.");
      return;
    }

    await saveProjectPatch(project, { featured: !project.featured });
  };

  const handleThumbnailUpload = async (files) => {
    const file = files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Image is too large. Please keep it under 2.5 MB.");
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
    setFormData((current) => ({ ...current, image: dataUrl }));
  };

  const handleWorkspaceUpload = async (project, files) => {
    const selectedFiles = Array.from(files || []);
    if (selectedFiles.length === 0) return;

    const oversizedFile = selectedFiles.find((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFile) {
      alert(`${oversizedFile.name} is too large. Please keep files under 2.5 MB each.`);
      return;
    }

    const additions = await Promise.all(
      selectedFiles.map(async (file) => ({
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        url: await readFileAsDataUrl(file),
        kind: file.type.startsWith("image/") ? "image" : "file",
        addedAt: new Date().toISOString(),
      }))
    );

    await saveProjectPatch(project, {
      attachments: [...(project.attachments || []), ...additions],
    });
  };

  const handleAddNote = async (project) => {
    const text = noteText.trim();
    if (!text) return;

    await saveProjectPatch(project, {
      notes: [{ text, createdAt: new Date().toISOString() }, ...(project.notes || [])],
    });
    setNoteText("");
  };

  const handleDeleteNote = async (project, targetNote, index) => {
    const nextNotes = (project.notes || []).filter((note, noteIndex) => {
      if (targetNote._id) return note._id !== targetNote._id;
      return noteIndex !== index;
    });

    await saveProjectPatch(project, { notes: nextNotes });
  };

  const handleAddTask = async (project) => {
    const title = taskText.trim();
    if (!title) return;

    await saveProjectPatch(project, {
      tasks: [...(project.tasks || []), { title, done: false, createdAt: new Date().toISOString() }],
    });
    setTaskText("");
  };

  const handleToggleTask = async (project, targetTask, index) => {
    const nextTasks = (project.tasks || []).map((task, taskIndex) => {
      const isTarget = targetTask._id ? task._id === targetTask._id : taskIndex === index;
      if (!isTarget) return task;

      const done = !task.done;
      return {
        ...task,
        done,
        completedAt: done ? new Date().toISOString() : null,
      };
    });

    await saveProjectPatch(project, { tasks: nextTasks });
  };

  const handleDeleteTask = async (project, targetTask, index) => {
    const nextTasks = (project.tasks || []).filter((task, taskIndex) => {
      if (targetTask._id) return task._id !== targetTask._id;
      return taskIndex !== index;
    });

    await saveProjectPatch(project, { tasks: nextTasks });
  };

  const handleDeleteAttachment = async (project, targetAttachment, index) => {
    const nextAttachments = (project.attachments || []).filter((attachment, attachmentIndex) => {
      if (targetAttachment._id) return attachment._id !== targetAttachment._id;
      return attachmentIndex !== index;
    });

    await saveProjectPatch(project, { attachments: nextAttachments });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-purple-600">Project workspace</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Manage Projects</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
            Create client projects, track deadlines, keep notes, attach files, upload images, and mark work complete from one place.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-purple-200 transition-all hover:bg-purple-700"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total", value: summary.total, icon: Briefcase },
          { label: "Active", value: summary.active, icon: RefreshCcw },
          { label: "Completed", value: summary.completed, icon: CheckCircle2 },
          { label: "Overdue", value: summary.overdue, icon: AlertTriangle },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-purple-600">
                <Icon size={18} />
              </div>
              <p className="text-2xl font-black text-slate-900">{item.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-slate-100 bg-white p-3 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by project, category, or client"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-100 bg-slate-50 py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex">
          {["all", "active", "planning", "in-progress", "review", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-2 text-xs font-black capitalize transition-all ${
                statusFilter === status
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-500 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {status.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {loading ? (
          [1, 2, 3, 4].map((item) => (
            <div key={item} className="h-72 animate-pulse rounded-lg border border-slate-100 bg-white shadow-sm" />
          ))
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full rounded-lg border border-dashed border-slate-200 bg-white py-20 text-center shadow-sm">
            <Briefcase size={42} className="mx-auto mb-4 text-slate-200" />
            <p className="font-black text-slate-500">No projects found.</p>
          </div>
        ) : (
          filteredProjects.map((project, index) => {
            const status = getStatusMeta(project.status);
            const dueState = getDueState(project);
            const progress = getProgress(project);
            const tasksDone = (project.tasks || []).filter((task) => task.done).length;
            const taskTotal = (project.tasks || []).length;

            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70"
              >
                <div className="grid gap-0 md:grid-cols-[210px,1fr]">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="relative block h-52 bg-slate-100 text-left md:h-full"
                  >
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                    <span className={`absolute left-3 top-3 rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${status.classes}`}>
                      {status.label}
                    </span>
                    {project.featured && (
                      <span className="absolute right-3 top-3 rounded-lg bg-red-500 p-2 text-white shadow-lg">
                        <Heart size={15} fill="currentColor" />
                      </span>
                    )}
                  </button>

                  <div className="flex min-h-[260px] flex-col p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600">{project.category}</p>
                        <h3 className="mt-2 line-clamp-2 text-xl font-black text-slate-900">{project.title}</h3>
                      </div>
                      <button
                        onClick={() => handleToggleFeatured(project)}
                        className={`rounded-lg p-2 transition-all ${
                          project.featured
                            ? "bg-red-50 text-red-500"
                            : "bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500"
                        }`}
                        title={project.featured ? "Remove from homepage" : "Feature on homepage"}
                      >
                        <Heart size={18} fill={project.featured ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <UserRound size={16} className="text-slate-300" />
                        <span className="truncate font-bold">{project.clientName || "No client"}</span>
                      </div>
                      <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black ${dueState.classes}`}>
                        <CalendarDays size={15} />
                        <span className="truncate">{dueState.label}</span>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-400">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-purple-600 transition-all" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="mt-2 text-xs font-bold text-slate-400">
                        {taskTotal ? `${tasksDone} of ${taskTotal} tasks complete` : "No tasks added yet"}
                      </p>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <button
                        onClick={() => setActiveProject(project)}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-black text-white transition-all hover:bg-purple-600"
                      >
                        <Eye size={16} />
                        Open Workspace
                      </button>

                      <div className="flex items-center gap-2">
                        {project.link && project.link !== "#" && (
                          <a
                            href={project.link}
                            target="_blank"
                            className="rounded-lg bg-slate-50 p-2.5 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                            title="Open live site"
                          >
                            <ExternalLink size={17} />
                          </a>
                        )}
                        <button
                          onClick={() => openModal(project)}
                          className="rounded-lg bg-slate-50 p-2.5 text-slate-400 transition-all hover:bg-purple-50 hover:text-purple-600"
                          title="Edit project"
                        >
                          <Edit3 size={17} />
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="rounded-lg bg-slate-50 p-2.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                          title="Delete project"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="relative z-10 h-full w-full max-w-5xl overflow-y-auto bg-white shadow-2xl"
            >
              <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600">Workspace</p>
                    <h2 className="mt-1 text-2xl font-black text-slate-900">{activeProject.title}</h2>
                  </div>
                  <button onClick={() => setActiveProject(null)} className="rounded-lg bg-slate-50 p-2 text-slate-400 hover:text-slate-900">
                    <X size={22} />
                  </button>
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[340px,1fr]">
                <div className="border-b border-slate-100 p-5 md:p-8 lg:border-b-0 lg:border-r">
                  <div className="overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                    <img src={activeProject.image} alt={activeProject.title} className="h-56 w-full object-cover" />
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Status</label>
                      <select
                        value={activeProject.status || "planning"}
                        onChange={(e) => saveProjectPatch(activeProject, { status: e.target.value })}
                        className="w-full rounded-lg border border-slate-100 bg-white px-3 py-3 text-sm font-black text-slate-700 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Deadline</label>
                      <input
                        type="date"
                        value={toDateInputValue(activeProject.deadline)}
                        onChange={(e) => saveProjectPatch(activeProject, { deadline: e.target.value || null })}
                        className="w-full rounded-lg border border-slate-100 bg-white px-3 py-3 text-sm font-black text-slate-700 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Priority</label>
                      <select
                        value={activeProject.priority || "medium"}
                        onChange={(e) => saveProjectPatch(activeProject, { priority: e.target.value })}
                        className="w-full rounded-lg border border-slate-100 bg-white px-3 py-3 text-sm font-black text-slate-700 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                      >
                        {priorityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                      <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-400">
                        <span>Progress</span>
                        <span>{getProgress(activeProject)}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white">
                        <div className="h-full rounded-full bg-purple-600 transition-all" style={{ width: `${getProgress(activeProject)}%` }} />
                      </div>
                    </div>

                    <div className="space-y-3 text-sm font-bold text-slate-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-slate-300" />
                        <span>{formatDate(activeProject.deadline)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Flag size={16} className="text-slate-300" />
                        <span className="capitalize">{activeProject.priority || "medium"} priority</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Paperclip size={16} className="text-slate-300" />
                        <span>{(activeProject.attachments || []).length} attachments</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 p-5 md:p-8">
                  {workspaceLoading && (
                    <div className="rounded-lg border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-black text-purple-700">
                      Saving changes...
                    </div>
                  )}

                  <section>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="flex items-center gap-2 text-lg font-black text-slate-900">
                          <FileText size={20} className="text-purple-600" />
                          Project Details
                        </h3>
                        <p className="mt-1 text-sm font-medium text-slate-500">{activeProject.description || "No details added yet."}</p>
                      </div>
                      <button
                        onClick={() => openModal(activeProject)}
                        className="rounded-lg bg-slate-50 p-2.5 text-slate-400 hover:bg-purple-50 hover:text-purple-600"
                      >
                        <Edit3 size={17} />
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-slate-100 p-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Client</p>
                        <p className="mt-1 font-black text-slate-900">{activeProject.clientName || "Not added"}</p>
                      </div>
                      <div className="rounded-lg border border-slate-100 p-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live URL</p>
                        {activeProject.link && activeProject.link !== "#" ? (
                          <a href={activeProject.link} target="_blank" className="mt-1 flex items-center gap-2 font-black text-purple-600">
                            Open project <ExternalLink size={15} />
                          </a>
                        ) : (
                          <p className="mt-1 font-black text-slate-900">Not added</p>
                        )}
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
                      <ListChecks size={20} className="text-purple-600" />
                      Work Checklist
                    </h3>

                    <div className="flex gap-2">
                      <input
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddTask(activeProject);
                        }}
                        placeholder="Add a task, e.g. Homepage design"
                        className="flex-1 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                      />
                      <button
                        onClick={() => handleAddTask(activeProject)}
                        className="rounded-lg bg-purple-600 px-4 py-3 text-sm font-black text-white hover:bg-purple-700"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <div className="mt-4 space-y-2">
                      {(activeProject.tasks || []).length === 0 ? (
                        <p className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-sm font-bold text-slate-400">
                          No tasks added yet.
                        </p>
                      ) : (
                        activeProject.tasks.map((task, index) => (
                          <div key={task._id || `${task.title}-${index}`} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
                            <button
                              onClick={() => handleToggleTask(activeProject, task, index)}
                              className={`shrink-0 ${task.done ? "text-emerald-600" : "text-slate-300 hover:text-purple-600"}`}
                            >
                              {task.done ? <CheckCircle2 size={21} /> : <Circle size={21} />}
                            </button>
                            <span className={`flex-1 text-sm font-bold ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                              {task.title}
                            </span>
                            <button onClick={() => handleDeleteTask(activeProject, task, index)} className="text-slate-300 hover:text-red-500">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
                      <StickyNote size={20} className="text-purple-600" />
                      Notes
                    </h3>

                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Write client feedback, meeting note, or next step"
                      className="min-h-[110px] w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => handleAddNote(activeProject)}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-black text-white hover:bg-purple-600"
                      >
                        <Check size={16} />
                        Save Note
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      {(activeProject.notes || []).length === 0 ? (
                        <p className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-sm font-bold text-slate-400">
                          No notes saved yet.
                        </p>
                      ) : (
                        activeProject.notes.map((note, index) => (
                          <div key={note._id || `${note.createdAt}-${index}`} className="rounded-lg border border-slate-100 p-4">
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <p className="text-xs font-black uppercase tracking-widest text-slate-400">{formatDate(note.createdAt)}</p>
                              <button onClick={() => handleDeleteNote(activeProject, note, index)} className="text-slate-300 hover:text-red-500">
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <p className="whitespace-pre-wrap text-sm font-medium leading-6 text-slate-600">{note.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </section>

                  <section>
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="flex items-center gap-2 text-lg font-black text-slate-900">
                        <Paperclip size={20} className="text-purple-600" />
                        Files & Images
                      </h3>
                      <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-xs font-black text-white hover:bg-purple-700">
                        <UploadCloud size={16} />
                        Upload
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            handleWorkspaceUpload(activeProject, e.target.files);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </div>

                    {(activeProject.attachments || []).length === 0 ? (
                      <p className="rounded-lg border border-dashed border-slate-200 py-8 text-center text-sm font-bold text-slate-400">
                        No files uploaded yet.
                      </p>
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {activeProject.attachments.map((attachment, index) => (
                          <div key={attachment._id || `${attachment.name}-${index}`} className="rounded-lg border border-slate-100 p-3">
                            {attachment.kind === "image" && (
                              <img src={attachment.url} alt={attachment.name} className="mb-3 h-36 w-full rounded-lg object-cover" />
                            )}
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-purple-600">
                                {attachment.kind === "image" ? <ImageIcon size={18} /> : <Paperclip size={18} />}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-black text-slate-800">{attachment.name}</p>
                                <p className="text-xs font-bold text-slate-400">{formatFileSize(attachment.size)}</p>
                              </div>
                              <a href={attachment.url} download={attachment.name} className="text-slate-300 hover:text-purple-600">
                                <Download size={17} />
                              </a>
                              <button onClick={() => handleDeleteAttachment(activeProject, attachment, index)} className="text-slate-300 hover:text-red-500">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-5 shadow-2xl md:p-8"
            >
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600">
                    {editingProject ? "Edit project" : "New project"}
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    {editingProject ? "Update Project" : "Create Project"}
                  </h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="rounded-lg bg-slate-50 p-2 text-slate-400 hover:text-slate-900">
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Project Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                      placeholder="WordPress Website Development"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Client Name</label>
                    <div className="relative">
                      <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                      <input
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        className="w-full rounded-lg border border-slate-100 bg-slate-50 py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                        placeholder="Client or company"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                      placeholder="Website Development"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Live URL</label>
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                      <input
                        type="text"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className="w-full rounded-lg border border-slate-100 bg-slate-50 py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Deadline</label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                    >
                      {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Thumbnail</label>
                  <div className="grid gap-3 md:grid-cols-[1fr,150px]">
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full rounded-lg border border-slate-100 bg-slate-50 py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                        placeholder="Image URL or upload below"
                      />
                    </div>
                    <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-black text-slate-600 hover:bg-purple-50 hover:text-purple-700">
                      <UploadCloud size={17} />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          handleThumbnailUpload(e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </div>
                  {formData.image && (
                    <img src={formData.image} alt="Project thumbnail preview" className="mt-3 h-40 w-full rounded-lg border border-slate-100 object-cover" />
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Project Details</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[130px] w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                    placeholder="Scope, goals, stack, important requirements..."
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-purple-100 bg-purple-50 p-4">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-5 w-5 rounded border-purple-300 text-purple-600 focus:ring-purple-200"
                  />
                  <span className="text-sm font-black text-purple-700">Feature on homepage portfolio</span>
                </label>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 py-4 text-sm font-black text-white shadow-xl shadow-purple-100 transition-all hover:bg-purple-700 disabled:opacity-70"
                >
                  {formLoading ? <Loader2 className="animate-spin" size={20} /> : editingProject ? "Save Changes" : "Create Project"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
