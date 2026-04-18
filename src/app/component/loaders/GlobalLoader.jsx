"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050709]"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative w-24 h-24 mb-6"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-600 to-blue-600 blur-xl opacity-50 animate-pulse" />
              <div className="relative h-full w-full rounded-3xl bg-[#0c0f14] border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="text-white font-black text-4xl">S</div>
                {/* Shine effect */}
                <motion.div
                  initial={{ x: "-150%" }}
                  animate={{ x: "150%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
              </div>
            </motion.div>

            {/* Text Animation */}
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              >
                ScaleUp Web
              </motion.h2>
              <motion.div 
                className="mt-3 w-48 h-1 bg-white/5 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-full w-full bg-gradient-to-r from-purple-600 to-blue-600"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
