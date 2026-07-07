"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AvatarTransition({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll of the entire 400vh container for a highly continuous animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phase 1 & 2: Polaroid Slide & Zoom (0 to 0.4)
  const polaroidY = useTransform(scrollYProgress, [0, 0.2, 0.4], ["100vh", "0vh", "0vh"]);
  const polaroidRotate = useTransform(scrollYProgress, [0, 0.2, 0.4], [-15, -2, 0]);
  const polaroidScale = useTransform(scrollYProgress, [0, 0.2, 0.4], [0.6, 0.6, 2.5]);
  
  // Phase 3: Badges stamp in (0.35 to 0.45)
  const badgesOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const badgesScale = useTransform(scrollYProgress, [0.35, 0.45], [1.5, 1]);

  // Phase 4: Shutter Closes (0.45 to 0.55) -> Swaps Content (0.55) -> Shutter Opens (0.55 to 0.7)
  
  // Shutter X positions (Close then Open)
  const bar1X = useTransform(scrollYProgress, [0, 0.45, 0.55, 0.7, 1], ["-100%", "-100%", "0%", "-100%", "-100%"]);
  const bar2X = useTransform(scrollYProgress, [0, 0.47, 0.55, 0.72, 1], ["100%", "100%", "0%", "100%", "100%"]);
  const bar3X = useTransform(scrollYProgress, [0, 0.49, 0.55, 0.74, 1], ["-100%", "-100%", "0%", "-100%", "-100%"]);
  const bar4X = useTransform(scrollYProgress, [0, 0.51, 0.55, 0.76, 1], ["100%", "100%", "0%", "100%", "100%"]);
  const bar5X = useTransform(scrollYProgress, [0, 0.53, 0.55, 0.78, 1], ["-100%", "-100%", "0%", "-100%", "-100%"]);

  // Content Swap Opacities (Instant swap exactly at 0.55 when shutters are completely closed)
  const polaroidOpacity = useTransform(scrollYProgress, [0, 0.54, 0.55, 1], [1, 1, 0, 0]);
  const nextSectionOpacity = useTransform(scrollYProgress, [0, 0.54, 0.55, 1], [0, 0, 1, 1]);
  
  // Use arrays for display values to prevent Next.js SSR crashes
  const polaroidDisplay = useTransform(scrollYProgress, [0, 0.55, 0.56, 1], ["flex", "flex", "none", "none"]);
  const nextSectionDisplay = useTransform(scrollYProgress, [0, 0.53, 0.54, 1], ["none", "none", "flex", "flex"]);

  return (
    <section ref={containerRef} className="h-[400vh] relative w-full bg-[#111] no-stamp">
      {/* Sticky container that holds the scene */}
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#202020]"
      >

        {/* --- LAYER 1: The Polaroid Scene (Fades out at 0.55) --- */}
        <motion.div className="absolute inset-0 z-40 w-full h-full flex flex-col items-center justify-center bg-[#111]" style={{ opacity: polaroidOpacity, display: polaroidDisplay }}>
          {/* Background Grid for the dark room vibe */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }}
          />

          {/* The Polaroid */}
          <motion.div
            className="relative z-20 flex flex-col items-center justify-start transform-gpu"
            style={{ 
              y: polaroidY,
              scale: polaroidScale,
              rotate: polaroidRotate,
              transformOrigin: "center 40%", 
            }}
          >
            {/* Photo Container */}
            <motion.div className="flex flex-col items-center justify-start bg-[#f8f8f8] p-4 pb-16 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-black/10 rounded-sm w-full">
              {/* Inner Photo Frame */}
              <motion.div className="w-[60vw] md:w-[30vw] aspect-[3/4] relative overflow-hidden bg-black/5 rounded-sm">
                <img 
                  src="/pexels-introspectivedsgn-7248316.jpg" 
                  alt="Priyanshu Portrait"
                  className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply transition-all duration-700 hover:scale-105 hover:grayscale-0 hover:mix-blend-normal"
                />
              </motion.div>
              {/* Marker text on the polaroid */}
              <div className="absolute bottom-4 left-6 text-black/40 font-playfair font-black text-2xl tracking-tighter opacity-70">
                PR - 2026
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Badges */}
          <motion.div 
            className="absolute z-30 inset-0 pointer-events-none flex items-center justify-center"
            style={{ opacity: badgesOpacity }}
          >
            <motion.div className="absolute left-[5%] md:left-[15%] top-[40%] bg-accent-yellow text-black px-6 py-2 rounded-full font-mono font-bold shadow-[5px_5px_0px_rgba(0,0,0,1)] border-2 border-black -rotate-6" style={{ scale: badgesScale }}>Frontend Developer</motion.div>
            <motion.div className="absolute right-[5%] md:right-[15%] top-[60%] bg-accent-blue text-white px-6 py-2 rounded-full font-mono font-bold shadow-[5px_5px_0px_rgba(0,0,0,1)] border-2 border-black rotate-6" style={{ scale: badgesScale }}>Visual Designer</motion.div>
            <motion.div className="absolute top-[20%] bg-white text-black px-8 py-3 rounded-full font-sans font-black uppercase text-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] border-4 border-black z-40" style={{ scale: badgesScale }}>PRIYANSHU RAJ</motion.div>
          </motion.div>

          {/* Printer Slot Graphic */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0a0a0a] border-t-4 border-[#222] z-30 flex justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
            <div className="w-[70vw] md:w-[40vw] h-4 bg-black rounded-b-xl mt-[-4px] shadow-inner opacity-80" />
          </div>
        </motion.div>

        {/* --- LAYER 2: The Next Section (Fades in at 0.55 when shutters are closed) --- */}
        <motion.div className="absolute inset-0 w-full h-full z-30" style={{ opacity: nextSectionOpacity, display: nextSectionDisplay }}>
          {children}
        </motion.div>

        {/* --- LAYER 3: The Shutter Bars (Closes 0.45->0.55, Opens 0.55->0.7) --- */}
        <div className="absolute inset-0 z-50 flex flex-col pointer-events-none">
          <motion.div className="h-[20vh] w-full bg-[#202020]" style={{ x: bar1X }} />
          <motion.div className="h-[20vh] w-full bg-[#202020]" style={{ x: bar2X }} />
          <motion.div className="h-[20vh] w-full bg-[#202020]" style={{ x: bar3X }} />
          <motion.div className="h-[20vh] w-full bg-[#202020]" style={{ x: bar4X }} />
          <motion.div className="h-[20vh] w-full bg-[#202020]" style={{ x: bar5X }} />
        </div>

      </motion.div>
    </section>
  );
}

