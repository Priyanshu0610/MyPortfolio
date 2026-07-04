"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";
    
    // The entire animation takes about 2.5s. Unmount at 2.8s.
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          // The preloader background shrinks into a tiny dot and disappears to reveal the site!
          initial={{ clipPath: "circle(100% at 50% 50%)" }}
          animate={{ clipPath: ["circle(100% at 50% 50%)", "circle(100% at 50% 50%)", "circle(0% at 50% 50%)"] }}
          transition={{ duration: 2.6, times: [0, 0.7, 1], ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#111111] flex items-center justify-center overflow-hidden"
        >
          {/* Subtle grid background for the brutalist vibe */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "32px 32px", backgroundPosition: "center center" }} />

          {/* Impact Particles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * (Math.PI / 180);
              const distance = 150 + Math.random() * 150;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0], 
                    opacity: [0, 1, 0], 
                    x: [0, x], 
                    y: [0, y],
                    rotate: [0, 180]
                  }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.45, // Exact moment the stamp slams into the screen
                    ease: "easeOut"
                  }}
                  className={`absolute ${i % 2 === 0 ? "text-[#f59e0b]" : "text-[#3fa0ff]"}`}
                >
                  {i % 2 === 0 ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M12 2v20M2 12h20"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect width="24" height="24" /></svg>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* The Massive PR Stamp */}
          <motion.div
            initial={{ scale: 5, opacity: 0, rotate: 15 }}
            animate={{ scale: 1, opacity: 1, rotate: -5 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15, 
              mass: 2, 
              delay: 0.3 
            }}
            className="relative z-10 text-[#efebe2]"
          >
            {/* Custom Brutalist PR Seal SVG */}
            <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="180" height="180" stroke="currentColor" strokeWidth="12" />
              <rect x="25" y="25" width="150" height="150" stroke="currentColor" strokeWidth="4" />
              
              {/* "P" */}
              <path d="M 50 150 V 50 H 100 Q 120 50 120 75 Q 120 100 100 100 H 70" stroke="currentColor" strokeWidth="16" strokeLinejoin="miter" />
              
              {/* "R" */}
              <path d="M 120 150 L 100 100" stroke="currentColor" strokeWidth="16" strokeLinecap="square" />
              
              {/* Decorative elements */}
              <circle cx="170" cy="170" r="8" fill="currentColor" />
              <circle cx="30" cy="30" r="8" fill="currentColor" />
              
              <text x="35" y="165" fill="currentColor" className="font-mono text-[14px] font-bold tracking-widest uppercase">EST. 2026</text>
            </svg>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
