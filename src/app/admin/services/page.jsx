"use client";
import React, { useState, useEffect } from "react";
import { Plus, Search, Layers, Edit3, Trash2, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Agency Services</h1>
          <p className="text-gray-400 mt-1">Manage what you offer to your clients.</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl transition-all font-semibold shadow-lg shadow-purple-600/20">
          <Plus size={20} />
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          [1, 2].map(i => (
            <div key={i} className="bg-[#0c0f14] border border-white/5 rounded-3xl h-40 animate-pulse" />
          ))
        ) : services.length === 0 ? (
          <div className="py-20 text-center text-gray-500 bg-[#0c0f14] rounded-3xl border border-dashed border-white/10">
            <Layers size={40} className="mx-auto mb-4 opacity-20" />
            <p>No services defined yet.</p>
          </div>
        ) : (
          services.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={service._id}
              className="group bg-[#0c0f14] border border-white/5 rounded-[32px] p-8 hover:border-purple-600/30 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="w-20 h-20 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Layers size={32} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full border border-green-500/20">ACTIVE</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">{service.description}</p>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    {service.features?.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-[11px] text-gray-300">
                        <CheckCircle2 size={12} className="text-purple-400" />
                        {f.title}
                      </div>
                    ))}
                    {service.features?.length > 3 && (
                      <div className="text-[11px] text-gray-500 mt-1">+{service.features.length - 3} more</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:border-l lg:border-white/5 lg:pl-8">
                  <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl transition-all text-sm font-medium">
                    <Edit3 size={16} />
                    Edit
                  </button>
                  <button className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
