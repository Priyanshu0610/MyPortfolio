"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WorksPage() {
  const router = useRouter();

  useEffect(() => {
    // Force scroll to top instantly
    window.scrollTo(0, 0);
    // Backup scroll after layout paints
    const timeout = setTimeout(() => window.scrollTo(0, 0), 50);
    return () => clearTimeout(timeout);
  }, []);

  const handleDossierClick = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    router.push(`/works/${slug}`);
  };

  return (
    <main className="min-h-[100dvh] w-screen bg-background relative selection:bg-foreground selection:text-background">
      
      {/* 
        Scrollable Container. 
        We map through the projects. Each one is a sticky 100vh section.
      */}
      <div className="relative w-full">
        
        {/* Title to introduce the scroll */}
        <div className="h-[80vh] flex items-center justify-center sticky top-0 z-0 pointer-events-none">
           <h1 className="text-[12vw] font-playfair font-black text-foreground tracking-tighter uppercase opacity-[0.03]">The Archive</h1>
        </div>

        {projects.map((project, index) => {
          // Alternate slight rotations for the overlapping stack effect
          const rotations = [-2, 3, -1, 4];
          const rotation = rotations[index % rotations.length];

          return (
            <div 
              key={project.id}
              className="h-[100dvh] w-full flex items-center justify-center sticky top-0"
              style={{ zIndex: index + 10 }} // Stacks on top of previous
            >
              <div 
                className="w-[92vw] md:w-[85vw] h-[85vh] bg-[#faf9f6] p-6 md:p-12 relative flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.5)] cursor-none group"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  // Massive perforated edges for the big sheet itself
                  WebkitMaskImage: `linear-gradient(#000 0 0), radial-gradient(circle at 12px 12px, transparent 6px, #000 6.5px)`,
                  WebkitMaskPosition: `center, -12px -12px`,
                  WebkitMaskSize: `calc(100% - 24px) calc(100% - 24px), 24px 24px`,
                  WebkitMaskRepeat: `no-repeat, repeat`,
                  maskImage: `linear-gradient(#000 0 0), radial-gradient(circle at 12px 12px, transparent 6px, #000 6.5px)`,
                  maskPosition: `center, -12px -12px`,
                  maskSize: `calc(100% - 24px) calc(100% - 24px), 24px 24px`,
                  maskRepeat: `no-repeat, repeat`,
                }}
              >
                {/* Internal Stamp Border Outline */}
                <div className="absolute inset-4 md:inset-6 border-[3px] border-black/10 pointer-events-none z-10" />

                {/* Stamp Typography Header */}
                <div className="flex justify-between items-start pointer-events-none select-none mb-4 md:mb-6 shrink-0">
                  <div className="flex flex-col">
                    <span className="font-mono text-sm md:text-base font-bold tracking-[0.3em] text-black/40 mb-1 md:mb-2">{project.serial}</span>
                    <h3 className="text-4xl sm:text-6xl md:text-8xl font-playfair font-black uppercase tracking-tighter text-black leading-[0.85] w-full break-words">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* Stamp Value */}
                  <div className="text-right">
                     <span className="font-serif italic text-6xl md:text-9xl font-black text-black/20 tracking-tighter leading-none">{project.year.slice(-2)}</span>
                     <span className="font-mono text-lg md:text-xl block text-black/30 font-bold">¢</span>
                  </div>
                </div>

                {/* The Photo Frame - FILLS REMAINING SPACE */}
                <div className="flex-1 w-full relative overflow-hidden bg-black/10 mt-2 mb-6 md:mb-8">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none select-none"
                    draggable={false}
                  />
                  {/* Evidence Stamp Overlay */}
                  <div className="absolute top-4 right-4 md:top-8 md:right-8 border-[4px] border-red-600/80 bg-background text-red-600 font-sans font-black text-2xl md:text-4xl uppercase tracking-widest px-4 md:px-6 py-2 z-20 shadow-xl rotate-12 mix-blend-multiply pointer-events-none">
                    EXHIBIT
                  </div>
                </div>

                {/* Authentic Barcode Button at Bottom */}
                <div 
                  className="shrink-0 border-t-[3px] border-black/10 pt-4 md:pt-6 cursor-none pointer-events-auto group/btn"
                  onClick={(e) => handleDossierClick(e, project.slug)}
                >
                  <div className="flex flex-col items-center justify-center gap-3 md:gap-4 opacity-60 group-hover/btn:opacity-100 transition-opacity">
                    {/* CSS Barcode lines scaled up */}
                    <div className="flex gap-[3px] md:gap-[4px] h-12 md:h-16 w-full max-w-xl justify-center mx-auto">
                      <div className="w-2 bg-black h-full" />
                      <div className="w-4 bg-black h-full" />
                      <div className="w-[3px] bg-black h-full" />
                      <div className="w-2 bg-black h-full" />
                      <div className="w-6 bg-black h-full" />
                      <div className="w-[2px] bg-black h-full" />
                      <div className="w-4 bg-black h-full" />
                      <div className="w-[5px] bg-black h-full" />
                      <div className="w-2 bg-black h-full" />
                      <div className="w-[3px] bg-black h-full" />
                      <div className="w-[2px] bg-black h-full" />
                      <div className="w-2 bg-black h-full" />
                      <div className="w-4 bg-black h-full" />
                      <div className="w-[2px] bg-black h-full" />
                      <div className="w-[5px] bg-black h-full" />
                      <div className="w-2 bg-black h-full" />
                      <div className="w-[3px] bg-black h-full" />
                      <div className="w-[2px] bg-black h-full" />
                      <div className="w-4 bg-black h-full" />
                    </div>
                    <span className="font-mono text-xs md:text-base font-bold tracking-[0.4em] uppercase text-black">
                      Scan to Open Dossier
                    </span>
                  </div>
                </div>

                {/* Random Authenticated Postmark Overlay (Background) */}
                <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full border-[4px] border-black/20 flex items-center justify-center -rotate-12 pointer-events-none select-none mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                  <div className="absolute inset-4 rounded-full border-[2px] border-black/10" />
                  <span className="text-xl md:text-3xl font-mono font-bold text-black/40 tracking-[0.4em] uppercase text-center leading-tight absolute top-8 md:top-12">
                    POSTMARKED
                  </span>
                  <span className="text-sm md:text-xl font-mono text-black/30 absolute bottom-12 md:bottom-16">{project.year} // ARCHIVE</span>
                  
                  {/* Wavy cancellation lines */}
                  <div className="w-[200%] h-[2px] bg-black/20 absolute top-1/2 -left-1/4 transform -translate-y-6 md:-translate-y-8" />
                  <div className="w-[200%] h-[2px] bg-black/20 absolute top-1/2 -left-1/4" />
                  <div className="w-[200%] h-[2px] bg-black/20 absolute top-1/2 -left-1/4 transform translate-y-6 md:translate-y-8" />
                </div>

              </div>
            </div>
          );
        })}
      </div>
      
      {/* Floating UI: Back Button */}
      <div className="fixed top-6 left-6 z-[200] pointer-events-auto">
         <Link href="/" className="no-stamp inline-block">
            <motion.div 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent-yellow flex flex-col items-center justify-center relative cursor-none group shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-[3px] border-black"
              initial={{ rotate: -15 }}
              whileHover={{ rotate: 5, scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-2 border-[2px] border-black/30 rounded-full border-dashed group-hover:rotate-[45deg] transition-transform duration-700 pointer-events-none" />
              <div className="text-center relative z-10">
                <span className="font-sans font-black text-black uppercase text-xs md:text-sm leading-none tracking-tighter block mb-1">
                  RETURN
                </span>
                <span className="font-playfair font-black italic text-black text-lg md:text-xl leading-none block">
                  To Base
                </span>
              </div>
            </motion.div>
         </Link>
      </div>

    </main>
  );
}
