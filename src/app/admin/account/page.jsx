"use client";

import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, Save, UserRound } from "lucide-react";
import { useAlert } from "@/app/component/AlertProvider";

export default function AdminAccountPage() {
  const { toast } = useAlert();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch("/api/admin/account");
        const data = await res.json();

        if (!res.ok) {
          toast({ type: "error", title: "Account load failed", message: data.error || "Could not load account" });
          return;
        }

        setForm((current) => ({ ...current, name: data.name || "", email: data.email || "" }));
      } catch (error) {
        console.error("Account fetch error:", error);
        toast({ type: "error", title: "Account load failed", message: "Could not load account" });
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [toast]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        toast({ type: "error", title: "Update failed", message: data.error || "Could not update account" });
        return;
      }

      setForm((current) => ({ ...current, currentPassword: "", newPassword: "" }));
      toast({ type: "success", title: "Account updated", message: "Your admin account changes were saved." });
    } catch (error) {
      console.error("Account update error:", error);
      toast({ type: "error", title: "Update failed", message: "Could not update account" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-purple-600">Admin account</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Profile & Password</h1>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
          Update your admin name, login email, and password from one secure place.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <div className="grid gap-5">
          <div>
            <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Admin Name</label>
            <div className="relative">
              <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="w-full rounded-2xl border border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm font-bold text-slate-700 outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                placeholder="Your name"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Login Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="w-full rounded-2xl border border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm font-bold text-slate-700 outline-none focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-sm">
                <LockKeyhole size={18} />
              </div>
              <div>
                <h2 className="font-black text-slate-900">Change Password</h2>
                <p className="text-xs font-semibold text-slate-400">Leave blank if you only want to update profile details.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type={showPassword ? "text" : "password"}
                value={form.currentPassword}
                onChange={(event) => updateField("currentPassword", event.target.value)}
                className="rounded-2xl border border-slate-100 bg-white px-4 py-4 text-sm font-bold text-slate-700 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                placeholder="Current password"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(event) => updateField("newPassword", event.target.value)}
                  className="w-full rounded-2xl border border-slate-100 bg-white px-4 py-4 pr-12 text-sm font-bold text-slate-700 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50"
                  placeholder="New password"
                />
                <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-purple-100 hover:bg-purple-700 disabled:opacity-70"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Account
          </button>
        </div>
      </form>
    </div>
  );
}
