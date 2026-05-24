'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  X,
  User,
  MapPin,
  Cpu,
  Target,
  BadgeCheck,
  Terminal,
  Link,
  Mail,
  GitBranch,
  Network
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const terminalTextRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Terminal typing effect logic
  useEffect(() => {
    if (isOpen && terminalTextRef.current) {
      const lines = [
        '[INIT] Initializing Biometric Profile...',
        '[IDENTITY] Shreyas S V // Shreyas Vavley',
        '[CORE] AI & ML Developer & Computer Science Student based in Bengaluru, India.',
        '[SYSTEM ENGINE] Specialized in deep learning, full-stack architectures (Python, Java, C++), and cloud infrastructure.',
        '[ACTIVE CREDENTIALS] AWS Student Builder Campus Leader (2026) & Oracle OCI AI Foundations Associate.',
        '[CURRENT DIRECTIVE] Architecting intelligent autonomous agents and penetration testing secure networks.',
        '[STATUS] All systems operational. Awaiting command.'
      ];

      terminalTextRef.current.innerHTML = '';
      
      const tl = gsap.timeline();
      lines.forEach((line, index) => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'opacity-0 mb-1';
        
        // Colorize prefixes
        const coloredLine = line
          .replace('[INIT]', '<span class="text-neon-violet">[INIT]</span>')
          .replace('[IDENTITY]', '<span class="text-neon-cyan">[IDENTITY]</span>')
          .replace('[CORE]', '<span class="text-neon-green">[CORE]</span>')
          .replace('[SYSTEM ENGINE]', '<span class="text-amber-400">[SYSTEM ENGINE]</span>')
          .replace('[ACTIVE CREDENTIALS]', '<span class="text-neon-violet">[ACTIVE CREDENTIALS]</span>')
          .replace('[CURRENT DIRECTIVE]', '<span class="text-neon-cyan">[CURRENT DIRECTIVE]</span>')
          .replace('[STATUS]', '<span class="text-neon-green">[STATUS]</span>');
          
        lineDiv.innerHTML = coloredLine;
        terminalTextRef.current?.appendChild(lineDiv);
        
        tl.to(lineDiv, {
          opacity: 1,
          duration: 0.1,
          ease: 'none',
          delay: index === 0 ? 0.5 : 0.2
        });
      });
    }
  }, [isOpen]);

  // Entry/Exit animations
  useEffect(() => {
    if (!overlayRef.current || !contentRef.current || isAnimating.current) return;

    if (isOpen) {
      isAnimating.current = true;
      gsap.timeline({ onComplete: () => { isAnimating.current = false; } })
        .set(overlayRef.current, { display: 'flex' })
        .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        .fromTo(contentRef.current, 
          { scale: 0.9, opacity: 0, y: 20 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 
          '-=0.15'
        );
    } else {
      isAnimating.current = true;
      gsap.timeline({
        onComplete: () => { 
          if (overlayRef.current) overlayRef.current.style.display = 'none';
          isAnimating.current = false; 
        },
      })
        .to(contentRef.current, { scale: 0.95, opacity: 0, y: 10, duration: 0.3, ease: 'power2.in' })
        .to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1');
    }
  }, [isOpen]);

  // ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(11,11,15,0.85)', backdropFilter: 'blur(12px)' }}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden glass-card"
        style={{
          border: `1px solid rgba(255,255,255,0.1)`,
          boxShadow: `0 0 60px rgba(0, 255, 255, 0.05), 0 0 120px rgba(168, 85, 247, 0.05)`,
        }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        
        {/* Top Bar */}
        <div className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-obsidian/80">
          <div className="flex items-center gap-3">
            <User size={16} className="text-neon-cyan" />
            <span className="font-mono text-sm tracking-widest text-neon-cyan uppercase">
              [ BIOMETRIC PROFILE ]
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all hover:scale-105 active:scale-95 text-red-500 border-red-500/30 bg-red-500/10"
          >
            <X size={12} />
            CLOSE [ESC]
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          
          {/* Dashboard Split Layout */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            
            {/* Left Column: Core Identity */}
            <div className="flex-shrink-0 w-full lg:w-1/3 flex flex-col items-center lg:items-start">
              {/* Glowing Avatar Slot */}
              <div className="relative mb-6">
                <div className="absolute -inset-1 rounded-full border border-neon-cyan/50 animate-pulse-glow" />
                <div className="absolute -inset-3 rounded-full border border-neon-violet/30 border-dashed animate-[spin_10s_linear_infinite]" />
                <div className="w-32 h-32 rounded-full bg-obsidian border-2 border-neon-cyan flex items-center justify-center overflow-hidden z-10 relative">
                   <User size={48} className="text-neon-cyan/50" />
                   {/* Replace with your image: <img src="/your-image.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
                </div>
              </div>

              {/* Identity Text */}
              <h1 className="font-display text-4xl font-bold text-white mb-2 text-center lg:text-left">
                Shreyas S V
              </h1>
              <h2 className="font-mono text-sm text-neon-violet tracking-widest uppercase mb-4 text-center lg:text-left">
                Computer Science Student <br/> AI & ML Developer
              </h2>
              
              <div className="flex items-center gap-2 text-white/60 font-mono text-xs mb-8">
                <MapPin size={14} className="text-neon-green" />
                BENGALURU, INDIA
              </div>

              {/* Direct Comms / Links */}
              <div className="w-full space-y-3">
                <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-2">
                  Secure Comms Links
                </div>
                <a 
                  href="https://www.linkedin.com/in/shreyas-sv/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-[#0077b5] hover:bg-[#0077b5]/10 transition-all group"
                >
                  <Link size={18} className="text-white/60 group-hover:text-[#0077b5]" />
                  <span className="font-mono text-sm text-white/80 group-hover:text-white">LinkedIn Network</span>
                </a>
                <a 
                  href="mailto:shreyasvavley@gmail.com" 
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 transition-all group"
                >
                  <Mail size={18} className="text-white/60 group-hover:text-red-400" />
                  <span className="font-mono text-sm text-white/80 group-hover:text-white">Direct Transmission</span>
                </a>
                <a 
                  href="https://github.com/ShreyasVavley" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all group"
                >
                  <GitBranch size={18} className="text-white/60 group-hover:text-white" />
                  <span className="font-mono text-sm text-white/80 group-hover:text-white">GitHub Repositories</span>
                </a>
              </div>
            </div>

            {/* Right Column: Skill Matrix & Stats */}
            <div className="flex-1 flex flex-col gap-6">
              
              {/* Glassmorphic Stat Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Block 1: Core Stack */}
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu size={16} className="text-neon-cyan" />
                    <span className="font-mono text-xs tracking-widest text-white/50 uppercase">[ CORE STACK ]</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'Java', 'C++', 'AWS', 'TensorFlow', 'FastAPI', 'React'].map(tech => (
                      <span key={tech} className="px-3 py-1 font-mono text-xs rounded-md bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Block 2: Current Focus */}
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-4">
                    <Target size={16} className="text-neon-violet" />
                    <span className="font-mono text-xs tracking-widest text-white/50 uppercase">[ CURRENT FOCUS ]</span>
                  </div>
                  <ul className="space-y-2 font-mono text-sm text-white/80 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-neon-violet mt-0.5">›</span> Deep Learning
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neon-violet mt-0.5">›</span> Full-Stack Architecture
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neon-violet mt-0.5">›</span> Ethical Hacking
                    </li>
                  </ul>
                </div>

                {/* Block 3: Status / Credentials (Spans full width) */}
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md md:col-span-2">
                  <div className="flex items-center gap-2 mb-3">
                    <BadgeCheck size={16} className="text-neon-green" />
                    <span className="font-mono text-xs tracking-widest text-white/50 uppercase">[ STATUS ]</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 font-mono text-sm">
                    <div className="flex items-center gap-2 text-white/80">
                      <Network size={14} className="text-neon-green" />
                      AWS Student Builder Campus Leader 2026
                    </div>
                    <div className="hidden sm:block text-white/20">|</div>
                    <div className="flex items-center gap-2 text-neon-green/90 animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-neon-green" />
                      Open to Collaborations
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Terminal Log */}
              <div className="flex-1 rounded-2xl border border-white/10 bg-[#060608] overflow-hidden flex flex-col mt-2">
                <div className="px-4 py-2 border-b border-white/10 flex items-center gap-2 bg-white/[0.02]">
                  <Terminal size={14} className="text-white/40" />
                  <span className="font-mono text-[10px] text-white/40 tracking-widest">SYSTEM_LOG.TXT</span>
                </div>
                <div className="p-5 font-mono text-xs sm:text-sm text-white/70 leading-relaxed">
                  <div ref={terminalTextRef}>
                    {/* Populated by GSAP */}
                  </div>
                  <span className="inline-block w-2 h-4 bg-neon-cyan animate-pulse mt-1" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
