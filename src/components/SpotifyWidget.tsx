'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

export default function SpotifyWidget() {
  return (
    <a 
      href="https://open.spotify.com"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[90] flex items-center gap-4 bg-[#111827] border border-white/10 rounded-full p-2 pr-6 shadow-xl hover:bg-zinc-900 transition-colors group cursor-pointer"
    >
      {/* Spinning Record / Album Art Mock */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:scale-105 transition-transform">
        <img 
          src="https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4?auto=format&fit=crop&q=80&w=200" 
          alt="Album Art" 
          className="w-full h-full object-cover animate-[spin_4s_linear_infinite]"
        />
        {/* Record hole */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#111827] rounded-full border border-white/20"></div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-0.5">
          <Music size={12} className="text-[#1DB954]" />
          <span className="text-[10px] font-bold text-[#1DB954] uppercase tracking-wider">Now Playing</span>
        </div>
        <p className="text-sm font-bold text-white leading-none">Midnight City</p>
        <p className="text-xs text-zinc-400 mt-1">M83</p>
      </div>
      
      {/* Audio Visualizer Bars */}
      <div className="ml-2 flex items-end gap-0.5 h-4 opacity-50 group-hover:opacity-100 transition-opacity">
        <motion.div animate={{ height: ["4px", "14px", "4px"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="w-1 bg-[#1DB954] rounded-t-sm"></motion.div>
        <motion.div animate={{ height: ["8px", "16px", "6px"] }} transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.2 }} className="w-1 bg-[#1DB954] rounded-t-sm"></motion.div>
        <motion.div animate={{ height: ["6px", "10px", "4px"] }} transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut", delay: 0.4 }} className="w-1 bg-[#1DB954] rounded-t-sm"></motion.div>
        <motion.div animate={{ height: ["10px", "14px", "8px"] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.1 }} className="w-1 bg-[#1DB954] rounded-t-sm"></motion.div>
      </div>
    </a>
  );
}
