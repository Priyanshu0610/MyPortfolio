"use client";

import { motion, useAnimation } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Project {
  slug: string;
  title: string;
  year: string;
  category: string;
  image: string;
}

interface VHSProjectsProps {
  projects: Project[];
}

export default function VHSProjects({ projects }: VHSProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [insertedTape, setInsertedTape] = useState<string | null>(null);
  const [glitch, setGlitch] = useState(false);
  const slotControls = useAnimation();

  // Generate random initial positions for the tapes so they look scattered
  const [tapePositions, setTapePositions] = useState<{ x: number, y: number, rotate: number }[]>([]);

  useEffect(() => {
    // Generate neat, aligned positions for the tapes
    const positions = projects.map((_, i) => {
      // Align them horizontally with a 280px gap
      const x = (i - (projects.length - 1) / 2) * 280;
      // Position them above the slot
      const y = -100;
      // Very slight tilt so they feel physical but neat
      const rotate = i % 2 === 0 ? 3 : -3;
      return { x, y, rotate };
    });
    setTapePositions(positions);
  }, [projects]);

  const handleDragEnd = (event: any, info: any, project: Project) => {
    if (!dropZoneRef.current) return;

    const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
    const point = info.point;

    const slotCenterX = dropZoneRect.left + dropZoneRect.width / 2;
    const slotCenterY = dropZoneRect.top + dropZoneRect.height / 2;
    
    // Calculate distance to the center of the slot
    const distance = Math.sqrt(Math.pow(point.x - slotCenterX, 2) + Math.pow(point.y - slotCenterY, 2));

    // Forgiving drop radius (250px means you just have to drop it near the slot)
    if (distance < 250) {
      // Tape inserted successfully!
      setInsertedTape(project.slug);
      
      // Trigger slot lighting up
      slotControls.start({
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        borderColor: "#f59e0b",
        transition: { duration: 0.3 }
      });

      // Trigger screen glitch effect
      setGlitch(true);

      // Route to project page after dramatic pause
      setTimeout(() => {
        router.push(`/works/${project.slug}`);
      }, 1500);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[800px] flex flex-col items-center justify-end overflow-hidden pb-10 no-stamp">
      
      {/* Glitch Overlay */}
      {glitch && (
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none bg-white mix-blend-difference"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 0.8, 0], scale: [1, 1.05, 0.95, 1.1, 1] }}
          transition={{ duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] }}
        />
      )}

      {/* Scattered Tapes */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        {tapePositions.length > 0 && projects.map((project, idx) => {
          const isInserted = insertedTape === project.slug;
          // Hide other tapes if one is inserted
          if (insertedTape && !isInserted) return null;

          return (
            <motion.div
              key={project.slug}
              drag={!insertedTape} // Disable drag if an insertion is happening
              dragElastic={0.2}
              whileDrag={{ scale: 1.1, rotate: 0, zIndex: 50, cursor: "grabbing" }}
              onDragEnd={(e, info) => handleDragEnd(e, info, project)}
              initial={{ x: tapePositions[idx].x, y: tapePositions[idx].y, rotate: tapePositions[idx].rotate }}
              animate={isInserted ? {
                x: 0,
                y: 280, // Perfectly hits the VCR slot center
                rotate: 0,
                scale: 0.8,
                opacity: 0, // Disappear into the machine
              } : {
                x: tapePositions[idx].x, 
                y: tapePositions[idx].y, 
                rotate: tapePositions[idx].rotate 
              }}
              transition={isInserted ? { duration: 0.5, ease: "easeIn" } : { type: "spring", damping: 20, stiffness: 200 }}
              className="absolute pointer-events-auto cursor-grab touch-none group"
            >
              {/* VHS Tape Design */}
              <div className="w-64 h-40 bg-[#1a1a1a] rounded-lg border-2 border-black shadow-[10px_10px_0px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between relative group-hover:border-white/40 transition-colors">
                
                {/* Tape Label */}
                <div className="w-[85%] h-14 bg-[#f4f4f5] mx-auto mt-3 rounded border border-black/20 flex flex-col justify-center px-3 shadow-inner">
                  <div className="text-[10px] font-mono font-bold text-black/50 uppercase tracking-widest">{project.year} // {project.category}</div>
                  <div className="text-sm font-sans font-black text-black uppercase truncate">{project.title}</div>
                </div>

                {/* Reel Windows */}
                <div className="w-[85%] h-12 mx-auto bg-black rounded-full flex justify-between items-center px-4 mb-3 opacity-80 border-t border-white/10">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white/30 rounded-full" />
                  </div>
                  <div className="text-white/20 text-[10px] font-mono">T-120</div>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white/30 rounded-full" />
                  </div>
                </div>

                {/* Bottom Ridge */}
                <div className="w-full h-4 border-t border-white/5 bg-[#111]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* VCR Player Slot */}
      <motion.div 
        ref={dropZoneRef}
        animate={slotControls}
        className="w-[500px] h-[120px] bg-[#1a1a1a] rounded-xl border-[4px] border-[#333] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center relative z-10 transition-colors"
      >
        {/* The actual insertion hole */}
        <div className="w-[420px] h-[30px] bg-black rounded-lg shadow-[inset_0_10px_20px_rgba(0,0,0,1)] relative overflow-hidden flex items-center border border-white/5">
          {/* Laser eye / scanning light */}
          <motion.div 
            className="w-12 h-[2px] bg-red-500 shadow-[0_0_15px_red] absolute left-0"
            animate={{ x: ["0%", "800%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Brutalist details */}
        <div className="absolute top-4 left-6 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_5px_red] opacity-80" />
          <div className="w-3 h-3 rounded-full bg-accent-yellow/50" />
        </div>
        
        <div className="absolute -top-12 text-white/40 font-mono font-bold tracking-[0.2em] text-sm uppercase bg-black/50 px-4 py-1 rounded">
          {insertedTape ? "LOADING..." : "INSERT TAPE"}
        </div>
      </motion.div>

    </div>
  );
}
