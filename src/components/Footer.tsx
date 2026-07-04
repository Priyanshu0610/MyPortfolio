"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, useState } from "react";

export default function Footer() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Creates the spotlight effect by masking everything outside the cursor's radius
  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  return (
    <section 
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="min-h-[40vh] md:min-h-[60vh] flex flex-col justify-center items-center text-center bg-[#111] py-24 px-6 mt-16 md:mt-32 relative overflow-hidden group cursor-none"
    >
      {/* BASE LAYER (Barely visible, looks turned off) */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center items-center text-white/5 pointer-events-none">
        <h2 className="text-5xl sm:text-6xl md:text-[10rem] font-playfair font-black leading-none mb-12">
          LET'S TALK
        </h2>
        <div className="text-xl md:text-2xl font-mono underline">
          ishugood4u@gmail.com
        </div>
      </div>

      {/* REVEAL LAYER (The Spotlight Area) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-[#d97743] text-white pointer-events-none"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <h2 className="text-5xl sm:text-6xl md:text-[10rem] font-playfair font-black leading-none mb-12 pointer-events-auto">
          LET'S TALK
        </h2>
        <a href="mailto:ishugood4u@gmail.com" className="text-xl md:text-2xl font-mono font-bold underline hover:text-accent-yellow transition-colors pointer-events-auto">
          ishugood4u@gmail.com
        </a>
      </motion.div>

      {/* Footer Details (Always visible but dim) */}
      <div className="absolute bottom-0 w-full p-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30 z-20 pointer-events-none font-mono">
        <div className="order-2 md:order-1">© {new Date().getFullYear()} Priyanshu Raj.</div>
        <div className="order-3 md:order-2 text-white/20">Engineered with <span className="text-white/50">Gemini</span></div>
        <div className="order-1 md:order-3 flex gap-6 pointer-events-auto">
          <a href="https://github.com/Priyanshu0610" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/priyanshu-raj-0244bb377/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
