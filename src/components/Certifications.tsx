'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, X } from 'lucide-react';

const credentials = [
  {
    title: "Advanced Software Engineering",
    issuer: "Walmart Global Tech (Forage)",
    date: "January 2026",
    id: "ComDCaRzx2X3uPxK",
  },
  {
    title: "Cybersecurity Analyst",
    issuer: "Tata (Forage)",
    date: "April 2026",
    id: "6prpYtKnZGgcDTBbs",
  },
  {
    title: "Cyber Job Simulation",
    issuer: "Deloitte Australia (Forage)",
    date: "2026",
    id: "Verified",
  },
  {
    title: "Intro to Generative AI Studio",
    issuer: "Google Cloud (Simplilearn)",
    date: "November 2025",
    id: "9417741",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "September 2025",
    id: "Verified",
  },
  {
    title: "OCI 2025 AI Foundations Associate",
    issuer: "Oracle University",
    date: "September 2025",
    id: "Certified",
  }
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<typeof credentials[0] | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="certifications" className="py-24 relative z-10 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white mb-6 shadow-sm">
              <ShieldCheck size={16} className="text-[#ef4444]" />
              <span className="text-sm font-medium text-zinc-600">Verified Skills</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
              Professional <br/> Credentials
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black hover:border-zinc-400 transition-colors">
              &larr;
            </button>
            <button className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black hover:border-zinc-400 transition-colors">
              &rarr;
            </button>
          </div>
        </div>

        {/* Marquee Container */}
        <div 
          className="relative overflow-hidden w-full -mx-6 px-6 md:-mx-12 md:px-12 py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className="flex w-max gap-6"
            animate={{ x: isHovered || selectedCert ? "0%" : ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: isHovered || selectedCert ? 0 : Infinity }}
            style={{ x: isHovered || selectedCert ? undefined : 0 }}
          >
            {[...credentials, ...credentials, ...credentials].map((cert, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCert(cert)}
                className="w-[300px] md:w-[350px] bg-zinc-50 border border-zinc-200 rounded-[1.5rem] p-6 hover:shadow-[0_10px_30px_rgba(239,68,68,0.1)] transition-all group flex flex-col flex-shrink-0 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center mb-6 shadow-sm text-[#111827] group-hover:scale-110 group-hover:border-[#ef4444] transition-all">
                  <Award size={20} className="group-hover:text-[#ef4444] transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-[#111827] mb-2 leading-tight flex-grow">
                  {cert.title}
                </h3>
                
                <div className="mb-6">
                  <p className="text-sm font-semibold text-zinc-500">{cert.issuer}</p>
                  <p className="text-xs font-medium text-zinc-400 mt-1">Issued {cert.date}</p>
                </div>
                
                <div className="pt-4 border-t border-zinc-200 flex justify-between items-center mt-auto">
                  <span className="text-xs font-mono text-zinc-400">ID: {cert.id}</span>
                  <button className="text-zinc-400 hover:text-[#ef4444] transition-colors">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Gradient Edges for fade effect */}
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>

      </div>

      {/* Dark Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111827] border border-white/10 rounded-[2rem] p-8 md:p-12 max-w-lg w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-16 h-16 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center mb-8 text-[#ef4444]">
                <Award size={32} />
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                {selectedCert.title}
              </h3>
              
              <div className="mb-8 border-l-2 border-[#ef4444] pl-4">
                <p className="text-lg font-medium text-white/90">{selectedCert.issuer}</p>
                <p className="text-sm text-white/50 mt-1">Issued {selectedCert.date}</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/5">
                <div>
                  <p className="text-xs text-white/40 mb-1">Credential ID</p>
                  <p className="text-sm font-mono text-white/80">{selectedCert.id}</p>
                </div>
                <a href="#" className="flex items-center gap-2 px-4 py-2 bg-[#ef4444] hover:bg-[#dc2626] text-white text-sm font-medium rounded-lg transition-colors">
                  Verify <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
