"use client";
import React, { useEffect, useState, useRef } from "react";
import { Bell, BellOff, Zap } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AdminNotificationManager() {
  const { data: session } = useSession();
  const [permission, setPermission] = useState("default");
  const [isClient, setIsClient] = useState(false);
  const lastLeadIdRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const res = await Notification.requestPermission();
      setPermission(res);
    }
  };

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Sound play error:", e));
    }
  };

  const showNotification = (lead) => {
    if (permission === "granted") {
      const notification = new Notification("New Project Inquiry!", {
        body: `From: ${lead.fullName}\nBudget: ${lead.budget}\nMessage: ${lead.details.substring(0, 50)}...`,
        icon: "/favicon.ico", // Or a custom logo
        tag: "new-lead",
        renotify: true
      });

      notification.onclick = () => {
        window.focus();
        window.location.href = "/admin/leads";
      };
      
      playNotificationSound();
    }
  };

  const checkNewLeads = async () => {
    try {
      const res = await fetch("/api/leads?limit=1");
      if (!res.ok) return;
      
      const leads = await res.json();
      if (Array.isArray(leads) && leads.length > 0) {
        const latestLead = leads[0];
        
        // If this is a new lead (different ID than last seen)
        if (lastLeadIdRef.current && lastLeadIdRef.current !== latestLead._id) {
          showNotification(latestLead);
        }
        
        lastLeadIdRef.current = latestLead._id;
      }
    } catch (error) {
      console.error("Notification check error:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.role === "admin") {
      // Initial check to set the baseline
      checkNewLeads();

      // Check every 30 seconds
      const interval = setInterval(checkNewLeads, 30000);
      return () => clearInterval(interval);
    }
  }, [session, permission]);

  if (!isClient || session?.user?.role !== "admin") return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto" />
      
      {permission !== "granted" && (
        <button
          onClick={requestPermission}
          className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-amber-500 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-amber-200 hover:bg-amber-600 transition-all"
        >
          <Zap size={14} />
          Enable Notifications
        </button>
      )}

      <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/20 p-2 pr-4 shadow-2xl shadow-slate-200">
        <div className={`p-2 rounded-full ${permission === "granted" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
          {permission === "granted" ? <Bell size={18} /> : <BellOff size={18} />}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Notifications</span>
          <span className="text-[11px] font-bold text-slate-700">{permission === "granted" ? "Active" : "Disabled"}</span>
        </div>
      </div>
    </div>
  );
}
