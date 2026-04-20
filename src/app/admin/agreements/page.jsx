"use client";
import React, { useState, useEffect } from "react";
import { Plus, Search, FileText, Trash2, ExternalLink, Link as LinkIcon, CheckCircle, Clock, Copy, Check, FolderKanban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";

export default function AdminAgreements() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [portalLoadingId, setPortalLoadingId] = useState(null);

  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    try {
      const res = await fetch("/api/agreements");
      const data = await res.json();
      setAgreements(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure? This will permanently delete the agreement.")) return;
    try {
      const res = await fetch(`/api/agreements/${id}`, { method: "DELETE" });
      if (res.ok) fetchAgreements();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const copyLink = (hash) => {
    const url = `${window.location.origin}/agreement/${hash}`;
    navigator.clipboard.writeText(url);
    setCopiedId(hash);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const createPortal = async (agreementId) => {
    setPortalLoadingId(agreementId);

    try {
      const res = await fetch("/api/client-portals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agreementId }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Could not create portal");
        return;
      }

      window.location.href = "/admin/client-portals";
    } catch (err) {
      console.error("Portal Error:", err);
      alert("Could not create portal");
    } finally {
      setPortalLoadingId(null);
    }
  };

  const filteredAgreements = Array.isArray(agreements) ? agreements.filter(a => 
    (a.clientName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.projectTitle || "").toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Agreements</h1>
          <p className="text-slate-500 mt-1 font-medium">Draft and track your project contracts.</p>
        </div>
        <Link 
          href="/admin/agreements/new"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition-all font-bold shadow-lg shadow-purple-200"
        >
          <Plus size={20} />
          Draft Agreement
        </Link>
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={18} />
        <input
          type="text"
          placeholder="Search by client or project..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-medium"
        />
      </div>

      {/* List */}
      <div className="grid gap-4">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-32 bg-white rounded-3xl animate-pulse border border-gray-100" />)
        ) : filteredAgreements.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
            <FileText size={40} className="mx-auto mb-4 opacity-10 text-slate-900" />
            <p className="text-slate-400 font-bold">No agreements drafted yet.</p>
          </div>
        ) : (
          filteredAgreements.map((agreement, index) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={agreement._id}
              className="bg-white border border-gray-100 p-6 rounded-[32px] hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    agreement.status === "signed" ? "bg-green-50 text-green-600" : "bg-purple-50 text-purple-600"
                  }`}>
                    {agreement.status === "signed" ? <CheckCircle size={28} /> : <Clock size={28} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{agreement.projectTitle}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {agreement.clientName || "Awaiting Client"} • ৳{agreement.price}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    onClick={() => copyLink(agreement.uniqueHash)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all font-bold text-xs"
                  >
                    {copiedId === agreement.uniqueHash ? <Check size={14} /> : <LinkIcon size={14} />}
                    {copiedId === agreement.uniqueHash ? "Copied" : "Copy Link"}
                  </button>

                  {agreement.status === "signed" && (
                    <button
                      onClick={() => createPortal(agreement._id)}
                      disabled={portalLoadingId === agreement._id}
                      className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all font-bold text-xs disabled:opacity-70"
                    >
                      {portalLoadingId === agreement._id ? <Clock size={14} /> : <FolderKanban size={14} />}
                      Portal
                    </button>
                  )}
                  
                  <Link 
                    href={`/agreement/${agreement.uniqueHash}`}
                    target="_blank"
                    className="p-2.5 bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <ExternalLink size={18} />
                  </Link>

                  <button 
                    onClick={() => handleDelete(agreement._id)}
                    className="p-2.5 bg-slate-50 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {agreement.status === "signed" && (
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Successfully Signed on {new Date(agreement.signedAt).toLocaleDateString()}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
