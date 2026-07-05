"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScratchOffProps {
  children: React.ReactNode;
  brushSize?: number;
  className?: string;
  coverColor?: string;
}

export default function ScratchOff({ 
  children, 
  brushSize = 60, 
  className = "",
  coverColor = "#111111" 
}: ScratchOffProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set actual size in memory (scaled to account for high DPI devices)
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      fillCanvas();
    };

    const fillCanvas = () => {
      if (isRevealed) return;
      const rect = container.getBoundingClientRect();
      
      // Base dark color
      ctx.fillStyle = coverColor;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw some noise/texture to make it look gritty
      for (let i = 0; i < 5000; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const alpha = Math.random() * 0.15;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(x, y, Math.random() * 2, Math.random() * 2);
      }
      
      // Draw some "secret" text on the cover
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.font = "bold 20px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2);

      // Reset composition for erasing
      ctx.globalCompositeOperation = "destination-out";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;

      if (window.TouchEvent && e instanceof TouchEvent) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (isRevealed) return;
      
      // We don't require mousedown, just moving over it scratches it
      const { x, y } = getMousePos(e);
      
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();

      // Check how much is cleared (expensive, so throttle or only check occasionally)
      // To keep performance high, we'll just let them scratch forever without auto-revealing,
      // or we can just rely on the user scratching everything they want to see.
      // For this implementation, we will just let the canvas stay.
    };

    canvas.addEventListener("mousemove", scratch, { passive: true });
    canvas.addEventListener("touchmove", scratch, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (canvas) {
        canvas.removeEventListener("mousemove", scratch);
        canvas.removeEventListener("touchmove", scratch);
      }
    };
  }, [brushSize, coverColor, isRevealed]);

  return (
    <div ref={containerRef} className={`relative w-full h-full select-none ${className}`}>
      {/* The actual hidden content */}
      <div className="w-full h-full">
        {children}
      </div>

      {/* The Scratch-off Cover */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 w-full h-full cursor-crosshair z-20 touch-none no-stamp rounded-[inherit]"
            style={{ pointerEvents: isRevealed ? "none" : "auto" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
