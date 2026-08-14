'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#09090b] text-white pt-24 pb-8 border-t border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Top Metadata Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center text-xs md:text-sm font-mono text-zinc-400 mb-20 gap-8">
          
          <div className="flex flex-col gap-1 leading-relaxed tracking-tight">
            <span>Cinematic & Creative Production</span>
            <span>Lighting, Editing, Photo</span>
            <span>Motion Graphics</span>
          </div>


          <div className="flex flex-col items-end gap-1 text-right">
            <span>Worldwide Available</span>
            <span>2026</span>
          </div>

        </div>

        {/* Massive Name Text */}
        <div className="w-full flex justify-center pb-8">
          <h1 className="text-[20vw] md:text-[18vw] font-black leading-none tracking-tighter text-white select-none whitespace-nowrap">
            Shreyas
          </h1>
        </div>

      </div>
    </footer>
  );
}
