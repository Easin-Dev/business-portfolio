"use client";
import React, { useEffect, useState } from "react";
import { FileText, Briefcase, MessageSquare, Users, TrendingUp, Clock, ArrowUpRight, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white border border-gray-100 p-6 rounded-[32px] hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group"
  >
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl bg-slate-50 text-purple-600 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
      <div className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600 flex items-center gap-1 border border-green-100">
        <TrendingUp size={10} />
        +12%
      </div>
    </div>
    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{title}</h3>
    <div className="text-3xl font-bold text-slate-800 tracking-tight">{value}</div>
  </motion.div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
    leads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogRes, projectRes, leadRes] = await Promise.all([
          fetch('/api/blogs/count'),
          fetch('/api/projects/count'),
          fetch('/api/leads/count'),
        ]);
        
        const blogs = await blogRes.json();
        const projects = await projectRes.json();
        const leads = await leadRes.json();

        setStats({
          blogs: blogs.count || 0,
          projects: projects.count || 0,
          leads: leads.total || 0,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Workspace</h1>
          <p className="text-slate-500 font-medium">Monitoring your agency's digital performance.</p>
        </div>
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 bg-white border border-gray-100 py-3 px-6 rounded-2xl text-sm font-semibold text-slate-600 shadow-sm">
            <Clock size={16} className="text-purple-600" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Insights" value={stats.blogs} icon={FileText} color="blue" delay={0.1} />
        <StatCard title="Portfolio" value={stats.projects} icon={Briefcase} color="purple" delay={0.2} />
        <StatCard title="New Leads" value={stats.leads} icon={MessageSquare} color="indigo" delay={0.3} />
        <StatCard title="Visitors" value="1.2k" icon={Users} color="emerald" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Recent Inquiries</h2>
            <button className="text-purple-600 text-sm font-bold hover:underline flex items-center gap-1">
              Live Feed <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-3xl border border-gray-50 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-purple-600 font-bold text-lg shadow-sm">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Potential Client {i}</h4>
                    <p className="text-[11px] font-medium text-slate-400">ScaleUp Digital Strategy</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">2h ago</p>
                  <span className="text-[9px] uppercase tracking-widest bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-black">NEW</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-purple-600 p-10 rounded-[40px] flex flex-col justify-center relative overflow-hidden group shadow-2xl shadow-purple-200"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
          <h2 className="text-3xl font-black text-white mb-4 relative z-10">Scale Your Content.</h2>
          <p className="text-purple-100 mb-8 text-sm leading-relaxed font-medium relative z-10">Control your digital presence with high-precision management tools.</p>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <button className="bg-white/10 hover:bg-white text-white hover:text-purple-600 p-5 rounded-3xl text-center transition-all duration-300 border border-white/20 hover:border-white shadow-lg">
              <FileText className="mx-auto mb-2" size={20} />
              <span className="text-[11px] font-black uppercase tracking-widest">Post Blog</span>
            </button>
            <button className="bg-white/10 hover:bg-white text-white hover:text-purple-600 p-5 rounded-3xl text-center transition-all duration-300 border border-white/20 hover:border-white shadow-lg">
              <Briefcase className="mx-auto mb-2" size={20} />
              <span className="text-[11px] font-black uppercase tracking-widest">Portfolio</span>
            </button>
            <button className="bg-white/10 hover:bg-white text-white hover:text-purple-600 p-5 rounded-3xl text-center transition-all duration-300 border border-white/20 hover:border-white shadow-lg">
              <ClipboardList className="mx-auto mb-2" size={20} />
              <span className="text-[11px] font-black uppercase tracking-widest">Services</span>
            </button>
            <button className="bg-white/10 hover:bg-white text-white hover:text-purple-600 p-5 rounded-3xl text-center transition-all duration-300 border border-white/20 hover:border-white shadow-lg">
              <MessageSquare className="mx-auto mb-2" size={20} />
              <span className="text-[11px] font-black uppercase tracking-widest">Email</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
