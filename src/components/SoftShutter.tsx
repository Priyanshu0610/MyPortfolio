"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SoftShutter({ 
  prevColor = "#111111", 
  nextColor = "#efebe2" 
}: { 
  prevColor?: string; 
  nextColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll for a fluid, scroll-linked wipe effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // The container is 100vh tall.
  // 0.0 = top of container touches bottom of viewport
  // 0.5 = container perfectly fills the viewport
  // We want the bars to wipe in exactly as the container comes into full view.
  const xLeft = useTransform(scrollYProgress, [0.1, 0.5], ["-100%", "0%"]);
  const xRight = useTransform(scrollYProgress, [0.1, 0.5], ["100%", "0%"]);

  return (
    <div ref={containerRef} className="h-[100vh] w-full relative overflow-hidden pointer-events-none" style={{ backgroundColor: prevColor }}>
      {/* The 5 Staggered Shutter Bars */}
      <div className="absolute inset-0 flex flex-col">
        <motion.div className="flex-1 w-full" style={{ backgroundColor: nextColor, x: xLeft }} />
        <motion.div className="flex-1 w-full" style={{ backgroundColor: nextColor, x: xRight }} />
        <motion.div className="flex-1 w-full" style={{ backgroundColor: nextColor, x: xLeft }} />
        <motion.div className="flex-1 w-full" style={{ backgroundColor: nextColor, x: xRight }} />
        <motion.div className="flex-1 w-full" style={{ backgroundColor: nextColor, x: xLeft }} />
      </div>
    </div>
  );
}
