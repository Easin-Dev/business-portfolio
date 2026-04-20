"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Image as ImageIcon,
  Loader2,
  LockKeyhole,
  Paperclip,
  Send,
  UploadCloud,
} from "lucide-react";
import { motion } from "framer-motion";

const MAX_FILE_SIZE = 2.5 * 1024 * 1024;

const stageLabels = {
  requirements: "Requirements",
  planning: "Planning",
  design: "Design",
  development: "Development",
  review: "Review",
  revision: "Revision",
  delivery: "Delivery",
  completed: "Completed",
};

const requirementStatus = {
  requested: "Requested",
  submitted: "Submitted",
  approved: "Approved",
  needs_changes: "Needs changes",
};

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

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getStatusClasses(status) {
  if (status === "approved") return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (status === "submitted") return "bg-blue-50 text-blue-700 border-blue-100";
  if (status === "needs_changes") return "bg-amber-50 text-amber-700 border-amber-100";
  return "bg-slate-50 text-slate-600 border-slate-100";
}

export default function ClientPortalPage() {
  const params = useParams();
  const hash = params.hash;
  const [portal, setPortal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [drafts, setDrafts] = useState({});

  useEffect(() => {
    fetchPortal();
  }, [hash]);

  const fetchPortal = async () => {
    try {
      const res = await fetch(`/api/client-portals/${hash}`);
      if (!res.ok) throw new Error("Portal not found");
      const data = await res.json();
      setPortal(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const progress = useMemo(() => {
    if (!portal?.requirements?.length) return { done: 0, total: 0, percent: 0 };
    const done = portal.requirements.filter((item) => item.status === "submitted" || item.status === "approved").length;
    return {
      done,
      total: portal.requirements.length,
      percent: Math.round((done / portal.requirements.length) * 100),
    };
  }, [portal]);

  const updateDraft = (requirementId, patch) => {
    setDrafts((current) => ({
      ...current,
      [requirementId]: {
        clientResponse: current[requirementId]?.clientResponse || "",
        attachments: current[requirementId]?.attachments || [],
        ...patch,
      },
    }));
  };

  const handleUpload = async (requirementId, files) => {
    const selectedFiles = Array.from(files || []);
    if (!selectedFiles.length) return;

    const oversizedFile = selectedFiles.find((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFile) {
      alert(`${oversizedFile.name} is too large. Please keep files under 2.5 MB each.`);
      return;
    }

    const attachments = await Promise.all(
      selectedFiles.map(async (file) => ({
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        url: await readFileAsDataUrl(file),
        kind: file.type.startsWith("image/") ? "image" : "file",
        addedAt: new Date().toISOString(),
      }))
    );

    updateDraft(requirementId, {
      attachments: [...(drafts[requirementId]?.attachments || []), ...attachments],
    });
  };

  const removeDraftAttachment = (requirementId, index) => {
    updateDraft(requirementId, {
      attachments: (drafts[requirementId]?.attachments || []).filter((_, itemIndex) => itemIndex !== index),
    });
  };

  const submitRequirement = async (requirement) => {
    const draft = drafts[requirement._id] || {};
    const clientResponse = draft.clientResponse ?? requirement.clientResponse ?? "";
    const attachments = draft.attachments?.length ? draft.attachments : requirement.attachments || [];

    if (!clientResponse.trim() && attachments.length === 0) {
      alert("Please write a response or upload a file first.");
      return;
    }

    setSavingId(requirement._id);

    try {
      const res = await fetch(`/api/client-portals/${hash}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit_requirement",
          requirementId: requirement._id,
          clientResponse,
          attachments,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Could not submit this item");
        return;
      }

      setPortal(data);
      setDrafts((current) => ({ ...current, [requirement._id]: { clientResponse: "", attachments: [] } }));
    } catch (err) {
      console.error(err);
      alert("Could not submit this item");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!portal) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md rounded-lg border border-slate-100 bg-white p-10 text-center shadow-sm">
          <LockKeyhole className="mx-auto mb-5 text-red-400" size={48} />
          <h1 className="text-2xl font-black text-slate-900">Portal not found</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">This client portal link is invalid or no longer available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600">ScaleUp Client Portal</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{portal.projectTitle}</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              Hi {portal.clientName || "there"}, submit requested information and files here so we can move the project forward.
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Step</p>
            <p className="mt-1 text-sm font-black text-slate-900">{stageLabels[portal.progressStage] || "Project Active"}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-5 py-8 lg:grid-cols-[1fr,320px]">
        <div className="space-y-6">
          <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between text-xs font-black text-slate-400">
              <span>Required items submitted</span>
              <span>{progress.done}/{progress.total}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-purple-600 transition-all" style={{ width: `${progress.percent}%` }} />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-500">
              Project progress: <span className="font-black text-slate-900">{portal.progressPercent}%</span>
            </p>
          </section>

          <section className="space-y-4">
            {(portal.requirements || []).map((requirement, index) => {
              const draft = drafts[requirement._id] || {};
              const attachments = draft.attachments?.length ? draft.attachments : requirement.attachments || [];

              return (
                <motion.div
                  key={requirement._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="flex items-center gap-2 text-lg font-black text-slate-900">
                        {requirement.type === "image" ? <ImageIcon size={19} className="text-purple-600" /> : <FileText size={19} className="text-purple-600" />}
                        {requirement.title}
                      </h2>
                      <p className="mt-1 text-sm font-medium leading-6 text-slate-500">{requirement.description}</p>
                    </div>
                    <span className={`rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getStatusClasses(requirement.status)}`}>
                      {requirementStatus[requirement.status] || "Requested"}
                    </span>
                  </div>

                  {requirement.adminNote && (
                    <div className="mb-4 rounded-lg border border-amber-100 bg-amber-50 p-3 text-sm font-semibold text-amber-800">
                      <AlertCircle className="mr-2 inline" size={16} />
                      {requirement.adminNote}
                    </div>
                  )}

                  <textarea
                    value={draft.clientResponse ?? requirement.clientResponse ?? ""}
                    onChange={(e) => updateDraft(requirement._id, { clientResponse: e.target.value })}
                    placeholder="Write your answer, access instructions, links, notes, or explanation here..."
                    className="min-h-[120px] w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none transition-all focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                  />

                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-black text-slate-600 hover:bg-purple-50 hover:text-purple-700">
                      <UploadCloud size={17} />
                      Upload files
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          handleUpload(requirement._id, e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>

                    <button
                      onClick={() => submitRequirement(requirement)}
                      disabled={savingId === requirement._id}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-purple-100 hover:bg-purple-700 disabled:opacity-70"
                    >
                      {savingId === requirement._id ? <Loader2 className="animate-spin" size={18} /> : <Send size={17} />}
                      Submit Item
                    </button>
                  </div>

                  {attachments.length > 0 && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {attachments.map((attachment, attachmentIndex) => (
                        <div key={`${attachment.name}-${attachmentIndex}`} className="rounded-lg border border-slate-100 p-3">
                          {attachment.kind === "image" && (
                            <img src={attachment.url} alt={attachment.name} className="mb-3 h-32 w-full rounded-lg object-cover" />
                          )}
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-purple-600">
                              <Paperclip size={17} />
                            </div>
                            <p className="min-w-0 flex-1 truncate text-sm font-black text-slate-700">{attachment.name}</p>
                            {draft.attachments?.length > 0 ? (
                              <button
                                onClick={() => removeDraftAttachment(requirement._id, attachmentIndex)}
                                className="text-xs font-black text-red-500"
                              >
                                Remove
                              </button>
                            ) : (
                              <a href={attachment.url} download={attachment.name} className="text-slate-300 hover:text-purple-600">
                                <Download size={17} />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-black text-slate-900">Payment</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500">Total</span>
                <span className="font-black text-slate-900">{formatMoney(portal.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500">Advance paid</span>
                <span className="font-black text-emerald-600">{formatMoney(portal.advancePaid)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3 text-sm">
                <span className="font-bold text-slate-500">Due</span>
                <span className="font-black text-red-500">{formatMoney(portal.dueAmount)}</span>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-black text-slate-900">Updates</h3>
            <div className="space-y-3">
              {(portal.updates || []).filter((update) => update.visibility === "client").length === 0 ? (
                <p className="text-sm font-medium text-slate-400">No updates yet.</p>
              ) : (
                (portal.updates || [])
                  .filter((update) => update.visibility === "client")
                  .slice(0, 6)
                  .map((update) => (
                    <div key={update._id} className="rounded-lg border border-slate-100 p-3">
                      <div className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Clock3 size={13} />
                        {formatDate(update.createdAt)}
                      </div>
                      <p className="font-black text-slate-800">{update.title}</p>
                      <p className="mt-1 text-sm font-medium leading-5 text-slate-500">{update.message}</p>
                    </div>
                  ))
              )}
            </div>
          </section>

          {portal.status === "completed" && (
            <section className="rounded-lg bg-emerald-600 p-5 text-white shadow-xl shadow-emerald-100">
              <CheckCircle2 className="mb-3" size={28} />
              <h3 className="text-xl font-black">Project Complete</h3>
              <p className="mt-2 text-sm font-medium text-emerald-50">This project has been marked as completed.</p>
            </section>
          )}
        </aside>
      </main>
    </div>
  );
}
