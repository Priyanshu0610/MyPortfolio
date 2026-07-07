"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface StampData {
  id: number;
  x: number;
  y: number;
  angle: number;
  zone: "hero" | "rest";
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isPressed, setIsPressed] = useState(false);
  const [isHoveringGrabbable, setIsHoveringGrabbable] = useState(false);
  const [stamps, setStamps] = useState<StampData[]>([]);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  // Clear stamps when navigating between pages to avoid old stamps stretching the page height
  useEffect(() => {
    setStamps([]);
  }, [pathname]);

  useEffect(() => {
    setIsClient(true);
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

      const target = e.target as HTMLElement;
      if (target?.closest && target.closest('.no-stamp')) {
        setIsHoveringGrabbable(true);
      } else {
        setIsHoveringGrabbable(false);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    
    const handleMouseUp = (e: MouseEvent) => {
      setIsPressed(false);
      
      const target = e.target as HTMLElement;
      
      // Prevent stamping when interacting with the Bubble Menu or navigational buttons
      if (target.closest('.bubble-menu') || target.closest('.bubble-menu-items') || target.closest('.no-stamp')) {
        return;
      }
      
      const isHero = !!target.closest("#hero");
      const zone = isHero ? "hero" : "rest";
      const randomAngle = (Math.random() - 0.5) * 50;
      
      setStamps(prev => {
        let newStamps = [...prev];
        
        // If clicking outside the hero section, limit those stamps to 2 max.
        if (zone === "rest") {
          const restStamps = newStamps.filter(s => s.zone === "rest");
          if (restStamps.length >= 2) {
            // Find the oldest 'rest' stamp to remove
            const oldestRestStampId = restStamps[0].id;
            newStamps = newStamps.filter(s => s.id !== oldestRestStampId);
          }
        }
        
        // Add the new stamp
        return [
          ...newStamps, 
          { 
            id: Date.now(), 
            x: e.pageX,
            y: e.pageY,
            angle: randomAngle,
            zone
          }
        ];
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!isClient) return null;

  return (
    <>
      {/* Container for all the stamped marks (sticks to the page background) */}
      {/* Removed h-full and overflow-hidden so stamps can be seen anywhere down the scrollable page */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-40">
        <AnimatePresence>
          {stamps.map((stamp) => (
            <motion.div
              key={stamp.id}
              initial={{ opacity: 0, scale: 2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }} // fade out when removed
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="absolute text-[#ef4444] drop-shadow-md mix-blend-multiply dark:mix-blend-screen"
              style={{
                left: stamp.x,
                top: stamp.y,
                x: "-50%",
                y: "-50%",
                rotate: stamp.angle
              }}
            >
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" strokeDasharray="5 3" />
                <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="1" />
                <text x="50" y="55" fill="currentColor" textAnchor="middle" className="font-sans font-black text-[15px] tracking-widest">ORIGINAL</text>
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* The Universal Hand-Stamp Cursor */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${isHoveringGrabbable ? 'opacity-0' : 'opacity-100'}`}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 48,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 40,
          mass: 0.5,
        }}
      >
        <motion.div
          animate={{
            scaleY: isPressed ? 0.7 : 1,
            y: isPressed ? 15 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 15,
          }}
          className="text-foreground drop-shadow-lg"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v6" strokeWidth="3" />
            <path d="M9 2h6" strokeWidth="3" />
            <path d="M9 8h6a2 2 0 0 1 2 2v2H7v-2a2 2 0 0 1 2-2z" fillOpacity="0.2" />
            <path d="M6 12h12v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4z" />
            <path d="M6 18h12v2H6z" />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
