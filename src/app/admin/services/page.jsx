"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Archive,
  Check,
  CheckCircle2,
  Circle,
  Download,
  Edit3,
  Eye,
  FileText,
  Image as ImageIcon,
  Layers,
  ListChecks,
  Loader2,
  PackageCheck,
  Paperclip,
  Plus,
  Search,
  Sparkles,
  StickyNote,
  Trash2,
  UploadCloud,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MAX_FILE_SIZE = 2.5 * 1024 * 1024;

const emptyFormData = {
  slug: "",
  title: "",
  shortDescription: "",
  description: "",
  image: "",
  status: "active",
  featured: false,
  priceFrom: "",
  timeline: "",
  targetAudience: "",
};

const statusOptions = [
  { value: "active", label: "Active", classes: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { value: "draft", label: "Draft", classes: "bg-slate-50 text-slate-600 border-slate-100" },
  { value: "paused", label: "Paused", classes: "bg-amber-50 text-amber-700 border-amber-100" },
];

function getStatusMeta(status) {
  return statusOptions.find((item) => item.value === status) || statusOptions[0];
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(date) {
  if (!date) return "Just now";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getChecklistProgress(service) {
  const tasks = service?.checklist || [];
  if (!tasks.length) return 0;
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

function ArrayEditor({ title, icon: Icon, items, emptyText, fields, onAdd, onUpdate, onDelete }) {
  const [draft, setDraft] = useState(() => fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const resetDraft = () => {
    setDraft(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
  };

  const handleAdd = () => {
    const hasValue = fields.some((field) => String(draft[field.name] || "").trim());
    if (!hasValue) return;

    onAdd(draft);
    resetDraft();
  };

  return (
    <section className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-black text-slate-900">
          <Icon size={20} className="text-purple-600" />
          {title}
        </h3>
        <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
          {items.length}
        </span>
      </div>

      <div className="space-y-2">
        {localItems.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-sm font-bold text-slate-400">
            {emptyText}
          </p>
        ) : (
          localItems.map((item, index) => (
            <div key={item._id || `${title}-${index}`} className="rounded-lg border border-slate-100 p-3">
              <div className="grid gap-2">
                {fields.map((field) => (
                  field.type === "textarea" ? (
                    <textarea
                      key={field.name}
                      value={item[field.name] || ""}
                      onChange={(e) => {
                        const next = [...localItems];
                        next[index] = { ...item, [field.name]: e.target.value };
                        setLocalItems(next);
                      }}
                      placeholder={field.placeholder}
                      className="min-h-[78px] rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-300 focus:bg-white"
                    />
                  ) : (
                    <input
                      key={field.name}
                      value={item[field.name] || ""}
                      onChange={(e) => {
                        const next = [...localItems];
                        next[index] = { ...item, [field.name]: e.target.value };
                        setLocalItems(next);
                      }}
                      placeholder={field.placeholder}
                      className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-300 focus:bg-white"
                    />
                  )
                ))}
              </div>
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={() => onUpdate(index, localItems[index])}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-black text-white hover:bg-purple-600"
                >
                  Save
                </button>
                <button onClick={() => onDelete(index)} className="rounded-lg p-2 text-slate-300 hover:bg-red-50 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 grid gap-2">
        {fields.map((field) => (
          field.type === "textarea" ? (
            <textarea
              key={field.name}
              value={draft[field.name] || ""}
              onChange={(e) => setDraft({ ...draft, [field.name]: e.target.value })}
              placeholder={field.placeholder}
              className="min-h-[80px] rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
            />
          ) : (
            <input
              key={field.name}
              value={draft[field.name] || ""}
              onChange={(e) => setDraft({ ...draft, [field.name]: e.target.value })}
              placeholder={field.placeholder}
              className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
            />
          )
        ))}
        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-black text-white hover:bg-purple-600"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
    </section>
  );
}

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);
  const [formLoading, setFormLoading] = useState(false);
  const [workspaceLoading, setWorkspaceLoading] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      const nextServices = Array.isArray(data) ? data : [];

      setServices(nextServices);
      setActiveService((current) => {
        if (!current) return null;
        return nextServices.find((service) => service._id === current._id) || null;
      });
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const summary = useMemo(() => {
    const active = services.filter((service) => !service.status || service.status === "active").length;
    const draft = services.filter((service) => service.status === "draft").length;
    const featured = services.filter((service) => service.featured).length;

    return { total: services.length, active, draft, featured };
  }, [services]);

  const filteredServices = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return services.filter((service) => {
      const matchesSearch =
        service.title?.toLowerCase().includes(term) ||
        service.slug?.toLowerCase().includes(term) ||
        service.shortDescription?.toLowerCase().includes(term);
      const serviceStatus = service.status || "active";
      const matchesStatus = statusFilter === "all" || serviceStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [services, searchTerm, statusFilter]);

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        slug: service.slug || "",
        title: service.title || "",
        shortDescription: service.shortDescription || "",
        description: service.description || "",
        image: service.image || "",
        status: service.status || "active",
        featured: Boolean(service.featured),
        priceFrom: service.priceFrom || "",
        timeline: service.timeline || "",
        targetAudience: service.targetAudience || "",
      });
    } else {
      setEditingService(null);
      setFormData(emptyFormData);
    }

    setIsModalOpen(true);
  };

  const updateLocalService = (updatedService) => {
    setServices((current) => current.map((service) => (service._id === updatedService._id ? updatedService : service)));
    setActiveService((current) => (current?._id === updatedService._id ? updatedService : current));
  };

  const saveServicePatch = async (service, patch) => {
    setWorkspaceLoading(true);

    try {
      const res = await fetch(`/api/services/${service._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Could not update service");
        return null;
      }

      updateLocalService(data);
      return data;
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Could not update service");
      return null;
    } finally {
      setWorkspaceLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const payload = {
      ...formData,
      slug: formData.slug || slugify(formData.title),
    };
    const url = editingService ? `/api/services/${editingService._id}` : "/api/services";
    const method = editingService ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      setIsModalOpen(false);
      if (editingService) {
        updateLocalService(data);
      } else {
        setServices((current) => [data, ...current]);
        setActiveService(data);
      }
    } catch (err) {
      console.error("Error saving service:", err);
      alert("Could not save service");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((current) => current.filter((service) => service._id !== id));
        setActiveService((current) => (current?._id === id ? null : current));
      }
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  const handleImageUpload = async (files) => {
    const file = files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      alert("Please upload an image or video file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large. Please keep it under 2.5 MB.");
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
    setFormData((current) => ({ ...current, image: dataUrl }));
  };

  const handleResourceUpload = async (service, files) => {
    const selectedFiles = Array.from(files || []);
    if (!selectedFiles.length) return;

    const oversizedFile = selectedFiles.find((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFile) {
      alert(`${oversizedFile.name} is too large. Please keep files under 2.5 MB each.`);
      return;
    }

    const resources = await Promise.all(
      selectedFiles.map(async (file) => ({
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        url: await readFileAsDataUrl(file),
        kind: file.type.startsWith("image/") ? "image" : "file",
        addedAt: new Date().toISOString(),
      }))
    );

    await saveServicePatch(service, {
      resources: [...(service.resources || []), ...resources],
    });
  };

  const handleAddNote = async (service) => {
    const text = noteText.trim();
    if (!text) return;

    await saveServicePatch(service, {
      internalNotes: [{ text, createdAt: new Date().toISOString() }, ...(service.internalNotes || [])],
    });
    setNoteText("");
  };

  const handleDeleteNote = async (service, targetNote, index) => {
    const internalNotes = (service.internalNotes || []).filter((note, noteIndex) => {
      if (targetNote._id) return note._id !== targetNote._id;
      return noteIndex !== index;
    });

    await saveServicePatch(service, { internalNotes });
  };

  const handleAddTask = async (service) => {
    const title = taskText.trim();
    if (!title) return;

    await saveServicePatch(service, {
      checklist: [...(service.checklist || []), { title, done: false, createdAt: new Date().toISOString() }],
    });
    setTaskText("");
  };

  const handleToggleTask = async (service, targetTask, index) => {
    const checklist = (service.checklist || []).map((task, taskIndex) => {
      const isTarget = targetTask._id ? task._id === targetTask._id : taskIndex === index;
      if (!isTarget) return task;

      const done = !task.done;
      return { ...task, done, completedAt: done ? new Date().toISOString() : null };
    });

    await saveServicePatch(service, { checklist });
  };

  const handleDeleteTask = async (service, targetTask, index) => {
    const checklist = (service.checklist || []).filter((task, taskIndex) => {
      if (targetTask._id) return task._id !== targetTask._id;
      return taskIndex !== index;
    });

    await saveServicePatch(service, { checklist });
  };

  const handleDeleteResource = async (service, targetResource, index) => {
    const resources = (service.resources || []).filter((resource, resourceIndex) => {
      if (targetResource._id) return resource._id !== targetResource._id;
      return resourceIndex !== index;
    });

    await saveServicePatch(service, { resources });
  };

  const updateServiceArray = async (field, items) => {
    await saveServicePatch(activeService, { [field]: items });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-purple-600">Service workspace</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Manage Services</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
            Create offers, organize service details, store notes, track setup tasks, and keep resources in one admin area.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-purple-200 transition-all hover:bg-purple-700"
        >
          <Plus size={18} />
          New Service
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total", value: summary.total, icon: Layers },
          { label: "Active", value: summary.active, icon: CheckCircle2 },
          { label: "Drafts", value: summary.draft, icon: Archive },
          { label: "Featured", value: summary.featured, icon: Sparkles },
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
            placeholder="Search by title, slug, or offer text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-100 bg-slate-50 py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex">
          {["all", "active", "draft", "paused"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-2 text-xs font-black capitalize transition-all ${
                statusFilter === status
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-500 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {loading ? (
          [1, 2, 3].map((item) => (
            <div key={item} className="h-48 animate-pulse rounded-lg border border-slate-100 bg-white shadow-sm" />
          ))
        ) : filteredServices.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white py-20 text-center shadow-sm">
            <Layers size={42} className="mx-auto mb-4 text-slate-200" />
            <p className="font-black text-slate-500">No services found.</p>
          </div>
        ) : (
          filteredServices.map((service, index) => {
            const status = getStatusMeta(service.status);
            const progress = getChecklistProgress(service);

            return (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                key={service._id}
                className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70"
              >
                <div className="grid gap-0 lg:grid-cols-[230px,1fr]">
                  <button onClick={() => setActiveService(service)} className="relative h-52 bg-slate-100 text-left lg:h-full">
                    {service.image ? (
                      service.image.includes(".mp4") || service.image.startsWith("data:video") ? (
                        <video src={service.image} className="h-full w-full object-cover" muted loop playsInline />
                      ) : (
                        <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                      )
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-purple-200">
                        <Layers size={54} />
                      </div>
                    )}
                    <span className={`absolute left-3 top-3 rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${status.classes}`}>
                      {status.label}
                    </span>
                  </button>

                  <div className="flex flex-col p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600">/{service.slug}</p>
                        <h3 className="mt-2 text-2xl font-black text-slate-900">{service.title}</h3>
                        <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-500">
                          {service.shortDescription || service.description || "No service summary added yet."}
                        </p>
                      </div>

                      <button
                        onClick={() => saveServicePatch(service, { featured: !service.featured })}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-black transition-all ${
                          service.featured
                            ? "bg-purple-50 text-purple-700"
                            : "bg-slate-50 text-slate-400 hover:bg-purple-50 hover:text-purple-700"
                        }`}
                      >
                        <Sparkles size={16} fill={service.featured ? "currentColor" : "none"} />
                        {service.featured ? "Featured" : "Feature"}
                      </button>
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      <div className="rounded-lg border border-slate-100 p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Starting Price</p>
                        <p className="mt-1 font-black text-slate-900">{service.priceFrom || "Not set"}</p>
                      </div>
                      <div className="rounded-lg border border-slate-100 p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Timeline</p>
                        <p className="mt-1 font-black text-slate-900">{service.timeline || "Not set"}</p>
                      </div>
                      <div className="rounded-lg border border-slate-100 p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Checklist</p>
                        <p className="mt-1 font-black text-slate-900">{progress}% ready</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {(service.features || []).slice(0, 4).map((feature, featureIndex) => (
                        <span key={feature._id || featureIndex} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
                          <CheckCircle2 size={13} className="text-purple-600" />
                          {feature.title}
                        </span>
                      ))}
                      {(service.features || []).length > 4 && (
                        <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-400">
                          +{service.features.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <button
                        onClick={() => setActiveService(service)}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-black text-white transition-all hover:bg-purple-600"
                      >
                        <Eye size={16} />
                        Open Workspace
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(service)}
                          className="rounded-lg bg-slate-50 p-2.5 text-slate-400 transition-all hover:bg-purple-50 hover:text-purple-600"
                          title="Edit service"
                        >
                          <Edit3 size={17} />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="rounded-lg bg-slate-50 p-2.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                          title="Delete service"
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
        {activeService && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="relative z-10 h-full w-full max-w-6xl overflow-y-auto bg-[#f8fafc] shadow-2xl"
            >
              <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600">Service workspace</p>
                    <h2 className="mt-1 text-2xl font-black text-slate-900">{activeService.title}</h2>
                  </div>
                  <button onClick={() => setActiveService(null)} className="rounded-lg bg-slate-50 p-2 text-slate-400 hover:text-slate-900">
                    <X size={22} />
                  </button>
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[330px,1fr]">
                <div className="border-b border-slate-100 bg-white p-5 md:p-8 lg:border-b-0 lg:border-r">
                  <div className="overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                    {activeService.image ? (
                      activeService.image.includes(".mp4") || activeService.image.startsWith("data:video") ? (
                        <video src={activeService.image} className="h-56 w-full object-cover" muted loop playsInline />
                      ) : (
                        <img src={activeService.image} alt={activeService.title} className="h-56 w-full object-cover" />
                      )
                    ) : (
                      <div className="flex h-56 w-full items-center justify-center text-purple-200">
                        <Layers size={54} />
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Status</label>
                      <select
                        value={activeService.status || "active"}
                        onChange={(e) => saveServicePatch(activeService, { status: e.target.value })}
                        className="w-full rounded-lg border border-slate-100 bg-white px-3 py-3 text-sm font-black text-slate-700 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-purple-100 bg-purple-50 p-4">
                      <input
                        type="checkbox"
                        checked={Boolean(activeService.featured)}
                        onChange={(e) => saveServicePatch(activeService, { featured: e.target.checked })}
                        className="h-5 w-5 rounded border-purple-300 text-purple-600 focus:ring-purple-200"
                      />
                      <span className="text-sm font-black text-purple-700">Featured service</span>
                    </label>

                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                      <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-400">
                        <span>Checklist</span>
                        <span>{getChecklistProgress(activeService)}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white">
                        <div className="h-full rounded-full bg-purple-600 transition-all" style={{ width: `${getChecklistProgress(activeService)}%` }} />
                      </div>
                    </div>

                    <div className="space-y-3 text-sm font-bold text-slate-500">
                      <div className="flex items-center gap-2">
                        <PackageCheck size={16} className="text-slate-300" />
                        <span>{activeService.priceFrom || "No price set"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-slate-300" />
                        <span>{activeService.timeline || "No timeline set"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-slate-300" />
                        <span>{activeService.targetAudience || "No audience set"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-5 md:p-8">
                  {workspaceLoading && (
                    <div className="rounded-lg border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-black text-purple-700">
                      Saving changes...
                    </div>
                  )}

                  <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="flex items-center gap-2 text-lg font-black text-slate-900">
                          <FileText size={20} className="text-purple-600" />
                          Offer Details
                        </h3>
                        <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                          {activeService.description || "No long description added yet."}
                        </p>
                      </div>
                      <button onClick={() => openModal(activeService)} className="rounded-lg bg-slate-50 p-2.5 text-slate-400 hover:bg-purple-50 hover:text-purple-600">
                        <Edit3 size={17} />
                      </button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="rounded-lg border border-slate-100 p-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Slug</p>
                        <p className="mt-1 break-words font-black text-slate-900">/{activeService.slug}</p>
                      </div>
                      <div className="rounded-lg border border-slate-100 p-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price</p>
                        <p className="mt-1 font-black text-slate-900">{activeService.priceFrom || "Not set"}</p>
                      </div>
                      <div className="rounded-lg border border-slate-100 p-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Timeline</p>
                        <p className="mt-1 font-black text-slate-900">{activeService.timeline || "Not set"}</p>
                      </div>
                    </div>
                  </section>

                  <div className="grid gap-6 xl:grid-cols-2">
                    <ArrayEditor
                      title="Features"
                      icon={Layers}
                      items={activeService.features || []}
                      emptyText="No features added yet."
                      fields={[
                        { name: "title", placeholder: "Feature title" },
                        { name: "description", placeholder: "Feature description", type: "textarea" },
                      ]}
                      onAdd={(item) => updateServiceArray("features", [...(activeService.features || []), { ...item, bullets: [] }])}
                      onUpdate={(index, item) => {
                        const next = [...(activeService.features || [])];
                        next[index] = item;
                        updateServiceArray("features", next);
                      }}
                      onDelete={(index) => updateServiceArray("features", (activeService.features || []).filter((_, itemIndex) => itemIndex !== index))}
                    />

                    <ArrayEditor
                      title="Benefits"
                      icon={Sparkles}
                      items={activeService.benefits || []}
                      emptyText="No benefits added yet."
                      fields={[
                        { name: "title", placeholder: "Benefit title" },
                        { name: "content", placeholder: "Benefit content", type: "textarea" },
                      ]}
                      onAdd={(item) => updateServiceArray("benefits", [...(activeService.benefits || []), item])}
                      onUpdate={(index, item) => {
                        const next = [...(activeService.benefits || [])];
                        next[index] = item;
                        updateServiceArray("benefits", next);
                      }}
                      onDelete={(index) => updateServiceArray("benefits", (activeService.benefits || []).filter((_, itemIndex) => itemIndex !== index))}
                    />
                  </div>

                  <ArrayEditor
                    title="Process"
                    icon={PackageCheck}
                    items={activeService.process || []}
                    emptyText="No process steps added yet."
                    fields={[
                      { name: "step", placeholder: "Step number, e.g. 1" },
                      { name: "title", placeholder: "Process title" },
                      { name: "description", placeholder: "Process description", type: "textarea" },
                    ]}
                    onAdd={(item) => updateServiceArray("process", [...(activeService.process || []), item])}
                    onUpdate={(index, item) => {
                      const next = [...(activeService.process || [])];
                      next[index] = item;
                      updateServiceArray("process", next);
                    }}
                    onDelete={(index) => updateServiceArray("process", (activeService.process || []).filter((_, itemIndex) => itemIndex !== index))}
                  />

                  <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
                      <ListChecks size={20} className="text-purple-600" />
                      Setup Checklist
                    </h3>

                    <div className="flex gap-2">
                      <input
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddTask(activeService);
                        }}
                        placeholder="Add setup task, e.g. Create pricing block"
                        className="flex-1 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                      />
                      <button onClick={() => handleAddTask(activeService)} className="rounded-lg bg-purple-600 px-4 py-3 text-sm font-black text-white hover:bg-purple-700">
                        <Plus size={18} />
                      </button>
                    </div>

                    <div className="mt-4 space-y-2">
                      {(activeService.checklist || []).length === 0 ? (
                        <p className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-sm font-bold text-slate-400">
                          No checklist tasks yet.
                        </p>
                      ) : (
                        activeService.checklist.map((task, index) => (
                          <div key={task._id || `${task.title}-${index}`} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
                            <button
                              onClick={() => handleToggleTask(activeService, task, index)}
                              className={`shrink-0 ${task.done ? "text-emerald-600" : "text-slate-300 hover:text-purple-600"}`}
                            >
                              {task.done ? <CheckCircle2 size={21} /> : <Circle size={21} />}
                            </button>
                            <span className={`flex-1 text-sm font-bold ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                              {task.title}
                            </span>
                            <button onClick={() => handleDeleteTask(activeService, task, index)} className="text-slate-300 hover:text-red-500">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </section>

                  <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
                      <StickyNote size={20} className="text-purple-600" />
                      Internal Notes
                    </h3>

                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Write service idea, package change, client objection, or reminder"
                      className="min-h-[110px] w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => handleAddNote(activeService)}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-black text-white hover:bg-purple-600"
                      >
                        <Check size={16} />
                        Save Note
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      {(activeService.internalNotes || []).length === 0 ? (
                        <p className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-sm font-bold text-slate-400">
                          No notes saved yet.
                        </p>
                      ) : (
                        activeService.internalNotes.map((note, index) => (
                          <div key={note._id || `${note.createdAt}-${index}`} className="rounded-lg border border-slate-100 p-4">
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <p className="text-xs font-black uppercase tracking-widest text-slate-400">{formatDate(note.createdAt)}</p>
                              <button onClick={() => handleDeleteNote(activeService, note, index)} className="text-slate-300 hover:text-red-500">
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <p className="whitespace-pre-wrap text-sm font-medium leading-6 text-slate-600">{note.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </section>

                  <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="flex items-center gap-2 text-lg font-black text-slate-900">
                        <Paperclip size={20} className="text-purple-600" />
                        Resources
                      </h3>
                      <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-xs font-black text-white hover:bg-purple-700">
                        <UploadCloud size={16} />
                        Upload
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            handleResourceUpload(activeService, e.target.files);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </div>

                    {(activeService.resources || []).length === 0 ? (
                      <p className="rounded-lg border border-dashed border-slate-200 py-8 text-center text-sm font-bold text-slate-400">
                        No service resources uploaded yet.
                      </p>
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {activeService.resources.map((resource, index) => (
                          <div key={resource._id || `${resource.name}-${index}`} className="rounded-lg border border-slate-100 p-3">
                            {resource.kind === "image" && (
                              <img src={resource.url} alt={resource.name} className="mb-3 h-36 w-full rounded-lg object-cover" />
                            )}
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-purple-600">
                                {resource.kind === "image" ? <ImageIcon size={18} /> : <Paperclip size={18} />}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-black text-slate-800">{resource.name}</p>
                                <p className="text-xs font-bold text-slate-400">{formatFileSize(resource.size)}</p>
                              </div>
                              <a href={resource.url} download={resource.name} className="text-slate-300 hover:text-purple-600">
                                <Download size={17} />
                              </a>
                              <button onClick={() => handleDeleteResource(activeService, resource, index)} className="text-slate-300 hover:text-red-500">
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
                    {editingService ? "Edit service" : "New service"}
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    {editingService ? "Update Service" : "Create Service"}
                  </h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="rounded-lg bg-slate-50 p-2 text-slate-400 hover:text-slate-900">
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Service Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setFormData({ ...formData, title, slug: editingService ? formData.slug : slugify(title) });
                      }}
                      className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                      placeholder="Website Development"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Slug</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                      className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                      placeholder="website-development"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
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
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Starting Price</label>
                    <input
                      type="text"
                      value={formData.priceFrom}
                      onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
                      className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                      placeholder="From ৳25,000"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Timeline</label>
                    <input
                      type="text"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                      placeholder="7-14 days"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Target Audience</label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                    placeholder="Small businesses, ecommerce brands, startups"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Short Description</label>
                  <textarea
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="min-h-[95px] w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                    placeholder="One clean summary for cards and listings..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Full Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[140px] w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                    placeholder="Offer detail, what is included, why it matters..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Image or Video</label>
                  <div className="grid gap-3 md:grid-cols-[1fr,150px]">
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full rounded-lg border border-slate-100 bg-slate-50 py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                        placeholder="Image/video URL or upload"
                      />
                    </div>
                    <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-black text-slate-600 hover:bg-purple-50 hover:text-purple-700">
                      <UploadCloud size={17} />
                      Upload
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => {
                          handleImageUpload(e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </div>
                  {formData.image && (
                    formData.image.includes(".mp4") || formData.image.startsWith("data:video") ? (
                      <video src={formData.image} className="mt-3 h-40 w-full rounded-lg border border-slate-100 object-cover" muted playsInline />
                    ) : (
                      <img src={formData.image} alt="Service preview" className="mt-3 h-40 w-full rounded-lg border border-slate-100 object-cover" />
                    )
                  )}
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-purple-100 bg-purple-50 p-4">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-5 w-5 rounded border-purple-300 text-purple-600 focus:ring-purple-200"
                  />
                  <span className="text-sm font-black text-purple-700">Mark as featured service</span>
                </label>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 py-4 text-sm font-black text-white shadow-xl shadow-purple-100 transition-all hover:bg-purple-700 disabled:opacity-70"
                >
                  {formLoading ? <Loader2 className="animate-spin" size={20} /> : editingService ? "Save Changes" : "Create Service"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
