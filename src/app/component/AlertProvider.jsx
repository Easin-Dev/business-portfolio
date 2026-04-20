"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const AlertContext = createContext(null);

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: "border-emerald-100 bg-emerald-50 text-emerald-700",
  error: "border-red-100 bg-red-50 text-red-700",
  warning: "border-amber-100 bg-amber-50 text-amber-700",
  info: "border-blue-100 bg-blue-50 text-blue-700",
};

export function AlertProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [confirmState, setConfirmState] = useState(null);
  const resolverRef = useRef(null);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((options) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const nextToast = {
      id,
      type: options.type || "info",
      title: options.title || "Notice",
      message: options.message || "",
    };

    setToasts((current) => [nextToast, ...current].slice(0, 4));
    window.setTimeout(() => dismissToast(id), options.duration || 3500);
  }, [dismissToast]);

  const confirm = useCallback((options) => {
    setConfirmState({
      type: options.type || "warning",
      title: options.title || "Are you sure?",
      message: options.message || "",
      confirmText: options.confirmText || "Confirm",
      cancelText: options.cancelText || "Cancel",
    });

    return new Promise((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const closeConfirm = useCallback((value) => {
    setConfirmState(null);
    resolverRef.current?.(value);
    resolverRef.current = null;
  }, []);

  const value = useMemo(() => ({ toast, confirm }), [toast, confirm]);

  useEffect(() => {
    const nativeAlert = window.alert;
    window.alert = (message) => {
      toast({
        type: "info",
        title: "Notice",
        message: typeof message === "string" ? message : String(message),
      });
    };

    return () => {
      window.alert = nativeAlert;
    };
  }, [toast]);

  return (
    <AlertContext.Provider value={value}>
      {children}

      <div className="fixed right-4 top-4 z-[9999] flex w-[min(420px,calc(100vw-2rem))] flex-col gap-3">
        <AnimatePresence>
          {toasts.map((item) => {
            const Icon = icons[item.type] || Info;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 24, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.96 }}
                className={`flex items-start gap-3 rounded-2xl border p-4 shadow-xl shadow-slate-900/10 backdrop-blur ${styles[item.type] || styles.info}`}
              >
                <Icon size={20} className="mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black">{item.title}</p>
                  {item.message && <p className="mt-1 text-sm font-semibold opacity-80">{item.message}</p>}
                </div>
                <button onClick={() => dismissToast(item.id)} className="rounded-lg p-1 opacity-60 hover:bg-white/60 hover:opacity-100">
                  <X size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {confirmState && (
          <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => closeConfirm(false)}
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              className="relative z-10 w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl"
            >
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${styles[confirmState.type] || styles.warning}`}>
                {React.createElement(icons[confirmState.type] || AlertTriangle, { size: 24 })}
              </div>
              <h2 className="text-xl font-black text-slate-900">{confirmState.title}</h2>
              {confirmState.message && <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{confirmState.message}</p>}
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button onClick={() => closeConfirm(false)} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-600 hover:bg-slate-50">
                  {confirmState.cancelText}
                </button>
                <button onClick={() => closeConfirm(true)} className="rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white hover:bg-red-700">
                  {confirmState.confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used inside AlertProvider");
  }

  return context;
}
