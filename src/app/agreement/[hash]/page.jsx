"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, CheckCircle, Download, FileText, Loader2, MapPin, MessageCircle, PenTool, Phone, Printer, ShieldCheck, Mail, User } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";
import { useAlert } from "@/app/component/AlertProvider";
// Native print system used for PDF generation

// Google Fonts Import for Type Signature
const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');";

export default function PublicAgreement() {
  const { toast } = useAlert();
  const params = useParams();
  const hash = params.hash;
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [signedSuccess, setSignedSuccess] = useState(false);
  
  // Client Identity (Now filled by client)
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    company: "",
    address: "",
    preferredContact: "phone",
  });
  
  // Signature Mode
  const [sigMode, setSigMode] = useState("draw"); // 'draw' or 'type'
  const [typedName, setTypedName] = useState("");
  const sigCanvas = useRef(null);
  const documentRef = useRef(null);

  useEffect(() => {
    fetchAgreement();
  }, [hash]);

  const fetchAgreement = async () => {
    try {
      const res = await fetch(`/api/agreements/${hash}`);
      if (!res.ok) throw new Error("Agreement not found");
      const data = await res.json();
      setAgreement(data);
      if (data.status === "signed") {
        setSignedSuccess(true);
        setClientData({
          name: data.clientName || "",
          email: data.clientEmail || "",
          phone: data.clientPhone || "",
          whatsapp: data.clientWhatsApp || "",
          company: data.clientCompany || "",
          address: data.clientAddress || "",
          preferredContact: data.preferredContact || "phone",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearSignature = () => sigCanvas.current?.clear();

  const handleSign = async () => {
    if (signing || signedSuccess) return;

    if (!clientData.name || !clientData.email || !clientData.phone || !clientData.company) {
      toast({
        type: "warning",
        title: "Client details required",
        message: "Please provide your name, email, phone number, and business name.",
      });
      return;
    }
    
    let signatureData = "";
    if (sigMode === "draw") {
      if (sigCanvas.current.isEmpty()) {
        toast({ type: "warning", title: "Signature required", message: "Please provide your signature drawing." });
        return;
      }
      signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    } else {
      if (!typedName) {
        toast({ type: "warning", title: "Signature required", message: "Please type your signature." });
        return;
      }
      // Create a canvas from the typed name
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      ctx.font = "italic 40px 'Dancing Script', cursive";
      ctx.fillStyle = "#1e293b";
      ctx.textAlign = "center";
      ctx.fillText(typedName, 200, 60);
      signatureData = canvas.toDataURL("image/png");
    }

    setSigning(true);

    try {
      const res = await fetch(`/api/agreements/${hash}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          signatureData,
          clientName: clientData.name,
          clientEmail: clientData.email,
          clientPhone: clientData.phone,
          clientWhatsApp: clientData.whatsapp || clientData.phone,
          clientCompany: clientData.company,
          clientAddress: clientData.address,
          preferredContact: clientData.preferredContact,
        }),
      });

      if (res.ok) {
        setSignedSuccess(true);
        toast({ type: "success", title: "Agreement signed", message: "Your project agreement has been activated." });
        // Refresh local agreement data to show the just-saved info
        fetchAgreement();
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.error === "Agreement already signed") {
          setSignedSuccess(true);
          toast({ type: "info", title: "Already signed", message: "This agreement has already been signed." });
          fetchAgreement();
          return;
        }
        toast({ type: "error", title: "Signing failed", message: data.error || "Could not sign this agreement." });
      }
    } catch (err) {
      console.error(err);
      toast({ type: "error", title: "Signing failed", message: "Could not sign this agreement. Please try again." });
    } finally {
      setSigning(false);
    }
  };

  const downloadPDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <style dangerouslySetInnerHTML={{ __html: FONT_IMPORT }} />
        <Loader2 className="animate-spin text-purple-600 mb-4" size={40} />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Processing Security Protocol...</p>
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
          <ShieldCheck className="mx-auto mb-6 text-red-400" size={60} />
          <h1 className="text-2xl font-black text-slate-800 mb-2">Access Denied</h1>
          <p className="text-slate-500 font-medium leading-relaxed">The agreement you are looking for has expired or the link is invalid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 selection:bg-purple-100 print:bg-white print:py-0 print:px-0">
      <style dangerouslySetInnerHTML={{ __html: `
        ${FONT_IMPORT}
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          @page { size: A4; margin: 15mm; }
          .agreement-card { 
            box-shadow: none !important; 
            border: none !important; 
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
          }
          .motion-div { transform: none !important; opacity: 1 !important; }
        }
      `}} />
      <div className="max-w-[1000px] mx-auto">
        
        {/* Top Actions */}
        <div className="flex items-center justify-between mb-8 no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ScaleUp Project Agreement</p>
              <h2 className="text-sm font-bold text-slate-700">{agreement.projectTitle}</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => window.print()}
              className="p-3 bg-white border border-gray-200 rounded-xl text-slate-400 hover:text-slate-800 hover:border-slate-800 transition-all font-bold flex items-center gap-2"
            >
              <Printer size={20} /> <span className="hidden md:inline text-xs">Print / Save PDF</span>
            </button>
            {signedSuccess && (
              <button 
                onClick={downloadPDF}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-purple-600 transition-all shadow-xl"
              >
                <Download size={18} /> Download Copy
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Document */}
          <div className="lg:col-span-2 print:w-full">
            <div 
              ref={documentRef}
              className="bg-white p-8 md:p-16 rounded-[48px] shadow-2xl shadow-slate-200/50 relative overflow-hidden print:shadow-none print:rounded-none print:p-0 agreement-card"
            >
              {!signedSuccess && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none opacity-[0.03] select-none text-[120px] font-black text-slate-900 border-[20px] border-slate-900 px-10">
                  DRAFT
                </div>
              )}

              <div className="flex justify-between items-start mb-10">
                <div>
                  <h1 className="text-2xl font-black text-purple-700 font-serif italic mb-1 uppercase tracking-tighter">ScaleUp Web</h1>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Digital Performance Agency</p>
                  <p className="text-[10px] text-purple-600/60 font-black mt-1">www.scaleupweb.xyz</p>
                </div>
                <div className="text-right">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tightest leading-none">Agreement</h2>
                  <p className="text-slate-400 text-xs mt-2">{new Date(agreement.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 mb-10">
                <div>
                  <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-[0.2em]">Service Provider</h4>
                  <div className="text-slate-800 space-y-0.5">
                    <p className="font-bold text-lg leading-tight">ScaleUp Web</p>
                    <p className="text-[13px] font-medium text-slate-500">contact.scaleupweb@gmail.com</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-[0.2em]">Client</h4>
                  <div className="text-slate-800 space-y-0.5 min-h-[40px]">
                    {agreement.clientName ? (
                      <>
                        <p className="font-bold text-lg leading-tight">{agreement.clientName}</p>
                        {agreement.clientCompany && <p className="text-[13px] font-semibold text-slate-600">{agreement.clientCompany}</p>}
                        <p className="text-[13px] font-medium text-slate-500">{agreement.clientEmail}</p>
                        {agreement.clientPhone && <p className="text-[13px] font-medium text-slate-500">{agreement.clientPhone}</p>}
                        {agreement.clientAddress && <p className="text-[13px] font-medium text-slate-500">{agreement.clientAddress}</p>}
                      </>
                    ) : (
                      <p className="text-slate-300 italic text-sm">Awaiting client identification...</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-base font-black text-slate-800 mb-2 border-b-2 border-slate-50 pb-1 font-serif italic">01. Project Objectives</h3>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm">{agreement.projectDescription}</p>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-800 mb-2 border-b-2 border-slate-50 pb-1 font-serif italic">02. Defined Services</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
                    {agreement.services.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-[13px]">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                        <span className="font-medium">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-base font-black text-slate-800 mb-2 border-b-2 border-slate-50 pb-1 font-serif italic">03. Project Fee</h3>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">৳{agreement.price.toLocaleString()}</p>
                    <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-widest leading-none">Total Investment</p>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-800 mb-2 border-b-2 border-slate-50 pb-1 font-serif italic">04. Timeline</h3>
                    <p className="text-lg font-bold text-slate-700">{agreement.timeline}</p>
                    <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-widest leading-none">Estimated Schedule</p>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-100 grid grid-cols-2 gap-12">
                  <div className="relative">
                    <div className="h-12 mb-4 flex items-end">
                      <span className="text-4xl text-slate-800 opacity-90" style={{ fontFamily: "'Dancing Script', cursive" }}>Easin Arafat</span>
                    </div>
                    <div className="w-full h-[1px] bg-slate-200 mb-2" />
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Authorized by ScaleUp Web</p>
                    <p className="text-[10px] font-bold text-slate-900 mt-1">Provider Execution</p>
                  </div>
                  <div className="relative">
                    {signedSuccess && agreement.signatureData ? (
                      <div className="motion-div">
                        <img src={agreement.signatureData} alt="Client Signature" className="h-12 mb-4 object-contain" />
                        <div className="w-full h-[1px] bg-slate-200 mb-2" />
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Client Digital Execution</p>
                        <p className="text-[10px] font-bold text-slate-900 mt-1 text-right">{agreement.clientName}</p>
                      </div>
                    ) : (
                      <div className="h-12 mb-4 flex items-center justify-end text-slate-200 font-serif italic text-xl">Awaiting Client...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:sticky lg:top-12 space-y-6 no-print">
            {!signedSuccess ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-[40px] shadow-xl shadow-slate-200/50 border border-gray-100 space-y-6"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-purple-50 rounded-3xl flex items-center justify-center text-purple-600 mx-auto mb-4">
                    <PenTool size={32} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800">Final Execution</h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Legal Verification Protocol</p>
                </div>

                <div className="space-y-4">
                  {/* Identity Inputs */}
                  <div className="space-y-4">
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={clientData.name}
                        onChange={(e) => setClientData({...clientData, name: e.target.value})}
                        className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-bold text-slate-700 text-sm"
                        placeholder="Your Full Name"
                      />
                    </div>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={clientData.email}
                        onChange={(e) => setClientData({...clientData, email: e.target.value})}
                        className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-bold text-slate-700 text-sm"
                        placeholder="Your Business Email"
                      />
                    </div>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={clientData.phone}
                        onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-bold text-slate-700 text-sm"
                        placeholder="Your Phone Number"
                      />
                    </div>
                    <div className="relative">
                      <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={clientData.company}
                        onChange={(e) => setClientData({...clientData, company: e.target.value})}
                        className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-bold text-slate-700 text-sm"
                        placeholder="Business / Company Name"
                      />
                    </div>
                    <div className="relative">
                      <MessageCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        value={clientData.whatsapp}
                        onChange={(e) => setClientData({...clientData, whatsapp: e.target.value})}
                        className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-bold text-slate-700 text-sm"
                        placeholder="WhatsApp Number (optional)"
                      />
                    </div>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-4 text-slate-400" />
                      <textarea
                        value={clientData.address}
                        onChange={(e) => setClientData({...clientData, address: e.target.value})}
                        className="min-h-[84px] w-full resize-none bg-slate-50 border border-gray-100 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-bold text-slate-700 text-sm"
                        placeholder="Business Address / Location (optional)"
                      />
                    </div>
                    <select
                      value={clientData.preferredContact}
                      onChange={(e) => setClientData({...clientData, preferredContact: e.target.value})}
                      className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all font-bold text-slate-700 text-sm"
                    >
                      <option value="phone">Preferred Contact: Phone</option>
                      <option value="whatsapp">Preferred Contact: WhatsApp</option>
                      <option value="email">Preferred Contact: Email</option>
                    </select>
                  </div>

                  <div className="pt-2 border-t border-slate-50">
                    <div className="flex bg-slate-50 p-1 rounded-2xl mb-4 border border-gray-100">
                      <button 
                        onClick={() => setSigMode("draw")}
                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${sigMode === 'draw' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-400'}`}
                      >
                        Draw Signature
                      </button>
                      <button 
                        onClick={() => setSigMode("type")}
                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${sigMode === 'type' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-400'}`}
                      >
                        Type Signature
                      </button>
                    </div>

                    {sigMode === "draw" ? (
                      <div className="relative bg-slate-50 border border-gray-100 rounded-2xl overflow-hidden cursor-crosshair h-32">
                        <SignatureCanvas 
                          ref={sigCanvas}
                          penColor="#1e293b"
                          canvasProps={{ className: "w-full h-full" }}
                        />
                        <button 
                          onClick={clearSignature}
                          className="absolute bottom-2 right-2 text-[9px] font-black bg-white/80 backdrop-blur px-2 py-1 rounded-lg text-slate-400 hover:text-red-500 transition-all uppercase tracking-widest"
                        >
                          Clear
                        </button>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={typedName}
                        onChange={(e) => setTypedName(e.target.value)}
                        className="w-full h-32 bg-slate-50 border border-gray-100 rounded-2xl px-6 text-center text-3xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600/10 focus:border-purple-600 transition-all"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                        placeholder="Type Signature Here"
                      />
                    )}
                  </div>

                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex gap-2">
                    <ShieldCheck className="text-blue-500 flex-shrink-0" size={16} />
                    <p className="text-[9px] font-bold text-blue-700 leading-tight uppercase tracking-tight">
                      Legally binding digital execution. By signing, you accept the terms of the Project Scope.
                    </p>
                  </div>

                  <button 
                    onClick={handleSign}
                    disabled={signing}
                    className="w-full bg-slate-900 hover:bg-purple-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center gap-3 disabled:opacity-70 group"
                  >
                    {signing ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle size={20} className="group-hover:scale-125 transition-transform" />}
                    Accept & Activate
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-600 p-10 rounded-[48px] text-white shadow-2xl shadow-green-600/20 text-center"
              >
                <div className="w-20 h-20 bg-white/20 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-black mb-2 font-serif italic">Project Active</h3>
                <p className="text-green-100 text-sm font-medium leading-relaxed mb-8">
                  Execution complete. An automatic receipt has been dispatched to your business email.
                </p>
                <button 
                  onClick={downloadPDF}
                  className="w-full bg-white text-green-700 font-black py-5 rounded-3xl shadow-xl hover:bg-green-50 transition-all flex items-center justify-center gap-3"
                >
                  <Download size={20} /> Generate PDF Copy
                </button>
                {agreement.portalHash && (
                  <a
                    href={`/client-portal/${agreement.portalHash}`}
                    className="mt-3 flex w-full items-center justify-center gap-3 rounded-3xl bg-green-900/30 py-5 font-black text-white transition-all hover:bg-green-900/40"
                  >
                    Open Client Portal
                  </a>
                )}
              </motion.div>
            )}

            <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4 shadow-sm no-print">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <ShieldCheck size={20} />
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                256-bit Protocol Encryption • Managed by ScaleUp Cloud Security
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
