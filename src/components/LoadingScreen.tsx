'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  '[BOOT] Initializing deep space interface...',
  '[SYSTEM] Loading WebGL engine............. OK',
  '[SYSTEM] Calibrating particle field....... OK',
  '[SYSTEM] Compiling 26 repositories........ OK',
  '[SYSTEM] Synchronizing HUD overlays....... OK',
  '[NETWORK] Establishing data links......... OK',
  '[SECURITY] Encrypting channels............ OK',
  '[RENDER] Warming up scroll engine......... OK',
  '[SYSTEM] All modules operational.',
  '[SYSTEM ACTIVE] WELCOME, SHREYAS VAVLEY.',
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    const totalDuration = 3000; // ms
    const lineInterval = totalDuration / BOOT_LINES.length;

    // Animate progress bar
    const obj = { progress: 0 };
    gsap.to(obj, {
      progress: 100,
      duration: totalDuration / 1000,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (progressTextRef.current)
          progressTextRef.current.textContent = `${Math.floor(obj.progress)}%`;
        if (progressBarRef.current)
          progressBarRef.current.style.width = `${obj.progress}%`;
      },
    });

    // Show boot lines progressively
    const interval = setInterval(() => {
      if (lineIndex < BOOT_LINES.length) {
        setVisibleLines((prev) => [...prev, BOOT_LINES[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setDone(true);
      }
    }, lineInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!done) return;

    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(containerRef.current, {
      opacity: 0,
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
    });
  }, [done, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian overflow-hidden"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-20" />

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none grid-bg opacity-10" />

      {/* Main content */}
      <div className="relative w-full max-w-2xl px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
            <span className="font-mono text-xs tracking-[0.4em] text-neon-green uppercase">
              ODYSSEY OS v4.2.7
            </span>
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
          </div>
          <h1 className="font-mono text-4xl font-bold text-white tracking-wider mb-2">
            LOADING MODULES
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />
        </div>

        {/* Terminal output */}
        <div className="glass-card rounded-lg p-6 mb-6 min-h-[240px] font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-white/30 text-xs">odyssey@system:~</span>
          </div>
          <div className="space-y-1">
            {visibleLines.map((line, i) => (
              <div
                key={i}
                className={`text-xs leading-relaxed animate-fade-in ${
                  i === visibleLines.length - 1
                    ? 'text-neon-cyan'
                    : i >= BOOT_LINES.length - 2
                    ? 'text-neon-green'
                    : 'text-white/60'
                }`}
              >
                {line}
                {i === visibleLines.length - 1 && !done && (
                  <span className="inline-block w-2 h-4 bg-neon-cyan ml-1 animate-blink align-middle" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs text-white/40">SYSTEM INITIALIZATION</span>
            <span ref={progressTextRef} className="font-mono text-xs text-neon-cyan font-bold">
              0%
            </span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-green transition-all"
              style={{ width: '0%', boxShadow: '0 0 10px rgba(0,255,255,0.5)' }}
            />
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-neon-cyan/50 rounded-tl-lg" />
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-neon-cyan/50 rounded-tr-lg" />
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-neon-cyan/50 rounded-bl-lg" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-neon-cyan/50 rounded-br-lg" />
      </div>
    </div>
  );
}
