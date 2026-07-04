"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
      <motion.div 
        className="bg-accent-yellow rounded-full shadow-lg flex items-center justify-center cursor-pointer pointer-events-auto"
        animate={{ width: isOpen ? 250 : 120, height: 48 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed"
              className="flex items-center gap-2 text-foreground font-medium px-6 w-full justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(true)}
            >
              <span>Menu</span>
              <Menu size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              className="flex items-center gap-4 text-foreground font-medium px-6 w-full justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex gap-4">
                <a href="#" className="hover:opacity-70 transition-opacity">Home</a>
                <a href="#projects" className="hover:opacity-70 transition-opacity">Works</a>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
