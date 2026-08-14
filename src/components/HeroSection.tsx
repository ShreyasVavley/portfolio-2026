'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center pt-20">
      
      {/* Cinematic Gradient Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-red-900/30 blur-[120px] mix-blend-screen pointer-events-none"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-orange-900/20 blur-[150px] mix-blend-screen pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-white/30"></div>
          <span className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-white/70">
            Software Engineer
          </span>
          <div className="h-[1px] w-12 bg-white/30"></div>
        </motion.div>
        
        {/* Massive Title */}
        <motion.h1 
          initial={{ opacity: 0, filter: 'blur(20px)', y: 40 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] text-white mb-10 mix-blend-difference"
        >
          Digital <br/> Engineering.
        </motion.h1>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a 
            href="#projects" 
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white font-medium transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={18} className="ml-1" />
            </div>
            <span className="tracking-wide">View Projects</span>
          </a>
        </motion.div>

      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80"></div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50 z-20"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

    </section>
  );
}
