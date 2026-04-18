"use client";
import React, { useEffect, useState } from "react";
import { Mail, Phone, Calendar, Trash2, CheckCircle, Clock, ExternalLink, Search, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error("Error fetching leads:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => 
    lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.budget.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Project Inquiries</h1>
        <p className="text-gray-400">Manage your incoming leads and project requests.</p>
      </div>

      <div className="bg-[#0c0f14] border border-white/5 rounded-[40px] overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <div className="relative group max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all text-sm"
            />
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredLeads.map((lead, index) => (
              <motion.div
                key={lead._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:border-purple-500/30 transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-600/20">
                      {lead.fullName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">{lead.fullName}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar size={12} /> {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                      {lead.status || 'New'}
                    </span>
                    <span className="text-xs font-semibold text-purple-400">{lead.budget}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Mail size={16} className="text-gray-600" />
                    <span>{lead.email}</span>
                  </div>
                  {lead.whatsapp && (
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Phone size={16} className="text-gray-600" />
                      <span>{lead.whatsapp}</span>
                    </div>
                  )}
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-gray-300 leading-relaxed italic line-clamp-3">"{lead.details}"</p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-3 rounded-xl transition-all border border-white/5">
                    Mark Contacted
                  </button>
                  <button className="p-3 bg-red-500/5 hover:bg-red-500/10 text-red-500 rounded-xl transition-all border border-red-500/10">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredLeads.length === 0 && !loading && (
          <div className="p-20 text-center">
            <MessageSquare className="mx-auto text-gray-700 mb-4" size={48} />
            <div className="text-gray-500 italic">No inquiries found.</div>
          </div>
        )}

        {loading && (
          <div className="p-20 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        )}
      </div>
    </div>
  );
}
