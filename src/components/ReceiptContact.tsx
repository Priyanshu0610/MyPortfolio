"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function ReceiptContact() {
  const [isSent, setIsSent] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mounted, setMounted] = useState(false);
  const paperControls = useAnimation();
  
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setForm(prev => ({ ...prev, message: val }));
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) return;
    
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Message from ${form.name}`,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Transmission failed.");
      }
    } catch (error: any) {
      console.error(error);
      setSubmitError("ERROR: MISSING API KEY OR FAILED");
      setIsSubmitting(false);
      return; // Stop animation if failed
    }

    setIsSubmitting(false);
    setIsSent(true);

    // 1. Tear off
    await paperControls.start({
      y: 100,
      rotate: Math.random() * 5 - 2.5,
      transition: { duration: 0.3, ease: "easeOut" }
    });

    // 2. Crumple into a ball
    await paperControls.start({
      scale: 0.15,
      rotate: 720,
      borderRadius: "50%",
      backgroundColor: "#d1d5db", // slightly darker grey for crumpled shadow
      boxShadow: "inset 0px 0px 50px rgba(0,0,0,0.8)",
      transition: { duration: 0.4, type: "spring", stiffness: 200 }
    });

    // 3. Shoot away
    await paperControls.start({
      x: 1000,
      y: -500,
      opacity: 0,
      transition: { duration: 0.5, ease: "anticipate" }
    });

    // Wait and reset (Print new receipt)
    setTimeout(() => {
      setIsPrinting(true);
      setForm({ name: "", email: "", message: "" });
      setSubmitError("");
      if (textareaRef.current) textareaRef.current.style.height = "100px";
      
      // Reset paper
      paperControls.set({
        x: 0,
        y: -500, // hidden up in the printer
        scale: 1,
        rotate: 0,
        borderRadius: "0px",
        backgroundColor: "#fff",
        opacity: 1,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)"
      });

      // Slowly print down
      paperControls.start({
        y: 0,
        transition: { duration: 1.5, ease: "linear" }
      }).then(() => {
        setIsSent(false);
        setIsPrinting(false);
      });
    }, 1000);
  };

  return (
    <div className="relative w-full min-h-[900px] flex flex-col items-center justify-start overflow-hidden pt-10 no-stamp bg-transparent">
      
      {/* Background brutalist grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-20 flex flex-col items-center w-full max-w-[500px]">
        
        {/* Printer Slot (Z-30 so paper slides behind it) */}
        <div className="w-[110%] h-[40px] bg-[#1a1a1a] rounded-sm border-b-4 border-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,1)] relative z-30 flex justify-center items-end pb-2">
          {/* Status light */}
          <div className={`w-3 h-3 rounded-full absolute right-6 top-4 shadow-[0_0_10px_currentColor] transition-colors duration-300 ${isSent ? 'bg-red-500 text-red-500' : isPrinting ? 'bg-accent-yellow text-accent-yellow animate-pulse' : 'bg-green-500 text-green-500'}`} />
          {/* Printer slit */}
          <div className="w-[90%] h-1 bg-black shadow-inner" />
        </div>

        {/* The Receipt Paper */}
        <div className="w-[90%] relative z-20" style={{ perspective: "1000px" }}>
          <motion.div
            layout
            animate={paperControls}
            initial={{ y: 0 }}
            className="w-full bg-white shadow-2xl relative overflow-hidden flex flex-col"
            style={{ 
              transformOrigin: "top center",
              // Jagged bottom edge using mask-image
              maskImage: "radial-gradient(circle at 10px 100%, transparent 10px, black 11px)",
              maskSize: "20px 100%",
              maskPosition: "bottom",
              paddingBottom: "20px" // Space for the jagged edge
            }}
          >
            {/* Faint thermal paper grid/lines */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 29px, #000 30px)' }} />
            
            {/* Thermal Print Content */}
            <div className="p-8 font-mono text-black/80 flex flex-col gap-6 relative z-10">
              
              {/* Header */}
              <div className="text-center border-b-2 border-black/20 pb-6 border-dashed">
                <h3 className="text-3xl font-black tracking-tighter mb-2 uppercase text-black">Transmit</h3>
                <div className="text-[10px] tracking-widest uppercase">ID: {mounted ? Math.random().toString(36).substr(2, 9).toUpperCase() : "PENDING"}</div>
                <div className="text-[10px] tracking-widest uppercase">{mounted ? new Date().toLocaleString() : "INITIALIZING..."}</div>
              </div>

              {/* Form Inputs */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">From:</label>
                  <input 
                    type="text" 
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="ENTER NAME"
                    className="bg-transparent border-none focus:outline-none focus:ring-0 px-0 text-lg font-bold text-black placeholder:text-black/20"
                    disabled={isSent || isPrinting || isSubmitting}
                  />
                  <div className="w-full border-b border-black/10 border-dashed mt-1" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Reply To:</label>
                  <input 
                    type="email" 
                    value={form.email}
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="ENTER EMAIL"
                    className="bg-transparent border-none focus:outline-none focus:ring-0 px-0 text-lg font-bold text-black placeholder:text-black/20"
                    disabled={isSent || isPrinting || isSubmitting}
                  />
                  <div className="w-full border-b border-black/10 border-dashed mt-1" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Payload:</label>
                  <textarea 
                    ref={textareaRef}
                    value={form.message}
                    onChange={handleInput}
                    placeholder="ENTER MESSAGE..."
                    className="bg-transparent border-none focus:outline-none focus:ring-0 px-0 text-base font-medium text-black placeholder:text-black/20 resize-none min-h-[100px] overflow-hidden leading-relaxed"
                    disabled={isSent || isPrinting || isSubmitting}
                  />
                </div>
              </div>

              {submitError && (
                <div className="mt-2 text-xs font-bold text-red-500 uppercase tracking-widest text-center animate-pulse">
                  {submitError}
                </div>
              )}

              {/* Total / Action */}
              <div className="pt-6 border-t-2 border-black/20 border-dashed mt-4 flex flex-col items-center">
                <div className="w-full flex justify-between text-xs font-bold uppercase tracking-widest mb-6">
                  <span>Status:</span>
                  <span>{isSubmitting ? 'CONNECTING...' : isSent ? 'DISPATCHED' : isPrinting ? 'PRINTING' : 'PENDING'}</span>
                </div>
                
                <button
                  onClick={handleSend}
                  disabled={isSent || isPrinting || isSubmitting || !form.message}
                  className="w-full py-4 bg-black text-white font-black uppercase tracking-widest text-sm hover:bg-accent-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10">Tear & Send</span>
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
