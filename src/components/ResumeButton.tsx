'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';

export default function ResumeButton() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Generate particles
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }));
    
    setParticles(prev => [...prev, ...newParticles]);

    // Cleanup particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);

    // Trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Shreyas_Vavley_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleDownload}
      className="relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full font-medium shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-shadow active:scale-95 group"
    >
      <span className="relative z-10 flex items-center gap-2">
        <FileDown size={18} className="group-hover:-translate-y-1 group-hover:scale-110 transition-transform" />
        Download Resume
      </span>
      
      {/* Particle container */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ 
            opacity: 1, 
            scale: 0, 
            x: particle.x, 
            y: particle.y 
          }}
          animate={{ 
            opacity: 0, 
            scale: Math.random() * 2 + 1,
            x: particle.x + (Math.random() - 0.5) * 200,
            y: particle.y + (Math.random() - 0.5) * 200,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute w-2 h-2 rounded-full bg-white z-0"
        />
      ))}
      
      {/* Hover glow overlay */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-full pointer-events-none" />
    </button>
  );
}
