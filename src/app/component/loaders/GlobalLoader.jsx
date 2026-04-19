"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoader({ loading }) {
  const orbitDots = [
    { label: "Build", className: "-top-3 left-8" },
    { label: "Grow", className: "top-10 -right-5" },
    { label: "Launch", className: "-bottom-4 right-10" },
  ];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_45%,_#f8fafc_100%)] px-6"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[16%] h-56 w-56 -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute bottom-[14%] left-[18%] h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="absolute right-[12%] top-[24%] h-48 w-48 rounded-full bg-indigo-300/15 blur-3xl" />
          </div>

          <div className="relative flex w-full max-w-md flex-col items-center rounded-[2rem] border border-white/70 bg-white/70 px-8 py-10 text-center shadow-[0_24px_80px_rgba(148,163,184,0.28)] backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
            >
              Creative Studio
            </motion.div>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative mb-7 flex h-28 w-28 items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-blue-200/70 border-dashed"
              />

              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-blue-100 via-white to-cyan-100 shadow-inner"
              />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-white/90 bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 shadow-[0_14px_35px_rgba(37,99,235,0.28)]">
                <div className="text-3xl font-black tracking-tight text-white">
                  S
                </div>

                <motion.div
                  initial={{ x: "-140%" }}
                  animate={{ x: "140%" }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12"
                />
              </div>

              {orbitDots.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute rounded-full border border-blue-100 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-lg shadow-blue-100/60 ${item.className}`}
                >
                  {item.label}
                </motion.div>
              ))}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="text-[2rem] font-black tracking-tight text-slate-900"
            >
              ScaleUp <span className="text-blue-600">Web</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-2 max-w-xs text-sm leading-6 text-slate-500"
            >
              Building a cleaner, faster experience for your next client visit.
            </motion.p>

            <div className="mt-7 w-full">
              <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                <span>Preparing</span>
                <span>Almost ready</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200/80">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_24px_rgba(59,130,246,0.45)]"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-400">
              <motion.span
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-blue-500"
              />
              <motion.span
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                className="h-2 w-2 rounded-full bg-cyan-400"
              />
              <motion.span
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                className="h-2 w-2 rounded-full bg-indigo-400"
              />
              <span>Optimizing visuals and interactions</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
