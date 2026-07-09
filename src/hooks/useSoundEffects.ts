"use client";

import { useCallback, useRef } from "react";

export function useSoundEffects() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize audio context only on user interaction
  const initAudio = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playClick = useCallback(() => {
    const ctx = initAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    
    // Create oscillator for a "clack" sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "square";
    // Pitch drops rapidly from 600Hz to 100Hz
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
    
    // Volume envelope (sharp attack, rapid decay)
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.05);
  }, [initAudio]);

  const playThud = useCallback(() => {
    const ctx = initAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    // Deep heavy drop
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.15);
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.2);
  }, [initAudio]);

  const playPrint = useCallback(() => {
    const ctx = initAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    
    // To simulate a printer, we create a short burst of noise repeated a few times
    const bufferSize = ctx.sampleRate * 0.1; // 100ms of noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    // We play this noise buffer 3 times in quick succession
    for (let i = 0; i < 3; i++) {
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 1000; // thin, papery sound
      
      const gain = ctx.createGain();
      const startTime = t + i * 0.15;
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.03, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      noise.start(startTime);
    }
  }, [initAudio]);

  return { playClick, playThud, playPrint, initAudio };
}
