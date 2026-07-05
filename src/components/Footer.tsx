"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReceiptContact from "./ReceiptContact";

// Helper component for continuous scrolling text
function Marquee({ text, baseVelocity = 100 }: { text: string; baseVelocity?: number }) {
  // We use a simple repeating animation rather than complex scroll logic to ensure it's always moving
  return (
    <div className="flex whitespace-nowrap overflow-hidden leading-none select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: baseVelocity > 0 ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20, // Adjust speed here
        }}
      >
        <span className="block mr-8">{text}</span>
        <span className="block mr-8">{text}</span>
        <span className="block mr-8">{text}</span>
        <span className="block mr-8">{text}</span>
      </motion.div>
    </div>
  );
}

export default function Footer() {
  return (
    <section 
      id="contact"
      className="flex flex-col text-center bg-[#111] mt-16 lg:mt-32 relative overflow-hidden no-stamp"
    >
      {/* MASSIVE MARQUEE BACKGROUND */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center items-center pointer-events-none opacity-5 overflow-hidden">
        <div className="text-[15vw] font-bebas text-white uppercase tracking-tighter whitespace-nowrap w-[200%] -rotate-2">
          <Marquee text="PRIYANSHU RAJ — AVAILABLE FOR WORK —" baseVelocity={-100} />
        </div>
        <div className="text-[15vw] font-bebas text-white uppercase tracking-tighter whitespace-nowrap w-[200%] -rotate-2">
          <Marquee text="FRONTEND DEVELOPER — SOFTWARE ENGINEER —" baseVelocity={100} />
        </div>
      </div>

      <div className="relative z-10 w-full">
        <ReceiptContact />
      </div>

      {/* Footer Details (Always visible at the absolute bottom) */}
      <div className="w-full p-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-white/50 z-20 pointer-events-none font-mono border-t border-white/5 bg-black">
        <div className="order-2 lg:order-1">© {new Date().getFullYear()} Priyanshu Raj.</div>
        <div className="order-3 lg:order-2 text-white/40">Engineered with <span className="text-white/80">Gemini</span></div>
        <div className="order-1 lg:order-3 flex gap-6 pointer-events-auto">
          <a href="https://github.com/Priyanshu0610" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/priyanshu-raj-0244bb377/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
