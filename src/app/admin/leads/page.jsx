"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Calendar,
  Globe2,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Plus,
  Save,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAlert } from "@/app/component/AlertProvider";

const emptyForm = {
  fullName: "",
  email: "",
  whatsapp: "",
  company: "",
  address: "",
  budget: "",
  details: "",
  source: "manual",
  status: "customer",
};

const statusOptions = ["new", "contacted", "customer", "resolved", "ignored"];

function statusClasses(status) {
  if (status === "customer") return "border-emerald-100 bg-emerald-50 text-emerald-700";
  if (status === "contacted") return "border-blue-100 bg-blue-50 text-blue-700";
  if (status === "resolved") return "border-purple-100 bg-purple-50 text-purple-700";
  if (status === "ignored") return "border-red-100 bg-red-50 text-red-700";
  return "border-amber-100 bg-amber-50 text-amber-700";
}

export default function ManageLeads() {
  const { toast, confirm } = useAlert();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching leads:", err);
      toast({ type: "error", title: "Load failed", message: "Could not load customer data" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return leads;

    return leads.filter((lead) =>
      [
        lead.fullName,
        lead.email,
        lead.whatsapp,
        lead.company,
        lead.address,
        lead.projectTitle,
        lead.timeline,
        ...(lead.services || []),
        lead.budget,
        lead.ipAddress,
        lead.source,
        lead.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [leads, searchTerm]);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const createCustomer = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        toast({ type: "error", title: "Save failed", message: data.error || "Could not save customer" });
        return;
      }

      setLeads((current) => [data, ...current]);
      setForm(emptyForm);
      setShowForm(false);
      toast({ type: "success", title: "Customer saved", message: "Customer data was added to leads." });
    } catch (error) {
      console.error("Create customer error:", error);
      toast({ type: "error", title: "Save failed", message: "Could not save customer" });
    } finally {
      setSaving(false);
    }
  };

  const updateLead = async (lead, patch) => {
    try {
      const res = await fetch(`/api/leads/${lead._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();

      if (!res.ok) {
        toast({ type: "error", title: "Update failed", message: data.error || "Could not update customer" });
        return;
      }

      setLeads((current) => current.map((item) => (item._id === data._id ? data : item)));
      toast({ type: "success", title: "Customer updated" });
    } catch (error) {
      console.error("Update customer error:", error);
      toast({ type: "error", title: "Update failed", message: "Could not update customer" });
    }
  };

  const deleteLead = async (lead) => {
    const ok = await confirm({
      type: "warning",
      title: "Delete this customer?",
      message: `${lead.fullName || "This customer"} will be removed from leads.`,
      confirmText: "Delete",
    });

    if (!ok) return;

    try {
      const res = await fetch(`/api/leads/${lead._id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast({ type: "error", title: "Delete failed", message: data.error || "Could not delete customer" });
        return;
      }

      setLeads((current) => current.filter((item) => item._id !== lead._id));
      toast({ type: "success", title: "Customer deleted" });
    } catch (error) {
      console.error("Delete customer error:", error);
      toast({ type: "error", title: "Delete failed", message: "Could not delete customer" });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-purple-600">Customer data</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Leads & Customers</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
            Store customer names, email, phone, company, address, notes, and lead status in one place.
          </p>
        </div>

        <button
          onClick={() => setShowForm((current) => !current)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-sm font-black text-white shadow-xl shadow-purple-100 hover:bg-purple-700"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Close Form" : "Add Customer"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={createCustomer}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50" value={form.fullName} onChange={(e) => updateForm("fullName", e.target.value)} placeholder="Customer name *" />
              <input className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="Email" type="email" />
              <input className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50" value={form.whatsapp} onChange={(e) => updateForm("whatsapp", e.target.value)} placeholder="Phone / WhatsApp" />
              <input className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50" value={form.company} onChange={(e) => updateForm("company", e.target.value)} placeholder="Company / business" />
              <input className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50" value={form.budget} onChange={(e) => updateForm("budget", e.target.value)} placeholder="Budget / value" />
              <input className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50" value={form.address} onChange={(e) => updateForm("address", e.target.value)} placeholder="Address / location" />
              <textarea className="min-h-28 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50 md:col-span-2" value={form.details} onChange={(e) => updateForm("details", e.target.value)} placeholder="Customer notes, project details, next follow-up..." />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <select value={form.status} onChange={(e) => updateForm("status", e.target.value)} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-black outline-none focus:border-purple-300">
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status.replace("_", " ")}</option>
                ))}
              </select>
              <button disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white hover:bg-purple-600 disabled:opacity-70">
                <Save size={17} />
                {saving ? "Saving..." : "Save Customer"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="rounded-[32px] border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search customer, email, phone, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm font-medium text-slate-700 outline-none focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 lg:grid-cols-2">
          <AnimatePresence>
            {filteredLeads.map((lead, index) => (
              <motion.div
                key={lead._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-purple-200 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-xl font-black text-white shadow-lg shadow-purple-200">
                      {(lead.fullName || "?").charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-black text-slate-900">{lead.fullName}</h3>
                      <p className="mt-1 flex items-center gap-1 text-xs font-bold text-slate-400">
                        <Calendar size={12} /> {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <select
                    value={lead.status || "new"}
                    onChange={(e) => updateLead(lead, { status: e.target.value })}
                    className={`rounded-xl border px-3 py-2 text-[10px] font-black uppercase tracking-widest outline-none ${statusClasses(lead.status)}`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3 text-sm font-semibold text-slate-600">
                  {lead.email && <div className="flex items-center gap-3"><Mail size={16} className="text-slate-400" /><span className="break-all">{lead.email}</span></div>}
                  {lead.whatsapp && <div className="flex items-center gap-3"><Phone size={16} className="text-slate-400" /><span>{lead.whatsapp}</span></div>}
                  {lead.company && <div className="flex items-center gap-3"><Building2 size={16} className="text-slate-400" /><span>{lead.company}</span></div>}
                  {lead.projectTitle && <div className="flex items-center gap-3"><Monitor size={16} className="text-slate-400" /><span>{lead.projectTitle}</span></div>}
                  {lead.address && <div className="flex items-center gap-3"><MapPin size={16} className="text-slate-400" /><span>{lead.address}</span></div>}
                  {lead.ipAddress && <div className="flex items-center gap-3"><Globe2 size={16} className="text-slate-400" /><span>{lead.ipAddress}</span></div>}
                  {(lead.sourcePage || lead.referrer) && <div className="flex items-center gap-3"><Monitor size={16} className="text-slate-400" /><span className="truncate">{lead.sourcePage || lead.referrer}</span></div>}
                  {lead.budget && <div className="flex items-center gap-3"><UserRound size={16} className="text-slate-400" /><span>{lead.budget}</span></div>}
                  {lead.timeline && <div className="flex items-center gap-3"><Calendar size={16} className="text-slate-400" /><span>{lead.timeline}</span></div>}
                </div>

                {(lead.services || []).length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lead.services.slice(0, 5).map((service) => (
                      <span key={service} className="rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-purple-700">
                        {service}
                      </span>
                    ))}
                  </div>
                )}

                {lead.details && (
                  <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
                    <p className="line-clamp-4 whitespace-pre-wrap text-sm font-medium leading-6 text-slate-500">{lead.details}</p>
                  </div>
                )}

                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <button onClick={() => updateLead(lead, { status: "contacted" })} className="flex-1 rounded-xl border border-slate-100 bg-white py-3 text-xs font-black text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                    Mark Contacted
                  </button>
                  <button onClick={() => deleteLead(lead)} className="rounded-xl border border-red-100 bg-red-50 p-3 text-red-500 hover:bg-red-100">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredLeads.length === 0 && !loading && (
          <div className="px-6 py-20 text-center">
            <UserRound className="mx-auto mb-4 text-slate-300" size={48} />
            <div className="font-bold text-slate-500">No customer data found.</div>
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
