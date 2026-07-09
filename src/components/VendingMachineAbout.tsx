"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ProductCode = "A1" | "A2" | "B1" | "B2" | null;

interface Product {
  code: ProductCode;
  title: string;
  color: string;
  content: React.ReactNode;
  renderItem: () => React.ReactNode;
}

const products: Record<string, Product> = {
  A1: {
    code: "A1",
    title: "BIO",
    color: "#ff7262",
    renderItem: () => (
      // Soda Can
      <div className="w-16 h-28 rounded-xl border-4 border-black bg-gradient-to-r from-[#ff7262] via-[#ff958a] to-[#ff7262] shadow-[inset_-5px_0_10px_rgba(0,0,0,0.2)] relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-0 w-full h-3 border-b-4 border-black bg-black/20 rounded-t-xl" />
        <div className="absolute bottom-0 w-full h-2 border-t-4 border-black bg-black/20 rounded-b-xl" />
        <span className="font-black text-2xl -rotate-90 tracking-widest text-black mt-2">BIO</span>
      </div>
    ),
    content: (
      <div className="space-y-4 font-mono text-black">
        <p>I&apos;m <strong className="text-black">Priyanshu Raj</strong>, a Frontend Developer and BCA student at Sarala Birla University in Ranchi.</p>
        <p>I specialize in crafting visually stunning, responsive, and performance-optimized user interfaces.</p>
        <p>Most recently, I expanded my technical horizons through an AI Web Development Internship with the Inamigos Foundation.</p>
      </div>
    )
  },
  A2: {
    code: "A2",
    title: "STACK",
    color: "#1abcfe",
    renderItem: () => (
      // Floppy Disk
      <div className="w-24 h-24 rounded-sm border-4 border-black bg-[#1abcfe] relative flex flex-col items-center justify-end p-2 shadow-inner">
        <div className="absolute top-0 w-12 h-8 border-x-4 border-b-4 border-black bg-gray-200 rounded-b-sm flex justify-end p-1">
          <div className="w-3 h-4 bg-black" />
        </div>
        <div className="w-full h-8 border-2 border-black bg-white flex items-center justify-center overflow-hidden">
          <span className="font-black text-[12px] text-black">STACK</span>
        </div>
      </div>
    ),
    content: (
      <div className="flex flex-wrap gap-2 font-mono">
        {["JavaScript", "React", "Next.js", "GSAP", "Tailwind CSS", "HTML5", "CSS3"].map((skill) => (
          <span key={skill} className="bg-black text-white px-3 py-1 text-sm border-2 border-black">{skill}</span>
        ))}
      </div>
    )
  },
  B1: {
    code: "B1",
    title: "SYS",
    color: "#0acf83",
    renderItem: () => (
      // Cassette Tape
      <div className="w-28 h-16 rounded-md border-4 border-black bg-[#0acf83] relative flex flex-col items-center justify-center p-1 shadow-inner">
        <div className="absolute top-1 w-20 h-3 bg-white/20 rounded-sm" />
        <div className="w-20 h-6 border-2 border-black bg-white rounded-full flex items-center justify-between px-2 mt-2">
          <div className="w-3 h-3 rounded-full bg-black" />
          <span className="font-black text-[8px] text-black">SYS</span>
          <div className="w-3 h-3 rounded-full bg-black" />
        </div>
      </div>
    ),
    content: (
      <div className="space-y-3 font-mono text-black">
        <div className="flex items-center justify-between border-b-2 border-black/20 pb-2">
          <strong>C / C++</strong> <span>(OOPs)</span>
        </div>
        <div className="flex items-center justify-between border-b-2 border-black/20 pb-2">
          <strong>Python</strong> <span>(Pandas)</span>
        </div>
        <div className="flex items-center justify-between border-b-2 border-black/20 pb-2">
          <strong>Git & GitHub</strong> <span>(Version Control)</span>
        </div>
      </div>
    )
  },
  B2: {
    code: "B2",
    title: "LOC",
    color: "#f24e1e",
    renderItem: () => (
      // Battery
      <div className="w-16 h-28 border-4 border-black bg-gradient-to-b from-[#ff8c73] to-[#f24e1e] relative rounded-md flex flex-col items-center justify-center mt-2 shadow-inner">
        <div className="absolute -top-3 w-6 h-3 border-4 border-b-0 border-black bg-gray-300 rounded-t-sm" />
        <span className="font-black text-2xl -rotate-90 text-black">LOC</span>
      </div>
    ),
    content: (
      <div className="font-mono text-center">
        <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 text-black">Ranchi</h3>
        <h3 className="text-2xl font-bold uppercase tracking-widest text-black/50">India</h3>
        <div className="mt-8 p-3 bg-black text-white text-xs font-bold tracking-widest uppercase animate-pulse inline-block">
          Available For Work
        </div>
      </div>
    )
  }
};

export default function VendingMachineAbout() {
  const [inputCode, setInputCode] = useState("");
  const [dispensedItem, setDispensedItem] = useState<ProductCode>(null);
  const [isDispensing, setIsDispensing] = useState(false);
  const [viewingItem, setViewingItem] = useState<ProductCode>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [dropRotation, setDropRotation] = useState(0);

  const handleKeyPress = (key: string) => {
    if (isDispensing || viewingItem) return;
    
    setErrorMsg("");
    if (key === "CLEAR") {
      setInputCode("");
    } else if (key === "ENT") {
      if (inputCode.length !== 2) {
        setErrorMsg("INVALID");
        setTimeout(() => setErrorMsg(""), 1500);
        return;
      }
      
      const product = products[inputCode];
      if (product) {
        // Dispense!
        setIsDispensing(true);
        setInputCode("WAIT");
        // eslint-disable-next-line react-hooks/purity
        setDropRotation(Math.random() * 90 - 45);
        
        // Wait for drop animation
        setTimeout(() => {
          setDispensedItem(product.code);
          setIsDispensing(false);
          setInputCode("");
        }, 1500);
      } else {
        setErrorMsg("EMPTY");
        setTimeout(() => setErrorMsg(""), 1500);
      }
    } else {
      if (inputCode.length < 2) {
        setInputCode(prev => prev + key);
      }
    }
  };

  const handleItemClick = () => {
    if (dispensedItem) {
      setViewingItem(dispensedItem);
    }
  };

  const closeViewer = () => {
    setViewingItem(null);
    setDispensedItem(null);
  };

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 w-full border-t border-black/10 dark:border-white/10 relative overflow-hidden flex items-center justify-center no-stamp">
      
      {/* Background Graphic */}
      <div className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 text-[8rem] md:text-[15rem] font-sans font-black text-transparent opacity-[0.03] dark:opacity-10 pointer-events-none tracking-tighter select-none" style={{ WebkitTextStroke: "2px currentColor" }}>
        VEND
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        
        {/* The Hazard Warning Sticker */}
        <motion.div 
          initial={{ rotate: -5, y: 20 }}
          whileInView={{ rotate: -8, y: 0 }}
          viewport={{ once: true }}
          className="z-20 self-start ml-4 md:ml-12 -mb-6 px-4 py-2 bg-[#F7DF1E] border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative overflow-hidden group hover:rotate-0 transition-transform duration-300 cursor-pointer"
        >
          {/* Diagonal Hazard Stripes */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)' }} />
          <span className="font-mono font-black text-black text-xs md:text-sm uppercase tracking-widest relative z-10">
            WARNING: INSERT CODE TO DISPENSE DATA. NO REFUNDS.
          </span>
        </motion.div>

        {/* The Vending Machine */}
        <div className="w-full flex flex-col md:flex-row items-stretch bg-[#111] p-4 md:p-8 rounded-3xl border-8 border-black shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          
          {/* LEFT: The Glass Window */}
        <div className="w-full md:w-2/3 bg-black rounded-xl border-4 border-[#333] relative overflow-hidden flex flex-col justify-between">
          
          {/* Inner Shadow / Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20" />
          
          {/* Shelves */}
          <div className="flex-1 flex flex-col gap-10 p-8 z-10">
            {/* Top Shelf */}
            <div className="w-full border-b-[8px] border-[#222] relative flex justify-around items-end pb-2">
              <ShelfItem product={products.A1} label="A1" />
              <ShelfItem product={products.A2} label="A2" />
            </div>
            {/* Bottom Shelf */}
            <div className="w-full border-b-[8px] border-[#222] relative flex justify-around items-end pb-2">
              <ShelfItem product={products.B1} label="B1" />
              <ShelfItem product={products.B2} label="B2" />
            </div>
          </div>

          {/* Collection Tray */}
          <div className="h-40 bg-[#0a0a0a] border-t-8 border-[#222] relative flex items-center justify-center overflow-hidden z-30 shadow-[inset_0_20px_20px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-x-8 top-0 h-4 bg-black/50" />
            
            <AnimatePresence>
              {isDispensing && (
                <motion.div
                  initial={{ y: -300, rotate: dropRotation }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 1.5 }}
                  className="absolute"
                >
                  <div className="w-24 h-24 bg-white border-4 border-black flex items-center justify-center font-black text-2xl shadow-xl">
                    ...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {dispensedItem && !isDispensing && (
                <motion.div
                  initial={{ scale: 0.8, y: 50, rotate: -10 }}
                  animate={{ scale: 1, y: 0, rotate: 0 }}
                  whileHover={{ scale: 1.05, cursor: "pointer" }}
                  onClick={handleItemClick}
                  className="relative group"
                >
                  <div className="relative transform scale-125 origin-center group">
                    {products[dispensedItem].renderItem()}
                    
                    {/* Interaction Overlay */}
                    <div className="absolute inset-0 bg-white/0 hover:bg-white/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 z-10 cursor-pointer">
                      <span className="text-[10px] font-black bg-black text-white px-2 py-1 rotate-12">OPEN</span>
                    </div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none rounded-[inherit]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Flap */}
            <div className="absolute inset-0 pointer-events-none border-t-4 border-[#111] opacity-50" />
          </div>
        </div>

        {/* RIGHT: Control Panel */}
        <div className="w-full md:w-1/3 flex flex-col p-6 gap-8 bg-[#1a1a1a] rounded-r-xl border-l-4 border-[#0a0a0a] z-30">
          
          {/* LED Display */}
          <div className="w-full h-24 bg-[#0a0a0a] border-4 border-black rounded-lg p-4 flex flex-col justify-center items-end shadow-[inset_0_5px_10px_rgba(0,0,0,0.8)]">
            <span className="text-red-500 font-mono text-3xl font-bold tracking-widest" style={{ textShadow: "0 0 10px rgba(239,68,68,0.8)" }}>
              {errorMsg || inputCode || "----"}
            </span>
            <span className="text-red-500/50 font-mono text-[10px] uppercase mt-1">
              Insert Code
            </span>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {["A", "B", "1", "2"].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="bg-[#333] active:bg-[#111] border-b-4 active:border-b-0 active:translate-y-[4px] border-[#111] text-white font-mono text-2xl font-bold py-4 rounded transition-all"
              >
                {key}
              </button>
            ))}
            <button
              onClick={() => handleKeyPress("CLEAR")}
              className="bg-red-600 active:bg-red-800 border-b-4 active:border-b-0 active:translate-y-[4px] border-red-900 text-white font-mono text-xl font-bold py-4 rounded transition-all"
            >
              CLR
            </button>
            <button
              onClick={() => handleKeyPress("ENT")}
              className="bg-green-600 active:bg-green-800 border-b-4 active:border-b-0 active:translate-y-[4px] border-green-900 text-white font-mono text-xl font-bold py-4 rounded transition-all"
            >
              ENT
            </button>
          </div>

          {/* Coin Slot Dummy */}
          <div className="w-full flex justify-center mt-4">
            <div className="w-12 h-20 bg-[#0a0a0a] border-2 border-[#333] rounded-sm flex items-center justify-center">
              <div className="w-2 h-12 bg-black rounded-full shadow-[inset_0_2px_5px_rgba(0,0,0,1)]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Close the flex-col items-center wrapper */}
      </div>

      {/* MODAL / VIEW ITEM */}
      <AnimatePresence>
        {viewingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={closeViewer}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", bounce: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#faf9f6] border-8 border-black shadow-[20px_20px_0_0_rgba(0,0,0,1)] flex flex-col overflow-hidden relative cursor-auto"
            >
              {/* Header */}
              <div 
                className="w-full py-4 px-6 border-b-8 border-black flex justify-between items-center"
                style={{ backgroundColor: products[viewingItem].color }}
              >
                <h2 className="text-3xl font-black text-black uppercase tracking-tighter">
                  {products[viewingItem].title}
                </h2>
                <button 
                  onClick={closeViewer}
                  className="w-10 h-10 bg-black text-white font-black hover:bg-red-500 transition-colors border-2 border-black"
                >
                  X
                </button>
              </div>
              
              {/* Content */}
              <div className="p-8 bg-white min-h-[250px] flex flex-col justify-center">
                {products[viewingItem].content}
              </div>

              {/* Barcode Footer */}
              <div className="w-full bg-[#f4f4f5] border-t border-black/10 p-4 flex justify-between items-center opacity-60 grayscale">
                <div className="font-mono text-xs font-bold tracking-[0.2em]">{products[viewingItem].code}-009214</div>
                <div className="w-24 h-6" style={{ backgroundImage: "repeating-linear-gradient(90deg, black, black 2px, transparent 2px, transparent 4px, black 4px, black 5px, transparent 5px, transparent 8px)" }} />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </section>
  );
}

// Sub-component for the shelf items
function ShelfItem({ product, label }: { product: Product, label: string }) {
  return (
    <div className="flex flex-col items-center gap-4 relative">
      <div className="relative group">
        {product.renderItem()}
        <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors pointer-events-none rounded-[inherit]" />
      </div>
      <div className="bg-[#111] border-2 border-[#333] px-3 py-1 rounded text-white font-mono text-sm font-bold shadow-inner">
        {label}
      </div>
    </div>
  );
}
