"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Download,
  Edit3,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Mail,
  Paperclip,
  Plus,
  Search,
  Send,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAlert } from "@/app/component/AlertProvider";

const stageOptions = ["requirements", "planning", "design", "development", "review", "revision", "delivery", "completed"];
const statusOptions = ["active", "waiting_client", "in_progress", "completed", "paused"];
const requirementTypes = ["text", "file", "image", "url", "access"];
const requirementStatuses = ["requested", "submitted", "approved", "needs_changes"];

function formatMoney(amount = 0) {
  return `৳${Number(amount || 0).toLocaleString()}`;
}

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusClasses(status) {
  if (status === "completed" || status === "approved") return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (status === "submitted" || status === "in_progress") return "bg-blue-50 text-blue-700 border-blue-100";
  if (status === "waiting_client" || status === "needs_changes") return "bg-amber-50 text-amber-700 border-amber-100";
  if (status === "paused") return "bg-red-50 text-red-700 border-red-100";
  return "bg-slate-50 text-slate-600 border-slate-100";
}

export default function AdminClientPortals() {
  const { toast, confirm } = useAlert();
  const [portals, setPortals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePortal, setActivePortal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [copiedHash, setCopiedHash] = useState(null);
  const [requirementDraft, setRequirementDraft] = useState({
    title: "",
    description: "",
    type: "text",
  });
  const [paymentDraft, setPaymentDraft] = useState({
    label: "Advance payment",
    amount: "",
    note: "",
  });
  const [updateDraft, setUpdateDraft] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    fetchPortals();
  }, []);

  const fetchPortals = async () => {
    try {
      const res = await fetch("/api/client-portals");
      const data = await res.json();
      const nextPortals = Array.isArray(data) ? data : [];
      setPortals(nextPortals);
      setActivePortal((current) => {
        if (!current) return null;
        return nextPortals.find((portal) => portal._id === current._id) || null;
      });
    } catch (err) {
      console.error("Error fetching portals:", err);
    } finally {
      setLoading(false);
    }
  };

  const summary = useMemo(() => {
    const waiting = portals.filter((portal) => portal.status === "waiting_client").length;
    const completed = portals.filter((portal) => portal.status === "completed").length;
    const due = portals.reduce((sum, portal) => sum + Number(portal.dueAmount || 0), 0);
    return { total: portals.length, waiting, completed, due };
  }, [portals]);

  const filteredPortals = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return portals.filter((portal) =>
      portal.projectTitle?.toLowerCase().includes(term) ||
      portal.clientName?.toLowerCase().includes(term) ||
      portal.clientEmail?.toLowerCase().includes(term)
    );
  }, [portals, searchTerm]);

  const updateLocalPortal = (updatedPortal) => {
    setPortals((current) => current.map((portal) => (portal._id === updatedPortal._id ? updatedPortal : portal)));
    setActivePortal((current) => (current?._id === updatedPortal._id ? updatedPortal : current));
  };

  const savePortalPatch = async (portal, patch, options = {}) => {
    setSaving(true);

    try {
      const res = await fetch(`/api/client-portals/${portal._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();

      if (!res.ok) {
        toast({ type: "error", title: "Update failed", message: data.error || "Could not update portal" });
        return null;
      }

      updateLocalPortal(data);
      if (options.successTitle) {
        toast({ type: "success", title: options.successTitle });
      }
      return data;
    } catch (err) {
      console.error("Error updating portal:", err);
      toast({ type: "error", title: "Update failed", message: "Could not update portal" });
      return null;
    } finally {
      setSaving(false);
    }
  };

  const copyPortalLink = (portal) => {
    const url = `${window.location.origin}/client-portal/${portal.portalHash}`;
    navigator.clipboard.writeText(url);
    setCopiedHash(portal.portalHash);
    toast({ type: "success", title: "Portal link copied" });
    setTimeout(() => setCopiedHash(null), 1800);
  };

  const deletePortal = async (portal) => {
    const ok = await confirm({
      type: "warning",
      title: "Delete this client portal?",
      message: `This will permanently delete "${portal.projectTitle}" from client portals. The signed agreement will stay untouched.`,
      confirmText: "Delete Portal",
    });

    if (!ok) return;

    try {
      const res = await fetch(`/api/client-portals/${portal._id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast({ type: "error", title: "Delete failed", message: data.error || "Could not delete portal" });
        return;
      }

      setPortals((current) => current.filter((item) => item._id !== portal._id));
      setActivePortal((current) => (current?._id === portal._id ? null : current));
      toast({ type: "success", title: "Client portal deleted" });
    } catch (error) {
      console.error("Error deleting portal:", error);
      toast({ type: "error", title: "Delete failed", message: "Could not delete portal" });
    }
  };

  const addRequirement = async () => {
    if (!requirementDraft.title.trim()) return;

    const requirements = [
      ...(activePortal.requirements || []),
      {
        ...requirementDraft,
        status: "requested",
        requestedAt: new Date().toISOString(),
        clientResponse: "",
        adminNote: "",
        attachments: [],
      },
    ];

    const updated = await savePortalPatch(
      activePortal,
      {
        requirements,
        status: "waiting_client",
      },
      { successTitle: "Requirement added" }
    );

    if (updated) {
      setRequirementDraft({ title: "", description: "", type: "text" });
    }
  };

  const updateRequirement = async (index, patch) => {
    const requirements = [...(activePortal.requirements || [])];
    requirements[index] = {
      ...requirements[index],
      ...patch,
      reviewedAt: patch.status === "approved" || patch.status === "needs_changes" ? new Date().toISOString() : requirements[index].reviewedAt,
    };
    await savePortalPatch(activePortal, { requirements });
  };

  const deleteRequirement = async (index) => {
    const requirements = (activePortal.requirements || []).filter((_, itemIndex) => itemIndex !== index);
    await savePortalPatch(activePortal, { requirements });
  };

  const addPayment = async () => {
    if (!paymentDraft.amount) return;

    const updated = await savePortalPatch(
      activePortal,
      {
        action: "add_payment",
        label: paymentDraft.label,
        amount: Number(paymentDraft.amount),
        note: paymentDraft.note,
      },
      { successTitle: "Payment added" }
    );

    if (updated) {
      setPaymentDraft({ label: "Payment", amount: "", note: "" });
    }
  };

  const sendClientUpdate = async () => {
    if (!updateDraft.title.trim() || !updateDraft.message.trim()) return;

    const updated = await savePortalPatch(
      activePortal,
      {
        action: "notify_client",
        title: updateDraft.title,
        message: updateDraft.message,
      },
      { successTitle: "Client update sent" }
    );

    if (updated) {
      setUpdateDraft({ title: "", message: "" });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-purple-600">Delivery portal</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Client Portals</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
            Manage signed client projects, request materials, track payment, send updates, and complete delivery.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Portals", value: summary.total, icon: FileText },
          { label: "Waiting", value: summary.waiting, icon: UserRound },
          { label: "Completed", value: summary.completed, icon: CheckCircle2 },
          { label: "Due", value: formatMoney(summary.due), icon: CreditCard },
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

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by client, email, or project"
          className="w-full rounded-lg border border-slate-100 bg-white py-4 pl-12 pr-4 text-sm font-semibold text-slate-700 shadow-sm outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
        />
      </div>

      <div className="grid gap-5">
        {loading ? (
          [1, 2, 3].map((item) => <div key={item} className="h-44 animate-pulse rounded-lg bg-white" />)
        ) : filteredPortals.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-white py-20 text-center">
            <FileText size={42} className="mx-auto mb-4 text-slate-200" />
            <p className="font-black text-slate-500">No client portals yet.</p>
          </div>
        ) : (
          filteredPortals.map((portal, index) => {
            const submitted = (portal.requirements || []).filter((item) => item.status === "submitted" || item.status === "approved").length;
            const total = (portal.requirements || []).length;
            const requiredPercent = total ? Math.round((submitted / total) * 100) : 0;

            return (
              <motion.div
                key={portal._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className={`rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getStatusClasses(portal.status)}`}>
                        {portal.status?.replace("_", " ")}
                      </span>
                      <span className="rounded-lg bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {portal.progressStage}
                      </span>
                    </div>
                    <h3 className="truncate text-2xl font-black text-slate-900">{portal.projectTitle}</h3>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {portal.clientName || "Client"} • {portal.clientEmail || "No email"}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Materials</p>
                      <p className="mt-1 font-black text-slate-900">{requiredPercent}%</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Progress</p>
                      <p className="mt-1 font-black text-slate-900">{portal.progressPercent}%</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Due</p>
                      <p className="mt-1 font-black text-red-500">{formatMoney(portal.dueAmount)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <button
                    onClick={() => setActivePortal(portal)}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-black text-white hover:bg-purple-600"
                  >
                    <Edit3 size={16} />
                    Manage Portal
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyPortalLink(portal)}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5 text-xs font-black text-slate-500 hover:bg-purple-50 hover:text-purple-700"
                    >
                      {copiedHash === portal.portalHash ? <CheckCircle2 size={15} /> : <LinkIcon size={15} />}
                      {copiedHash === portal.portalHash ? "Copied" : "Copy Link"}
                    </button>
                    <a
                      href={`/client-portal/${portal.portalHash}`}
                      target="_blank"
                      className="rounded-lg bg-slate-50 p-2.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <ExternalLink size={17} />
                    </a>
                    <button
                      onClick={() => deletePortal(portal)}
                      className="rounded-lg bg-red-50 p-2.5 text-red-400 hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <AnimatePresence>
        {activePortal && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePortal(null)}
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
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600">Client portal</p>
                    <h2 className="mt-1 text-2xl font-black text-slate-900">{activePortal.projectTitle}</h2>
                  </div>
                  <button onClick={() => setActivePortal(null)} className="rounded-lg bg-slate-50 p-2 text-slate-400 hover:text-slate-900">
                    <X size={22} />
                  </button>
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[330px,1fr]">
                <div className="border-b border-slate-100 bg-white p-5 md:p-8 lg:border-b-0 lg:border-r">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Status</label>
                      <select
                        value={activePortal.status || "waiting_client"}
                        onChange={(e) => savePortalPatch(activePortal, { status: e.target.value })}
                        className="w-full rounded-lg border border-slate-100 px-3 py-3 text-sm font-black outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>{status.replace("_", " ")}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Progress Stage</label>
                      <select
                        value={activePortal.progressStage || "requirements"}
                        onChange={(e) => savePortalPatch(activePortal, { progressStage: e.target.value })}
                        className="w-full rounded-lg border border-slate-100 px-3 py-3 text-sm font-black outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                      >
                        {stageOptions.map((stage) => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Progress Percent</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={activePortal.progressPercent || 0}
                        onChange={(e) => savePortalPatch(activePortal, { progressPercent: Number(e.target.value) })}
                        className="w-full rounded-lg border border-slate-100 px-3 py-3 text-sm font-black outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                      />
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                      <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-400">
                        <span>Progress</span>
                        <span>{activePortal.progressPercent || 0}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white">
                        <div className="h-full rounded-full bg-purple-600" style={{ width: `${activePortal.progressPercent || 0}%` }} />
                      </div>
                    </div>
                    <button
                      onClick={() => savePortalPatch(activePortal, { status: "completed", progressStage: "completed", progressPercent: 100 }, { successTitle: "Portal marked complete" })}
                      className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-black text-white hover:bg-emerald-700"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() => deletePortal(activePortal)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-black text-red-600 hover:bg-red-100"
                    >
                      <AlertTriangle size={16} />
                      Delete Portal
                    </button>
                  </div>
                </div>

                <div className="space-y-6 p-5 md:p-8">
                  {saving && (
                    <div className="rounded-lg border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-black text-purple-700">
                      Saving changes...
                    </div>
                  )}

                  <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
                      <CreditCard size={20} className="text-purple-600" />
                      Payment
                    </h3>
                    <div className="mb-4 grid gap-3 md:grid-cols-3">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total</p>
                        <p className="font-black text-slate-900">{formatMoney(activePortal.totalAmount)}</p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Paid</p>
                        <p className="font-black text-emerald-600">{formatMoney(activePortal.advancePaid)}</p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Due</p>
                        <p className="font-black text-red-500">{formatMoney(activePortal.dueAmount)}</p>
                      </div>
                    </div>
                    <div className="grid gap-2 md:grid-cols-[1fr,120px,1fr,auto]">
                      <input
                        value={paymentDraft.label}
                        onChange={(e) => setPaymentDraft({ ...paymentDraft, label: e.target.value })}
                        className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-300"
                        placeholder="Payment label"
                      />
                      <input
                        type="number"
                        value={paymentDraft.amount}
                        onChange={(e) => setPaymentDraft({ ...paymentDraft, amount: e.target.value })}
                        className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-300"
                        placeholder="Amount"
                      />
                      <input
                        value={paymentDraft.note}
                        onChange={(e) => setPaymentDraft({ ...paymentDraft, note: e.target.value })}
                        className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-300"
                        placeholder="Note"
                      />
                      <button onClick={addPayment} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-black text-white hover:bg-purple-700">
                        Add
                      </button>
                    </div>
                  </section>

                  <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
                      <Mail size={20} className="text-purple-600" />
                      Send Client Update
                    </h3>
                    <div className="grid gap-2">
                      <input
                        value={updateDraft.title}
                        onChange={(e) => setUpdateDraft({ ...updateDraft, title: e.target.value })}
                        className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-sm font-semibold outline-none focus:border-purple-300"
                        placeholder="Update title"
                      />
                      <textarea
                        value={updateDraft.message}
                        onChange={(e) => setUpdateDraft({ ...updateDraft, message: e.target.value })}
                        className="min-h-[95px] rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-sm font-semibold outline-none focus:border-purple-300"
                        placeholder="Message to client"
                      />
                      <button onClick={sendClientUpdate} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-black text-white hover:bg-purple-600">
                        <Send size={16} />
                        Send Email Update
                      </button>
                    </div>
                  </section>

                  <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
                      <FileText size={20} className="text-purple-600" />
                      Requirements
                    </h3>
                    <div className="mb-5 grid gap-2 md:grid-cols-[1fr,150px,auto]">
                      <input
                        value={requirementDraft.title}
                        onChange={(e) => setRequirementDraft({ ...requirementDraft, title: e.target.value })}
                        className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-300"
                        placeholder="New requirement title"
                      />
                      <select
                        value={requirementDraft.type}
                        onChange={(e) => setRequirementDraft({ ...requirementDraft, type: e.target.value })}
                        className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-300"
                      >
                        {requirementTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                      </select>
                      <button onClick={addRequirement} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-black text-white hover:bg-purple-700">
                        <Plus size={17} />
                      </button>
                      <textarea
                        value={requirementDraft.description}
                        onChange={(e) => setRequirementDraft({ ...requirementDraft, description: e.target.value })}
                        className="min-h-[80px] rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-300 md:col-span-3"
                        placeholder="Explain what the client should submit"
                      />
                    </div>

                    <div className="space-y-3">
                      {(activePortal.requirements || []).map((requirement, index) => (
                        <div key={requirement._id || index} className="rounded-lg border border-slate-100 p-4">
                          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                              <h4 className="font-black text-slate-900">{requirement.title}</h4>
                              <p className="mt-1 text-sm font-medium text-slate-500">{requirement.description}</p>
                            </div>
                            <select
                              value={requirement.status}
                              onChange={(e) => updateRequirement(index, { status: e.target.value })}
                              className={`rounded-lg border px-3 py-2 text-xs font-black outline-none ${getStatusClasses(requirement.status)}`}
                            >
                              {requirementStatuses.map((status) => <option key={status} value={status}>{status.replace("_", " ")}</option>)}
                            </select>
                          </div>

                          {requirement.clientResponse && (
                            <div className="mb-3 rounded-lg bg-slate-50 p-3">
                              <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Client response</p>
                              <p className="whitespace-pre-wrap text-sm font-medium text-slate-600">{requirement.clientResponse}</p>
                            </div>
                          )}

                          {(requirement.attachments || []).length > 0 && (
                            <div className="mb-3 grid gap-3 sm:grid-cols-2">
                              {requirement.attachments.map((attachment, attachmentIndex) => (
                                <div key={`${attachment.name}-${attachmentIndex}`} className="rounded-lg border border-slate-100 p-3">
                                  {attachment.kind === "image" && (
                                    <img src={attachment.url} alt={attachment.name} className="mb-3 h-32 w-full rounded-lg object-cover" />
                                  )}
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-purple-600">
                                      {attachment.kind === "image" ? <ImageIcon size={17} /> : <Paperclip size={17} />}
                                    </div>
                                    <p className="min-w-0 flex-1 truncate text-sm font-black text-slate-700">{attachment.name}</p>
                                    <a href={attachment.url} download={attachment.name} className="text-slate-300 hover:text-purple-600">
                                      <Download size={17} />
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <input
                              value={requirement.adminNote || ""}
                              onChange={(e) => updateRequirement(index, { adminNote: e.target.value })}
                              className="flex-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-purple-300"
                              placeholder="Admin note or change request"
                            />
                            <button onClick={() => deleteRequirement(index)} className="rounded-lg p-2.5 text-slate-300 hover:bg-red-50 hover:text-red-500">
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
