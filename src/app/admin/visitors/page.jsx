"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  Globe2,
  Mail,
  Monitor,
  Phone,
  Search,
  Smartphone,
  Tablet,
  Trash2,
  UserRound,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAlert } from "@/app/component/AlertProvider";

function formatDate(value) {
  if (!value) return "Unknown";
  return new Date(value).toLocaleString();
}

function DeviceIcon({ type }) {
  if (type === "Mobile") return <Smartphone size={16} />;
  if (type === "Tablet") return <Tablet size={16} />;
  return <Monitor size={16} />;
}

export default function VisitorsPage() {
  const { toast, confirm } = useAlert();
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch("/api/visitors");
        const data = await res.json();
        setVisitors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching visitors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  const filteredVisitors = useMemo(() => {
    const query = searchTerm.toLowerCase();
    if (!query) return visitors;

    return visitors.filter((visitor) => {
      const searchable = [
        visitor.ipAddress,
        visitor.lastPage,
        visitor.landingPage,
        visitor.deviceType,
        visitor.lead?.fullName,
        visitor.lead?.email,
        visitor.lead?.phone,
        ...(visitor.pageViews || []).map((view) => view.path),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [searchTerm, visitors]);

  const knownLeads = visitors.filter((visitor) => visitor.lead?.email).length;

  const deleteVisitorIp = async (visitor) => {
    const ok = await confirm({
      type: "warning",
      title: "Delete this visitor IP?",
      message: `This will delete all visitor records for ${visitor.ipAddress || "Unknown IP"}.`,
      confirmText: "Delete Visitor",
    });

    if (!ok) return;

    try {
      const res = await fetch(`/api/visitors?ipAddress=${encodeURIComponent(visitor.ipAddress || "")}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast({ type: "error", title: "Delete failed", message: data.error || "Could not delete visitor" });
        return;
      }

      setVisitors((current) => current.filter((item) => item.ipAddress !== visitor.ipAddress));
      toast({ type: "success", title: "Visitor deleted", message: `${data.deletedCount || 0} record(s) removed.` });
    } catch (error) {
      console.error("Error deleting visitor:", error);
      toast({ type: "error", title: "Delete failed", message: "Could not delete visitor" });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-black tracking-tight text-slate-900">Visitor Intelligence</h1>
          <p className="max-w-2xl text-sm font-medium leading-6 text-slate-500">
            Track anonymous page visits by IP and connect submitted contact details when a visitor becomes a lead.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:min-w-72">
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visitors</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{visitors.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Known Leads</p>
            <p className="mt-2 text-3xl font-black text-purple-600">{knownLeads}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[36px] border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search IP, page, name, email, phone..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm font-medium text-slate-700 outline-none transition-all focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 lg:grid-cols-2">
          <AnimatePresence>
            {filteredVisitors.map((visitor, index) => {
              const latestPages = [...(visitor.pageViews || [])].slice(0, 4);

              return (
                <motion.article
                  key={visitor._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="rounded-3xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-purple-200 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-200">
                        {visitor.lead?.fullName ? <UserRound size={20} /> : <Globe2 size={20} />}
                      </div>
                      <div>
                        <h2 className="font-black text-slate-900">
                          {visitor.lead?.fullName || "Anonymous Visitor"}
                        </h2>
                        <p className="mt-1 text-xs font-bold text-slate-400">{visitor.ipAddress || "Unknown IP"}</p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-purple-700">
                        {visitor.visitCount || 1} visits
                      </span>
                      <button
                        onClick={() => deleteVisitorIp(visitor)}
                        className="rounded-full border border-red-100 bg-red-50 p-2 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {visitor.lead?.email && (
                    <div className="mt-5 grid gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm font-semibold text-emerald-900">
                      <div className="flex items-center gap-2">
                        <Mail size={15} />
                        <span className="break-all">{visitor.lead.email}</span>
                      </div>
                      {visitor.lead.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={15} />
                          <span>{visitor.lead.phone}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-5 grid gap-3 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-3">
                      <DeviceIcon type={visitor.deviceType} />
                      <span>{visitor.deviceType || "Unknown device"} {visitor.screen ? `- ${visitor.screen}` : ""}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <UserRound size={16} />
                      <span>{visitor.sessionCount || 1} session{Number(visitor.sessionCount || 1) > 1 ? "s" : ""} from this IP</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={16} />
                      <span>First seen: {formatDate(visitor.firstSeenAt || visitor.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={16} />
                      <span>Last seen: {formatDate(visitor.lastSeenAt || visitor.updatedAt)}</span>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
                    <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Recent Pages</p>
                    <div className="space-y-2">
                      {latestPages.length > 0 ? (
                        latestPages.map((view, viewIndex) => (
                          <div key={`${view.path}-${viewIndex}`} className="flex items-center justify-between gap-3 text-xs font-bold text-slate-500">
                            <span className="truncate">{view.path || "/"}</span>
                            <span className="shrink-0 text-slate-400">{new Date(view.visitedAt).toLocaleDateString()}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs font-semibold text-slate-400">{visitor.lastPage || visitor.landingPage || "/"}</p>
                      )}
                    </div>
                  </div>

                  {(visitor.sessions || []).length > 1 && (
                    <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4">
                      <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Recent Sessions</p>
                      <div className="space-y-2">
                        {visitor.sessions.slice(0, 3).map((session, sessionIndex) => (
                          <div key={`${session.visitorId}-${sessionIndex}`} className="flex items-center justify-between gap-3 text-xs font-bold text-slate-500">
                            <span className="truncate">{session.deviceType || "Unknown"} {session.screen ? `- ${session.screen}` : ""}</span>
                            <span className="shrink-0 text-slate-400">{formatDate(session.lastSeenAt)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredVisitors.length === 0 && !loading && (
          <div className="px-6 py-20 text-center">
            <Globe2 className="mx-auto mb-4 text-slate-300" size={48} />
            <p className="font-bold text-slate-500">No visitor data found.</p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center p-20">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-purple-600" />
          </div>
        )}
      </div>
    </div>
  );
}
